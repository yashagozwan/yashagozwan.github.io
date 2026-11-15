<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SpeakerWaveIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  MapPinIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
}>()

// Active Simulator Tab: 'facility' (Lokasi Fasilitas) | 'shopping' (Belanja & Harga)
const activeTab = ref<'facility' | 'shopping'>('facility')

// -------------------------------------------------------------
// TAB 1: FACILITY & LOCATION SIMULATOR
// -------------------------------------------------------------
const facilityForm = ref({
  facilityIndex: 0,
  questionPoliteness: 'biasa' as 'biasa' | 'sopan' | 'tanya-lantai',
  locationType: 'tunjuk-biasa' as 'tunjuk-biasa' | 'tunjuk-sopan' | 'lantai',
  zone: 'asoko' as 'koko' | 'soko' | 'asoko',
  floor: '2-kai' as '1-kai' | '2-kai' | '3-kai' | '4-kai' | 'chika',
})

const facilities = [
  { japanese: 'トイレ', romaji: 'toire', indonesian: 'toilet' },
  { japanese: 'じむしょ', romaji: 'jimusho', indonesian: 'kantor tata usaha' },
  { japanese: 'しょくどう', romaji: 'shokudou', indonesian: 'kantin' },
  { japanese: 'かいぎしつ', romaji: 'kaigishitsu', indonesian: 'ruang rapat' },
  { japanese: 'うけつけ', romaji: 'uketsuke', indonesian: 'resepsionis' },
  { japanese: 'エレベーター', romaji: 'erebeetaa', indonesian: 'lift' },
  { japanese: 'エスカレーター', romaji: 'esukareetaa', indonesian: 'eskalator' },
  { japanese: 'じどうはんばいき', romaji: 'jidouhanbaiki', indonesian: 'mesin penjual otomatis' },
]

const generatedFacilityDialog = computed(() => {
  const f = facilityForm.value
  const fac = facilities[f.facilityIndex] || facilities[0]!

  let questionJp = ''
  let questionRo = ''
  let questionId = ''

  if (f.questionPoliteness === 'biasa') {
    questionJp = `${fac.japanese}は どこですか。`
    questionRo = `${fac.romaji} wa doko desu ka.`
    questionId = `${fac.indonesian.charAt(0).toUpperCase() + fac.indonesian.slice(1)} ada di mana?`
  } else if (f.questionPoliteness === 'sopan') {
    questionJp = `${fac.japanese}は どちらですか。`
    questionRo = `${fac.romaji} wa dochira desu ka.`
    questionId = `${fac.indonesian.charAt(0).toUpperCase() + fac.indonesian.slice(1)} ada di sebelah mana? (sopan)`
  } else {
    questionJp = `${fac.japanese}は なんがいですか。`
    questionRo = `${fac.romaji} wa nangai desu ka.`
    questionId = `${fac.indonesian.charAt(0).toUpperCase() + fac.indonesian.slice(1)} ada di lantai berapa?`
  }

  let answerJp = ''
  let answerRo = ''
  let answerId = ''

  if (f.locationType === 'tunjuk-biasa') {
    if (f.zone === 'koko') {
      answerJp = 'ここです。'
      answerRo = 'Koko desu.'
      answerId = 'Ada di sini (dekat saya).'
    } else if (f.zone === 'soko') {
      answerJp = 'そこです。'
      answerRo = 'Soko desu.'
      answerId = 'Ada di situ (dekat Anda).'
    } else {
      answerJp = 'あそこです。'
      answerRo = 'Asoko desu.'
      answerId = 'Ada di sana (jauh dari kita berdua).'
    }
  } else if (f.locationType === 'tunjuk-sopan') {
    if (f.zone === 'koko') {
      answerJp = 'こちらで ございます。'
      answerRo = 'Kochira de gozaimasu.'
      answerId = 'Ada di sebelah sini (sangat sopan).'
    } else if (f.zone === 'soko') {
      answerJp = 'そちらで ございます。'
      answerRo = 'Sochira de gozaimasu.'
      answerId = 'Ada di sebelah situ (sangat sopan).'
    } else {
      answerJp = 'あちらで ございます。'
      answerRo = 'Achira de gozaimasu.'
      answerId = 'Ada di sebelah sana (sangat sopan).'
    }
  } else {
    if (f.floor === '1-kai') {
      answerJp = '１かいです。'
      answerRo = 'Ikkai desu.'
      answerId = 'Ada di lantai 1.'
    } else if (f.floor === '2-kai') {
      answerJp = '２かいです。'
      answerRo = 'Ni-kai desu.'
      answerId = 'Ada di lantai 2.'
    } else if (f.floor === '3-kai') {
      answerJp = '３かいです。'
      answerRo = 'San-kai desu.'
      answerId = 'Ada di lantai 3.'
    } else if (f.floor === '4-kai') {
      answerJp = '４かいです。'
      answerRo = 'Yon-kai desu.'
      answerId = 'Ada di lantai 4.'
    } else {
      answerJp = 'ちか１かいです。'
      answerRo = 'Chika ikkai desu.'
      answerId = 'Ada di lantai bawah tanah 1 (Basement 1).'
    }
  }

  const fullJp = `A: すみません。${questionJp}\nB: ${answerJp}`
  const fullRo = `A: Sumimasen. ${questionRo}\nB: ${answerRo}`
  const fullId = `A: Permisi. ${questionId}\nB: ${answerId}`

  return {
    fullJp,
    fullRo,
    fullId,
    audioText: `${questionJp}。${answerJp}`,
  }
})

// -------------------------------------------------------------
// TAB 2: SHOPPING, ORIGIN & PRICE SIMULATOR
// -------------------------------------------------------------
const shoppingForm = ref({
  productIndex: 0,
  countryIndex: 1, // default Italia
  pricePreset: 8000,
  scenario: 'full' as 'tanya-asal' | 'tanya-harga' | 'full',
})

const products = [
  { japanese: 'くつ', romaji: 'kutsu', indonesian: 'sepatu' },
  { japanese: 'かばん', romaji: 'kaban', indonesian: 'tas' },
  { japanese: 'ネクタイ', romaji: 'nekutai', indonesian: 'dasi' },
  { japanese: 'ワイン', romaji: 'wain', indonesian: 'wine' },
  { japanese: 'カメラ', romaji: 'kamera', indonesian: 'kamera' },
  { japanese: 'シャツ', romaji: 'shatsu', indonesian: 'kemeja' },
]

const countries = [
  { japanese: 'にほん', romaji: 'Nihon', indonesian: 'Jepang' },
  { japanese: 'イタリア', romaji: 'Itaria', indonesian: 'Italia' },
  { japanese: 'フランス', romaji: 'Furansu', indonesian: 'Prancis' },
  { japanese: 'インドネシア', romaji: 'Indoneshia', indonesian: 'Indonesia' },
  { japanese: 'アメリカ', romaji: 'Amerika', indonesian: 'Amerika Serikat' },
]

const pricePresets = [
  { amount: 300, japanese: 'さんびゃくえん', romaji: 'sanbyaku en' },
  { amount: 600, japanese: 'ろっぴゃくえん', romaji: 'roppyaku en' },
  { amount: 800, japanese: 'はっぴゃくえん', romaji: 'happyaku en' },
  { amount: 1500, japanese: 'せんごひゃくえん', romaji: 'sen gohyaku en' },
  { amount: 3000, japanese: 'さんぜんえん', romaji: 'sanzen en' },
  { amount: 8000, japanese: 'はっせんえん', romaji: 'hassen en' },
  { amount: 12000, japanese: 'いちまんにせんえん', romaji: 'ichiman nisen en' },
  { amount: 15000, japanese: 'いちまんごせんえん', romaji: 'ichiman gosen en' },
]

const generatedShoppingDialog = computed(() => {
  const s = shoppingForm.value
  const prod = products[s.productIndex] || products[0]!
  const count = countries[s.countryIndex] || countries[0]!
  const priceItem = pricePresets.find((p) => p.amount === s.pricePreset) || pricePresets[5]!

  let jp = ''
  let ro = ''
  let id = ''

  if (s.scenario === 'tanya-asal') {
    jp = `A: すみません。これは どこの ${prod.japanese}ですか。\nB: ${count.japanese}の ${prod.japanese}で ございます。\nA: そうですか。`
    ro = `A: Sumimasen. Kore wa doko no ${prod.romaji} desu ka.\nB: ${count.romaji} no ${prod.romaji} de gozaimasu.\nA: Sou desu ka.`
    id = `A: Permisi. Ini ${prod.indonesian} buatan mana?\nB: Ini ${prod.indonesian} buatan ${count.indonesian} (sopan).\nA: Oh, begitu ya.`
  } else if (s.scenario === 'tanya-harga') {
    jp = `A: すみません。この ${prod.japanese}は いくらですか。\nB: ${priceItem.amount.toLocaleString()}えんです。（${priceItem.japanese}）\nA: そうですか。ありがとうございます。`
    ro = `A: Sumimasen. Kono ${prod.romaji} wa ikura desu ka.\nB: ${priceItem.romaji} desu.\nA: Sou desu ka. Arigatou gozaimasu.`
    id = `A: Permisi. ${prod.indonesian.charAt(0).toUpperCase() + prod.indonesian.slice(1)} ini berapa harganya?\nB: Harganya ¥${priceItem.amount.toLocaleString()} (${priceItem.amount} Yen).\nA: Oh, begitu. Terima kasih.`
  } else {
    jp = `A: すみません。この ${prod.japanese}は いくらですか。\nB: ${priceItem.amount.toLocaleString()}えんで ございます。\nA: じゃ、これを ください。\nB: ありがとうございます。`
    ro = `A: Sumimasen. Kono ${prod.romaji} wa ikura desu ka.\nB: ${priceItem.romaji} de gozaimasu.\nA: Ja, kore o kudasai.\nB: Arigatou gozaimasu.`
    id = `A: Permisi. ${prod.indonesian.charAt(0).toUpperCase() + prod.indonesian.slice(1)} ini berapa harganya?\nB: Harganya ¥${priceItem.amount.toLocaleString()} (sopan).\nA: Kalau begitu, tolong berikan yang ini (saya beli yang ini).\nB: Terima kasih banyak.`
  }

  return {
    fullJp: jp,
    fullRo: ro,
    fullId: id,
    audioText: jp.replace(/A: |B: /g, ''),
  }
})

// Copy notification state
const copied = ref(false)
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 2000)
}
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <SparklesIcon class="w-4 h-4 text-amber-500" />
          <span>Simulator Generator Bab 3</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950">
          Simulator Lokasi Fasilitas &amp; Transaksi Belanja
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-2xl">
          Eksplorasi pembentukan kalimat tanya-jawab lokasi ruangan gedung, tingkat kesopanan arah, asal negara barang, dan transaksi pembelian dengan harga Yen.
        </p>
      </div>

      <!-- Tab Switcher -->
      <div class="flex items-center p-1 bg-white border border-neutral-200 rounded-xl shadow-xs self-start sm:self-center shrink-0 gap-1">
        <button
          type="button"
          class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="activeTab === 'facility' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'facility'"
        >
          <MapPinIcon class="w-3.5 h-3.5" />
          <span>Lokasi Fasilitas</span>
        </button>

        <button
          type="button"
          class="px-3.5 py-2 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="activeTab === 'shopping' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="activeTab = 'shopping'"
        >
          <ShoppingBagIcon class="w-3.5 h-3.5" />
          <span>Belanja &amp; Harga</span>
        </button>
      </div>
    </div>

    <!-- TAB 1: FACILITY LOCATION SIMULATOR -->
    <div v-if="activeTab === 'facility'" class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Config Panel -->
      <div class="lg:col-span-6 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
        <div class="border-b border-neutral-100 pb-3">
          <h3 class="font-display font-bold text-base text-neutral-950">
            Pengaturan Tanya-Jawab Lokasi
          </h3>
          <p class="text-[11px] text-neutral-500 mt-0.5">
            Pilih fasilitas yang dicari, ragam pertanyaan, serta tipe jawaban penunjuknya.
          </p>
        </div>

        <!-- 1. Fasilitas yang dicari -->
        <div class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            1. Fasilitas / Ruangan:
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="(item, idx) in facilities"
              :key="idx"
              type="button"
              class="p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer"
              :class="
                facilityForm.facilityIndex === idx
                  ? 'bg-neutral-950 text-white border-neutral-950 font-bold'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-950'
              "
              @click="facilityForm.facilityIndex = idx"
            >
              <div class="font-sans font-bold text-sm">{{ item.japanese }}</div>
              <div class="text-[10px] opacity-75 font-mono truncate">{{ item.indonesian }}</div>
            </button>
          </div>
        </div>

        <!-- 2. Bentuk Pertanyaan -->
        <div class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            2. Ragam Pertanyaan:
          </label>
          <div class="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-2xl">
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.questionPoliteness === 'biasa' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="facilityForm.questionPoliteness = 'biasa'"
            >
              どこ (Biasa)
            </button>
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.questionPoliteness === 'sopan' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="facilityForm.questionPoliteness = 'sopan'"
            >
              どちら (Sopan)
            </button>
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.questionPoliteness === 'tanya-lantai' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="facilityForm.questionPoliteness = 'tanya-lantai'"
            >
              なんがい (Lantai)
            </button>
          </div>
        </div>

        <!-- 3. Tipe Jawaban -->
        <div class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            3. Tipe Jawaban Penunjuk:
          </label>
          <div class="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-2xl">
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.locationType === 'tunjuk-biasa' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="facilityForm.locationType = 'tunjuk-biasa'"
            >
              ここ・そこ・あそこ
            </button>
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.locationType === 'tunjuk-sopan' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="facilityForm.locationType = 'tunjuk-sopan'"
            >
              こちら・あちら
            </button>
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.locationType === 'lantai' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="facilityForm.locationType = 'lantai'"
            >
              Nomor Lantai (階)
            </button>
          </div>
        </div>

        <!-- 4. Pilihan Zona Jarak / Nomor Lantai -->
        <div v-if="facilityForm.locationType !== 'lantai'" class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Pilih Zona Jarak Penunjuk:
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              class="py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.zone === 'koko' ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white border-neutral-200 text-neutral-700'"
              @click="facilityForm.zone = 'koko'"
            >
              Dekat (Di sini)
            </button>
            <button
              type="button"
              class="py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.zone === 'soko' ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white border-neutral-200 text-neutral-700'"
              @click="facilityForm.zone = 'soko'"
            >
              Sedang (Di situ)
            </button>
            <button
              type="button"
              class="py-2 px-3 border rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="facilityForm.zone === 'asoko' ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white border-neutral-200 text-neutral-700'"
              @click="facilityForm.zone = 'asoko'"
            >
              Jauh (Di sana)
            </button>
          </div>
        </div>

        <div v-else class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Pilih Lantai Gedung:
          </label>
          <div class="grid grid-cols-5 gap-1.5">
            <button
              v-for="fl in ['1-kai', '2-kai', '3-kai', '4-kai', 'chika'] as const"
              :key="fl"
              type="button"
              class="py-2 px-1 text-center border rounded-xl text-xs font-mono font-bold transition-all cursor-pointer"
              :class="facilityForm.floor === fl ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white border-neutral-200 text-neutral-700'"
              @click="facilityForm.floor = fl"
            >
              {{ fl === 'chika' ? 'B1 (ちか)' : fl.replace('-kai', 'F') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div class="lg:col-span-6 flex flex-col justify-between bg-neutral-950 text-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-neutral-800 pb-4">
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
              <SparklesIcon class="w-3.5 h-3.5" />
              <span>Hasil Dialog Interaktif Bab 3</span>
            </span>
            <button
              type="button"
              class="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
              title="Salin percakapan"
              @click="copyToClipboard(generatedFacilityDialog.fullJp)"
            >
              <CheckIcon v-if="copied" class="w-4 h-4 text-emerald-400" />
              <ClipboardDocumentIcon v-else class="w-4 h-4" />
            </button>
          </div>

          <!-- Japanese Dialog Output -->
          <div class="space-y-3">
            <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider">Teks Bahasa Jepang:</div>
            <div class="font-sans font-bold text-xl sm:text-2xl text-white leading-relaxed whitespace-pre-line tracking-wide">
              {{ generatedFacilityDialog.fullJp }}
            </div>
          </div>

          <!-- Romaji -->
          <div v-if="props.showRomaji" class="space-y-1.5 pt-2 border-t border-neutral-800">
            <div class="text-[10px] font-mono text-neutral-500 uppercase">Pelafalan Romaji:</div>
            <div class="text-xs sm:text-sm font-mono text-neutral-300 whitespace-pre-line leading-relaxed">
              {{ generatedFacilityDialog.fullRo }}
            </div>
          </div>

          <!-- Indonesian Translation -->
          <div class="space-y-1.5 pt-2 border-t border-neutral-800">
            <div class="text-[10px] font-mono text-neutral-500 uppercase">Terjemahan Bahasa Indonesia:</div>
            <div class="text-xs sm:text-sm text-neutral-400 whitespace-pre-line leading-relaxed italic">
              {{ generatedFacilityDialog.fullId }}
            </div>
          </div>
        </div>

        <!-- Audio Trigger Button -->
        <div class="pt-4 border-t border-neutral-800">
          <button
            type="button"
            class="w-full py-3 bg-white hover:bg-neutral-100 text-neutral-950 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            @click="emit('play-audio', generatedFacilityDialog.audioText)"
          >
            <SpeakerWaveIcon class="w-4 h-4 text-neutral-950" />
            <span>Putar Suara Dialog (Audio TTS)</span>
          </button>
        </div>
      </div>
    </div>

    <!-- TAB 2: SHOPPING & PRICE SIMULATOR -->
    <div v-else class="grid grid-cols-1 lg:grid-cols-12 gap-8">
      <!-- Config Panel -->
      <div class="lg:col-span-6 bg-white border border-neutral-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-xs">
        <div class="border-b border-neutral-100 pb-3">
          <h3 class="font-display font-bold text-base text-neutral-950">
            Pengaturan Belanja &amp; Cek Harga
          </h3>
          <p class="text-[11px] text-neutral-500 mt-0.5">
            Pilih barang, asal negara produsen, nominal harga Yen, dan skenario transaksi.
          </p>
        </div>

        <!-- 1. Pilihan Barang -->
        <div class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            1. Pilihan Barang:
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="(p, pIdx) in products"
              :key="pIdx"
              type="button"
              class="p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer"
              :class="
                shoppingForm.productIndex === pIdx
                  ? 'bg-neutral-950 text-white border-neutral-950 font-bold'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-950'
              "
              @click="shoppingForm.productIndex = pIdx"
            >
              <div class="font-sans font-bold text-sm">{{ p.japanese }}</div>
              <div class="text-[10px] opacity-75 font-mono truncate">{{ p.indonesian }}</div>
            </button>
          </div>
        </div>

        <!-- 2. Negara Asal Produk -->
        <div class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            2. Asal Negara / Produsen:
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="(c, cIdx) in countries"
              :key="cIdx"
              type="button"
              class="p-2 rounded-xl border text-center text-xs transition-all cursor-pointer"
              :class="
                shoppingForm.countryIndex === cIdx
                  ? 'bg-neutral-950 text-white border-neutral-950 font-bold'
                  : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-950'
              "
              @click="shoppingForm.countryIndex = cIdx"
            >
              <div class="font-bold font-sans text-xs">{{ c.japanese }}</div>
              <div class="text-[10px] opacity-75 font-mono truncate">{{ c.indonesian }}</div>
            </button>
          </div>
        </div>

        <!-- 3. Nominal Harga Yen -->
        <div class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            3. Nominal Harga Yen (¥):
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
            <button
              v-for="pr in pricePresets"
              :key="pr.amount"
              type="button"
              class="p-2 border rounded-xl text-center text-xs transition-all cursor-pointer"
              :class="
                shoppingForm.pricePreset === pr.amount
                  ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-xs'
                  : 'bg-white border-neutral-200 text-neutral-800 hover:border-neutral-950'
              "
              @click="shoppingForm.pricePreset = pr.amount"
            >
              <div class="font-mono font-bold text-xs">¥{{ pr.amount.toLocaleString() }}</div>
              <div class="text-[9px] opacity-75 font-sans truncate">{{ pr.japanese }}</div>
            </button>
          </div>
        </div>

        <!-- 4. Skenario Transaksi -->
        <div class="space-y-1.5">
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            4. Skenario Percakapan:
          </label>
          <div class="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 rounded-2xl">
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="shoppingForm.scenario === 'tanya-asal' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="shoppingForm.scenario = 'tanya-asal'"
            >
              Tanya Asal
            </button>
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="shoppingForm.scenario === 'tanya-harga' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="shoppingForm.scenario = 'tanya-harga'"
            >
              Tanya Harga
            </button>
            <button
              type="button"
              class="py-2 px-2 text-center rounded-xl text-xs font-bold transition-all cursor-pointer"
              :class="shoppingForm.scenario === 'full' ? 'bg-white text-neutral-950 shadow-xs' : 'text-neutral-600'"
              @click="shoppingForm.scenario = 'full'"
            >
              Transaksi Deal
            </button>
          </div>
        </div>
      </div>

      <!-- Result Card -->
      <div class="lg:col-span-6 flex flex-col justify-between bg-neutral-950 text-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div class="space-y-6">
          <div class="flex items-center justify-between border-b border-neutral-800 pb-4">
            <span class="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-1.5">
              <SparklesIcon class="w-3.5 h-3.5" />
              <span>Simulasi Belanja &amp; Harga Yen</span>
            </span>
            <button
              type="button"
              class="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-300 transition-colors cursor-pointer"
              title="Salin percakapan"
              @click="copyToClipboard(generatedShoppingDialog.fullJp)"
            >
              <CheckIcon v-if="copied" class="w-4 h-4 text-emerald-400" />
              <ClipboardDocumentIcon v-else class="w-4 h-4" />
            </button>
          </div>

          <!-- Japanese Output -->
          <div class="space-y-3">
            <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider">Teks Bahasa Jepang:</div>
            <div class="font-sans font-bold text-xl sm:text-2xl text-white leading-relaxed whitespace-pre-line tracking-wide">
              {{ generatedShoppingDialog.fullJp }}
            </div>
          </div>

          <!-- Romaji -->
          <div v-if="props.showRomaji" class="space-y-1.5 pt-2 border-t border-neutral-800">
            <div class="text-[10px] font-mono text-neutral-500 uppercase">Pelafalan Romaji:</div>
            <div class="text-xs sm:text-sm font-mono text-neutral-300 whitespace-pre-line leading-relaxed">
              {{ generatedShoppingDialog.fullRo }}
            </div>
          </div>

          <!-- Indonesian Translation -->
          <div class="space-y-1.5 pt-2 border-t border-neutral-800">
            <div class="text-[10px] font-mono text-neutral-500 uppercase">Terjemahan Bahasa Indonesia:</div>
            <div class="text-xs sm:text-sm text-neutral-400 whitespace-pre-line leading-relaxed italic">
              {{ generatedShoppingDialog.fullId }}
            </div>
          </div>
        </div>

        <!-- Audio Trigger Button -->
        <div class="pt-4 border-t border-neutral-800">
          <button
            type="button"
            class="w-full py-3 bg-white hover:bg-neutral-100 text-neutral-950 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
            @click="emit('play-audio', generatedShoppingDialog.audioText)"
          >
            <SpeakerWaveIcon class="w-4 h-4 text-neutral-950" />
            <span>Putar Suara Percakapan (Audio TTS)</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
