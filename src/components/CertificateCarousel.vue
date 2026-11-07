<script setup lang="ts">
import { ref } from 'vue'
import { CERTIFICATES } from '@/data/portfolio'
import { trackSelectContent } from '@/utils/analytics'

const carouselRef = ref<HTMLElement | null>(null)
const scrollAmount = 350

function scrollPrev() {
  carouselRef.value?.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
}

function scrollNext() {
  carouselRef.value?.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}

function getProviderPillClass(color: 'purple' | 'blue' | 'amber') {
  if (color === 'blue') {
    return 'bg-blue-50 text-blue-700 border-blue-100'
  }
  if (color === 'amber') {
    return 'bg-amber-50 text-amber-800 border-amber-200/70'
  }
  return 'bg-purple-50 text-purple-700 border-purple-100'
}

function getProviderDotClass(color: 'purple' | 'blue' | 'amber') {
  if (color === 'blue') return 'bg-blue-600'
  if (color === 'amber') return 'bg-amber-500'
  return 'bg-purple-600'
}
</script>

<template>
  <div class="mt-16 bg-gradient-to-b from-white to-gray-50/50 border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
      <div>
        <div
          class="inline-flex items-center gap-2 px-3 py-1 bg-brand-50 text-brand-600 rounded-full text-xs font-semibold tracking-wide uppercase mb-2 border border-brand-100"
        >
          Verified Specializations
        </div>
        <h3 class="font-display text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Flutter &amp; Dart Certifications
        </h3>
        <p class="text-sm text-gray-500 mt-1">
          Verified credentials focusing on Clean Architecture, SOLID design patterns, and framework mastery.
        </p>
      </div>

      <!-- Carousel Scroll Controls -->
      <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <span class="text-xs font-medium text-gray-400 mr-1 sm:hidden">Swipe &harr;</span>
        <button
          id="cert-prev-btn"
          type="button"
          aria-label="Scroll left"
          class="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:text-brand-600 hover:border-brand-200 text-gray-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
          @click="scrollPrev"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          id="cert-next-btn"
          type="button"
          aria-label="Scroll right"
          class="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-gray-50 hover:text-brand-600 hover:border-brand-200 text-gray-700 flex items-center justify-center transition-all shadow-sm active:scale-95"
          @click="scrollNext"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Swipeable Cards Track -->
    <div
      id="cert-carousel"
      ref="carouselRef"
      class="flex gap-5 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
    >
      <a
        v-for="cert in CERTIFICATES"
        :key="cert.id"
        :href="cert.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group snap-start shrink-0 w-[290px] sm:w-[330px] md:w-[340px] bg-white border border-gray-200/80 hover:border-brand-300 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
        @click="trackSelectContent('certificate', cert.analyticsId)"
      >
        <div>
          <div class="flex items-center justify-between mb-4">
            <span
              class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
              :class="getProviderPillClass(cert.providerColor)"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="getProviderDotClass(cert.providerColor)"></span>
              {{ cert.provider }}
            </span>
            <span class="text-xs font-medium text-gray-400">{{ cert.durationAndDate }}</span>
          </div>
          <h4
            class="font-display text-lg font-bold text-gray-900 group-hover:text-brand-600 transition-colors leading-snug mb-2"
          >
            {{ cert.title }}
          </h4>
          <p class="text-xs text-gray-500" :class="cert.extraLabel ? 'mb-1' : 'mb-4'">
            {{ cert.subtitleLabel }}: <span class="text-gray-700 font-medium">{{ cert.subtitleValue }}</span>
          </p>
          <p v-if="cert.extraLabel" class="text-xs text-gray-500 mb-4">
            {{ cert.extraLabel }}: <span class="text-brand-600 font-medium">{{ cert.extraValue }}</span>
          </p>
        </div>
        <div class="pt-4 border-t border-gray-100 flex items-center justify-between">
          <span class="text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md">{{ cert.badgeText }}</span>
          <span
            class="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:text-brand-700 transition-colors"
          >
            Verify Credential
            <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </span>
        </div>
      </a>
    </div>
  </div>
</template>

