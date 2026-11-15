<script setup lang="ts">
import { ref } from 'vue'
import {
  COMPARISON_DATA,
  DEMONSTRATIVE_QUIZZES,
} from '@/data/nihongoLesson2'
import {
  SpeakerWaveIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  LightBulbIcon,
  BoltIcon,
  TableCellsIcon,
  CubeIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

type SubMode = 'zones' | 'comparison' | 'recall'
const subMode = ref<SubMode>('zones')

// 3 Spatial Zones Data
const spatialZones = [
  {
    zoneId: 'kore',
    title: 'Zona 1: Dekat Pembicara (Di tangan / Depan mata)',
    colorClass: 'border-emerald-600 bg-emerald-50/40 text-emerald-950',
    badgeClass: 'bg-emerald-600 text-white',
    standalone: { ja: 'これ', ro: 'kore', meaning: 'Ini (benda dekat Anda)' },
    modifier: { ja: 'この～', ro: 'kono + Benda', meaning: '... ini (contoh: この ほん)' },
    exampleJa: 'これは ほんです。／ この ほんは わたしのです。',
    exampleRo: 'Kore wa hon desu. / Kono hon wa watashi no desu.',
    exampleId: 'Ini adalah buku. / Buku ini milik saya.',
    rule: 'Gunakan ketika benda berada di tangan sendiri atau paling dekat dengan Anda dibanding lawan bicara.',
  },
  {
    zoneId: 'sore',
    title: 'Zona 2: Dekat Lawan Bicara (Dipegang teman)',
    colorClass: 'border-blue-600 bg-blue-50/40 text-blue-950',
    badgeClass: 'bg-blue-600 text-white',
    standalone: { ja: 'それ', ro: 'sore', meaning: 'Itu (dekat lawan bicara)' },
    modifier: { ja: 'その～', ro: 'sono + Benda', meaning: '... itu (contoh: その かばん)' },
    exampleJa: 'それは じしょです。／ その かばんは だれのですか。',
    exampleRo: 'Sore wa jisho desu. / Sono kaban wa dare no desu ka.',
    exampleId: 'Itu adalah kamus. / Tas itu milik siapa?',
    rule: 'Gunakan ketika benda berada lebih dekat dengan orang yang sedang Anda ajak bicara.',
  },
  {
    zoneId: 'are',
    title: 'Zona 3: Jauh dari Keduanya (Di seberang / Di luar)',
    colorClass: 'border-purple-600 bg-purple-50/40 text-purple-950',
    badgeClass: 'bg-purple-600 text-white',
    standalone: { ja: 'あれ', ro: 'are', meaning: 'Itu (jauh dari keduanya)' },
    modifier: { ja: 'あの～', ro: 'ano + Benda', meaning: '... itu (contoh: あの くるま)' },
    exampleJa: 'あれは くるまです。／ あの くるまは ミラーさんのです。',
    exampleRo: 'Are wa kuruma desu. / Ano kuruma wa Miraa-san no desu.',
    exampleId: 'Itu adalah mobil. / Mobil itu milik Miller.',
    rule: 'Gunakan ketika benda berada di kejauhan dari Anda berdua (misal: mobil di seberang jalan, gedung jauh).',
  },
]

// Recall Quiz State
const quizIndex = ref(0)
const selectedAnswers = ref<Record<number, string>>({})
const quizCompleted = ref(false)
const recallScore = ref(0)

function answerQuestion(qId: number, opt: string, correct: string) {
  if (selectedAnswers.value[qId]) return
  selectedAnswers.value[qId] = opt

  if (opt === correct) {
    recallScore.value++
    emit('gain-xp', 15)
  }
}

function nextQuestion() {
  if (quizIndex.value < DEMONSTRATIVE_QUIZZES.length - 1) {
    quizIndex.value++
  } else {
    quizCompleted.value = true
  }
}

function prevQuestion() {
  if (quizIndex.value > 0) {
    quizIndex.value--
  }
}

function restartQuiz() {
  quizIndex.value = 0
  selectedAnswers.value = {}
  quizCompleted.value = false
  recallScore.value = 0
}
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">2</span>
          <span>Sesi 2: Kata Tunjuk Dasar (これ・それ・あれ vs この・その・あの)</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-neutral-950">
          Model Spasial &amp; Konsep Kata Tunjuk
        </h2>
        <p class="text-xs text-neutral-600">
          Kuasai 3 zona posisi penunjuk serta perbedaan mutlak antara bentuk yang berdiri sendiri dengan bentuk yang menerangkan kata benda.
        </p>
      </div>

      <!-- Mode Selector -->
      <div class="flex items-center p-1 bg-white border border-neutral-200 rounded-xl shadow-xs self-start sm:self-center shrink-0 gap-1">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="subMode === 'zones' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'zones'"
        >
          <CubeIcon class="w-3.5 h-3.5" />
          <span>3 Zona Tunjuk</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="subMode === 'comparison' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'comparison'"
        >
          <TableCellsIcon class="w-3.5 h-3.5" />
          <span>Tabel Perbedaan</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="subMode === 'recall' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'recall'"
        >
          <BoltIcon class="w-3.5 h-3.5" />
          <span>Uji Cepat</span>
          <span v-if="recallScore > 0" class="text-[10px] font-mono px-1 rounded bg-emerald-500 text-white">
            {{ recallScore }}/{{ DEMONSTRATIVE_QUIZZES.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- SUB-MODE 1: 3 ZONA SPASIAL INTERAKTIF -->
    <div v-if="subMode === 'zones'" class="space-y-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="zone in spatialZones"
          :key="zone.zoneId"
          class="bg-white border-2 rounded-3xl p-6 space-y-4 shadow-sm flex flex-col justify-between"
          :class="zone.colorClass"
        >
          <div class="space-y-3">
            <span class="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full font-bold inline-block" :class="zone.badgeClass">
              {{ zone.title.split(':')[0] }}
            </span>
            <h3 class="font-display font-bold text-lg text-neutral-950">
              {{ zone.title.split(':')[1] }}
            </h3>

            <!-- Word Cards inside Zone -->
            <div class="space-y-2 pt-2">
              <!-- Standalone -->
              <div class="p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold uppercase text-neutral-400">Berdiri Sendiri</span>
                  <button
                    type="button"
                    class="p-1 rounded-full hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                    title="Putar suara"
                    @click="emit('play-audio', zone.standalone.ja)"
                  >
                    <SpeakerWaveIcon class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div class="text-2xl font-bold font-sans text-neutral-950">{{ zone.standalone.ja }}</div>
                <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400">{{ zone.standalone.ro }}</div>
                <div class="text-xs text-neutral-700 font-medium">{{ zone.standalone.meaning }}</div>
              </div>

              <!-- Modifier -->
              <div class="p-3 bg-white rounded-2xl border border-neutral-200/80 shadow-2xs space-y-1">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] font-mono font-bold uppercase text-neutral-400">+ Kata Benda</span>
                  <button
                    type="button"
                    class="p-1 rounded-full hover:bg-neutral-100 text-neutral-600 cursor-pointer"
                    title="Putar suara"
                    @click="emit('play-audio', zone.modifier.ja.replace('～', ''))"
                  >
                    <SpeakerWaveIcon class="w-3.5 h-3.5" />
                  </button>
                </div>
                <div class="text-2xl font-bold font-sans text-neutral-950">{{ zone.modifier.ja }}</div>
                <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400">{{ zone.modifier.ro }}</div>
                <div class="text-xs text-neutral-700 font-medium">{{ zone.modifier.meaning }}</div>
              </div>
            </div>

            <!-- Example and Rule -->
            <div class="pt-2 text-xs text-neutral-600 space-y-1 leading-relaxed border-t border-neutral-200/60">
              <div class="font-bold text-neutral-900 text-[11px]">Contoh Kalimat:</div>
              <div class="font-medium text-neutral-950">{{ zone.exampleJa }}</div>
              <div class="italic text-[11px] text-neutral-500">{{ zone.exampleId }}</div>
              <p class="text-[11px] pt-1 text-neutral-600">{{ zone.rule }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Tips Box -->
      <div class="bg-amber-50/70 border border-amber-300 rounded-2xl p-5 flex items-start gap-3">
        <LightBulbIcon class="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div class="text-xs text-amber-950 leading-relaxed">
          <strong>Kunci Menghafal Jarak:</strong>
          Posisi kata tunjuk dihitung berdasarkan <em>zona keberadaan pembicara vs lawan bicara</em>, bukan sekadar ukuran meter fisik. Jika lawan bicara memegang pulpen, selalu gunakan <strong>それ / その</strong>.
        </div>
      </div>
    </div>

    <!-- SUB-MODE 2: TABEL PERBANDINGAN BERDIRI SENDIRI VS MENERANGKAN -->
    <div v-else-if="subMode === 'comparison'" class="space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div class="border-b border-neutral-100 pb-4">
          <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Aturan Tata Bahasa Krusial</span>
          <h3 class="font-display font-extrabold text-xl text-neutral-950 mt-1">
            {{ COMPARISON_DATA.title }}
          </h3>
          <p class="text-xs text-neutral-600 mt-1">
            Kesalahan paling sering terjadi adalah tertukarnya pemakaian kata tunjuk yang berdiri sendiri dengan yang menempel pada kata benda.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="row in COMPARISON_DATA.rows"
            :key="row.type"
            class="p-5 rounded-2xl border-2 space-y-4"
            :class="row.type.includes('Berdiri') ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-neutral-50 text-neutral-950 border-neutral-300'"
          >
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono uppercase font-bold tracking-wider" :class="row.type.includes('Berdiri') ? 'text-neutral-400' : 'text-neutral-500'">
                {{ row.type }}
              </span>
              <span class="text-xs font-mono px-2 py-0.5 rounded font-bold" :class="row.type.includes('Berdiri') ? 'bg-neutral-800 text-neutral-200' : 'bg-white text-neutral-800 border border-neutral-200'">
                {{ row.usage }}
              </span>
            </div>

            <div class="text-3xl font-extrabold font-sans tracking-wide">
              {{ row.demonstratives }}
            </div>

            <div class="p-3.5 rounded-xl border text-xs space-y-1" :class="row.type.includes('Berdiri') ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'">
              <div class="font-bold flex items-center justify-between">
                <span>{{ row.exampleJapanese }}</span>
                <button
                  type="button"
                  class="p-1 rounded-full hover:bg-neutral-200/30 transition-colors cursor-pointer"
                  @click="emit('play-audio', row.exampleJapanese)"
                >
                  <SpeakerWaveIcon class="w-3.5 h-3.5" />
                </button>
              </div>
              <div v-if="props.showRomaji" class="text-[11px] font-mono opacity-60">{{ row.exampleRomaji }}</div>
              <div class="text-[11px] opacity-80">{{ row.exampleMeaning }}</div>
            </div>
          </div>
        </div>

        <!-- Formula Tip Box -->
        <div class="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-950 flex items-start gap-3">
          <SparklesIcon class="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <p class="leading-relaxed">
            <strong>{{ COMPARISON_DATA.memorizeTip }}</strong>
          </p>
        </div>
      </div>
    </div>

    <!-- SUB-MODE 3: RECALL QUIZ KATA TUNJUK -->
    <div v-else-if="subMode === 'recall'" class="max-w-2xl mx-auto space-y-6">
      <div v-if="!quizCompleted" class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <!-- Progress bar & Header -->
        <div class="space-y-3 border-b border-neutral-100 pb-4">
          <div class="flex items-center justify-between text-xs font-mono">
            <span class="text-neutral-400 font-bold">Soal {{ quizIndex + 1 }} dari {{ DEMONSTRATIVE_QUIZZES.length }}</span>
            <span class="text-emerald-700 font-bold flex items-center gap-1">
              <BoltIcon class="w-3.5 h-3.5" />
              <span>Skor: {{ recallScore }}</span>
            </span>
          </div>
          <div class="w-full bg-neutral-100 h-1.5 rounded-full overflow-hidden">
            <div
              class="bg-neutral-950 h-full transition-all duration-300"
              :style="{ width: `${((quizIndex + 1) / DEMONSTRATIVE_QUIZZES.length) * 100}%` }"
            ></div>
          </div>
        </div>

        <!-- Question Body -->
        <div class="space-y-3">
          <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider">
            Konteks Situasi:
          </div>
          <p class="text-sm font-bold text-neutral-900 bg-neutral-50 p-3 rounded-xl border border-neutral-200">
            {{ DEMONSTRATIVE_QUIZZES[quizIndex].context }}
          </p>

          <div class="text-center py-4 space-y-1">
            <div class="text-2xl sm:text-3xl font-bold font-sans text-neutral-950 tracking-wide">
              {{ DEMONSTRATIVE_QUIZZES[quizIndex].sentenceBefore }}
              <span class="border-b-2 border-neutral-950 px-2 font-mono text-emerald-700">
                {{ selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id] || '____' }}
              </span>
              {{ DEMONSTRATIVE_QUIZZES[quizIndex].sentenceAfter }}
            </div>
            <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400">
              {{ DEMONSTRATIVE_QUIZZES[quizIndex].romaji }}
            </div>
          </div>
        </div>

        <!-- Options -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            v-for="opt in DEMONSTRATIVE_QUIZZES[quizIndex].options"
            :key="opt"
            type="button"
            class="py-3 px-4 rounded-xl border-2 font-display font-bold text-base transition-all text-center cursor-pointer"
            :class="
              selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id] === opt
                ? opt === DEMONSTRATIVE_QUIZZES[quizIndex].correct
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-950'
            "
            :disabled="!!selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id]"
            @click="answerQuestion(DEMONSTRATIVE_QUIZZES[quizIndex].id, opt, DEMONSTRATIVE_QUIZZES[quizIndex].correct)"
          >
            {{ opt }}
          </button>
        </div>

        <!-- Feedback & Educational Explanation -->
        <div
          v-if="selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id]"
          class="p-4 rounded-2xl border text-xs leading-relaxed space-y-2 animate-fadeIn"
          :class="
            selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id] === DEMONSTRATIVE_QUIZZES[quizIndex].correct
              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
              : 'bg-neutral-50 border-neutral-300 text-neutral-900'
          "
        >
          <div class="font-bold flex items-center justify-between">
            <span class="flex items-center gap-1.5">
              <CheckIcon v-if="selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id] === DEMONSTRATIVE_QUIZZES[quizIndex].correct" class="w-4 h-4 text-emerald-600" />
              <XMarkIcon v-else class="w-4 h-4 text-rose-600" />
              <span>
                {{
                  selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id] === DEMONSTRATIVE_QUIZZES[quizIndex].correct
                    ? 'Jawaban Anda Benar!'
                    : `Jawaban Kurang Tepat. Jawaban benar: ${DEMONSTRATIVE_QUIZZES[quizIndex].correct}`
                }}
              </span>
            </span>
            <button
              type="button"
              class="p-1 rounded-full hover:bg-neutral-200/50 cursor-pointer"
              title="Dengarkan kalimat penuh"
              @click="emit('play-audio', DEMONSTRATIVE_QUIZZES[quizIndex].fullSentence)"
            >
              <SpeakerWaveIcon class="w-3.5 h-3.5" />
            </button>
          </div>
          <p>{{ DEMONSTRATIVE_QUIZZES[quizIndex].reason }}</p>
        </div>

        <!-- Navigation buttons -->
        <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
          <button
            type="button"
            :disabled="quizIndex === 0"
            class="px-4 py-2 rounded-xl text-xs font-semibold border border-neutral-200 hover:border-neutral-950 text-neutral-700 disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
            @click="prevQuestion"
          >
            <ArrowLeftIcon class="w-3.5 h-3.5" />
            <span>Sebelumnya</span>
          </button>

          <button
            type="button"
            :disabled="!selectedAnswers[DEMONSTRATIVE_QUIZZES[quizIndex].id]"
            class="px-5 py-2.5 rounded-xl text-xs font-bold bg-neutral-950 hover:bg-neutral-800 text-white disabled:opacity-30 cursor-pointer flex items-center gap-1.5"
            @click="nextQuestion"
          >
            <span>{{ quizIndex === DEMONSTRATIVE_QUIZZES.length - 1 ? 'Selesai & Lihat Skor' : 'Pertanyaan Berikutnya' }}</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <!-- Quiz Completed Score Card -->
      <div v-else class="bg-white border-2 border-neutral-950 rounded-3xl p-8 text-center space-y-6 shadow-sm">
        <div class="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <SparklesIcon class="w-8 h-8" />
        </div>
        <div class="space-y-1">
          <h3 class="font-display font-black text-2xl text-neutral-950">Uji Cepat Selesai!</h3>
          <p class="text-xs text-neutral-500">Hasil Pemahaman Kata Tunjuk Bab 2:</p>
        </div>
        <div class="font-display font-black text-5xl text-neutral-950">
          {{ recallScore }} <span class="text-xl text-neutral-400 font-normal">/ {{ DEMONSTRATIVE_QUIZZES.length }}</span>
        </div>
        <p class="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
          {{
            recallScore >= 5
              ? 'Luar biasa! Anda telah memahami konsep 3 zona spasial dan perbedaan ini/itu dengan sangat solid.'
              : 'Terus berlatih! Ulangi bagian 3 zona tunjuk untuk memperkuat insting membedakan posisi benda.'
          }}
        </p>
        <div class="flex items-center justify-center gap-3 pt-2">
          <button
            type="button"
            class="px-4 py-2 border border-neutral-300 hover:border-neutral-950 rounded-xl text-xs font-bold text-neutral-700 cursor-pointer"
            @click="restartQuiz"
          >
            Ulangi Uji Cepat
          </button>
          <button
            type="button"
            class="px-5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold cursor-pointer"
            @click="emit('next-session')"
          >
            Lanjut ke Sesi 3: Kosakata Benda &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- Bottom Continue Button -->
    <div class="flex justify-end pt-4">
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-2xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 3: Kosakata Benda (単語)</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
