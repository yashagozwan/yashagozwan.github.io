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

  <!-- Floating Back to Top Button -->
  <Transition name="page">
    <button
      v-if="showScrollTop"
      type="button"
      aria-label="Scroll to top"
      class="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gray-900/90 hover:bg-brand-600 text-white shadow-lg shadow-gray-900/20 backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:-translate-y-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-brand-500"
      @click="scrollToTop"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>
