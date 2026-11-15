<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  HIRAGANA_BASIC,
  HIRAGANA_DAKUON,
  HIRAGANA_YOUON,
  KATAKANA_BASIC,
  KATAKANA_DAKUON,
  KATAKANA_YOUON,
  type KanaCharacter,
} from '@/data/nihongoKana'
import KanaStrokeAnimator from '@/components/nihongo/KanaStrokeAnimator.vue'
import {
  SpeakerWaveIcon,
  LanguageIcon,
  ArrowPathIcon,
  SparklesIcon,
  AcademicCapIcon,
  LightBulbIcon,
  BookOpenIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'gain-xp', amount: number): void
  (e: 'start-lesson', lessonNum: number): void
  (e: 'go-to-kanji'): void
}>()

// Main mode: 'hiragana' or 'katakana'
const currentScript = ref<'hiragana' | 'katakana'>('hiragana')

// Sub-filter: 'basic' (Gojuuon), 'dakuon' (Tenten/Maru), 'youon' (Kombinasi)
const currentCategory = ref<'basic' | 'dakuon' | 'youon'>('basic')

// Practice Quiz State
const isQuizMode = ref(false)
const quizIndex = ref(0)
const quizAnswer = ref<string | null>(null)
const quizScore = ref(0)
const quizType = ref<'kana-to-romaji' | 'romaji-to-kana'>('kana-to-romaji')

// Active selected character for inspection & animated stroke order
const selectedChar = ref<KanaCharacter | null>(HIRAGANA_BASIC[0])

watch(currentScript, (newScript) => {
  selectedChar.value = newScript === 'hiragana' ? HIRAGANA_BASIC[0] : KATAKANA_BASIC[0]
})

const activeKanaList = computed<KanaCharacter[]>(() => {
  if (currentScript.value === 'hiragana') {
    if (currentCategory.value === 'basic') return HIRAGANA_BASIC
    if (currentCategory.value === 'dakuon') return HIRAGANA_DAKUON
    return HIRAGANA_YOUON
  } else {
    if (currentCategory.value === 'basic') return KATAKANA_BASIC
    if (currentCategory.value === 'dakuon') return KATAKANA_DAKUON
    return KATAKANA_YOUON
  }
})

function handleCharClick(char: KanaCharacter) {
  selectedChar.value = char
  emit('play-audio', char.kana)
}

// Interactive Quiz Generation
const allCurrentKana = computed(() => {
  return currentScript.value === 'hiragana'
    ? [...HIRAGANA_BASIC, ...HIRAGANA_DAKUON]
    : [...KATAKANA_BASIC, ...KATAKANA_DAKUON]
})

const currentQuizItem = computed(() => {
  const pool = allCurrentKana.value
  const target = pool[quizIndex.value % pool.length]
  const distractors = pool
    .filter((item) => item.id !== target.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
  const options = [target, ...distractors].sort(() => 0.5 - Math.random())
  return {
    target,
    options,
  }
})

function answerQuiz(selectedId: string) {
  quizAnswer.value = selectedId
  if (selectedId === currentQuizItem.value.target.id) {
    quizScore.value++
    emit('gain-xp', 10)
    emit('play-audio', currentQuizItem.value.target.kana)
  }
}

function nextQuiz() {
  quizAnswer.value = null
  quizIndex.value++
}
</script>

<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <!-- Header Banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <LanguageIcon class="w-4 h-4 text-neutral-900" />
          <span>Fondasi Aksara Jepang (かな • Kana)</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Kuasai Huruf Hiragana & Katakana
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
          Pondasi terpenting sebelum mempelajari tata bahasa. Ketuk karakter apa saja untuk mendengarkan pelafalan audio native dan melihat contoh kosakata.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs border"
          :class="
            !isQuizMode
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'
          "
          @click="isQuizMode = false"
        >
          <AcademicCapIcon class="w-4 h-4" />
          <span>Tabel Aksara</span>
        </button>

        <button
          type="button"
          class="px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-2xs border"
          :class="
            isQuizMode
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'
          "
          @click="isQuizMode = true; quizAnswer = null"
        >
          <SparklesIcon class="w-4 h-4 text-amber-500" />
          <span>Latihan Hafalan</span>
        </button>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- MODE 1: INTERACTIVE KANA CHART & EXPLORER -->
    <!-- ============================================================ -->
    <div v-if="!isQuizMode" class="space-y-6">
      <!-- Script Switcher (Hiragana vs Katakana) & Categories -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-neutral-200 rounded-2xl p-4 shadow-2xs">
        <!-- Hiragana / Katakana Segmented Control -->
        <div class="inline-flex p-1 bg-neutral-100 rounded-xl">
          <button
            type="button"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            :class="
              currentScript === 'hiragana'
                ? 'bg-white text-neutral-950 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-950'
            "
            @click="currentScript = 'hiragana'; selectedChar = null"
          >
            <span>Hiragana (ひらがな)</span>
            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">46+</span>
          </button>

          <button
            type="button"
            class="px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            :class="
              currentScript === 'katakana'
                ? 'bg-white text-neutral-950 shadow-xs'
                : 'text-neutral-500 hover:text-neutral-950'
            "
            @click="currentScript = 'katakana'; selectedChar = null"
          >
            <span>Katakana (カタカナ)</span>
            <span class="text-[10px] font-mono px-1.5 py-0.2 rounded bg-neutral-100 text-neutral-600">Kata Asing</span>
          </button>
        </div>

        <!-- Sub-Category Tabs -->
        <div class="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border"
            :class="
              currentCategory === 'basic'
                ? 'bg-neutral-950 text-white border-neutral-950'
                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
            "
            @click="currentCategory = 'basic'; selectedChar = null"
          >
            Gojuuon (Dasar 46)
          </button>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border"
            :class="
              currentCategory === 'dakuon'
                ? 'bg-neutral-950 text-white border-neutral-950'
                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
            "
            @click="currentCategory = 'dakuon'; selectedChar = null"
          >
            Dakuon & Handakuon (Tenten / Maru)
          </button>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border"
            :class="
              currentCategory === 'youon'
                ? 'bg-neutral-950 text-white border-neutral-950'
                : 'bg-neutral-50 text-neutral-600 border-neutral-200 hover:border-neutral-400'
            "
            @click="currentCategory = 'youon'; selectedChar = null"
          >
            Youon (Kombinasi Bunyi)
          </button>
        </div>
      </div>

      <!-- Explanation Tip Box -->
      <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-neutral-600">
        <LightBulbIcon class="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div class="space-y-1">
          <strong class="text-neutral-950">
            {{ currentScript === 'hiragana' ? 'Karakter Hiragana:' : 'Karakter Katakana:' }}
          </strong>
          <span v-if="currentScript === 'hiragana'">
            Digunakan untuk menulis kata-kata asli Jepang, partikel tata bahasa (seperti は, の, を), dan akhiran konjugasi kata kerja/sifat (Okurigana).
          </span>
          <span v-else>
            Digunakan khusus untuk menulis kata serapan asing (*gairaigo* seperti カメラ, コーヒー, トイレ), nama orang non-Jepang, dan penekanan bunyi.
          </span>
        </div>
      </div>

      <!-- Interactive Stroke Order Animator Studio -->
      <div v-if="selectedChar" class="animate-fadeIn">
        <KanaStrokeAnimator
          :kana-item="selectedChar"
          @play-audio="(text) => emit('play-audio', text)"
        />
      </div>

      <!-- Kana Grid Chart -->
      <div class="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 sm:gap-3">
        <button
          v-for="item in activeKanaList"
          :key="item.id"
          type="button"
          class="group bg-white border rounded-2xl p-3 sm:p-4 flex flex-col items-center justify-between gap-1 transition-all duration-150 shadow-2xs hover:shadow hover:-translate-y-0.5 cursor-pointer select-none text-center"
          :class="
            selectedChar?.id === item.id
              ? 'border-neutral-950 ring-2 ring-neutral-950/20 bg-neutral-50'
              : 'border-neutral-200 hover:border-neutral-950'
          "
          @click="handleCharClick(item)"
        >
          <span class="font-display font-bold text-2xl sm:text-3xl text-neutral-950 font-sans tracking-wide leading-none group-hover:scale-105 transition-transform">
            {{ item.kana }}
          </span>

          <span class="text-xs font-mono text-neutral-400 font-medium">
            {{ item.romaji }}
          </span>

          <span v-if="item.exampleWord" class="text-[9px] text-neutral-400 truncate max-w-full hidden sm:block opacity-70">
            {{ item.exampleWord.japanese }}
          </span>
        </button>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- MODE 2: ACTIVE RECALL KANA QUIZ -->
    <!-- ============================================================ -->
    <div v-else class="max-w-xl mx-auto space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <!-- Quiz Header -->
        <div class="flex items-center justify-between border-b border-neutral-100 pb-3 text-xs font-mono text-neutral-500">
          <span>Uji Hafalan {{ currentScript === 'hiragana' ? 'Hiragana' : 'Katakana' }}</span>
          <span class="font-bold text-neutral-950">Skor: {{ quizScore }}</span>
        </div>

        <!-- Question Target -->
        <div class="text-center space-y-3 py-4">
          <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
            {{ quizType === 'kana-to-romaji' ? 'Pilih bacaan alfabet (Romaji) yang tepat:' : 'Pilih huruf Kana yang tepat:' }}
          </div>

          <div class="font-display font-black text-6xl text-neutral-950 font-sans tracking-widest">
            {{ quizType === 'kana-to-romaji' ? currentQuizItem.target.kana : currentQuizItem.target.romaji }}
          </div>

          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-mono cursor-pointer"
            @click="emit('play-audio', currentQuizItem.target.kana)"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Dengarkan Suara</span>
          </button>
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="opt in currentQuizItem.options"
            :key="opt.id"
            type="button"
            class="p-4 rounded-xl border text-center transition-all cursor-pointer font-bold"
            :class="
              quizAnswer === opt.id
                ? opt.id === currentQuizItem.target.id
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-xs'
                  : 'bg-rose-50 border-rose-500 text-rose-900 shadow-xs'
                : 'bg-white border-neutral-200 hover:border-neutral-950 text-neutral-900'
            "
            @click="answerQuiz(opt.id)"
          >
            <span class="text-xl sm:text-2xl font-sans">
              {{ quizType === 'kana-to-romaji' ? opt.romaji : opt.kana }}
            </span>
            <div v-if="quizAnswer === opt.id" class="text-[10px] mt-1 font-mono">
              {{ opt.id === currentQuizItem.target.id ? 'Tepat!' : `Salah (${opt.kana} = ${opt.romaji})` }}
            </div>
          </button>
        </div>

        <!-- Next Question Button -->
        <div v-if="quizAnswer" class="pt-4 border-t border-neutral-100 flex items-center justify-between">
          <div class="text-xs text-neutral-600">
            Contoh: <strong class="text-neutral-950 font-sans">{{ currentQuizItem.target.exampleWord?.japanese }}</strong>
            <span class="font-mono text-neutral-400"> ({{ currentQuizItem.target.exampleWord?.romaji }})</span> =
            {{ currentQuizItem.target.exampleWord?.meaning }}
          </div>

          <button
            type="button"
            class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            @click="nextQuiz"
          >
            <span>Soal Selanjutnya</span>
            <ArrowPathIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Next Step Bridge to Kanji -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
      <div class="flex items-start gap-3.5">
        <div class="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shrink-0">
          <BookOpenIcon class="w-5 h-5 text-white" />
        </div>
        <div class="space-y-1">
          <h4 class="font-display font-extrabold text-base text-neutral-950">
            Langkah Selanjutnya: Memahami Huruf Kanji (漢字)
          </h4>
          <p class="text-xs text-neutral-600 max-w-xl leading-relaxed">
            Setelah menguasai Hiragana dan Katakana, aksara berikutnya adalah <strong>Kanji</strong>. Pelajari mengapa satu huruf Kanji memiliki dua jenis cara baca: <strong>On'yomi (bunyi Cina)</strong> dan <strong>Kun'yomi (makna Jepang)</strong>.
          </p>
        </div>
      </div>

      <button
        type="button"
        class="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer shrink-0 self-start md:self-auto"
        @click="emit('go-to-kanji')"
      >
        <BookOpenIcon class="w-4 h-4" />
        <span>Buka Panduan Kanji (Layar Penuh)</span>
        <ArrowRightIcon class="w-3.5 h-3.5" />
      </button>
    </div>
  </div>
</template>
