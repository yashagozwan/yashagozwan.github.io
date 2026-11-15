<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import {
  INTERACTIVE_DIALOGUES_L1,
  type InteractiveDialogue,
} from '@/data/nihongoLesson1'
import {
  SpeakerWaveIcon,
  CheckIcon,
  ArrowRightIcon,
  ArrowPathIcon,
  ChatBubbleLeftRightIcon,
} from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    showRomaji: boolean
    dialogues?: InteractiveDialogue[]
    lessonNumber?: number
  }>(),
  {
    dialogues: () => INTERACTIVE_DIALOGUES_L1,
    lessonNumber: 1,
  }
)

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

const activeDialogues = computed(() => props.dialogues ?? INTERACTIVE_DIALOGUES_L1)

// Active dialogue selection
const activeDialogueIndex = ref(0)
const currentDialogue = computed<InteractiveDialogue>(() => {
  return activeDialogues.value[activeDialogueIndex.value % activeDialogues.value.length]
})

// Reset on dialogue change or props change
watch(() => props.dialogues, () => {
  activeDialogueIndex.value = 0
  resetDialogue()
})

// Step-by-step turn progression
// visibleTurnCount determines how many turns are currently displayed on the chat screen
const visibleTurnCount = ref(1)

// Selected user response for interactive turns
const userTurnResponses = ref<Record<string, number>>({})
const userTurnFeedback = ref<Record<string, string>>({})

function selectDialogue(idx: number) {
  activeDialogueIndex.value = idx
  visibleTurnCount.value = 1
  userTurnResponses.value = {}
  userTurnFeedback.value = {}
  // Play initial audio turn
  const firstTurn = currentDialogue.value.turns[0]
  if (firstTurn) {
    emit('play-audio', firstTurn.japanese)
  }
}

function proceedNextTurn() {
  if (visibleTurnCount.value < currentDialogue.value.turns.length) {
    visibleTurnCount.value++
    const nextTurn = currentDialogue.value.turns[visibleTurnCount.value - 1]
    if (nextTurn && !nextTurn.isUserTurn) {
      emit('play-audio', nextTurn.japanese)
    }
  }
}

function handleChooseResponse(turnId: string, optIndex: number) {
  userTurnResponses.value[turnId] = optIndex
  const turn = currentDialogue.value.turns.find((t) => t.id === turnId)
  if (turn && turn.options && turn.options[optIndex]) {
    const chosen = turn.options[optIndex]
    userTurnFeedback.value[turnId] = chosen.feedback
    if (chosen.isCorrect) {
      emit('gain-xp', 20)
      emit('play-audio', chosen.text)
    }
  }
}

function resetDialogue() {
  visibleTurnCount.value = 1
  userTurnResponses.value = {}
  userTurnFeedback.value = {}
  const firstTurn = currentDialogue.value?.turns[0]
  if (firstTurn) {
    emit('play-audio', firstTurn.japanese)
  }
}
</script>

<template>
  <div class="space-y-8 max-w-3xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-6 h-6 rounded-full bg-neutral-950 text-white font-bold flex items-center justify-center text-[10px]">6</span>
          <span>Sesi 6: Praktik Percakapan (会話 &bull; Kaiwa) Bab {{ props.lessonNumber }}</span>
        </div>
        <h2 class="font-display text-2xl font-bold text-neutral-950">
          Simulasi Dialog Interaktif &amp; Roleplay
        </h2>
        <p class="text-xs text-neutral-600">
          Berlatihlah seolah sedang berbicara dengan orang Jepang. Pilih skenario, dengarkan dialog baris demi baris, dan tentukan jawaban yang tepat.
        </p>
      </div>

      <div class="flex items-center gap-2 self-start sm:self-center shrink-0 flex-wrap">
        <button
          v-for="(d, dIdx) in activeDialogues"
          :key="d.id"
          type="button"
          class="px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all"
          :class="
            activeDialogueIndex === dIdx
              ? 'bg-neutral-950 text-white border-neutral-950'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-950'
          "
          @click="selectDialogue(dIdx)"
        >
          Dialog {{ dIdx + 1 }}
        </button>
      </div>
    </div>

    <!-- Active Dialogue Context & Character Picker -->
    <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-100 pb-4">
        <div>
          <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">
            Skenario Dialog:
          </span>
          <h3 class="font-display font-extrabold text-xl text-neutral-950">
            {{ currentDialogue.title }}
          </h3>
          <p class="text-xs text-neutral-500 mt-0.5">
            {{ currentDialogue.context }}
          </p>
        </div>

        <button
          type="button"
          class="px-3 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-xl text-xs font-mono transition-colors self-start sm:self-center flex items-center gap-1.5"
          @click="resetDialogue"
        >
          <ArrowPathIcon class="w-3.5 h-3.5" />
          <span>Ulangi dari Awal</span>
        </button>
      </div>

      <!-- Turn-by-turn Chat View -->
      <div class="space-y-4 min-h-[300px]">
        <div
          v-for="turn in currentDialogue.turns.slice(0, visibleTurnCount)"
          :key="turn.id"
          class="space-y-2 animate-fadeIn"
        >
          <!-- Speech Bubble -->
          <div
            class="flex items-start gap-3 p-4 rounded-2xl border"
            :class="
              turn.speaker.includes('Miller')
                ? 'bg-neutral-50 border-neutral-300 ml-4 sm:ml-8'
                : 'bg-white border-neutral-200 mr-4 sm:mr-8'
            "
          >
            <!-- Speaker Icon -->
            <div class="w-8 h-8 rounded-full bg-neutral-950 text-white font-mono text-xs font-bold flex items-center justify-center shrink-0">
              {{ turn.speaker.charAt(0) }}
            </div>

            <!-- Bubble Body -->
            <div class="space-y-1.5 flex-grow">
              <div class="flex items-center justify-between">
                <span class="text-[11px] font-mono font-bold uppercase text-neutral-500">
                  {{ turn.speaker }}
                </span>
                <button
                  type="button"
                  class="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
                  title="Putar suara"
                  @click="emit('play-audio', turn.japanese)"
                >
                  <SpeakerWaveIcon class="w-3.5 h-3.5" />
                </button>
              </div>

              <!-- Japanese sentence -->
              <div class="font-bold text-base sm:text-lg text-neutral-950 font-sans tracking-wide">
                {{ turn.japanese }}
              </div>

              <!-- Romaji -->
              <div v-if="props.showRomaji" class="text-xs font-mono text-neutral-400">
                {{ turn.romaji }}
              </div>

              <!-- Indonesian Translation -->
              <div class="text-xs text-neutral-600 italic pt-0.5">
                {{ turn.indonesian }}
              </div>
            </div>
          </div>

          <!-- Interactive User Turn Prompt (if this turn is waiting for user choice) -->
          <div
            v-if="turn.isUserTurn && turn.options"
            class="ml-8 sm:ml-12 p-4 bg-neutral-950 text-white rounded-2xl space-y-3 shadow-md"
          >
            <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
              <span class="flex items-center gap-1.5 text-white">
                <ChatBubbleLeftRightIcon class="w-4 h-4 text-emerald-400" />
                <span>Giliran Anda Membalas:</span>
              </span>
              <span class="text-emerald-400 font-bold">+20 XP</span>
            </div>

            <div class="space-y-2">
              <button
                v-for="(opt, optIdx) in turn.options"
                :key="optIdx"
                type="button"
                class="w-full p-3 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all"
                :class="
                  userTurnResponses[turn.id] === optIdx
                    ? opt.isCorrect
                      ? 'bg-emerald-600 text-white border-emerald-500 font-bold'
                      : 'bg-rose-600 text-white border-rose-500 font-bold'
                    : 'bg-neutral-900 border-neutral-700 text-neutral-200 hover:border-white'
                "
                @click="handleChooseResponse(turn.id, optIdx)"
              >
                <div>{{ opt.text }}</div>
                <div v-if="props.showRomaji" class="text-[10px] font-mono text-neutral-400 pt-0.5">
                  {{ opt.romaji }}
                </div>
              </button>
            </div>

            <!-- Feedback for user response -->
            <div
              v-if="userTurnFeedback[turn.id]"
              class="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 leading-relaxed"
            >
              {{ userTurnFeedback[turn.id] }}
            </div>
          </div>
        </div>
      </div>

      <!-- Turn Stepper Controller (Next Turn Button) -->
      <div class="pt-4 border-t border-neutral-100 flex items-center justify-between">
        <span class="text-xs font-mono text-neutral-400">
          Progres: {{ visibleTurnCount }} dari {{ currentDialogue.turns.length }} Baris
        </span>

        <button
          v-if="visibleTurnCount < currentDialogue.turns.length"
          type="button"
          class="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer"
          @click="proceedNextTurn"
        >
          <span>Lanjut ke Baris Berikutnya</span>
          <ArrowRightIcon class="w-3.5 h-3.5" />
        </button>

        <div v-else class="flex items-center gap-2">
          <span class="text-xs font-bold text-emerald-700 flex items-center gap-1">
            <CheckIcon class="w-4 h-4 text-emerald-600" />
            <span>Seluruh Dialog Selesai!</span>
          </span>
          <button
            type="button"
            class="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
            @click="emit('next-session')"
          >
            <span>Lanjut ke Sesi 7: Kuis</span>
            <ArrowRightIcon class="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>

    <!-- Session Navigation Footer -->
    <div class="pt-6 border-t border-neutral-200 flex items-center justify-between">
      <span class="text-xs text-neutral-500 font-mono">
        Latihan dialog selesai? Saatnya menguji seluruh pemahaman di Sesi 7.
      </span>
      <button
        type="button"
        class="px-6 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all shadow-sm cursor-pointer"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Sesi 7: Latihan &amp; Kuis Terpadu</span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
