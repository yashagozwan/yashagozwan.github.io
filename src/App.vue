<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'

const showScrollTop = ref(false)

function handleScroll() {
  showScrollTop.value = window.scrollY > 450
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <RouterView v-slot="{ Component, route }">
    <Transition name="page" mode="out-in">
      <component :is="Component" v-if="Component" :key="route.path" />
    </Transition>
  </RouterView>

  <!-- Minimalist Monochrome Back to Top Button -->
  <Transition name="page">
    <button
      v-if="showScrollTop"
      type="button"
      aria-label="Scroll to top"
      class="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-neutral-950 hover:bg-neutral-800 text-white border border-neutral-800 shadow-lg flex items-center justify-center transition-all duration-300 hover:-translate-y-0.5 active:scale-95 focus:outline-none"
      @click="scrollToTop"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
