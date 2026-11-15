import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore'
import { auth, db } from './firebase'

export type FeedbackCategory =
  | 'Saran Fitur Baru'
  | 'Laporan Masalah / Bug'
  | 'Kritik Materi & Tata Bahasa'
  | 'Kesan Pengalaman Belajar'
  | 'Lainnya'

export type TopicArea =
  | 'Umum'
  | 'Huruf Kana (Hiragana/Katakana)'
  | 'Angka N5'
  | 'Panduan Kanji'
  | 'Bab 1 s/d Bab 5'
  | 'Simulator Generator'
  | 'Kuis & Latihan'

export interface LearnerFeedback {
  id?: string
  userId?: string
  userName: string
  userEmail?: string
  rating: number // 1 to 5
  category: FeedbackCategory
  topicArea: TopicArea
  message: string
  createdAt?: string
}

const FEEDBACK_COLLECTION = 'jyash_feedbacks'
const LOCAL_FEEDBACK_KEY = 'jyash_user_feedbacks'

/**
 * Submit feedback to Firestore with graceful local fallback
 */
export async function submitLearnerFeedback(
  feedback: Omit<LearnerFeedback, 'id' | 'createdAt'>
): Promise<{ success: boolean; id: string }> {
  const currentUser = auth.currentUser
  const timestampStr = new Date().toISOString()
  const generatedId = `fb-${Date.now()}`

  const payload: LearnerFeedback = {
    ...feedback,
    id: generatedId,
    userId: currentUser?.uid || 'guest',
    userEmail: currentUser?.email || feedback.userEmail || '',
    createdAt: timestampStr,
  }

  // 1. Simpan salinan lokal di browser
  try {
    const existing = getLocalFeedbacks()
    existing.unshift(payload)
    localStorage.setItem(LOCAL_FEEDBACK_KEY, JSON.stringify(existing.slice(0, 50)))
  } catch (err) {
    console.warn('Local storage feedback write error:', err)
  }

  // 2. Simpan ke Cloud Firestore jika online
  try {
    const colRef = collection(db, FEEDBACK_COLLECTION)
    const docRef = await addDoc(colRef, {
      ...payload,
      createdAt: serverTimestamp(),
    })
    return { success: true, id: docRef.id }
  } catch (firestoreErr) {
    console.warn('Firestore feedback submission warning (saved locally):', firestoreErr)
    // Tetap kembalikan sukses karena data sudah tersimpan di localStorage
    return { success: true, id: generatedId }
  }
}

/**
 * Get locally saved feedbacks from this browser
 */
export function getLocalFeedbacks(): LearnerFeedback[] {
  try {
    const saved = localStorage.getItem(LOCAL_FEEDBACK_KEY)
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (err) {
    console.warn('Local storage feedback read error:', err)
  }
  return []
}

/**
 * Fetch all learner feedbacks from Firestore for the Admin Dashboard
 */
export async function fetchAllLearnerFeedbacksFromFirestore(): Promise<LearnerFeedback[]> {
  try {
    const colRef = collection(db, FEEDBACK_COLLECTION)
    const snapshot = await getDocs(colRef)
    const results: LearnerFeedback[] = []

    snapshot.forEach((docSnap) => {
      const data = docSnap.data()
      let dateString = data.createdAt || ''
      if (data.createdAt?.toDate && typeof data.createdAt.toDate === 'function') {
        dateString = data.createdAt.toDate().toISOString()
      }

      results.push({
        id: docSnap.id,
        userId: data.userId || 'guest',
        userName: data.userName || 'Anonymous Learner',
        userEmail: data.userEmail || '',
        rating: typeof data.rating === 'number' ? data.rating : 5,
        category: data.category || 'Lainnya',
        topicArea: data.topicArea || 'Umum',
        message: data.message || '',
        createdAt: dateString,
      })
    })

    // Sort newest first
    results.sort((a, b) => {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return timeB - timeA
    })

    return results
  } catch (err) {
    console.error('Error fetching learner feedbacks from Firestore:', err)
    throw err
  }
}

/**
 * Delete a learner feedback document by Firestore ID (Admin only)
 */
export async function deleteLearnerFeedbackFromFirestore(docId: string): Promise<void> {
  const docRef = doc(db, FEEDBACK_COLLECTION, docId)
  await deleteDoc(docRef)
}
