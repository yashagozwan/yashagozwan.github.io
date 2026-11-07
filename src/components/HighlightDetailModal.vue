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
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-all duration-300"
    :class="highlight ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div
      id="highlight-modal-content"
      class="bg-white border border-gray-100 rounded-[2rem] p-6 sm:p-8 max-w-lg w-full shadow-2xl transition-all duration-300 relative max-h-[90vh] overflow-y-auto"
      :class="highlight ? 'scale-100' : 'scale-95'"
    >
      <!-- Close button -->
      <button
        id="close-highlight-modal"
        ref="closeBtnRef"
        type="button"
        aria-label="Close details"
        class="absolute top-6 right-6 text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-brand-500"
        @click="emit('close')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Header with Icon & Title -->
      <div class="flex items-start gap-4 mb-6 pr-8">
        <div
          id="highlight-modal-icon"
          class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100/80 shrink-0"
          v-html="highlight?.icon"
        ></div>
        <div>
          <div
            class="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1"
          >
            <span class="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
            Case Study
          </div>
          <h3 id="highlight-modal-title" class="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            {{ highlight?.title }}
          </h3>
        </div>
      </div>

      <!-- Structured Detail Blocks: Problem, Solution, Result -->
      <div class="space-y-4 mb-6">
        <!-- Problem Block -->
        <div class="bg-gray-50/80 rounded-2xl p-4 border border-gray-100">
          <div class="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rose-500"></span>
            Problem
          </div>
          <p id="highlight-modal-problem" class="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {{ highlight?.problem }}
          </p>
        </div>

        <!-- Solution Block -->
        <div class="bg-brand-50/40 rounded-2xl p-4 border border-brand-100/70">
          <div class="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-600"></span>
            Solution
          </div>
          <p id="highlight-modal-solution" class="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {{ highlight?.solution }}
          </p>
        </div>

        <!-- Result Block -->
        <div class="bg-emerald-50/40 rounded-2xl p-4 border border-emerald-100/70">
          <div class="text-xs font-bold text-emerald-700 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-600"></span>
            Result
          </div>
          <p id="highlight-modal-result" class="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
            {{ highlight?.result }}
          </p>
        </div>
      </div>

      <!-- Technologies / Badges -->
      <div class="pt-4 border-t border-gray-100">
        <div class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Technologies</div>
        <div id="highlight-modal-tags" class="flex flex-wrap gap-2">
          <span
            v-for="tag in highlight?.tags"
            :key="tag"
            class="text-xs font-medium text-brand-700 bg-brand-50 border border-brand-100/80 px-2.5 py-1 rounded-lg"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Dismiss Button -->
      <div class="pt-6 mt-2 flex justify-end">
        <button
          id="dismiss-highlight-modal"
          type="button"
          class="px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-full shadow-sm hover:shadow transition-all text-center"
          @click="emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

