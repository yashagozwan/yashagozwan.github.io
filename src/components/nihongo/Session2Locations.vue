<script setup lang="ts">
import { ref } from 'vue'
import {
  LOCATION_COMPARISON_L3,
  SPECIAL_PRICES_L3,
} from '@/data/nihongoLesson3'
import {
  SpeakerWaveIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  LightBulbIcon,
  TableCellsIcon,
  MapPinIcon,
  CurrencyYenIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

// Sub-mode: 'zones' | 'table' | 'prices' | 'quiz'
const activeSubMode = ref<'zones' | 'table' | 'prices' | 'quiz'>('zones')

// Active Zone Card in Zone Visualizer
const activeZoneIndex = ref(0)
const zones = [
  {
    title: 'Zona 1: Dekat Pembicara (Di Sini)',
    basic: 'ここ',
    basicRomaji: 'koko',
    polite: 'こちら',
    politeRomaji: 'kochira',
    meaning: 'Di sini / Sebelah sini',
    context: 'Digunakan saat ruangan atau fasilitas berada tepat di dekat posisi pembicara.',
    example: 'ここは きょうしつです。 (Di sini adalah ruang kelas.)',
    exampleAudio: 'ここはきょうしつです',
  },
  {
    title: 'Zona 2: Dekat Lawan Bicara (Di Situ)',
    basic: 'そこ',
    basicRomaji: 'soko',
    polite: 'そちら',
    politeRomaji: 'sochira',
    meaning: 'Di situ / Sebelah situ',
    context: 'Digunakan saat ruangan atau fasilitas berada di dekat posisi orang yang diajak bicara.',
    example: 'そこは うけつけです。 (Di situ adalah resepsionis.)',
    exampleAudio: 'そこはうけつけです',
  },
  {
    title: 'Zona 3: Jauh dari Keduanya (Di Sana)',
    basic: 'あそこ',
    basicRomaji: 'asoko',
    polite: 'あちら',
    politeRomaji: 'achira',
    meaning: 'Di sana / Sebelah sana',
    context: 'Digunakan saat ruangan berada jauh dari posisi pembicara maupun lawan bicara.',
    example: 'あそこは しょくどうです。 (Di sana adalah kantin.)',
    exampleAudio: 'あそこはしょくどうです',
  },
  {
    title: 'Zona Tanya: Menanyakan Tempat & Arah',
    basic: 'どこ',
    basicRomaji: 'doko',
    polite: 'どちら',
    politeRomaji: 'dochira',
    meaning: 'Di mana / Sebelah mana?',
    context: 'Digunakan untuk menanyakan letak lokasi. Bentuk dochira juga dipakai menanyakan negara/instansi asal.',
    example: 'トイレは どこですか。 (Toilet ada di mana?)',
    exampleAudio: 'トイレはどこですか',
  },
]

// Recall Quiz state for Session 2
interface LocationQuiz {
  id: number
  question: string
  hint: string
  options: string[]
  correct: string
  explanation: string
  audio: string
}

const recallQuizzes: LocationQuiz[] = [
  {
    id: 1,
    question: 'Anda sedang berdiri di dalam ruang kelas dan ingin memberi tahu rekan: "Di sini ruang kelas." Kata tunjuk yang tepat adalah...',
    hint: 'Lokasi berada dekat dengan pembicara.',
    options: ['ここは きょうしつです。', 'そこは きょうしつです。', 'あそこは きょうしつです。'],
    correct: 'ここは きょうしつです。',
    explanation: 'ここ (koko) digunakan untuk menunjuk lokasi yang dekat dengan pembicara.',
    audio: 'ここはきょうしつです',
  },
  {
    id: 2,
    question: 'Tempat yang ditunjuk berada di dekat lawan bicara Anda. Kata tunjuk lokasi yang benar adalah...',
    hint: 'Dekat lawan bicara.',
    options: ['ここ', 'そこ', 'あそこ'],
    correct: 'そこ',
    explanation: 'そこ (soko) menunjuk tempat yang berada dekat dengan posisi lawan bicara.',
    audio: 'そこ',
  },
  {
    id: 3,
    question: 'Bentuk sopan (layanan / arah) dari kata tanya lokasi "どこ" adalah...',
    hint: 'Bentuk yang santun untuk menanyakan arah atau negara asal.',
    options: ['こちら', 'そちら', 'どちら'],
    correct: 'どちら',
    explanation: 'どちら (dochira) adalah bentuk sopan dari どこ (doko). Sering digunakan dalam: おくには どちらですか.',
    audio: 'どちら',
  },
  {
    id: 4,
    question: 'Manakah bentuk sopan yang digunakan pelayan untuk menunjukkan "Lift ada di sebelah sini"?',
    hint: 'Sebelah sini = bentuk sopan dari koko.',
    options: ['エレベーターは こちらです。', 'エレベーターは あちらです。', 'エレベーターは そちらです。'],
    correct: 'エレベーターは こちらです。',
    explanation: 'こちら (kochira) adalah bentuk sopan untuk menunjukkan arah "sebelah sini".',
    audio: 'エレベーターはどちらです',
  },
  {
    id: 5,
    question: 'Bagaimana pelafalan khusus untuk nominal harga 300 Yen?',
    hint: 'Mengalami perubahan bunyi menjadi b.',
    options: ['さんひゃくえん', 'さんびゃくえん', 'さんぴゃくえん'],
    correct: 'さんびゃくえん',
    explanation: '300 Yen dilafalkan khusus sebagai さんびゃくえん (sanbyaku en).',
    audio: 'さんびゃくえん',
  },
  {
    id: 6,
    question: 'Bagaimana pelafalan khusus untuk nominal harga 8.000 Yen?',
    hint: 'Mengalami konsonan ganda s (tsu kecil).',
    options: ['はちせんえん', 'はっせんえん', 'はちぜんえん'],
    correct: 'はっせんえん',
    explanation: '8.000 Yen dilafalkan dengan konsonan ganda s: はっせんえん (hassen en).',
    audio: 'はっせんえん',
  },
]

const currentQuizIndex = ref(0)
const selectedAnswers = ref<Record<number, string>>({})
const quizSubmitted = ref<Record<number, boolean>>({})

function handleSelectAnswer(opt: string) {
  const q = recallQuizzes[currentQuizIndex.value]
  if (!q) return
  if (quizSubmitted.value[q.id]) return
  selectedAnswers.value[q.id] = opt
  quizSubmitted.value[q.id] = true

  if (opt === q.correct) {
    emit('gain-xp', 15)
    emit('play-audio', q.audio)
  }
}

function handleRetryQuiz(quizId: number) {
  delete selectedAnswers.value[quizId]
  delete quizSubmitted.value[quizId]
}

function nextQuiz() {
  if (currentQuizIndex.value < recallQuizzes.length - 1) {
    currentQuizIndex.value++
  }
}

function prevQuiz() {
  if (currentQuizIndex.value > 0) {
    currentQuizIndex.value--
  }
}
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">2</span>
          <span>Sesi 2: Kata Tunjuk Lokasi &amp; Arah Bab 3</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950">
          Model 3 Zona Lokasi &amp; Ragam Sopan
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-2xl">
          Kuasai perbedaan letak fisik (ここ・そこ・あそこ) dan bentuk kesopanan layanan (こちら・そちら・あちら), serta pelafalan khusus nominal harga Yen.
        </p>
      </div>

      <!-- Mode Switcher -->
      <div class="flex items-center p-1 bg-white border border-neutral-200 rounded-xl shadow-xs self-start sm:self-center shrink-0 gap-1 flex-wrap">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="activeSubMode === 'zones' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeSubMode = 'zones'"
        >
          <MapPinIcon class="w-3.5 h-3.5" />
          <span>Zona Lokasi</span>
        </button>

        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="activeSubMode === 'table' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeSubMode = 'table'"
        >
          <TableCellsIcon class="w-3.5 h-3.5" />
          <span>Tabel Bentuk</span>
        </button>

        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="activeSubMode === 'prices' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeSubMode = 'prices'"
        >
          <CurrencyYenIcon class="w-3.5 h-3.5" />
          <span>Harga Yen</span>
        </button>

        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="activeSubMode === 'quiz' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeSubMode = 'quiz'"
        >
          <SparklesIcon class="w-3.5 h-3.5" />
          <span>Kuis Kilas Balik</span>
        </button>
      </div>
    </div>

    <!-- SUB-MODE 1: INTERACTIVE 3 ZONES VISUALIZER -->
    <div v-if="activeSubMode === 'zones'" class="space-y-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <button
          v-for="(z, zIdx) in zones"
          :key="zIdx"
          type="button"
          class="p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between cursor-pointer space-y-3"
          :class="
            activeZoneIndex === zIdx
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-102'
              : 'bg-white border-neutral-200 hover:border-neutral-950 text-neutral-900'
          "
          @click="activeZoneIndex = zIdx"
        >
          <div class="flex items-center justify-between w-full">
            <span
              class="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-md"
              :class="activeZoneIndex === zIdx ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-600'"
            >
              Zona 0{{ zIdx + 1 }}
            </span>
            <span
              v-if="activeZoneIndex === zIdx"
              class="w-2 h-2 rounded-full bg-emerald-400"
            ></span>
          </div>

          <div>
            <div class="text-2xl font-black font-sans tracking-wide">
              {{ z.basic }}
              <span class="text-xs font-mono font-normal opacity-70 ml-1">/ {{ z.polite }}</span>
            </div>
            <div v-if="props.showRomaji" class="text-xs font-mono opacity-60">
              {{ z.basicRomaji }} / {{ z.politeRomaji }}
            </div>
            <div class="text-xs font-medium mt-1" :class="activeZoneIndex === zIdx ? 'text-neutral-300' : 'text-neutral-600'">
              {{ z.meaning }}
            </div>
          </div>
        </button>
      </div>

      <!-- Detail Card of Selected Zone -->
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Penjelasan Spasial:
            </span>
            <h3 class="font-display font-black text-2xl text-neutral-950 mt-0.5">
              {{ zones[activeZoneIndex]?.title }}
            </h3>
            <p class="text-xs text-neutral-600 mt-1 max-w-xl">
              {{ zones[activeZoneIndex]?.context }}
            </p>
          </div>

          <div class="flex items-center gap-2 self-start sm:self-center">
            <button
              type="button"
              class="px-3.5 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              @click="emit('play-audio', zones[activeZoneIndex]?.basic || '')"
            >
              <SpeakerWaveIcon class="w-3.5 h-3.5" />
              <span>Dengar "{{ zones[activeZoneIndex]?.basic }}"</span>
            </button>
            <button
              type="button"
              class="px-3.5 py-2 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
              @click="emit('play-audio', zones[activeZoneIndex]?.polite || '')"
            >
              <SpeakerWaveIcon class="w-3.5 h-3.5" />
              <span>Dengar "{{ zones[activeZoneIndex]?.polite }}"</span>
            </button>
          </div>
        </div>

        <!-- Word Comparison Breakdown -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
            <div class="text-[10px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
              Bentuk Biasa (Tempat Fisik)
            </div>
            <div class="text-3xl font-extrabold text-neutral-950 font-sans">
              {{ zones[activeZoneIndex]?.basic }}
            </div>
            <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-500">
              {{ zones[activeZoneIndex]?.basicRomaji }}
            </div>
            <p class="text-xs text-neutral-700 pt-1 leading-relaxed">
              Digunakan saat percakapan sehari-hari kepada teman, rekan sejawat, atau keluarga untuk menunjuk lokasi tempat.
            </p>
          </div>

          <div class="p-5 rounded-2xl bg-neutral-950 text-white space-y-2 shadow-sm">
            <div class="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold flex items-center gap-1.5">
              <SparklesIcon class="w-3 h-3 text-emerald-400" />
              <span>Bentuk Sopan / Arah Pelayanan</span>
            </div>
            <div class="text-3xl font-extrabold text-white font-sans">
              {{ zones[activeZoneIndex]?.polite }}
            </div>
            <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400">
              {{ zones[activeZoneIndex]?.politeRomaji }}
            </div>
            <p class="text-xs text-neutral-300 pt-1 leading-relaxed">
              Digunakan staf hotel, toko, atau resepsionis untuk menunjukkan arah, serta menanyakan negara asal dengan hormat.
            </p>
          </div>
        </div>

        <!-- Example Box -->
        <div class="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div class="space-y-0.5">
            <div class="text-[10px] font-mono text-emerald-800 uppercase tracking-widest font-bold">
              Contoh Kalimat Riil:
            </div>
            <div class="text-base sm:text-lg font-bold text-emerald-950 font-sans">
              {{ zones[activeZoneIndex]?.example }}
            </div>
          </div>
          <button
            type="button"
            class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 self-start sm:self-center shrink-0 cursor-pointer"
            @click="emit('play-audio', zones[activeZoneIndex]?.exampleAudio || '')"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Putar Kalimat</span>
          </button>
        </div>
      </div>
    </div>

    <!-- SUB-MODE 2: TABLE COMPARISON -->
    <div v-else-if="activeSubMode === 'table'" class="space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="border-b border-neutral-100 pb-4">
          <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Tabel Komparasi</span>
          <h3 class="font-display font-black text-2xl text-neutral-950 mt-0.5">
            Bentuk Biasa vs Bentuk Sopan Pelayanan
          </h3>
          <p class="text-xs text-neutral-600 mt-1">
            Gunakan tabel ini sebagai acuan cepat dalam memilih tingkat kesopanan bahasa Jepang yang sesuai konteks.
          </p>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-left text-xs border-collapse">
            <thead>
              <tr class="border-b-2 border-neutral-950 text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                <th class="py-3 px-3">Zona Jarak</th>
                <th class="py-3 px-3">Biasa (Tempat)</th>
                <th class="py-3 px-3">Sopan (Arah / Hormat)</th>
                <th class="py-3 px-3">Arti Indonesia</th>
                <th class="py-3 px-3 text-right">Audio</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-neutral-200">
              <tr
                v-for="(item, idx) in LOCATION_COMPARISON_L3"
                :key="idx"
                class="hover:bg-neutral-50 transition-colors"
              >
                <td class="py-3.5 px-3 font-semibold text-neutral-950 font-sans">
                  {{ item.zone }}
                </td>
                <td class="py-3.5 px-3">
                  <span class="text-base font-bold font-sans text-neutral-950 mr-1.5">{{ item.basic.japanese }}</span>
                  <span v-if="props.showRomaji" class="text-[10px] font-mono text-neutral-500">({{ item.basic.romaji }})</span>
                </td>
                <td class="py-3.5 px-3">
                  <span class="text-base font-bold font-sans text-emerald-700 mr-1.5">{{ item.polite.japanese }}</span>
                  <span v-if="props.showRomaji" class="text-[10px] font-mono text-emerald-600">({{ item.polite.romaji }})</span>
                </td>
                <td class="py-3.5 px-3 text-neutral-600">
                  {{ item.basic.meaning }}
                </td>
                <td class="py-3.5 px-3 text-right">
                  <button
                    type="button"
                    class="p-1.5 rounded-lg hover:bg-neutral-200 text-neutral-600 transition-colors inline-flex cursor-pointer"
                    title="Putar suara"
                    @click="emit('play-audio', `${item.basic.japanese}、${item.polite.japanese}`)"
                  >
                    <SpeakerWaveIcon class="w-4 h-4" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl text-xs space-y-1 text-neutral-700">
          <div class="font-bold text-neutral-950 flex items-center gap-1.5">
            <LightBulbIcon class="w-4 h-4 text-amber-500 shrink-0" />
            <span>Kaidah Penggunaan Khusus "どちら (Dochira)":</span>
          </div>
          <p class="text-[11px] text-neutral-600 pl-5 leading-relaxed">
            Dalam situasi sosial atau bisnis, menanyakan negara asal atau nama perusahaan seseorang dengan <strong>おくには どちらですか</strong> (Okuni wa dochira desu ka) atau <strong>かいしゃは どちらですか</strong> (Kaisha wa dochira desu ka) terdengar jauh lebih sopan dan menghormati lawan bicara dibanding memakai <em>doko</em>.
          </p>
        </div>
      </div>
    </div>

    <!-- SUB-MODE 3: SPECIAL PRICES TABLE -->
    <div v-else-if="activeSubMode === 'prices'" class="space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="border-b border-neutral-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Pola Angka &amp; Mata Uang</span>
            <h3 class="font-display font-black text-2xl text-neutral-950 mt-0.5">
              Pelafalan Khusus Nominal Harga Yen (円)
            </h3>
            <p class="text-xs text-neutral-600 mt-1">
              Perhatikan perubahan bunyi fonetik pada angka 300, 600, 800, 3.000, 8.000, dan satuan 10.000 (いちまん).
            </p>
          </div>
          <span class="text-xs font-mono bg-neutral-100 px-3 py-1 rounded-full text-neutral-800 self-start sm:self-center font-bold">
            Mata Uang: 円 (えん)
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div
            v-for="p in SPECIAL_PRICES_L3"
            :key="p.number"
            class="p-4 rounded-2xl border transition-all flex flex-col justify-between space-y-2"
            :class="p.isSpecial ? 'bg-amber-50/50 border-amber-300' : 'bg-neutral-50 border-neutral-200'"
          >
            <div class="flex items-center justify-between">
              <span class="font-display font-black text-lg text-neutral-950">
                ¥{{ p.number.toLocaleString() }}
              </span>
              <span
                v-if="p.isSpecial"
                class="text-[9px] font-mono px-2 py-0.5 rounded-full font-bold bg-amber-200 text-amber-900"
              >
                Bunyi Khusus
              </span>
            </div>

            <div>
              <div class="text-lg font-bold font-sans text-neutral-950">
                {{ p.japanese }}
              </div>
              <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-500">
                {{ p.romaji }}
              </div>
            </div>

            <div class="pt-2 border-t border-neutral-200/60 flex items-center justify-between">
              <span class="text-[10px] text-neutral-500 italic">{{ p.notes || p.meaning }}</span>
              <button
                type="button"
                class="p-1 rounded-full hover:bg-neutral-200 text-neutral-700 transition-colors cursor-pointer"
                title="Putar suara harga"
                @click="emit('play-audio', p.japanese)"
              >
                <SpeakerWaveIcon class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- SUB-MODE 4: RECALL QUIZ -->
    <div v-else class="space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-4">
          <div>
            <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Kuis Kilas Balik</span>
            <h3 class="font-display font-black text-2xl text-neutral-950 mt-0.5">
              Uji Cepat Pemahaman Lokasi &amp; Harga
            </h3>
          </div>
          <div class="text-xs font-mono text-neutral-500">
            Soal {{ currentQuizIndex + 1 }} dari {{ recallQuizzes.length }}
          </div>
        </div>

        <!-- Question Body -->
        <div v-if="recallQuizzes[currentQuizIndex]" class="space-y-4">
          <div class="space-y-1">
            <p class="text-base sm:text-lg font-bold text-neutral-950 leading-relaxed">
              {{ recallQuizzes[currentQuizIndex]?.question }}
            </p>
            <p class="text-xs text-neutral-500 italic">
              Petunjuk: {{ recallQuizzes[currentQuizIndex]?.hint }}
            </p>
          </div>

          <!-- Options List -->
          <div class="space-y-2.5">
            <button
              v-for="opt in recallQuizzes[currentQuizIndex]?.options"
              :key="opt"
              type="button"
              :disabled="quizSubmitted[recallQuizzes[currentQuizIndex]?.id || 0]"
              class="w-full p-4 rounded-2xl text-left border-2 font-medium text-sm transition-all flex items-center justify-between cursor-pointer"
              :class="
                quizSubmitted[recallQuizzes[currentQuizIndex]?.id || 0]
                  ? opt === recallQuizzes[currentQuizIndex]?.correct
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold'
                    : selectedAnswers[recallQuizzes[currentQuizIndex]?.id || 0] === opt
                    ? 'bg-rose-50 border-rose-500 text-rose-950 font-bold'
                    : 'bg-white border-neutral-200 opacity-60 text-neutral-600'
                  : 'bg-white border-neutral-200 hover:border-neutral-950 text-neutral-900'
              "
              @click="handleSelectAnswer(opt)"
            >
              <span>{{ opt }}</span>
              <span v-if="quizSubmitted[recallQuizzes[currentQuizIndex]?.id || 0]">
                <CheckIcon
                  v-if="opt === recallQuizzes[currentQuizIndex]?.correct"
                  class="w-5 h-5 text-emerald-600 font-bold"
                />
                <XMarkIcon
                  v-else-if="selectedAnswers[recallQuizzes[currentQuizIndex]?.id || 0] === opt"
                  class="w-5 h-5 text-rose-600 font-bold"
                />
              </span>
            </button>
          </div>

          <!-- Feedback Box -->
          <div
            v-if="quizSubmitted[recallQuizzes[currentQuizIndex]?.id || 0]"
            class="p-4 rounded-2xl text-xs space-y-2 animate-fadeIn"
            :class="
              selectedAnswers[recallQuizzes[currentQuizIndex]?.id || 0] === recallQuizzes[currentQuizIndex]?.correct
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-950'
                : 'bg-rose-50 border border-rose-200 text-rose-950'
            "
          >
            <div class="flex items-center justify-between">
              <span class="font-bold flex items-center gap-1.5 text-sm">
                <CheckIcon
                  v-if="selectedAnswers[recallQuizzes[currentQuizIndex]?.id || 0] === recallQuizzes[currentQuizIndex]?.correct"
                  class="w-4 h-4 text-emerald-600"
                />
                <XMarkIcon v-else class="w-4 h-4 text-rose-600" />
                <span>
                  {{
                    selectedAnswers[recallQuizzes[currentQuizIndex]?.id || 0] === recallQuizzes[currentQuizIndex]?.correct
                      ? 'Luar Biasa, Jawaban Anda Benar!'
                      : 'Jawaban Belum Tepat.'
                  }}
                </span>
              </span>

              <button
                v-if="selectedAnswers[recallQuizzes[currentQuizIndex]?.id || 0] !== recallQuizzes[currentQuizIndex]?.correct"
                type="button"
                class="px-3 py-1 bg-white border border-rose-300 text-rose-800 rounded-lg text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
                @click="handleRetryQuiz(recallQuizzes[currentQuizIndex]?.id || 0)"
              >
                Coba Ulang
              </button>
            </div>

            <p class="text-xs leading-relaxed">
              {{ recallQuizzes[currentQuizIndex]?.explanation }}
            </p>
          </div>
        </div>

        <!-- Pager Controls -->
        <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
          <button
            type="button"
            :disabled="currentQuizIndex === 0"
            class="px-4 py-2 border border-neutral-300 rounded-xl text-xs font-semibold text-neutral-700 disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:border-neutral-950 transition-colors"
            @click="prevQuiz"
          >
            <ArrowLeftIcon class="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            :disabled="currentQuizIndex === recallQuizzes.length - 1"
            class="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-bold disabled:opacity-40 flex items-center gap-1.5 cursor-pointer hover:bg-neutral-800 transition-colors"
            @click="nextQuiz"
          >
            <span>Soal Berikutnya</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Session Navigation Footer -->
    <div class="pt-6 border-t border-neutral-200 flex items-center justify-between">
      <span class="text-xs text-neutral-500 font-mono">
        Konsep zona lokasi &amp; arah sudah dipahami? Lanjutkan ke Sesi 3.
      </span>
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 3: Kosakata Tempat &amp; Fasilitas</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
