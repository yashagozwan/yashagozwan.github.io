<script setup lang="ts">
import { HOBBIES_SECTIONS } from '@/data/portfolio'
</script>

<template>
  <div
    class="bg-white text-gray-800 font-sans antialiased selection:bg-brand-500 selection:text-white overflow-x-hidden relative min-h-screen"
  >
    <!-- Ambient Background Gradients (Seamless with index.html) -->
    <div
      class="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-50/70 via-transparent to-transparent blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute top-[20%] left-0 -z-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-50/50 via-transparent to-transparent blur-3xl pointer-events-none"
    ></div>
    <div
      class="absolute top-[50%] right-0 -z-10 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-50/40 via-transparent to-transparent blur-3xl pointer-events-none"
    ></div>

    <!-- Simple Elegant Back Button -->
    <div class="max-w-5xl mx-auto px-6 pt-16">
      <RouterLink
        to="/"
        class="group inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest"
      >
        <svg
          class="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M15 19l-7-7 7-7"></path>
        </svg>
        Back to Home
      </RouterLink>
    </div>

    <!-- Hero Section -->
    <section class="max-w-5xl mx-auto pt-10 pb-16 px-6">
      <div class="max-w-2xl">
        <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Hobbies &amp; Passions
        </h1>
        <p class="text-base md:text-lg text-gray-500 leading-relaxed font-normal">
          Philosophical inquiry, physical discipline, and continuous exploration of mobile technologies. These form the
          foundation of my focus and lifestyle outside of build work.
        </p>
      </div>

      <!-- Quote Anchor Section (Nietzsche - Will & Discipline) -->
      <section class="max-w-5xl mx-auto pt-12 pb-12">
        <div
          class="bg-brand-50/10 border border-brand-100/25 backdrop-blur-sm rounded-3xl p-8 md:p-10 relative overflow-hidden"
        >
          <!-- Floating Ambient Glow -->
          <div
            class="absolute -right-10 -bottom-10 w-40 h-40 bg-brand-200/10 rounded-full blur-2xl pointer-events-none"
          ></div>

          <div class="relative flex flex-col md:flex-row items-start gap-6 md:gap-8">
            <!-- Quote Icon -->
            <div class="text-brand-600 bg-brand-50/50 p-3 rounded-2xl shrink-0">
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"
                />
              </svg>
            </div>

            <div class="space-y-4">
              <blockquote class="font-display text-lg md:text-xl font-medium italic text-gray-900 leading-relaxed">
                "The essential thing in heaven and earth is... that there should be long obedience in the same
                direction; there thereby results, and has always resulted in the long run, something which has made life
                worth living."
              </blockquote>

              <div
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-gray-100/50"
              >
                <div>
                  <cite class="text-xs font-bold text-gray-900 not-italic">— Friedrich Nietzsche</cite>
                  <span class="text-[10px] text-brand-600 font-semibold block uppercase tracking-wider mt-0.5"
                    >Beyond Good &amp; Evil (Aphorism 188)</span
                  >
                </div>
                <p class="text-xs text-gray-400 max-w-md leading-relaxed sm:text-right">
                  Disiplin konsisten di gym, kejernihan berpikir dalam filsafat, dan ketekunan menguasai arsitektur
                  Flutter adalah manifestasi dari satu arah kepatuhan jangka panjang untuk melahirkan keahlian rekayasa
                  perangkat lunak yang bernilai.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Hobbies Section (Data-Driven Elegantly Colored Theme Cards) -->
      <section class="max-w-5xl mx-auto pb-20 space-y-8">
        <div
          v-for="hobby in HOBBIES_SECTIONS"
          :key="hobby.id"
          class="border backdrop-blur-sm rounded-3xl p-8 md:p-12 space-y-6"
          :class="hobby.cardBgClass"
        >
          <div>
            <div class="text-brand-600 mb-3" v-html="hobby.icon"></div>
            <h3 class="font-display text-lg font-bold text-gray-900">{{ hobby.title }}</h3>
            <span class="text-xs text-brand-600 font-semibold tracking-wide uppercase mt-1 block">
              {{ hobby.subtitle }}
            </span>
          </div>

          <p class="text-gray-500 leading-relaxed text-sm md:text-base">
            {{ hobby.description }}
          </p>

          <!-- Timeline -->
          <div class="border-l border-brand-100/60 pl-4 space-y-5">
            <span class="text-[10px] font-bold text-brand-400 uppercase tracking-widest block mb-2">
              {{ hobby.timelineTitle }}
            </span>

            <div v-for="(item, idx) in hobby.milestones" :key="idx" class="relative pl-2">
              <div
                class="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full border-2"
                :class="
                  item.emphasized ? 'bg-brand-600 border-brand-100' : 'bg-white border-gray-200'
                "
              ></div>
              <span
                class="text-xs"
                :class="item.emphasized ? 'font-bold text-brand-600' : 'font-semibold text-gray-400'"
              >
                {{ item.period }}
              </span>
              <h5 class="text-xs font-bold text-gray-900">
                {{ item.title }}
                <span v-if="item.subtitleItalic" class="font-normal text-gray-400 italic font-sans ml-1">
                  {{ item.subtitleItalic }}
                </span>
              </h5>
              <p v-if="item.description" class="text-xs text-gray-400 mt-0.5">
                {{ item.description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- Footer -->
      <footer class="bg-white border-t border-gray-100 py-12">
        <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-gray-400 font-medium text-xs">© 2026 Yasha Gozwan Shuhada. All rights reserved.</p>
          <div class="flex items-center gap-6">
            <a
              href="https://github.com/yashagozwan"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-900 transition-colors text-xs font-medium"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yasha-gozwan-shuhada-b924a699"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-900 transition-colors text-xs font-medium"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/yashagozwan"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-900 transition-colors text-xs font-medium"
            >
              Instagram
            </a>
          </div>
        </div>
      </footer>
    </section>
  </div>
</template>
