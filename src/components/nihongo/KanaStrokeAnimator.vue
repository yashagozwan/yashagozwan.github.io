<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, nextTick } from 'vue'
import HanziWriter from 'hanzi-writer'
import {
  SpeakerWaveIcon,
  PlayIcon,
  ArrowPathIcon,
  PauseIcon,
  PencilSquareIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowsPointingOutIcon,
  XMarkIcon,
  CheckCircleIcon,
  LightBulbIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'
import { getHanziWriterKanaData, type HanziWriterCharData } from '@/data/kanaStrokeService'
import type { KanaCharacter } from '@/data/nihongoKana'

const props = defineProps<{
  kanaItem: KanaCharacter
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
}>()

// Active Mode: 'animate' (Animasi Urutan Coretan) | 'quiz' (Latihan Menulis Langsung)
const activeMode = ref<'animate' | 'quiz'>('animate')

// Animation Speed: 0.6 (Lambat), 1.0 (Normal), 1.5 (Cepat)
const speedMultiplier = ref<number>(1)

// Show Outline state
const showOutline = ref(true)

// State for multi-character kana (e.g. Youon like 'きゃ' -> ['き', 'ゃ'])
const kanaParts = computed<string[]>(() => {
  return Array.from(props.kanaItem.kana)
})
const selectedPartIndex = ref<number>(0)
const currentTargetChar = computed<string>(() => {
  return kanaParts.value[selectedPartIndex.value] || props.kanaItem.kana
})

// Fullscreen Modal state
const isFullscreen = ref(false)

// Writer DOM references
const writerContainerRef = ref<HTMLDivElement | null>(null)
const modalWriterContainerRef = ref<HTMLDivElement | null>(null)

let writer: HanziWriter | null = null
let modalWriter: HanziWriter | null = null

// Animation & Quiz Status
const isAnimating = ref(false)
const isLooping = ref(false)
const currentActiveStroke = ref<number | null>(null)

// Quiz State
const quizStatus = ref<'idle' | 'drawing' | 'success'>('idle')
const quizMistakes = ref<number>(0)
const quizMessage = ref<string>('Sentuh atau seret kursor pada kotak untuk mulai menulis.')

// Character stroke data
const charStrokeData = computed<HanziWriterCharData | null>(() => {
  return getHanziWriterKanaData(currentTargetChar.value)
})

const totalStrokes = computed<number>(() => {
  return charStrokeData.value?.strokes.length || 1
})

// Destroy existing writer
function destroyWriters() {
  if (writer) {
    try {
      writer.cancelQuiz()
      writer.pauseAnimation()
    } catch {
      // ignore
    }
    writer = null
  }
  if (modalWriter) {
    try {
      modalWriter.cancelQuiz()
      modalWriter.pauseAnimation()
    } catch {
      // ignore
    }
    modalWriter = null
  }
}

// Initialize HanziWriter on main canvas
function initMainWriter() {
  if (!writerContainerRef.value) return
  writerContainerRef.value.innerHTML = ''
  isAnimating.value = false
  isLooping.value = false
  currentActiveStroke.value = null

  const char = currentTargetChar.value
  const data = getHanziWriterKanaData(char)

  if (!data) return

  writer = HanziWriter.create(writerContainerRef.value, char, {
    width: 270,
    height: 270,
    padding: 24,
    strokeColor: '#0A0A0A',
    outlineColor: '#E5E5E5',
    highlightColor: '#404040',
    drawingColor: '#0A0A0A',
    showOutline: showOutline.value,
    showCharacter: activeMode.value === 'animate',
    strokeAnimationSpeed: speedMultiplier.value,
    delayBetweenStrokes: 200,
    charDataLoader: (c: string, onComplete: (d: any) => void) => {
      const cData = getHanziWriterKanaData(c)
      if (cData) onComplete(cData)
    },
  })

  if (activeMode.value === 'animate') {
    playAnimation()
  } else {
    startQuizMode()
  }
}

// Play stroke animation once
function playAnimation() {
  if (!writer) return
  isAnimating.value = true
  isLooping.value = false
  currentActiveStroke.value = null
  writer.showCharacter()
  writer.animateCharacter({
    onComplete: () => {
      isAnimating.value = false
    },
  })
}

// Loop stroke animation
function loopAnimation() {
  if (!writer) return
  isAnimating.value = true
  isLooping.value = true
  currentActiveStroke.value = null
  writer.showCharacter()
  writer.loopCharacterAnimation()
}

// Pause animation
function pauseAnimation() {
  if (!writer) return
  writer.pauseAnimation()
  isAnimating.value = false
  isLooping.value = false
}

// Animate single stroke step
function playSingleStroke(strokeIdx: number) {
  if (!writer) return
  isAnimating.value = true
  isLooping.value = false
  currentActiveStroke.value = strokeIdx
  writer.showCharacter()
  writer.animateStroke(strokeIdx, {
    onComplete: () => {
      isAnimating.value = false
    },
  })
}

// Toggle Outline Visibility
function toggleOutline() {
  showOutline.value = !showOutline.value
  if (!writer) return
  if (showOutline.value) {
    writer.showOutline()
  } else {
    writer.hideOutline()
  }
}

// Set Animation Speed
function setSpeed(newSpeed: number) {
  speedMultiplier.value = newSpeed
  // Re-create or trigger animation with updated speed
  initMainWriter()
}

// -------------------------------------------------------------
// PRACTICE / QUIZ MODE
// -------------------------------------------------------------
function startQuizMode() {
  if (!writer) return
  isAnimating.value = false
  isLooping.value = false
  currentActiveStroke.value = null
  quizMistakes.value = 0
  quizStatus.value = 'drawing'
  quizMessage.value = 'Tuliskan coretan pertama mengikuti garis panduan kuadran...'

  writer.hideCharacter()
  if (showOutline.value) {
    writer.showOutline()
  }

  writer.quiz({
    leniency: 1.1,
    showHintAfterMisses: 2,
    onMistake: (strokeData) => {
      quizMistakes.value = strokeData.totalMistakes
      quizMessage.value = `Arah atau bentuk coretan ke-${strokeData.strokeNum + 1} belum tepat. Coba lagi!`
    },
    onCorrectStroke: (strokeData) => {
      quizMessage.value = `Tepat sekali! Coretan ke-${strokeData.strokeNum + 1} berhasil. Lanjutkan coretan berikutnya.`
    },
    onComplete: (summary) => {
      quizStatus.value = 'success'
      quizMessage.value = `Luar biasa! Karakter "${summary.character}" selesai ditulis dengan sempurna!`
    },
  })
}

function giveHint() {
  if (!writer) return
  try {
    writer.skipQuizStroke()
  } catch {
    // fallback
  }
}

// Fullscreen Modal Writer
function initModalWriter() {
  if (!modalWriterContainerRef.value) return
  modalWriterContainerRef.value.innerHTML = ''

  const char = currentTargetChar.value
  const data = getHanziWriterKanaData(char)
  if (!data) return

  modalWriter = HanziWriter.create(modalWriterContainerRef.value, char, {
    width: 320,
    height: 320,
    padding: 30,
    strokeColor: '#0A0A0A',
    outlineColor: '#E5E5E5',
    highlightColor: '#404040',
    drawingColor: '#0A0A0A',
    showOutline: true,
    showCharacter: true,
    strokeAnimationSpeed: speedMultiplier.value,
    delayBetweenStrokes: 200,
    charDataLoader: (c: string, onComplete: (d: any) => void) => {
      const cData = getHanziWriterKanaData(c)
      if (cData) onComplete(cData)
    },
  })

  modalWriter.animateCharacter()
}

// Watch character change
watch(
  () => props.kanaItem.id,
  () => {
    selectedPartIndex.value = 0
    nextTick(() => {
      initMainWriter()
    })
  },
  { immediate: true }
)

// Watch part change for multi-kana
watch(selectedPartIndex, () => {
  nextTick(() => {
    initMainWriter()
  })
})

// Watch mode change
watch(activeMode, (newMode) => {
  if (newMode === 'animate') {
    initMainWriter()
  } else {
    startQuizMode()
  }
})

// Watch fullscreen modal toggle
watch(isFullscreen, (opened) => {
  if (opened) {
    nextTick(() => {
      initModalWriter()
    })
  } else if (modalWriter) {
    modalWriter.pauseAnimation()
    modalWriter = null
  }
})

onMounted(() => {
  initMainWriter()
})

onUnmounted(() => {
  destroyWriters()
})
</script>

<template>
  <div class="bg-white border-2 border-neutral-900 rounded-3xl p-5 sm:p-7 shadow-sm space-y-6">
    <!-- Top Header Bar of Animator Studio -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-200">
      <div class="flex items-center gap-3.5">
        <div class="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center font-sans font-black text-2xl shadow-xs shrink-0">
          {{ kanaItem.kana }}
        </div>
        <div>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="font-mono text-base font-extrabold text-neutral-950">/{{ kanaItem.romaji }}/</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-neutral-100 text-neutral-700 font-bold">
              {{ kanaItem.type === 'hiragana' ? 'Hiragana' : 'Katakana' }}
            </span>
            <span v-if="kanaItem.row" class="px-2 py-0.5 rounded text-[10px] font-mono bg-neutral-100 text-neutral-600">
              Baris {{ kanaItem.row }}
            </span>
          </div>
          <div class="text-xs text-neutral-500 font-medium">
            Urutan Menulis (書き順 &bull; Kakijun): <strong class="text-neutral-900">{{ totalStrokes }} Coretan</strong>
          </div>
        </div>
      </div>

      <!-- Mode Switcher & Audio Button -->
      <div class="flex items-center gap-2 shrink-0 flex-wrap">
        <!-- Audio TTS Button -->
        <button
          type="button"
          class="px-3.5 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
          @click="emit('play-audio', kanaItem.kana)"
        >
          <SpeakerWaveIcon class="w-4 h-4" />
          <span>Pelafalan</span>
        </button>

        <!-- Mode Toggle (Animate vs Quiz Practice) -->
        <div class="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            :class="activeMode === 'animate' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
            @click="activeMode = 'animate'"
          >
            <PlayIcon class="w-3.5 h-3.5" />
            <span>Animasi Coretan</span>
          </button>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
            :class="activeMode === 'quiz' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
            @click="activeMode = 'quiz'"
          >
            <PencilSquareIcon class="w-3.5 h-3.5" />
            <span>Latihan Menulis</span>
          </button>
        </div>

        <!-- Maximize Button -->
        <button
          type="button"
          class="p-2 border border-neutral-200 hover:border-neutral-950 rounded-xl text-neutral-600 hover:text-neutral-950 transition cursor-pointer"
          title="Perbesar Tampilan Kaligrafi"
          @click="isFullscreen = true"
        >
          <ArrowsPointingOutIcon class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Multi-Character Sub-Tabs (for Youon digraphs like きゃ) -->
    <div v-if="kanaParts.length > 1" class="flex items-center gap-2 p-2.5 bg-neutral-50 border border-neutral-200 rounded-2xl">
      <span class="text-xs font-mono font-bold text-neutral-500 uppercase tracking-wider">Pilih Huruf:</span>
      <button
        v-for="(charPart, pIdx) in kanaParts"
        :key="'part-' + pIdx"
        type="button"
        class="px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 border"
        :class="
          selectedPartIndex === pIdx
            ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'
        "
        @click="selectedPartIndex = pIdx"
      >
        <span class="font-sans text-sm">{{ charPart }}</span>
        <span class="text-[10px] font-mono text-neutral-400">({{ pIdx === 0 ? 'Induk' : 'Kecil' }})</span>
      </button>
    </div>

    <!-- Main Content Grid (HanziWriter Canvas + Interactive Control Panel) -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
      <!-- ============================================================== -->
      <!-- LEFT: TRADITIONAL GENKOUYOUSHI BOX (270x270 JAPANESE CANVAS) -->
      <!-- ============================================================== -->
      <div class="md:col-span-6 flex flex-col items-center">
        <!-- Genkouyoushi Calligraphy Canvas Container -->
        <div class="relative w-64 h-64 sm:w-72 sm:h-72 max-w-full aspect-square bg-white border-2 border-neutral-900 rounded-3xl shadow-md overflow-hidden select-none flex items-center justify-center">
          <!-- Crosshair Guidelines (Kotak Naskah Jepang 4 Kuadran Tradisional) -->
          <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1024 1024">
            <!-- Center Vertical Dashed Line -->
            <line x1="512" y1="0" x2="512" y2="1024" stroke="#E5E5E5" stroke-width="4" stroke-dasharray="16 16" />
            <!-- Center Horizontal Dashed Line -->
            <line x1="0" y1="512" x2="1024" y2="512" stroke="#E5E5E5" stroke-width="4" stroke-dasharray="16 16" />
            <!-- Inner Safe Margin Box -->
            <rect x="96" y="96" width="832" height="832" fill="none" stroke="#F5F5F5" stroke-width="2" stroke-dasharray="8 8" />
          </svg>

          <!-- HanziWriter Mount Container -->
          <div ref="writerContainerRef" class="relative z-10 w-full h-full flex items-center justify-center"></div>

          <!-- Fallback when no character data available -->
          <div
            v-if="!charStrokeData"
            class="absolute inset-0 flex items-center justify-center font-sans font-black text-8xl text-neutral-950"
          >
            {{ currentTargetChar }}
          </div>
        </div>

        <!-- Quick Caption below Canvas -->
        <p class="text-[11px] font-mono text-neutral-500 mt-2.5 text-center max-w-xs">
          <span v-if="activeMode === 'animate'">
            Kotak 4 kuadran (マス目) menjaga proporsi tulisan tangan seimbang dan rapi.
          </span>
          <span v-else>
            Tulis langsung pada kotak di atas. Mesin akan memeriksa urutan dan arah goresan Anda.
          </span>
        </p>
      </div>

      <!-- ============================================================== -->
      <!-- RIGHT: INTERACTIVE CONTROL PANEL & PEDAGOGICAL INFO -->
      <!-- ============================================================== -->
      <div class="md:col-span-6 space-y-5">
        <!-- Controls for Mode A: Animation Playback -->
        <div v-if="activeMode === 'animate'" class="space-y-4">
          <!-- Playback Actions Row -->
          <div class="flex items-center gap-2 flex-wrap">
            <!-- Play Button -->
            <button
              type="button"
              class="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              @click="playAnimation"
            >
              <PlayIcon class="w-4 h-4" />
              <span>Putar Urutan</span>
            </button>

            <!-- Loop Button -->
            <button
              type="button"
              class="px-3.5 py-2.5 border rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              :class="isLooping ? 'bg-neutral-950 text-white border-neutral-950' : 'bg-white border-neutral-300 hover:border-neutral-950 text-neutral-800'"
              @click="isLooping ? pauseAnimation() : loopAnimation()"
            >
              <ArrowPathIcon class="w-4 h-4" :class="isLooping ? 'animate-spin' : ''" />
              <span>{{ isLooping ? 'Mengulang Terus' : 'Loop' }}</span>
            </button>

            <!-- Pause Button -->
            <button
              v-if="isAnimating || isLooping"
              type="button"
              class="px-3 py-2.5 border border-neutral-300 hover:border-neutral-950 bg-white text-neutral-800 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              @click="pauseAnimation"
            >
              <PauseIcon class="w-4 h-4" />
              <span>Hentikan</span>
            </button>

            <!-- Outline Toggle -->
            <button
              type="button"
              class="px-3 py-2.5 border rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              :class="showOutline ? 'bg-neutral-100 border-neutral-400 text-neutral-950' : 'bg-white border-neutral-200 text-neutral-500'"
              @click="toggleOutline"
            >
              <EyeIcon v-if="showOutline" class="w-4 h-4" />
              <EyeSlashIcon v-else class="w-4 h-4" />
              <span>{{ showOutline ? 'Bayangan On' : 'Bayangan Off' }}</span>
            </button>
          </div>

          <!-- Step-by-Step Buttons (Coretan 1, Coretan 2, ...) -->
          <div v-if="charStrokeData" class="space-y-2">
            <span class="text-xs font-mono font-bold uppercase tracking-wider text-neutral-500 block">
              Pilih Coretan untuk Diperiksa (Step-by-Step):
            </span>
            <div class="flex items-center gap-1.5 flex-wrap">
              <button
                v-for="(_, sIdx) in charStrokeData.strokes"
                :key="'step-' + sIdx"
                type="button"
                class="px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer flex items-center gap-1.5"
                :class="
                  currentActiveStroke === sIdx
                    ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                    : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'
                "
                @click="playSingleStroke(sIdx)"
              >
                <span>Coretan {{ sIdx + 1 }}</span>
                <CheckCircleIcon v-if="currentActiveStroke !== null && currentActiveStroke >= sIdx" class="w-3.5 h-3.5 text-emerald-500" />
              </button>
            </div>
          </div>

          <!-- Animation Speed Selector -->
          <div class="flex items-center gap-2 pt-1 text-xs">
            <span class="font-mono text-neutral-500 text-[11px] uppercase font-bold">Kecepatan:</span>
            <div class="flex items-center gap-1 p-0.5 bg-neutral-100 rounded-lg">
              <button
                type="button"
                class="px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer"
                :class="speedMultiplier === 0.6 ? 'bg-white shadow-2xs text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'"
                @click="setSpeed(0.6)"
              >
                0.6x (Lambat)
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer"
                :class="speedMultiplier === 1 ? 'bg-white shadow-2xs text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'"
                @click="setSpeed(1)"
              >
                1.0x (Normal)
              </button>
              <button
                type="button"
                class="px-2.5 py-1 rounded text-[11px] font-bold transition cursor-pointer"
                :class="speedMultiplier === 1.5 ? 'bg-white shadow-2xs text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'"
                @click="setSpeed(1.5)"
              >
                1.5x (Cepat)
              </button>
            </div>
          </div>
        </div>

        <!-- Controls for Mode B: Practice Drawing / Quiz -->
        <div v-else class="space-y-4">
          <!-- Quiz Action Buttons -->
          <div class="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              class="px-4 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              @click="startQuizMode"
            >
              <ArrowPathIcon class="w-4 h-4" />
              <span>Ulangi Latihan</span>
            </button>

            <button
              type="button"
              class="px-3.5 py-2.5 border border-neutral-300 hover:border-neutral-950 bg-white text-neutral-800 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              @click="giveHint"
            >
              <LightBulbIcon class="w-4 h-4 text-amber-500" />
              <span>Beri Petunjuk</span>
            </button>

            <button
              type="button"
              class="px-3 py-2.5 border rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5"
              :class="showOutline ? 'bg-neutral-100 border-neutral-400 text-neutral-950' : 'bg-white border-neutral-200 text-neutral-500'"
              @click="toggleOutline"
            >
              <EyeIcon v-if="showOutline" class="w-4 h-4" />
              <EyeSlashIcon v-else class="w-4 h-4" />
              <span>{{ showOutline ? 'Panduan On' : 'Panduan Off' }}</span>
            </button>
          </div>

          <!-- Live Quiz Feedback Card -->
          <div
            class="p-4 rounded-2xl border transition-all space-y-1.5"
            :class="
              quizStatus === 'success'
                ? 'bg-neutral-950 text-white border-neutral-950 shadow-md'
                : 'bg-neutral-50 text-neutral-900 border-neutral-200'
            "
          >
            <div class="flex items-center justify-between text-xs font-bold">
              <span class="flex items-center gap-1.5">
                <SparklesIcon v-if="quizStatus === 'success'" class="w-4 h-4 text-amber-400 animate-pulse" />
                <span>{{ quizStatus === 'success' ? 'Hasil Sempurna!' : 'Petunjuk Menulis:' }}</span>
              </span>
              <span v-if="quizMistakes > 0 && quizStatus !== 'success'" class="text-[11px] font-mono text-neutral-500">
                Koreksi: {{ quizMistakes }}x
              </span>
            </div>
            <p class="text-xs leading-relaxed" :class="quizStatus === 'success' ? 'text-neutral-200' : 'text-neutral-600'">
              {{ quizMessage }}
            </p>
          </div>

          <p class="text-xs text-neutral-500 leading-relaxed">
            Aturan dasar menulis huruf Jepang: dari <strong>kiri ke kanan</strong> dan dari <strong>atas ke bawah</strong>. Tulisan tangan yang benar akan mempermudah Anda membaca kanji tingkat lanjut.
          </p>
        </div>

        <!-- Example Vocabulary Box -->
        <div v-if="kanaItem.exampleWord" class="p-4 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-1.5">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono uppercase text-neutral-400 font-bold tracking-wider">
              Contoh Kosakata yang Menggunakan Huruf Ini:
            </span>
            <button
              type="button"
              class="text-neutral-400 hover:text-neutral-950 cursor-pointer p-0.5"
              title="Dengarkan kata contoh"
              @click="emit('play-audio', kanaItem.exampleWord.japanese)"
            >
              <SpeakerWaveIcon class="w-3.5 h-3.5" />
            </button>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-baseline gap-2">
              <span class="font-sans font-bold text-lg text-neutral-950">
                {{ kanaItem.exampleWord.japanese }}
              </span>
              <span class="font-mono text-xs text-neutral-500">
                ({{ kanaItem.exampleWord.romaji }})
              </span>
            </div>
            <span class="text-xs font-semibold text-neutral-800">
              = {{ kanaItem.exampleWord.meaning }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- ============================================================== -->
    <!-- FULLSCREEN MODAL (Enlarged Studio for Large View) -->
    <!-- ============================================================== -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isFullscreen"
          class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm"
          @click.self="isFullscreen = false"
        >
          <div class="bg-white border border-neutral-200 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5 text-neutral-950 animate-scaleIn">
            <div class="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div class="flex items-center gap-2.5">
                <span class="font-sans font-black text-2xl text-neutral-950">{{ currentTargetChar }}</span>
                <span class="font-mono text-xs font-bold text-neutral-500">/{{ kanaItem.romaji }}/ &bull; {{ totalStrokes }} Coretan</span>
              </div>
              <button
                type="button"
                class="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition cursor-pointer"
                @click="isFullscreen = false"
              >
                <XMarkIcon class="w-5 h-5" />
              </button>
            </div>

            <!-- Big Screen Canvas View -->
            <div class="w-72 h-72 sm:w-80 sm:h-80 mx-auto relative bg-white border-2 border-neutral-900 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
              <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1024 1024">
                <line x1="512" y1="0" x2="512" y2="1024" stroke="#E5E5E5" stroke-width="4" stroke-dasharray="16 16" />
                <line x1="0" y1="512" x2="1024" y2="512" stroke="#E5E5E5" stroke-width="4" stroke-dasharray="16 16" />
              </svg>

              <!-- Modal HanziWriter Mount Container -->
              <div ref="modalWriterContainerRef" class="relative z-10 w-full h-full flex items-center justify-center"></div>
            </div>

            <div class="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                class="px-5 py-2.5 bg-neutral-950 text-white rounded-xl text-xs font-bold hover:bg-neutral-800 transition flex items-center gap-2 cursor-pointer shadow-xs"
                @click="modalWriter?.animateCharacter()"
              >
                <ArrowPathIcon class="w-4 h-4" />
                <span>Ulangi Animasi</span>
              </button>

              <button
                type="button"
                class="px-4 py-2.5 border border-neutral-300 hover:border-neutral-950 bg-white text-neutral-800 rounded-xl text-xs font-bold transition cursor-pointer"
                @click="isFullscreen = false"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
