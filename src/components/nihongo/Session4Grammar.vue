<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  GRAMMAR_PATTERNS_DATA,
  type SentenceBreakdownToken,
  type GrammarPattern,
} from '@/data/nihongoLesson1'
import {
  SpeakerWaveIcon,
  ArrowRightIcon,
  CheckIcon,
  LightBulbIcon,
  BriefcaseIcon,
  BoltIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    showRomaji: boolean
    understoodGrammarIds: string[]
    patterns?: GrammarPattern[]
    lessonNumber?: number
  }>(),
  {
    patterns: () => GRAMMAR_PATTERNS_DATA,
    lessonNumber: 1,
  }
)

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'toggle-grammar', id: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

const activePatterns = computed<GrammarPattern[]>(() => props.patterns || GRAMMAR_PATTERNS_DATA)

// Active selected pattern tab (default 0)
const selectedPatternIndex = ref(0)
const currentPattern = computed<GrammarPattern>(() => {
  return activePatterns.value[selectedPatternIndex.value] || activePatterns.value[0]
})

// Active component token selected by user for deep inspection
const inspectedToken = ref<SentenceBreakdownToken | null>(null)

// Mini exercise state: record answers & feedback
const miniAnswers = ref<Record<string, string>>({})
const miniFeedback = ref<Record<string, boolean>>({})

function selectPattern(idx: number) {
  selectedPatternIndex.value = idx
  inspectedToken.value = null
}

function handleInspectToken(token: SentenceBreakdownToken) {
  inspectedToken.value = token
}

function answerMiniExercise(patternId: string, choice: string, correct: string) {
  miniAnswers.value[patternId] = choice
  const isRight = choice === correct
  miniFeedback.value[patternId] = isRight
  if (isRight) {
    emit('gain-xp', 15)
  }
}

function handleUnderstood(id: string) {
  emit('toggle-grammar', id)
  emit('gain-xp', 20)
}
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">4</span>
          <span>Sesi 4: Tata Bahasa &amp; Pemecahan Struktur (文法 &bull; Bunpou) Bab {{ props.lessonNumber }}</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-neutral-950">
          Visualisasi 7 Rumus Pola Kalimat Utama
        </h2>
        <p class="text-xs text-neutral-600">
          Pelajari balok pembentuk kalimat satu per satu. Ketuk tiap komponen untuk memahami perannya dalam kalimat, simak skenario penggunaan, dan hindari kesalahan umum.
        </p>
      </div>

      <div class="text-right shrink-0">
        <span class="font-mono text-xs font-bold text-neutral-950 px-3 py-1 bg-white border border-neutral-200 rounded-xl">
          {{ props.understoodGrammarIds.length }} / {{ activePatterns.length }} Pola Dikuasai
        </span>
      </div>
    </div>

    <!-- Horizontal Pattern Selector Pills -->
    <div class="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2">
      <button
        v-for="(p, idx) in activePatterns"
        :key="p.id"
        type="button"
        class="px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border flex items-center gap-2 cursor-pointer"
        :class="
          selectedPatternIndex === idx
            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
            : props.understoodGrammarIds.includes(p.id)
            ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:border-neutral-950'
            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'
        "
        @click="selectPattern(idx)"
      >
        <span class="font-mono text-[10px] opacity-75">0{{ p.number }}</span>
        <span>{{ p.title }}</span>
        <CheckIcon v-if="props.understoodGrammarIds.includes(p.id)" class="w-3.5 h-3.5 text-emerald-600 inline" />
      </button>
    </div>

    <!-- Active Grammar Card Deep-Dive -->
    <div
      v-if="currentPattern"
      :key="currentPattern.id"
      class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-9 space-y-8 shadow-sm"
    >
      <!-- Title & Formula Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-5">
        <div class="space-y-1">
          <div class="text-xs font-mono text-neutral-400 uppercase tracking-widest">
            Pola {{ currentPattern.number }} dari {{ activePatterns.length }}
          </div>
          <h3 class="font-display font-extrabold text-2xl sm:text-3xl text-neutral-950">
            {{ currentPattern.title }}
          </h3>
        </div>

        <!-- Mastered Toggle Button -->
        <button
          type="button"
          class="px-4 py-2 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
          :class="
            props.understoodGrammarIds.includes(currentPattern.id)
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
              : 'bg-neutral-50 text-neutral-700 border-neutral-300 hover:border-neutral-950'
          "
          @click="handleUnderstood(currentPattern.id)"
        >
          <CheckIcon v-if="props.understoodGrammarIds.includes(currentPattern.id)" class="w-3.5 h-3.5 text-white" />
          <span>{{ props.understoodGrammarIds.includes(currentPattern.id) ? 'Sudah Dipahami' : 'Tandai Telah Dipahami' }}</span>
        </button>
      </div>

      <!-- 1. Simple Indonesian Explanation -->
      <div class="space-y-2">
        <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Penjelasan Sederhana:
        </div>
        <p class="text-sm sm:text-base text-neutral-800 leading-relaxed font-medium">
          {{ currentPattern.functionDesc }}
        </p>
      </div>

      <!-- 2. Visual Sentence Structure Blocks -->
      <div v-if="currentPattern.structureFormula" class="space-y-3">
        <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Visualisasi Rumus &amp; Struktur Kalimat:
        </div>
        <div class="flex flex-wrap items-center gap-2 p-4 bg-neutral-50 rounded-2xl border border-neutral-200">
          <div
            v-for="(part, pIdx) in currentPattern.structureFormula"
            :key="pIdx"
            class="px-3.5 py-2 bg-white border border-neutral-300 rounded-xl font-mono text-xs sm:text-sm font-bold text-neutral-900 shadow-xs flex items-center gap-1.5"
          >
            <span>{{ part }}</span>
          </div>
        </div>
      </div>

      <!-- 3. Interactive Component Breakdown (Tap a word to inspect function) -->
      <div
        v-if="currentPattern.breakdownExample"
        class="space-y-4 bg-neutral-50/80 p-5 sm:p-6 rounded-2xl border border-neutral-200"
      >
        <div class="flex items-center justify-between">
          <div class="text-xs font-mono uppercase tracking-wider text-neutral-500 font-bold">
            Bedah Kalimat Contoh (Ketuk balok kata untuk melihat peran):
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 text-xs font-mono text-neutral-600 hover:text-neutral-950 cursor-pointer"
            @click="emit('play-audio', currentPattern.breakdownExample!.japanese)"
          >
            <SpeakerWaveIcon class="w-4 h-4" />
            <span>Dengarkan</span>
          </button>
        </div>

        <!-- Full Sentence Preview -->
        <div class="text-base sm:text-lg font-bold text-neutral-950 font-sans">
          {{ currentPattern.breakdownExample!.japanese }}
          <span class="text-xs text-neutral-500 font-mono font-normal ml-2">
            ({{ currentPattern.breakdownExample!.meaning }})
          </span>
        </div>

        <!-- Interactive Tokens Row -->
        <div class="flex flex-wrap items-center gap-2 pt-1">
          <button
            v-for="(tok, tIdx) in currentPattern.breakdownExample!.tokens"
            :key="tIdx"
            type="button"
            class="p-3 rounded-xl border text-center transition-all cursor-pointer"
            :class="
              inspectedToken?.token === tok.token
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-md scale-105'
                : 'bg-white text-neutral-900 border-neutral-300 hover:border-neutral-950'
            "
            @click="handleInspectToken(tok)"
          >
            <div class="text-xl sm:text-2xl font-bold font-sans">{{ tok.token }}</div>
            <div class="text-[10px] font-mono opacity-70">{{ tok.romaji }}</div>
            <div class="text-[11px] font-semibold mt-1">{{ tok.meaning }}</div>
          </button>
        </div>

        <!-- Inspected Token Detail Callout -->
        <div
          v-if="inspectedToken"
          class="p-4 bg-white border-2 border-neutral-950 rounded-xl space-y-1 text-xs transition-all animate-fadeIn"
        >
          <div class="flex items-center justify-between">
            <span class="font-mono uppercase font-bold text-[10px] text-neutral-400">Peran Komponen:</span>
            <span class="px-2 py-0.5 rounded bg-neutral-950 text-white font-mono text-[10px] font-bold">
              {{ inspectedToken.role }}
            </span>
          </div>
          <div class="text-sm font-bold text-neutral-950">
            {{ inspectedToken.token }} ({{ inspectedToken.romaji }}) = {{ inspectedToken.meaning }}
          </div>
          <p class="text-neutral-600 text-[11px]">
            Berfungsi sebagai <strong>{{ inspectedToken.role }}</strong> dalam tata bahasa kalimat ini.
          </p>
        </div>
        <div v-else class="text-[11px] text-neutral-400 italic flex items-center gap-1.5">
          <LightBulbIcon class="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Tips: Klik salah satu balok kata di atas untuk melihat detail perannya.</span>
        </div>
      </div>

      <!-- 4. Practical Usage Scenario -->
      <div v-if="currentPattern.usageScenario" class="space-y-1.5">
        <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Skenario Penggunaan Nyata:
        </div>
        <div class="p-4 bg-white border border-neutral-200 rounded-xl text-xs text-neutral-700 leading-relaxed flex items-start gap-2.5">
          <BriefcaseIcon class="w-4 h-4 text-neutral-700 shrink-0 mt-0.5" />
          <p>{{ currentPattern.usageScenario }}</p>
        </div>
      </div>

      <!-- 5. Common Mistakes -->
      <div v-if="currentPattern.commonMistakes?.length" class="space-y-2.5">
        <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Kekeliruan Umum yang Harus Dihindari:
        </div>
        <div class="grid grid-cols-1 gap-2.5">
          <div
            v-for="(mistake, mIdx) in currentPattern.commonMistakes"
            :key="mIdx"
            class="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-1.5 text-xs"
          >
            <div class="flex flex-wrap items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-rose-100 text-rose-800 font-bold font-mono inline-flex items-center gap-1">
                <XCircleIcon class="w-3.5 h-3.5 text-rose-600" />
                <span>Salah: {{ mistake.wrong }}</span>
              </span>
              <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold font-mono inline-flex items-center gap-1">
                <CheckCircleIcon class="w-3.5 h-3.5 text-emerald-600" />
                <span>Benar: {{ mistake.correct }}</span>
              </span>
            </div>
            <p class="text-neutral-600 text-[11px] leading-relaxed pt-0.5">
              {{ mistake.explanation }}
            </p>
          </div>
        </div>
      </div>

      <!-- 6. Additional Examples -->
      <div class="space-y-3">
        <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
          Contoh Kalimat Lainnya:
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div
            v-for="(ex, exIdx) in currentPattern.examples"
            :key="exIdx"
            class="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200 flex items-start justify-between gap-3"
          >
            <div class="space-y-0.5">
              <div class="font-bold text-sm text-neutral-950 font-sans">
                {{ ex.japanese }}
              </div>
              <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400 italic">
                {{ ex.romaji }}
              </div>
              <div class="text-xs text-neutral-600">
                &rarr; {{ ex.meaning }}
              </div>
            </div>
            <button
              type="button"
              class="p-1.5 rounded-full bg-white hover:bg-neutral-950 hover:text-white transition-colors text-neutral-600 border border-neutral-200 shrink-0 cursor-pointer"
              title="Dengarkan pengucapan"
              @click="emit('play-audio', ex.japanese)"
            >
              <SpeakerWaveIcon class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- 7. Interactive Mini Exercise for this pattern -->
      <div
        v-if="currentPattern.miniExercise"
        class="bg-white border-2 border-neutral-950/20 rounded-2xl p-5 space-y-3"
      >
        <div class="flex items-center justify-between">
          <span class="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold flex items-center gap-1.5">
            <BoltIcon class="w-3.5 h-3.5 text-amber-500" />
            <span>Uji Pemahaman Cepat Pola Ini:</span>
          </span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
            +15 XP
          </span>
        </div>

        <p class="text-xs sm:text-sm font-bold text-neutral-900">
          {{ currentPattern.miniExercise!.question }}
        </p>

        <!-- Options -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
          <button
            v-for="opt in currentPattern.miniExercise!.options"
            :key="opt"
            type="button"
            class="p-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer"
            :class="
              miniAnswers[currentPattern.id] === opt
                ? opt === currentPattern.miniExercise!.answer
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-rose-600 text-white border-rose-600'
                : 'bg-neutral-50 border-neutral-200 hover:border-neutral-950 text-neutral-800'
            "
            @click="
              answerMiniExercise(
                currentPattern.id,
                opt,
                currentPattern.miniExercise!.answer
              )
            "
          >
            {{ opt }}
          </button>
        </div>

        <!-- Feedback & Explanation -->
        <div
          v-if="miniAnswers[currentPattern.id]"
          class="p-3 rounded-xl border text-xs leading-relaxed"
          :class="
            miniFeedback[currentPattern.id]
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-neutral-50 border-neutral-300 text-neutral-800'
          "
        >
          <div class="font-bold mb-0.5 flex items-center gap-1.5">
            <CheckCircleIcon v-if="miniFeedback[currentPattern.id]" class="w-4 h-4 text-emerald-600 shrink-0" />
            <XCircleIcon v-else class="w-4 h-4 text-rose-500 shrink-0" />
            <span>
              {{
                miniFeedback[currentPattern.id]
                  ? 'Jawaban Anda Benar!'
                  : 'Jawaban Kurang Tepat'
              }}
            </span>
          </div>
          {{ currentPattern.miniExercise!.explanation }}
        </div>
      </div>

      <!-- Navigation buttons to next/prev pattern -->
      <div class="flex items-center justify-between pt-4 border-t border-neutral-100">
        <button
          type="button"
          :disabled="selectedPatternIndex === 0"
          class="px-4 py-2 border border-neutral-200 hover:border-neutral-950 rounded-xl text-xs font-semibold text-neutral-700 transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
          @click="selectPattern(selectedPatternIndex - 1)"
        >
          &larr; Pola Sebelumnya
        </button>

        <button
          v-if="selectedPatternIndex < activePatterns.length - 1"
          type="button"
          class="px-5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          @click="selectPattern(selectedPatternIndex + 1)"
        >
          Pola Berikutnya (0{{ selectedPatternIndex + 2 }}) &rarr;
        </button>

        <button
          v-else
          type="button"
          class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          @click="emit('next-session')"
        >
          Lanjut ke Sesi 5: Susun Kalimat &rarr;
        </button>
      </div>
    </div>

    <!-- Session Navigation Footer -->
    <div class="pt-6 border-t border-neutral-200 flex items-center justify-between">
      <span class="text-xs text-neutral-500 font-mono">
        Sudah memahami rumus tata bahasa? Latih menyusun kata acak di Sesi 5.
      </span>
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 5: Susun Kalimat (Sentence Builder)</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
