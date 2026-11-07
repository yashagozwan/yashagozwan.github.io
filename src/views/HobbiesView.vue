<script setup lang="ts">
import { HOBBIES_SECTIONS } from '@/data/portfolio'
</script>

<template>
  <div
    class="bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white overflow-x-hidden min-h-screen flex flex-col"
  >
    <!-- Minimalist Top Header -->
    <header class="w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      <div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <RouterLink
          to="/"
          class="group inline-flex items-center gap-2.5 text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors uppercase tracking-[0.18em]"
        >
          <svg
            class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M15 19l-7-7 7-7"></path>
          </svg>
          <span>Back to Portfolio</span>
        </RouterLink>

        <div class="text-xs font-mono text-neutral-400 uppercase tracking-widest">
          02 / Discipline &amp; Hobbies
        </div>
      </div>
    </header>

    <main class="flex-1 max-w-5xl mx-auto px-6 py-16 md:py-24 w-full">
      <!-- Editorial Header -->
      <section class="max-w-3xl mb-14">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
          <span class="w-2 h-2 rounded-full bg-neutral-950"></span>
          <span>Life Outside of Code</span>
        </div>
        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-950 tracking-tight leading-[1.1] mb-6">
          Cultivating clarity, <span class="font-serif italic font-normal">strength,</span> and craft.
        </h1>
        <p class="text-base md:text-lg text-neutral-600 leading-relaxed">
          Beyond software engineering, my routine is anchored by philosophical inquiry, structured physical training,
          and deep technical exploration.
        </p>
      </section>

      <!-- YIN: Quote Anchor Section (Nietzsche — Obsidian Black Card) -->
      <section class="mb-20">
        <div class="bg-neutral-950 text-white rounded-2xl p-8 md:p-12">
          <blockquote class="font-serif italic text-xl md:text-2xl text-white leading-relaxed mb-8">
            &ldquo;The essential thing in heaven and earth is... that there should be long obedience in the same
            direction; there thereby results, and has always resulted in the long run, something which has made life
            worth living.&rdquo;
          </blockquote>

          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-6 border-t border-neutral-800">
            <div>
              <cite class="text-xs font-bold text-white not-italic uppercase tracking-widest block">
                &mdash; Friedrich Nietzsche
              </cite>
              <span class="text-xs text-neutral-400 font-mono mt-1 block">
                Beyond Good &amp; Evil (Aphorism 188)
              </span>
            </div>
            <p class="text-xs text-neutral-400 max-w-md leading-relaxed sm:text-right">
              Consistent discipline in the gym, clarity of thought in philosophy, and persistence in mastering Flutter
              architecture are manifestations of a single long-term direction.
            </p>
          </div>
        </div>
      </section>

      <!-- YANG: Hobbies & Timelines Ledger -->
      <section class="divide-y divide-neutral-200 border-t border-b border-neutral-200">
        <article
          v-for="(hobby, index) in HOBBIES_SECTIONS"
          :key="hobby.id"
          class="py-14 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start"
        >
          <!-- Left Narrative Column (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            <div class="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
              <span>0{{ index + 1 }}</span>
              <span class="w-6 h-px bg-neutral-300"></span>
              <span>{{ hobby.subtitle }}</span>
            </div>
            <h2 class="font-display text-2xl md:text-3xl font-bold text-neutral-950 tracking-tight">
              {{ hobby.title }}
            </h2>
            <p class="text-neutral-600 leading-relaxed text-sm md:text-base">
              {{ hobby.description }}
            </p>
          </div>

          <!-- Right Minimalist Timeline Column (7 Cols) -->
          <div class="lg:col-span-7">
            <div class="text-[11px] font-bold text-neutral-400 uppercase tracking-[0.2em] mb-6">
              {{ hobby.timelineTitle }}
            </div>

            <div class="border-l border-neutral-200 pl-6 space-y-6">
              <div v-for="(item, idx) in hobby.milestones" :key="idx" class="relative">
                <!-- Yin / Yang Timeline Dot -->
                <div
                  class="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full"
                  :class="
                    item.emphasized
                      ? 'bg-neutral-950'
                      : 'bg-white border-2 border-neutral-400'
                  "
                ></div>

                <span
                  class="text-xs font-mono block mb-0.5"
                  :class="item.emphasized ? 'font-semibold text-neutral-950' : 'text-neutral-400'"
                >
                  {{ item.period }}
                </span>
                <h3 class="text-sm font-bold text-neutral-950">
                  {{ item.title }}
                  <span v-if="item.subtitleItalic" class="font-normal text-neutral-400 italic font-serif ml-1">
                    {{ item.subtitleItalic }}
                  </span>
                </h3>
                <p v-if="item.description" class="text-xs sm:text-sm text-neutral-500 mt-1 leading-relaxed">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </article>
      </section>
    </main>

    <!-- Minimalist Monochrome Footer -->
    <footer class="border-t border-neutral-200 bg-white py-12 px-6">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <p>&copy; {{ new Date().getFullYear() }} Yasha Gozwan Shuhada.</p>
        <div class="flex items-center gap-6 font-medium text-neutral-500">
          <RouterLink to="/" class="hover:text-neutral-950 transition-colors">Portfolio</RouterLink>
          <RouterLink to="/bio" class="hover:text-neutral-950 transition-colors">Bio</RouterLink>
          <RouterLink to="/ideas" class="hover:text-neutral-950 transition-colors">Ideas</RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>
