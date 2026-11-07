<script setup lang="ts">
import { ref } from 'vue'
import { DICODING_FLUTTER_PATH } from '@/data/portfolio'

const trackRef = ref<HTMLElement | null>(null)

function scrollPrev() {
  trackRef.value?.scrollBy({ left: -280, behavior: 'smooth' })
}

function scrollNext() {
  trackRef.value?.scrollBy({ left: 280, behavior: 'smooth' })
}
</script>

<template>
  <div class="pt-12 border-t border-neutral-200">
    <!-- Minimalist Editorial Header -->
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
      <div>
        <span class="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] block mb-2">
          Dicoding &times; Google Official Curriculum
        </span>
        <h3 class="font-display text-2xl font-bold text-neutral-950 tracking-tight">
          Multi-Platform App Developer Path
        </h3>
        <p class="text-sm text-neutral-500 mt-1 max-w-xl">
          Seven-stage professional specialization from Dart foundations and SOLID architecture to Flutter Expert mastery.
        </p>
      </div>

      <!-- Subtle Monochrome Scroll Controls -->
      <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <span class="text-xs text-neutral-400 mr-2 font-mono">358h &middot; 07 Stages</span>
        <button
          type="button"
          aria-label="Scroll timeline left"
          class="w-9 h-9 rounded-full border border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-950 flex items-center justify-center transition-colors"
          @click="scrollPrev"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Scroll timeline right"
          class="w-9 h-9 rounded-full border border-neutral-200 text-neutral-600 hover:text-neutral-950 hover:border-neutral-950 flex items-center justify-center transition-colors"
          @click="scrollNext"
        >
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Pure Yin-Yang Horizontal Timeline -->
    <div
      ref="trackRef"
      class="flex overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
    >
      <div
        v-for="(item, idx) in DICODING_FLUTTER_PATH"
        :key="item.id"
        class="snap-start shrink-0 w-60 sm:w-64 pr-8 relative flex flex-col justify-between"
      >
        <div>
          <!-- Step Number & Hours -->
          <div class="flex items-center justify-between text-xs mb-3 font-mono">
            <span
              :class="
                item.status === 'completed'
                  ? 'font-semibold text-neutral-950'
                  : 'font-semibold text-neutral-500'
              "
            >
              0{{ item.step }}
            </span>
            <span class="text-neutral-400">{{ item.hours }}h</span>
          </div>

          <!-- Continuous Horizontal Line + Yin/Yang Dot -->
          <div class="relative flex items-center mb-6">
            <div
              class="w-3 h-3 rounded-full z-10 shrink-0 transition-transform"
              :class="
                item.status === 'completed'
                  ? 'bg-neutral-950'
                  : 'bg-white border-2 border-neutral-950 ring-4 ring-neutral-100'
              "
            ></div>

            <div
              v-if="idx < DICODING_FLUTTER_PATH.length - 1"
              class="h-px flex-1 -mr-8"
              :class="
                DICODING_FLUTTER_PATH[idx + 1]?.status === 'completed'
                  ? 'bg-neutral-950'
                  : 'bg-neutral-200'
              "
            ></div>
            <div v-else class="h-px flex-1 bg-neutral-200"></div>
          </div>

          <!-- Stage Focus & Course Name -->
          <div class="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-1.5">
            {{ item.milestoneTitle }}
          </div>
          <h4 class="font-display text-sm font-bold text-neutral-950 leading-snug mb-2">
            {{ item.courseTitle }}
          </h4>
          <p class="text-xs text-neutral-500 leading-relaxed">
            {{ item.description }}
          </p>
        </div>

        <!-- Minimal Status Footer -->
        <div class="pt-4 mt-5 border-t border-neutral-100 flex items-center justify-between text-[11px]">
          <span class="text-neutral-400 font-mono">{{ item.modules }} modules</span>
          <span
            v-if="item.status === 'completed'"
            class="font-medium text-neutral-500"
          >
            Completed
          </span>
          <span
            v-else
            class="font-semibold text-neutral-950 underline underline-offset-4"
          >
            Final Stage
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
