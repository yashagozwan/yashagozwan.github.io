<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  BASIC_NUMBERS_0_TO_10,
  LARGE_NUMBERS,
  N5_COUNTERS,
} from '@/data/nihongoNumbers'
import {
  SpeakerWaveIcon,
  SparklesIcon,
  CalculatorIcon,
  TableCellsIcon,
  CheckIcon,
  XMarkIcon,
  ArrowPathIcon,
} from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'gain-xp', amount: number): void
}>()

// Active tab: 'basic-numbers', 'counters', 'generator', 'quiz'
type NumberTab = 'basic-numbers' | 'counters' | 'generator' | 'quiz'
const activeTab = ref<NumberTab>('basic-numbers')

// Selected counter category
const selectedCounterCat = ref<string>(N5_COUNTERS[0].id)

const currentCounter = computed(() => {
  return N5_COUNTERS.find((c) => c.id === selectedCounterCat.value) || N5_COUNTERS[0]
})

// ==========================================
// INTERACTIVE NUMBER GENERATOR
// ==========================================
const inputNumber = ref<number>(3500)

const generatedJapanese = computed(() => {
  const num = inputNumber.value
  if (isNaN(num) || num < 0) return { kanji: '-', hiragana: '-', romaji: '-', meaning: 'Angka tidak valid' }
  if (num === 0) return { kanji: '〇 / 零', hiragana: 'ぜろ', romaji: 'zero', meaning: 'Nol (0)' }

  // Simple number builder for numbers up to 999,999
  const ones = ['', 'いち', 'に', 'さん', 'よん', 'ご', 'ろく', 'なな', 'はち', 'きゅう']
  const onesRomaji = ['', 'ichi', 'ni', 'san', 'yon', 'go', 'roku', 'nana', 'hachi', 'kyuu']

  // Tens
  const hundredsTable: Record<number, { hira: string; roma: string }> = {
    1: { hira: 'ひゃく', roma: 'hyaku' },
    2: { hira: 'にひゃく', roma: 'ni-hyaku' },
    3: { hira: 'さんびゃく', roma: 'sanbyaku' },
    4: { hira: 'よんひゃく', roma: 'yon-hyaku' },
    5: { hira: 'ごひゃく', roma: 'go-hyaku' },
    6: { hira: 'ろっぴゃく', roma: 'roppyaku' },
    7: { hira: 'ななひゃく', roma: 'nana-hyaku' },
    8: { hira: 'はっぴゃく', roma: 'happyaku' },
    9: { hira: 'きゅうひゃく', roma: 'kyuu-hyaku' },
  }

  const thousandsTable: Record<number, { hira: string; roma: string }> = {
    1: { hira: 'せん', roma: 'sen' },
    2: { hira: 'にせん', roma: 'ni-sen' },
    3: { hira: 'さんぜん', roma: 'sanzen' },
    4: { hira: 'よんせん', roma: 'yon-sen' },
    5: { hira: 'ごせん', roma: 'go-sen' },
    6: { hira: 'ろくせん', roma: 'roku-sen' },
    7: { hira: 'ななせん', roma: 'nana-sen' },
    8: { hira: 'はっせん', roma: 'hassen' },
    9: { hira: 'きゅうせん', roma: 'kyuu-sen' },
  }

  // Parse up to 999,999
  const man = Math.floor(num / 10000)
  const remainderAfterMan = num % 10000
  const th = Math.floor(remainderAfterMan / 1000)
  const remainderAfterTh = remainderAfterMan % 1000
  const hd = Math.floor(remainderAfterTh / 100)
  const remainderAfterHd = remainderAfterTh % 100
  const tn = Math.floor(remainderAfterHd / 10)
  const un = remainderAfterHd % 10

  let hira = ''
  let roma = ''

  if (man > 0) {
    if (man === 1) {
      hira += 'いちまん '
      roma += 'ichiman '
    } else {
      hira += `${ones[man]}まん `
      roma += `${onesRomaji[man]}man `
    }
  }

  if (th > 0) {
    hira += thousandsTable[th].hira + ' '
    roma += thousandsTable[th].roma + ' '
  }

  if (hd > 0) {
    hira += hundredsTable[hd].hira + ' '
    roma += hundredsTable[hd].roma + ' '
  }

  if (tn > 0) {
    if (tn === 1) {
      hira += 'じゅう'
      roma += 'juu'
    } else {
      hira += `${ones[tn]}じゅう`
      roma += `${onesRomaji[tn]}-juu`
    }
  }

  if (un > 0) {
    hira += (tn > 0 ? '' : ' ') + ones[un]
    roma += (tn > 0 ? '-' : ' ') + onesRomaji[un]
  }

  return {
    kanji: `${num.toLocaleString('id-ID')}`,
    hiragana: hira.trim(),
    romaji: roma.trim(),
    meaning: `${num.toLocaleString('id-ID')}`,
  }
})

// ==========================================
// QUIZ SYSTEM
// ==========================================
interface NumberQuiz {
  question: string
  audioText: string
  options: string[]
  answer: string
  explanation: string
}

const NUMBER_QUIZZES: NumberQuiz[] = [
  {
    question: 'Bagaimana cara menyebutkan angka 300 dalam bahasa Jepang?',
    audioText: 'さんびゃく',
    options: ['さんひゃく', 'さんびゃく', 'さんぜん'],
    answer: 'さんびゃく',
    explanation: '300 mengalami perubahan bunyi khusus dari hyaku menjadi byaku (さんびゃく • sanbyaku).',
  },
  {
    question: 'Berapakah nilai dari ungkapan "ろっぴゃく" (roppyaku)?',
    audioText: 'ろっぴゃく',
    options: ['60', '600', '6.000'],
    answer: '600',
    explanation: '600 dilafalkan dengan konsonan ganda ろっぴゃく (roppyaku).',
  },
  {
    question: 'Bagaimana cara menyebutkan "4 orang" secara tepat?',
    audioText: 'よにん',
    options: ['しにん', 'よんにん', 'よにん'],
    answer: 'よにん',
    explanation: 'Untuk 4 orang, wajib dilafalkan よにん (yonin). Bentuk shinin dihindari karena berasosiasi dengan kematian.',
  },
  {
    question: 'Bagaimana menyebutkan tanggal 1 dalam bahasa Jepang?',
    audioText: 'ついたち',
    options: ['いちにち', 'ついたち', 'ふつか'],
    answer: 'ついたち',
    explanation: 'Tanggal 1 memiliki pelafalan khusus ついたち (tsuitachi).',
  },
  {
    question: 'Angka 8.000 Yen dilafalkan sebagai...',
    audioText: 'はっせんえん',
    options: ['はちせんえん', 'はっせんえん', 'はちまんえん'],
    answer: 'はっせんえん',
    explanation: '8.000 mengalami asimilasi bunyi konsonan ganda s menjadi はっせん (hassen).',
  },
]

const currentQuizIndex = ref(0)
const quizSelectedAnswer = ref<string | null>(null)
const quizScore = ref(0)

function answerQuiz(opt: string) {
  quizSelectedAnswer.value = opt
  const q = NUMBER_QUIZZES[currentQuizIndex.value]
  if (opt === q.answer) {
    quizScore.value++
    emit('gain-xp', 15)
    emit('play-audio', q.audioText)
  }
}

function nextQuiz() {
  quizSelectedAnswer.value = null
  currentQuizIndex.value = (currentQuizIndex.value + 1) % NUMBER_QUIZZES.length
}
</script>

<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <!-- Header Banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <CalculatorIcon class="w-4 h-4 text-neutral-900" />
          <span>Sistem Bilangan & Hitungan (数字と助数詞)</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Angka Jepang & Satuan Hitung N5
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
          Kuasai sistem bilangan 0 hingga puluhan juta (Man), aturan perubahan pelafalan khusus (300, 600, 800, 3000, 8000), serta satuan hitung benda, orang, waktu, dan lantai.
        </p>
      </div>

      <!-- Mode Tabs Selector -->
      <div class="flex flex-wrap items-center p-1 bg-white border border-neutral-200 rounded-2xl shadow-xs self-start md:self-center gap-1 shrink-0">
        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'basic-numbers' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'basic-numbers'"
        >
          <TableCellsIcon class="w-3.5 h-3.5" />
          <span>Angka Pokok</span>
        </button>

        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'counters' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'counters'"
        >
          <span>Satuan Hitung (Counters)</span>
        </button>

        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'generator' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'generator'"
        >
          <CalculatorIcon class="w-3.5 h-3.5" />
          <span>Generator Angka</span>
        </button>

        <button
          type="button"
          class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
          :class="activeTab === 'quiz' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'quiz'; quizSelectedAnswer = null"
        >
          <SparklesIcon class="w-3.5 h-3.5 text-amber-500" />
          <span>Uji Hafalan</span>
        </button>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- TAB 1: ANGKA POKOK (0 - 100 JUTA) -->
    <!-- ============================================================ -->
    <div v-if="activeTab === 'basic-numbers'" class="space-y-6">
      <!-- Angka Dasar 0 - 10 -->
      <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 class="font-display font-bold text-lg text-neutral-950">
            1. Angka Dasar 0 Sampai 10
          </h3>
          <span class="text-xs font-mono text-neutral-400">Klik kartu untuk audio</span>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          <div
            v-for="item in BASIC_NUMBERS_0_TO_10"
            :key="item.number"
            class="bg-neutral-50/70 border border-neutral-200 hover:border-neutral-950 rounded-2xl p-4 flex flex-col justify-between gap-2 transition-all shadow-2xs hover:shadow-xs cursor-pointer group"
            @click="emit('play-audio', item.hiragana)"
          >
            <div class="flex items-start justify-between">
              <span class="font-mono text-2xl font-black text-neutral-950 group-hover:scale-105 transition-transform">
                {{ item.number }}
              </span>
              <span class="font-display font-bold text-lg text-neutral-400 font-sans">
                {{ item.kanji }}
              </span>
            </div>

            <div class="space-y-0.5">
              <div class="font-display font-bold text-base text-neutral-950 font-sans">
                {{ item.hiragana }}
              </div>
              <div class="text-xs font-mono text-neutral-400">
                {{ item.romaji }}
              </div>
            </div>

            <div class="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-[11px] text-neutral-600">
              <span>{{ item.meaning }}</span>
              <SpeakerWaveIcon class="w-3.5 h-3.5 text-neutral-400 group-hover:text-neutral-950" />
            </div>

            <p v-if="item.notes" class="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200 leading-tight">
              {{ item.notes }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bilangan Besar & Pelafalan Khusus (Ratusan, Ribuan, Man) -->
      <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xs">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
          <div class="space-y-0.5">
            <h3 class="font-display font-bold text-lg text-neutral-950">
              2. Ratusan (百), Ribuan (千), & Puluhan Ribu (万)
            </h3>
            <p class="text-xs text-neutral-500">
              Perhatikan pelafalan khusus bertanda kuning (300, 600, 800, 3000, 8000, 10000).
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <div
            v-for="item in LARGE_NUMBERS"
            :key="item.number"
            class="border rounded-2xl p-4 flex items-center justify-between gap-3 transition-all cursor-pointer shadow-2xs hover:shadow"
            :class="
              item.isSpecial
                ? 'bg-amber-50/40 border-amber-300 hover:border-amber-500'
                : 'bg-white border-neutral-200 hover:border-neutral-950'
            "
            @click="emit('play-audio', item.hiragana)"
          >
            <div class="space-y-1">
              <div class="flex items-center gap-2">
                <span class="font-mono font-bold text-base text-neutral-950">
                  {{ typeof item.number === 'number' ? item.number.toLocaleString('id-ID') : item.number }}
                </span>
                <span class="text-xs font-mono font-normal text-neutral-400">
                  ({{ item.kanji }})
                </span>
                <span v-if="item.isSpecial" class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold uppercase">
                  Khusus
                </span>
              </div>
              <div class="font-display font-bold text-base text-neutral-950 font-sans">
                {{ item.hiragana }}
              </div>
              <div class="text-xs font-mono text-neutral-500">
                {{ item.romaji }} &bull; {{ item.meaning }}
              </div>
              <p v-if="item.notes" class="text-[10px] text-neutral-500 italic pt-0.5">
                &bull; {{ item.notes }}
              </p>
            </div>

            <button
              type="button"
              class="p-2 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white transition-colors text-neutral-600 shrink-0 cursor-pointer"
              title="Dengarkan audio"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- TAB 2: SATUAN HITUNG N5 (COUNTERS) -->
    <!-- ============================================================ -->
    <div v-else-if="activeTab === 'counters'" class="space-y-6">
      <!-- Category Selector Pills -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cat in N5_COUNTERS"
          :key="cat.id"
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-2"
          :class="
            selectedCounterCat === cat.id
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
          "
          @click="selectedCounterCat = cat.id"
        >
          <span>{{ cat.name }}</span>
          <span class="text-[10px] font-mono opacity-70">({{ cat.suffix }})</span>
        </button>
      </div>

      <!-- Detail of Active Counter -->
      <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xs">
        <div class="space-y-1 border-b border-neutral-100 pb-4">
          <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
            <span>Satuan Hitung: {{ currentCounter.suffix }}</span>
          </div>
          <h3 class="font-display font-bold text-xl text-neutral-950">
            {{ currentCounter.name }} — {{ currentCounter.japanese }}
          </h3>
          <p class="text-xs text-neutral-600">
            {{ currentCounter.description }}
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <div
            v-for="(it, idx) in currentCounter.items"
            :key="idx"
            class="border rounded-2xl p-4 flex flex-col justify-between gap-2 transition-all cursor-pointer shadow-2xs hover:shadow"
            :class="
              it.isSpecial
                ? 'bg-amber-50/30 border-amber-300 hover:border-amber-500'
                : 'bg-neutral-50/50 border-neutral-200 hover:border-neutral-950'
            "
            @click="emit('play-audio', it.japanese)"
          >
            <div class="flex items-start justify-between">
              <span class="text-xs font-mono font-bold text-neutral-500">
                {{ it.count }}
              </span>
              <span v-if="it.isSpecial" class="text-[9px] font-mono px-1.5 py-0.2 rounded bg-amber-200 text-amber-900 font-bold uppercase">
                Penting
              </span>
            </div>

            <div class="space-y-0.5">
              <div class="font-display font-bold text-xl text-neutral-950 font-sans">
                {{ it.japanese }}
              </div>
              <div class="text-xs font-mono text-neutral-400">
                {{ it.romaji }}
              </div>
            </div>

            <div class="pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs text-neutral-800 font-medium">
              <span>{{ it.meaning }}</span>
              <SpeakerWaveIcon class="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-950" />
            </div>

            <p v-if="it.notes" class="text-[10px] text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200 leading-tight">
              {{ it.notes }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- TAB 3: INTERACTIVE NUMBER TRANSLATOR / GENERATOR -->
    <!-- ============================================================ -->
    <div v-else-if="activeTab === 'generator'" class="max-w-2xl mx-auto space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div class="space-y-1 border-b border-neutral-100 pb-4">
          <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
            <CalculatorIcon class="w-4 h-4 text-neutral-950" />
            <span>Kalkulator & Generator Bahasa Jepang</span>
          </div>
          <h3 class="font-display font-bold text-xl text-neutral-950">
            Ubah Angka Berapa Saja ke Pelafalan Jepang
          </h3>
          <p class="text-xs text-neutral-500">
            Ketik nominal angka atau pilih preset di bawah untuk melihat cara baca Kanji, Hiragana, dan Romaji secara otomatis.
          </p>
        </div>

        <!-- Input Box -->
        <div class="space-y-2">
          <label class="block text-xs font-mono uppercase text-neutral-400 font-bold">
            Ketik Nominal Angka (0 - 999.999):
          </label>
          <input
            v-model.number="inputNumber"
            type="number"
            min="0"
            max="999999"
            class="w-full text-2xl font-mono font-bold p-4 bg-neutral-50 border border-neutral-300 rounded-2xl focus:outline-none focus:border-neutral-950 focus:bg-white transition-colors"
          />
        </div>

        <!-- Preset Chips -->
        <div class="flex flex-wrap gap-2 items-center">
          <span class="text-xs font-mono text-neutral-400">Contoh Cepat:</span>
          <button
            v-for="p in [300, 600, 800, 3500, 8000, 15000, 38500, 120000]"
            :key="p"
            type="button"
            class="px-2.5 py-1 rounded-lg text-xs font-mono border border-neutral-200 hover:border-neutral-950 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 cursor-pointer"
            @click="inputNumber = p"
          >
            {{ p.toLocaleString('id-ID') }}
          </button>
        </div>

        <!-- Generated Output Result -->
        <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-4">
          <div class="space-y-1">
            <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Pelafalan Hiragana:
            </div>
            <div class="font-display font-extrabold text-3xl sm:text-4xl text-neutral-950 font-sans tracking-wide">
              {{ generatedJapanese.hiragana }}
            </div>
          </div>

          <div class="space-y-1">
            <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
              Romaji (Cara Baca Latin):
            </div>
            <div class="text-base font-mono font-bold text-neutral-700">
              {{ generatedJapanese.romaji }}
            </div>
          </div>

          <div class="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <span class="text-xs font-mono text-neutral-500">
              Nominal: {{ generatedJapanese.meaning }}
            </span>

            <button
              type="button"
              class="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
              @click="emit('play-audio', generatedJapanese.hiragana)"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
              <span>Dengarkan Pengucapan</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================ -->
    <!-- TAB 4: KUIS ANGKA & HITUNGAN -->
    <!-- ============================================================ -->
    <div v-else class="max-w-xl mx-auto space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-3 text-xs font-mono text-neutral-500">
          <span>Kuis Angka & Satuan Hitung</span>
          <span class="font-bold text-neutral-950">Skor: {{ quizScore }}</span>
        </div>

        <div class="space-y-4 py-3">
          <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Pertanyaan {{ currentQuizIndex + 1 }} dari {{ NUMBER_QUIZZES.length }}:
          </div>
          <h4 class="font-display font-bold text-xl text-neutral-950 leading-snug">
            {{ NUMBER_QUIZZES[currentQuizIndex].question }}
          </h4>
        </div>

        <div class="space-y-2.5">
          <button
            v-for="opt in NUMBER_QUIZZES[currentQuizIndex].options"
            :key="opt"
            type="button"
            class="w-full p-4 rounded-xl text-left text-sm font-semibold border transition-all flex items-center justify-between gap-3 cursor-pointer"
            :class="
              quizSelectedAnswer === opt
                ? opt === NUMBER_QUIZZES[currentQuizIndex].answer
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                  : 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                : 'bg-white border-neutral-200 hover:border-neutral-950 text-neutral-800'
            "
            @click="answerQuiz(opt)"
          >
            <span class="font-sans text-base">{{ opt }}</span>
            <span v-if="quizSelectedAnswer === opt" class="text-xs font-mono flex items-center gap-1">
              <template v-if="opt === NUMBER_QUIZZES[currentQuizIndex].answer">
                <CheckIcon class="w-4 h-4 text-emerald-600" />
                <span>Benar!</span>
              </template>
              <template v-else>
                <XMarkIcon class="w-4 h-4 text-rose-600" />
                <span>Kurang tepat</span>
              </template>
            </span>
          </button>
        </div>

        <div v-if="quizSelectedAnswer" class="pt-4 border-t border-neutral-100 space-y-3">
          <div class="text-xs text-neutral-600 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
            <strong class="text-neutral-950">Penjelasan:</strong> {{ NUMBER_QUIZZES[currentQuizIndex].explanation }}
          </div>

          <div class="flex items-center justify-end">
            <button
              type="button"
              class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
              @click="nextQuiz"
            >
              <span>Soal Berikutnya</span>
              <ArrowPathIcon class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
