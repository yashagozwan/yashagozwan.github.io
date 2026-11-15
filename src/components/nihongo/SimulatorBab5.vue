<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SpeakerWaveIcon,
  SparklesIcon,
  ClipboardDocumentCheckIcon,
  ClipboardDocumentIcon,
} from '@heroicons/vue/24/outline'

defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'gain-xp', amount: number): void
}>()

// Step Options
const TIME_OPTIONS = [
  { label: 'Besok', kanji: '明日', romaji: 'ashita', meaning: 'Besok' },
  { label: 'Hari Sabtu', kanji: '土曜日に', romaji: 'doyoubi ni', meaning: 'Pada hari Sabtu' },
  { label: 'Minggu depan', kanji: '来週', romaji: 'raishuu', meaning: 'Minggu depan' },
  { label: 'Kemarin', kanji: '昨日', romaji: 'kinou', meaning: 'Kemarin' },
  { label: 'Tahun lalu', kanji: '去年の4月に', romaji: 'kyonen no shigatsu ni', meaning: 'Bulan April tahun lalu' },
  { label: 'Hari ini', kanji: '今日', romaji: 'kyou', meaning: 'Hari ini' },
]

const COMPANION_OPTIONS = [
  { label: 'Bersama Teman', kanji: '友達と', romaji: 'tomodachi to', meaning: 'bersama teman' },
  { label: 'Sendirian', kanji: '一人で', romaji: 'hitori de', meaning: 'sendirian' },
  { label: 'Bersama Keluarga', kanji: '家族と', romaji: 'kazoku to', meaning: 'bersama keluarga' },
  { label: 'Bersama Rekan', kanji: '同僚と', romaji: 'douryou to', meaning: 'bersama rekan kerja' },
]

const TRANSPORT_OPTIONS = [
  { label: 'Kereta Listrik', kanji: '電車で', romaji: 'densha de', meaning: 'naik kereta' },
  { label: 'Kereta Cepat (Shinkansen)', kanji: '新幹線で', romaji: 'shinkansen de', meaning: 'naik Shinkansen' },
  { label: 'Bus', kanji: 'バスで', romaji: 'basu de', meaning: 'naik bus' },
  { label: 'Sepeda', kanji: '自転車で', romaji: 'jitensha de', meaning: 'naik sepeda' },
  { label: 'Pesawat', kanji: '飛行機で', romaji: 'hikouki de', meaning: 'naik pesawat' },
  { label: 'Taksi', kanji: 'タクシーで', romaji: 'takushii de', meaning: 'naik taksi' },
  { label: 'Jalan Kaki', kanji: '歩いて', romaji: 'aruite', meaning: 'dengan jalan kaki' },
]

const DESTINATION_OPTIONS = [
  { label: 'Kyoto', kanji: '京都へ', romaji: 'Kyouto e', meaning: 'ke Kyoto' },
  { label: 'Tokyo', kanji: '東京へ', romaji: 'Toukyou e', meaning: 'ke Tokyo' },
  { label: 'Osaka', kanji: '大阪へ', romaji: 'Oosaka e', meaning: 'ke Osaka' },
  { label: 'Sekolah', kanji: '学校へ', romaji: 'gakkou e', meaning: 'ke sekolah' },
  { label: 'Kantor', kanji: '会社へ', romaji: 'kaisha e', meaning: 'ke kantor' },
  { label: 'Stasiun', kanji: '駅へ', romaji: 'eki e', meaning: 'ke stasiun' },
  { label: 'Jepang (Asal Indonesia)', kanji: 'インドネシアから 日本へ', romaji: 'Indonesia kara Nihon e', meaning: 'dari Indonesia ke Jepang' },
  { label: 'Rumah', kanji: 'うちへ', romaji: 'uchi e', meaning: 'ke rumah' },
]

const VERB_OPTIONS = [
  { label: 'Pergi (Akan / Biasa)', kanji: '行きます。', romaji: 'ikimasu.', meaning: 'pergi.' },
  { label: 'Pergi (Sudah / Lampau)', kanji: '行きました。', romaji: 'ikimashita.', meaning: 'sudah pergi.' },
  { label: 'Datang (Sudah)', kanji: '来ました。', romaji: 'kimashita.', meaning: 'sudah datang.' },
  { label: 'Pulang (Akan)', kanji: '帰ります。', romaji: 'kaerimasu.', meaning: 'akan pulang.' },
  { label: 'Pulang (Sudah)', kanji: '帰りました。', romaji: 'kaerimashita.', meaning: 'sudah pulang.' },
]

// Current selections
const selectedTime = ref(TIME_OPTIONS[1]) // Sabtu
const selectedCompanion = ref(COMPANION_OPTIONS[0]) // Teman
const selectedTransport = ref(TRANSPORT_OPTIONS[1]) // Shinkansen
const selectedDestination = ref(DESTINATION_OPTIONS[0]) // Kyoto
const selectedVerb = ref(VERB_OPTIONS[0]) // ikimasu

const generatedJapanese = computed(() => {
  return `${selectedTime.value.kanji} ${selectedCompanion.value.kanji} ${selectedTransport.value.kanji} ${selectedDestination.value.kanji} ${selectedVerb.value.kanji}`
})

const generatedRomaji = computed(() => {
  return `${selectedTime.value.romaji} ${selectedCompanion.value.romaji} ${selectedTransport.value.romaji} ${selectedDestination.value.romaji} ${selectedVerb.value.romaji}`
})

const generatedMeaning = computed(() => {
  return `${selectedTime.value.meaning}, saya ${selectedVerb.value.meaning.replace('.', '')} ${selectedDestination.value.meaning} ${selectedTransport.value.meaning} ${selectedCompanion.value.meaning}.`
})

const isCopied = ref(false)

function copySentence() {
  navigator.clipboard.writeText(generatedJapanese.value)
  isCopied.value = true
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

function playAudio() {
  emit('play-audio', generatedJapanese.value)
  emit('gain-xp', 3)
}

// Preset shortcuts
function applyPreset(type: 'kyoto' | 'work' | 'indonesia' | 'home') {
  if (type === 'kyoto') {
    selectedTime.value = TIME_OPTIONS[1] // Sabtu
    selectedCompanion.value = COMPANION_OPTIONS[0] // Teman
    selectedTransport.value = TRANSPORT_OPTIONS[1] // Shinkansen
    selectedDestination.value = DESTINATION_OPTIONS[0] // Kyoto
    selectedVerb.value = VERB_OPTIONS[0] // ikimasu
  } else if (type === 'work') {
    selectedTime.value = TIME_OPTIONS[5] // Hari ini
    selectedCompanion.value = COMPANION_OPTIONS[1] // Sendirian
    selectedTransport.value = TRANSPORT_OPTIONS[0] // Kereta
    selectedDestination.value = DESTINATION_OPTIONS[4] // Kantor
    selectedVerb.value = VERB_OPTIONS[0] // ikimasu
  } else if (type === 'indonesia') {
    selectedTime.value = TIME_OPTIONS[4] // Tahun lalu
    selectedCompanion.value = COMPANION_OPTIONS[2] // Keluarga
    selectedTransport.value = TRANSPORT_OPTIONS[4] // Pesawat
    selectedDestination.value = DESTINATION_OPTIONS[6] // Indonesia -> Jepang
    selectedVerb.value = VERB_OPTIONS[2] // kimashita
  } else if (type === 'home') {
    selectedTime.value = TIME_OPTIONS[5] // Hari ini
    selectedCompanion.value = COMPANION_OPTIONS[1] // Sendirian
    selectedTransport.value = TRANSPORT_OPTIONS[6] // Jalan kaki
    selectedDestination.value = DESTINATION_OPTIONS[7] // Rumah
    selectedVerb.value = VERB_OPTIONS[3] // kaerimasu
  }
  emit('play-audio', generatedJapanese.value)
}
</script>

<template>
  <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xs">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <SparklesIcon class="w-4 h-4 text-amber-500" />
          <span>Generator Rencana Perjalanan Jepang</span>
        </div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
          Simulator Kalimat Perjalanan (旅行シミュレーター)
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-2xl">
          Kombinasikan waktu, teman, sarana transportasi, tempat tujuan, dan kata kerja pergerakan untuk menghasilkan kalimat bahasa Jepang alami dengan partikel yang 100% tepat.
        </p>
      </div>

      <!-- Quick Preset Buttons -->
      <div class="flex items-center gap-1.5 flex-wrap">
        <button
          type="button"
          class="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition cursor-pointer"
          @click="applyPreset('kyoto')"
        >
          Liburan Kyoto
        </button>
        <button
          type="button"
          class="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition cursor-pointer"
          @click="applyPreset('work')"
        >
          Berangkat Kerja
        </button>
        <button
          type="button"
          class="px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition cursor-pointer"
          @click="applyPreset('indonesia')"
        >
          Tiba di Jepang
        </button>
      </div>
    </div>

    <!-- Live Generated Output Screen -->
    <div class="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 shadow-md relative overflow-hidden">
      <!-- Watermark background -->
      <div class="absolute -right-6 -bottom-8 font-sans font-black text-9xl text-white/5 pointer-events-none select-none">
        行
      </div>

      <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
        <span class="uppercase tracking-widest font-bold">HASIL KALIMAT LENGKAP:</span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-3 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-sans font-semibold transition cursor-pointer flex items-center gap-1.5"
            @click="copySentence"
          >
            <component :is="isCopied ? ClipboardDocumentCheckIcon : ClipboardDocumentIcon" class="w-3.5 h-3.5 text-neutral-300" />
            <span>{{ isCopied ? 'Tersalin' : 'Salin' }}</span>
          </button>
        </div>
      </div>

      <div class="font-sans font-black text-2xl sm:text-3xl md:text-4xl tracking-tight leading-snug">
        {{ generatedJapanese }}
      </div>

      <div v-if="showRomaji" class="font-mono text-xs sm:text-sm text-neutral-400">
        {{ generatedRomaji }}
      </div>

      <div class="text-sm sm:text-base text-neutral-300 font-medium pt-2 border-t border-neutral-800">
        {{ generatedMeaning }}
      </div>

      <!-- Action Button -->
      <div class="pt-2 flex items-center gap-3">
        <button
          type="button"
          class="px-5 py-3 bg-white text-neutral-950 hover:bg-neutral-100 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
          @click="playAudio"
        >
          <SpeakerWaveIcon class="w-4 h-4 text-neutral-950" />
          <span>Dengarkan Pelafalan Asli</span>
        </button>
      </div>
    </div>

    <!-- Selection Controls 5 Columns -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <!-- 1. Waktu -->
      <div class="space-y-2">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
          1. Waktu:
        </span>
        <div class="space-y-1.5">
          <button
            v-for="t in TIME_OPTIONS"
            :key="t.kanji"
            type="button"
            class="w-full text-left px-3 py-2 rounded-xl border text-xs transition cursor-pointer"
            :class="selectedTime.kanji === t.kanji ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-xs' : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'"
            @click="selectedTime = t"
          >
            <div class="font-sans font-bold">{{ t.kanji }}</div>
            <div class="text-[10px] opacity-75">{{ t.label }}</div>
          </button>
        </div>
      </div>

      <!-- 2. Teman (と) -->
      <div class="space-y-2">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
          2. Teman (と / 一人で):
        </span>
        <div class="space-y-1.5">
          <button
            v-for="c in COMPANION_OPTIONS"
            :key="c.kanji"
            type="button"
            class="w-full text-left px-3 py-2 rounded-xl border text-xs transition cursor-pointer"
            :class="selectedCompanion.kanji === c.kanji ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-xs' : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'"
            @click="selectedCompanion = c"
          >
            <div class="font-sans font-bold">{{ c.kanji }}</div>
            <div class="text-[10px] opacity-75">{{ c.label }}</div>
          </button>
        </div>
      </div>

      <!-- 3. Transportasi (で) -->
      <div class="space-y-2">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
          3. Sarana (で / 歩いて):
        </span>
        <div class="space-y-1.5">
          <button
            v-for="tr in TRANSPORT_OPTIONS"
            :key="tr.kanji"
            type="button"
            class="w-full text-left px-3 py-2 rounded-xl border text-xs transition cursor-pointer"
            :class="selectedTransport.kanji === tr.kanji ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-xs' : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'"
            @click="selectedTransport = tr"
          >
            <div class="font-sans font-bold">{{ tr.kanji }}</div>
            <div class="text-[10px] opacity-75">{{ tr.label }}</div>
          </button>
        </div>
      </div>

      <!-- 4. Tujuan (へ / から) -->
      <div class="space-y-2">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
          4. Tujuan (へ):
        </span>
        <div class="space-y-1.5">
          <button
            v-for="d in DESTINATION_OPTIONS"
            :key="d.kanji"
            type="button"
            class="w-full text-left px-3 py-2 rounded-xl border text-xs transition cursor-pointer"
            :class="selectedDestination.kanji === d.kanji ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-xs' : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'"
            @click="selectedDestination = d"
          >
            <div class="font-sans font-bold">{{ d.kanji }}</div>
            <div class="text-[10px] opacity-75">{{ d.label }}</div>
          </button>
        </div>
      </div>

      <!-- 5. Kata Kerja Gerakan -->
      <div class="space-y-2">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
          5. Kata Kerja:
        </span>
        <div class="space-y-1.5">
          <button
            v-for="v in VERB_OPTIONS"
            :key="v.kanji"
            type="button"
            class="w-full text-left px-3 py-2 rounded-xl border text-xs transition cursor-pointer"
            :class="selectedVerb.kanji === v.kanji ? 'bg-neutral-950 text-white border-neutral-950 font-bold shadow-xs' : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400'"
            @click="selectedVerb = v"
          >
            <div class="font-sans font-bold">{{ v.kanji }}</div>
            <div class="text-[10px] opacity-75">{{ v.label }}</div>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
