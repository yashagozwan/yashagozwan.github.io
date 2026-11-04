<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { ProjectItem } from '@/types/portfolio'

const props = defineProps<{
  project: ProjectItem | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const closeBtnRef = ref<HTMLButtonElement | null>(null)

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.project) {
    emit('close')
  }
}

watch(
  () => props.project,
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
    id="project-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="project-modal-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/70 backdrop-blur-sm transition-all duration-300"
    :class="project ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div
      class="bg-gray-900 border border-gray-700/80 text-white rounded-[2rem] p-6 sm:p-8 max-w-xl w-full shadow-2xl transition-all duration-300 relative max-h-[90vh] overflow-y-auto"
      :class="project ? 'scale-100' : 'scale-95'"
    >
      <!-- Close button -->
      <button
        ref="closeBtnRef"
        type="button"
        aria-label="Close project details"
        class="absolute top-6 right-6 text-gray-400 hover:text-white transition-colors p-1.5 rounded-full hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-500"
        @click="emit('close')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Header -->
      <div class="flex items-start gap-4 mb-6 pr-8">
        <div
          class="w-14 h-14 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shrink-0 shadow-lg"
          :class="project?.gradientClass || 'from-brand-500 to-indigo-600'"
          v-html="project?.icon"
        ></div>
        <div>
          <div class="flex flex-wrap items-center gap-2 mb-1">
            <span class="text-xs font-semibold text-brand-400 uppercase tracking-wider">{{ project?.company }}</span>
            <span class="text-gray-600">&bull;</span>
            <span class="text-xs font-medium text-gray-400">{{ project?.platform }}</span>
          </div>
          <h3 id="project-modal-title" class="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {{ project?.title }}
          </h3>
          <p class="text-xs font-medium text-gray-400 mt-0.5">Role: {{ project?.role }}</p>
        </div>
      </div>

      <!-- Case Study Blocks -->
      <div class="space-y-4 mb-6">
        <!-- Challenge -->
        <div class="bg-gray-800/60 rounded-2xl p-4 border border-gray-700/60">
          <div class="text-xs font-bold text-rose-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-rose-500"></span>
            Engineering Challenge
          </div>
          <p class="text-sm text-gray-300 leading-relaxed">{{ project?.challenge }}</p>
        </div>

        <!-- Architecture -->
        <div class="bg-gray-800/60 rounded-2xl p-4 border border-gray-700/60">
          <div class="text-xs font-bold text-brand-400 uppercase tracking-wider mb-1.5 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-brand-500"></span>
            Architecture &amp; Approach
          </div>
          <p class="text-sm text-gray-300 leading-relaxed">{{ project?.architecture }}</p>
        </div>

        <!-- Key Contributions -->
        <div class="bg-gray-800/60 rounded-2xl p-4 border border-gray-700/60">
          <div class="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            Key Contributions
          </div>
          <ul class="space-y-2">
            <li
              v-for="(item, idx) in project?.keyContributions"
              :key="idx"
              class="flex items-start gap-2.5 text-sm text-gray-300 leading-relaxed"
            >
              <svg
                class="w-4 h-4 text-emerald-400 mt-1 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tech Stack -->
      <div class="pt-4 border-t border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in project?.tags"
            :key="tag"
            class="text-xs font-medium text-gray-200 bg-gray-800 border border-gray-700 px-3 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <button
          type="button"
          class="px-5 py-2.5 bg-white hover:bg-gray-100 text-gray-900 text-xs font-bold rounded-full transition-all shrink-0 self-end sm:self-auto"
          @click="emit('close')"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

