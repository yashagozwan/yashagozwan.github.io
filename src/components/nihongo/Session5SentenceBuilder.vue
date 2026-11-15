<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  SENTENCE_BUILDER_CHALLENGES_L1,
  type SentenceBuilderChallenge,
} from '@/data/nihongoLesson1'
import {
  SpeakerWaveIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ArrowPathIcon,
  SparklesIcon,
  LightBulbIcon,
} from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    challenges?: SentenceBuilderChallenge[]
    lessonNumber?: number
  }>(),
  {
    challenges: () => SENTENCE_BUILDER_CHALLENGES_L1,
    lessonNumber: 1,
  }
)

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

const activeChallenges = computed<SentenceBuilderChallenge[]>(() => props.challenges || SENTENCE_BUILDER_CHALLENGES_L1)

const activeIndex = ref(0)
const currentChallenge = computed<SentenceBuilderChallenge>(() => {
  return activeChallenges.value[activeIndex.value % activeChallenges.value.length]
})

// Tiles management
interface TileItem {
  id: string
  text: string
}

const availableTiles = ref<TileItem[]>([])
const constructedTiles = ref<TileItem[]>([])

// Evaluation state
const isChecked = ref(false)
const isCorrect = ref(false)
const solvedChallengeIds = ref<Set<string>>(new Set())

function initChallenge() {
  isChecked.value = false
  isCorrect.value = false
  constructedTiles.value = []
  availableTiles.value = currentChallenge.value.scrambledWords.map((word, idx) => ({
    id: `${activeIndex.value}-${idx}-${word}`,
    text: word,
  }))
}

// Watch activeIndex to re-init
watch(activeIndex, () => {
  initChallenge()
}, { immediate: true })

function selectTile(tile: TileItem) {
  if (isChecked.value) return
  // Move from available to constructed
  availableTiles.value = availableTiles.value.filter((t) => t.id !== tile.id)
  constructedTiles.value.push(tile)
}

function unselectTile(tile: TileItem) {
  if (isChecked.value) return
  // Move from constructed back to available
  constructedTiles.value = constructedTiles.value.filter((t) => t.id !== tile.id)
  availableTiles.value.push(tile)
}

function resetCurrent() {
  initChallenge()
}

function checkSentence() {
  if (!constructedTiles.value.length) return

  const userSentence = constructedTiles.value.map((t) => t.text).join('')
  const expectedSentence = currentChallenge.value.correctOrder.join('')

  isCorrect.value = userSentence === expectedSentence
  isChecked.value = true

  if (isCorrect.value) {
    solvedChallengeIds.value.add(currentChallenge.value.id)
    emit('gain-xp', 20)
    emit('play-audio', currentChallenge.value.correctOrder.join(''))
  }
}

function nextChallenge() {
  if (activeIndex.value < activeChallenges.value.length - 1) {
    activeIndex.value++
  }
}

function prevChallenge() {
  if (activeIndex.value > 0) {
    activeIndex.value--
  }
}
</script>

<template>
  <div class="space-y-8 max-w-3xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">5</span>
          <span>Sesi 5: Susun Kalimat (Sentence Builder) Bab {{ props.lessonNumber }}</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-neutral-950">
          Latihan Balok Kata (Duolingo Style)
        </h2>
        <p class="text-xs text-neutral-600">
          Ketuk balok-balok kata acak di bawah untuk menyusun kalimat bahasa Jepang yang tepat sesuai arti yang diminta.
        </p>
      </div>

      <div class="text-right shrink-0">
        <span class="font-mono text-xs font-bold text-neutral-950 px-3 py-1 bg-white border border-neutral-200 rounded-xl">
          Tantangan {{ activeIndex + 1 }} / {{ activeChallenges.length }}
        </span>
      </div>
    </div>

    <!-- Main Challenge Container -->
    <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-9 space-y-7 shadow-sm">
      <!-- Target Meaning & Hint -->
      <div class="space-y-2 text-center pb-2">
        <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">
          Susun kalimat untuk arti berikut:
        </span>
        <h3 class="font-display font-extrabold text-2xl sm:text-3xl text-neutral-950">
          &ldquo;{{ currentChallenge.targetIndonesian }}&rdquo;
        </h3>
        <p v-if="currentChallenge.hint" class="text-xs text-neutral-500 italic flex items-center justify-center gap-1">
          <LightBulbIcon class="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>Petunjuk: {{ currentChallenge.hint }}</span>
        </p>
      </div>

      <!-- Constructed Sentence Slots Area -->
      <div class="space-y-2">
        <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider flex items-center justify-between">
          <span>Area Kalimat Anda:</span>
          <button
            v-if="constructedTiles.length && !isChecked"
            type="button"
            class="text-[11px] text-neutral-500 hover:text-neutral-950 underline font-mono"
            @click="resetCurrent"
          >
            Reset Balok
          </button>
        </div>

        <div
          class="min-h-[76px] p-3 sm:p-4 rounded-2xl border-2 transition-all flex flex-wrap items-center gap-2.5 bg-neutral-50/60"
          :class="
            isChecked
              ? isCorrect
                ? 'border-emerald-500 bg-emerald-50/20'
                : 'border-rose-500 bg-rose-50/20'
              : constructedTiles.length
              ? 'border-neutral-950'
              : 'border-dashed border-neutral-300'
          "
        >
          <template v-if="constructedTiles.length">
            <button
              v-for="tile in constructedTiles"
              :key="tile.id"
              type="button"
              :disabled="isChecked"
              class="px-4 py-2.5 bg-white border-2 border-neutral-950 rounded-xl font-sans font-bold text-base sm:text-lg text-neutral-950 shadow-xs hover:bg-neutral-100 transition-all cursor-pointer disabled:cursor-default"
              title="Ketuk untuk kembalikan balok"
              @click="unselectTile(tile)"
            >
              {{ tile.text }}
            </button>
          </template>

          <span v-else class="text-xs font-mono text-neutral-400 italic mx-auto select-none">
            Ketuk kata di bawah untuk mulai menyusun kalimat...
          </span>
        </div>
      </div>

      <!-- Available Scrambled Word Tiles Pool -->
      <div class="space-y-3 pt-2">
        <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider">
          Pilihan Balok Kata:
        </div>

        <div class="flex flex-wrap items-center justify-center gap-2.5 min-h-[50px] p-2 bg-neutral-100/50 rounded-2xl">
          <button
            v-for="tile in availableTiles"
            :key="tile.id"
            type="button"
            class="px-4 py-2.5 bg-white border border-neutral-300 hover:border-neutral-950 rounded-xl font-sans font-bold text-base sm:text-lg text-neutral-950 shadow-xs hover:shadow transition-all cursor-pointer active:scale-95"
            @click="selectTile(tile)"
          >
            {{ tile.text }}
          </button>
          <span v-if="!availableTiles.length" class="text-xs font-mono text-neutral-400 italic">
            Semua balok telah dipasang ke area kalimat di atas.
          </span>
        </div>
      </div>

      <!-- Action Buttons & Validation Feedback -->
      <div class="pt-4 border-t border-neutral-100 space-y-4">
        <!-- Check Answer Button -->
        <div v-if="!isChecked" class="flex items-center justify-end">
          <button
            type="button"
            :disabled="!constructedTiles.length"
            class="w-full sm:w-auto px-8 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:pointer-events-none shadow-sm flex items-center justify-center gap-2 cursor-pointer"
            @click="checkSentence"
          >
            <span>Periksa Jawaban</span>
            <ArrowRightIcon class="w-4 h-4" />
          </button>
        </div>

        <!-- Feedback Box -->
        <div
          v-else
          class="p-5 rounded-2xl border space-y-3 text-xs animate-fadeIn"
          :class="isCorrect ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-rose-50 border-rose-300 text-rose-950'"
        >
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2 text-sm font-bold">
              <template v-if="isCorrect">
                <SparklesIcon class="w-5 h-5 text-emerald-600" />
                <span>Sempurna, Benar Sekali!</span>
              </template>
              <template v-else>
                <XMarkIcon class="w-5 h-5 text-rose-600" />
                <span>Belum Tepat</span>
              </template>
              <span v-if="isCorrect" class="text-xs font-mono px-2 py-0.5 rounded bg-emerald-600 text-white">+20 XP</span>
            </div>
            <button
              v-if="isCorrect"
              type="button"
              class="inline-flex items-center gap-1.5 font-mono text-xs font-bold underline cursor-pointer"
              @click="emit('play-audio', currentChallenge.correctOrder.join(''))"
            >
              <SpeakerWaveIcon class="w-4 h-4" />
              <span>Putar Suara</span>
            </button>
          </div>

          <div class="space-y-1">
            <div class="text-base font-bold font-sans">
              Jawaban Benar: {{ currentChallenge.correctOrder.join(' ') }}
            </div>
            <div class="font-mono text-xs opacity-75">
              Cara Baca: {{ currentChallenge.romaji }}
            </div>
            <p class="text-[11px] leading-relaxed pt-1 opacity-90">
              <strong>Penjelasan Tata Bahasa:</strong> {{ currentChallenge.explanation }}
            </p>
          </div>

          <!-- Bottom Action Buttons inside Feedback -->
          <div class="pt-3 border-t border-black/10 flex items-center justify-end gap-3">
            <button
              v-if="!isCorrect"
              type="button"
              class="px-4 py-2 bg-white border border-rose-300 text-rose-900 rounded-xl text-xs font-semibold hover:bg-rose-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              @click="resetCurrent"
            >
              <ArrowPathIcon class="w-3.5 h-3.5" />
              <span>Coba Ulangi</span>
            </button>

            <button
              v-if="activeIndex < activeChallenges.length - 1"
              type="button"
              class="px-6 py-2.5 rounded-xl text-xs font-bold text-white shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              :class="isCorrect ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-neutral-950 hover:bg-neutral-800'"
              @click="nextChallenge"
            >
              <span>Tantangan Berikutnya</span>
              <ArrowRightIcon class="w-3.5 h-3.5" />
            </button>

            <button
              v-else
              type="button"
              class="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
              @click="emit('next-session')"
            >
              <span>Selesai &amp; Lanjut Sesi 6</span>
              <ArrowRightIcon class="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Navigation Arrows -->
      <div class="flex items-center justify-between text-xs pt-1">
        <button
          type="button"
          :disabled="activeIndex === 0"
          class="text-neutral-500 hover:text-neutral-950 disabled:opacity-20 font-mono flex items-center gap-1 cursor-pointer"
          @click="prevChallenge"
        >
          <ArrowLeftIcon class="w-3.5 h-3.5" />
          <span>Soal Sebelumnya</span>
        </button>
        <span class="font-mono text-neutral-400">
          {{ solvedChallengeIds.size }} dari {{ activeChallenges.length }} Berhasil
        </span>
        <button
          type="button"
          :disabled="activeIndex === activeChallenges.length - 1"
          class="text-neutral-500 hover:text-neutral-950 disabled:opacity-20 font-mono flex items-center gap-1 cursor-pointer"
          @click="nextChallenge"
        >
          <span>Soal Selanjutnya</span>
          <ArrowRightIcon class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>

    <!-- Session Navigation Footer -->
    <div class="pt-6 border-t border-neutral-200 flex items-center justify-between">
      <span class="text-xs text-neutral-500 font-mono">
        Sudah lancar menyusun kalimat? Uji kemampuan dalam simulasi dialog.
      </span>
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 6: Praktik Percakapan (会話)</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
