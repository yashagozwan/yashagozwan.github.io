<script setup lang="ts">
import { ref } from 'vue'
import {
  SpeakerWaveIcon,
  LightBulbIcon,
  SparklesIcon,
  BookOpenIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowsRightLeftIcon,
  AcademicCapIcon,
  ClockIcon,
  BuildingOfficeIcon,
  CubeIcon,
  IdentificationIcon,
  PaperAirplaneIcon,
} from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'gain-xp', amount: number): void
  (e: 'go-to-lesson', lessonNum: number): void
  (e: 'navigate-stage', stage: string): void
}>()

// Active sub-section: 'komparasi' | 'simulator' | 'rumus' | 'katalog'
const activeSubTab = ref<'komparasi' | 'simulator' | 'rumus' | 'katalog'>('komparasi')

// Interactive Simulator State
interface SimulatorKanji {
  id: string
  kanji: string
  meaning: string
  chapter: number
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
    chapter: 4,
    kun: {
      expression: '水',
      reading: 'みず',
      romaji: 'mizu',
      meaning: 'Air minum biasa',
      reason: 'Kanji berdiri sendirian tanpa kanji pendamping',
      audioText: 'みず',
    },
    on: {
      expression: '水曜日',
      reading: 'すいようび',
      romaji: 'sui-youbi',
      meaning: 'Hari Rabu',
      reason: 'Bergabung dengan kanji 曜日 (kata majemuk)',
      audioText: 'すいようび',
    },
  },
  {
    id: 'hito',
    kanji: '人',
    meaning: 'Orang / Warga',
    chapter: 1,
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
    chapter: 1,
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
    meaning: 'Mobil / Roda',
    chapter: 2,
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
    chapter: 1,
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
    chapter: 1,
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
    id: 'sei',
    kanji: '生',
    meaning: 'Lahir / Hidup',
    chapter: 1,
    kun: {
      expression: '生きる',
      reading: 'いきる',
      romaji: 'iki-ru',
      meaning: 'Hidup / Bernyawa',
      reason: 'Diikuti ekor huruf Hiragana きる',
      audioText: 'いきる',
    },
    on: {
      expression: '先生',
      reading: 'せんせい',
      romaji: 'sen-sei',
      meaning: 'Guru / Pengajar',
      reason: 'Majemuk dengan kanji terdahulu 先',
      audioText: 'せんせい',
    },
  },
  {
    id: 'dai',
    kanji: '大',
    meaning: 'Besar',
    chapter: 1,
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
  {
    id: 'toki',
    kanji: '時',
    meaning: 'Waktu / Jam',
    chapter: 4,
    kun: {
      expression: '時',
      reading: 'とき',
      romaji: 'toki',
      meaning: 'Waktu / Saat itu',
      reason: 'Berdiri sendiri sebagai kata benda',
      audioText: 'とき',
    },
    on: {
      expression: '四時',
      reading: 'よじ',
      romaji: 'yo-ji',
      meaning: 'Jam 4 tepat',
      reason: 'Menjadi satuan jam berhitung (On\'yomi)',
      audioText: 'よじ',
    },
  },
  {
    id: 'go',
    kanji: '語',
    meaning: 'Bahasa / Kata',
    chapter: 2,
    kun: {
      expression: '語る',
      reading: 'かたる',
      romaji: 'kata-ru',
      meaning: 'Menceritakan / Berbicara',
      reason: 'Diikuti ekor huruf Hiragana る',
      audioText: 'かたる',
    },
    on: {
      expression: '英語',
      reading: 'えいご',
      romaji: 'Ei-go',
      meaning: 'Bahasa Inggris',
      reason: 'Majemuk dengan kanji 英',
      audioText: 'えいご',
    },
  },
]

const selectedSimId = ref('mizu')
const activeSimItem = ref<SimulatorKanji>(SIMULATOR_KANJI_LIST[0])

function setSimulatorKanji(item: SimulatorKanji) {
  selectedSimId.value = item.id
  activeSimItem.value = item
}

// Chapter Kanji Summary Data
const CHAPTER_OVERVIEWS = [
  {
    chapter: 1,
    title: 'Bab 1: Identitas & Profesi',
    icon: IdentificationIcon,
    count: 8,
    kanjis: ['私', '人', '先', '生', '学', '日', '本', '大'],
    desc: 'Kanji pengenal diri, warga negara, guru, murid, dan universitas.',
  },
  {
    chapter: 2,
    title: 'Bab 2: Benda & Kepemilikan',
    icon: CubeIcon,
    count: 8,
    kanjis: ['何', '語', '車', '名', '前', '紙', '友', '電'],
    desc: 'Kanji benda sehari-hari, bahasa, nama depan, surat, teman, dan listrik.',
  },
  {
    chapter: 3,
    title: 'Bab 3: Lokasi & Uang',
    icon: BuildingOfficeIcon,
    count: 9,
    kanjis: ['百', '千', '万', '円', '国', '店', '階', '室', '所'],
    desc: 'Kanji bilangan belanja, mata uang Yen, negara, toko, dan ruang kelas.',
  },
  {
    chapter: 4,
    title: 'Bab 4: Waktu & Kalender',
    icon: ClockIcon,
    count: 9,
    kanjis: ['時', '分', '半', '月', '火', '水', '木', '金', '土'],
    desc: 'Kanji satuan jam, menit, setengah, dan 7 elemen nama hari dalam sepekan.',
  },
  {
    chapter: 5,
    title: 'Bab 5: Transportasi & Perjalanan',
    icon: PaperAirplaneIcon,
    count: 9,
    kanjis: ['行', '来', '帰', '車', '電', '駅', '校', '歩', '週'],
    desc: 'Kanji kata kerja pergerakan, kendaraan listrik, stasiun kereta, sekolah, jalan kaki, dan pekan.',
  },
]
</script>

<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <!-- ============================================================== -->
    <!-- 1. FOCUSED SCREEN HEADER CARD -->
    <!-- ============================================================== -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <BookOpenIcon class="w-4 h-4 text-neutral-900" />
          <span>Fondasi 3 &bull; Aksara Jepang N5</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Panduan Huruf Kanji (漢字): Memahami On'yomi & Kun'yomi
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-2xl leading-relaxed">
          Satu huruf Kanji memiliki dua sudut pandang cara baca: <strong>On'yomi (bunyi serapan Tiongkok)</strong> dan <strong>Kun'yomi (makna asli Jepang)</strong>. Kuasai rumus 80/20 dan coba simulator suaranya di layar fokus ini.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <span class="px-3.5 py-1.5 bg-neutral-950 text-white rounded-xl text-xs font-mono font-bold shadow-xs">
          Fondasi Aksara Wajib
        </span>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- 2. SECTION SUB-TABS (HORIZONTAL CLEAN NAVIGATION) -->
    <!-- ============================================================== -->
    <div class="flex items-center gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="
          activeSubTab === 'komparasi'
            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
            : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
        "
        @click="activeSubTab = 'komparasi'"
      >
        <ArrowsRightLeftIcon class="w-3.5 h-3.5" />
        <span>1. Komparasi Visual (On vs Kun)</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="
          activeSubTab === 'simulator'
            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
            : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
        "
        @click="activeSubTab = 'simulator'"
      >
        <SpeakerWaveIcon class="w-3.5 h-3.5" />
        <span>2. Simulator Suara Interaktif</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="
          activeSubTab === 'rumus'
            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
            : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
        "
        @click="activeSubTab = 'rumus'"
      >
        <LightBulbIcon class="w-3.5 h-3.5" />
        <span>3. Rumus Emas 80/20</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="
          activeSubTab === 'katalog'
            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
            : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
        "
        @click="activeSubTab = 'katalog'"
      >
        <AcademicCapIcon class="w-3.5 h-3.5" />
        <span>4. Katalog Kanji Bab 1 - 4</span>
      </button>
    </div>

    <!-- ============================================================== -->
    <!-- 3. SUB-TAB CONTENT -->
    <!-- ============================================================== -->

    <!-- SUB-TAB 1: ASAL USUL & KOMPARASI VISUAL -->
    <div v-if="activeSubTab === 'komparasi'" class="space-y-6">
      <div class="text-center max-w-2xl mx-auto space-y-2">
        <span class="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Konsep Fundamental
        </span>
        <h3 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Mengapa 1 Karakter Kanji Memiliki 2 Suara Baca?
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed">
          Pada sekitar abad ke-5, Jepang belum memiliki aksara tulis. Mereka kemudian mengadopsi huruf dari Tiongkok (Kanji). Sambil menirukan ucapan aslinya dari Tiongkok (On'yomi), mereka juga mencocokkannya dengan kosakata lisan purba bahasa Jepang (Kun'yomi).
        </p>
      </div>

      <!-- Dual Side-by-Side Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
        <!-- KUN'YOMI CARD -->
        <div class="bg-white border-2 border-neutral-900 rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-sm">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 bg-neutral-100 text-neutral-950 rounded-xl font-mono text-xs font-bold uppercase tracking-wider">
                Bahasa Asli Jepang
              </span>
              <span class="font-mono text-xs text-neutral-400">訓読み &bull; Makna</span>
            </div>

            <div>
              <h4 class="font-display text-3xl font-black text-neutral-950">
                Kun'yomi (訓読み)
              </h4>
              <p class="text-xs sm:text-sm text-neutral-600 mt-1">
                Cara baca menggunakan kosakata asli bangsa Jepang (<em>Yamato Kotoba</em>).
              </p>
            </div>

            <div class="space-y-3 pt-2 text-xs sm:text-sm">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <strong class="text-neutral-950">Penulisan Kamus:</strong>
                  <p class="text-neutral-600 text-xs">Selalu ditulis dengan huruf <strong>Hiragana</strong> (misalnya <code class="font-mono bg-neutral-100 px-1 py-0.5 rounded">みず</code>, <code class="font-mono bg-neutral-100 px-1 py-0.5 rounded">ひと</code>, <code class="font-mono bg-neutral-100 px-1 py-0.5 rounded">くるま</code>).</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-neutral-100 flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <strong class="text-neutral-950">Situasi Penggunaan Utama:</strong>
                  <p class="text-neutral-600 text-xs">Digunakan ketika kanji <strong>berdiri sendirian</strong>, atau memiliki buntut huruf hiragana pembantu (seperti kata kerja <code class="font-mono bg-neutral-100 px-1 rounded">食べる</code> atau kata sifat <code class="font-mono bg-neutral-100 px-1 rounded">大きい</code>).</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-1">
            <span class="text-[10px] font-mono text-neutral-400 uppercase font-bold tracking-wider">Contoh Nyata Bab Minna no Nihongo:</span>
            <div class="flex items-center justify-between font-sans font-bold text-sm text-neutral-950">
              <span>水 &rarr; dibaca <em>みず (mizu)</em></span>
              <span class="text-xs font-normal text-neutral-500">= Air</span>
            </div>
          </div>
        </div>

        <!-- ON'YOMI CARD -->
        <div class="bg-neutral-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col justify-between gap-6 shadow-xl">
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <span class="px-3 py-1 bg-white/10 text-white rounded-xl font-mono text-xs font-bold uppercase tracking-wider">
                Serapan Tiongkok
              </span>
              <span class="font-mono text-xs text-neutral-400">音読み &bull; Suara</span>
            </div>

            <div>
              <h4 class="font-display text-3xl font-black text-white">
                On'yomi (音読み)
              </h4>
              <p class="text-xs sm:text-sm text-neutral-300 mt-1">
                Cara baca meniru lafal Tiongkok kuno dengan penyesuaian aksen lidah Jepang.
              </p>
            </div>

            <div class="space-y-3 pt-2 text-xs sm:text-sm">
              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                  1
                </div>
                <div>
                  <strong class="text-white">Penulisan Kamus:</strong>
                  <p class="text-neutral-300 text-xs">Selalu ditulis dengan huruf <strong>Katakana</strong> (misalnya <code class="font-mono bg-white/10 px-1 py-0.5 rounded text-white">スイ</code>, <code class="font-mono bg-white/10 px-1 py-0.5 rounded text-white">ジン</code>, <code class="font-mono bg-white/10 px-1 py-0.5 rounded text-white">シャ</code>).</p>
                </div>
              </div>

              <div class="flex items-start gap-3">
                <div class="w-6 h-6 rounded-full bg-white/20 text-white flex items-center justify-center shrink-0 font-mono text-xs font-bold mt-0.5">
                  2
                </div>
                <div>
                  <strong class="text-white">Situasi Penggunaan Utama:</strong>
                  <p class="text-neutral-300 text-xs">Digunakan ketika kanji <strong>bergandengan dengan kanji lain</strong> membentuk kata majemuk (<em>Jukugo</em>) tanpa hiragana di tengahnya (seperti <code class="font-mono bg-white/10 px-1 rounded text-white">水曜日</code>, <code class="font-mono bg-white/10 px-1 rounded text-white">日本人</code>, <code class="font-mono bg-white/10 px-1 rounded text-white">大学</code>).</p>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 bg-white/10 border border-white/20 rounded-2xl space-y-1">
            <span class="text-[10px] font-mono text-neutral-300 uppercase font-bold tracking-wider">Contoh Nyata Bab Minna no Nihongo:</span>
            <div class="flex items-center justify-between font-sans font-bold text-sm text-white">
              <span>水曜日 &rarr; dibaca <em>すいようび (suiyoubi)</em></span>
              <span class="text-xs font-normal text-neutral-300">= Hari Rabu</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Real Life Analogy Box -->
      <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 space-y-4">
        <div class="flex items-center gap-2">
          <LightBulbIcon class="w-5 h-5 text-neutral-900" />
          <h4 class="font-display font-extrabold text-base sm:text-lg text-neutral-950">
            Analogi Sederhana dalam Bahasa Indonesia
          </h4>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-neutral-700">
          <div class="p-4 bg-white border border-neutral-200 rounded-2xl space-y-2">
            <strong class="text-neutral-950 font-bold block">1. Simbol Simbol Matematika "&"</strong>
            <p class="text-neutral-600 text-xs leading-relaxed">
              Jika dibaca dalam bahasa asli kita: <strong>"dan"</strong> (ini konsep <em>Kun'yomi</em>).
              Jika dibaca dalam istilah asing serapan: <strong>"et" / "and"</strong> (ini konsep <em>On'yomi</em>).
            </p>
          </div>

          <div class="p-4 bg-white border border-neutral-200 rounded-2xl space-y-2">
            <strong class="text-neutral-950 font-bold block">2. Kata "Air" vs "Hidro / Aqua"</strong>
            <p class="text-neutral-600 text-xs leading-relaxed">
              Saat berdiri sendiri, kita meminum <strong>air</strong>. Tetapi ketika digabung menjadi istilah ilmiah serapan, kita menyebut <strong>hidrologi</strong> atau <strong>akuarium</strong>.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- SUB-TAB 2: SIMULATOR SUARA INTERAKTIF -->
    <div v-else-if="activeSubTab === 'simulator'" class="space-y-6">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <span class="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Audio Playground Interaktif
        </span>
        <h3 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Coba Langsung Huruf Kanji N5
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600">
          Klik tombol huruf kanji di bawah untuk melihat dan mendengarkan pelafalan suaranya saat berdiri sendiri vs saat bergabung.
        </p>
      </div>

      <!-- Kanji Horizontal Selector -->
      <div class="flex items-center justify-center gap-2 flex-wrap">
        <button
          v-for="item in SIMULATOR_KANJI_LIST"
          :key="item.id"
          type="button"
          class="px-4 py-2.5 rounded-2xl border text-center transition-all cursor-pointer flex items-center gap-2"
          :class="
            selectedSimId === item.id
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-105'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'
          "
          @click="setSimulatorKanji(item)"
        >
          <span class="font-sans font-black text-lg">{{ item.kanji }}</span>
          <span class="text-xs font-medium">{{ item.meaning }}</span>
          <span class="text-[10px] font-mono px-1 rounded" :class="selectedSimId === item.id ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'">
            Bab {{ item.chapter }}
          </span>
        </button>
      </div>

      <!-- Simulator Stage -->
      <div class="border border-neutral-200 rounded-3xl p-6 sm:p-8 bg-neutral-50/50 space-y-6 shadow-xs">
        <div class="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div class="flex items-center gap-4">
            <div class="w-16 h-16 rounded-2xl bg-neutral-950 text-white font-sans font-black text-4xl flex items-center justify-center shadow-md">
              {{ activeSimItem.kanji }}
            </div>
            <div>
              <h4 class="font-display font-black text-2xl text-neutral-950">
                Kanji {{ activeSimItem.kanji }}
              </h4>
              <p class="text-xs text-neutral-600">
                Arti: <strong>{{ activeSimItem.meaning }}</strong> &bull; Muncul di <strong>Minna no Nihongo Bab {{ activeSimItem.chapter }}</strong>
              </p>
            </div>
          </div>

          <span class="text-xs font-mono px-3 py-1 bg-white border border-neutral-200 rounded-xl text-neutral-500">
            JLPT N5
          </span>
        </div>

        <!-- Dual Card Scenarios -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- KUN'YOMI SCENARIO -->
          <div class="bg-white border-2 border-neutral-900 rounded-2xl p-6 space-y-4 shadow-xs">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 bg-neutral-100 rounded text-xs font-mono font-bold uppercase text-neutral-900">
                1. Kun'yomi (Sendiri)
              </span>
              <span class="text-xs font-mono text-neutral-400">訓読み</span>
            </div>

            <div class="space-y-1">
              <div class="font-sans font-black text-4xl text-neutral-950 tracking-tight">
                {{ activeSimItem.kun.expression }}
              </div>
              <div class="font-mono text-base font-bold text-neutral-800">
                {{ activeSimItem.kun.reading }}
                <span class="text-neutral-400 font-normal">({{ activeSimItem.kun.romaji }})</span>
              </div>
              <div class="text-xs text-neutral-600">
                Artinya: <strong>{{ activeSimItem.kun.meaning }}</strong>
              </div>
            </div>

            <div class="p-3 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600">
              <strong class="text-neutral-950 block mb-0.5">Mengapa pakai Kun'yomi?</strong>
              {{ activeSimItem.kun.reason }}.
            </div>

            <button
              type="button"
              class="w-full py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              @click="emit('play-audio', activeSimItem.kun.audioText)"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
              <span>Dengarkan Suara: "{{ activeSimItem.kun.reading }}"</span>
            </button>
          </div>

          <!-- ON'YOMI SCENARIO -->
          <div class="bg-neutral-950 text-white rounded-2xl p-6 space-y-4 shadow-md">
            <div class="flex items-center justify-between">
              <span class="px-2.5 py-0.5 bg-white/20 rounded text-xs font-mono font-bold uppercase text-white">
                2. On'yomi (Majemuk)
              </span>
              <span class="text-xs font-mono text-neutral-400">音読み</span>
            </div>

            <div class="space-y-1">
              <div class="font-sans font-black text-4xl text-white tracking-tight">
                {{ activeSimItem.on.expression }}
              </div>
              <div class="font-mono text-base font-bold text-neutral-200">
                {{ activeSimItem.on.reading }}
                <span class="text-neutral-400 font-normal">({{ activeSimItem.on.romaji }})</span>
              </div>
              <div class="text-xs text-neutral-300">
                Artinya: <strong>{{ activeSimItem.on.meaning }}</strong>
              </div>
            </div>

            <div class="p-3 bg-white/10 rounded-xl border border-white/20 text-xs text-neutral-300">
              <strong class="text-white block mb-0.5">Mengapa pakai On'yomi?</strong>
              {{ activeSimItem.on.reason }}.
            </div>

            <button
              type="button"
              class="w-full py-3 bg-white hover:bg-neutral-200 text-neutral-950 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
              @click="emit('play-audio', activeSimItem.on.audioText)"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
              <span>Dengarkan Suara: "{{ activeSimItem.on.reading }}"</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- SUB-TAB 3: RUMUS EMAS 80/20 -->
    <div v-else-if="activeSubTab === 'rumus'" class="space-y-6">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <span class="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Pedoman Praktis Pemula
        </span>
        <h3 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Aturan 80/20 yang Menyelamatkan Anda
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600">
          Saat membaca teks Jepang, jangan bingung harus memilih bacaan mana. Cukup ingat 2 patokan utama ini:
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- ATURAN KUN -->
        <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
              1
            </div>
            <h4 class="font-display font-extrabold text-lg text-neutral-950">
              Kapan Memakai Kun'yomi?
            </h4>
          </div>

          <ul class="space-y-3 text-xs sm:text-sm text-neutral-700">
            <li class="flex items-start gap-2.5">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Kanji Tunggal Berdiri Sendiri:</strong> Kata benda yang tidak menempel dengan kanji lain.
                <div class="font-mono text-neutral-500 pt-0.5">&bull; 車 (kuruma), 水 (mizu), 本 (hon), 日 (hi)</div>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Diikuti Huruf Hiragana (Okurigana):</strong> Kata kerja atau kata sifat berakhiran hiragana.
                <div class="font-mono text-neutral-500 pt-0.5">&bull; 食べる (taberu), 行く (iku), 大きい (ookii), 学ぶ (manabu)</div>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Nama Orang & Nama Tempat Asli:</strong> Mayoritas nama marga Jepang memakai Kun'yomi.
                <div class="font-mono text-neutral-500 pt-0.5">&bull; 山田 (Yamada), 田中 (Tanaka), 川口 (Kawaguchi)</div>
              </div>
            </li>
          </ul>
        </div>

        <!-- ATURAN ON -->
        <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xs">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono font-bold text-sm flex items-center justify-center shrink-0">
              2
            </div>
            <h4 class="font-display font-extrabold text-lg text-neutral-950">
              Kapan Memakai On'yomi?
            </h4>
          </div>

          <ul class="space-y-3 text-xs sm:text-sm text-neutral-700">
            <li class="flex items-start gap-2.5">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Kata Majemuk (2+ Kanji Berjejeran):</strong> Disebut <em>Jukugo</em> tanpa hiragana di tengahnya.
                <div class="font-mono text-neutral-500 pt-0.5">&bull; 先生 (sen-sei), 大学 (dai-gaku), 教室 (kyou-shitsu), 電話 (den-wa)</div>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Istilah Teknis, Pendidikan & Bisnis:</strong> Serapan istilah resmi Tiongkok.
                <div class="font-mono text-neutral-500 pt-0.5">&bull; 会社 (kai-sha), 図書館 (to-sho-kan), 事務所 (ji-mu-sho)</div>
              </div>
            </li>

            <li class="flex items-start gap-2.5">
              <CheckCircleIcon class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Satuan Angka & Kalender:</strong> Bilangan hitungan dan nama hari dalam sepekan.
                <div class="font-mono text-neutral-500 pt-0.5">&bull; 一万 (ichi-man), 三千 (san-zen), 水曜日 (sui-youbi)</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Golden Advice Banner -->
      <div class="bg-neutral-950 text-white rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div class="space-y-1.5">
          <div class="flex items-center gap-2">
            <SparklesIcon class="w-5 h-5 text-white" />
            <span class="font-mono text-xs uppercase tracking-wider font-bold">Nasihat Guru Bahasa Jepang</span>
          </div>
          <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-2xl">
            <strong>Jangan menghafal tabel suara kosong</strong> seperti "Kanji X bunyinya A, B, C, D". Sebaliknya, <strong>hafalkan kata utuh dalam kosakata</strong> (misalnya ingat langsung bahwa <em>orang Jepang</em> ditulis 日本人). Dengan cara ini, insting On dan Kun Anda akan terbangun secara alami!
          </p>
        </div>

        <button
          type="button"
          class="px-5 py-3 bg-white text-neutral-950 rounded-xl text-xs font-bold transition hover:bg-neutral-200 cursor-pointer shrink-0 self-start md:self-auto shadow-xs"
          @click="emit('go-to-lesson', 1)"
        >
          Mulai Belajar Bab 1 &rarr;
        </button>
      </div>
    </div>

    <!-- SUB-TAB 4: KATALOG KANJI N5 PER BAB -->
    <div v-else-if="activeSubTab === 'katalog'" class="space-y-6">
      <div class="text-center max-w-xl mx-auto space-y-2">
        <span class="px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
          Kurikulum Terpadu
        </span>
        <h3 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Peta Kanji Wajib Hafal per Bab
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600">
          Daftar karakter Kanji yang dipelajari di setiap Bab Minna no Nihongo. Anda bisa langsung menuju bab terkait untuk melatih hafalan dan kuis interaktifnya.
        </p>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="item in CHAPTER_OVERVIEWS"
          :key="item.chapter"
          class="border border-neutral-200 rounded-3xl p-6 bg-white space-y-4 shadow-2xs hover:shadow transition"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <component :is="item.icon" class="w-5 h-5 text-neutral-950" />
              <h4 class="font-display font-extrabold text-base text-neutral-950">
                {{ item.title }}
              </h4>
            </div>
            <span class="px-2.5 py-1 bg-neutral-100 rounded-xl font-mono text-xs font-bold text-neutral-700">
              {{ item.count }} Kanji
            </span>
          </div>

          <p class="text-xs text-neutral-600 leading-relaxed">
            {{ item.desc }}
          </p>

          <!-- Kanji Character Pills -->
          <div class="flex items-center gap-1.5 flex-wrap pt-1">
            <span
              v-for="k in item.kanjis"
              :key="k"
              class="w-9 h-9 rounded-xl bg-neutral-950 text-white font-sans font-black text-lg flex items-center justify-center shadow-2xs"
            >
              {{ k }}
            </span>
          </div>

          <button
            type="button"
            class="w-full mt-2 py-2.5 border border-neutral-300 hover:border-neutral-950 bg-neutral-50 hover:bg-neutral-100 rounded-xl text-xs font-bold text-neutral-900 transition flex items-center justify-center gap-2 cursor-pointer"
            @click="emit('go-to-lesson', item.chapter)"
          >
            <span>Buka Modul Kanji Bab {{ item.chapter }}</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- 4. BOTTOM STEP NAVIGATION BRIDGE -->
    <!-- ============================================================== -->
    <div class="pt-6 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
      <button
        type="button"
        class="w-full sm:w-auto px-5 py-2.5 border border-neutral-300 hover:border-neutral-950 rounded-xl text-xs font-bold text-neutral-800 transition flex items-center justify-center gap-2 cursor-pointer"
        @click="emit('navigate-stage', 'angka')"
      >
        <ArrowLeftIcon class="w-4 h-4" />
        <span>Kembali ke Angka N5</span>
      </button>

      <button
        type="button"
        class="w-full sm:w-auto px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
        @click="emit('go-to-lesson', 1)"
      >
        <span>Lanjut ke Bab 1: Perkenalan Diri</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
