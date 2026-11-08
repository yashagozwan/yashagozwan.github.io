<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { EngineeringHighlight } from '@/types/portfolio'

const props = defineProps<{
  highlight: EngineeringHighlight | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeBtnRef = ref<HTMLButtonElement | null>(null)

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.highlight) {
    emit('close')
  }
}

watch(
  () => props.highlight,
  async (val) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = val ? 'hidden' : ''
    }
    if (val) {
      await nextTick()
      closeBtnRef.value?.focus()
    }
  }
)

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
  if (typeof document !== 'undefined') {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <div
    id="highlight-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="highlight-modal-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm transition-all duration-300"
    :class="highlight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div
      id="highlight-modal-content"
      class="bg-white border border-neutral-200 text-neutral-950 rounded-2xl p-6 sm:p-10 max-w-lg w-full shadow-2xl transition-all duration-300 relative max-h-[90vh] overflow-y-auto"
      :class="highlight ? 'scale-100' : 'scale-95'"
    >
      <!-- Close button -->
      <button
        id="close-highlight-modal"
        ref="closeBtnRef"
        type="button"
        aria-label="Close details"
        class="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 transition-colors p-2 rounded-full hover:bg-neutral-100 focus:outline-none"
        @click="emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Header -->
      <div class="mb-8 pr-8 border-b border-neutral-200 pb-6">
        <div class="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">
          Engineering Case Note
        </div>
        <h3 id="highlight-modal-title" class="font-display text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
          {{ highlight?.title }}
        </h3>
      </div>

      <!-- Structured Detail Blocks: Problem, Solution, Result -->
      <div class="space-y-6 mb-8">
        <div>
          <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-1.5">
            01 / Problem
          </div>
          <p id="highlight-modal-problem" class="text-sm text-neutral-600 leading-relaxed">
            {{ highlight?.problem }}
          </p>
        </div>

        <div class="border-t border-neutral-100 pt-5">
          <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-1.5">
            02 / Approach &amp; Solution
          </div>
          <p id="highlight-modal-solution" class="text-sm text-neutral-600 leading-relaxed">
            {{ highlight?.solution }}
          </p>
        </div>

        <div class="border-t border-neutral-100 pt-5">
          <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-1.5">
            03 / Outcome
          </div>
          <p id="highlight-modal-result" class="text-sm text-neutral-600 leading-relaxed">
            {{ highlight?.result }}
          </p>
        </div>
      </div>

      <!-- Technologies & Close -->
      <div class="pt-5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div id="highlight-modal-tags" class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in highlight?.tags"
            :key="tag"
            class="text-[11px] font-medium text-neutral-700 border border-neutral-200 px-2.5 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <button
          id="dismiss-highlight-modal"
          type="button"
          class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-all shrink-0 self-end sm:self-auto"
          @click="emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>
