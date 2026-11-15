<script setup lang="ts">
import { ref } from 'vue'
import {
  HOURS_DATA_L4,
  MINUTES_DATA_L4,
  DAYS_DATA_L4,
  VERB_CONJUGATIONS_L4,
  type HourItem,
  type MinuteItem,
  type DayOfWeekItem,
  type VerbConjugationItem,
} from '@/data/nihongoLesson4'
import {
  SpeakerWaveIcon,
  ClockIcon,
  CalendarDaysIcon,
  SparklesIcon,
  CheckIcon,
  ArrowRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'

defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

// Active Sub-Tab: 'hours' | 'minutes' | 'days' | 'conjugation' | 'quiz'
type SubTab = 'hours' | 'minutes' | 'days' | 'conjugation' | 'quiz'
const activeSubTab = ref<SubTab>('hours')

// Selected items
const selectedHour = ref<HourItem>(HOURS_DATA_L4[3]) // Default 4時 (special)
const selectedMinute = ref<MinuteItem>(MINUTES_DATA_L4[11]) // Default 30分 / 半
const selectedDay = ref<DayOfWeekItem>(DAYS_DATA_L4[0]) // Default Monday
const selectedVerb = ref<VerbConjugationItem>(VERB_CONJUGATIONS_L4[0]) // Default hatarakimasu

function playHourAudio(h: HourItem) {
  emit('play-audio', h.japanese)
}

function playMinuteAudio(m: MinuteItem) {
  emit('play-audio', m.japanese)
}

function playDayAudio(d: DayOfWeekItem) {
  emit('play-audio', d.japanese)
}

// Mini Quiz State
const quizIndex = ref(0)
const quizAnswer = ref<string | null>(null)
const quizScore = ref(0)
const quizSubmitted = ref(false)

const QUIZ_ITEMS = [
  {
    question: 'Bagaimana pelafalan khusus untuk "Pukul 4 (4時)" dalam bahasa Jepang?',
    correctId: 'yoji',
    options: [
      { id: 'yonji', label: 'よんじ (yonji)' },
      { id: 'yoji', label: 'よじ (yoji) — Tepat!' },
      { id: 'shiji', label: 'しじ (shiji)' },
      { id: 'shichiji', label: 'しちじ (shichiji)' },
    ],
    explanation: '4時 selalu dibaca "よじ (yoji)". Bukan "yonji" ataupun "shiji".',
  },
  {
    question: 'Pelafalan khusus untuk "Pukul 9 (9時)" adalah...',
    correctId: 'kuji',
    options: [
      { id: 'kyuuji', label: 'きゅうじ (kyuuji)' },
      { id: 'kuji', label: 'くじ (kuji) — Tepat!' },
      { id: 'kunji', label: 'くんじ (kunji)' },
      { id: 'shichiji', label: 'しちじ (shichiji)' },
    ],
    explanation: '9時 selalu dibaca "くじ (kuji)". Bukan "kyuuji".',
  },
  {
    question: 'Bentuk lampau positif dari kata kerja "はたらきます (bekerja)" adalah...',
    correctId: 'hatarakimashita',
    options: [
      { id: 'hatarakimasen', label: 'はたらきません' },
      { id: 'hatarakimashita', label: 'はたらきました — Tepat!' },
      { id: 'hatarakimasen_deshita', label: 'はたらきませんでした' },
      { id: 'hatarakimashita_desu', label: 'はたらきましたです' },
    ],
    explanation: 'Lampau positif akhiran ～ます berubah menjadi ～ました (はたらきました).',
  },
  {
    question: 'Hari apakah "すいようび (水曜日)" dalam bahasa Indonesia?',
    correctId: 'rabu',
    options: [
      { id: 'senin', label: 'Senin' },
      { id: 'selasa', label: 'Selasa' },
      { id: 'rabu', label: 'Rabu — Tepat!' },
      { id: 'kamis', label: 'Kamis' },
    ],
    explanation: 'すいようび (水曜日) menggunakan kanji Air (水) yang artinya hari Rabu.',
  },
  {
    question: 'Manakah kalimat yang BENAR penggunaan partikel に nya?',
    correctId: 'time_ni',
    options: [
      { id: 'time_ni', label: '６じに おきます。 — Tepat!' },
      { id: 'mainichi_ni', label: 'まいにちに おきます。' },
      { id: 'kyou_ni', label: 'きょうに はたらきます。' },
      { id: 'ashita_ni', label: 'あしたに いきます。' },
    ],
    explanation: 'Partikel に dipakai untuk waktu spesifik berangka (6時に). Keterangan relatif seperti まいにち, きょう, あした TIDAK memakai に.',
  },
]

function handleQuizAnswer(optId: string) {
  if (quizAnswer.value !== null) return
  quizAnswer.value = optId
  if (optId === QUIZ_ITEMS[quizIndex.value].correctId) {
    quizScore.value += 20
    emit('gain-xp', 20)
  }
}

function nextQuestion() {
  if (quizIndex.value < QUIZ_ITEMS.length - 1) {
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
    <!-- Header Banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <ClockIcon class="w-4 h-4 text-neutral-900" />
          <span>Fondasi Jam, Menit & Hari</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Menyebutkan Jam, Menit & 7 Hari
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
          Kuasai cara membaca jam (termasuk perkecualian 4時, 7時, 9時), satuan menit (ふん/ぷん), nama hari dalam seminggu, dan 4 bentuk konjugasi kata kerja dasar (ます・ません・ました・ませんでした).
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-4 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:bg-neutral-800"
          @click="emit('play-audio', 'いま なんじですか。きょうは なんようびですか。')"
        >
          <SpeakerWaveIcon class="w-4 h-4" />
          <span>Dengar Pertanyaan Waktu</span>
        </button>
      </div>
    </div>

    <!-- Navigation Sub-Tabs -->
    <div class="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeSubTab === 'hours' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeSubTab = 'hours'"
      >
        <ClockIcon class="w-3.5 h-3.5" />
        <span>1. Jam (1時 - 12時)</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeSubTab === 'minutes' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeSubTab = 'minutes'"
      >
        <ClockIcon class="w-3.5 h-3.5" />
        <span>2. Menit (分)</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeSubTab === 'days' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeSubTab = 'days'"
      >
        <CalendarDaysIcon class="w-3.5 h-3.5" />
        <span>3. Hari Seminggu (曜日)</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeSubTab === 'conjugation' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeSubTab = 'conjugation'"
      >
        <SparklesIcon class="w-3.5 h-3.5" />
        <span>4. Konjugasi Kata Kerja</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeSubTab === 'quiz' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeSubTab = 'quiz'"
      >
        <CheckIcon class="w-3.5 h-3.5" />
        <span>5. Kuis Cepat</span>
      </button>
    </div>

    <!-- TAB 1: HOURS (JAM) -->
    <div v-if="activeSubTab === 'hours'" class="space-y-6">
      <!-- Special Pronunciation Callout -->
      <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
        <ExclamationTriangleIcon class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div class="space-y-1 text-xs">
          <strong class="font-bold text-amber-950">Catatan Khusus Pelafalan Jam (Wajib Dihafal):</strong>
          <p class="text-amber-800 leading-relaxed">
            Perhatikan 3 jam yang mengalami perubahan pelafalan khusus:
            <strong>4時 = よじ (yoji)</strong> (BUKAN yonji/shiji),
            <strong>7時 = しちじ (shichiji)</strong> (bukan nanaji), dan
            <strong>9時 = くじ (kuji)</strong> (BUKAN kyuuji).
          </p>
        </div>
      </div>

      <!-- Hours Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="h in HOURS_DATA_L4"
          :key="h.hour"
          class="bg-white border rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
          :class="[
            selectedHour.hour === h.hour ? 'border-neutral-950 ring-2 ring-neutral-950/20' : 'border-neutral-200 hover:border-neutral-400',
            h.isSpecial ? 'bg-amber-50/40 border-amber-300' : ''
          ]"
          @click="selectedHour = h; playHourAudio(h)"
        >
          <div class="flex items-start justify-between">
            <span class="text-xs font-mono font-bold" :class="h.isSpecial ? 'text-amber-700' : 'text-neutral-400'">
              {{ h.hour }}:00
            </span>
            <span v-if="h.isSpecial" class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 font-bold">
              Khusus
            </span>
          </div>

          <div class="my-3 text-center">
            <div class="font-sans font-bold text-xl sm:text-2xl text-neutral-950">
              {{ h.japanese }}
            </div>
            <div v-if="showRomaji" class="text-xs font-mono text-neutral-500 mt-0.5">
              {{ h.romaji }}
            </div>
          </div>

          <div class="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>{{ h.meaning }}</span>
            <SpeakerWaveIcon class="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-950" />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 2: MINUTES (MENIT) -->
    <div v-else-if="activeSubTab === 'minutes'" class="space-y-6">
      <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-5 text-xs text-neutral-700 leading-relaxed space-y-2">
        <div class="font-bold text-neutral-950 flex items-center gap-2">
          <ClockIcon class="w-4 h-4 text-neutral-900" />
          <span>Aturan Pelafalan Menit (分): ふん (fun) vs ぷん (pun)</span>
        </div>
        <p>
          Menit dibaca <strong>ぷん (pun)</strong> pada angka berakhiran: <strong>1 (いっぷん), 3 (さんぷん), 4 (よんぷん), 6 (ろっぷん), 8 (はっぷん), 10 (じゅっぷん)</strong>.
          Angka lainnya dibaca <strong>ふん (fun)</strong>: <strong>2 (にふん), 5 (ごふん), 7 (ななふん), 9 (きゅうふん)</strong>.
        </p>
        <p class="font-mono text-neutral-500">
          Untuk "lewat 30 menit / setengah jam", orang Jepang sangat sering menggunakan kata <strong>半（はん / han）</strong>, contoh: <strong>8時半 (hachiji han = jam 8.30)</strong>.
        </p>
      </div>

      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        <div
          v-for="m in MINUTES_DATA_L4"
          :key="m.minute"
          class="bg-white border rounded-2xl p-4 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
          :class="[
            selectedMinute.minute === m.minute ? 'border-neutral-950 ring-2 ring-neutral-950/20' : 'border-neutral-200 hover:border-neutral-400',
            m.isSpecial ? 'bg-neutral-50' : ''
          ]"
          @click="selectedMinute = m; playMinuteAudio(m)"
        >
          <div class="flex items-start justify-between">
            <span class="text-xs font-mono font-bold text-neutral-400">
              :{{ m.minute < 10 ? `0${m.minute}` : m.minute }}
            </span>
            <span v-if="m.isSpecial" class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-800 font-bold">
              {{ m.minute === 30 ? '半 (han)' : 'ぷん' }}
            </span>
          </div>

          <div class="my-3 text-center">
            <div class="font-sans font-bold text-lg sm:text-xl text-neutral-950">
              {{ m.japanese }}
            </div>
            <div v-if="showRomaji" class="text-xs font-mono text-neutral-500 mt-0.5">
              {{ m.romaji }}
            </div>
          </div>

          <div class="pt-2 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <span>{{ m.meaning }}</span>
            <SpeakerWaveIcon class="w-3.5 h-3.5 text-neutral-400 hover:text-neutral-950" />
          </div>
        </div>
      </div>
    </div>

    <!-- TAB 3: DAYS OF THE WEEK (7 HARI SEMINGGU) -->
    <div v-else-if="activeSubTab === 'days'" class="space-y-6">
      <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-5 text-xs text-neutral-700 leading-relaxed">
        <div class="font-bold text-neutral-950 mb-1">
          Asal Usul Kanji Hari dalam Bahasa Jepang:
        </div>
        Nama hari dalam bahasa Jepang diambil dari 7 unsur alam / tata surya kuno: Bulan (月), Api (火), Air (水), Kayu (木), Logam/Emas (金), Tanah (土), dan Matahari (日).
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div
          v-for="d in DAYS_DATA_L4"
          :key="d.id"
          class="bg-white border rounded-2xl p-5 transition-all duration-200 shadow-2xs hover:shadow-md cursor-pointer flex flex-col justify-between"
          :class="selectedDay.id === d.id ? 'border-neutral-950 ring-2 ring-neutral-950/20' : 'border-neutral-200 hover:border-neutral-400'"
          @click="selectedDay = d; playDayAudio(d)"
        >
          <div class="flex items-center justify-between">
            <span class="w-9 h-9 rounded-xl bg-neutral-950 text-white font-sans font-bold flex items-center justify-center text-lg">
              {{ d.kanji }}
            </span>
            <span class="text-[10px] font-mono uppercase text-neutral-400 font-bold">
              {{ d.elementMeaning }}
            </span>
          </div>

          <div class="my-3">
            <div class="font-sans font-bold text-xl text-neutral-950">
              {{ d.japanese }}
            </div>
            <div v-if="showRomaji" class="text-xs font-mono text-neutral-500">
              {{ d.romaji }}
            </div>
            <div class="text-sm font-bold text-neutral-800 mt-1">
              Hari {{ d.indonesian }}
            </div>
          </div>

          <div class="pt-2 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400">
            <span>{{ d.id === 'sat' || d.id === 'sun' ? 'Akhir Pekan' : 'Hari Kerja' }}</span>
            <SpeakerWaveIcon class="w-4 h-4 text-neutral-400 hover:text-neutral-950" />
          </div>
        </div>
      </div>

      <!-- Sample sentence card -->
      <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
            Contoh Percakapan Hari:
          </span>
          <div class="font-sans font-bold text-base text-neutral-950 mt-1">
            きょうは なんようびですか。— きんようびです。
          </div>
          <p class="text-xs text-neutral-500">
            Hari ini hari apa? — Hari ini hari Jumat.
          </p>
        </div>
        <button
          type="button"
          class="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer self-start sm:self-auto"
          @click="emit('play-audio', 'きょうは なんようびですか。きんようびです。')"
        >
          <SpeakerWaveIcon class="w-3.5 h-3.5" />
          <span>Dengarkan</span>
        </button>
      </div>
    </div>

    <!-- TAB 4: VERB CONJUGATION (4 BENTUK KATA KERJA) -->
    <div v-else-if="activeSubTab === 'conjugation'" class="space-y-6">
      <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-4 sm:p-5 text-xs text-neutral-700 leading-relaxed">
        <div class="font-bold text-neutral-950 mb-1">
          4 Bentuk Dasar Kata Kerja Sopan (Bentuk ます):
        </div>
        <p>
          Bahasa Jepang tidak membedakan orang pertama/kedua/ketiga pada kata kerja. Perubahan murni didasarkan pada <strong>Waktu (Kini/Masa Depan vs Lampau)</strong> dan <strong>Kualitas (Positif vs Negatif)</strong>.
        </p>
      </div>

      <!-- Verb Picker Pills -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          v-for="v in VERB_CONJUGATIONS_L4"
          :key="v.verb"
          type="button"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer"
          :class="selectedVerb.verb === v.verb ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'"
          @click="selectedVerb = v"
        >
          <span>{{ v.meaning }} ({{ v.romaji }})</span>
        </button>
      </div>

      <!-- 4-Box Conjugation Matrix -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <!-- 1. Positif Non-Lampau -->
        <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between text-xs font-mono font-bold text-neutral-400">
            <span>POSITIF NON-LAMPAU (～ます)</span>
            <span class="text-emerald-600 font-bold">Kebiasaan / Rencana</span>
          </div>
          <div class="font-sans font-bold text-2xl text-neutral-950">
            {{ selectedVerb.presentPositive.japanese }}
          </div>
          <div v-if="showRomaji" class="text-xs font-mono text-neutral-500">
            {{ selectedVerb.presentPositive.romaji }}
          </div>
          <p class="text-xs text-neutral-600 pt-1 border-t border-neutral-100">
            Artinya: "{{ selectedVerb.meaning }}" (rutin dilakukan atau akan dilakukan nanti).
          </p>
          <button
            type="button"
            class="text-xs font-bold text-neutral-800 flex items-center gap-1 hover:text-neutral-950 cursor-pointer pt-1"
            @click="emit('play-audio', selectedVerb.presentPositive.japanese)"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>

        <!-- 2. Negatif Non-Lampau -->
        <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between text-xs font-mono font-bold text-neutral-400">
            <span>NEGATIF NON-LAMPAU (～ません)</span>
            <span class="text-rose-600 font-bold">Tidak Melakukan</span>
          </div>
          <div class="font-sans font-bold text-2xl text-neutral-950">
            {{ selectedVerb.presentNegative.japanese }}
          </div>
          <div v-if="showRomaji" class="text-xs font-mono text-neutral-500">
            {{ selectedVerb.presentNegative.romaji }}
          </div>
          <p class="text-xs text-neutral-600 pt-1 border-t border-neutral-100">
            Artinya: "Tidak {{ selectedVerb.meaning.toLowerCase() }}" (tidak rutin atau tidak akan dilakukan).
          </p>
          <button
            type="button"
            class="text-xs font-bold text-neutral-800 flex items-center gap-1 hover:text-neutral-950 cursor-pointer pt-1"
            @click="emit('play-audio', selectedVerb.presentNegative.japanese)"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>

        <!-- 3. Positif Lampau -->
        <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between text-xs font-mono font-bold text-neutral-400">
            <span>POSITIF LAMPAU (～ました)</span>
            <span class="text-blue-600 font-bold">Sudah Terjadi</span>
          </div>
          <div class="font-sans font-bold text-2xl text-neutral-950">
            {{ selectedVerb.pastPositive.japanese }}
          </div>
          <div v-if="showRomaji" class="text-xs font-mono text-neutral-500">
            {{ selectedVerb.pastPositive.romaji }}
          </div>
          <p class="text-xs text-neutral-600 pt-1 border-t border-neutral-100">
            Artinya: "Kemarin/tadi sudah {{ selectedVerb.meaning.toLowerCase() }}".
          </p>
          <button
            type="button"
            class="text-xs font-bold text-neutral-800 flex items-center gap-1 hover:text-neutral-950 cursor-pointer pt-1"
            @click="emit('play-audio', selectedVerb.pastPositive.japanese)"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>

        <!-- 4. Negatif Lampau -->
        <div class="bg-white border border-neutral-200 rounded-2xl p-5 shadow-2xs space-y-2">
          <div class="flex items-center justify-between text-xs font-mono font-bold text-neutral-400">
            <span>NEGATIF LAMPAU (～ませんでした)</span>
            <span class="text-amber-600 font-bold">Tidak Terjadi Lampau</span>
          </div>
          <div class="font-sans font-bold text-xl sm:text-2xl text-neutral-950 truncate">
            {{ selectedVerb.pastNegative.japanese }}
          </div>
          <div v-if="showRomaji" class="text-xs font-mono text-neutral-500">
            {{ selectedVerb.pastNegative.romaji }}
          </div>
          <p class="text-xs text-neutral-600 pt-1 border-t border-neutral-100">
            Artinya: "Kemarin/tadi tidak {{ selectedVerb.meaning.toLowerCase() }}".
          </p>
          <button
            type="button"
            class="text-xs font-bold text-neutral-800 flex items-center gap-1 hover:text-neutral-950 cursor-pointer pt-1"
            @click="emit('play-audio', selectedVerb.pastNegative.japanese)"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Dengarkan</span>
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 5: QUICK RECALL QUIZ -->
    <div v-else-if="activeSubTab === 'quiz'" class="space-y-6">
      <div v-if="!quizSubmitted" class="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
        <!-- Question Progress -->
        <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Pertanyaan {{ quizIndex + 1 }} dari {{ QUIZ_ITEMS.length }}</span>
          <span>Skor: {{ quizScore }} XP</span>
        </div>

        <!-- Question Prompt -->
        <div class="space-y-2">
          <h3 class="font-display font-bold text-lg sm:text-xl text-neutral-950">
            {{ QUIZ_ITEMS[quizIndex].question }}
          </h3>
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            v-for="opt in QUIZ_ITEMS[quizIndex].options"
            :key="opt.id"
            type="button"
            class="p-4 rounded-xl border text-left transition-all cursor-pointer font-semibold text-xs sm:text-sm"
            :class="[
              quizAnswer === null
                ? 'bg-white border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50 text-neutral-800'
                : opt.id === QUIZ_ITEMS[quizIndex].correctId
                ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-2xs'
                : opt.id === quizAnswer
                ? 'bg-rose-50 border-rose-500 text-rose-900'
                : 'bg-white border-neutral-200 text-neutral-400 opacity-60'
            ]"
            @click="handleQuizAnswer(opt.id)"
          >
            <span>{{ opt.label }}</span>
          </button>
        </div>

        <!-- Feedback & Next Button -->
        <div v-if="quizAnswer !== null" class="pt-4 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <p class="text-xs text-neutral-600">
            {{ QUIZ_ITEMS[quizIndex].explanation }}
          </p>

          <button
            type="button"
            class="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer shrink-0 hover:bg-neutral-800"
            @click="nextQuestion"
          >
            <span>{{ quizIndex < QUIZ_ITEMS.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil' }}</span>
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
          Kuis Selesai! Skor Anda: {{ quizScore }} / 100
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
          Hebat! Anda telah menguji pemahaman pelafalan jam khusus (4, 7, 9), hari dalam seminggu, dan 4 bentuk konjugasi kata kerja.
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
            @click="emit('next-session')"
          >
            Lanjut ke Kosakata &rarr;
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
