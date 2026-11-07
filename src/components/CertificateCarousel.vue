<script setup lang="ts">
import { ref } from 'vue'
import { CERTIFICATES } from '@/data/portfolio'
import { trackSelectContent } from '@/utils/analytics'

const carouselRef = ref<HTMLElement | null>(null)
const scrollAmount = 340

function scrollPrev() {
  carouselRef.value?.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
}

function scrollNext() {
  carouselRef.value?.scrollBy({ left: scrollAmount, behavior: 'smooth' })
}
</script>

<template>
  <div class="pt-12 border-t border-neutral-200">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
      <div>
        <span class="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-2">
          Verified Credentials
        </span>
        <h3 class="font-display text-2xl font-bold text-neutral-950 tracking-tight">
          Flutter &amp; Dart Certifications
        </h3>
        <p class="text-sm text-neutral-500 mt-1">
          Selected coursework in Clean Architecture, SOLID principles, and cross-platform engineering.
        </p>
      </div>

      <!-- Carousel Scroll Controls -->
      <div class="flex items-center gap-2 self-end sm:self-auto shrink-0">
        <button
          id="cert-prev-btn"
          type="button"
          aria-label="Scroll left"
          class="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:border-neutral-950 text-neutral-600 hover:text-neutral-950 flex items-center justify-center transition-colors"
          @click="scrollPrev"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          id="cert-next-btn"
          type="button"
          aria-label="Scroll right"
          class="w-9 h-9 rounded-full border border-neutral-200 bg-white hover:border-neutral-950 text-neutral-600 hover:text-neutral-950 flex items-center justify-center transition-colors"
          @click="scrollNext"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Swipeable Cards Track -->
    <div
      id="cert-carousel"
      ref="carouselRef"
      class="flex gap-5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
    >
      <a
        v-for="cert in CERTIFICATES"
        :key="cert.id"
        :href="cert.url"
        target="_blank"
        rel="noopener noreferrer"
        class="group snap-start shrink-0 w-[290px] sm:w-[320px] bg-white border border-neutral-200 hover:border-neutral-950 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
        @click="trackSelectContent('certificate', cert.analyticsId)"
      >
        <div>
          <div class="flex items-center justify-between text-xs text-neutral-400 mb-4 font-mono">
            <span class="uppercase tracking-wider text-neutral-950 font-sans font-semibold text-[11px]">
              {{ cert.provider }}
            </span>
            <span>{{ cert.durationAndDate }}</span>
          </div>
          <h4 class="font-display text-base font-bold text-neutral-950 leading-snug mb-2">
            {{ cert.title }}
          </h4>
          <p class="text-xs text-neutral-500 mb-1">
            {{ cert.subtitleLabel }}: <span class="text-neutral-800 font-medium">{{ cert.subtitleValue }}</span>
          </p>
          <p v-if="cert.extraLabel" class="text-xs text-neutral-500">
            {{ cert.extraLabel }}: <span class="text-neutral-950 font-medium">{{ cert.extraValue }}</span>
          </p>
        </div>

        <div class="pt-4 mt-6 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span class="text-neutral-400">{{ cert.badgeText }}</span>
          <span class="font-semibold text-neutral-950 inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            Verify &nearr;
          </span>
        </div>
      </a>
    </div>
  </div>
</template>
