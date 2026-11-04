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
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm transition-all duration-300"
    :class="isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'"
    @click.self="emit('close')"
  >
    <div
      id="ideas-modal-content"
      class="bg-[#FAF8F5] border border-stone-200/90 rounded-[2rem] p-7 sm:p-9 max-w-lg w-full shadow-2xl transition-all duration-300 relative space-y-6"
      :class="isOpen ? 'scale-100' : 'scale-95'"
    >
      <!-- Close button -->
      <button
        id="close-ideas-modal"
        type="button"
        aria-label="Close"
        class="absolute top-6 right-6 text-stone-400 hover:text-stone-700 transition-colors p-1.5 rounded-full hover:bg-stone-200/50"
        @click="emit('close')"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <!-- Badge & Icon -->
      <div
        class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-stone-100 text-stone-700 rounded-full text-xs font-semibold tracking-wide"
      >
        <svg class="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
          />
        </svg>
        <span>Personal Digital Bookshelf</span>
      </div>

      <!-- Main Message -->
      <div>
        <h3
          id="ideas-modal-title"
          class="font-display text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight mb-3"
        >
          A Note Before Proceeding
        </h3>
        <p class="font-sans text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
          The <strong>Ideas &amp; Reflections</strong> archive is a personal space dedicated to philosophical
          reflections, book notes, and thoughts explored outside of technology &mdash;
          <span class="text-stone-900 font-semibold underline decoration-stone-300">
            it does not discuss coding, programming ideas, or software tutorials</span
          >.
        </p>
        <p class="text-stone-500 text-xs sm:text-sm mt-3 italic font-serif">
          &ldquo;A personal archive of curiosity, thinking, and reading outside of code.&rdquo;
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="pt-2 flex flex-col-reverse sm:flex-row items-center justify-end gap-3">
        <button
          id="cancel-ideas-modal"
          type="button"
          class="w-full sm:w-auto px-5 py-3 rounded-full text-xs font-semibold text-stone-600 hover:text-stone-900 hover:bg-stone-200/50 transition-all text-center"
          @click="emit('close')"
        >
          Stay Here
        </button>
        <RouterLink
          id="confirm-ideas-modal"
          to="/ideas"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white text-xs font-semibold rounded-full shadow-md hover:shadow-lg transition-all text-center"
          @click.prevent="handleConfirm"
        >
          Continue to Archive &rarr;
        </RouterLink>
      </div>
    </div>
  </div>
</template>

