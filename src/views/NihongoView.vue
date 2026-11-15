<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/services/firebase'
import {
  signInWithGoogle,
  signOutLearner,
  updateLearnerDisplayName,
  saveLearnerProgress,
  fetchLearnerProgress,
  mergeProgress,
  type LearnerProgress,
} from '@/services/nihongoProgressService'

// Data Bab 1, 2 & 3
import {
  LESSON_META,
  LESSON_SESSIONS_L1,
  VOCABULARIES_DATA,
  GRAMMAR_PATTERNS_DATA,
  SENTENCE_BUILDER_CHALLENGES_L1,
  INTERACTIVE_DIALOGUES_L1,
  VOCAB_MATCHING_PAIRS_L1,
  PARTICLE_QUIZZES,
  TRANSLATE_QUIZZES,
  EVALUATION_INDICATORS,
  STUDY_PLAN_5_DAYS,
} from '@/data/nihongoLesson1'
import {
  LESSON_2_META,
  LESSON_SESSIONS_L2,
  VOCABULARIES_L2_DATA,
  GRAMMAR_PATTERNS_L2_DATA,
  SENTENCE_BUILDER_CHALLENGES_L2,
  INTERACTIVE_DIALOGUES_L2,
  VOCAB_MATCHING_PAIRS_L2,
  PARTICLE_QUIZZES_L2,
  TRANSLATE_QUIZZES_L2,
  EVALUATION_INDICATORS_L2,
  STUDY_PLAN_5_DAYS_L2,
} from '@/data/nihongoLesson2'
import {
  LESSON_3_META,
  LESSON_SESSIONS_L3,
  VOCABULARIES_L3_DATA,
  GRAMMAR_PATTERNS_L3_DATA,
  SENTENCE_BUILDER_CHALLENGES_L3,
  INTERACTIVE_DIALOGUES_L3,
  VOCAB_MATCHING_PAIRS_L3,
  LOCATION_QUIZZES_L3,
  TRANSLATE_QUIZZES_L3,
  EVALUATION_INDICATORS_L3,
  STUDY_PLAN_5_DAYS_L3,
} from '@/data/nihongoLesson3'
import {
  LESSON_4_META,
  LESSON_SESSIONS_L4,
  VOCABULARIES_L4_DATA,
  GRAMMAR_PATTERNS_L4_DATA,
  SENTENCE_BUILDER_CHALLENGES_L4,
  INTERACTIVE_DIALOGUES_L4,
  VOCAB_MATCHING_PAIRS_L4,
  PARTICLE_QUIZZES_L4,
  TRANSLATE_QUIZZES_L4,
  EVALUATION_INDICATORS_L4,
  STUDY_PLAN_5_DAYS_L4,
} from '@/data/nihongoLesson4'
import {
  LESSON_5_META,
  LESSON_SESSIONS_L5,
  VOCABULARIES_L5_DATA,
  GRAMMAR_PATTERNS_L5_DATA,
  SENTENCE_BUILDER_CHALLENGES_L5,
  INTERACTIVE_DIALOGUES_L5,
  VOCAB_MATCHING_PAIRS_L5,
  PARTICLE_QUIZZES_L5,
  TRANSLATE_QUIZZES_L5,
  EVALUATION_INDICATORS_L5,
  STUDY_PLAN_5_DAYS_L5,
} from '@/data/nihongoLesson5'
import {
  CHAPTER_1_KANJI,
  CHAPTER_2_KANJI,
  CHAPTER_3_KANJI,
  CHAPTER_4_KANJI,
  CHAPTER_5_KANJI,
} from '@/data/nihongoKanjiChapters'

// Interactive Components
import Session2Greetings from '@/components/nihongo/Session2Greetings.vue'
import Session2Demonstratives from '@/components/nihongo/Session2Demonstratives.vue'
import Session2Locations from '@/components/nihongo/Session2Locations.vue'
import Session2TimeAndDays from '@/components/nihongo/Session2TimeAndDays.vue'
import Session2Transport from '@/components/nihongo/Session2Transport.vue'
import Session3Vocabulary from '@/components/nihongo/Session3Vocabulary.vue'
import Session4Grammar from '@/components/nihongo/Session4Grammar.vue'
import Session5SentenceBuilder from '@/components/nihongo/Session5SentenceBuilder.vue'
import Session6Conversation from '@/components/nihongo/Session6Conversation.vue'
import Session7Exercises from '@/components/nihongo/Session7Exercises.vue'
import Session8Summary from '@/components/nihongo/Session8Summary.vue'
import SimulatorBab1 from '@/components/nihongo/SimulatorBab1.vue'
import SimulatorBab2 from '@/components/nihongo/SimulatorBab2.vue'
import SimulatorBab3 from '@/components/nihongo/SimulatorBab3.vue'
import SimulatorBab4 from '@/components/nihongo/SimulatorBab4.vue'
import SimulatorBab5 from '@/components/nihongo/SimulatorBab5.vue'
import ChapterKanjiView from '@/components/nihongo/ChapterKanjiView.vue'
import KanjiFoundationView from '@/components/nihongo/KanjiFoundationView.vue'
import KanaLearningView from '@/components/nihongo/KanaLearningView.vue'
import NumbersLearningView from '@/components/nihongo/NumbersLearningView.vue'
import RoadmapN5View from '@/components/nihongo/RoadmapN5View.vue'
import NihongoCoachmarkModal from '@/components/nihongo/NihongoCoachmarkModal.vue'
import NihongoFeedbackModal from '@/components/nihongo/NihongoFeedbackModal.vue'

import {
  Bars3Icon,
  XMarkIcon,
  LanguageIcon,
  CalculatorIcon,
  IdentificationIcon,
  CubeIcon,
  BuildingOfficeIcon,
  ClockIcon,
  PaperAirplaneIcon,
  MapIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  ChatBubbleLeftRightIcon,
  ChatBubbleBottomCenterTextIcon,
  BoltIcon,
  TrophyIcon,
  CloudArrowUpIcon,
  ArrowRightStartOnRectangleIcon,
  ArrowRightIcon,
  PencilSquareIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'
import {
  FireIcon,
  BoltIcon as SolidBoltIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/solid'

import { speakJapanese, isSpeechSupported } from '@/utils/speech'
import { trackEvent } from '@/utils/analytics'

// ==============================================================
// STEP-BY-STEP FOCUSED STAGE ARCHITECTURE (WITH LEFT NAVIGATOR)
// ==============================================================
export type LearningStage = 'huruf' | 'angka' | 'kanji' | 'bab-1' | 'bab-2' | 'bab-3' | 'bab-4' | 'bab-5' | 'roadmap'

// Main Stage: defaults to 'huruf' as requested (Home -> Bahasa Jepang -> Huruf -> Angka -> Bab 1 -> Bab 2 -> Bab etc)
const currentStage = ref<LearningStage>('huruf')

// Mobile sidebar drawer state
const isMobileSidebarOpen = ref(false)

// Left Navigator Menu Configuration
const NAV_GROUPS = [
  {
    title: 'Fondasi Aksara & Angka',
    items: [
      { id: 'huruf' as LearningStage, stepNumber: 1, title: 'Huruf Kana', subtitle: 'Hiragana & Katakana', badge: 'Fondasi 1', icon: LanguageIcon },
      { id: 'angka' as LearningStage, stepNumber: 2, title: 'Angka N5', subtitle: 'Bilangan & Satuan', badge: 'Fondasi 2', icon: CalculatorIcon },
      { id: 'kanji' as LearningStage, stepNumber: 3, title: 'Panduan Kanji', subtitle: 'On\'yomi & Kun\'yomi', badge: 'Fondasi 3', icon: BookOpenIcon },
    ],
  },
  {
    title: 'Bab Pembelajaran (Minna no Nihongo)',
    items: [
      { id: 'bab-1' as LearningStage, stepNumber: 4, title: 'Bab 1: Perkenalan', subtitle: 'Identitas & Kalimat Nominal', badge: 'Bab 1', icon: IdentificationIcon },
      { id: 'bab-2' as LearningStage, stepNumber: 5, title: 'Bab 2: Benda', subtitle: 'Kata Tunjuk & Kepemilikan', badge: 'Bab 2', icon: CubeIcon },
      { id: 'bab-3' as LearningStage, stepNumber: 6, title: 'Bab 3: Tempat & Harga', subtitle: 'Lokasi, Arah & Gedung', badge: 'Bab 3', icon: BuildingOfficeIcon },
      { id: 'bab-4' as LearningStage, stepNumber: 7, title: 'Bab 4: Waktu & Aktivitas', subtitle: 'Jam, Hari & 4 Bentuk Kata Kerja', badge: 'Bab 4', icon: ClockIcon },
      { id: 'bab-5' as LearningStage, stepNumber: 8, title: 'Bab 5: Transportasi', subtitle: 'Tujuan, Kendaraan & Perjalanan', badge: 'Bab 5', icon: PaperAirplaneIcon },
    ],
  },
  {
    title: 'Kurikulum & Target',
    items: [
      { id: 'roadmap' as LearningStage, stepNumber: 9, title: 'Roadmap Belajar N5', subtitle: 'Kurikulum Lengkap 25 Bab', badge: 'Peta Belajar', icon: MapIcon },
    ],
  },
]

// Chapter Internal Tabs (for Bab 1, Bab 2, Bab 3, Bab 4)
export type ChapterTab = 'kosakata' | 'kanji' | 'tatabahasa' | 'latihan' | 'simulator' | 'rangkuman'
const activeChapterTab = ref<ChapterTab>('kosakata')

const CHAPTER_TABS = [
  { id: 'kosakata', label: 'Kosakata & Dasar', icon: BookOpenIcon },
  { id: 'kanji', label: 'Kanji N5', icon: LanguageIcon },
  { id: 'tatabahasa', label: 'Tata Bahasa', icon: PuzzlePieceIcon },
  { id: 'latihan', label: 'Latihan & Dialog', icon: ChatBubbleLeftRightIcon },
  { id: 'simulator', label: 'Simulator Generator', icon: BoltIcon },
  { id: 'rangkuman', label: 'Rangkuman & Evaluasi', icon: TrophyIcon },
] as const

// Global settings
const showRomaji = ref<boolean>(true)
const audioAvailable = ref<boolean>(true)

// User & Cloud Progress Sync State
const currentUser = ref<User | null>(null)
const isLoggingIn = ref(false)
const isSyncing = ref(false)

// Gamification & Progress State
const userXp = ref<number>(0)
const userStreak = ref<number>(1)
const lastActiveDate = ref<string>('')
const recentXpGain = ref<number | null>(null)

const memorizedIds = ref<Set<string>>(new Set())
const difficultVocabIds = ref<Set<string>>(new Set())
const understoodGrammarIds = ref<Set<string>>(new Set())
const checkedEvaluations = ref<Set<string>>(new Set())
const completedDays = ref<Set<number>>(new Set())
const completedSessionIds = ref<Set<string>>(new Set())

// Name change modal state
const showNameModal = ref(false)
const newNameInput = ref('')
const isUpdatingName = ref(false)
const nameModalError = ref('')

// Interactive Coachmark Tour Guide State
const isCoachmarkOpen = ref(false)

function openCoachmark() {
  isCoachmarkOpen.value = true
  trackEvent('jyash_coachmark_open')
}

function handleCoachmarkComplete() {
  isCoachmarkOpen.value = false
  trackEvent('jyash_coachmark_complete')
}

// User Feedback Modal State
const isFeedbackModalOpen = ref(false)

function openFeedbackModal() {
  isFeedbackModalOpen.value = true
  trackEvent('jyash_feedback_modal_open')
}

// Toast Notification
const toastNotification = ref<{ message: string; type: 'success' | 'error' } | null>(null)

function notify(message: string, type: 'success' | 'error' = 'success') {
  toastNotification.value = { message, type }
  setTimeout(() => {
    toastNotification.value = null
  }, 4000)
}

function gainXp(amount: number) {
  userXp.value += amount
  recentXpGain.value = amount
  setTimeout(() => {
    recentXpGain.value = null
  }, 1800)
  try {
    localStorage.setItem('nihongo_xp', String(userXp.value))
  } catch {}
  trackEvent('jyash_xp_earned', { amount, total_xp: userXp.value })
  triggerCloudSave()
}

// Stage Navigation Actions
function goToStage(stage: LearningStage) {
  currentStage.value = stage
  activeChapterTab.value = 'kosakata'
  isMobileSidebarOpen.value = false
  try {
    localStorage.setItem('nihongo_current_stage', stage)
  } catch {}
  trackEvent('jyash_stage_view', { stage })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function setChapterTab(tab: ChapterTab) {
  activeChapterTab.value = tab
  trackEvent('jyash_chapter_tab_change', { stage: currentStage.value, tab })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

// Stage Progression Footer Helpers
const stageProgressionMeta = computed(() => {
  switch (currentStage.value) {
    case 'huruf':
      return {
        prev: null,
        next: {
          id: 'angka' as LearningStage,
          title: 'Tahap 2: Angka & Satuan Hitung N5',
          description: 'Kuasai angka 0 - 100 juta dan perkecualian satuan hitungan sebelum masuk ke tata bahasa.',
          actionLabel: 'Lanjut ke Belajar Angka N5',
        },
      }
    case 'angka':
      return {
        prev: { id: 'huruf' as LearningStage, label: 'Huruf Kana' },
        next: {
          id: 'kanji' as LearningStage,
          title: 'Tahap 3: Panduan Huruf Kanji (On\'yomi & Kun\'yomi)',
          description: 'Pahami mengapa satu kanji punya dua cara baca, rumus praktis 80/20, dan coba simulator audio interaktif.',
          actionLabel: 'Lanjut ke Panduan Kanji',
        },
      }
    case 'kanji':
      return {
        prev: { id: 'angka' as LearningStage, label: 'Angka N5' },
        next: {
          id: 'bab-1' as LearningStage,
          title: 'Tahap 4: Bab 1 (Perkenalan Diri)',
          description: 'Pelajari kalimat nominal dasar (wa, desu, ja arimasen, ka) dan salam percakapan.',
          actionLabel: 'Lanjut ke Bab 1',
        },
      }
    case 'bab-1':
      return {
        prev: { id: 'kanji' as LearningStage, label: 'Panduan Kanji' },
        next: {
          id: 'bab-2' as LearningStage,
          title: 'Tahap 5: Bab 2 (Benda & Kepemilikan)',
          description: 'Pelajari kata tunjuk benda kore, sore, are dan partikel kepemilikan no.',
          actionLabel: 'Lanjut ke Bab 2',
        },
      }
    case 'bab-2':
      return {
        prev: { id: 'bab-1' as LearningStage, label: 'Bab 1' },
        next: {
          id: 'bab-3' as LearningStage,
          title: 'Tahap 5: Bab 3 (Tempat & Harga)',
          description: 'Pelajari kata tunjuk lokasi koko, soko, asoko dan menanyakan harga barang.',
          actionLabel: 'Lanjut ke Bab 3',
        },
      }
    case 'bab-3':
      return {
        prev: { id: 'bab-2' as LearningStage, label: 'Bab 2' },
        next: {
          id: 'bab-4' as LearningStage,
          title: 'Tahap 6: Bab 4 (Waktu & Aktivitas)',
          description: 'Pelajari jam, menit, hari, dan 4 perubahan bentuk kata kerja sopan.',
          actionLabel: 'Lanjut ke Bab 4',
        },
      }
    case 'bab-4':
      return {
        prev: { id: 'bab-3' as LearningStage, label: 'Bab 3' },
        next: {
          id: 'bab-5' as LearningStage,
          title: 'Tahap 7: Bab 5 (Transportasi & Perjalanan)',
          description: 'Pelajari kata kerja gerakan ikimasu/kimasu/kaerimasu, 10 alat transportasi, dan 5 partikel perjalanan.',
          actionLabel: 'Lanjut ke Bab 5',
        },
      }
    case 'bab-5':
      return {
        prev: { id: 'bab-4' as LearningStage, label: 'Bab 4' },
        next: {
          id: 'roadmap' as LearningStage,
          title: 'Peta Belajar: Roadmap JLPT N5 (25 Bab)',
          description: 'Lihat seluruh 25 bab Minna no Nihongo dan rencanakan langkah belajar selanjutnya.',
          actionLabel: 'Lihat Roadmap 25 Bab N5',
        },
      }
    case 'roadmap':
      return {
        prev: { id: 'bab-5' as LearningStage, label: 'Bab 5' },
        next: {
          id: 'huruf' as LearningStage,
          title: 'Mulai Ulang dari Fondasi',
          description: 'Perkuat pemahaman aksara dasar Hiragana & Katakana.',
          actionLabel: 'Kembali ke Huruf Kana',
        },
      }
  }
})

// Audio helper
function playAudio(text: string) {
  if (!text) return
  speakJapanese(text)
  trackEvent('jyash_audio_play', { text })
}

// Vocab handlers
function toggleMemorized(id: string) {
  if (memorizedIds.value.has(id)) {
    memorizedIds.value.delete(id)
  } else {
    memorizedIds.value.add(id)
  }
  try {
    localStorage.setItem(
      'nihongo_memorized_vocab',
      JSON.stringify(Array.from(memorizedIds.value))
    )
  } catch {}
  triggerCloudSave()
}

function toggleDifficult(id: string) {
  if (difficultVocabIds.value.has(id)) {
    difficultVocabIds.value.delete(id)
  } else {
    difficultVocabIds.value.add(id)
  }
  try {
    localStorage.setItem(
      'nihongo_difficult_vocabs',
      JSON.stringify(Array.from(difficultVocabIds.value))
    )
  } catch {}
  triggerCloudSave()
}

// Grammar handler
function toggleGrammar(id: string) {
  if (understoodGrammarIds.value.has(id)) {
    understoodGrammarIds.value.delete(id)
  } else {
    understoodGrammarIds.value.add(id)
  }
  try {
    localStorage.setItem(
      'nihongo_understood_grammar',
      JSON.stringify(Array.from(understoodGrammarIds.value))
    )
  } catch {}
  triggerCloudSave()
}

// Evaluation handlers
function toggleEvaluation(id: string) {
  if (checkedEvaluations.value.has(id)) {
    checkedEvaluations.value.delete(id)
  } else {
    checkedEvaluations.value.add(id)
  }
  try {
    localStorage.setItem(
      'nihongo_evaluations',
      JSON.stringify(Array.from(checkedEvaluations.value))
    )
  } catch {}
  triggerCloudSave()
}

function toggleStudyDay(day: number) {
  const currentLessonNum = currentStage.value === 'bab-1' ? 1 : currentStage.value === 'bab-2' ? 2 : currentStage.value === 'bab-3' ? 3 : currentStage.value === 'bab-4' ? 4 : 1
  const key = currentLessonNum === 1 ? day : day + (currentLessonNum * 10)
  if (completedDays.value.has(key)) {
    completedDays.value.delete(key)
  } else {
    completedDays.value.add(key)
  }
  try {
    localStorage.setItem(
      'nihongo_study_days',
      JSON.stringify(Array.from(completedDays.value))
    )
  } catch {}
  triggerCloudSave()
}

// Cloud Sync Functions
async function syncUserProgressWithCloud(user: User) {
  isSyncing.value = true
  try {
    const cloud = await fetchLearnerProgress(user.uid)
    const local: LearnerProgress = {
      memorizedVocabIds: Array.from(memorizedIds.value),
      difficultVocabIds: Array.from(difficultVocabIds.value),
      understoodGrammarIds: Array.from(understoodGrammarIds.value),
      completedEvaluations: Array.from(checkedEvaluations.value),
      completedStudyDays: Array.from(completedDays.value),
      completedSessionIds: Array.from(completedSessionIds.value),
      xp: userXp.value,
      streak: userStreak.value,
      lastActiveDate: lastActiveDate.value,
      customDisplayName: user.displayName || '',
    }

    if (cloud) {
      const merged = mergeProgress(local, cloud)
      memorizedIds.value = new Set(merged.memorizedVocabIds)
      difficultVocabIds.value = new Set(merged.difficultVocabIds || [])
      understoodGrammarIds.value = new Set(merged.understoodGrammarIds || [])
      checkedEvaluations.value = new Set(merged.completedEvaluations)
      completedDays.value = new Set(merged.completedStudyDays)
      completedSessionIds.value = new Set(merged.completedSessionIds || [])
      userXp.value = merged.xp || 0
      userStreak.value = merged.streak || 1

      try {
        localStorage.setItem('nihongo_memorized_vocab', JSON.stringify(merged.memorizedVocabIds))
        localStorage.setItem('nihongo_difficult_vocabs', JSON.stringify(merged.difficultVocabIds || []))
        localStorage.setItem('nihongo_understood_grammar', JSON.stringify(merged.understoodGrammarIds || []))
        localStorage.setItem('nihongo_evaluations', JSON.stringify(merged.completedEvaluations))
        localStorage.setItem('nihongo_study_days', JSON.stringify(merged.completedStudyDays))
        localStorage.setItem('nihongo_completed_sessions', JSON.stringify(merged.completedSessionIds || []))
        localStorage.setItem('nihongo_xp', String(merged.xp || 0))
        localStorage.setItem('nihongo_streak', String(merged.streak || 1))
      } catch {}

      await saveLearnerProgress(user.uid, merged)
    } else {
      await saveLearnerProgress(user.uid, local)
    }
  } catch (err) {
    console.warn('Sync error:', err)
  } finally {
    isSyncing.value = false
  }
}

async function triggerCloudSave() {
  if (!currentUser.value) return
  isSyncing.value = true
  try {
    await saveLearnerProgress(currentUser.value.uid, {
      memorizedVocabIds: Array.from(memorizedIds.value),
      difficultVocabIds: Array.from(difficultVocabIds.value),
      understoodGrammarIds: Array.from(understoodGrammarIds.value),
      completedEvaluations: Array.from(checkedEvaluations.value),
      completedStudyDays: Array.from(completedDays.value),
      completedSessionIds: Array.from(completedSessionIds.value),
      xp: userXp.value,
      streak: userStreak.value,
      lastActiveDate: lastActiveDate.value,
      customDisplayName: currentUser.value.displayName || '',
    })
  } catch (e) {
    console.warn('Auto-save error:', e)
  } finally {
    isSyncing.value = false
  }
}

async function handleGoogleLogin() {
  isLoggingIn.value = true
  try {
    const user = await signInWithGoogle()
    currentUser.value = user
    await syncUserProgressWithCloud(user)
    trackEvent('jyash_google_login_success', { user_id: user.uid })
    notify(`Selamat datang, ${user.displayName || 'Pembelajar'}! Progress tersimpan.`, 'success')
  } catch (err: any) {
    if (err.code !== 'auth/popup-closed-by-user') {
      notify('Gagal masuk akun Google.', 'error')
    }
  } finally {
    isLoggingIn.value = false
  }
}

async function handleLogout() {
  try {
    await signOutLearner()
    currentUser.value = null
    notify('Anda telah keluar. Progress lokal tetap tersimpan.', 'success')
  } catch (err) {
    console.error('Logout error:', err)
  }
}

function openNameModal() {
  newNameInput.value = currentUser.value?.displayName || ''
  nameModalError.value = ''
  showNameModal.value = true
}

async function handleSaveName() {
  const trimmed = newNameInput.value.trim()
  if (!trimmed) {
    nameModalError.value = 'Nama tidak boleh kosong'
    return
  }
  isUpdatingName.value = true
  try {
    if (currentUser.value) {
      await updateLearnerDisplayName(trimmed)
      currentUser.value = {
        ...currentUser.value,
        displayName: trimmed,
      } as User
    }
    showNameModal.value = false
    notify(`Nama berhasil diubah menjadi "${trimmed}"`, 'success')
  } catch (err: any) {
    nameModalError.value = err?.message || 'Gagal mengubah nama'
  } finally {
    isUpdatingName.value = false
  }
}

onMounted(() => {
  audioAvailable.value = isSpeechSupported()

  // Load progress from localStorage
  try {
    const savedStage = localStorage.getItem('nihongo_current_stage') as LearningStage | null
    if (savedStage && ['huruf', 'angka', 'kanji', 'bab-1', 'bab-2', 'bab-3', 'bab-4', 'roadmap'].includes(savedStage)) {
      currentStage.value = savedStage
    } else {
      // Default initial landing is always 'huruf' as requested
      currentStage.value = 'huruf'
    }

    const savedXp = localStorage.getItem('nihongo_xp')
    if (savedXp) userXp.value = Number(savedXp)

    const savedStreak = localStorage.getItem('nihongo_streak')
    if (savedStreak) userStreak.value = Number(savedStreak)

    const savedMemorized = localStorage.getItem('nihongo_memorized_vocab')
    if (savedMemorized) memorizedIds.value = new Set(JSON.parse(savedMemorized))

    const savedDifficult = localStorage.getItem('nihongo_difficult_vocabs')
    if (savedDifficult) difficultVocabIds.value = new Set(JSON.parse(savedDifficult))

    const savedGrammar = localStorage.getItem('nihongo_understood_grammar')
    if (savedGrammar) understoodGrammarIds.value = new Set(JSON.parse(savedGrammar))

    const savedSessions = localStorage.getItem('nihongo_completed_sessions')
    if (savedSessions) completedSessionIds.value = new Set(JSON.parse(savedSessions))

    const savedEvals = localStorage.getItem('nihongo_evaluations')
    if (savedEvals) checkedEvaluations.value = new Set(JSON.parse(savedEvals))

    const savedDays = localStorage.getItem('nihongo_study_days')
    if (savedDays) completedDays.value = new Set(JSON.parse(savedDays))

    // Daily streak check
    const today = new Date().toISOString().split('T')[0]
    const savedDate = localStorage.getItem('nihongo_last_active_date')
    if (savedDate) {
      lastActiveDate.value = savedDate
      if (savedDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]
        if (savedDate === yesterday) {
          userStreak.value += 1
        } else {
          userStreak.value = 1
        }
        localStorage.setItem('nihongo_streak', String(userStreak.value))
        localStorage.setItem('nihongo_last_active_date', today)
      }
    } else {
      localStorage.setItem('nihongo_last_active_date', today)
      lastActiveDate.value = today
    }

    // First-time visitor coachmark onboarding tour trigger
    const coachmarkSeen = localStorage.getItem('nihongo_coachmark_seen')
    if (!coachmarkSeen) {
      setTimeout(() => {
        isCoachmarkOpen.value = true
      }, 700)
    }
  } catch (e) {
    console.warn('LocalStorage error:', e)
  }

  // Auth listener
  onAuthStateChanged(auth, async (user) => {
    currentUser.value = user
    if (user) {
      await syncUserProgressWithCloud(user)
    }
  })
})
</script>

<template>
  <div class="bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white min-h-screen flex flex-col md:flex-row">
    <!-- ============================================================== -->
    <!-- MOBILE TOP BAR (Visible only on small screens) -->
    <!-- ============================================================== -->
    <header class="md:hidden border-b border-neutral-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-4 h-16 flex items-center justify-between">
      <div class="flex items-center gap-2.5">
        <button
          type="button"
          class="p-2 -ml-1 rounded-xl text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
          title="Buka Navigasi"
          @click="isMobileSidebarOpen = true"
        >
          <Bars3Icon class="w-5 h-5" />
        </button>
        <span class="font-display font-extrabold text-base tracking-tight text-neutral-950">
          日本語 Nihongo
        </span>
      </div>

      <div class="flex items-center gap-2">
        <!-- Streak & XP -->
        <div class="flex items-center gap-1.5 px-2.5 py-1 bg-neutral-100 rounded-full text-xs font-mono font-bold text-neutral-800">
          <FireIcon class="w-3.5 h-3.5 text-amber-500" />
          <span>{{ userStreak }}</span>
          <span class="text-neutral-300">|</span>
          <SolidBoltIcon class="w-3.5 h-3.5 text-amber-400" />
          <span>{{ userXp }}</span>
        </div>

        <!-- Tour Guide Button -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition cursor-pointer"
          title="Panduan Fitur (Tur)"
          @click="openCoachmark"
        >
          <SparklesIcon class="w-4 h-4 text-amber-500" />
        </button>

        <!-- Feedback Button -->
        <button
          type="button"
          class="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition cursor-pointer"
          title="Kirim Masukan (Feedback)"
          @click="openFeedbackModal"
        >
          <ChatBubbleBottomCenterTextIcon class="w-4 h-4 text-neutral-800" />
        </button>

        <!-- Romaji Toggle -->
        <button
          type="button"
          class="px-2.5 py-1 rounded-lg text-[11px] font-mono border flex items-center gap-1 cursor-pointer"
          :class="showRomaji ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white text-neutral-600 border-neutral-200'"
          @click="showRomaji = !showRomaji"
        >
          <LanguageIcon class="w-3 h-3" />
          <span>{{ showRomaji ? 'RO' : 'JP' }}</span>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer Backdrop Overlay -->
    <div
      v-if="isMobileSidebarOpen"
      class="fixed inset-0 bg-neutral-950/60 z-50 backdrop-blur-xs md:hidden"
      @click="isMobileSidebarOpen = false"
    ></div>

    <!-- ============================================================== -->
    <!-- CLEAN & MODERN LEFT NAVIGATOR (SIDEBAR) -->
    <!-- ============================================================== -->
    <aside
      class="fixed md:sticky top-0 left-0 h-screen w-72 sm:w-80 bg-[#FAFAFA] border-r border-neutral-200 z-50 flex flex-col justify-between shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0"
      :class="isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <!-- Top Brand Header -->
      <div class="p-5 border-b border-neutral-200 space-y-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2.5">
            <span class="w-8 h-8 rounded-xl bg-neutral-950 text-white font-bold flex items-center justify-center font-sans text-sm shadow-xs shrink-0">
              日
            </span>
            <div>
              <h1 class="font-display font-black text-sm tracking-tight text-neutral-950 leading-none">
                JYash
              </h1>
              <p class="text-[10px] font-mono text-neutral-400 uppercase tracking-widest mt-0.5">
                Jalur Belajar Terstruktur
              </p>
            </div>
          </div>

          <!-- Close button on mobile -->
          <button
            type="button"
            class="md:hidden p-1.5 rounded-lg text-neutral-400 hover:text-neutral-950 hover:bg-neutral-200 transition-colors cursor-pointer"
            @click="isMobileSidebarOpen = false"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Gamification XP / Streak Card -->
        <div class="bg-white border border-neutral-200 rounded-2xl p-3 shadow-2xs flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FireIcon class="w-4 h-4" />
            </div>
            <div>
              <div class="text-xs font-mono font-bold text-neutral-950">{{ userStreak }} Hari Streak</div>
              <div class="text-[10px] text-neutral-400">Pertahankan belajar</div>
            </div>
          </div>

          <div class="flex items-center gap-1.5 bg-neutral-100 px-2.5 py-1 rounded-xl text-xs font-mono font-bold text-neutral-900">
            <SolidBoltIcon class="w-3.5 h-3.5 text-amber-500" />
            <span>{{ userXp }} XP</span>
          </div>
        </div>

        <!-- Interactive Tour Guide Pill Shortcut -->
        <button
          type="button"
          class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl border border-neutral-200 hover:border-neutral-950 bg-white text-neutral-800 text-xs font-bold transition shadow-2xs cursor-pointer group"
          @click="openCoachmark"
        >
          <div class="flex items-center gap-2">
            <SparklesIcon class="w-4 h-4 text-amber-500 shrink-0" />
            <span>Panduan Fitur (Tur)</span>
          </div>
          <span class="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-950">5 Langkah &rarr;</span>
        </button>

        <!-- Learner Feedback Shortcut -->
        <button
          type="button"
          class="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl border border-neutral-200 hover:border-neutral-950 bg-white text-neutral-800 text-xs font-bold transition shadow-2xs cursor-pointer group"
          @click="openFeedbackModal"
        >
          <div class="flex items-center gap-2">
            <ChatBubbleBottomCenterTextIcon class="w-4 h-4 text-neutral-900 shrink-0" />
            <span>Kirim Feedback</span>
          </div>
          <span class="text-[10px] font-mono text-neutral-400 group-hover:text-neutral-950">Suara Anda &rarr;</span>
        </button>
      </div>

      <!-- Linear Step Navigation List (Clean, Uncluttered, Independent) -->
      <div class="flex-grow overflow-y-auto px-4 py-4 space-y-5 scrollbar-thin">
        <div
          v-for="grp in NAV_GROUPS"
          :key="grp.title"
          class="space-y-1.5"
        >
          <div class="px-2.5 text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
            {{ grp.title }}
          </div>

          <div class="space-y-1">
            <button
              v-for="item in grp.items"
              :key="item.id"
              type="button"
              class="w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-between text-left cursor-pointer border"
              :class="
                currentStage === item.id
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50 shadow-2xs'
              "
              @click="goToStage(item.id)"
            >
              <div class="flex items-center gap-2.5 truncate">
                <component
                  :is="item.icon"
                  class="w-4 h-4 shrink-0"
                  :class="currentStage === item.id ? 'text-white' : 'text-neutral-500'"
                />
                <div class="truncate">
                  <div class="truncate">{{ item.title }}</div>
                  <div
                    class="text-[10px] font-normal truncate"
                    :class="currentStage === item.id ? 'text-neutral-300' : 'text-neutral-400'"
                  >
                    {{ item.subtitle }}
                  </div>
                </div>
              </div>

              <span
                class="text-[9px] font-mono px-1.5 py-0.5 rounded font-bold shrink-0 ml-1"
                :class="
                  currentStage === item.id
                    ? 'bg-white/20 text-white'
                    : 'bg-neutral-100 text-neutral-600'
                "
              >
                {{ item.badge }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Sidebar Footer: Romaji Toggle & Cloud Sync -->
      <div class="p-4 border-t border-neutral-200 bg-[#FAFAFA] space-y-3">
        <!-- Romaji Switcher Button -->
        <button
          type="button"
          class="w-full px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border flex items-center justify-between cursor-pointer"
          :class="
            showRomaji
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
          "
          @click="showRomaji = !showRomaji"
        >
          <div class="flex items-center gap-2">
            <LanguageIcon class="w-4 h-4" />
            <span>Romaji Pelafalan</span>
          </div>
          <span class="text-[10px]">{{ showRomaji ? 'ON' : 'OFF' }}</span>
        </button>

        <!-- User Profile / Cloud Save -->
        <div v-if="currentUser" class="flex items-center justify-between bg-white border border-neutral-200 p-2.5 rounded-xl shadow-2xs">
          <div class="truncate pr-2">
            <div class="text-xs font-mono font-bold text-neutral-950 truncate">
              {{ currentUser.displayName || 'Learner' }}
            </div>
            <div class="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
              <CheckCircleIcon class="w-3 h-3" />
              <span>Tersinkronisasi Cloud</span>
            </div>
          </div>

          <div class="flex items-center gap-1 shrink-0">
            <button
              type="button"
              class="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-500 hover:text-neutral-950 text-xs transition-colors cursor-pointer"
              title="Ganti Nama"
              @click="openNameModal"
            >
              <PencilSquareIcon class="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              class="p-1.5 rounded-lg hover:bg-neutral-100 text-neutral-400 hover:text-rose-600 text-xs transition-colors cursor-pointer"
              title="Keluar Akun"
              @click="handleLogout"
            >
              <ArrowRightStartOnRectangleIcon class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <button
          v-else
          type="button"
          :disabled="isLoggingIn"
          class="w-full py-2.5 px-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold tracking-wide transition-all shadow-xs flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          @click="handleGoogleLogin"
        >
          <CloudArrowUpIcon class="w-4 h-4 text-emerald-400" />
          <span>{{ isLoggingIn ? 'Menghubungkan...' : 'Simpan Progress Cloud' }}</span>
        </button>
      </div>
    </aside>

    <!-- ============================================================== -->
    <!-- MAIN INDEPENDENT SCREEN CONTENT (Right of Left Navigator) -->
    <!-- ============================================================== -->
    <main class="flex-1 min-w-0 min-h-screen p-4 sm:p-8 lg:p-10 max-w-5xl mx-auto w-full">
      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 1: HURUF KANA (HIRAGANA & KATAKANA LENGKAP) -->
      <!-- ------------------------------------------------------------ -->
      <section v-if="currentStage === 'huruf'" class="space-y-8 animate-fadeIn">
        <KanaLearningView
          @play-audio="playAudio"
          @gain-xp="gainXp"
          @start-lesson="() => goToStage('angka')"
          @go-to-kanji="() => goToStage('kanji')"
        />
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 2: ANGKA & SATUAN HITUNGAN N5 -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'angka'" class="space-y-8 animate-fadeIn">
        <NumbersLearningView
          @play-audio="playAudio"
          @gain-xp="gainXp"
        />
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 3: PANDUAN KANJI N5 (FOKUS 1 SCREEN: ON'YOMI & KUN'YOMI) -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'kanji'" class="space-y-8 animate-fadeIn">
        <KanjiFoundationView
          @play-audio="playAudio"
          @gain-xp="gainXp"
          @go-to-lesson="(num) => goToStage(num === 1 ? 'bab-1' : num === 2 ? 'bab-2' : num === 3 ? 'bab-3' : num === 4 ? 'bab-4' : 'bab-5')"
          @navigate-stage="(stg) => goToStage(stg as LearningStage)"
        />
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 3: BAB 1 (PERKENALAN DIRI & IDENTITAS) -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'bab-1'" class="space-y-6 animate-fadeIn">
        <!-- Chapter Header Card -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
              <IdentificationIcon class="w-4 h-4 text-neutral-900" />
              <span>Minna no Nihongo I &bull; 第1課</span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Bab 1: Perkenalan Diri & Identitas
            </h2>
            <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
              Mempelajari pola kalimat nominal dasar menggunakan partikel <strong>WA</strong>, kopula <strong>DESU / JA ARIMASEN</strong>, partikel tanya <strong>KA</strong>, partikel juga <strong>MO</strong>, dan kepemilikan <strong>NO</strong>.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-mono font-bold">
              Siap Dipelajari
            </span>
          </div>
        </div>

        <!-- Focused Chapter Sub-Tabs -->
        <div class="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
          <button
            v-for="tab in CHAPTER_TABS"
            :key="tab.id"
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
            :class="
              activeChapterTab === tab.id
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
            "
            @click="setChapterTab(tab.id)"
          >
            <component :is="tab.icon" class="w-3.5 h-3.5" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Sub-Tab Content -->
        <div class="space-y-8 pt-2">
          <!-- 1. Kosakata & Salam -->
          <div v-if="activeChapterTab === 'kosakata'" class="space-y-8">
            <Session2Greetings
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('tatabahasa')"
              @gain-xp="gainXp"
            />

            <Session3Vocabulary
              :show-romaji="showRomaji"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              @play-audio="playAudio"
              @toggle-memorized="toggleMemorized"
              @toggle-difficult="toggleDifficult"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- Kanji N5 Bab 1 -->
          <div v-else-if="activeChapterTab === 'kanji'" class="space-y-6">
            <ChapterKanjiView
              :lesson-number="1"
              :kanji-list="CHAPTER_1_KANJI"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @gain-xp="gainXp"
              @open-kanji-guide="() => goToStage('kanji')"
            />
          </div>

          <!-- 2. Tata Bahasa -->
          <div v-else-if="activeChapterTab === 'tatabahasa'" class="space-y-6">
            <Session4Grammar
              :show-romaji="showRomaji"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              @play-audio="playAudio"
              @toggle-grammar="toggleGrammar"
              @next-session="() => setChapterTab('latihan')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 3. Latihan & Dialog -->
          <div v-else-if="activeChapterTab === 'latihan'" class="space-y-8">
            <Session5SentenceBuilder
              :lesson-number="1"
              :challenges="SENTENCE_BUILDER_CHALLENGES_L1"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session6Conversation
              :lesson-number="1"
              :dialogues="INTERACTIVE_DIALOGUES_L1"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session7Exercises
              :lesson-number="1"
              :matching-pairs="VOCAB_MATCHING_PAIRS_L1"
              :particle-quizzes="PARTICLE_QUIZZES"
              :translate-quizzes="TRANSLATE_QUIZZES"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('simulator')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 4. Simulator Bab 1 -->
          <div v-else-if="activeChapterTab === 'simulator'" class="space-y-6">
            <SimulatorBab1
              :show-romaji="showRomaji"
              :default-name="currentUser?.displayName || 'Yasha'"
              @play-audio="playAudio"
            />
          </div>

          <!-- 5. Rangkuman & Evaluasi -->
          <div v-else-if="activeChapterTab === 'rangkuman'" class="space-y-6">
            <Session8Summary
              :lesson-number="1"
              :meta="LESSON_META"
              :sessions="LESSON_SESSIONS_L1"
              :evaluation-indicators="EVALUATION_INDICATORS"
              :study-plan="STUDY_PLAN_5_DAYS"
              :vocabularies="VOCABULARIES_DATA"
              :patterns="GRAMMAR_PATTERNS_DATA"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              :completed-evaluations="Array.from(checkedEvaluations)"
              :completed-study-days="Array.from(completedDays)"
              :xp="userXp"
              :streak="userStreak"
              @toggle-evaluation="toggleEvaluation"
              @toggle-study-day="toggleStudyDay"
              @go-to-session="() => setChapterTab('kosakata')"
              @switch-lesson="(num) => goToStage(num === 2 ? 'bab-2' : 'bab-1')"
            />
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 4: BAB 2 (BENDA & KEPEMILIKAN) -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'bab-2'" class="space-y-6 animate-fadeIn">
        <!-- Chapter Header Card -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
              <CubeIcon class="w-4 h-4 text-neutral-900" />
              <span>Minna no Nihongo I &bull; 第2課</span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Bab 2: Benda & Kepemilikan (これ・それ・あれ)
            </h2>
            <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
              Mempelajari kata tunjuk benda <strong>KORE, SORE, ARE</strong>, kata tunjuk spesifik <strong>KONO, SONO, ANO</strong>, kalimat tanya alternatif, dan kepemilikan partikel <strong>NO</strong>.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-mono font-bold">
              Siap Dipelajari
            </span>
          </div>
        </div>

        <!-- Focused Chapter Sub-Tabs -->
        <div class="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
          <button
            v-for="tab in CHAPTER_TABS"
            :key="tab.id"
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
            :class="
              activeChapterTab === tab.id
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
            "
            @click="setChapterTab(tab.id)"
          >
            <component :is="tab.icon" class="w-3.5 h-3.5" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Sub-Tab Content -->
        <div class="space-y-8 pt-2">
          <!-- 1. Kosakata & Demonstratif -->
          <div v-if="activeChapterTab === 'kosakata'" class="space-y-8">
            <Session2Demonstratives
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />

            <Session3Vocabulary
              :lesson-number="2"
              :vocabularies="VOCABULARIES_L2_DATA"
              :show-romaji="showRomaji"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              @play-audio="playAudio"
              @toggle-memorized="toggleMemorized"
              @toggle-difficult="toggleDifficult"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- Kanji N5 Bab 2 -->
          <div v-else-if="activeChapterTab === 'kanji'" class="space-y-6">
            <ChapterKanjiView
              :lesson-number="2"
              :kanji-list="CHAPTER_2_KANJI"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @gain-xp="gainXp"
              @open-kanji-guide="() => goToStage('kanji')"
            />
          </div>

          <!-- 2. Tata Bahasa -->
          <div v-else-if="activeChapterTab === 'tatabahasa'" class="space-y-6">
            <Session4Grammar
              :lesson-number="2"
              :patterns="GRAMMAR_PATTERNS_L2_DATA"
              :show-romaji="showRomaji"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              @play-audio="playAudio"
              @toggle-grammar="toggleGrammar"
              @next-session="() => setChapterTab('latihan')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 3. Latihan & Dialog -->
          <div v-else-if="activeChapterTab === 'latihan'" class="space-y-8">
            <Session5SentenceBuilder
              :lesson-number="2"
              :challenges="SENTENCE_BUILDER_CHALLENGES_L2"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session6Conversation
              :lesson-number="2"
              :dialogues="INTERACTIVE_DIALOGUES_L2"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session7Exercises
              :lesson-number="2"
              :matching-pairs="VOCAB_MATCHING_PAIRS_L2"
              :particle-quizzes="PARTICLE_QUIZZES_L2"
              :translate-quizzes="TRANSLATE_QUIZZES_L2"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('simulator')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 4. Simulator Bab 2 -->
          <div v-else-if="activeChapterTab === 'simulator'" class="space-y-6">
            <SimulatorBab2
              :show-romaji="showRomaji"
              @play-audio="playAudio"
            />
          </div>

          <!-- 5. Rangkuman & Evaluasi -->
          <div v-else-if="activeChapterTab === 'rangkuman'" class="space-y-6">
            <Session8Summary
              :lesson-number="2"
              :meta="LESSON_2_META"
              :sessions="LESSON_SESSIONS_L2"
              :evaluation-indicators="EVALUATION_INDICATORS_L2"
              :study-plan="STUDY_PLAN_5_DAYS_L2"
              :vocabularies="VOCABULARIES_L2_DATA"
              :patterns="GRAMMAR_PATTERNS_L2_DATA"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              :completed-evaluations="Array.from(checkedEvaluations)"
              :completed-study-days="Array.from(completedDays)"
              :xp="userXp"
              :streak="userStreak"
              @toggle-evaluation="toggleEvaluation"
              @toggle-study-day="toggleStudyDay"
              @go-to-session="() => setChapterTab('kosakata')"
              @switch-lesson="(num) => goToStage(num === 3 ? 'bab-3' : 'bab-2')"
            />
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 5: BAB 3 (TEMPAT, ARAH & HARGA) -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'bab-3'" class="space-y-6 animate-fadeIn">
        <!-- Chapter Header Card -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
              <BuildingOfficeIcon class="w-4 h-4 text-neutral-900" />
              <span>Minna no Nihongo I &bull; 第3課</span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Bab 3: Tempat, Arah & Harga (ここ・そこ・あそこ)
            </h2>
            <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
              Mempelajari kata tunjuk tempat <strong>KOKO, SOKO, ASOKO, DOKO</strong>, bentuk sopan <strong>KOCHIRA, SOCHIRA, ACHIRA</strong>, asal negara/perusahaan, lantai gedung, dan harga <strong>IKURA</strong>.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-mono font-bold">
              Siap Dipelajari
            </span>
          </div>
        </div>

        <!-- Focused Chapter Sub-Tabs -->
        <div class="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
          <button
            v-for="tab in CHAPTER_TABS"
            :key="tab.id"
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
            :class="
              activeChapterTab === tab.id
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
            "
            @click="setChapterTab(tab.id)"
          >
            <component :is="tab.icon" class="w-3.5 h-3.5" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Sub-Tab Content -->
        <div class="space-y-8 pt-2">
          <!-- 1. Kosakata & Lokasi -->
          <div v-if="activeChapterTab === 'kosakata'" class="space-y-8">
            <Session2Locations
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />

            <Session3Vocabulary
              :lesson-number="3"
              :vocabularies="VOCABULARIES_L3_DATA"
              :show-romaji="showRomaji"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              @play-audio="playAudio"
              @toggle-memorized="toggleMemorized"
              @toggle-difficult="toggleDifficult"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- Kanji N5 Bab 3 -->
          <div v-else-if="activeChapterTab === 'kanji'" class="space-y-6">
            <ChapterKanjiView
              :lesson-number="3"
              :kanji-list="CHAPTER_3_KANJI"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @gain-xp="gainXp"
              @open-kanji-guide="() => goToStage('kanji')"
            />
          </div>

          <!-- 2. Tata Bahasa -->
          <div v-else-if="activeChapterTab === 'tatabahasa'" class="space-y-6">
            <Session4Grammar
              :lesson-number="3"
              :patterns="GRAMMAR_PATTERNS_L3_DATA"
              :show-romaji="showRomaji"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              @play-audio="playAudio"
              @toggle-grammar="toggleGrammar"
              @next-session="() => setChapterTab('latihan')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 3. Latihan & Dialog -->
          <div v-else-if="activeChapterTab === 'latihan'" class="space-y-8">
            <Session5SentenceBuilder
              :lesson-number="3"
              :challenges="SENTENCE_BUILDER_CHALLENGES_L3"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session6Conversation
              :lesson-number="3"
              :dialogues="INTERACTIVE_DIALOGUES_L3"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session7Exercises
              :lesson-number="3"
              :matching-pairs="VOCAB_MATCHING_PAIRS_L3"
              :particle-quizzes="LOCATION_QUIZZES_L3"
              :translate-quizzes="TRANSLATE_QUIZZES_L3"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('simulator')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 4. Simulator Bab 3 -->
          <div v-else-if="activeChapterTab === 'simulator'" class="space-y-6">
            <SimulatorBab3
              :show-romaji="showRomaji"
              @play-audio="playAudio"
            />
          </div>

          <!-- 5. Rangkuman & Evaluasi -->
          <div v-else-if="activeChapterTab === 'rangkuman'" class="space-y-6">
            <Session8Summary
              :lesson-number="3"
              :meta="LESSON_3_META"
              :sessions="LESSON_SESSIONS_L3"
              :evaluation-indicators="EVALUATION_INDICATORS_L3"
              :study-plan="STUDY_PLAN_5_DAYS_L3"
              :vocabularies="VOCABULARIES_L3_DATA"
              :patterns="GRAMMAR_PATTERNS_L3_DATA"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              :completed-evaluations="Array.from(checkedEvaluations)"
              :completed-study-days="Array.from(completedDays)"
              :xp="userXp"
              :streak="userStreak"
              @toggle-evaluation="toggleEvaluation"
              @toggle-study-day="toggleStudyDay"
              @go-to-session="() => setChapterTab('kosakata')"
              @switch-lesson="() => goToStage('bab-4')"
            />
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 6: BAB 4 (WAKTU & AKTIVITAS) -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'bab-4'" class="space-y-6 animate-fadeIn">
        <!-- Chapter Header Card -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
              <ClockIcon class="w-4 h-4 text-neutral-900" />
              <span>Minna no Nihongo I &bull; 第4課</span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Bab 4: Waktu & Aktivitas (時間と日常の動詞)
            </h2>
            <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
              Mempelajari pembacaan jam (4時=よじ, 7時=しちじ, 9時=くじ), satuan menit (ふん/ぷん), nama hari seminggu, 4 bentuk konjugasi kata kerja sopan (<strong>ます・ません・ました・ませんでした</strong>), serta partikel waktu <strong>に・から・まで・と・ね</strong>.
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-mono font-bold">
              Siap Dipelajari
            </span>
          </div>
        </div>

        <!-- Focused Chapter Sub-Tabs -->
        <div class="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
          <button
            v-for="tab in CHAPTER_TABS"
            :key="tab.id"
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
            :class="
              activeChapterTab === tab.id
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
            "
            @click="setChapterTab(tab.id)"
          >
            <component :is="tab.icon" class="w-3.5 h-3.5" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Sub-Tab Content -->
        <div class="space-y-8 pt-2">
          <!-- 1. Kosakata & Jam/Hari -->
          <div v-if="activeChapterTab === 'kosakata'" class="space-y-8">
            <Session2TimeAndDays
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />

            <Session3Vocabulary
              :lesson-number="4"
              :vocabularies="VOCABULARIES_L4_DATA"
              :show-romaji="showRomaji"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              @play-audio="playAudio"
              @toggle-memorized="toggleMemorized"
              @toggle-difficult="toggleDifficult"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- Kanji N5 Bab 4 -->
          <div v-else-if="activeChapterTab === 'kanji'" class="space-y-6">
            <ChapterKanjiView
              :lesson-number="4"
              :kanji-list="CHAPTER_4_KANJI"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @gain-xp="gainXp"
              @open-kanji-guide="() => goToStage('kanji')"
            />
          </div>

          <!-- 2. Tata Bahasa -->
          <div v-else-if="activeChapterTab === 'tatabahasa'" class="space-y-6">
            <Session4Grammar
              :lesson-number="4"
              :patterns="GRAMMAR_PATTERNS_L4_DATA"
              :show-romaji="showRomaji"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              @play-audio="playAudio"
              @toggle-grammar="toggleGrammar"
              @next-session="() => setChapterTab('latihan')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 3. Latihan & Dialog -->
          <div v-else-if="activeChapterTab === 'latihan'" class="space-y-8">
            <Session5SentenceBuilder
              :lesson-number="4"
              :challenges="SENTENCE_BUILDER_CHALLENGES_L4"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session6Conversation
              :lesson-number="4"
              :dialogues="INTERACTIVE_DIALOGUES_L4"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session7Exercises
              :lesson-number="4"
              :matching-pairs="VOCAB_MATCHING_PAIRS_L4"
              :particle-quizzes="PARTICLE_QUIZZES_L4"
              :translate-quizzes="TRANSLATE_QUIZZES_L4"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('simulator')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 4. Simulator Bab 4 -->
          <div v-else-if="activeChapterTab === 'simulator'" class="space-y-6">
            <SimulatorBab4
              :show-romaji="showRomaji"
              @play-audio="playAudio"
            />
          </div>

          <!-- 5. Rangkuman & Evaluasi -->
          <div v-else-if="activeChapterTab === 'rangkuman'" class="space-y-6">
            <Session8Summary
              :lesson-number="4"
              :meta="LESSON_4_META"
              :sessions="LESSON_SESSIONS_L4"
              :evaluation-indicators="EVALUATION_INDICATORS_L4"
              :study-plan="STUDY_PLAN_5_DAYS_L4"
              :vocabularies="VOCABULARIES_L4_DATA"
              :patterns="GRAMMAR_PATTERNS_L4_DATA"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              :completed-evaluations="Array.from(checkedEvaluations)"
              :completed-study-days="Array.from(completedDays)"
              :xp="userXp"
              :streak="userStreak"
              @toggle-evaluation="toggleEvaluation"
              @toggle-study-day="toggleStudyDay"
              @go-to-session="() => setChapterTab('kosakata')"
              @switch-lesson="() => goToStage('bab-5')"
            />
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 7: BAB 5 (TRANSPORTASI, TUJUAN & PERJALANAN) -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'bab-5'" class="space-y-6 animate-fadeIn">
        <!-- Chapter Header Card -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
              <PaperAirplaneIcon class="w-4 h-4 text-neutral-900" />
              <span>Minna no Nihongo I &bull; 第5課</span>
            </div>
            <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Bab 5: Transportasi & Perjalanan (交通と目的地)
            </h2>
            <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
              Mempelajari 3 kata kerja gerakan (<strong>行きます・来ます・帰ります</strong>), ragam alat transportasi, serta 5 partikel perjalanan utama: tujuan (<strong>へ</strong>), sarana (<strong>で</strong>), teman (<strong>と / 一人で</strong>), asal (<strong>から</strong>), dan waktu (<strong>に / いつ</strong>).
            </p>
          </div>

          <div class="flex items-center gap-2 shrink-0">
            <span class="px-3 py-1.5 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-mono font-bold">
              Siap Dipelajari
            </span>
          </div>
        </div>

        <!-- Focused Chapter Sub-Tabs -->
        <div class="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
          <button
            v-for="tab in CHAPTER_TABS"
            :key="tab.id"
            type="button"
            class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
            :class="
              activeChapterTab === tab.id
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
            "
            @click="setChapterTab(tab.id)"
          >
            <component :is="tab.icon" class="w-3.5 h-3.5" />
            <span>{{ tab.label }}</span>
          </button>
        </div>

        <!-- Sub-Tab Content -->
        <div class="space-y-8 pt-2">
          <!-- 1. Kosakata & Transportasi -->
          <div v-if="activeChapterTab === 'kosakata'" class="space-y-8">
            <Session2Transport
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />

            <Session3Vocabulary
              :lesson-number="5"
              :vocabularies="VOCABULARIES_L5_DATA"
              :show-romaji="showRomaji"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              @play-audio="playAudio"
              @toggle-memorized="toggleMemorized"
              @toggle-difficult="toggleDifficult"
              @next-session="() => setChapterTab('kanji')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- Kanji N5 Bab 5 -->
          <div v-else-if="activeChapterTab === 'kanji'" class="space-y-6">
            <ChapterKanjiView
              :lesson-number="5"
              :kanji-list="CHAPTER_5_KANJI"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @gain-xp="gainXp"
              @open-kanji-guide="() => goToStage('kanji')"
            />
          </div>

          <!-- 2. Tata Bahasa -->
          <div v-else-if="activeChapterTab === 'tatabahasa'" class="space-y-6">
            <Session4Grammar
              :lesson-number="5"
              :patterns="GRAMMAR_PATTERNS_L5_DATA"
              :show-romaji="showRomaji"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              @play-audio="playAudio"
              @toggle-grammar="toggleGrammar"
              @next-session="() => setChapterTab('latihan')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 3. Latihan & Dialog -->
          <div v-else-if="activeChapterTab === 'latihan'" class="space-y-8">
            <Session5SentenceBuilder
              :lesson-number="5"
              :challenges="SENTENCE_BUILDER_CHALLENGES_L5"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session6Conversation
              :lesson-number="5"
              :dialogues="INTERACTIVE_DIALOGUES_L5"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => {}"
              @gain-xp="gainXp"
            />

            <Session7Exercises
              :lesson-number="5"
              :matching-pairs="VOCAB_MATCHING_PAIRS_L5"
              :particle-quizzes="PARTICLE_QUIZZES_L5"
              :translate-quizzes="TRANSLATE_QUIZZES_L5"
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @next-session="() => setChapterTab('simulator')"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 4. Simulator Bab 5 -->
          <div v-else-if="activeChapterTab === 'simulator'" class="space-y-6">
            <SimulatorBab5
              :show-romaji="showRomaji"
              @play-audio="playAudio"
              @gain-xp="gainXp"
            />
          </div>

          <!-- 5. Rangkuman & Evaluasi -->
          <div v-else-if="activeChapterTab === 'rangkuman'" class="space-y-6">
            <Session8Summary
              :lesson-number="5"
              :meta="LESSON_5_META"
              :sessions="LESSON_SESSIONS_L5"
              :evaluation-indicators="EVALUATION_INDICATORS_L5"
              :study-plan="STUDY_PLAN_5_DAYS_L5"
              :vocabularies="VOCABULARIES_L5_DATA"
              :patterns="GRAMMAR_PATTERNS_L5_DATA"
              :memorized-vocab-ids="Array.from(memorizedIds)"
              :difficult-vocab-ids="Array.from(difficultVocabIds)"
              :understood-grammar-ids="Array.from(understoodGrammarIds)"
              :completed-evaluations="Array.from(checkedEvaluations)"
              :completed-study-days="Array.from(completedDays)"
              :xp="userXp"
              :streak="userStreak"
              @toggle-evaluation="toggleEvaluation"
              @toggle-study-day="toggleStudyDay"
              @go-to-session="() => setChapterTab('kosakata')"
              @switch-lesson="() => goToStage('roadmap')"
            />
          </div>
        </div>
      </section>

      <!-- ------------------------------------------------------------ -->
      <!-- SCREEN 7: ROADMAP BELAJAR JLPT N5 (HORIZONTAL TIMELINE) -->
      <!-- ------------------------------------------------------------ -->
      <section v-else-if="currentStage === 'roadmap'" class="space-y-8 animate-fadeIn">
        <RoadmapN5View
          @navigate-nav="(nav) => {
            if (nav === 'kana') goToStage('huruf')
            else if (nav === 'numbers') goToStage('angka')
            else if (nav === 'kanji') goToStage('kanji')
          }"
          @switch-lesson="(num) => {
            if (num === 1) goToStage('bab-1')
            else if (num === 2) goToStage('bab-2')
            else if (num === 3) goToStage('bab-3')
            else if (num === 4) goToStage('bab-4')
            else if (num === 5) goToStage('bab-5')
          }"
        />
      </section>

      <!-- ============================================================== -->
      <!-- STAGE PROGRESSION FOOTER (Next / Previous Step Action Card) -->
      <!-- ============================================================== -->
      <div class="mt-12 pt-6 border-t border-neutral-200">
        <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-xs">
          <div class="space-y-1">
            <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
              Langkah Belajar Selanjutnya
            </span>
            <h3 class="font-display font-extrabold text-lg text-neutral-950">
              {{ stageProgressionMeta.next.title }}
            </h3>
            <p class="text-xs text-neutral-500 max-w-lg">
              {{ stageProgressionMeta.next.description }}
            </p>
          </div>

          <div class="flex items-center gap-3 shrink-0">
            <button
              v-if="stageProgressionMeta.prev"
              type="button"
              class="px-4 py-2.5 bg-white border border-neutral-200 hover:border-neutral-950 text-neutral-700 text-xs font-bold rounded-xl transition-all cursor-pointer shadow-2xs"
              @click="goToStage(stageProgressionMeta.prev.id)"
            >
              &larr; {{ stageProgressionMeta.prev.label }}
            </button>

            <button
              type="button"
              class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-xs flex items-center gap-2"
              @click="goToStage(stageProgressionMeta.next.id)"
            >
              <span>{{ stageProgressionMeta.next.actionLabel }}</span>
              <ArrowRightIcon class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Name Modal -->
    <Teleport to="body">
      <div
        v-if="showNameModal"
        class="fixed inset-0 bg-neutral-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs"
        @click.self="showNameModal = false"
      >
        <div class="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-neutral-200 shadow-2xl space-y-5">
          <div class="space-y-1">
            <h3 class="font-display font-bold text-lg text-neutral-950">Ubah Nama Profil</h3>
            <p class="text-xs text-neutral-500">Nama ini akan digunakan pada latihan roleplay dan sinkronisasi cloud.</p>
          </div>
          <input
            v-model="newNameInput"
            type="text"
            placeholder="Masukkan nama Anda"
            class="w-full px-4 py-3 border border-neutral-200 rounded-xl text-sm font-semibold focus:outline-none focus:border-neutral-950"
            @keyup.enter="handleSaveName"
          />
          <div v-if="nameModalError" class="text-xs text-rose-600 font-medium">
            {{ nameModalError }}
          </div>
          <div class="flex items-center justify-end gap-2.5 pt-2">
            <button
              type="button"
              class="px-4 py-2 text-xs font-bold text-neutral-600 hover:text-neutral-950 cursor-pointer"
              @click="showNameModal = false"
            >
              Batal
            </button>
            <button
              type="button"
              :disabled="isUpdatingName"
              class="px-5 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-colors cursor-pointer"
              @click="handleSaveName"
            >
              {{ isUpdatingName ? 'Menyimpan...' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>

    <!-- Toast Notification -->
    <Teleport to="body">
      <div
        v-if="toastNotification"
        class="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl border text-xs font-semibold flex items-center gap-2 animate-bounce-short"
        :class="
          toastNotification.type === 'success'
            ? 'bg-neutral-950 text-white border-neutral-800'
            : 'bg-rose-50 text-rose-900 border-rose-200'
        "
      >
        <span>{{ toastNotification.message }}</span>
      </div>
    </Teleport>

    <!-- Interactive Onboarding Coachmark Tour Modal -->
    <NihongoCoachmarkModal
      :is-open="isCoachmarkOpen"
      @close="isCoachmarkOpen = false"
      @complete="handleCoachmarkComplete"
    />

    <!-- User Feedback Modal -->
    <NihongoFeedbackModal
      :is-open="isFeedbackModalOpen"
      :default-user-name="currentUser?.displayName || ''"
      @close="isFeedbackModalOpen = false"
      @submitted="() => notify('Terima kasih! Feedback Anda telah berhasil terkirim.', 'success')"
    />
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.25s ease-out forwards;
}
</style>
