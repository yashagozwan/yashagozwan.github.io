<script setup lang="ts">
import { computed } from 'vue'
import { LESSON_META } from '@/data/nihongoLesson1'
import {
  ClockIcon,
  TrophyIcon,
  BookOpenIcon,
  CheckIcon,
  LightBulbIcon,
  SpeakerWaveIcon,
  CpuChipIcon,
  SquaresPlusIcon,
  ChatBubbleLeftRightIcon,
  ArrowRightIcon,
} from '@heroicons/vue/24/outline'

const props = withDefaults(
  defineProps<{
    lessonNumber?: number
    completedSessionCount: number
    totalSessionCount: number
    meta?: any
  }>(),
  {
    lessonNumber: 1,
    meta: () => LESSON_META,
  }
)

const emit = defineEmits<{
  (e: 'start-lesson'): void
}>()

const activeMeta = computed(() => props.meta || LESSON_META)
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Hero Banner -->
    <div class="bg-white border-2 border-neutral-950 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
      <div class="absolute -right-8 -bottom-8 text-neutral-100 font-display font-black text-9xl select-none pointer-events-none">
        0{{ props.lessonNumber }}
      </div>

      <div class="relative z-10 space-y-4 max-w-2xl">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-neutral-100 rounded-full text-xs font-mono font-bold uppercase tracking-wider text-neutral-700">
          <span>Session 01</span>
          <span>&bull;</span>
          <span>Pengantar &amp; Orientasi Bab {{ props.lessonNumber }}</span>
        </div>

        <h2 class="font-display text-3xl sm:text-4xl font-black text-neutral-950 tracking-tight leading-tight">
          <template v-if="props.lessonNumber === 1">
            Selamat Datang di Bab 1:<br class="hidden sm:inline" /> Perkenalan Diri (自己紹介)
          </template>
          <template v-else>
            Selamat Datang di Bab 2:<br class="hidden sm:inline" /> Benda &amp; Kata Tunjuk (これ・それ・あれ)
          </template>
        </h2>

        <p class="text-sm sm:text-base text-neutral-600 leading-relaxed">
          {{ activeMeta.description }}
        </p>

        <!-- Meta Info Pills -->
        <div class="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
          <div class="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-700 flex items-center gap-1.5">
            <ClockIcon class="w-4 h-4 text-neutral-500" />
            <span>Estimasi Waktu: <strong>~60 Menit (8 Sesi)</strong></span>
          </div>
          <div class="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-700 flex items-center gap-1.5">
            <TrophyIcon class="w-4 h-4 text-amber-500" />
            <span>Reward Total: <strong>+250 XP</strong></span>
          </div>
          <div class="px-3 py-1.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-700 flex items-center gap-1.5">
            <BookOpenIcon class="w-4 h-4 text-neutral-500" />
            <span>Tingkat: <strong>Pemula Mutlak (N5 Dasar)</strong></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Objectives Grid -->
    <div class="space-y-4">
      <div class="flex items-center justify-between border-b border-neutral-200 pb-3">
        <h3 class="font-display font-bold text-lg text-neutral-950">
          Target Kompetensi yang Akan Anda Kuasai
        </h3>
        <span class="text-xs font-mono text-neutral-400">{{ activeMeta.targets?.length || 4 }} Capaian Utama</span>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div
          v-for="(target, idx) in activeMeta.targets"
          :key="idx"
          class="bg-white border border-neutral-200 hover:border-neutral-950 rounded-2xl p-5 space-y-2 transition-all shadow-xs"
        >
          <div class="flex items-center justify-between">
            <span class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider font-bold">
              Target 0{{ idx + 1 }}
            </span>
            <span class="w-6 h-6 rounded-full bg-neutral-100 text-neutral-700 text-xs font-bold flex items-center justify-center">
              <CheckIcon class="w-3.5 h-3.5 text-emerald-600" />
            </span>
          </div>
          <h4 class="font-bold text-base text-neutral-950">{{ target.title }}</h4>
          <p class="text-xs text-neutral-600 leading-relaxed">{{ target.result }}</p>
        </div>
      </div>
    </div>

    <!-- How to Learn Effectively -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-7 space-y-4">
      <h3 class="font-display font-bold text-base text-neutral-950 flex items-center gap-2">
        <LightBulbIcon class="w-5 h-5 text-amber-500" />
        <span>Metode Belajar Aktif (Active Recall &amp; Micro-sessions)</span>
      </h3>
      <p class="text-xs text-neutral-600 leading-relaxed">
        Pelajaran ini dibagi menjadi 8 sesi interaktif berukuran ringkas (*bite-sized*). Anda tidak hanya membaca teks, tetapi juga mendengarkan suara penutur asli, membalik kartu hafalan, membongkar balok kalimat, menyusun kata acak, dan berdialog peran (*roleplay*).
      </p>

      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-center text-xs">
        <div class="bg-white p-3 rounded-xl border border-neutral-200 flex flex-col items-center">
          <SpeakerWaveIcon class="w-6 h-6 text-neutral-800 mb-1" />
          <div class="font-bold text-neutral-900">Dengar</div>
          <div class="text-[10px] text-neutral-400">Audio penutur asli</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-neutral-200 flex flex-col items-center">
          <CpuChipIcon class="w-6 h-6 text-neutral-800 mb-1" />
          <div class="font-bold text-neutral-900">Paham</div>
          <div class="text-[10px] text-neutral-400">Visual balok rumus</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-neutral-200 flex flex-col items-center">
          <SquaresPlusIcon class="w-6 h-6 text-neutral-800 mb-1" />
          <div class="font-bold text-neutral-900">Susun</div>
          <div class="text-[10px] text-neutral-400">Sentence builder</div>
        </div>
        <div class="bg-white p-3 rounded-xl border border-neutral-200 flex flex-col items-center">
          <ChatBubbleLeftRightIcon class="w-6 h-6 text-neutral-800 mb-1" />
          <div class="font-bold text-neutral-900">Praktik</div>
          <div class="text-[10px] text-neutral-400">Dialog peran</div>
        </div>
      </div>
    </div>

    <!-- Start Button -->
    <div class="pt-4 text-center sm:text-right">
      <button
        type="button"
        class="w-full sm:w-auto px-8 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-2xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-lg inline-flex items-center justify-center gap-2.5 cursor-pointer"
        @click="emit('start-lesson')"
      >
        <span>
          {{
            props.lessonNumber === 1
              ? 'Mulai Sesi 2: Salam Dasar (あいさつ)'
              : 'Mulai Sesi 2: Kata Tunjuk Dasar (これ・それ・あれ)'
          }}
        </span>
        <ArrowRightIcon class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
