<script setup lang="ts">
import { ref, computed } from 'vue'
import { GREETINGS_DATA } from '@/data/nihongoLesson1'
import {
  SpeakerWaveIcon,
  EyeIcon,
  CheckIcon,
  XMarkIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  SparklesIcon,
  LightBulbIcon,
  IdentificationIcon,
  BoltIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

// Active sub-mode: 'cards' or 'recall'
const subMode = ref<'cards' | 'recall'>('cards')

// Tap to reveal translations set
const revealedTranslations = ref<Set<string>>(new Set())

function toggleReveal(id: string) {
  if (revealedTranslations.value.has(id)) {
    revealedTranslations.value.delete(id)
  } else {
    revealedTranslations.value.add(id)
  }
}

function revealAll() {
  for (const g of GREETINGS_DATA) {
    revealedTranslations.value.add(g.id)
  }
}

function hideAll() {
  revealedTranslations.value.clear()
}

// Quick recall quiz state
const recallIndex = ref(0)
const recallAnswers = ref<Record<number, string>>({})
const recallFeedback = ref<Record<number, boolean>>({})

// Randomize multiple choices for recall
const currentRecall = computed(() => {
  const g = GREETINGS_DATA[recallIndex.value % GREETINGS_DATA.length]
  // Generate 3 choices (1 correct, 2 distractors)
  const distractors = GREETINGS_DATA.filter((item) => item.id !== g.id)
    .sort(() => 0.5 - Math.random())
    .slice(0, 2)
  const options = [g, ...distractors].sort(() => 0.5 - Math.random())
  return {
    item: g,
    options,
  }
})

function checkRecallAnswer(selectedId: string) {
  const current = currentRecall.value
  const isCorrect = selectedId === current.item.id
  recallAnswers.value[recallIndex.value] = selectedId
  recallFeedback.value[recallIndex.value] = isCorrect

  if (isCorrect) {
    emit('gain-xp', 10)
    emit('play-audio', current.item.japanese)
  }
}

function nextRecallQuestion() {
  if (recallIndex.value < GREETINGS_DATA.length - 1) {
    recallIndex.value++
  }
}

function prevRecallQuestion() {
  if (recallIndex.value > 0) {
    recallIndex.value--
  }
}

const recallScore = computed(() => {
  return Object.values(recallFeedback.value).filter(Boolean).length
})
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-neutral-50 border border-neutral-200 rounded-2xl p-6">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">2</span>
          <span>Sesi 2: Salam Dasar (あいさつ &bull; Aisatsu)</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-neutral-950">
          Kuasai 9 Sapaan Pokok Kehidupan Sehari-hari
        </h2>
        <p class="text-xs text-neutral-600">
          Ucapkan salam dengan percaya diri. Klik kartu untuk membuka terjemahan, atau uji ingatan Anda di mode Uji Cepat.
        </p>
      </div>

      <!-- Mode Selector -->
      <div class="flex items-center p-1 bg-white border border-neutral-200 rounded-xl shadow-xs self-start sm:self-center shrink-0">
        <button
          type="button"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          :class="subMode === 'cards' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'cards'"
        >
          <IdentificationIcon class="w-3.5 h-3.5" />
          <span>Kartu Salam</span>
        </button>
        <button
          type="button"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5"
          :class="subMode === 'recall' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
          @click="subMode = 'recall'"
        >
          <BoltIcon class="w-3.5 h-3.5" />
          <span>Uji Cepat</span>
          <span v-if="recallScore > 0" class="text-[10px] font-mono px-1 rounded bg-emerald-500 text-white">
            {{ recallScore }}/{{ GREETINGS_DATA.length }}
          </span>
        </button>
      </div>
    </div>

    <!-- MODE 1: INTERACTIVE GREETINGS CARDS -->
    <div v-if="subMode === 'cards'" class="space-y-6">
      <div class="flex items-center justify-between text-xs border-b border-neutral-200 pb-3">
        <span class="text-neutral-500">Klik kartu untuk menyembunyikan / menampilkan arti:</span>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="px-2.5 py-1 bg-white border border-neutral-200 hover:border-neutral-950 rounded-lg text-[11px] font-medium text-neutral-700 transition-colors"
            @click="revealAll"
          >
            Buka Semua
          </button>
          <button
            type="button"
            class="px-2.5 py-1 bg-white border border-neutral-200 hover:border-neutral-950 rounded-lg text-[11px] font-medium text-neutral-700 transition-colors"
            @click="hideAll"
          >
            Sembunyikan Semua
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div
          v-for="g in GREETINGS_DATA"
          :key="g.id"
          class="bg-white border rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 shadow-xs hover:shadow cursor-pointer select-none"
          :class="revealedTranslations.has(g.id) ? 'border-neutral-950' : 'border-neutral-200 hover:border-neutral-400'"
          @click="toggleReveal(g.id)"
        >
          <div class="space-y-2.5">
            <div class="flex items-start justify-between gap-3">
              <!-- Prominent Japanese Writing -->
              <div class="font-display font-bold text-2xl text-neutral-950 tracking-wide font-sans leading-snug">
                {{ g.japanese }}
              </div>

              <!-- Audio Button -->
              <button
                type="button"
                class="p-2 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white transition-colors text-neutral-700 shrink-0 cursor-pointer"
                title="Dengarkan pengucapan"
                @click.stop="emit('play-audio', g.japanese)"
              >
                <SpeakerWaveIcon class="w-4 h-4" />
              </button>
            </div>

            <!-- Romaji -->
            <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400 italic">
              {{ g.romaji }}
            </div>

            <!-- Revealable Meaning -->
            <div class="pt-1">
              <div
                v-if="revealedTranslations.has(g.id)"
                class="text-sm font-semibold text-neutral-900 transition-opacity duration-200"
              >
                {{ g.meaning }}
              </div>
              <div
                v-else
                class="text-xs font-mono text-neutral-400 italic bg-neutral-50 px-2.5 py-1 rounded-md inline-flex items-center gap-1 border border-dashed border-neutral-300"
              >
                <EyeIcon class="w-3.5 h-3.5" />
                <span>Ketuk untuk intip arti</span>
              </div>
            </div>
          </div>

          <!-- Context / Usage notes -->
          <div v-if="g.context" class="text-[11px] text-neutral-500 pt-3 border-t border-neutral-100 mt-3 leading-relaxed">
            {{ g.context }}
          </div>
        </div>
      </div>
    </div>

    <!-- MODE 2: QUICK RECALL EXERCISE -->
    <div v-else class="max-w-xl mx-auto space-y-6">
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
        <div class="flex items-center justify-between text-xs font-mono text-neutral-400 border-b border-neutral-100 pb-3">
          <span>Uji Cepat Salam (Recall)</span>
          <span class="font-bold text-neutral-900">Soal {{ recallIndex + 1 }} dari {{ GREETINGS_DATA.length }}</span>
        </div>

        <!-- Question Prompt -->
        <div class="text-center space-y-3 py-2">
          <div class="text-xs font-mono uppercase tracking-wider text-neutral-400">
            Apa arti dari ungkapan sapaan ini?
          </div>
          <div class="font-display font-extrabold text-3xl sm:text-4xl text-neutral-950 tracking-wider font-sans">
            {{ currentRecall.item.japanese }}
          </div>
          <div v-if="props.showRomaji" class="text-sm font-mono text-neutral-500 italic">
            {{ currentRecall.item.romaji }}
          </div>
          <button
            type="button"
            class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white transition-colors text-xs font-mono cursor-pointer"
            @click="emit('play-audio', currentRecall.item.japanese)"
          >
            <SpeakerWaveIcon class="w-4 h-4" />
            <span>Dengarkan Bunyi</span>
          </button>
        </div>

        <!-- Multiple Choice Options -->
        <div class="space-y-2.5 pt-2">
          <button
            v-for="opt in currentRecall.options"
            :key="opt.id"
            type="button"
            class="w-full p-4 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between gap-3 cursor-pointer"
            :class="
              recallAnswers[recallIndex] === opt.id
                ? opt.id === currentRecall.item.id
                  ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                  : 'bg-rose-50 border-rose-500 text-rose-900 font-bold'
                : 'bg-white border-neutral-200 hover:border-neutral-950 text-neutral-800'
            "
            @click="checkRecallAnswer(opt.id)"
          >
            <span>{{ opt.meaning }}</span>
            <span v-if="recallAnswers[recallIndex] === opt.id" class="flex items-center gap-1 text-xs">
              <template v-if="opt.id === currentRecall.item.id">
                <CheckIcon class="w-4 h-4 text-emerald-600 font-bold" />
                <span>Benar</span>
              </template>
              <template v-else>
                <XMarkIcon class="w-4 h-4 text-rose-600 font-bold" />
                <span>Kurang tepat</span>
              </template>
            </span>
          </button>
        </div>

        <!-- Educational Feedback -->
        <div
          v-if="recallAnswers[recallIndex]"
          class="p-4 rounded-xl border text-xs space-y-1.5"
          :class="recallFeedback[recallIndex] ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-neutral-50 border-neutral-300 text-neutral-900'"
        >
          <div class="font-bold flex items-center gap-1.5">
            <SparklesIcon v-if="recallFeedback[recallIndex]" class="w-4 h-4 text-emerald-600" />
            <LightBulbIcon v-else class="w-4 h-4 text-amber-500" />
            <span>{{ recallFeedback[recallIndex] ? 'Hebat, jawaban Anda benar!' : 'Penjelasan Konteks:' }}</span>
          </div>
          <p class="leading-relaxed text-neutral-600">
            <strong>{{ currentRecall.item.japanese }}</strong> ({{ currentRecall.item.romaji }}) berarti <em>"{{ currentRecall.item.meaning }}"</em>. {{ currentRecall.item.context }}
          </p>
        </div>

        <!-- Navigation Buttons -->
        <div class="flex items-center justify-between pt-2 border-t border-neutral-100">
          <button
            type="button"
            :disabled="recallIndex === 0"
            class="px-4 py-2 border border-neutral-200 hover:border-neutral-950 rounded-xl text-xs font-semibold text-neutral-700 transition-all disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5 cursor-pointer"
            @click="prevRecallQuestion"
          >
            <ArrowLeftIcon class="w-3.5 h-3.5" />
            <span>Soal Sebelumnya</span>
          </button>

          <button
            v-if="recallIndex < GREETINGS_DATA.length - 1"
            type="button"
            class="px-5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            @click="nextRecallQuestion"
          >
            <span>Soal Selanjutnya</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>

          <button
            v-else
            type="button"
            class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            @click="emit('next-session')"
          >
            <span>Selesaikan &amp; Lanjut Sesi 3</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Session Navigation Footer -->
    <div class="pt-6 border-t border-neutral-200 flex items-center justify-between">
      <span class="text-xs text-neutral-500 font-mono">
        Sudah hafal ke-9 salam dasar? Lanjutkan ke kosakata inti.
      </span>
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 3: Kosakata (単語)</span>
        <span>&rarr;</span>
      </button>
    </div>
  </div>
</template>
