<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { ProjectItem } from '@/types/portfolio'
import { XMarkIcon } from '@heroicons/vue/24/outline'

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
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm transition-all duration-300"
    :class="project ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div
      class="bg-white border border-neutral-200 text-neutral-950 rounded-2xl p-6 sm:p-10 max-w-xl w-full shadow-2xl transition-all duration-300 relative max-h-[90vh] overflow-y-auto"
      :class="project ? 'scale-100' : 'scale-95'"
    >
      <!-- Close button -->
      <button
        ref="closeBtnRef"
        type="button"
        aria-label="Close project details"
        class="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 transition-colors p-2 rounded-full hover:bg-neutral-100 focus:outline-none cursor-pointer"
        @click="emit('close')"
      >
        <XMarkIcon class="w-5 h-5" />
      </button>

      <!-- Header -->
      <div class="mb-8 pr-8 border-b border-neutral-200 pb-6">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="flex flex-wrap items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-2">
              <span>{{ project?.company }}</span>
              <span>&middot;</span>
              <span>{{ project?.platform }}</span>
            </div>
            <h3 id="project-modal-title" class="font-display text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
              {{ project?.title }}
            </h3>
            <p class="text-xs font-medium text-neutral-500 mt-1">Role: {{ project?.role }}</p>
          </div>
          <div
            v-if="project?.imageUrl"
            class="shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border border-neutral-200 shadow-sm bg-neutral-50 p-1"
          >
            <img :src="project.imageUrl" :alt="project.title" class="w-full h-full object-contain rounded-xl" />
          </div>
        </div>
      </div>

      <!-- About / Tagline (if provided) -->
      <div v-if="project?.about" class="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200/80">
        <div class="text-[11px] font-bold text-neutral-900 uppercase tracking-[0.18em] mb-1">
          Tentang Aplikasi Ini
        </div>
        <p class="text-sm text-neutral-700 leading-relaxed font-medium">
          {{ project.about }}
        </p>
      </div>

      <!-- Core Modules & Features (if provided) -->
      <div v-if="project?.coreFeatures && project.coreFeatures.length > 0" class="mb-8">
        <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-3">
          Fitur &amp; Modul Utama
        </div>
        <div class="grid grid-cols-1 gap-2.5">
          <div
            v-for="feat in project.coreFeatures"
            :key="feat.title"
            class="p-3.5 rounded-xl border border-neutral-200/80 bg-neutral-50/50"
          >
            <div class="text-xs font-bold text-neutral-950 mb-1 flex items-center gap-2">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0"></span>
              {{ feat.title }}
            </div>
            <p class="text-xs text-neutral-600 leading-relaxed pl-3.5">
              {{ feat.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Screenshot / App Preview (if provided) -->
      <div v-if="project?.screenshotUrl" class="mb-8">
        <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-3">
          Dokumentasi &amp; Tampilan Aplikasi
        </div>
        <div class="rounded-xl overflow-hidden border border-neutral-200/80 bg-neutral-50 shadow-sm p-1.5">
          <img
            :src="project.screenshotUrl"
            :alt="`${project.title} Preview`"
            class="w-full h-auto object-contain rounded-lg max-h-80 bg-white"
            loading="lazy"
          />
        </div>
      </div>

      <!-- Case Study Blocks -->
      <div class="space-y-6 mb-8">
        <div>
          <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-1.5">
            01 / Challenge
          </div>
          <p class="text-sm text-neutral-600 leading-relaxed">{{ project?.challenge }}</p>
        </div>

        <div class="border-t border-neutral-100 pt-5">
          <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-1.5">
            02 / Architecture &amp; Approach
          </div>
          <p class="text-sm text-neutral-600 leading-relaxed">{{ project?.architecture }}</p>
        </div>

        <div class="border-t border-neutral-100 pt-5">
          <div class="text-[11px] font-bold text-neutral-950 uppercase tracking-[0.18em] mb-2.5">
            03 / Key Contributions &amp; Implementation
          </div>
          <ul class="space-y-2">
            <li
              v-for="(item, idx) in project?.keyContributions"
              :key="idx"
              class="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed"
            >
              <span class="text-neutral-400 select-none">&mdash;</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Tech Stack & Close -->
      <div class="pt-5 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in project?.tags"
            :key="tag"
            class="text-[11px] font-medium text-neutral-700 border border-neutral-200 px-2.5 py-1 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <button
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
