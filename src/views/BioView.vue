<script setup lang="ts">
// Bio & Profile Yin-Yang Monochrome Editorial View
</script>

<template>
  <div class="bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white min-h-screen flex flex-col">
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

        <div class="flex items-center gap-3 text-xs font-mono text-neutral-400 uppercase tracking-widest">
          <span>01 / Biography</span>
          <span class="font-jp text-[11px] text-neutral-400 hidden sm:inline">・ 略歴</span>
        </div>
      </div>
    </header>

    <!-- Main Content: Yin & Yang Architectural Grid -->
    <main class="flex-1 py-16 md:py-24 px-6">
      <div class="max-w-5xl mx-auto space-y-12">
        <!-- Editorial Header Row -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
          <div>
            <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-3">
              <span class="w-2 h-2 rounded-full bg-neutral-950"></span>
              <span>Flutter Mobile Specialist</span>
              <span class="font-jp text-[11px] font-normal text-neutral-400">・ フラッター</span>
            </div>
            <h1 class="font-display text-4xl md:text-5xl font-bold tracking-tight text-neutral-950">
              Profile &amp; <span class="font-serif italic font-normal">Biography</span>
            </h1>
          </div>
          <p class="font-jp text-xs text-neutral-400 tracking-widest uppercase">
            プロフィール・キャリア概要
          </p>
        </div>

        <!-- Bento Grid (12 Columns) -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <!-- 1. Left Column: Portrait & Identity Card (Yang — 5 Cols) -->
          <div
            class="lg:col-span-5 bg-[#FAFAFA] rounded-2xl p-6 sm:p-8 border border-neutral-200 flex flex-col justify-between"
          >
            <div>
              <div class="aspect-[4/5] rounded-xl overflow-hidden bg-neutral-200 mb-6 border border-neutral-200">
                <img
                  src="/images/yasha-bio.png"
                  alt="Yasha Gozwan Shuhada"
                  class="w-full h-full object-cover object-top grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                />
              </div>

              <div class="space-y-1">
                <span class="font-jp text-xs font-medium text-neutral-400 tracking-widest block">
                  ヤシャ・ゴズワン・シュハダ
                </span>
                <h2 class="font-display text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                  Yasha Gozwan Shuhada
                </h2>
                <p class="text-sm font-medium text-neutral-500">
                  Mobile Engineer (Flutter &amp; Native iOS / Android)
                </p>
              </div>
            </div>

            <!-- Metadata Footer -->
            <div class="mt-8 pt-5 border-t border-neutral-200 space-y-2.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-neutral-400">Location <span class="font-jp text-[11px]">所在地</span></span>
                <span class="font-semibold text-neutral-900">Jakarta, Indonesia</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-400">Education <span class="font-jp text-[11px]">学歴</span></span>
                <span class="font-semibold text-neutral-900">S2 Computer Science — IPB</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-400">Status <span class="font-jp text-[11px]">状態</span></span>
                <span class="font-semibold text-neutral-950 underline underline-offset-4">Available for Dialogue</span>
              </div>
            </div>
          </div>

          <!-- 2. Right Column: Career, Metrics & Philosophy (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col gap-6 justify-between">
            <!-- Top Bento: Current Role (YIN — Deep Obsidian Black Card) -->
            <article class="bg-neutral-950 text-white rounded-2xl p-7 sm:p-8 flex flex-col justify-between">
              <div>
                <div class="flex flex-wrap items-center justify-between gap-2 mb-5 text-xs font-mono uppercase tracking-widest text-neutral-400">
                  <span>Active Position <span class="font-jp text-[11px] font-normal">・ 現職</span></span>
                  <span class="px-2.5 py-0.5 border border-neutral-700 text-neutral-200 rounded-full text-[10px]">
                    Production Active
                  </span>
                </div>

                <h3 class="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Home Credit Indonesia
                </h3>
                <div class="text-sm font-medium text-neutral-400 mt-1 mb-4">
                  Jr. IT Developer &middot; Flutter Mobile Applications
                </div>

                <p class="text-sm text-neutral-300 leading-relaxed mb-2">
                  Developing and maintaining production-grade Flutter mobile applications across Android and iOS.
                  Applying Clean Architecture, Domain-Driven Design (DDD), and Bloc state management to deliver
                  scalable solutions to Google Play Store and Apple App Store.
                </p>
                <p class="font-jp text-xs text-neutral-500 leading-relaxed mb-6">
                  Flutterによる堅牢なモバイルアーキテクチャと洗練されたUI体験の構築。
                </p>

                <div class="flex flex-wrap gap-1.5">
                  <span
                    v-for="tech in [
                      'Flutter & Dart',
                      'Bloc State Management',
                      'Clean Architecture',
                      'DDD',
                      'CI/CD (Azure / GitLab)',
                      'Method Channel',
                    ]"
                    :key="tech"
                    class="px-3 py-1 border border-neutral-800 rounded-full text-[11px] font-medium text-neutral-300"
                  >
                    {{ tech }}
                  </span>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-neutral-800 flex flex-wrap justify-between items-center text-xs text-neutral-500 font-mono">
                <span>Google Play &amp; App Store</span>
                <span>Mar 2024 &ndash; Present</span>
              </div>
            </article>

            <!-- Middle Row Bento: Two Stat Cards (YANG — Crisp White) -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col justify-between">
                <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                  Experience <span class="font-jp text-[11px]">・ 実務歴</span>
                </div>
                <div>
                  <div class="font-display text-4xl font-bold text-neutral-950 tracking-tight flex items-baseline gap-1.5">
                    4+ <span class="text-base font-normal text-neutral-400 font-sans">Years</span>
                  </div>
                  <p class="text-xs text-neutral-500 mt-2 leading-relaxed">
                    Production-grade Flutter &amp; cross-platform mobile application engineering.
                  </p>
                </div>
              </div>

              <div class="bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col justify-between">
                <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-3">
                  Credentials <span class="font-jp text-[11px]">・ 修了資格</span>
                </div>
                <div>
                  <div class="font-display text-4xl font-bold text-neutral-950 tracking-tight flex items-baseline gap-1.5">
                    35+ <span class="text-base font-normal text-neutral-400 font-sans">Programs</span>
                  </div>
                  <p class="text-xs text-neutral-500 mt-2 leading-relaxed">
                    Verified bootcamps and specializations from Google, Dicoding, and industry leaders.
                  </p>
                </div>
              </div>
            </div>

            <!-- Bottom Row Bento: Domain + Philosophy -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6">
              <!-- Specialization (5 cols) -->
              <div class="md:col-span-5 bg-white rounded-2xl p-6 border border-neutral-200 flex flex-col justify-between">
                <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Domain <span class="font-jp text-[11px]">・ 専門領域</span>
                </div>
                <div>
                  <h4 class="font-display text-lg font-bold text-neutral-950 mb-1.5">Flutter &amp; Architecture</h4>
                  <p class="text-xs text-neutral-600 leading-relaxed mb-2">
                    Flutter &middot; Dart &middot; Bloc &middot; Clean Architecture &middot; Native iOS &amp; Android
                  </p>
                  <p class="font-jp text-[11px] text-neutral-400 leading-relaxed">
                    洗練されたUI設計から堅牢な状態管理、ストア配信まで一貫した開発。
                  </p>
                </div>
              </div>

              <!-- Philosophy & Connect (7 cols) -->
              <div class="md:col-span-7 bg-[#FAFAFA] rounded-2xl p-6 border border-neutral-200 flex flex-col justify-between">
                <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                  Philosophy <span class="font-jp text-[11px]">・ 設計思想</span>
                </div>
                <div>
                  <p class="font-serif italic text-sm text-neutral-800 leading-relaxed mb-1.5">
                    &ldquo;Thoughtful mobile engineering emerges at the intersection of quiet craftsmanship, resilient
                    clean architecture, and intuitive user experiences.&rdquo;
                  </p>
                  <p class="font-jp text-[11px] text-neutral-400 leading-relaxed mb-4">
                    「優れたソフトウェアとは、静かなる職人技と明快な設計の調和。」
                  </p>
                </div>
                <div class="pt-4 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div class="flex items-center gap-4">
                    <a
                      href="https://1drv.ms/w/c/3a9078387366ac10/IQDvgYAtuqWsQob5YH9n7O-xAZACWNW0mJR8rGJ-OCwm6AA?e=ZjleGe"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-semibold text-neutral-950 hover:underline underline-offset-4"
                    >
                      CV &nearr;
                    </a>
                    <a
                      href="https://github.com/yashagozwan"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
                    >
                      GitHub &nearr;
                    </a>
                    <a
                      href="https://www.linkedin.com/in/yasha-gozwan-shuhada-b924a699/"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="font-semibold text-neutral-600 hover:text-neutral-950 transition-colors"
                    >
                      LinkedIn &nearr;
                    </a>
                  </div>
                  <a
                    href="mailto:yashagozwan13@gmail.com"
                    class="inline-flex items-center gap-1.5 px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full font-semibold uppercase tracking-widest text-[10px] transition-all"
                  >
                    Contact <span class="font-jp font-normal text-neutral-300">連絡</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
