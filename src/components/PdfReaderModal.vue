<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import type { IdeaDocument } from '@/types/portfolio'
import { trackSelectContent } from '@/utils/analytics'

const props = defineProps<{
  document: IdeaDocument | null
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isLoading = ref(true)

const embedUrl = computed(() => {
  if (!props.document?.googleDriveUrl) return ''
  return props.document.googleDriveUrl.replace(/\/view(\?.*)?$/, '/preview')
})

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.document) {
    emit('close')
  }
}

watch(
  () => props.document,
  (val) => {
    isLoading.value = true
    if (typeof document !== 'undefined') {
      document.body.style.overflow = val ? 'hidden' : ''
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
    role="dialog"
    aria-modal="true"
    aria-labelledby="pdf-reader-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-neutral-950/80 backdrop-blur-sm transition-all duration-300"
    :class="document ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div
      class="bg-white border border-neutral-200 rounded-2xl max-w-5xl w-full h-[88vh] shadow-2xl flex flex-col overflow-hidden transition-all duration-300"
      :class="document ? 'scale-100' : 'scale-95'"
    >
      <!-- Reader Top Bar -->
      <div class="px-6 py-4 bg-white border-b border-neutral-200 flex items-center justify-between gap-4 shrink-0">
        <div class="min-w-0">
          <div class="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-neutral-400">
            <span>{{ document?.category || 'Reflection' }}</span>
            <span>&middot;</span>
            <span>{{ document?.date || '2026' }}</span>
          </div>
          <h3 id="pdf-reader-title" class="font-serif italic text-lg sm:text-xl text-neutral-950 font-normal truncate">
            {{ document?.title }}
          </h3>
        </div>

        <div class="flex items-center gap-2.5 shrink-0">
          <a
            v-if="document"
            :href="document.googleDriveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-all"
            @click="trackSelectContent('document', `${document.id}_external`)"
          >
            <span>Open Drive</span>
            <span>&nearr;</span>
          </a>
          <button
            type="button"
            aria-label="Close reader"
            class="p-2 rounded-full text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
            @click="emit('close')"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Embedded PDF Frame -->
      <div class="relative flex-1 bg-neutral-100">
        <div
          v-if="isLoading"
          class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-500 bg-neutral-100 z-10"
        >
          <div class="w-7 h-7 rounded-full border-2 border-neutral-300 border-t-neutral-950 animate-spin"></div>
          <p class="text-xs font-mono uppercase tracking-widest">Loading document...</p>
        </div>
        <iframe
          v-if="embedUrl"
          :src="embedUrl"
          :title="document?.title || 'Document Preview'"
          class="w-full h-full border-0"
          allow="autoplay"
          @load="isLoading = false"
        ></iframe>
      </div>
    </div>
  </div>
</template>
