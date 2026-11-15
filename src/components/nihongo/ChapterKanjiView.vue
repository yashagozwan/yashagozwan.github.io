<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChapterKanjiItem } from '@/data/nihongoKanjiChapters'
import {
  SpeakerWaveIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
  BookOpenIcon,
  LightBulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  lessonNumber: number
  kanjiList: ChapterKanjiItem[]
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'gain-xp', amount: number): void
  (e: 'open-kanji-guide'): void
}>()

// Sub-mode: 'grid' (Kartu Hafalan Kanji) | 'quiz' (Kuis Tebak Kanji)
const viewMode = ref<'grid' | 'quiz'>('grid')

// Modal state for Individual Kanji Card Detail Inspection
const isCardModalOpen = ref(false)

// Active selected Kanji for inspection detail
const selectedKanji = ref<ChapterKanjiItem | null>(props.kanjiList[0] || null)

function selectKanji(k: ChapterKanjiItem) {
  selectedKanji.value = k
  // Speak the primary reading
  const primaryReading = k.kunyomi[0]?.split(' ')[0]?.replace(/[・()]/g, '') || k.onyomi[0]?.split(' ')[0] || k.kanji
  emit('play-audio', primaryReading)
}

function openCardDetail(k: ChapterKanjiItem) {
  selectedKanji.value = k
  isCardModalOpen.value = true
  selectKanji(k)
}

function prevCardKanji() {
  if (!selectedKanji.value) return
  const currIdx = props.kanjiList.findIndex((item) => item.id === selectedKanji.value?.id)
  if (currIdx > 0) {
    selectedKanji.value = props.kanjiList[currIdx - 1]
    selectKanji(selectedKanji.value)
  }
}

function nextCardKanji() {
  if (!selectedKanji.value) return
  const currIdx = props.kanjiList.findIndex((item) => item.id === selectedKanji.value?.id)
  if (currIdx < props.kanjiList.length - 1) {
    selectedKanji.value = props.kanjiList[currIdx + 1]
    selectKanji(selectedKanji.value)
  }
}

function playWordAudio(word: { japanese: string }) {
  emit('play-audio', word.japanese)
}

// -------------------------------------------------------------
// KANJI QUIZ LOGIC
// -------------------------------------------------------------
const quizIndex = ref(0)
const quizAnswer = ref<string | null>(null)
const quizScore = ref(0)
const quizSubmitted = ref(false)

const currentQuiz = computed(() => {
  if (!props.kanjiList.length) return null
  const target = props.kanjiList[quizIndex.value % props.kanjiList.length]

  // Generate 4 options (1 correct, 3 distractors)
  const distractors = props.kanjiList
    .filter((k) => k.id !== target.id)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)

  const allOpts = [target, ...distractors].sort(() => Math.random() - 0.5)

  return {
    target,
    options: allOpts.map((k) => ({
      id: k.id,
      kanji: k.kanji,
      meaning: k.meaning,
      reading: k.kunyomi[0] || k.onyomi[0] || '',
    })),
  }
})

function handleQuizAnswer(optId: string) {
  if (quizAnswer.value !== null || !currentQuiz.value) return
  quizAnswer.value = optId
  if (optId === currentQuiz.value.target.id) {
    quizScore.value += 20
    emit('gain-xp', 20)
  }
}

function nextQuizQuestion() {
  if (quizIndex.value < props.kanjiList.length - 1) {
    quizIndex.value++
    quizAnswer.value = null
  } else {
    quizSubmitted.value = true
  }
}

function resetQuiz() {
  quizIndex.value = 0
  quizAnswer.value = null
  quizScore.value = 0
  quizSubmitted.value = false
}
</script>

<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <!-- Header Card -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <BookOpenIcon class="w-4 h-4 text-neutral-900" />
          <span>Kanji JLPT N5 &bull; Bab {{ lessonNumber }}</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Kanji Wajib Hafal Bab {{ lessonNumber }} ({{ kanjiList.length }} Kanji)
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
          Kuasai bentuk kanji, jumlah coretan, cara baca Onyomi (Cina) & Kunyomi (Jepang), jembatan keledai (*mnemonic*), serta contoh kata kosakata Bab {{ lessonNumber }}.
        </p>
      </div>

      <!-- Mode Toggle & Guide Button -->
      <div class="flex flex-wrap items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border border-neutral-300 hover:border-neutral-950 bg-white hover:bg-neutral-50 text-neutral-800 flex items-center gap-1.5 cursor-pointer shadow-2xs"
          @click="emit('open-kanji-guide')"
        >
          <BookOpenIcon class="w-4 h-4 text-neutral-900" />
          <span>Panduan On & Kun (Layar Penuh)</span>
        </button>

        <div class="flex items-center gap-1.5 p-1 bg-white border border-neutral-200 rounded-2xl shadow-2xs">
          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            :class="viewMode === 'grid' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
            @click="viewMode = 'grid'"
          >
            <BookOpenIcon class="w-3.5 h-3.5" />
            <span>Kartu Kanji</span>
          </button>

          <button
            type="button"
            class="px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
            :class="viewMode === 'quiz' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
            @click="viewMode = 'quiz'"
          >
            <SparklesIcon class="w-3.5 h-3.5" />
            <span>Kuis Tebak Kanji</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Quick Guide Callout Banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
      <div class="flex items-start sm:items-center gap-3">
        <div class="w-9 h-9 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
          <LightBulbIcon class="w-4 h-4 text-white" />
        </div>
        <div class="space-y-0.5">
          <div class="text-xs font-bold text-neutral-950 flex items-center gap-2">
            <span>Tips Pemula: Bingung beda On'yomi (音) vs Kun'yomi (訓)?</span>
          </div>
          <p class="text-[11px] text-neutral-600 leading-relaxed">
            Rumus 80/20: Kanji <strong>berdiri sendiri</strong> dibaca <em>Kun'yomi</em>; saat <strong>dua/lebih kanji bergandengan</strong> dibaca <em>On'yomi</em>.
          </p>
        </div>
      </div>
      <button
        type="button"
        class="px-3.5 py-1.5 bg-white border border-neutral-300 hover:border-neutral-950 rounded-xl text-xs font-bold text-neutral-900 transition flex items-center gap-1.5 cursor-pointer shrink-0 self-start sm:self-auto shadow-2xs"
        @click="emit('open-kanji-guide')"
      >
        <span>Buka Layar Panduan On & Kun</span>
        <ArrowRightIcon class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- ============================================================== -->
    <!-- MODE 1: KANJI CARDS GRID & INSPECTOR -->
    <!-- ============================================================== -->
    <div v-if="viewMode === 'grid'" class="space-y-6">
      <!-- Active Kanji Detail Inspector (Hero Box) -->
      <div v-if="selectedKanji" class="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-center gap-6">
          <!-- Big Kanji Character Pin -->
          <div class="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white/10 border border-white/20 flex flex-col items-center justify-center shrink-0 shadow-inner">
            <span class="font-sans font-black text-5xl sm:text-6xl text-white">
              {{ selectedKanji.kanji }}
            </span>
            <span class="text-[10px] font-mono text-neutral-400 mt-1">
              {{ selectedKanji.strokeCount }} Coretan
            </span>
          </div>

          <div class="space-y-1.5">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold px-2 py-0.5 rounded bg-white/10 text-neutral-300">
                Bab {{ selectedKanji.chapter }}
              </span>
              <span class="text-xs font-mono text-neutral-400">
                Arti: <strong class="text-white">{{ selectedKanji.meaning }}</strong>
              </span>
            </div>

            <!-- Onyomi & Kunyomi Reading Row -->
            <div class="text-xs sm:text-sm font-mono space-y-0.5">
              <div v-if="selectedKanji.onyomi.length" class="text-neutral-300 flex items-center gap-2">
                <span><span class="text-neutral-500">Onyomi (音):</span> {{ selectedKanji.onyomi.join(', ') }}</span>
                <button
                  type="button"
                  class="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                  @click="emit('open-kanji-guide')"
                >
                  (Apa itu On?)
                </button>
              </div>
              <div v-if="selectedKanji.kunyomi.length" class="text-neutral-300 flex items-center gap-2">
                <span><span class="text-neutral-500">Kunyomi (訓):</span> {{ selectedKanji.kunyomi.join(', ') }}</span>
                <button
                  type="button"
                  class="text-[10px] text-neutral-400 hover:text-white underline cursor-pointer"
                  @click="emit('open-kanji-guide')"
                >
                  (Apa itu Kun?)
                </button>
              </div>
            </div>

            <!-- Mnemonic Callout -->
            <p class="text-xs text-neutral-300 italic pt-1 max-w-xl">
              "{{ selectedKanji.mnemonic }}"
            </p>
          </div>
        </div>

        <button
          type="button"
          class="px-4 py-2.5 bg-white text-neutral-950 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:bg-neutral-200 shrink-0 self-start md:self-auto"
          @click="selectKanji(selectedKanji)"
        >
          <SpeakerWaveIcon class="w-4 h-4" />
          <span>Dengarkan Cara Baca</span>
        </button>
      </div>

      <!-- Kanji Grid of Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="k in kanjiList"
          :key="k.id"
          class="bg-white border rounded-3xl p-5 sm:p-6 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between gap-4"
          :class="selectedKanji?.id === k.id ? 'border-neutral-950 ring-2 ring-neutral-950/20' : 'border-neutral-200 hover:border-neutral-400'"
          @click="openCardDetail(k)"
        >
          <!-- Top Row: Kanji Pin & Meaning -->
          <div class="flex items-start justify-between gap-3">
            <div class="flex items-center gap-3">
              <div class="w-14 h-14 rounded-2xl bg-neutral-100 flex items-center justify-center shrink-0 border border-neutral-200">
                <span class="font-sans font-black text-3xl text-neutral-950">
                  {{ k.kanji }}
                </span>
              </div>
              <div>
                <span class="text-[10px] font-mono text-neutral-400 uppercase tracking-widest font-bold">
                  {{ k.strokeCount }} Coretan
                </span>
                <h4 class="font-display font-extrabold text-base text-neutral-950 leading-tight">
                  {{ k.meaning }}
                </h4>
              </div>
            </div>

            <button
              type="button"
              class="p-2 rounded-xl text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-colors cursor-pointer"
              title="Dengarkan Cara Baca"
              @click.stop="selectKanji(k)"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
            </button>
          </div>

          <!-- Onyomi & Kunyomi Pills -->
          <div class="space-y-1 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100 text-xs font-mono">
            <div v-if="k.onyomi.length" class="text-neutral-700 flex items-baseline gap-1">
              <span class="text-[10px] font-bold text-neutral-400 w-12 shrink-0">ON:</span>
              <span class="font-bold text-neutral-900">{{ k.onyomi.join(', ') }}</span>
            </div>
            <div v-if="k.kunyomi.length" class="text-neutral-700 flex items-baseline gap-1">
              <span class="text-[10px] font-bold text-neutral-400 w-12 shrink-0">KUN:</span>
              <span class="font-bold text-neutral-900">{{ k.kunyomi.join(', ') }}</span>
            </div>
          </div>

          <!-- Mnemonic Hint -->
          <div class="text-[11px] text-neutral-500 leading-relaxed">
            <strong class="text-neutral-700 font-semibold">Mnemonic:</strong> {{ k.mnemonic }}
          </div>

          <!-- Sample Words using this Kanji -->
          <div class="space-y-1.5 pt-2 border-t border-neutral-100">
            <div class="text-[10px] font-mono uppercase text-neutral-400 font-bold">
              Contoh Kata Kosakata Bab {{ k.chapter }}:
            </div>
            <div class="space-y-1">
              <div
                v-for="(w, wIdx) in k.sampleWords"
                :key="wIdx"
                class="flex items-center justify-between text-xs py-1 px-2 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors"
                @click.stop="playWordAudio(w)"
              >
                <div>
                  <strong class="font-sans font-bold text-neutral-950">{{ w.japanese }}</strong>
                  <span class="text-neutral-500 font-mono text-[11px]"> ({{ w.hiragana }})</span>
                  <span class="text-neutral-400"> &bull; {{ w.meaning }}</span>
                </div>
                <SpeakerWaveIcon class="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-950 shrink-0 ml-1" />
              </div>
            </div>
          </div>

          <!-- Card Bottom Action: Open Modal -->
          <div class="pt-2 flex items-center justify-between border-t border-neutral-100">
            <span class="text-xs font-bold text-neutral-900 hover:underline flex items-center gap-1">
              <span>Buka Detail & Audio</span>
              <ArrowRightIcon class="w-3.5 h-3.5" />
            </span>
            <span class="text-[10px] font-mono text-neutral-400">Bab {{ k.chapter }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- MODE 2: KANJI QUIZ (KUIS TEBAK KANJI) -->
    <!-- ============================================================== -->
    <div v-else-if="viewMode === 'quiz'" class="space-y-6">
      <div v-if="!quizSubmitted && currentQuiz" class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Pertanyaan {{ quizIndex + 1 }} dari {{ kanjiList.length }}</span>
          <span>Skor: {{ quizScore }} XP</span>
        </div>

        <!-- Big Kanji Question Prompt -->
        <div class="text-center space-y-2 py-4">
          <div class="w-24 h-24 mx-auto rounded-3xl bg-neutral-950 text-white flex items-center justify-center font-sans font-black text-5xl shadow-md">
            {{ currentQuiz.target.kanji }}
          </div>
          <h3 class="font-display font-extrabold text-xl text-neutral-950 mt-3">
            Apa arti dan cara baca dari karakter Kanji di atas?
          </h3>
          <p class="text-xs text-neutral-500">
            Pilihlah arti yang tepat dari kosakata Bab {{ lessonNumber }}.
          </p>
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          <button
            v-for="opt in currentQuiz.options"
            :key="opt.id"
            type="button"
            class="p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between"
            :class="[
              quizAnswer === null
                ? 'bg-white border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50 text-neutral-800'
                : opt.id === currentQuiz.target.id
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                : opt.id === quizAnswer
                ? 'bg-rose-50 border-rose-500 text-rose-900'
                : 'bg-white border-neutral-200 text-neutral-400 opacity-60'
            ]"
            @click="handleQuizAnswer(opt.id)"
          >
            <div class="font-display font-bold text-sm text-neutral-950">
              {{ opt.meaning }}
            </div>
            <div class="text-xs font-mono text-neutral-500 mt-1">
              Cara baca: {{ opt.reading }}
            </div>
          </button>
        </div>

        <!-- Feedback & Next Button -->
        <div v-if="quizAnswer !== null" class="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 max-w-2xl mx-auto">
          <p class="text-xs text-neutral-600">
            <strong>Mnemonic:</strong> {{ currentQuiz.target.mnemonic }}
          </p>

          <button
            type="button"
            class="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 hover:bg-neutral-800"
            @click="nextQuizQuestion"
          >
            <span>{{ quizIndex < kanjiList.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil' }}</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Quiz Completed Score Card -->
      <div v-else class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 text-center space-y-4 shadow-xs">
        <div class="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
          <CheckIcon class="w-6 h-6" />
        </div>
        <h3 class="font-display font-extrabold text-2xl text-neutral-950">
          Kuis Kanji Bab {{ lessonNumber }} Selesai!
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
          Skor perolehan Anda: <strong>{{ quizScore }} XP</strong>. Terus latih ingatan visual Kanji ini untuk kelulusan ujian JLPT N5!
        </p>
        <div class="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            class="px-4 py-2 border border-neutral-300 bg-white text-neutral-700 text-xs font-bold rounded-xl hover:border-neutral-950 transition-all cursor-pointer"
            @click="resetQuiz"
          >
            Ulangi Kuis
          </button>
          <button
            type="button"
            class="px-5 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition-all cursor-pointer"
            @click="viewMode = 'grid'"
          >
            Kembali ke Kartu Kanji &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- Dialog Penjelasan Detail Satu Huruf Kanji -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isCardModalOpen && selectedKanji"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/70 backdrop-blur-sm"
        @click.self="isCardModalOpen = false"
      >
        <div class="bg-white border border-neutral-200 rounded-3xl max-w-xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleIn text-neutral-950">
          <!-- Modal Header -->
          <div class="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
            <div class="flex items-center gap-2">
              <span class="font-mono text-xs uppercase tracking-wider text-neutral-500 font-bold">
                Bab {{ selectedKanji.chapter }} &bull; Detail Penjelasan Kanji
              </span>
            </div>
            <button
              type="button"
              class="p-2 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition cursor-pointer"
              @click="isCardModalOpen = false"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Body -->
          <div class="p-6 overflow-y-auto space-y-6">
            <!-- Hero Character Box -->
            <div class="bg-neutral-950 text-white rounded-3xl p-6 flex items-center justify-between gap-4 shadow-xl">
              <div class="flex items-center gap-5">
                <div class="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex flex-col items-center justify-center shrink-0">
                  <span class="font-sans font-black text-5xl text-white">{{ selectedKanji.kanji }}</span>
                  <span class="text-[9px] font-mono text-neutral-400 mt-0.5">{{ selectedKanji.strokeCount }} Coretan</span>
                </div>
                <div>
                  <h4 class="font-display font-black text-2xl text-white">{{ selectedKanji.meaning }}</h4>
                  <p class="text-xs text-neutral-300 italic pt-1">"{{ selectedKanji.mnemonic }}"</p>
                </div>
              </div>

              <button
                type="button"
                class="p-3 bg-white text-neutral-950 rounded-2xl hover:bg-neutral-200 transition cursor-pointer shrink-0 shadow-xs"
                title="Dengarkan pengucapan kanji"
                @click="selectKanji(selectedKanji)"
              >
                <SpeakerWaveIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Onyomi & Kunyomi Reading Split -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <!-- Kun'yomi Box -->
              <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Kun'yomi (訓・Jepang)
                  </span>
                  <button
                    type="button"
                    class="text-[10px] text-neutral-500 hover:text-neutral-950 underline cursor-pointer"
                    @click="isCardModalOpen = false; emit('open-kanji-guide')"
                  >
                    Apa itu Kun?
                  </button>
                </div>
                <div class="font-mono text-sm font-bold text-neutral-950">
                  {{ selectedKanji.kunyomi.length ? selectedKanji.kunyomi.join(', ') : '-' }}
                </div>
                <div class="text-[11px] text-neutral-500">
                  Dipakai saat kanji berdiri sendiri atau ada ekor hiragana.
                </div>
              </div>

              <!-- On'yomi Box -->
              <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 space-y-1.5">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-500">
                    On'yomi (音・Cina)
                  </span>
                  <button
                    type="button"
                    class="text-[10px] text-neutral-500 hover:text-neutral-950 underline cursor-pointer"
                    @click="isCardModalOpen = false; emit('open-kanji-guide')"
                  >
                    Apa itu On?
                  </button>
                </div>
                <div class="font-mono text-sm font-bold text-neutral-950">
                  {{ selectedKanji.onyomi.length ? selectedKanji.onyomi.join(', ') : '-' }}
                </div>
                <div class="text-[11px] text-neutral-500">
                  Dipakai saat digabung dengan kanji lain (kata majemuk).
                </div>
              </div>
            </div>

            <!-- Sample Words with Audio -->
            <div class="space-y-2">
              <div class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                Contoh Kosakata yang Menggunakan Kanji {{ selectedKanji.kanji }}:
              </div>
              <div class="space-y-1.5">
                <div
                  v-for="(w, idx) in selectedKanji.sampleWords"
                  :key="idx"
                  class="flex items-center justify-between p-3 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-50 transition cursor-pointer"
                  @click="playWordAudio(w)"
                >
                  <div>
                    <span class="font-sans font-black text-base text-neutral-950">{{ w.japanese }}</span>
                    <span class="font-mono text-xs text-neutral-500 ml-2">({{ w.hiragana }} &bull; {{ w.romaji }})</span>
                    <div class="text-xs text-neutral-700 mt-0.5">{{ w.meaning }}</div>
                  </div>
                  <div class="p-2 rounded-xl bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
                    <SpeakerWaveIcon class="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Modal Footer with Prev / Next Navigation -->
          <div class="p-4 border-t border-neutral-200 bg-neutral-50/70 flex items-center justify-between gap-3">
            <button
              type="button"
              class="px-3.5 py-2 border border-neutral-300 hover:border-neutral-950 bg-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              @click="prevCardKanji"
            >
              <ChevronLeftIcon class="w-4 h-4" />
              <span>Sebelumnya</span>
            </button>

            <button
              type="button"
              class="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold transition hover:bg-neutral-800 cursor-pointer"
              @click="isCardModalOpen = false"
            >
              Selesai Membaca
            </button>

            <button
              type="button"
              class="px-3.5 py-2 border border-neutral-300 hover:border-neutral-950 bg-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
              @click="nextCardKanji"
            >
              <span>Selanjutnya</span>
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>
