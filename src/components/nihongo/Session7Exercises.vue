<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  PARTICLE_QUIZZES,
  TRANSLATE_QUIZZES,
  VOCAB_MATCHING_PAIRS_L1,
  type ParticleQuiz,
  type MatchingPair,
  type TranslateQuiz,
} from '@/data/nihongoLesson1'
import {
  SpeakerWaveIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  EyeIcon,
  PuzzlePieceIcon,
  SparklesIcon,
  PencilSquareIcon,
} from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    showRomaji: boolean
    matchingPairs?: MatchingPair[]
    particleQuizzes?: ParticleQuiz[]
    translateQuizzes?: TranslateQuiz[]
    lessonNumber?: number
  }>(),
  {
    matchingPairs: () => VOCAB_MATCHING_PAIRS_L1,
    particleQuizzes: () => PARTICLE_QUIZZES,
    translateQuizzes: () => TRANSLATE_QUIZZES,
    lessonNumber: 1,
  }
)

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

const activeMatchingPairs = computed(() => props.matchingPairs ?? VOCAB_MATCHING_PAIRS_L1)
const activeParticleQuizzes = computed(() => props.particleQuizzes ?? PARTICLE_QUIZZES)
const activeTranslateQuizzes = computed(() => props.translateQuizzes ?? TRANSLATE_QUIZZES)

// Active tab within exercises: 'matching' | 'particles' | 'translate'
type ExerciseTab = 'matching' | 'particles' | 'translate'
const activeTab = ref<ExerciseTab>('matching')

// ==========================================
// 1. VOCABULARY MATCHING STATE
// ==========================================
interface MatchingCard {
  id: string
  pairId: string
  type: 'ja' | 'id'
  text: string
  subtext?: string
}

const selectedMatchingCard = ref<MatchingCard | null>(null)
const matchedPairIds = ref<Set<string>>(new Set())
const matchingError = ref<string | null>(null)

function generateMatchingCards(): MatchingCard[] {
  const cards: MatchingCard[] = []
  for (const pair of activeMatchingPairs.value) {
    cards.push({
      id: `ja-${pair.id}`,
      pairId: pair.id,
      type: 'ja',
      text: pair.japanese,
      subtext: pair.romaji,
    })
    cards.push({
      id: `id-${pair.id}`,
      pairId: pair.id,
      type: 'id',
      text: pair.indonesian,
    })
  }
  return cards.sort(() => 0.5 - Math.random())
}

// Flatten and shuffle matching cards
const matchingCards = ref<MatchingCard[]>(generateMatchingCards())

watch(() => props.matchingPairs, () => {
  resetMatching()
})

function handleSelectCard(card: MatchingCard) {
  if (matchedPairIds.value.has(card.pairId)) return // already matched

  if (!selectedMatchingCard.value) {
    selectedMatchingCard.value = card
    matchingError.value = null
    return
  }

  // Same card tapped again: unselect
  if (selectedMatchingCard.value.id === card.id) {
    selectedMatchingCard.value = null
    return
  }

  // Tapped cards must be different types (one Japanese, one Indonesian)
  if (selectedMatchingCard.value.type === card.type) {
    selectedMatchingCard.value = card
    return
  }

  // Check match
  if (selectedMatchingCard.value.pairId === card.pairId) {
    matchedPairIds.value.add(card.pairId)
    emit('gain-xp', 15)
    matchingError.value = null
    const jaText = card.type === 'ja' ? card.text : selectedMatchingCard.value.text
    emit('play-audio', jaText)
    selectedMatchingCard.value = null
  } else {
    matchingError.value = 'Pasangan belum tepat, silakan coba lagi!'
    setTimeout(() => {
      matchingError.value = null
    }, 1500)
    selectedMatchingCard.value = null
  }
}

function resetMatching() {
  matchedPairIds.value.clear()
  selectedMatchingCard.value = null
  matchingError.value = null
  matchingCards.value = generateMatchingCards()
}

// ==========================================
// 2. PARTICLE MULTIPLE-CHOICE QUIZZES
// ==========================================
const particleAnswers = ref<Record<number, string>>({})
const particleSubmitted = ref<Record<number, boolean>>({})

function selectParticle(quizId: number, opt: string) {
  if (particleSubmitted.value[quizId]) return
  particleAnswers.value[quizId] = opt
}

function submitParticle(quiz: ParticleQuiz) {
  if (!particleAnswers.value[quiz.id]) return
  particleSubmitted.value[quiz.id] = true
  if (particleAnswers.value[quiz.id] === quiz.correct) {
    emit('gain-xp', 15)
    emit('play-audio', quiz.fullSentence)
  }
}

function retryParticle(quizId: number) {
  delete particleAnswers.value[quizId]
  delete particleSubmitted.value[quizId]
}

const particleScore = computed(() => {
  return activeParticleQuizzes.value.filter(
    (q) => particleSubmitted.value[q.id] && particleAnswers.value[q.id] === q.correct
  ).length
})

// ==========================================
// 3. TRANSLATION EXERCISES
// ==========================================
const revealedTranslations = ref<Record<number, boolean>>({})

function revealTranslation(id: number) {
  revealedTranslations.value[id] = true
  const item = activeTranslateQuizzes.value.find((t) => t.id === id)
  if (item) {
    emit('gain-xp', 10)
    emit('play-audio', item.japanese)
  }
}

function resetAllExercises() {
  resetMatching()
  particleAnswers.value = {}
  particleSubmitted.value = {}
  revealedTranslations.value = {}
}
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">7</span>
          <span>Sesi 7: Latihan Mandiri &amp; Evaluasi (練習 &bull; Renshuu) Bab {{ props.lessonNumber }}</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-neutral-950">
          Uji Pemahaman Komprehensif
        </h2>
        <p class="text-xs text-neutral-600">
          Jodohkan kosakata, pilih partikel/kata tunjuk kalimat yang tepat, dan uji terjemahan aktif dengan umpan balik edukatif serta fitur coba ulang (*retry*).
        </p>
      </div>

      <!-- Tab Switcher -->
      <div class="flex items-center p-1 bg-white border border-neutral-200 rounded-xl shadow-xs self-start sm:self-center shrink-0 gap-1">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          :class="activeTab === 'matching' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'matching'"
        >
          <PuzzlePieceIcon class="w-3.5 h-3.5" />
          <span>Pasang Kata</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          :class="activeTab === 'particles' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'particles'"
        >
          <SparklesIcon class="w-3.5 h-3.5" />
          <span>{{ props.lessonNumber === 2 ? 'Kata Tunjuk / Partikel' : 'Partikel' }}</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          :class="activeTab === 'translate' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'translate'"
        >
          <PencilSquareIcon class="w-3.5 h-3.5" />
          <span>Terjemahan</span>
        </button>
      </div>
    </div>

    <!-- TAB 1: VOCABULARY MATCHING CHALLENGE -->
    <div v-if="activeTab === 'matching'" class="space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Tantangan Menjodohkan</span>
            <h3 class="font-display font-bold text-xl text-neutral-950 mt-0.5">
              Pasangkan Kata Bahasa Jepang dengan Artinya
            </h3>
          </div>
          <div class="text-right">
            <span class="text-xs font-mono font-bold text-neutral-950">
              {{ matchedPairIds.size }} / {{ activeMatchingPairs.length }} Pasang
            </span>
          </div>
        </div>

        <p class="text-xs text-neutral-500">
          Ketuk 1 kata bahasa Jepang dan 1 arti bahasa Indonesia yang sesuai untuk mencocokkan pasangan kata.
        </p>

        <!-- Matching Cards Grid -->
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            v-for="card in matchingCards"
            :key="card.id"
            type="button"
            :disabled="matchedPairIds.has(card.pairId)"
            class="p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center min-h-[90px] select-none"
            :class="
              matchedPairIds.has(card.pairId)
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 opacity-60 cursor-default'
                : selectedMatchingCard?.id === card.id
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-102'
                : 'bg-white border-neutral-200 hover:border-neutral-950 text-neutral-900'
            "
            @click="handleSelectCard(card)"
          >
            <div
              class="font-bold font-sans"
              :class="card.type === 'ja' ? 'text-lg sm:text-xl' : 'text-xs sm:text-sm'"
            >
              {{ card.text }}
            </div>
            <div v-if="card.subtext && props.showRomaji" class="text-[10px] font-mono opacity-70 mt-0.5">
              {{ card.subtext }}
            </div>
          </button>
        </div>

        <!-- Matching Error Message -->
        <div v-if="matchingError" class="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs text-center rounded-xl font-medium animate-shake">
          {{ matchingError }}
        </div>

        <!-- Success Banner -->
        <div
          v-if="matchedPairIds.size === activeMatchingPairs.length"
          class="p-5 bg-emerald-50 border border-emerald-300 rounded-2xl text-center space-y-2 text-emerald-950 animate-fadeIn"
        >
          <div class="flex justify-center">
            <SparklesIcon class="w-10 h-10 text-emerald-600" />
          </div>
          <div class="font-display font-bold text-lg">Luar Biasa! Semua Pasangan Cocok!</div>
          <p class="text-xs text-emerald-800">
            Anda berhasil mengingat seluruh {{ activeMatchingPairs.length }} pasangan kata penting Bab {{ props.lessonNumber }} dengan sempurna.
          </p>
          <button
            type="button"
            class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            @click="activeTab = 'particles'"
          >
            Lanjut ke Kuis Partikel &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 2: PARTICLE MULTIPLE CHOICE QUIZZES -->
    <div v-else-if="activeTab === 'particles'" class="space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">
              {{ props.lessonNumber === 2 ? 'Kuis Kata Tunjuk & Partikel' : 'Kuis Partikel Kalimat' }}
            </span>
            <h3 class="font-display font-bold text-xl text-neutral-950 mt-0.5">
              {{ props.lessonNumber === 2 ? 'Pilih Kata Tunjuk & Partikel yang Sesuai' : 'Pilih Partikel yang Tepat (は, も, の, か)' }}
            </h3>
          </div>
          <div class="text-xs font-mono bg-neutral-100 px-3 py-1 rounded-full text-neutral-800">
            Skor: <strong class="text-neutral-950">{{ particleScore }} / {{ activeParticleQuizzes.length }}</strong>
          </div>
        </div>

        <div class="space-y-4">
          <div
            v-for="q in activeParticleQuizzes"
            :key="q.id"
            class="p-5 rounded-2xl border bg-neutral-50/50 space-y-3"
            :class="
              particleSubmitted[q.id]
                ? particleAnswers[q.id] === q.correct
                  ? 'border-emerald-300 bg-emerald-50/30'
                  : 'border-rose-300 bg-rose-50/30'
                : 'border-neutral-200'
            "
          >
            <!-- Sentence Row -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="text-base sm:text-lg font-medium text-neutral-950">
                <span class="font-mono text-neutral-400 mr-2 font-bold">{{ q.id }}.</span>
                <span>{{ q.sentenceBefore }}</span>
                <span
                  class="mx-2 px-3 py-1 rounded-lg border font-mono font-bold text-base inline-block"
                  :class="
                    !particleAnswers[q.id]
                      ? 'bg-white border-dashed border-neutral-400 text-neutral-400'
                      : particleSubmitted[q.id]
                      ? particleAnswers[q.id] === q.correct
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-rose-600 text-white border-rose-600'
                      : 'bg-neutral-950 text-white border-neutral-950'
                  "
                >
                  {{ particleAnswers[q.id] || '??' }}
                </span>
                <span>{{ q.sentenceAfter }}</span>
              </div>

              <!-- Options -->
              <div class="flex items-center gap-2 flex-wrap">
                <button
                  v-for="opt in q.options"
                  :key="opt"
                  type="button"
                  :disabled="particleSubmitted[q.id]"
                  class="px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border"
                  :class="
                    particleAnswers[q.id] === opt
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-white text-neutral-800 border-neutral-300 hover:border-neutral-950'
                  "
                  @click="selectParticle(q.id, opt)"
                >
                  {{ opt }}
                </button>

                <!-- Submit Button for this item -->
                <button
                  v-if="particleAnswers[q.id] && !particleSubmitted[q.id]"
                  type="button"
                  class="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold uppercase transition-all shadow-xs"
                  @click="submitParticle(q)"
                >
                  Periksa
                </button>

                <!-- Retry Button -->
                <button
                  v-if="particleSubmitted[q.id] && particleAnswers[q.id] !== q.correct"
                  type="button"
                  class="px-3 py-2 bg-white border border-rose-300 text-rose-800 hover:bg-rose-100 rounded-xl text-xs font-semibold transition-all"
                  @click="retryParticle(q.id)"
                >
                  Coba Ulang
                </button>
              </div>
            </div>

            <!-- Feedback with Reason -->
            <div
              v-if="particleSubmitted[q.id]"
              class="pt-3 border-t border-neutral-200 text-xs space-y-1"
              :class="particleAnswers[q.id] === q.correct ? 'text-emerald-900' : 'text-neutral-800'"
            >
              <div class="flex items-center gap-2 font-bold">
                <span v-if="particleAnswers[q.id] === q.correct" class="flex items-center gap-1 text-emerald-700">
                  <CheckIcon class="w-4 h-4 font-bold" />
                  <span>Benar Sekali!</span>
                </span>
                <span v-else class="text-rose-600 flex items-center gap-1">
                  <XMarkIcon class="w-4 h-4 font-bold" />
                  <span>Belum tepat (Jawaban: {{ q.correct }}).</span>
                </span>
                <span class="font-normal text-neutral-600">&mdash; {{ q.reason }}</span>
              </div>
              <div class="text-[11px] text-neutral-500 italic">
                Kalimat utuh: {{ q.fullSentence }} ({{ q.indonesian }})
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: TRANSLATION & ACTIVE RECALL -->
    <div v-else class="space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="border-b border-neutral-100 pb-4">
          <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Latihan Terjemahan</span>
          <h3 class="font-display font-bold text-xl text-neutral-950 mt-0.5">
            Terjemahkan Kalimat ke Bahasa Jepang
          </h3>
          <p class="text-xs text-neutral-500 mt-1">
            Ucapkan atau pikirkan terjemahan terlebih dahulu sebelum membuka kunci jawaban.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="t in activeTranslateQuizzes"
            :key="t.id"
            class="border border-neutral-200 rounded-2xl p-5 bg-[#FAFAFA] flex flex-col justify-between space-y-3"
          >
            <div>
              <span class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">Nomor 0{{ t.id }}</span>
              <p class="text-base font-bold text-neutral-950 mt-1">&ldquo;{{ t.indonesian }}&rdquo;</p>
            </div>

            <div class="pt-3 border-t border-neutral-200/60">
              <div v-if="revealedTranslations[t.id]" class="space-y-1.5 animate-fadeIn">
                <div class="text-base font-bold text-neutral-950 font-sans">{{ t.japanese }}</div>
                <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-500">{{ t.romaji }}</div>
                <button
                  type="button"
                  class="text-[11px] font-semibold text-neutral-800 hover:underline pt-1 inline-flex items-center gap-1.5 font-mono cursor-pointer"
                  @click="emit('play-audio', t.japanese)"
                >
                  <SpeakerWaveIcon class="w-3.5 h-3.5" />
                  <span>Dengarkan Suara</span>
                </button>
              </div>

              <button
                v-else
                type="button"
                class="w-full py-2.5 bg-white border border-neutral-300 hover:border-neutral-950 rounded-xl text-xs font-bold text-neutral-800 uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                @click="revealTranslation(t.id)"
              >
                <EyeIcon class="w-4 h-4" />
                <span>Buka Kunci Jawaban</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Reset All Button -->
    <div class="text-center pt-2">
      <button
        type="button"
        class="px-4 py-2 bg-white border border-neutral-200 hover:border-neutral-950 rounded-full text-xs font-mono uppercase tracking-wider transition-colors text-neutral-600 inline-flex items-center gap-1.5 cursor-pointer"
        @click="resetAllExercises"
      >
        <ArrowPathIcon class="w-3.5 h-3.5" />
        <span>Reset Seluruh Latihan &amp; Kuis</span>
      </button>
    </div>

    <!-- Session Navigation Footer -->
    <div class="pt-6 border-t border-neutral-200 flex items-center justify-between">
      <span class="text-xs text-neutral-500 font-mono">
        Latihan selesai? Mari tinjau hasil kelulusan Anda di Sesi 8.
      </span>
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 8: Rangkuman &amp; Kelulusan</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
