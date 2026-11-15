<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import { VOCABULARIES_DATA } from '@/data/nihongoLesson1'
import {
  SpeakerWaveIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  BookOpenIcon,
  ArrowPathIcon,
  LanguageIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TableCellsIcon,
  MagnifyingGlassIcon,
} from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    showRomaji: boolean
    memorizedVocabIds: string[]
    difficultVocabIds: string[]
    vocabularies?: any[]
    lessonNumber?: number
  }>(),
  {
    vocabularies: () => VOCABULARIES_DATA,
    lessonNumber: 1,
  }
)

const activeVocabs = computed(() => props.vocabularies || VOCABULARIES_DATA)

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'toggle-memorized', id: string): void
  (e: 'toggle-difficult', id: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

// Sub-mode: 'grid' (Interactive Horizontal List Cards), 'drill' (Card Flip Drill), 'trans-ja-id', 'trans-id-ja'
type VocabSubMode = 'grid' | 'drill' | 'trans-ja-id' | 'trans-id-ja'
const subMode = ref<VocabSubMode>('grid')

// Table Dialog Modal State
const isTableModalOpen = ref(false)
const tableSearchQuery = ref('')
const tableCategoryFilter = ref('Semua')

function openTableModal() {
  isTableModalOpen.value = true
  tableSearchQuery.value = searchQuery.value
  tableCategoryFilter.value = selectedCategory.value
}

function closeTableModal() {
  isTableModalOpen.value = false
}

function handleTableModalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isTableModalOpen.value) {
    closeTableModal()
  }
}

watch(isTableModalOpen, (isOpen) => {
  if (typeof document !== 'undefined') {
    document.body.style.overflow = isOpen ? 'hidden' : ''
  }
})

// Category filter & search
const selectedCategory = ref<string>('Semua')
const searchQuery = ref<string>('')

// Horizontal Scroll State & Actions
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
  scrollContainer.value.scrollBy({ left: -340, behavior: 'smooth' })
}

function scrollRight() {
  if (!scrollContainer.value) return
  scrollContainer.value.scrollBy({ left: 340, behavior: 'smooth' })
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

// Mouse Drag-to-Scroll State & Handlers
const isMouseDown = ref(false)
const isDragging = ref(false)
let startX = 0
let startScrollLeft = 0

function onMouseDown(e: MouseEvent) {
  if (!scrollContainer.value) return
  // Don't drag if user clicked on button, link, input, etc.
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

function onCategoryChange(cat: string) {
  selectedCategory.value = cat
  if (scrollContainer.value) {
    scrollContainer.value.scrollTo({ left: 0, behavior: 'smooth' })
  }
}

// Card Flip Drill State
const drillIndex = ref(0)
const isCardFlipped = ref(false)
const drillFilter = ref<'all' | 'unmemorized' | 'difficult'>('all')

// Translation practice state
const transIndex = ref(0)
const transAnswer = ref<string | null>(null)
const transScore = ref(0)

const categories = computed(() => {
  const set = new Set<string>()
  for (const v of activeVocabs.value) {
    set.add(v.category)
  }
  return ['Semua', ...Array.from(set)]
})

const filteredVocabs = computed(() => {
  return activeVocabs.value.filter((v) => {
    const matchCat = selectedCategory.value === 'Semua' || v.category === selectedCategory.value
    const q = searchQuery.value.trim().toLowerCase()
    const matchSearch =
      !q ||
      v.japanese.toLowerCase().includes(q) ||
      v.romaji.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q)
    return matchCat && matchSearch
  })
})

const tableFilteredVocabs = computed(() => {
  return activeVocabs.value.filter((v) => {
    const matchCat = tableCategoryFilter.value === 'Semua' || v.category === tableCategoryFilter.value
    const q = tableSearchQuery.value.trim().toLowerCase()
    const matchSearch =
      !q ||
      v.japanese.toLowerCase().includes(q) ||
      v.romaji.toLowerCase().includes(q) ||
      v.meaning.toLowerCase().includes(q)
    return matchCat && matchSearch
  })
})

watch([filteredVocabs, selectedCategory], () => {
  nextTick(() => {
    updateScrollState()
  })
})

onMounted(() => {
  document.addEventListener('keydown', handleTableModalKeydown)
  window.addEventListener('mousemove', onWindowMouseMove)
  window.addEventListener('mouseup', onWindowMouseUp)
  nextTick(() => {
    updateScrollState()
  })
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleTableModalKeydown)
  window.removeEventListener('mousemove', onWindowMouseMove)
  window.removeEventListener('mouseup', onWindowMouseUp)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})

const drillPool = computed(() => {
  return activeVocabs.value.filter((v) => {
    if (drillFilter.value === 'difficult') return props.difficultVocabIds.includes(v.id)
    if (drillFilter.value === 'unmemorized') return !props.memorizedVocabIds.includes(v.id)
    return true
  })
})

const currentDrillCard = computed(() => {
  if (!drillPool.value.length) return null
  const idx = Math.abs(drillIndex.value) % drillPool.value.length
  return drillPool.value[idx]
})

function nextDrill() {
  isCardFlipped.value = false
  drillIndex.value++
}

function prevDrill() {
  isCardFlipped.value = false
  if (drillIndex.value > 0) drillIndex.value--
  else drillIndex.value = Math.max(0, drillPool.value.length - 1)
}

function handleMarkMastered(id: string) {
  emit('toggle-memorized', id)
  emit('gain-xp', 10)
}

// Translation Drill Generator
const currentTransQuestion = computed(() => {
  const list = activeVocabs.value.length ? activeVocabs.value : VOCABULARIES_DATA
  const v = list[transIndex.value % list.length]
  const distractors = list
    .filter((item) => item.id !== v.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 3)
  const options = [v, ...distractors].sort(() => 0.5 - Math.random())
  return {
    item: v,
    options,
  }
})

function answerTranslation(selectedId: string) {
  transAnswer.value = selectedId
  if (selectedId === currentTransQuestion.value.item.id) {
    transScore.value++
    emit('gain-xp', 15)
    emit('play-audio', currentTransQuestion.value.item.japanese)
  }
}

function nextTranslationQuestion() {
  transAnswer.value = null
  const list = activeVocabs.value.length ? activeVocabs.value : VOCABULARIES_DATA
  transIndex.value = (transIndex.value + 1) % list.length
}
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">3</span>
          <span>Sesi 3: Kosakata Inti (単語 &bull; Tango) Bab {{ props.lessonNumber }}</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-neutral-950">
          {{ activeVocabs.length }} Kosakata Kunci Bab {{ props.lessonNumber }}
        </h2>
        <p class="text-xs text-neutral-600">
          Pelajari kosakata melalui deretan kartu horizontal nyaman atau buka dialog tabel untuk melihat daftar lengkap.
        </p>
      </div>

      <!-- Mode Selector Pills -->
      <div class="flex flex-wrap items-center p-1 bg-white border border-neutral-200 rounded-xl shadow-xs self-start md:self-center gap-1">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="subMode === 'grid' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'grid'"
        >
          <BookOpenIcon class="w-3.5 h-3.5" />
          <span>List Horizontal</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="subMode === 'drill' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'drill'"
        >
          <ArrowPathIcon class="w-3.5 h-3.5" />
          <span>Flip Card Drill</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="subMode === 'trans-ja-id' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'trans-ja-id'; transAnswer = null"
        >
          <LanguageIcon class="w-3.5 h-3.5" />
          <span>JP &rarr; ID</span>
        </button>
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
          :class="subMode === 'trans-id-ja' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'trans-id-ja'; transAnswer = null"
        >
          <LanguageIcon class="w-3.5 h-3.5" />
          <span>ID &rarr; JP</span>
        </button>
        <!-- Table Dialog Trigger in Header -->
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 border border-neutral-200 bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-800 cursor-pointer shadow-2xs"
          title="Buka dialog tabel kosakata lengkap"
          @click="openTableModal"
        >
          <TableCellsIcon class="w-3.5 h-3.5" />
          <span>Tabel</span>
        </button>
      </div>
    </div>

    <!-- SUB-MODE 1: HORIZONTAL LIST OF CARDS -->
    <div v-if="subMode === 'grid'" class="space-y-4">
      <!-- Search & Category Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="cat in categories"
            :key="cat"
            type="button"
            class="px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer"
            :class="
              selectedCategory === cat
                ? 'bg-neutral-950 text-white shadow-xs'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950'
            "
            @click="onCategoryChange(cat)"
          >
            {{ cat }}
          </button>
        </div>

        <div class="flex items-center gap-2">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Cari arti / romaji..."
            class="px-3.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-950 focus:bg-white w-full sm:w-44"
          />
        </div>
      </div>

      <!-- Navigation & Status Toolbar -->
      <div class="flex items-center justify-between bg-neutral-50/80 border border-neutral-200 rounded-xl px-4 py-2.5">
        <div class="flex items-center gap-2 text-xs font-mono text-neutral-600">
          <span class="font-bold text-neutral-950">{{ filteredVocabs.length }}</span>
          <span>kosakata</span>
          <span class="text-neutral-300">&bull;</span>
          <span class="text-[11px] text-neutral-500 hidden sm:inline">Geser horizontal atau buka format tabel</span>
        </div>

        <!-- Controls: Table modal trigger + Prev & Next buttons -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-950 hover:text-white text-neutral-800 text-xs font-semibold transition-all shadow-2xs flex items-center gap-1.5 cursor-pointer"
            title="Buka daftar kosakata lengkap dalam dialog tabel"
            @click="openTableModal"
          >
            <TableCellsIcon class="w-3.5 h-3.5" />
            <span>Lihat Tabel</span>
          </button>

          <div class="flex items-center gap-1 border-l border-neutral-200 pl-2">
            <button
              type="button"
              class="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
              :disabled="!canScrollLeft"
              title="Geser ke kiri"
              @click="scrollLeft"
            >
              <ChevronLeftIcon class="w-4 h-4" />
            </button>
            <button
              type="button"
              class="p-1.5 rounded-lg border border-neutral-200 bg-white hover:bg-neutral-100 text-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-2xs cursor-pointer"
              :disabled="!canScrollRight"
              title="Geser ke kanan"
              @click="scrollRight"
            >
              <ChevronRightIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- Horizontal Cards Container -->
      <div v-if="filteredVocabs.length" class="relative">
        <!-- Edge Fades -->
        <div
          v-if="canScrollLeft"
          class="pointer-events-none absolute left-0 top-0 bottom-4 w-10 bg-gradient-to-r from-white to-transparent z-10 rounded-l-2xl"
        ></div>
        <div
          v-if="canScrollRight"
          class="pointer-events-none absolute right-0 top-0 bottom-4 w-10 bg-gradient-to-l from-white to-transparent z-10 rounded-r-2xl"
        ></div>

        <div
          ref="scrollContainer"
          class="flex gap-4 overflow-x-auto pb-4 pt-1 px-1 transition-colors select-none"
          :class="
            isMouseDown
              ? 'cursor-grabbing snap-none scroll-auto'
              : 'cursor-grab snap-x snap-mandatory scroll-smooth'
          "
          style="scrollbar-width: thin; scrollbar-color: #A3A3A3 transparent;"
          @mousedown="onMouseDown"
          @scroll="updateScrollState"
          @wheel="handleWheel"
        >
          <div
            v-for="v in filteredVocabs"
            :key="v.id"
            class="w-[280px] sm:w-[320px] shrink-0 snap-start bg-white border rounded-2xl p-5 flex flex-col justify-between gap-4 transition-all duration-200 shadow-xs hover:shadow hover:-translate-y-0.5 select-none"
            :class="
              props.memorizedVocabIds.includes(v.id)
                ? 'border-emerald-300 bg-emerald-50/20'
                : props.difficultVocabIds.includes(v.id)
                ? 'border-amber-300 bg-amber-50/20'
                : 'border-neutral-200 hover:border-neutral-950'
            "
          >
            <div class="space-y-2">
              <div class="flex items-start justify-between gap-2">
                <span class="font-display font-bold text-3xl text-neutral-950 font-sans tracking-wide">
                  {{ v.japanese }}
                </span>
                <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 text-neutral-600 shrink-0">
                  {{ v.category }}
                </span>
              </div>

              <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400">
                {{ v.romaji }}
              </div>

              <div class="text-sm font-semibold text-neutral-800 pt-0.5">
                {{ v.meaning }}
              </div>

              <p v-if="v.notes" class="text-[11px] text-neutral-500 italic pt-1 leading-relaxed line-clamp-2">
                &bull; {{ v.notes }}
              </p>
            </div>

            <!-- Bottom controls -->
            <div class="flex items-center justify-between pt-3 border-t border-neutral-100">
              <!-- Audio Button -->
              <button
                type="button"
                class="p-2 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white transition-colors text-neutral-700 cursor-pointer"
                title="Dengarkan pengucapan"
                @click="emit('play-audio', v.japanese)"
              >
                <SpeakerWaveIcon class="w-4 h-4" />
              </button>

              <!-- Actions: Sulit & Hafal -->
              <div class="flex items-center gap-1.5">
                <button
                  type="button"
                  class="px-2.5 py-1.5 rounded-lg text-[11px] font-medium border transition-colors flex items-center gap-1 cursor-pointer"
                  :class="
                    props.difficultVocabIds.includes(v.id)
                      ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                      : 'bg-white text-neutral-400 border-neutral-200 hover:text-amber-700'
                  "
                  title="Tandai sulit untuk latihan ulang"
                  @click="emit('toggle-difficult', v.id)"
                >
                  <ExclamationTriangleIcon v-if="props.difficultVocabIds.includes(v.id)" class="w-3 h-3 text-amber-800" />
                  <span>{{ props.difficultVocabIds.includes(v.id) ? 'Sulit' : 'Sulit?' }}</span>
                </button>

                <button
                  type="button"
                  class="px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all flex items-center gap-1 cursor-pointer"
                  :class="
                    props.memorizedVocabIds.includes(v.id)
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                      : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-950'
                  "
                  @click="handleMarkMastered(v.id)"
                >
                  <CheckIcon v-if="props.memorizedVocabIds.includes(v.id)" class="w-3 h-3 text-white" />
                  <span>{{ props.memorizedVocabIds.includes(v.id) ? 'Dikuasai' : 'Tandai Hafal' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Horizontal Scroll Progress Indicator -->
        <div class="mt-2 flex items-center justify-between text-[11px] font-mono text-neutral-400">
          <div class="flex items-center gap-1.5">
            <span>Navigasi:</span>
            <kbd class="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px] text-neutral-600">&larr;</kbd>
            <kbd class="px-1.5 py-0.5 bg-neutral-100 border border-neutral-200 rounded text-[10px] text-neutral-600">&rarr;</kbd>
            <span class="hidden sm:inline">klik & geser mouse, scroll touchpad, atau tombol panah</span>
          </div>
          <div class="w-28 bg-neutral-200 h-1 rounded-full overflow-hidden">
            <div
              class="bg-neutral-950 h-full transition-all duration-150"
              :style="{ width: `${Math.max(8, scrollProgress)}%` }"
            ></div>
          </div>
        </div>
      </div>

      <div v-else class="text-center p-8 bg-neutral-50 rounded-2xl border border-neutral-200 text-xs text-neutral-500">
        Tidak ada kosakata yang cocok dengan pencarian atau filter.
      </div>
    </div>

    <!-- SUB-MODE 2: 3D FLIP CARD DRILL -->
    <div v-else-if="subMode === 'drill'" class="max-w-xl mx-auto space-y-6">
      <div class="flex items-center justify-between p-3 bg-neutral-100 rounded-xl text-xs font-mono">
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg"
            :class="drillFilter === 'all' ? 'bg-neutral-950 text-white' : 'text-neutral-600'"
            @click="drillFilter = 'all'; drillIndex = 0"
          >
            Semua ({{ activeVocabs.length }})
          </button>
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg"
            :class="drillFilter === 'unmemorized' ? 'bg-neutral-950 text-white' : 'text-neutral-600'"
            @click="drillFilter = 'unmemorized'; drillIndex = 0"
          >
            Belum Hafal ({{ Math.max(0, activeVocabs.length - props.memorizedVocabIds.length) }})
          </button>
          <button
            type="button"
            class="px-2.5 py-1 rounded-lg"
            :class="drillFilter === 'difficult' ? 'bg-neutral-950 text-white' : 'text-neutral-600'"
            @click="drillFilter = 'difficult'; drillIndex = 0"
          >
            Sulit ({{ props.difficultVocabIds.length }})
          </button>
        </div>
        <span v-if="currentDrillCard">
          Kartu {{ (drillIndex % drillPool.length) + 1 }}/{{ drillPool.length }}
        </span>
      </div>

      <div v-if="currentDrillCard" class="space-y-6">
        <!-- 3D Card Box -->
        <div
          class="w-full min-h-[320px] bg-white border-2 border-neutral-950 rounded-3xl p-8 flex flex-col justify-between items-center text-center cursor-pointer shadow-xl transition-all duration-300 relative select-none hover:shadow-2xl"
          @click="isCardFlipped = !isCardFlipped"
        >
          <div class="w-full flex items-center justify-between text-xs font-mono text-neutral-400">
            <span class="uppercase tracking-widest">{{ currentDrillCard.category }}</span>
            <span class="text-neutral-400">Klik kartu untuk membalik &larr;&rarr;</span>
          </div>

          <!-- Front (Japanese) -->
          <div v-if="!isCardFlipped" class="my-auto space-y-3">
            <div class="font-display font-bold text-5xl sm:text-6xl text-neutral-950 tracking-wider font-sans">
              {{ currentDrillCard.japanese }}
            </div>
            <div v-if="props.showRomaji" class="text-sm font-mono text-neutral-400">
              {{ currentDrillCard.romaji }}
            </div>
            <div class="text-xs text-neutral-400 italic pt-2">
              (Ketuk kartu untuk melihat arti bahasa Indonesia)
            </div>
          </div>

          <!-- Back (Indonesian) -->
          <div v-else class="my-auto space-y-3">
            <div class="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Arti / Makna
            </div>
            <div class="font-display font-bold text-3xl sm:text-4xl text-neutral-950">
              {{ currentDrillCard.meaning }}
            </div>
            <div class="text-sm font-mono text-neutral-500">
              {{ currentDrillCard.japanese }} &bull; {{ currentDrillCard.romaji }}
            </div>
            <p v-if="currentDrillCard.notes" class="text-xs text-neutral-500 max-w-sm mx-auto">
              {{ currentDrillCard.notes }}
            </p>
          </div>

          <!-- Bottom Card Controls -->
          <div class="w-full flex items-center justify-between pt-4 border-t border-neutral-100">
            <button
              type="button"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white transition-colors text-xs font-mono cursor-pointer"
              @click.stop="emit('play-audio', currentDrillCard.japanese)"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
              <span>Dengarkan</span>
            </button>

            <button
              type="button"
              class="px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer flex items-center gap-1.5"
              :class="
                props.memorizedVocabIds.includes(currentDrillCard.id)
                  ? 'bg-emerald-600 text-white'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              "
              @click.stop="handleMarkMastered(currentDrillCard.id)"
            >
              <CheckIcon v-if="props.memorizedVocabIds.includes(currentDrillCard.id)" class="w-3.5 h-3.5" />
              <span>{{ props.memorizedVocabIds.includes(currentDrillCard.id) ? 'Sudah Dikuasai' : 'Tandai Hafal' }}</span>
            </button>
          </div>
        </div>

        <!-- Controls Nav -->
        <div class="flex items-center justify-between gap-4">
          <button
            type="button"
            class="flex-1 py-3 bg-white border border-neutral-200 hover:border-neutral-950 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
            @click="prevDrill"
          >
            <ArrowLeftIcon class="w-3.5 h-3.5" />
            <span>Kartu Sebelumnya</span>
          </button>
          <button
            type="button"
            class="flex-1 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-2xl text-xs font-bold uppercase tracking-widest transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            @click="nextDrill"
          >
            <span>Kartu Berikutnya</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div v-else class="text-center p-10 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3">
        <p class="text-sm text-neutral-600">Tidak ada kartu dalam filter ini.</p>
        <button
          type="button"
          class="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-semibold"
          @click="drillFilter = 'all'"
        >
          Tampilkan Semua
        </button>
      </div>
    </div>

    <!-- SUB-MODE 3 & 4: TRANSLATION DRILL -->
    <div v-else class="max-w-xl mx-auto space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div class="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-100 pb-3">
          <span>
            {{ subMode === 'trans-ja-id' ? 'Latihan: Bahasa Jepang → Bahasa Indonesia' : 'Latihan: Bahasa Indonesia → Bahasa Jepang' }}
          </span>
          <span class="font-bold text-neutral-900">Skor: {{ transScore }}</span>
        </div>

        <div class="text-center space-y-3 py-3">
          <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
            {{ subMode === 'trans-ja-id' ? 'Pilih arti bahasa Indonesia yang tepat:' : 'Pilih penulisan bahasa Jepang yang tepat:' }}
          </div>
          <div class="font-display font-extrabold text-3xl sm:text-4xl text-neutral-950 font-sans">
            {{ subMode === 'trans-ja-id' ? currentTransQuestion.item.japanese : currentTransQuestion.item.meaning }}
          </div>
          <div v-if="subMode === 'trans-ja-id' && props.showRomaji" class="text-xs font-mono text-neutral-400">
            {{ currentTransQuestion.item.romaji }}
          </div>
        </div>

        <!-- Options -->
        <div class="space-y-2.5">
          <button
            v-for="opt in currentTransQuestion.options"
            :key="opt.id"
            type="button"
            class="w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between gap-3 cursor-pointer"
            :class="
              transAnswer === opt.id
                ? opt.id === currentTransQuestion.item.id
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                  : 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                : 'bg-white border-neutral-200 hover:border-neutral-950 text-neutral-800'
            "
            @click="answerTranslation(opt.id)"
          >
            <span>
              {{ subMode === 'trans-ja-id' ? opt.meaning : `${opt.japanese} (${opt.romaji})` }}
            </span>
            <span v-if="transAnswer === opt.id" class="flex items-center gap-1 text-xs">
              <template v-if="opt.id === currentTransQuestion.item.id">
                <CheckIcon class="w-4 h-4 text-emerald-600 font-bold" />
                <span>Benar</span>
              </template>
              <template v-else>
                <XMarkIcon class="w-4 h-4 text-rose-600 font-bold" />
                <span>Salah</span>
              </template>
            </span>
          </button>
        </div>

        <!-- Next button -->
        <div v-if="transAnswer" class="pt-3 border-t border-neutral-100 flex items-center justify-end">
          <button
            type="button"
            class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
            @click="nextTranslationQuestion"
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
        Kosakata telah siap? Lanjutkan ke tata bahasa visual.
      </span>
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 4: Tata Bahasa (文法)</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>

    <!-- TABLE VIEW MODAL DIALOG -->
    <Teleport to="body">
      <div
        v-if="isTableModalOpen"
        role="dialog"
        aria-modal="true"
        aria-labelledby="vocab-table-title"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/75 backdrop-blur-xs transition-all duration-200"
        @click.self="closeTableModal"
      >
        <div
          class="bg-white border border-neutral-200 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        >
          <!-- Modal Header -->
          <div class="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between gap-4 bg-neutral-50/50">
            <div class="space-y-1">
              <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-500">
                <TableCellsIcon class="w-4 h-4 text-neutral-900" />
                <span>Daftar Kosakata Lengkap &bull; Bab {{ props.lessonNumber }}</span>
              </div>
              <h3 id="vocab-table-title" class="font-display text-xl font-bold text-neutral-950">
                Tabel Kosakata (単語一覧)
              </h3>
            </div>

            <!-- Close button -->
            <button
              type="button"
              class="p-2 rounded-full hover:bg-neutral-200 transition-colors text-neutral-600 hover:text-neutral-950 cursor-pointer"
              title="Tutup dialog"
              @click="closeTableModal"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Modal Filter & Search Bar -->
          <div class="p-4 sm:px-6 border-b border-neutral-100 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <!-- Category Pills -->
            <div class="flex flex-wrap gap-1.5 max-h-20 overflow-y-auto">
              <button
                v-for="cat in categories"
                :key="cat"
                type="button"
                class="px-2.5 py-1 rounded-full text-xs font-medium transition-all cursor-pointer"
                :class="
                  tableCategoryFilter === cat
                    ? 'bg-neutral-950 text-white shadow-2xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950'
                "
                @click="tableCategoryFilter = cat"
              >
                {{ cat }}
              </button>
            </div>

            <!-- Search Field -->
            <div class="relative w-full sm:w-56 shrink-0">
              <MagnifyingGlassIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                v-model="tableSearchQuery"
                type="text"
                placeholder="Cari kanji / romaji / arti..."
                class="w-full pl-9 pr-3.5 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-full focus:outline-none focus:border-neutral-950 focus:bg-white"
              />
            </div>
          </div>

          <!-- Modal Table Body (Scrollable) -->
          <div class="flex-1 overflow-y-auto overflow-x-auto p-4 sm:p-6" style="scrollbar-width: thin;">
            <table class="w-full text-left border-collapse text-xs">
              <thead class="sticky top-0 bg-white border-b-2 border-neutral-200 z-10">
                <tr class="text-neutral-400 font-mono text-[11px] uppercase tracking-wider">
                  <th class="py-2.5 px-3">No</th>
                  <th class="py-2.5 px-3">Bahasa Jepang</th>
                  <th class="py-2.5 px-3">Romaji</th>
                  <th class="py-2.5 px-3">Kategori</th>
                  <th class="py-2.5 px-3">Arti (Indonesia)</th>
                  <th class="py-2.5 px-3">Catatan</th>
                  <th class="py-2.5 px-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-neutral-100">
                <tr
                  v-for="(v, index) in tableFilteredVocabs"
                  :key="v.id"
                  class="hover:bg-neutral-50/80 transition-colors group"
                  :class="
                    props.memorizedVocabIds.includes(v.id)
                      ? 'bg-emerald-50/20'
                      : props.difficultVocabIds.includes(v.id)
                      ? 'bg-amber-50/20'
                      : ''
                  "
                >
                  <!-- No & Status indicator -->
                  <td class="py-3 px-3 font-mono text-neutral-400 whitespace-nowrap">
                    <div class="flex items-center gap-1.5">
                      <span>{{ index + 1 }}</span>
                      <span
                        v-if="props.memorizedVocabIds.includes(v.id)"
                        class="w-1.5 h-1.5 rounded-full bg-emerald-500"
                        title="Dikuasai"
                      ></span>
                      <span
                        v-else-if="props.difficultVocabIds.includes(v.id)"
                        class="w-1.5 h-1.5 rounded-full bg-amber-500"
                        title="Sulit"
                      ></span>
                    </div>
                  </td>

                  <!-- Japanese Text & Audio inline -->
                  <td class="py-3 px-3 whitespace-nowrap">
                    <div class="flex items-center gap-2">
                      <span class="font-display font-bold text-base text-neutral-950 font-sans">
                        {{ v.japanese }}
                      </span>
                      <button
                        type="button"
                        class="p-1 rounded-full bg-neutral-100 group-hover:bg-neutral-200 hover:!bg-neutral-950 hover:!text-white transition-colors text-neutral-600 cursor-pointer"
                        title="Dengarkan pengucapan"
                        @click="emit('play-audio', v.japanese)"
                      >
                        <SpeakerWaveIcon class="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>

                  <!-- Romaji -->
                  <td class="py-3 px-3 font-mono text-neutral-500 whitespace-nowrap">
                    {{ v.romaji }}
                  </td>

                  <!-- Category -->
                  <td class="py-3 px-3 whitespace-nowrap">
                    <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 text-neutral-600 border border-neutral-200">
                      {{ v.category }}
                    </span>
                  </td>

                  <!-- Meaning -->
                  <td class="py-3 px-3 font-semibold text-neutral-800">
                    {{ v.meaning }}
                  </td>

                  <!-- Notes -->
                  <td class="py-3 px-3 text-neutral-500 italic max-w-xs text-[11px]">
                    {{ v.notes || '-' }}
                  </td>

                  <!-- Actions (Sulit & Hafal) -->
                  <td class="py-3 px-3 text-right whitespace-nowrap">
                    <div class="flex items-center justify-end gap-1.5">
                      <button
                        type="button"
                        class="px-2 py-1 rounded-md text-[10px] font-medium border transition-colors cursor-pointer"
                        :class="
                          props.difficultVocabIds.includes(v.id)
                            ? 'bg-amber-100 text-amber-900 border-amber-300 font-bold'
                            : 'bg-white text-neutral-400 border-neutral-200 hover:text-amber-700'
                        "
                        title="Tandai sulit"
                        @click="emit('toggle-difficult', v.id)"
                      >
                        {{ props.difficultVocabIds.includes(v.id) ? 'Sulit' : 'Sulit?' }}
                      </button>

                      <button
                        type="button"
                        class="px-2.5 py-1 rounded-md text-[10px] font-semibold border transition-all cursor-pointer flex items-center gap-1"
                        :class="
                          props.memorizedVocabIds.includes(v.id)
                            ? 'bg-emerald-600 text-white border-emerald-600'
                            : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-950'
                        "
                        title="Tandai hafal / dikuasai"
                        @click="handleMarkMastered(v.id)"
                      >
                        <CheckIcon v-if="props.memorizedVocabIds.includes(v.id)" class="w-3 h-3 text-white" />
                        <span>{{ props.memorizedVocabIds.includes(v.id) ? 'Dikuasai' : 'Hafal' }}</span>
                      </button>
                    </div>
                  </td>
                </tr>

                <tr v-if="!tableFilteredVocabs.length">
                  <td colspan="7" class="py-10 text-center text-neutral-400 font-mono">
                    Tidak ada kosakata yang cocok dengan pencarian atau filter.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Modal Footer -->
          <div class="p-4 px-6 border-t border-neutral-100 bg-neutral-50/50 flex items-center justify-between text-xs text-neutral-500 font-mono">
            <div>
              Total kosakata: <strong class="text-neutral-950">{{ tableFilteredVocabs.length }}</strong> dari {{ activeVocabs.length }}
            </div>
            <button
              type="button"
              class="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
              @click="closeTableModal"
            >
              Tutup Tabel
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
