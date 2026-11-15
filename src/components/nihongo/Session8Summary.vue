<script setup lang="ts">
import { computed } from 'vue'
import {
  EVALUATION_INDICATORS,
  STUDY_PLAN_5_DAYS,
  GRAMMAR_PATTERNS_DATA,
  VOCABULARIES_DATA,
  LESSON_SESSIONS_L1,
  type LessonSession,
  type EvaluationIndicator,
  type StudyPlanDay,
} from '@/data/nihongoLesson1'
import {
  TrophyIcon,
  CheckIcon,
  ArrowRightIcon,
  AcademicCapIcon,
  HandRaisedIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  SquaresPlusIcon,
  ChatBubbleLeftRightIcon,
  PencilSquareIcon,
  ExclamationTriangleIcon,
} from '@heroicons/vue/24/outline'
import {
  FireIcon,
} from '@heroicons/vue/24/solid'

const sessionIcons: Record<number, any> = {
  1: AcademicCapIcon,
  2: HandRaisedIcon,
  3: BookOpenIcon,
  4: PuzzlePieceIcon,
  5: SquaresPlusIcon,
  6: ChatBubbleLeftRightIcon,
  7: PencilSquareIcon,
  8: TrophyIcon,
}

const props = withDefaults(
  defineProps<{
    memorizedVocabIds: string[]
    difficultVocabIds: string[]
    understoodGrammarIds: string[]
    completedEvaluations: string[]
    completedStudyDays: number[]
    xp: number
    streak: number
    lessonNumber?: number
    meta?: any
    sessions?: LessonSession[]
    evaluationIndicators?: EvaluationIndicator[]
    studyPlan?: StudyPlanDay[]
    vocabularies?: any[]
    patterns?: any[]
  }>(),
  {
    lessonNumber: 1,
    sessions: () => LESSON_SESSIONS_L1,
    evaluationIndicators: () => EVALUATION_INDICATORS,
    studyPlan: () => STUDY_PLAN_5_DAYS,
    vocabularies: () => VOCABULARIES_DATA,
    patterns: () => GRAMMAR_PATTERNS_DATA,
  }
)

const emit = defineEmits<{
  (e: 'toggle-evaluation', id: string): void
  (e: 'toggle-study-day', day: number): void
  (e: 'go-to-session', sessionNumber: number): void
  (e: 'switch-lesson', lessonNumber: number): void
}>()

const activeVocabList = computed(() => props.vocabularies ?? VOCABULARIES_DATA)
const activePatternList = computed(() => props.patterns ?? GRAMMAR_PATTERNS_DATA)
const activeSessionsList = computed(() => props.sessions ?? LESSON_SESSIONS_L1)
const activeEvalIndicators = computed(() => props.evaluationIndicators ?? EVALUATION_INDICATORS)
const activeStudyPlan = computed(() => props.studyPlan ?? STUDY_PLAN_5_DAYS)

// Accuracy & Completion calculations
const vocabCompletionPercent = computed(() => {
  if (!activeVocabList.value.length) return 0
  return Math.round((props.memorizedVocabIds.length / activeVocabList.value.length) * 100)
})

const grammarCompletionPercent = computed(() => {
  if (!activePatternList.value.length) return 0
  return Math.round((props.understoodGrammarIds.length / activePatternList.value.length) * 100)
})

const evalCompletionCount = computed(() => {
  return activeEvalIndicators.value.filter((e) => props.completedEvaluations.includes(e.id)).length
})

const overallMasteryPercent = computed(() => {
  const vLen = activeVocabList.value.length || 1
  const gLen = activePatternList.value.length || 1
  const eLen = activeEvalIndicators.value.length || 1
  const v = props.memorizedVocabIds.length / vLen
  const g = props.understoodGrammarIds.length / gLen
  const e = evalCompletionCount.value / eLen
  const total = (v * 0.4) + (g * 0.4) + (e * 0.2)
  return Math.min(100, Math.round(total * 100))
})

// Unmastered / difficult topics to review
const unmasteredGrammar = computed(() => {
  return activePatternList.value.filter((p) => !props.understoodGrammarIds.includes(p.id))
})

const unmasteredVocabCount = computed(() => {
  return Math.max(0, activeVocabList.value.length - props.memorizedVocabIds.length)
})
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Graduation Hero Card -->
    <div class="bg-white border-2 border-neutral-950 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden space-y-6">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-neutral-100 pb-6">
        <div class="space-y-2">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-300 rounded-full text-xs font-mono font-bold text-emerald-800">
            <TrophyIcon class="w-4 h-4 text-emerald-700" />
            <span>Sesi 08</span>
            <span>&bull;</span>
            <span>Rangkuman Capaian &amp; Kelulusan</span>
          </div>

          <h2 class="font-display text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight">
            Laporan Hasil Belajar Bab {{ props.lessonNumber }}
          </h2>

          <p class="text-sm text-neutral-600">
            Berikut ringkasan penguasaan kosakata, tata bahasa, dan akurasi latihan Bab {{ props.lessonNumber }} Anda.
          </p>
        </div>

        <!-- Big Score Pill -->
        <div class="bg-neutral-950 text-white rounded-2xl p-6 text-center min-w-[170px] shadow-lg shrink-0">
          <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-widest">Penguasaan Bab</div>
          <div class="font-display font-extrabold text-4xl sm:text-5xl tracking-tight text-white mt-1">
            {{ overallMasteryPercent }}%
          </div>
          <div class="text-xs text-emerald-400 font-mono mt-1 font-bold">
            +{{ props.xp }} Total XP
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
        <div class="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
          <div class="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Kosakata Hafal</div>
          <div class="font-display font-bold text-xl sm:text-2xl text-neutral-950">
            {{ props.memorizedVocabIds.length }} <span class="text-xs text-neutral-400 font-normal">/ {{ activeVocabList.length }}</span>
          </div>
          <div class="text-[11px] font-mono text-neutral-500">{{ vocabCompletionPercent }}%</div>
        </div>

        <div class="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
          <div class="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Tata Bahasa Paham</div>
          <div class="font-display font-bold text-xl sm:text-2xl text-neutral-950">
            {{ props.understoodGrammarIds.length }} <span class="text-xs text-neutral-400 font-normal">/ {{ activePatternList.length }}</span>
          </div>
          <div class="text-[11px] font-mono text-neutral-500">{{ grammarCompletionPercent }}%</div>
        </div>

        <div class="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
          <div class="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Target Mandiri</div>
          <div class="font-display font-bold text-xl sm:text-2xl text-neutral-950">
            {{ evalCompletionCount }} <span class="text-xs text-neutral-400 font-normal">/ {{ activeEvalIndicators.length }}</span>
          </div>
          <div class="text-[11px] font-mono flex items-center gap-1" :class="evalCompletionCount >= 6 ? 'text-emerald-700 font-bold' : 'text-neutral-500'">
            <CheckIcon v-if="evalCompletionCount >= 6" class="w-3.5 h-3.5" />
            <span>{{ evalCompletionCount >= 6 ? 'Memenuhi Syarat' : 'Target: Min 6' }}</span>
          </div>
        </div>

        <div class="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-1">
          <div class="text-[10px] font-mono uppercase tracking-wider text-neutral-400">Daily Streak</div>
          <div class="font-display font-bold text-xl sm:text-2xl text-neutral-950 flex items-center justify-center gap-1.5">
            <FireIcon class="w-5 h-5 text-amber-500" />
            <span>{{ props.streak }}</span>
          </div>
          <div class="text-[11px] font-mono text-neutral-500">Hari Berturut-turut</div>
        </div>
      </div>
    </div>

    <!-- Topics Completed Checklist (Sessions 1 - 8) -->
    <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-xs">
      <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
        <h3 class="font-display font-bold text-lg text-neutral-950">
          Daftar Topik Sesi yang Telah Selesai
        </h3>
        <span class="text-xs font-mono text-neutral-400">8 Sesi Kurikulum</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div
          v-for="s in activeSessionsList"
          :key="s.id"
          class="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200 flex items-center justify-between gap-3 cursor-pointer hover:border-neutral-950 transition-colors"
          @click="emit('go-to-session', s.number)"
        >
          <div class="flex items-center gap-2.5">
            <component :is="sessionIcons[s.number]" class="w-5 h-5 text-neutral-800 shrink-0" />
            <div>
              <div class="font-bold text-xs text-neutral-950">{{ s.title }}</div>
              <div class="text-[10px] text-neutral-500">{{ s.subtitle }}</div>
            </div>
          </div>
          <span class="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300 flex items-center gap-1">
            <CheckIcon class="w-3.5 h-3.5" />
            <span>Tuntas</span>
          </span>
        </div>
      </div>
    </div>

    <!-- Areas to Review / Needs Improvement -->
    <div
      v-if="unmasteredGrammar.length || unmasteredVocabCount > 0 || props.difficultVocabIds.length"
      class="bg-amber-50/60 border border-amber-300 rounded-3xl p-6 sm:p-8 space-y-4"
    >
      <div class="flex items-center gap-2 text-amber-900 font-display font-bold text-base">
        <ExclamationTriangleIcon class="w-5 h-5 text-amber-600 shrink-0" />
        <span>Topik yang Direkomendasikan untuk Diulang:</span>
      </div>

      <div class="space-y-2 text-xs text-neutral-700">
        <div v-if="unmasteredGrammar.length" class="space-y-1">
          <div class="font-semibold text-neutral-900">Tata Bahasa yang Belum Ditandai Paham:</div>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="p in unmasteredGrammar"
              :key="p.id"
              type="button"
              class="px-2.5 py-1 bg-white border border-amber-300 rounded-lg text-amber-950 hover:bg-amber-100 font-mono text-[11px] font-bold"
              @click="emit('go-to-session', 4)"
            >
              {{ p.title }} &rarr;
            </button>
          </div>
        </div>

        <div v-if="unmasteredVocabCount > 0" class="pt-1 flex items-center justify-between">
          <span>Masih ada <strong>{{ unmasteredVocabCount }} kosakata</strong> yang belum ditandai hafal.</span>
          <button
            type="button"
            class="underline font-bold text-neutral-900 font-mono text-[11px]"
            @click="emit('go-to-session', 3)"
          >
            Latihan Flashcard &rarr;
          </button>
        </div>
      </div>
    </div>

    <!-- 7 Evaluation Indicators Checklist -->
    <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
      <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Kriteria Kelulusan Mandiri</span>
          <h3 class="font-display font-bold text-lg text-neutral-950 mt-0.5">
            7 Indikator Kelulusan Bab {{ props.lessonNumber }}
          </h3>
        </div>
        <div class="text-right">
          <span class="text-xs font-mono font-bold" :class="evalCompletionCount >= 6 ? 'text-emerald-700' : 'text-neutral-500'">
            {{ evalCompletionCount }} / {{ activeEvalIndicators.length }} Tercapai
          </span>
        </div>
      </div>

      <div class="space-y-2.5">
        <div
          v-for="item in activeEvalIndicators"
          :key="item.id"
          class="p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3"
          :class="
            props.completedEvaluations.includes(item.id)
              ? 'bg-emerald-50/50 border-emerald-300'
              : 'bg-neutral-50 border-neutral-200 hover:border-neutral-950'
          "
          @click="emit('toggle-evaluation', item.id)"
        >
          <div class="flex items-center gap-3">
            <input
              type="checkbox"
              :checked="props.completedEvaluations.includes(item.id)"
              class="w-4 h-4 rounded text-neutral-950 focus:ring-neutral-950 cursor-pointer"
              @click.stop="emit('toggle-evaluation', item.id)"
            />
            <span
              class="text-xs sm:text-sm font-medium"
              :class="props.completedEvaluations.includes(item.id) ? 'text-neutral-950 font-bold' : 'text-neutral-700'"
            >
              {{ item.label }}
            </span>
          </div>

          <span
            class="text-[10px] font-mono px-2 py-0.5 rounded-full font-bold inline-flex items-center gap-1"
            :class="
              props.completedEvaluations.includes(item.id)
                ? 'bg-emerald-600 text-white'
                : 'bg-neutral-200 text-neutral-500'
            "
          >
            <CheckIcon v-if="props.completedEvaluations.includes(item.id)" class="w-3 h-3 text-white" />
            <span>{{ props.completedEvaluations.includes(item.id) ? 'Lulus' : 'Belum' }}</span>
          </span>
        </div>
      </div>

      <!-- Celebration Callout -->
      <div
        v-if="evalCompletionCount >= 6"
        class="p-4 bg-emerald-100/70 border border-emerald-300 rounded-2xl text-emerald-950 text-xs flex items-center gap-3"
      >
        <AcademicCapIcon class="w-8 h-8 text-emerald-800 shrink-0" />
        <div v-if="props.lessonNumber === 3">
          <strong>Selamat! Anda telah memenuhi syarat kelulusan Bab 3.</strong>
          <p class="text-[11px] text-emerald-800 mt-0.5">
            Anda telah menguasai sistem kata tunjuk lokasi (ここ・そこ・あそこ・どこ), bentuk sopan pelayanan (こちら・そちら・あちら・どちら), penyebutan lantai gedung (～かい), asal negara/produsen (どこの), serta transaksi belanja dan nominal harga Yen (いくら).
          </p>
        </div>
        <div v-else-if="props.lessonNumber === 2">
          <strong>Selamat! Anda telah memenuhi syarat kelulusan Bab 2.</strong>
          <p class="text-[11px] text-emerald-800 mt-0.5">
            Anda telah menguasai sistem kata tunjuk 3 zona (これ・それ・あれ), modifikasi nomina (この・その・あの), penegasan そう, perbedaan そうじゃありません/ちがいます, kalimat alternatif, dan kepemilikan の.
          </p>
        </div>
        <div v-else>
          <strong>Selamat! Anda telah memenuhi syarat kelulusan Bab 1.</strong>
          <p class="text-[11px] text-emerald-800 mt-0.5">
            Anda telah menguasai salam, perkenalan diri, partikel topik は, sangkalan じゃありません, tanya か, kesamaan も, dan afiliasi の.
          </p>
        </div>
      </div>
    </div>

    <!-- 5-Day Study Plan -->
    <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-5 shadow-xs">
      <div class="border-b border-neutral-100 pb-3">
        <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Roadmap Konsistensi</span>
        <h3 class="font-display font-bold text-lg text-neutral-950 mt-0.5">
          Rencana Belajar 5 Hari (5-Day Plan) Bab {{ props.lessonNumber }}
        </h3>
      </div>

      <div class="space-y-3">
        <div
          v-for="plan in activeStudyPlan"
          :key="plan.day"
          class="border rounded-2xl p-4 transition-all"
          :class="
            props.completedStudyDays.includes(plan.day)
              ? 'bg-neutral-50 border-emerald-300'
              : 'bg-white border-neutral-200 hover:border-neutral-950'
          "
        >
          <div class="flex items-center justify-between mb-1.5">
            <div class="flex items-center gap-2">
              <span
                class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold"
                :class="
                  props.completedStudyDays.includes(plan.day)
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-950 text-white'
                "
              >
                Hari 0{{ plan.day }}
              </span>
              <h4 class="font-bold text-xs sm:text-sm text-neutral-950">{{ plan.title }}</h4>
            </div>

            <button
              type="button"
              class="text-xs font-semibold px-3 py-1 rounded-full border transition-all inline-flex items-center gap-1"
              :class="
                props.completedStudyDays.includes(plan.day)
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
              "
              @click="emit('toggle-study-day', plan.day)"
            >
              <CheckIcon v-if="props.completedStudyDays.includes(plan.day)" class="w-3 h-3 text-white" />
              <span>{{ props.completedStudyDays.includes(plan.day) ? 'Selesai' : 'Tandai Selesai' }}</span>
            </button>
          </div>

          <div class="text-[11px] text-neutral-500 mb-2 font-medium">
            Fokus: {{ plan.focus }}
          </div>

          <ul class="space-y-1 text-[11px] text-neutral-700 pl-4 list-disc">
            <li v-for="(task, tIdx) in plan.tasks" :key="tIdx">
              {{ task }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Big Action: Switch Lesson -->
    <div class="pt-4 text-center sm:text-right space-y-2">
      <button
        v-if="props.lessonNumber === 1"
        type="button"
        class="w-full sm:w-auto px-8 py-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg inline-flex items-center justify-center gap-3 cursor-pointer"
        @click="emit('switch-lesson', 2)"
      >
        <span>Lanjut Belajar: Bab 2 — Benda &amp; Kata Tunjuk (これ・それ・あれ)</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>

      <button
        v-else-if="props.lessonNumber === 2"
        type="button"
        class="w-full sm:w-auto px-8 py-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg inline-flex items-center justify-center gap-3 cursor-pointer"
        @click="emit('switch-lesson', 3)"
      >
        <span>Lanjut Belajar: Bab 3 — Tempat, Lokasi &amp; Harga (ここ・そこ・あそこ)</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>

      <button
        v-else
        type="button"
        class="w-full sm:w-auto px-8 py-4 bg-neutral-950 hover:bg-neutral-800 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-lg inline-flex items-center justify-center gap-3 cursor-pointer"
        @click="emit('switch-lesson', 1)"
      >
        <span>Tinjau Ulang: Bab 1 — Perkenalan Diri (自己紹介)</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>

      <p class="text-[11px] text-neutral-400">
        Data hafalan dan skor XP Anda tersimpan otomatis di browser &amp; cloud.
      </p>
    </div>
  </div>
</template>
