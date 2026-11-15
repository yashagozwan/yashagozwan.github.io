<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SpeakerWaveIcon,
  ClipboardDocumentIcon,
  CheckIcon,
  ClockIcon,
  CalendarDaysIcon,
  SparklesIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/outline'

defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
}>()

// Active Simulator Tab: 'sentence-generator' | 'roleplay' | 'schedule-planner'
type SimTab = 'sentence-generator' | 'roleplay' | 'schedule-planner'
const activeTab = ref<SimTab>('sentence-generator')

// -------------------------------------------------------------
// TAB 1: DYNAMIC SENTENCE GENERATOR
// -------------------------------------------------------------
const verbList = [
  { id: 'okiru', base: 'おきます', stem: 'おき', meaning: 'Bangun tidur', defaultTime: 6, defaultVerbType: 'point' },
  { id: 'neru', base: 'ねます', stem: 'ね', meaning: 'Tidur', defaultTime: 22, defaultVerbType: 'point' },
  { id: 'hataraku', base: 'はたらきます', stem: 'はたらき', meaning: 'Bekerja', defaultTime: 9, defaultVerbType: 'range' },
  { id: 'benkyou', base: 'べんきょうします', stem: 'べんきょうし', meaning: 'Belajar', defaultTime: 19, defaultVerbType: 'range' },
  { id: 'yasumu', base: 'やすみます', stem: 'やすみ', meaning: 'Beristirahat / Libur', defaultTime: 12, defaultVerbType: 'day' },
  { id: 'miru', base: 'みます', stem: 'み', meaning: 'Menonton TV', defaultTime: 20, defaultVerbType: 'point' },
  { id: 'taberu', base: 'たべます', stem: 'たべ', meaning: 'Makan', defaultTime: 7, defaultVerbType: 'point' },
]

const formState = ref({
  selectedVerbIndex: 0,
  timePattern: 'point' as 'point' | 'range' | 'relative', // 'point' (に), 'range' (から～まで), 'relative' (tanpa に)
  hourStart: 6,
  minuteStart: 0,
  hourEnd: 17,
  minuteEnd: 0,
  relativeTime: 'maiasa' as 'maiasa' | 'mainichi' | 'maiban' | 'kinou' | 'ashita' | 'kesa',
  tense: 'present-pos' as 'present-pos' | 'present-neg' | 'past-pos' | 'past-neg',
  selectedDay: 'none' as 'none' | 'getsuyoubi' | 'nichiyoubi' | 'weekend',
})

const hoursMap: Record<number, { jp: string; ro: string; numText: string }> = {
  1: { jp: '１じ', ro: 'ichiji', numText: '1.00' },
  2: { jp: '２じ', ro: 'niji', numText: '2.00' },
  3: { jp: '３じ', ro: 'sanji', numText: '3.00' },
  4: { jp: '４じ（よじ）', ro: 'yoji', numText: '4.00' },
  5: { jp: '５じ', ro: 'goji', numText: '5.00' },
  6: { jp: '６じ', ro: 'rokuji', numText: '6.00' },
  7: { jp: '７じ（しちじ）', ro: 'shichiji', numText: '7.00' },
  8: { jp: '８じ', ro: 'hachiji', numText: '8.00' },
  9: { jp: '９じ（くじ）', ro: 'kuji', numText: '9.00' },
  10: { jp: '１０じ', ro: 'juuji', numText: '10.00' },
  11: { jp: '１１じ', ro: 'juuichiji', numText: '11.00' },
  12: { jp: '１２じ', ro: 'juuniji', numText: '12.00' },
}

const minutesMap: Record<number, { jp: string; ro: string }> = {
  0: { jp: '', ro: '' },
  15: { jp: '１５ふん', ro: 'juugofun' },
  30: { jp: 'はん', ro: 'han' },
  45: { jp: '４５ふん', ro: 'yonjuugofun' },
}

const relativeTimeMap: Record<string, { jp: string; ro: string; meaning: string; defaultTense: string }> = {
  maiasa: { jp: 'まいあさ', ro: 'maiasa', meaning: 'setiap pagi', defaultTense: 'present-pos' },
  mainichi: { jp: 'まいにち', ro: 'mainichi', meaning: 'setiap hari', defaultTense: 'present-pos' },
  maiban: { jp: 'まいばん', ro: 'maiban', meaning: 'setiap malam', defaultTense: 'present-pos' },
  kesa: { jp: 'けさ', ro: 'kesa', meaning: 'tadi pagi', defaultTense: 'past-pos' },
  kinou: { jp: 'きのう', ro: 'kinou', meaning: 'kemarin', defaultTense: 'past-pos' },
  ashita: { jp: 'あした', ro: 'ashita', meaning: 'besok', defaultTense: 'present-pos' },
}

const generatedSentence = computed(() => {
  const f = formState.value
  const v = verbList[f.selectedVerbIndex] || verbList[0]

  // Conjugate Verb
  let verbJp = ''
  let verbRo = ''
  let verbMeaning = ''

  if (f.tense === 'present-pos') {
    verbJp = `${v.stem}ます`
    verbRo = `${v.base}`
    verbMeaning = v.meaning
  } else if (f.tense === 'present-neg') {
    verbJp = `${v.stem}ません`
    verbRo = `${v.base.replace('masu', 'masen')}`
    verbMeaning = `tidak ${v.meaning.toLowerCase()}`
  } else if (f.tense === 'past-pos') {
    verbJp = `${v.stem}ました`
    verbRo = `${v.base.replace('masu', 'mashita')}`
    verbMeaning = `sudah ${v.meaning.toLowerCase()} (lampau)`
  } else {
    verbJp = `${v.stem}ませんでした`
    verbRo = `${v.base.replace('masu', 'masen deshita')}`
    verbMeaning = `tidak ${v.meaning.toLowerCase()} (lampau)`
  }

  // Time & Day expressions
  let timeJp = ''
  let timeRo = ''
  let timeId = ''
  let grammarNotes = ''

  const hInfo = hoursMap[f.hourStart] || hoursMap[6]
  const mInfo = minutesMap[f.minuteStart] || minutesMap[0]
  const minTextJp = mInfo.jp ? ` ${mInfo.jp}` : ''
  const minTextRo = mInfo.ro ? ` ${mInfo.ro}` : ''
  const minTextId = f.minuteStart === 30 ? ' lewat 30' : f.minuteStart > 0 ? ` lewat ${f.minuteStart}` : ''

  if (f.timePattern === 'point') {
    // 6時に おきます
    const cleanHourJp = hInfo.jp.replace(/（.*?）/g, '')
    timeJp = `${cleanHourJp}${minTextJp}に`
    timeRo = `${hInfo.ro}${minTextRo} ni`
    timeId = `pukul ${f.hourStart}${minTextId}`
    grammarNotes = `Menggunakan partikel に setelah waktu berangka (${cleanHourJp}${minTextJp}に) untuk menandai waktu spesifik.`
  } else if (f.timePattern === 'range') {
    // 9時から 5時まで はたらきます
    const startHourJp = (hoursMap[f.hourStart] || hoursMap[9]).jp.replace(/（.*?）/g, '')
    const startHourRo = (hoursMap[f.hourStart] || hoursMap[9]).ro
    const endHourJp = (hoursMap[f.hourEnd] || hoursMap[17 % 12 || 5]).jp.replace(/（.*?）/g, '')
    const endHourRo = (hoursMap[f.hourEnd] || hoursMap[17 % 12 || 5]).ro

    timeJp = `${startHourJp}から ${endHourJp}まで`
    timeRo = `${startHourRo} kara ${endHourRo} made`
    timeId = `dari jam ${f.hourStart} sampai jam ${f.hourEnd > 12 ? f.hourEnd - 12 : f.hourEnd}`
    grammarNotes = 'Menggunakan partikel から (dari) untuk awal dan まで (sampai) untuk batas akhir kegiatan.'
  } else {
    // Keterangan relatif tanpa に
    const rel = relativeTimeMap[f.relativeTime] || relativeTimeMap.maiasa
    timeJp = `${rel.jp}`
    timeRo = `${rel.ro}`
    timeId = `${rel.meaning}`
    grammarNotes = `Keterangan waktu relatif (${rel.jp}) TIDAK menggunakan partikel に.`
  }

  // Optional Day expression
  let dayJp = ''
  let dayRo = ''
  let dayId = ''
  if (f.selectedDay === 'getsuyoubi') {
    dayJp = 'げつようびに '
    dayRo = 'getsuyoubi ni '
    dayId = 'pada hari Senin '
  } else if (f.selectedDay === 'nichiyoubi') {
    dayJp = 'にちようびは '
    dayRo = 'nichiyoubi wa '
    dayId = 'pada hari Minggu '
  } else if (f.selectedDay === 'weekend') {
    dayJp = 'どようびと にちようびは '
    dayRo = 'doyoubi to nichiyoubi wa '
    dayId = 'pada hari Sabtu dan Minggu '
  }

  const fullSentenceJp = `${dayJp}${timeJp} ${verbJp}。`
  const fullSentenceRo = `${dayRo}${timeRo} ${verbRo}.`
  const fullSentenceId = `Saya ${dayId}${verbMeaning} ${timeId}.`

  return {
    japanese: fullSentenceJp,
    romaji: fullSentenceRo,
    indonesian: fullSentenceId,
    grammarNotes,
  }
})

// Copy Feedback
const copied = ref(false)
function copySentence() {
  if (navigator?.clipboard) {
    navigator.clipboard.writeText(generatedSentence.value.japanese)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

// -------------------------------------------------------------
// TAB 2: INTERACTIVE ROLEPLAY SCENARIOS
// -------------------------------------------------------------
const selectedScenarioIndex = ref(0)
const roleplayScenarios = [
  {
    title: 'Skenario 1: Menanyakan Jam Sekarang (いま 何時ですか)',
    context: 'Di jalan atau stasiun, menanyakan jam berapa saat ini dengan sopan.',
    lines: [
      { speaker: 'A (Anda)', jp: 'すみません。いま なんじですか。', ro: 'Sumimasen. Ima nanji desu ka.', id: 'Permisi, sekarang jam berapa?' },
      { speaker: 'B (Warga)', jp: 'ごぜん ８じ はんです。', ro: 'Gozen hachiji han desu.', id: 'Pukul 8.30 pagi.' },
      { speaker: 'A (Anda)', jp: 'ありがとうございます。', ro: 'Arigatou gozaimasu.', id: 'Terima kasih banyak.' },
      { speaker: 'B (Warga)', jp: 'どういたしまして。', ro: 'Douitashimashite.', id: 'Sama-sama.' },
    ],
  },
  {
    title: 'Skenario 2: Menanyakan Jadwal Kerja & Jam Bangun (仕事の時間)',
    context: 'Berbincang dengan teman kerja tentang jam bangun pagi dan jam kerja di kantor.',
    lines: [
      { speaker: 'A (Rekan)', jp: 'まいあさ なんじに おきますか。', ro: 'Maiasa nanji ni okimasu ka.', id: 'Setiap pagi Anda bangun jam berapa?' },
      { speaker: 'B (Anda)', jp: '６じに おきます。', ro: 'Rokuji ni okimasu.', id: 'Saya bangun pukul 6.' },
      { speaker: 'A (Rekan)', jp: 'なんじから なんじまで はたらきますか。', ro: 'Nanji kara nanji made hatarakimasu ka.', id: 'Bekerja dari jam berapa sampai jam berapa?' },
      { speaker: 'B (Anda)', jp: '９じから ５じまで はたらきます。', ro: 'Kuji kara goji made hatarakimasu.', id: 'Saya bekerja dari jam 9 sampai jam 5 sore.' },
    ],
  },
  {
    title: 'Skenario 3: Menanyakan Kegiatan Kemarin (昨日の予定)',
    context: 'Menanyakan apakah kemarin temanmu belajar dan sampai jam berapa.',
    lines: [
      { speaker: 'A (Teman)', jp: 'きのう べんきょうしましたか。', ro: 'Kinou benkyou shimashita ka.', id: 'Apakah kemarin kamu belajar?' },
      { speaker: 'B (Anda)', jp: 'はい、１０じまで べんきょうしました。', ro: 'Hai, juuji made benkyou shimashita.', id: 'Ya, saya belajar sampai jam 10 malam.' },
      { speaker: 'A (Teman)', jp: 'テレビを みましたか。', ro: 'Terebi o mimashita ka.', id: 'Apakah sempat menonton TV?' },
      { speaker: 'B (Anda)', jp: 'いいえ、みませんでした。', ro: 'Iie, mimasen deshita.', id: 'Tidak, saya tidak menonton TV.' },
    ],
  },
  {
    title: 'Skenario 4: Menanyakan Hari & Hari Libur (週末の予定)',
    context: 'Memastikan nama hari dan membicarakan hari libur dengan partikel ね.',
    lines: [
      { speaker: 'A (Anda)', jp: 'きょうは なんようびですか。', ro: 'Kyou wa nanyoubi desu ka.', id: 'Hari ini hari apa ya?' },
      { speaker: 'B (Rekan)', jp: 'きんようびです。', ro: 'Kinyoubi desu.', id: 'Hari Jumat.' },
      { speaker: 'A (Anda)', jp: 'あしたは やすみですね。', ro: 'Ashita wa yasumi desu ne.', id: 'Besok libur kan ya.' },
      { speaker: 'B (Rekan)', jp: 'はい、どようびと にちようびは やすみです。', ro: 'Hai, doyoubi to nichiyoubi wa yasumi desu.', id: 'Ya, hari Sabtu dan Minggu libur.' },
    ],
  },
]

// -------------------------------------------------------------
// TAB 3: DAILY SCHEDULE PLANNER (JADWAL HARIAN SAYA)
// -------------------------------------------------------------
const mySchedule = ref([
  { time: '06.00', jp: '６じに おきます。', ro: 'Rokuji ni okimasu.', id: 'Bangun tidur pukul 6.' },
  { time: '07.00', jp: '７じに あさごはんを たべます。', ro: 'Shichiji ni asagohan o tabemasu.', id: 'Sarapan pagi pukul 7.' },
  { time: '08.30', jp: '８じはんに かいしゃへ いきます。', ro: 'Hachiji han ni kaisha e ikimasu.', id: 'Berangkat kerja pukul 8.30.' },
  { time: '12.00–13.00', jp: '１２じから １じまで ひるやすみです。', ro: 'Juuniji kara ichiji made hiruyasumi desu.', id: 'Istirahat siang jam 12 s/d jam 1.' },
  { time: '17.00', jp: '５じに しごとが おわります。', ro: 'Goji ni shigoto ga owarimasu.', id: 'Selesai kerja pukul 5 sore.' },
  { time: '19.30', jp: '７じはんに にほんごを べんきょうします。', ro: 'Shichiji han ni nihongo o benkyou shimasu.', id: 'Belajar bahasa Jepang pukul 7.30 malam.' },
  { time: '22.30', jp: '１０じはんに ねます。', ro: 'Juuji han ni nemasu.', id: 'Tidur pukul 10.30 malam.' },
])

const combinedScheduleParagraph = computed(() => {
  return mySchedule.value.map((s) => s.jp).join(' ')
})
</script>

<template>
  <div class="space-y-8 max-w-5xl mx-auto">
    <!-- Header Card -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <ClockIcon class="w-4 h-4 text-neutral-900" />
          <span>Generator Simulator Interaktif Bab 4</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Simulator Jadwal Harian & Konjugasi Waktu
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
          Eksplorasi dan kombinasikan kata kerja, jam, menit, hari, serta 4 bentuk perubahan tata bahasa secara dinamis lengkap dengan pelafalan suara otomatis.
        </p>
      </div>

      <div class="flex items-center gap-2 shrink-0">
        <button
          type="button"
          class="px-4 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer hover:bg-neutral-800"
          @click="emit('play-audio', generatedSentence.japanese)"
        >
          <SpeakerWaveIcon class="w-4 h-4" />
          <span>Putar Suara Kalimat</span>
        </button>
      </div>
    </div>

    <!-- Mode Selector Tabs -->
    <div class="flex items-center gap-1.5 sm:gap-2 border-b border-neutral-200 pb-3 overflow-x-auto scrollbar-none">
      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeTab === 'sentence-generator' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeTab = 'sentence-generator'"
      >
        <SparklesIcon class="w-3.5 h-3.5" />
        <span>1. Generator Kalimat Rutinitas</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeTab === 'roleplay' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeTab = 'roleplay'"
      >
        <ChatBubbleLeftRightIcon class="w-3.5 h-3.5" />
        <span>2. Simulator Dialog Waktu</span>
      </button>

      <button
        type="button"
        class="px-4 py-2 rounded-xl text-xs font-bold transition-all border shrink-0 flex items-center gap-1.5 cursor-pointer"
        :class="activeTab === 'schedule-planner' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
        @click="activeTab = 'schedule-planner'"
      >
        <CalendarDaysIcon class="w-3.5 h-3.5" />
        <span>3. Jadwal Harian Saya</span>
      </button>
    </div>

    <!-- ============================================================== -->
    <!-- TAB 1: DYNAMIC SENTENCE GENERATOR -->
    <!-- ============================================================== -->
    <div v-if="activeTab === 'sentence-generator'" class="space-y-6">
      <!-- Generated Output Display Box -->
      <div class="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-4">
        <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span>Hasil Kalimat Bahasa Jepang:</span>
          <div class="flex items-center gap-2">
            <button
              type="button"
              class="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-lg text-white font-mono flex items-center gap-1 cursor-pointer transition-all"
              @click="copySentence"
            >
              <CheckIcon v-if="copied" class="w-3.5 h-3.5 text-emerald-400" />
              <ClipboardDocumentIcon v-else class="w-3.5 h-3.5" />
              <span>{{ copied ? 'Tersalin!' : 'Salin' }}</span>
            </button>
            <button
              type="button"
              class="px-3 py-1 bg-white text-neutral-950 rounded-lg font-bold flex items-center gap-1 cursor-pointer hover:bg-neutral-200 transition-all"
              @click="emit('play-audio', generatedSentence.japanese)"
            >
              <SpeakerWaveIcon class="w-3.5 h-3.5" />
              <span>Dengarkan</span>
            </button>
          </div>
        </div>

        <div class="space-y-1">
          <div class="font-sans font-extrabold text-2xl sm:text-3xl text-white tracking-wide">
            {{ generatedSentence.japanese }}
          </div>
          <div v-if="showRomaji" class="font-mono text-xs sm:text-sm text-neutral-400">
            {{ generatedSentence.romaji }}
          </div>
          <div class="text-xs sm:text-sm text-neutral-300 pt-2 border-t border-neutral-800">
            Artinya: "{{ generatedSentence.indonesian }}"
          </div>
        </div>

        <div class="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 p-2.5 rounded-xl">
          {{ generatedSentence.grammarNotes }}
        </div>
      </div>

      <!-- Controls Matrix -->
      <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xs space-y-6">
        <!-- 1. Pick Activity (Verb) -->
        <div class="space-y-2">
          <label class="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            1. Pilih Aktivitas / Kata Kerja:
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(v, vIdx) in verbList"
              :key="v.id"
              type="button"
              class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer"
              :class="formState.selectedVerbIndex === vIdx ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'"
              @click="formState.selectedVerbIndex = vIdx"
            >
              <span>{{ v.meaning }} ({{ v.base }})</span>
            </button>
          </div>
        </div>

        <!-- 2. Pick Time Pattern -->
        <div class="space-y-2 pt-2 border-t border-neutral-100">
          <label class="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            2. Tipe Pola Waktu:
          </label>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              type="button"
              class="p-3 rounded-xl border text-left cursor-pointer transition-all"
              :class="formState.timePattern === 'point' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.timePattern = 'point'"
            >
              <div class="text-xs font-bold">Waktu Spesifik (～に)</div>
              <div class="text-[10px] opacity-70">Contoh: 6時に おきます</div>
            </button>

            <button
              type="button"
              class="p-3 rounded-xl border text-left cursor-pointer transition-all"
              :class="formState.timePattern === 'range' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.timePattern = 'range'"
            >
              <div class="text-xs font-bold">Rentang Waktu (～から ～まで)</div>
              <div class="text-[10px] opacity-70">Contoh: 9時から 5時まで</div>
            </button>

            <button
              type="button"
              class="p-3 rounded-xl border text-left cursor-pointer transition-all"
              :class="formState.timePattern === 'relative' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.timePattern = 'relative'"
            >
              <div class="text-xs font-bold">Waktu Relatif (Tanpa に)</div>
              <div class="text-[10px] opacity-70">Contoh: まいあさ / きのう</div>
            </button>
          </div>
        </div>

        <!-- 3. Time Pickers (Dynamic depending on pattern) -->
        <div v-if="formState.timePattern === 'point'" class="space-y-3 pt-2 border-t border-neutral-100">
          <label class="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            3. Jam & Menit Spesifik:
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div>
              <span class="text-[10px] font-mono text-neutral-400">Pilih Jam:</span>
              <select
                v-model="formState.hourStart"
                class="w-full mt-1 px-3 py-2 border border-neutral-200 rounded-xl text-xs font-bold bg-white"
              >
                <option v-for="h in 12" :key="h" :value="h">
                  Pukul {{ h }}.00 ({{ hoursMap[h].ro }})
                </option>
              </select>
            </div>

            <div>
              <span class="text-[10px] font-mono text-neutral-400">Pilih Menit:</span>
              <select
                v-model="formState.minuteStart"
                class="w-full mt-1 px-3 py-2 border border-neutral-200 rounded-xl text-xs font-bold bg-white"
              >
                <option :value="0">Tepat (.00)</option>
                <option :value="15">Lewat 15 menit (15分)</option>
                <option :value="30">Setengah jam / Lewat 30 (半)</option>
                <option :value="45">Lewat 45 menit (45分)</option>
              </select>
            </div>
          </div>
        </div>

        <div v-else-if="formState.timePattern === 'range'" class="space-y-3 pt-2 border-t border-neutral-100">
          <label class="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            3. Rentang Jam Mulai (から) & Jam Selesai (まで):
          </label>
          <div class="grid grid-cols-2 gap-3 max-w-md">
            <div>
              <span class="text-[10px] font-mono text-neutral-400">Jam Mulai (から):</span>
              <select
                v-model="formState.hourStart"
                class="w-full mt-1 px-3 py-2 border border-neutral-200 rounded-xl text-xs font-bold bg-white"
              >
                <option v-for="h in 12" :key="h" :value="h">Jam {{ h }} ({{ hoursMap[h].ro }})</option>
              </select>
            </div>

            <div>
              <span class="text-[10px] font-mono text-neutral-400">Jam Selesai (まで):</span>
              <select
                v-model="formState.hourEnd"
                class="w-full mt-1 px-3 py-2 border border-neutral-200 rounded-xl text-xs font-bold bg-white"
              >
                <option v-for="h in 12" :key="h" :value="h">Jam {{ h }} ({{ hoursMap[h].ro }})</option>
              </select>
            </div>
          </div>
        </div>

        <div v-else-if="formState.timePattern === 'relative'" class="space-y-3 pt-2 border-t border-neutral-100">
          <label class="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            3. Pilih Keterangan Waktu Relatif:
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <button
              v-for="(r, rKey) in relativeTimeMap"
              :key="rKey"
              type="button"
              class="p-2.5 rounded-xl border text-left cursor-pointer transition-all"
              :class="formState.relativeTime === rKey ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.relativeTime = rKey as any"
            >
              <div class="text-xs font-bold">{{ r.jp }}</div>
              <div class="text-[10px] opacity-70">{{ r.meaning }}</div>
            </button>
          </div>
        </div>

        <!-- 4. Pick Tense (Konjugasi 4 Bentuk) -->
        <div class="space-y-2 pt-2 border-t border-neutral-100">
          <label class="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            4. Bentuk Kala (Konjugasi Positif/Negatif/Lampau):
          </label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              class="p-2.5 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold"
              :class="formState.tense === 'present-pos' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.tense = 'present-pos'"
            >
              ～ます (Positif)
            </button>

            <button
              type="button"
              class="p-2.5 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold"
              :class="formState.tense === 'present-neg' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.tense = 'present-neg'"
            >
              ～ません (Negatif)
            </button>

            <button
              type="button"
              class="p-2.5 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold"
              :class="formState.tense === 'past-pos' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.tense = 'past-pos'"
            >
              ～ました (Lampau +)
            </button>

            <button
              type="button"
              class="p-2.5 rounded-xl border text-center cursor-pointer transition-all text-xs font-bold"
              :class="formState.tense === 'past-neg' ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'"
              @click="formState.tense = 'past-neg'"
            >
              ～ませんでした (Lampau -)
            </button>
          </div>
        </div>

        <!-- 5. Optional Day -->
        <div class="space-y-2 pt-2 border-t border-neutral-100">
          <label class="block text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
            5. Tambahkan Hari (Opsional):
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              type="button"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer"
              :class="formState.selectedDay === 'none' ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white text-neutral-600 border-neutral-200'"
              @click="formState.selectedDay = 'none'"
            >
              Tanpa Hari
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer"
              :class="formState.selectedDay === 'getsuyoubi' ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white text-neutral-600 border-neutral-200'"
              @click="formState.selectedDay = 'getsuyoubi'"
            >
              Hari Senin (げつようび)
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer"
              :class="formState.selectedDay === 'nichiyoubi' ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white text-neutral-600 border-neutral-200'"
              @click="formState.selectedDay = 'nichiyoubi'"
            >
              Hari Minggu (にちようび)
            </button>
            <button
              type="button"
              class="px-3 py-1.5 rounded-xl text-xs font-semibold border cursor-pointer"
              :class="formState.selectedDay === 'weekend' ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white text-neutral-600 border-neutral-200'"
              @click="formState.selectedDay = 'weekend'"
            >
              Sabtu & Minggu (どようびと にちようび)
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- TAB 2: INTERACTIVE ROLEPLAY SCENARIOS -->
    <!-- ============================================================== -->
    <div v-else-if="activeTab === 'roleplay'" class="space-y-6">
      <!-- Scenario Selector Buttons -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <button
          v-for="(sc, sIdx) in roleplayScenarios"
          :key="sc.title"
          type="button"
          class="p-3.5 rounded-2xl border text-left cursor-pointer transition-all"
          :class="selectedScenarioIndex === sIdx ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs' : 'bg-white text-neutral-800 border-neutral-200 hover:border-neutral-950 hover:bg-neutral-50'"
          @click="selectedScenarioIndex = sIdx"
        >
          <div class="text-xs font-bold">{{ sc.title }}</div>
          <div class="text-[10px] opacity-70 mt-0.5 truncate">{{ sc.context }}</div>
        </button>
      </div>

      <!-- Dialogue Conversation Box -->
      <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
        <div class="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div>
            <h3 class="font-display font-extrabold text-base text-neutral-950">
              {{ roleplayScenarios[selectedScenarioIndex].title }}
            </h3>
            <p class="text-xs text-neutral-500">
              {{ roleplayScenarios[selectedScenarioIndex].context }}
            </p>
          </div>
          <button
            type="button"
            class="px-3.5 py-1.5 bg-neutral-950 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer hover:bg-neutral-800 shrink-0"
            @click="emit('play-audio', roleplayScenarios[selectedScenarioIndex].lines.map(l => l.jp).join(' '))"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Putar Seluruh Dialog</span>
          </button>
        </div>

        <div class="space-y-4">
          <div
            v-for="(line, lIdx) in roleplayScenarios[selectedScenarioIndex].lines"
            :key="lIdx"
            class="flex items-start gap-3 p-3.5 rounded-2xl transition-all"
            :class="line.speaker.includes('Anda') ? 'bg-neutral-50 border border-neutral-200/80 ml-4' : 'bg-white border border-neutral-200 mr-4'"
          >
            <div class="w-8 h-8 rounded-xl bg-neutral-950 text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
              {{ line.speaker.includes('Anda') ? 'YOU' : 'NTV' }}
            </div>
            <div class="flex-1 space-y-0.5">
              <div class="text-[10px] font-mono text-neutral-400 font-bold">
                {{ line.speaker }}
              </div>
              <div class="font-sans font-bold text-base text-neutral-950">
                {{ line.jp }}
              </div>
              <div v-if="showRomaji" class="text-xs font-mono text-neutral-500">
                {{ line.ro }}
              </div>
              <div class="text-xs text-neutral-600 pt-0.5">
                {{ line.id }}
              </div>
            </div>
            <button
              type="button"
              class="p-2 rounded-lg hover:bg-neutral-200 text-neutral-400 hover:text-neutral-950 cursor-pointer transition-colors"
              title="Dengarkan Baris Ini"
              @click="emit('play-audio', line.jp)"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- TAB 3: DAILY SCHEDULE PLANNER (JADWAL HARIAN SAYA) -->
    <!-- ============================================================== -->
    <div v-else-if="activeTab === 'schedule-planner'" class="space-y-6">
      <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 class="font-display font-extrabold text-base text-neutral-950">
              Contoh Rangkaian Jadwal Harian (一日のスケジュール)
            </h3>
            <p class="text-xs text-neutral-500">
              Pelajari urutan menceritakan rutinitas dari pagi hingga malam hari menggunakan partikel に dan から～まで.
            </p>
          </div>

          <button
            type="button"
            class="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer hover:bg-neutral-800 self-start sm:self-auto shrink-0"
            @click="emit('play-audio', combinedScheduleParagraph)"
          >
            <SpeakerWaveIcon class="w-3.5 h-3.5" />
            <span>Dengarkan Seluruh Jadwal</span>
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          <div
            v-for="(item, idx) in mySchedule"
            :key="idx"
            class="bg-white border border-neutral-200 rounded-2xl p-4 shadow-2xs flex items-center justify-between gap-3 hover:border-neutral-950 transition-all cursor-pointer"
            @click="emit('play-audio', item.jp)"
          >
            <div class="flex items-center gap-3">
              <span class="w-12 text-center text-xs font-mono font-bold px-2 py-1 bg-neutral-100 rounded-lg text-neutral-800 shrink-0">
                {{ item.time }}
              </span>
              <div>
                <div class="font-sans font-bold text-sm text-neutral-950">
                  {{ item.jp }}
                </div>
                <div v-if="showRomaji" class="text-xs font-mono text-neutral-500">
                  {{ item.ro }}
                </div>
                <div class="text-xs text-neutral-600 mt-0.5">
                  {{ item.id }}
                </div>
              </div>
            </div>

            <SpeakerWaveIcon class="w-4 h-4 text-neutral-400 hover:text-neutral-950 shrink-0" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
