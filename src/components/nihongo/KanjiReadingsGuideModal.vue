<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  XMarkIcon,
  SpeakerWaveIcon,
  LightBulbIcon,
  SparklesIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ArrowsRightLeftIcon,
} from '@heroicons/vue/24/outline'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'play-audio', text: string): void
}>()

// Active tab in guide modal: 'komparasi' | 'simulator' | 'rumus'
const activeTab = ref<'komparasi' | 'simulator' | 'rumus'>('komparasi')

// Interactive Simulator State
interface SimulatorKanji {
  id: string
  kanji: string
  meaning: string
  kun: {
    expression: string
    reading: string
    romaji: string
    meaning: string
    reason: string
    audioText: string
  }
  on: {
    expression: string
    reading: string
    romaji: string
    meaning: string
    reason: string
    audioText: string
  }
}

const SIMULATOR_KANJI_LIST: SimulatorKanji[] = [
  {
    id: 'mizu',
    kanji: '水',
    meaning: 'Air',
    kun: {
      expression: '水',
      reading: 'みず',
      romaji: 'mizu',
      meaning: 'Air (air minum biasa)',
      reason: 'Kanji berdiri sendirian tanpa kanji lain',
      audioText: 'みず',
    },
    on: {
      expression: '水曜日',
      reading: 'すいようび',
      romaji: 'sui-youbi',
      meaning: 'Hari Rabu',
      reason: 'Digabung dengan kanji 曜日 (kata majemuk)',
      audioText: 'すいようび',
    },
  },
  {
    id: 'hito',
    kanji: '人',
    meaning: 'Orang / Warga',
    kun: {
      expression: 'あの人',
      reading: 'あのひと',
      romaji: 'ano hito',
      meaning: 'Orang itu',
      reason: 'Kanji berdiri sendiri diawali kata tunjuk',
      audioText: 'あのひと',
    },
    on: {
      expression: '日本人',
      reading: 'にほんじん',
      romaji: 'Nihon-jin',
      meaning: 'Orang Jepang',
      reason: 'Ditempelkan di belakang nama negara 日本',
      audioText: 'にほんじん',
    },
  },
  {
    id: 'hon',
    kanji: '本',
    meaning: 'Buku / Asal',
    kun: {
      expression: '本',
      reading: 'ほん',
      romaji: 'hon',
      meaning: 'Buku',
      reason: 'Kanji berdiri tunggal sebagai kata benda',
      audioText: 'ほん',
    },
    on: {
      expression: '日本語',
      reading: 'にほんご',
      romaji: 'Nihon-go',
      meaning: 'Bahasa Jepang',
      reason: 'Kombinasi kata majemuk 日本 + 語',
      audioText: 'にほんご',
    },
  },
  {
    id: 'kuruma',
    kanji: '車',
    meaning: 'Mobil / Kendaraan',
    kun: {
      expression: '車',
      reading: 'くるま',
      romaji: 'kuruma',
      meaning: 'Mobil',
      reason: 'Berdiri sendiri tanpa kanji lain',
      audioText: 'くるま',
    },
    on: {
      expression: '電車',
      reading: 'でんしゃ',
      romaji: 'den-sha',
      meaning: 'Kereta Listrik',
      reason: 'Kombinasi kanji listrik 電 + mobil 車',
      audioText: 'でんしゃ',
    },
  },
  {
    id: 'hi',
    kanji: '日',
    meaning: 'Matahari / Hari',
    kun: {
      expression: '日',
      reading: 'ひ',
      romaji: 'hi',
      meaning: 'Hari / Sinar matahari',
      reason: 'Berdiri sendiri',
      audioText: 'ひ',
    },
    on: {
      expression: '日曜日',
      reading: 'にちようび',
      romaji: 'nichi-youbi',
      meaning: 'Hari Minggu',
      reason: 'Menjadi penanda hari di awal 日曜日',
      audioText: 'にちようび',
    },
  },
  {
    id: 'gaku',
    kanji: '学',
    meaning: 'Belajar / Ilmu',
    kun: {
      expression: '学ぶ',
      reading: 'まなぶ',
      romaji: 'mana-bu',
      meaning: 'Belajar / Menuntut ilmu',
      reason: 'Ada ekor huruf Hiragana ぶ (okurigana)',
      audioText: 'まなぶ',
    },
    on: {
      expression: '学生',
      reading: 'がくせい',
      romaji: 'gaku-sei',
      meaning: 'Pelajar / Mahasiswa',
      reason: 'Majemuk dengan kanji lahir/hidup 生',
      audioText: 'がくせい',
    },
  },
  {
    id: 'dai',
    kanji: '大',
    meaning: 'Besar',
    kun: {
      expression: '大きい',
      reading: 'おおきい',
      romaji: 'oo-kii',
      meaning: 'Besar (kata sifat)',
      reason: 'Ada ekor huruf Hiragana きい',
      audioText: 'おおきい',
    },
    on: {
      expression: '大学',
      reading: 'だいがく',
      romaji: 'dai-gaku',
      meaning: 'Universitas',
      reason: 'Kombinasi kanji besar 大 + belajar 学',
      audioText: 'だいがく',
    },
  },
]

const selectedSimKanjiId = ref<string>('mizu')
const selectedSimulatorItem = ref<SimulatorKanji>(SIMULATOR_KANJI_LIST[0])

function setSimulatorKanji(item: SimulatorKanji) {
  selectedSimKanjiId.value = item.id
  selectedSimulatorItem.value = item
}

// Keyboard escape key listener
function handleKeyDown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    emit('close')
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/70 backdrop-blur-sm"
      @click.self="emit('close')"
    >
      <div
        class="bg-white border border-neutral-200 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-scaleIn text-neutral-950"
      >
        <!-- Modal Top Bar -->
        <div class="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shadow-xs">
              <ArrowsRightLeftIcon class="w-5 h-5 text-white" />
            </div>
            <div>
              <div class="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-neutral-500 font-semibold">
                <span>Panduan Aksara N5</span>
                <span>&bull;</span>
                <span>Kanji Essentials</span>
              </div>
              <h3 class="font-display text-lg sm:text-xl font-black text-neutral-950 tracking-tight leading-none mt-0.5">
                On'yomi (音読み) vs Kun'yomi (訓読み)
              </h3>
            </div>
          </div>

          <button
            type="button"
            class="p-2 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-200/60 rounded-full transition-colors cursor-pointer"
            aria-label="Tutup dialog"
            @click="emit('close')"
          >
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <!-- Mode Segmented Navigation -->
        <div class="px-6 py-3 border-b border-neutral-200 bg-white flex items-center justify-between gap-3 overflow-x-auto scrollbar-none">
          <div class="flex items-center gap-1.5 p-1 bg-neutral-100 rounded-2xl shrink-0">
            <button
              type="button"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              :class="
                activeTab === 'komparasi'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              "
              @click="activeTab = 'komparasi'"
            >
              <ArrowsRightLeftIcon class="w-3.5 h-3.5" />
              <span>Komparasi Visual</span>
            </button>

            <button
              type="button"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              :class="
                activeTab === 'simulator'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              "
              @click="activeTab = 'simulator'"
            >
              <SpeakerWaveIcon class="w-3.5 h-3.5" />
              <span>Simulasi Suara (Interaktif)</span>
            </button>

            <button
              type="button"
              class="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              :class="
                activeTab === 'rumus'
                  ? 'bg-neutral-950 text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-950'
              "
              @click="activeTab = 'rumus'"
            >
              <LightBulbIcon class="w-3.5 h-3.5" />
              <span>Rumus Emas 80/20</span>
            </button>
          </div>

          <span class="text-[11px] font-mono text-neutral-400 hidden sm:inline-block">
            Tekan <kbd class="px-1.5 py-0.5 bg-neutral-100 border border-neutral-300 rounded text-[10px] text-neutral-700">ESC</kbd> untuk menutup
          </span>
        </div>

        <!-- Modal Content Container -->
        <div class="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-neutral-900">
          <!-- ============================================================== -->
          <!-- TAB 1: KOMPARASI VISUAL (SIDE-BY-SIDE CONTRAST) -->
          <!-- ============================================================== -->
          <div v-if="activeTab === 'komparasi'" class="space-y-6">
            <!-- Hero Statement -->
            <div class="text-center max-w-xl mx-auto space-y-2">
              <span class="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
                Prinsip Sederhana
              </span>
              <h4 class="font-display text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                Satu Huruf Kanji, Dua Sudut Pandang Suara
              </h4>
              <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Jepang dulunya punya bahasa lisan tapi belum punya aksara tulis. Saat mengimpor huruf dari Tiongkok, mereka menyerap <strong>bunyi aslinya (On'yomi)</strong> sekaligus menempelkan <strong>makna bahasa asli mereka (Kun'yomi)</strong>.
              </p>
            </div>

            <!-- Side-by-Side Dual Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-1">
              <!-- KUN'YOMI (JEPANG) CARD -->
              <div class="bg-white border-2 border-neutral-900 rounded-3xl p-6 flex flex-col justify-between gap-5 shadow-sm">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 bg-neutral-100 text-neutral-900 rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                      Asli Jepang
                    </span>
                    <span class="font-mono text-xs text-neutral-400">訓読み &bull; Makna</span>
                  </div>

                  <div>
                    <h5 class="font-display text-2xl font-black text-neutral-950">
                      Kun'yomi (訓読み)
                    </h5>
                    <p class="text-xs text-neutral-600 mt-0.5">
                      Cara baca menggunakan kosakata asli bangsa Jepang (<em>Yamato Kotoba</em>).
                    </p>
                  </div>

                  <!-- Key Traits List -->
                  <div class="space-y-2.5 pt-2 text-xs">
                    <div class="flex items-start gap-2.5">
                      <div class="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        1
                      </div>
                      <div>
                        <strong class="text-neutral-950">Kamus ditulis Hiragana:</strong>
                        <p class="text-neutral-600">Misalnya <code class="font-mono bg-neutral-100 px-1 py-0.5 rounded">みず</code>, <code class="font-mono bg-neutral-100 px-1 py-0.5 rounded">ひと</code>, <code class="font-mono bg-neutral-100 px-1 py-0.5 rounded">くるま</code>.</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-2.5">
                      <div class="w-5 h-5 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        2
                      </div>
                      <div>
                        <strong class="text-neutral-950">Dipakai saat Kanji sendirian:</strong>
                        <p class="text-neutral-600">Bila kanji tidak berjejer dengan kanji lain, atau memiliki buntut hiragana (<code class="font-mono bg-neutral-100 px-1 rounded">食べる</code>).</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Example Pill Box -->
                <div class="p-3.5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-1">
                  <div class="text-[11px] font-mono text-neutral-500 uppercase font-bold">
                    Contoh Nyata:
                  </div>
                  <div class="font-sans font-bold text-sm text-neutral-950 flex items-center justify-between">
                    <span>水 &rarr; dibaca <em>みず (mizu)</em></span>
                    <span class="text-xs font-normal text-neutral-500">= Air</span>
                  </div>
                </div>
              </div>

              <!-- ON'YOMI (TIONGKOK) CARD -->
              <div class="bg-neutral-950 text-white rounded-3xl p-6 flex flex-col justify-between gap-5 shadow-xl">
                <div class="space-y-3">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-1 bg-white/10 text-white rounded-lg font-mono text-xs font-bold uppercase tracking-wider">
                      Serapan Tiongkok
                    </span>
                    <span class="font-mono text-xs text-neutral-400">音読み &bull; Bunyi</span>
                  </div>

                  <div>
                    <h5 class="font-display text-2xl font-black text-white">
                      On'yomi (音読み)
                    </h5>
                    <p class="text-xs text-neutral-300 mt-0.5">
                      Cara baca yang meniru lafal Tiongkok kuno dengan logat lidah Jepang.
                    </p>
                  </div>

                  <!-- Key Traits List -->
                  <div class="space-y-2.5 pt-2 text-xs">
                    <div class="flex items-start gap-2.5">
                      <div class="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        1
                      </div>
                      <div>
                        <strong class="text-white">Kamus ditulis Katakana:</strong>
                        <p class="text-neutral-300">Misalnya <code class="font-mono bg-white/10 px-1 py-0.5 rounded text-white">スイ</code>, <code class="font-mono bg-white/10 px-1 py-0.5 rounded text-white">ジン</code>, <code class="font-mono bg-white/10 px-1 py-0.5 rounded text-white">シャ</code>.</p>
                      </div>
                    </div>

                    <div class="flex items-start gap-2.5">
                      <div class="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 mt-0.5 font-mono text-[10px] font-bold">
                        2
                      </div>
                      <div>
                        <strong class="text-white">Dipakai saat Kanji bergandengan:</strong>
                        <p class="text-neutral-300">Membentuk kata majemuk (<em>Jukugo</em>) bersama kanji lain (<code class="font-mono bg-white/10 px-1 rounded text-white">水曜日</code>, <code class="font-mono bg-white/10 px-1 rounded text-white">日本人</code>).</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Example Pill Box -->
                <div class="p-3.5 bg-white/10 border border-white/20 rounded-2xl space-y-1">
                  <div class="text-[11px] font-mono text-neutral-300 uppercase font-bold">
                    Contoh Nyata:
                  </div>
                  <div class="font-sans font-bold text-sm text-white flex items-center justify-between">
                    <span>水曜日 &rarr; dibaca <em>すいようび (suiyoubi)</em></span>
                    <span class="text-xs font-normal text-neutral-300">= Hari Rabu</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Analogi Bahasa Indonesia -->
            <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-5 sm:p-6 space-y-3">
              <div class="flex items-center gap-2">
                <LightBulbIcon class="w-5 h-5 text-neutral-900" />
                <h5 class="font-display font-extrabold text-sm sm:text-base text-neutral-950">
                  Analogi Sederhana dalam Bahasa Kita
                </h5>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-700">
                <div class="p-3.5 bg-white border border-neutral-200 rounded-2xl space-y-1">
                  <strong class="text-neutral-950 font-bold block">1. Simbol Simbol Matematika "&"</strong>
                  <p class="text-neutral-600 leading-relaxed">
                    Jika dibaca dalam bahasa asli kita: <strong>"dan"</strong> (ini konsep <em>Kun'yomi</em>).
                    Jika dibaca dalam istilah asing serapan: <strong>"et" / "and"</strong> (ini konsep <em>On'yomi</em>).
                  </p>
                </div>

                <div class="p-3.5 bg-white border border-neutral-200 rounded-2xl space-y-1">
                  <strong class="text-neutral-950 font-bold block">2. Kata "Air" vs "Hidro / Aqua"</strong>
                  <p class="text-neutral-600 leading-relaxed">
                    Saat berdiri sendiri, kita minum <strong>air</strong>. Tapi saat digabung menjadi istilah ilmiah majemuk, kita menyebut <strong>hidrologi</strong> atau <strong>akuarium</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- ============================================================== -->
          <!-- TAB 2: SIMULATOR SUARA INTERAKTIF -->
          <!-- ============================================================== -->
          <div v-else-if="activeTab === 'simulator'" class="space-y-6">
            <div class="text-center max-w-lg mx-auto space-y-1.5">
              <span class="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
                Coba & Dengarkan Sendiri
              </span>
              <h4 class="font-display text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                Pilih Huruf Kanji untuk Mendengar Perbedaan Suara
              </h4>
              <p class="text-xs text-neutral-600">
                Klik salah satu huruf kanji di bawah ini untuk melihat dan mendengarkan suaranya saat berdiri sendiri vs saat bergabung.
              </p>
            </div>

            <!-- Kanji Selector Carousel / Tabs -->
            <div class="flex items-center justify-center gap-2 flex-wrap">
              <button
                v-for="item in SIMULATOR_KANJI_LIST"
                :key="item.id"
                type="button"
                class="px-4 py-2.5 rounded-2xl border text-center transition-all cursor-pointer flex items-center gap-2"
                :class="
                  selectedSimKanjiId === item.id
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-105'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
                "
                @click="setSimulatorKanji(item)"
              >
                <span class="font-sans font-black text-lg">{{ item.kanji }}</span>
                <span class="text-xs font-medium">{{ item.meaning }}</span>
              </button>
            </div>

            <!-- Active Interactive Tester Stage -->
            <div class="border border-neutral-200 rounded-3xl p-6 sm:p-8 bg-neutral-50/50 space-y-6 shadow-xs">
              <!-- Top Header of Active Kanji -->
              <div class="flex items-center justify-between pb-4 border-b border-neutral-200">
                <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-2xl bg-neutral-950 text-white font-sans font-black text-4xl flex items-center justify-center shadow-md">
                    {{ selectedSimulatorItem.kanji }}
                  </div>
                  <div>
                    <h5 class="font-display font-black text-xl text-neutral-950">
                      Kanji {{ selectedSimulatorItem.kanji }}
                    </h5>
                    <p class="text-xs text-neutral-600">
                      Arti Utama: <strong>{{ selectedSimulatorItem.meaning }}</strong>
                    </p>
                  </div>
                </div>

                <span class="text-xs font-mono px-3 py-1 bg-white border border-neutral-200 rounded-xl text-neutral-500">
                  Target Minna no Nihongo N5
                </span>
              </div>

              <!-- Dual Split Stage for Selected Kanji -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
                <!-- SCENARIO KUN'YOMI (ALONE) -->
                <div class="bg-white border-2 border-neutral-900 rounded-2xl p-5 space-y-4 shadow-xs">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-0.5 bg-neutral-100 rounded text-[11px] font-mono font-bold uppercase text-neutral-900">
                      1. Kun'yomi (Sendiri)
                    </span>
                    <span class="text-[11px] text-neutral-400">訓読み</span>
                  </div>

                  <div class="space-y-1">
                    <div class="font-sans font-black text-3xl text-neutral-950 tracking-tight">
                      {{ selectedSimulatorItem.kun.expression }}
                    </div>
                    <div class="font-mono text-sm font-bold text-neutral-800">
                      {{ selectedSimulatorItem.kun.reading }}
                      <span class="text-neutral-400 font-normal">({{ selectedSimulatorItem.kun.romaji }})</span>
                    </div>
                    <div class="text-xs text-neutral-600">
                      Artinya: <strong>{{ selectedSimulatorItem.kun.meaning }}</strong>
                    </div>
                  </div>

                  <div class="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
                    <strong class="text-neutral-950 block mb-0.5">Mengapa pakai Kun'yomi?</strong>
                    {{ selectedSimulatorItem.kun.reason }}.
                  </div>

                  <button
                    type="button"
                    class="w-full py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    @click="emit('play-audio', selectedSimulatorItem.kun.audioText)"
                  >
                    <SpeakerWaveIcon class="w-4 h-4" />
                    <span>Dengarkan Kun'yomi: "{{ selectedSimulatorItem.kun.reading }}"</span>
                  </button>
                </div>

                <!-- SCENARIO ON'YOMI (COMPOUND) -->
                <div class="bg-neutral-950 text-white rounded-2xl p-5 space-y-4 shadow-md">
                  <div class="flex items-center justify-between">
                    <span class="px-2.5 py-0.5 bg-white/20 rounded text-[11px] font-mono font-bold uppercase text-white">
                      2. On'yomi (Majemuk)
                    </span>
                    <span class="text-[11px] text-neutral-400">音読み</span>
                  </div>

                  <div class="space-y-1">
                    <div class="font-sans font-black text-3xl text-white tracking-tight">
                      {{ selectedSimulatorItem.on.expression }}
                    </div>
                    <div class="font-mono text-sm font-bold text-neutral-200">
                      {{ selectedSimulatorItem.on.reading }}
                      <span class="text-neutral-400 font-normal">({{ selectedSimulatorItem.on.romaji }})</span>
                    </div>
                    <div class="text-xs text-neutral-300">
                      Artinya: <strong>{{ selectedSimulatorItem.on.meaning }}</strong>
                    </div>
                  </div>

                  <div class="p-3 bg-white/10 rounded-xl border border-white/20 text-xs text-neutral-300">
                    <strong class="text-white block mb-0.5">Mengapa pakai On'yomi?</strong>
                    {{ selectedSimulatorItem.on.reason }}.
                  </div>

                  <button
                    type="button"
                    class="w-full py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    @click="emit('play-audio', selectedSimulatorItem.on.audioText)"
                  >
                    <SpeakerWaveIcon class="w-4 h-4" />
                    <span>Dengarkan On'yomi: "{{ selectedSimulatorItem.on.reading }}"</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- ============================================================== -->
          <!-- TAB 3: RUMUS EMAS 80/20 & CHEAT SHEET -->
          <!-- ============================================================== -->
          <div v-else-if="activeTab === 'rumus'" class="space-y-6">
            <div class="text-center max-w-lg mx-auto space-y-1.5">
              <span class="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
                Panduan Praktis
              </span>
              <h4 class="font-display text-xl sm:text-2xl font-black text-neutral-950 tracking-tight">
                Aturan 80/20 yang Menyelamatkan Pemula
              </h4>
              <p class="text-xs text-neutral-600">
                Gunakan patokan cepat ini saat membaca teks berbahasa Jepang tanpa perlu panik menghafal puluhan bunyi secara terpisah.
              </p>
            </div>

            <!-- Two Big Golden Rule Boxes -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- RULE 1 -->
              <div class="bg-white border border-neutral-200 rounded-3xl p-6 space-y-4 shadow-2xs">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    1
                  </div>
                  <h5 class="font-display font-extrabold text-base text-neutral-950">
                    Kapan Menggunakan Kun'yomi?
                  </h5>
                </div>

                <ul class="space-y-2.5 text-xs text-neutral-700">
                  <li class="flex items-start gap-2">
                    <CheckCircleIcon class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Kanji Berdiri Sendiri:</strong> Kata benda tunggal tanpa kanji pendamping.
                      <div class="font-mono text-neutral-500 pt-0.5">&bull; 車 (kuruma), 水 (mizu), 本 (hon)</div>
                    </div>
                  </li>

                  <li class="flex items-start gap-2">
                    <CheckCircleIcon class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Diikuti Huruf Hiragana (Okurigana):</strong> Kata kerja atau kata sifat.
                      <div class="font-mono text-neutral-500 pt-0.5">&bull; 食べる (taberu), 行く (iku), 大きい (ookii)</div>
                    </div>
                  </li>

                  <li class="flex items-start gap-2">
                    <CheckCircleIcon class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Nama Keluarga / Orang Jepang:</strong> Sering kali menggunakan bacaan kun.
                      <div class="font-mono text-neutral-500 pt-0.5">&bull; 山田 (Yamada), 田中 (Tanaka)</div>
                    </div>
                  </li>
                </ul>
              </div>

              <!-- RULE 2 -->
              <div class="bg-white border border-neutral-200 rounded-3xl p-6 space-y-4 shadow-2xs">
                <div class="flex items-center gap-3">
                  <div class="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
                    2
                  </div>
                  <h5 class="font-display font-extrabold text-base text-neutral-950">
                    Kapan Menggunakan On'yomi?
                  </h5>
                </div>

                <ul class="space-y-2.5 text-xs text-neutral-700">
                  <li class="flex items-start gap-2">
                    <CheckCircleIcon class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Kata Majemuk (2+ Kanji Gandeng):</strong> Disebut <em>Jukugo</em> tanpa hiragana di tengahnya.
                      <div class="font-mono text-neutral-500 pt-0.5">&bull; 先生 (sen-sei), 大学 (dai-gaku), 教室 (kyou-shitsu)</div>
                    </div>
                  </li>

                  <li class="flex items-start gap-2">
                    <CheckCircleIcon class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Kosakata Teknis, Sekolah & Bisnis:</strong> Istilah resmi serapan Tiongkok.
                      <div class="font-mono text-neutral-500 pt-0.5">&bull; 電話 (den-wa), 会社 (kai-sha), 図書館 (to-sho-kan)</div>
                    </div>
                  </li>

                  <li class="flex items-start gap-2">
                    <CheckCircleIcon class="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Angka Berhitung & Hari Kalender:</strong>
                      <div class="font-mono text-neutral-500 pt-0.5">&bull; 一万 (ichi-man), 日曜日 (nichi-youbi)</div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <!-- Pro Tip Note -->
            <div class="bg-neutral-950 text-white rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
              <div class="space-y-1">
                <div class="flex items-center gap-2">
                  <SparklesIcon class="w-4 h-4 text-white" />
                  <span class="font-mono text-xs uppercase tracking-wider font-bold">Nasihat Terbaik Guru Jepang</span>
                </div>
                <p class="text-xs text-neutral-300 leading-relaxed max-w-xl">
                  <strong>Jangan menghafal tabel suara kosong</strong> seperti "Kanji X bunyinya A, B, C". Sebaliknya, <strong>hafalkan kata utuh dalam kosakata</strong> (misalnya ingat langsung bahwa <em>Nihonjin</em> ditulis 日本人). Insting On dan Kun Anda akan terasah otomatis!
                </p>
              </div>

              <button
                type="button"
                class="px-5 py-2.5 bg-white text-neutral-950 rounded-xl text-xs font-bold transition hover:bg-neutral-200 cursor-pointer shrink-0 self-start sm:self-auto shadow-xs"
                @click="emit('close')"
              >
                Siap Belajar Kanji
              </button>
            </div>
          </div>
        </div>

        <!-- Modal Bottom Footer -->
        <div class="px-6 py-4 border-t border-neutral-200 bg-neutral-50/80 flex items-center justify-between gap-3">
          <div class="flex items-center gap-2 text-xs text-neutral-500">
            <BookOpenIcon class="w-4 h-4" />
            <span>Materi Tambahan Aksara Minna no Nihongo I</span>
          </div>

          <div class="flex items-center gap-2">
            <button
              v-if="activeTab !== 'simulator'"
              type="button"
              class="px-4 py-2 border border-neutral-300 hover:border-neutral-950 bg-white text-neutral-900 rounded-xl text-xs font-bold transition cursor-pointer"
              @click="activeTab = 'simulator'"
            >
              Coba Simulator Suara &rarr;
            </button>

            <button
              type="button"
              class="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition cursor-pointer shadow-xs"
              @click="emit('close')"
            >
              Tutup Panduan
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
