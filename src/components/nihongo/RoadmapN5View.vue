<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { JLPT_N5_ROADMAP_DATA, type RoadmapStage, type RoadmapChapter } from '@/data/nihongoRoadmapN5'
import {
  MapIcon,
  CheckCircleIcon,
  BookOpenIcon,
  ArrowRightIcon,
  LanguageIcon,
  CalculatorIcon,
  IdentificationIcon,
  CubeIcon,
  BuildingOfficeIcon,
  TrophyIcon,
  SparklesIcon,
  ClockIcon,
  PaperAirplaneIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'

const emit = defineEmits<{
  (e: 'navigate-nav', navKey: string): void
  (e: 'switch-lesson', lessonNum: number): void
}>()

// Active stage filter: 'all' or stageNumber (0..5)
const selectedStage = ref<number | 'all'>('all')

// Flattened or filtered chapters with stage metadata
interface TimelineItem {
  stage: RoadmapStage
  chapter: RoadmapChapter
  isStageFirst: boolean
  isStageLast: boolean
  index: number
}

const timelineItems = computed<TimelineItem[]>(() => {
  const items: TimelineItem[] = []
  let globalIndex = 0

  const stagesToInclude = selectedStage.value === 'all'
    ? JLPT_N5_ROADMAP_DATA
    : JLPT_N5_ROADMAP_DATA.filter((s) => s.stageNumber === selectedStage.value)

  for (const stg of stagesToInclude) {
    stg.chapters.forEach((chap, idx) => {
      items.push({
        stage: stg,
        chapter: chap,
        isStageFirst: idx === 0,
        isStageLast: idx === stg.chapters.length - 1,
        index: globalIndex++,
      })
    })
  }

  return items
})

function getChapterIcon(chapNumber: number | string) {
  if (chapNumber === 'Kana') return LanguageIcon
  if (chapNumber === 'Suuji') return CalculatorIcon
  if (chapNumber === 1) return IdentificationIcon
  if (chapNumber === 2) return CubeIcon
  if (chapNumber === 3) return BuildingOfficeIcon
  if (chapNumber === 4) return ClockIcon
  if (chapNumber === 5) return PaperAirplaneIcon
  return BookOpenIcon
}

function handleChapterAction(chap: RoadmapChapter) {
  if (chap.id === 'kana-foundation') {
    emit('navigate-nav', 'kana')
  } else if (chap.id === 'numbers-foundation') {
    emit('navigate-nav', 'numbers')
  } else if (chap.id === 'kanji-foundation') {
    emit('navigate-nav', 'kanji')
  } else if (typeof chap.chapterNumber === 'number' && chap.chapterNumber <= 5) {
    emit('switch-lesson', chap.chapterNumber)
  }
}

// ==============================================================
// HORIZONTAL SCROLL & DRAG-TO-SCROLL LOGIC
// ==============================================================
const scrollContainer = ref<HTMLElement | null>(null)
const canScrollLeft = ref(false)
const canScrollRight = ref(true)
const scrollProgress = ref(0)

function updateScrollState() {
  if (!scrollContainer.value) return
  const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value
  canScrollLeft.value = scrollLeft > 10
  canScrollRight.value = scrollLeft + clientWidth < scrollWidth - 10

  const maxScroll = scrollWidth - clientWidth
  scrollProgress.value = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0
}

function scrollLeft() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: -380, behavior: 'smooth' })
}

function scrollRight() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: 380, behavior: 'smooth' })
}

function handleWheel(event: WheelEvent) {
  if (!scrollContainer.value) return
  if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
    const atStart = scrollContainer.value.scrollLeft <= 0 && event.deltaY < 0
    const atEnd =
      scrollContainer.value.scrollLeft + scrollContainer.value.clientWidth >=
        scrollContainer.value.scrollWidth - 5 && event.deltaY > 0
    if (!atStart && !atEnd) {
      event.preventDefault()
      scrollContainer.value.scrollLeft += event.deltaY
    }
  }
}

// Mouse Drag
const isMouseDown = ref(false)
const isDragging = ref(false)
let startX = 0
let startScrollLeft = 0

function onMouseDown(e: MouseEvent) {
  if (!scrollContainer.value) return
  const target = e.target as HTMLElement
  if (target.closest('button, a, input, select, textarea')) return

  isMouseDown.value = true
  isDragging.value = false
  startX = e.pageX - scrollContainer.value.offsetLeft
  startScrollLeft = scrollContainer.value.scrollLeft
}

function onWindowMouseMove(e: MouseEvent) {
  if (!isMouseDown.value || !scrollContainer.value) return
  const x = e.pageX - scrollContainer.value.offsetLeft
  const walk = x - startX
  if (Math.abs(walk) > 4) {
    isDragging.value = true
  }
  scrollContainer.value.scrollLeft = startScrollLeft - walk
}

function onWindowMouseUp() {
  if (!isMouseDown.value) return
  isMouseDown.value = false
  setTimeout(() => {
    isDragging.value = false
  }, 50)
}

function selectStage(stageNum: number | 'all') {
  selectedStage.value = stageNum
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ left: 0, behavior: 'smooth' })
  }
}

onMounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.addEventListener('scroll', updateScrollState, { passive: true })
    updateScrollState()
  }
  window.addEventListener('mousemove', onWindowMouseMove)
  window.addEventListener('mouseup', onWindowMouseUp)
})

onUnmounted(() => {
  if (scrollContainer.value) {
    scrollContainer.value.removeEventListener('scroll', updateScrollState)
  }
  window.removeEventListener('mousemove', onWindowMouseMove)
  window.removeEventListener('mouseup', onWindowMouseUp)
})
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto">
    <!-- Header Banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xs">
      <div class="space-y-2">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <MapIcon class="w-4 h-4 text-neutral-900" />
          <span>Timeline Jalur Belajar Resmi</span>
        </div>
        <h2 class="font-display text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
          Timeline Roadmap JLPT N5 (Minna no Nihongo)
        </h2>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed">
          Garis waktu horizontal terstruktur dari fondasi aksara & angka hingga Bab 25. Geser horizontal untuk menelusuri setiap simpul pembelajaran menuju kelulusan ujian level N5.
        </p>
      </div>

      <!-- Target Counter Badges -->
      <div class="grid grid-cols-3 gap-2 bg-white border border-neutral-200 rounded-2xl p-3 shadow-2xs shrink-0 text-center">
        <div class="p-2">
          <div class="font-mono font-black text-xl text-neutral-950">~800</div>
          <div class="text-[10px] font-mono text-neutral-400 uppercase">Kosakata</div>
        </div>
        <div class="p-2 border-x border-neutral-100">
          <div class="font-mono font-black text-xl text-neutral-950">~103</div>
          <div class="text-[10px] font-mono text-neutral-400 uppercase">Kanji N5</div>
        </div>
        <div class="p-2">
          <div class="font-mono font-black text-xl text-neutral-950">25</div>
          <div class="text-[10px] font-mono text-neutral-400 uppercase">Bab Materi</div>
        </div>
      </div>
    </div>

    <!-- Progress Tracker Card -->
    <div class="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="flex items-center gap-2 text-xs font-mono font-bold text-neutral-900">
          <SparklesIcon class="w-4 h-4 text-amber-500" />
          <span>Progress Timeline Saat Ini: Fondasi & Bab 1 - 4 Tersedia</span>
        </div>
        <p class="text-xs text-neutral-500">
          Modul Hiragana, Katakana, Angka N5, Bab 1 (Identitas), Bab 2 (Benda), Bab 3 (Tempat & Harga), dan Bab 4 (Waktu & Aktivitas) telah siap dipelajari dengan generator simulator.
        </p>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <div class="text-right">
          <div class="text-xs font-mono font-bold text-neutral-950">6 / 27 Modul Siap</div>
          <div class="text-[10px] font-mono text-emerald-600 font-bold">22.2% Kurikulum N5</div>
        </div>
        <div class="w-28 sm:w-36 bg-neutral-100 h-2.5 rounded-full overflow-hidden border border-neutral-200">
          <div class="bg-neutral-950 h-full rounded-full transition-all duration-500" style="width: 25%"></div>
        </div>
      </div>
    </div>

    <!-- Filter & Horizontal Controls Bar -->
    <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white border border-neutral-200 p-3 sm:p-4 rounded-2xl shadow-2xs">
      <!-- Stage Filter Pills -->
      <div class="flex flex-wrap items-center gap-2">
        <button
          type="button"
          class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border cursor-pointer"
          :class="
            selectedStage === 'all'
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
          "
          @click="selectStage('all')"
        >
          Semua Tahap (25 Bab)
        </button>

        <button
          v-for="stg in JLPT_N5_ROADMAP_DATA"
          :key="stg.id"
          type="button"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer flex items-center gap-1.5"
          :class="
            selectedStage === stg.stageNumber
              ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
              : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-950'
          "
          @click="selectStage(stg.stageNumber)"
        >
          <span>{{ stg.colorBadge }}</span>
        </button>
      </div>

      <!-- Navigation Arrows & Drag Hint -->
      <div class="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100">
        <span class="text-[11px] font-mono text-neutral-400 hidden sm:inline">
          Klik & seret untuk menggeser timeline
        </span>

        <div class="flex items-center gap-1.5">
          <button
            type="button"
            class="w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer"
            :class="
              canScrollLeft
                ? 'border-neutral-300 text-neutral-800 hover:border-neutral-950 hover:bg-neutral-50 shadow-2xs'
                : 'border-neutral-200 text-neutral-300 opacity-40 cursor-not-allowed'
            "
            :disabled="!canScrollLeft"
            title="Geser Kiri"
            @click="scrollLeft"
          >
            <ChevronLeftIcon class="w-4 h-4" />
          </button>
          <button
            type="button"
            class="w-8 h-8 rounded-xl border flex items-center justify-center transition-all cursor-pointer"
            :class="
              canScrollRight
                ? 'border-neutral-300 text-neutral-800 hover:border-neutral-950 hover:bg-neutral-50 shadow-2xs'
                : 'border-neutral-200 text-neutral-300 opacity-40 cursor-not-allowed'
            "
            :disabled="!canScrollRight"
            title="Geser Kanan"
            @click="scrollRight"
          >
            <ChevronRightIcon class="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- HORIZONTAL TIMELINE CONTAINER -->
    <!-- ============================================================== -->
    <div class="relative">
      <!-- Timeline Track with Drag to Scroll -->
      <div
        ref="scrollContainer"
        class="flex gap-6 overflow-x-auto pb-6 pt-4 px-2 select-none"
        :class="[
          isMouseDown ? 'cursor-grabbing' : 'cursor-grab',
          !isMouseDown ? 'scroll-smooth snap-x snap-mandatory' : ''
        ]"
        @wheel="handleWheel"
        @mousedown="onMouseDown"
      >
        <!-- Horizontal Timeline Cards -->
        <div
          v-for="(item, idx) in timelineItems"
          :key="item.chapter.id"
          class="w-[320px] sm:w-[360px] shrink-0 snap-start flex flex-col relative group"
        >
          <!-- Horizontal Timeline Node & Connecting Spine -->
          <div class="relative flex items-center mb-4">
            <!-- Spine Line passing through the node -->
            <div
              class="absolute top-1/2 -translate-y-1/2 h-1 bg-neutral-200 -z-0"
              :class="[
                idx === 0 ? 'left-6 right-0' : 'left-0 right-0'
              ]"
            ></div>

            <!-- Active progress fill on spine if chapter is available -->
            <div
              v-if="item.chapter.status === 'available'"
              class="absolute top-1/2 -translate-y-1/2 h-1 bg-emerald-500 -z-0"
              :class="[
                idx === 0 ? 'left-6 right-0' : 'left-0 right-0'
              ]"
            ></div>

            <!-- Timeline Milestone Dot / Node -->
            <div
              class="relative z-10 mx-auto w-10 h-10 rounded-2xl flex items-center justify-center font-mono font-bold text-xs shadow-md border ring-4 ring-neutral-50 transition-transform duration-200 group-hover:scale-110"
              :class="
                item.chapter.status === 'available'
                  ? 'bg-neutral-950 text-white border-neutral-950 ring-emerald-100'
                  : 'bg-white text-neutral-600 border-neutral-300'
              "
            >
              <CheckCircleIcon v-if="item.chapter.status === 'available'" class="w-5 h-5 text-emerald-400" />
              <span v-else>{{ typeof item.chapter.chapterNumber === 'number' ? item.chapter.chapterNumber : idx + 1 }}</span>
            </div>
          </div>

          <!-- Stage Group Tag (Shown above card) -->
          <div class="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-widest px-1 mb-2 font-bold">
            <span class="truncate">{{ item.stage.colorBadge }}</span>
            <span>{{ item.stage.japaneseTitle }}</span>
          </div>

          <!-- Chapter Card -->
          <div
            class="bg-white border rounded-2xl p-5 sm:p-6 transition-all duration-200 shadow-2xs hover:shadow-md flex flex-col justify-between flex-1 gap-4"
            :class="
              item.chapter.status === 'available'
                ? 'border-neutral-950 ring-1 ring-neutral-950/10'
                : 'border-neutral-200 hover:border-neutral-400'
            "
          >
            <!-- Card Body -->
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                    :class="
                      item.chapter.status === 'available'
                        ? 'bg-neutral-950 text-white'
                        : 'bg-neutral-100 text-neutral-500'
                    "
                  >
                    <component :is="getChapterIcon(item.chapter.chapterNumber)" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <span class="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold">
                        {{ typeof item.chapter.chapterNumber === 'number' ? `Bab ${item.chapter.chapterNumber}` : item.chapter.chapterNumber }}
                      </span>
                    </div>
                    <h4 class="font-display font-bold text-sm sm:text-base text-neutral-950 leading-snug">
                      {{ item.chapter.title }}
                    </h4>
                  </div>
                </div>

                <!-- Status Badge -->
                <span
                  class="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider font-bold shrink-0 flex items-center gap-1"
                  :class="
                    item.chapter.status === 'available'
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300 shadow-2xs'
                      : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                  "
                >
                  <CheckCircleIcon v-if="item.chapter.status === 'available'" class="w-3.5 h-3.5 text-emerald-700" />
                  <ClockIcon v-else class="w-3.5 h-3.5 text-neutral-400" />
                  <span>{{ item.chapter.status === 'available' ? 'Siap' : 'Rencana' }}</span>
                </span>
              </div>

              <!-- Japanese Subtitle -->
              <div class="text-xs font-mono text-neutral-500 border-b border-neutral-100 pb-2">
                {{ item.chapter.japaneseTitle }}
              </div>

              <!-- Summary Description -->
              <p class="text-xs text-neutral-600 leading-relaxed min-h-[3rem]">
                {{ item.chapter.summary }}
              </p>

              <!-- Grammar Points Pills -->
              <div class="space-y-1.5 pt-1">
                <div class="text-[10px] font-mono uppercase text-neutral-400 font-bold">
                  Pola Tata Bahasa Utama:
                </div>
                <div class="flex flex-wrap gap-1 min-h-[2.5rem]">
                  <span
                    v-for="(g, gIdx) in item.chapter.keyGrammar"
                    :key="gIdx"
                    class="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-50 text-neutral-800 border border-neutral-200"
                  >
                    {{ g }}
                  </span>
                </div>
              </div>

              <!-- Real Life Scenario Callout -->
              <div class="text-[11px] text-neutral-500 bg-neutral-50 p-2.5 rounded-xl border border-neutral-200/60 leading-relaxed min-h-[3.5rem]">
                <strong class="text-neutral-800 font-semibold">Topik Nyata:</strong> {{ item.chapter.realLifeTopic }}
              </div>
            </div>

            <!-- Card Footer Action -->
            <div class="pt-3 border-t border-neutral-100 flex items-center justify-between mt-auto">
              <div class="flex items-center gap-2 text-xs font-mono text-neutral-400">
                <span>{{ item.chapter.vocabCount }} Kosakata</span>
                <span v-if="item.chapter.kanjiCount > 0">&bull; {{ item.chapter.kanjiCount }} Kanji</span>
              </div>

              <!-- 1-Click Action Button -->
              <button
                v-if="item.chapter.status === 'available'"
                type="button"
                class="px-3.5 py-1.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                @click="handleChapterAction(item.chapter)"
              >
                <span>Mulai Belajar</span>
                <ArrowRightIcon class="w-3.5 h-3.5" />
              </button>

              <span v-else class="text-[11px] font-mono text-neutral-400 italic">
                Segera Hadir
              </span>
            </div>
          </div>
        </div>

        <!-- FINAL DESTINATION CARD: GRADUATION PIN (Shown at end of full list or stage 5) -->
        <div
          v-if="selectedStage === 'all' || selectedStage === 5"
          class="w-[320px] sm:w-[360px] shrink-0 snap-start flex flex-col relative group"
        >
          <!-- Horizontal Timeline Node & Connecting Spine -->
          <div class="relative flex items-center mb-4">
            <div class="absolute top-1/2 -translate-y-1/2 left-0 right-1/2 h-1 bg-amber-400 -z-0"></div>
            <div class="relative z-10 mx-auto w-10 h-10 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-mono font-bold text-xs shadow-lg border border-amber-600 ring-4 ring-amber-100 transition-transform duration-200 group-hover:scale-110">
              <TrophyIcon class="w-5 h-5 text-white" />
            </div>
          </div>

          <div class="flex items-center justify-between text-[10px] font-mono text-amber-600 uppercase tracking-widest px-1 mb-2 font-bold">
            <span>Puncak Garis Waktu</span>
            <span>合格 (Lulus)</span>
          </div>

          <!-- Graduation Destination Card -->
          <div class="bg-neutral-950 text-white border border-neutral-900 rounded-2xl p-5 sm:p-6 shadow-md flex flex-col justify-between flex-1 gap-4">
            <div class="space-y-3">
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0">
                    <TrophyIcon class="w-5 h-5" />
                  </div>
                  <div>
                    <span class="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold">
                      Goal Akhir
                    </span>
                    <h4 class="font-display font-bold text-base text-white leading-snug">
                      Kelulusan JLPT N5
                    </h4>
                  </div>
                </div>
              </div>

              <div class="text-xs font-mono text-neutral-400 border-b border-neutral-800 pb-2">
                日本語能力試験 N5
              </div>

              <p class="text-xs text-neutral-300 leading-relaxed min-h-[3rem]">
                Kompetensi membaca teks pendek sehari-hari, memahami pola kalimat dasar Minna no Nihongo 1-25, dan kelulusan ujian resmi sertifikasi bahasa Jepang internasional.
              </p>

              <div class="space-y-1.5 pt-1">
                <div class="text-[10px] font-mono uppercase text-neutral-400 font-bold">
                  Standar Kompetensi N5:
                </div>
                <div class="flex flex-wrap gap-1 min-h-[2.5rem]">
                  <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-900 text-neutral-200 border border-neutral-800">
                    ~800 Kosakata
                  </span>
                  <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-900 text-neutral-200 border border-neutral-800">
                    ~103 Kanji
                  </span>
                  <span class="px-2 py-0.5 rounded text-[11px] font-mono bg-neutral-900 text-neutral-200 border border-neutral-800">
                    Mendengarkan Dasar
                  </span>
                </div>
              </div>

              <div class="text-[11px] text-neutral-400 bg-neutral-900 p-2.5 rounded-xl border border-neutral-800 leading-relaxed min-h-[3.5rem]">
                <strong class="text-neutral-200 font-semibold">Tujuan:</strong> Siap bekerja, studi di Jepang, atau melangkah ke level JLPT N4.
              </div>
            </div>

            <div class="pt-3 border-t border-neutral-800 flex items-center justify-between mt-auto">
              <span class="text-xs font-mono text-neutral-400">Target Resmi</span>
              <button
                type="button"
                class="px-3.5 py-1.5 rounded-xl bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                @click="emit('navigate-nav', 'kana')"
              >
                <span>Mulai Belajar</span>
                <ArrowRightIcon class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Horizontal Progress Indicator Bar -->
      <div class="mt-2 bg-neutral-100 h-1.5 rounded-full overflow-hidden border border-neutral-200">
        <div
          class="bg-neutral-950 h-full rounded-full transition-all duration-150"
          :style="{ width: `${Math.max(5, scrollProgress)}%` }"
        ></div>
      </div>
    </div>

    <!-- Exam Target Graduation Callout Banner -->
    <div class="bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
      <div class="space-y-2 max-w-xl">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
          <TrophyIcon class="w-4 h-4 text-amber-400" />
          <span>Kriteria Kelulusan JLPT N5</span>
        </div>
        <h3 class="font-display font-extrabold text-2xl text-white tracking-tight">
          Target Ujian Resmi JLPT N5
        </h3>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Setelah menyelesaikan 25 bab Minna no Nihongo dan menguasai sekitar 800 kosakata serta 100 kanji dasar, Anda memiliki kompetensi penuh untuk lulus Ujian Kemampuan Bahasa Jepang (JLPT) level N5.
        </p>
      </div>

      <div class="flex items-center gap-3 shrink-0">
        <button
          type="button"
          class="px-5 py-3 bg-white hover:bg-neutral-100 text-neutral-950 text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer"
          @click="emit('navigate-nav', 'kana')"
        >
          Mulai Dari Huruf Kana &rarr;
        </button>
      </div>
    </div>
  </div>
</template>