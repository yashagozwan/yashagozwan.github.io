import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import { db } from './firebase'
import type { IdeaDocument } from '@/types/portfolio'
import { IDEAS_COLLECTION as DEFAULT_IDEAS } from '@/data/ideas'

const COLLECTION_NAME = 'ideas_reflections'

/**
 * Convert any Google Drive sharing URL or ID into a clean image preview/direct link.
 * e.g. https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * or https://drive.google.com/uc?id=FILE_ID
 */
export function formatDriveImageUrl(urlOrId: string): string {
  if (!urlOrId) return ''
  const trimmed = urlOrId.trim()

  // If it's a local path or external non-drive URL
  if (trimmed.startsWith('/') || trimmed.startsWith('data:') || trimmed.startsWith('blob:')) {
    return trimmed
  }

  // Extract ID from Google Drive URL
  const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
                trimmed.match(/id=([a-zA-Z0-9_-]+)/) ||
                trimmed.match(/^([a-zA-Z0-9_-]{20,})$/)

  if (match && match[1]) {
    const fileId = match[1]
    // Google Drive direct image embed endpoint (thumbnail with high res)
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1200`
  }

  return trimmed
}

export function formatDriveDocUrl(urlOrId: string): string {
  if (!urlOrId) return ''
  const trimmed = urlOrId.trim()
  const match = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/) ||
                trimmed.match(/id=([a-zA-Z0-9_-]+)/) ||
                trimmed.match(/^([a-zA-Z0-9_-]{20,})$/)

  if (match && match[1]) {
    return `https://drive.google.com/file/d/${match[1]}/view?usp=sharing`
  }
  return trimmed
}

/**
 * Fetch ideas combining Firestore documents AND default hardcoded ideas.
 * If a Firestore document shares the same ID as a hardcoded idea, the Firestore version overrides it.
 * This guarantees the original 4 hardcoded reflections are NEVER lost.
 */
export async function fetchIdeasFromFirestore(): Promise<IdeaDocument[]> {
  try {
    const ideasRef = collection(db, COLLECTION_NAME)
    const q = query(ideasRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    const firestoreItems: IdeaDocument[] = []
    const firestoreIds = new Set<string>()

    snapshot.forEach((d) => {
      const data = d.data()
      firestoreIds.add(d.id)
      firestoreItems.push({
        id: d.id,
        title: data.title || '',
        category: data.category || 'Philosophy',
        description: data.description || '',
        cover: formatDriveImageUrl(data.cover || ''),
        googleDriveUrl: formatDriveDocUrl(data.googleDriveUrl || ''),
        tags: Array.isArray(data.tags) ? data.tags : [],
        date: data.date || '2026',
        actionLabel: data.actionLabel || 'Read Reflection ↗',
        featured: Boolean(data.featured),
      })
    })

    // Filter default ideas that haven't been overwritten in Firestore
    const nonOverriddenDefaults = DEFAULT_IDEAS.filter((def) => !firestoreIds.has(def.id))

    // Combined list: newly added Firestore ideas first, followed by default hardcoded ideas
    return [...firestoreItems, ...nonOverriddenDefaults]
  } catch (error) {
    console.warn('Firestore fetch failed or not configured yet, falling back to local data:', error)
    return DEFAULT_IDEAS
  }
}

export async function saveIdeaToFirestore(idea: Partial<IdeaDocument> & { id: string }): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, idea.id)
  await setDoc(docRef, {
    title: idea.title || '',
    category: idea.category || 'Philosophy',
    description: idea.description || '',
    cover: idea.cover || '',
    googleDriveUrl: idea.googleDriveUrl || '',
    tags: idea.tags || [],
    date: idea.date || `${new Date().getFullYear()}`,
    actionLabel: idea.actionLabel || 'Read Reflection ↗',
    featured: Boolean(idea.featured),
    updatedAt: serverTimestamp(),
    createdAt: (idea as any).createdAt || serverTimestamp(),
  }, { merge: true })
}

export async function deleteIdeaFromFirestore(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id)
  await deleteDoc(docRef)
}

/**
 * Seed initial data from local ideas into Firestore (useful for first-time setup)
 */
export async function seedInitialIdeas(): Promise<void> {
  for (const item of DEFAULT_IDEAS) {
    await saveIdeaToFirestore(item)
  }
}
