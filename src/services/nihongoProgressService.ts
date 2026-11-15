import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  updateProfile,
  type User,
} from 'firebase/auth'
import {
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from './firebase'

export interface LearnerProgress {
  memorizedVocabIds: string[]
  understoodGrammarIds?: string[]
  completedEvaluations: string[]
  completedStudyDays: number[]
  customDisplayName?: string
  xp?: number
  streak?: number
  lastActiveDate?: string
  completedSessionIds?: string[]
  difficultVocabIds?: string[]
}

export interface LearnerCloudProfile {
  uid: string
  displayName: string
  email: string
  photoURL?: string
  progress: LearnerProgress
  updatedAt?: any
}

const COLLECTION_NAME = 'nihongo_learners'

/**
 * Sign in using Google Account popup
 */
export async function signInWithGoogle(): Promise<User> {
  const provider = new GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  const result = await signInWithPopup(auth, provider)
  return result.user
}

/**
 * Sign out current user
 */
export async function signOutLearner(): Promise<void> {
  await signOut(auth)
}

/**
 * Change / update learner's display name
 */
export async function updateLearnerDisplayName(newName: string): Promise<void> {
  const currentUser = auth.currentUser
  if (!currentUser) throw new Error('User is not authenticated')

  const trimmed = newName.trim()
  if (!trimmed) throw new Error('Display name cannot be empty')

  // 1. Update Firebase Authentication profile directly (Selalu berhasil jika akun login)
  await updateProfile(currentUser, { displayName: trimmed })

  // 2. Simpan cadangan nama kustom di localStorage
  try {
    localStorage.setItem('nihongo_custom_name', trimmed)
  } catch {}

  // 3. Update Firestore learner profile (jika rules Firestore diizinkan)
  try {
    const userRef = doc(db, COLLECTION_NAME, currentUser.uid)
    await setDoc(
      userRef,
      {
        displayName: trimmed,
        customDisplayName: trimmed,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
  } catch (firestoreErr: any) {
    console.warn(
      'Firestore profile sync warning (Periksa Security Rules di Firebase Console):',
      firestoreErr?.message || firestoreErr
    )
    // Jangan lempar error agar nama di Firebase Auth tetap berhasil diubah di aplikasi
  }
}

/**
 * Save or update learning progress in Firestore
 */
export async function saveLearnerProgress(
  uid: string,
  progress: LearnerProgress
): Promise<void> {
  const currentUser = auth.currentUser
  if (!currentUser || currentUser.uid !== uid) return

  const userRef = doc(db, COLLECTION_NAME, uid)
  await setDoc(
    userRef,
    {
      uid,
      displayName: currentUser.displayName || 'Learner',
      email: currentUser.email || '',
      photoURL: currentUser.photoURL || '',
      memorizedVocabIds: progress.memorizedVocabIds,
      understoodGrammarIds: progress.understoodGrammarIds || [],
      completedEvaluations: progress.completedEvaluations,
      completedStudyDays: progress.completedStudyDays,
      xp: progress.xp || 0,
      streak: progress.streak || 1,
      lastActiveDate: progress.lastActiveDate || new Date().toISOString().split('T')[0],
      completedSessionIds: progress.completedSessionIds || [],
      difficultVocabIds: progress.difficultVocabIds || [],
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  )
}

/**
 * Fetch learner progress from Firestore
 */
export async function fetchLearnerProgress(
  uid: string
): Promise<LearnerProgress | null> {
  try {
    const userRef = doc(db, COLLECTION_NAME, uid)
    const snapshot = await getDoc(userRef)
    if (!snapshot.exists()) return null

    const data = snapshot.data()
    return {
      memorizedVocabIds: Array.isArray(data.memorizedVocabIds)
        ? data.memorizedVocabIds
        : [],
      understoodGrammarIds: Array.isArray(data.understoodGrammarIds)
        ? data.understoodGrammarIds
        : [],
      completedEvaluations: Array.isArray(data.completedEvaluations)
        ? data.completedEvaluations
        : [],
      completedStudyDays: Array.isArray(data.completedStudyDays)
        ? data.completedStudyDays
        : [],
      customDisplayName: data.displayName || data.customDisplayName || '',
      xp: typeof data.xp === 'number' ? data.xp : 0,
      streak: typeof data.streak === 'number' ? data.streak : 1,
      lastActiveDate: data.lastActiveDate || '',
      completedSessionIds: Array.isArray(data.completedSessionIds)
        ? data.completedSessionIds
        : [],
      difficultVocabIds: Array.isArray(data.difficultVocabIds)
        ? data.difficultVocabIds
        : [],
    }
  } catch (err) {
    console.warn('Failed to fetch learner progress from Firestore:', err)
    return null
  }
}

/**
 * Merge local progress and cloud progress (union of sets)
 */
export function mergeProgress(
  local: LearnerProgress,
  cloud: LearnerProgress
): LearnerProgress {
  const mergedVocab = Array.from(
    new Set([...local.memorizedVocabIds, ...cloud.memorizedVocabIds])
  )
  const mergedGrammar = Array.from(
    new Set([...(local.understoodGrammarIds || []), ...(cloud.understoodGrammarIds || [])])
  )
  const mergedEvals = Array.from(
    new Set([...local.completedEvaluations, ...cloud.completedEvaluations])
  )
  const mergedDays = Array.from(
    new Set([...local.completedStudyDays, ...cloud.completedStudyDays])
  )
  const mergedSessions = Array.from(
    new Set([...(local.completedSessionIds || []), ...(cloud.completedSessionIds || [])])
  )
  const mergedDifficult = Array.from(
    new Set([...(local.difficultVocabIds || []), ...(cloud.difficultVocabIds || [])])
  )

  return {
    memorizedVocabIds: mergedVocab,
    understoodGrammarIds: mergedGrammar,
    completedEvaluations: mergedEvals,
    completedStudyDays: mergedDays,
    completedSessionIds: mergedSessions,
    difficultVocabIds: mergedDifficult,
    xp: Math.max(local.xp || 0, cloud.xp || 0),
    streak: Math.max(local.streak || 1, cloud.streak || 1),
    lastActiveDate: cloud.lastActiveDate || local.lastActiveDate || new Date().toISOString().split('T')[0],
    customDisplayName: cloud.customDisplayName || local.customDisplayName,
  }
}
