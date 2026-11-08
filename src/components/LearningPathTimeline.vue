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
        <div class="inline-flex items-center gap-2 mb-2">
          <span class="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em]">
            Dicoding &times; Google Official Curriculum
          </span>
          <span class="text-neutral-300">&bull;</span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-950 text-white text-[10px] font-mono uppercase tracking-wider font-semibold">
            All 7 Stages Completed
          </span>
        </div>
        <h3 class="font-display text-2xl font-bold text-neutral-950 tracking-tight">
          Multi-Platform App Developer Path
        </h3>
        <p class="text-sm text-neutral-500 mt-1 max-w-xl">
          Completed end-to-end professional specialization from Dart foundations and SOLID architecture to Flutter Expert graduation.
        </p>
      </div>

      <!-- Subtle Monochrome Scroll Controls -->
      <div class="flex items-center gap-2 shrink-0 self-end sm:self-auto">
        <span class="text-xs text-neutral-400 mr-2 font-mono">358h &middot; 7/7 Completed</span>
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

    <!-- Pure Yin-Yang Horizontal Timeline with Hover Tooltips -->
    <div
      ref="trackRef"
      class="flex overflow-x-auto pt-14 pb-6 scroll-smooth snap-x snap-mandatory no-scrollbar"
    >
      <div
        v-for="(item, idx) in DICODING_FLUTTER_PATH"
        :key="item.id"
        class="group/step snap-start shrink-0 w-60 sm:w-64 pr-8 relative flex flex-col justify-between"
      >
        <!-- Floating Interactive Tooltip on Hover -->
        <div
          class="absolute -top-12 left-0 z-30 opacity-0 pointer-events-none group-hover/step:opacity-100 group-hover/step:pointer-events-auto transition-all duration-200 -translate-y-1 group-hover/step:translate-y-0"
        >
          <div
            class="bg-neutral-950 text-white border border-neutral-800 rounded-xl px-3.5 py-2 shadow-2xl flex items-center gap-3 whitespace-nowrap"
          >
            <div class="flex items-center gap-1.5 text-[11px] font-mono text-neutral-300">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Official Credential</span>
            </div>

            <a
              v-if="item.certificateUrl"
              :href="item.certificateUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white text-neutral-950 hover:bg-neutral-200 text-[10px] font-bold uppercase tracking-wider transition-colors shadow-sm"
              @click.stop
            >
              <span>View Certificate</span>
              <span>&nearr;</span>
            </a>
          </div>

          <!-- Little Tooltip Pointer Arrow -->
          <div class="w-2 h-2 bg-neutral-950 border-r border-b border-neutral-800 rotate-45 ml-4 -mt-1"></div>
        </div>

        <div>
          <!-- Step Number & Hours -->
          <div class="flex items-center justify-between text-xs mb-3 font-mono">
            <span class="font-semibold text-neutral-950 group-hover/step:text-neutral-600 transition-colors">
              0{{ item.step }}
            </span>
            <span class="text-neutral-400">{{ item.hours }}h</span>
          </div>

          <!-- Continuous Horizontal Line + Dot with hover expand effect -->
          <div class="relative flex items-center mb-6">
            <div
              class="w-3 h-3 rounded-full z-10 shrink-0 transition-all duration-200 bg-neutral-950 group-hover/step:scale-125 group-hover/step:ring-4 group-hover/step:ring-neutral-200 cursor-pointer"
            ></div>

            <div
              v-if="idx < DICODING_FLUTTER_PATH.length - 1"
              class="h-px flex-1 -mr-8 bg-neutral-950"
            ></div>
            <div v-else class="h-px flex-1 bg-neutral-950"></div>
          </div>

          <!-- Stage Focus & Course Name -->
          <div class="text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-400 mb-1.5">
            {{ item.milestoneTitle }}
          </div>
          <h4 class="font-display text-sm font-bold text-neutral-950 leading-snug mb-2 group-hover/step:text-neutral-600 transition-colors">
            {{ item.courseTitle }}
          </h4>
          <p class="text-xs text-neutral-500 leading-relaxed">
            {{ item.description }}
          </p>
        </div>

        <!-- Minimal Status Footer with Certificate Link -->
        <div class="pt-4 mt-5 border-t border-neutral-100 flex items-center justify-between text-[11px]">
          <span class="text-neutral-400 font-mono">{{ item.modules }} modules</span>
          <a
            v-if="item.certificateUrl"
            :href="item.certificateUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="font-semibold text-neutral-950 hover:text-neutral-600 transition-colors inline-flex items-center gap-1 group/cert"
            :title="`Verify certificate for ${item.courseTitle}`"
          >
            <span>Verify</span>
            <span class="text-neutral-400 group-hover/cert:text-neutral-950">&nearr;</span>
          </a>
          <span v-else class="font-medium text-neutral-700 flex items-center gap-1">
            <span class="text-neutral-950 font-bold">&#10003;</span>
            Completed
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
