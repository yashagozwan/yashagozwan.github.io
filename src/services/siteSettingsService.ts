import { doc, getDoc, setDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { db, auth } from './firebase'

const SETTINGS_COLLECTION = 'site_settings'
const JYASH_DOC_ID = 'jyash'
const LOCAL_STORAGE_KEY = 'jyash_home_enabled'

export interface JyashSetting {
  isEnabledOnHome: boolean
  updatedAt?: string
  updatedBy?: string
}

/**
 * Get the initial value from localStorage or default to true
 */
export function getCachedJyashHomeVisibility(): boolean {
  try {
    const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (cached !== null) {
      return cached === 'true'
    }
  } catch {}
  return true
}

/**
 * Fetch JYash home visibility from Cloud Firestore
 */
export async function fetchJyashHomeVisibility(): Promise<boolean> {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, JYASH_DOC_ID)
    const snap = await getDoc(docRef)
    if (snap.exists()) {
      const data = snap.data() as JyashSetting
      const isEnabled = typeof data.isEnabledOnHome === 'boolean' ? data.isEnabledOnHome : true
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, String(isEnabled))
      } catch {}
      return isEnabled
    }
  } catch (err) {
    console.warn('Could not fetch JYash home visibility from Firestore (using cache/default):', err)
  }
  return getCachedJyashHomeVisibility()
}

/**
 * Subscribe to real-time changes of JYash home visibility
 */
export function subscribeJyashHomeVisibility(
  onChange: (isEnabled: boolean) => void
): () => void {
  try {
    const docRef = doc(db, SETTINGS_COLLECTION, JYASH_DOC_ID)
    const unsubscribe = onSnapshot(
      docRef,
      (snap) => {
        if (snap.exists()) {
          const data = snap.data() as JyashSetting
          const isEnabled = typeof data.isEnabledOnHome === 'boolean' ? data.isEnabledOnHome : true
          try {
            localStorage.setItem(LOCAL_STORAGE_KEY, String(isEnabled))
          } catch {}
          onChange(isEnabled)
        } else {
          onChange(getCachedJyashHomeVisibility())
        }
      },
      (error) => {
        console.warn('Snapshot listener for JYash home setting error:', error)
        onChange(getCachedJyashHomeVisibility())
      }
    )
    return unsubscribe
  } catch (err) {
    console.warn('Subscribe error for JYash home setting:', err)
    onChange(getCachedJyashHomeVisibility())
    return () => {}
  }
}

/**
 * Update JYash home visibility in Firestore (Admin only)
 */
export async function updateJyashHomeVisibility(isEnabled: boolean): Promise<void> {
  const docRef = doc(db, SETTINGS_COLLECTION, JYASH_DOC_ID)
  const user = auth.currentUser
  const payload: Record<string, any> = {
    isEnabledOnHome: isEnabled,
    updatedAt: new Date().toISOString(),
    updatedAtServer: serverTimestamp(),
    updatedBy: user?.email || user?.uid || 'admin',
  }

  await setDoc(docRef, payload, { merge: true })
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, String(isEnabled))
  } catch {}
}
