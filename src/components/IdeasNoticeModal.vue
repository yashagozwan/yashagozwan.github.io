<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const router = useRouter()

function handleConfirm() {
  document.body.style.overflow = ''
  emit('close')
  router.push('/ideas')
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.isOpen) {
    emit('close')
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = open ? 'hidden' : ''
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
    id="ideas-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="ideas-modal-title"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm transition-all duration-300"
    :class="isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div
      id="ideas-modal-content"
      class="bg-white border border-neutral-200 rounded-2xl p-8 sm:p-10 max-w-lg w-full shadow-2xl transition-all duration-300 relative space-y-6"
      :class="isOpen ? 'scale-100' : 'scale-95'"
    >
      <!-- Close button -->
      <button
        id="close-ideas-modal"
        type="button"
        aria-label="Close"
        class="absolute top-6 right-6 text-neutral-400 hover:text-neutral-950 transition-colors p-2 rounded-full hover:bg-neutral-100"
        @click="emit('close')"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
        Personal Reading Archive
      </div>

      <!-- Main Message -->
      <div>
        <h3
          id="ideas-modal-title"
          class="font-display text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mb-3"
        >
          A Note Before Proceeding
        </h3>
        <p class="font-sans text-neutral-600 text-sm sm:text-base leading-relaxed">
          The <strong>Ideas &amp; Reflections</strong> archive is a personal space dedicated to philosophical
          reflections, book notes, and essays explored outside of software engineering &mdash;
          <span class="text-neutral-950 font-medium underline underline-offset-4">
            it does not discuss coding or programming tutorials</span
          >.
        </p>
        <p class="text-neutral-400 text-sm mt-4 italic font-serif">
          &ldquo;A quiet archive of curiosity, thinking, and reading beyond code.&rdquo;
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="pt-4 border-t border-neutral-100 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
        <button
          id="cancel-ideas-modal"
          type="button"
          class="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-semibold uppercase tracking-widest text-neutral-500 hover:text-neutral-950 transition-all text-center"
          @click="emit('close')"
        >
          Stay Here
        </button>
        <RouterLink
          id="confirm-ideas-modal"
          to="/ideas"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-all text-center"
          @click.prevent="handleConfirm"
        >
          Enter Archive &rarr;
        </RouterLink>
      </div>
    </div>
  </div>
</template>
