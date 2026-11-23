<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import {
  ArrowLeftIcon,
  PauseIcon,
  PlayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from '@heroicons/vue/24/outline'
import { trackSelectContent } from '@/utils/analytics'

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void
    YT?: any
  }
}

type Language = 'id' | 'en'

const currentLang = ref<Language>('en')

// YouTube Audio State
const YOUTUBE_VIDEO_ID = 'qdRxzphdpUM'
let ytPlayer: any = null
const isAudioPlaying = ref(false)
const isAudioMuted = ref(false)
const isPlayerReady = ref(false)
const hasUserInteracted = ref(false)

interface QuoteContent {
  eyebrow: string
  subEyebrow: string
  title: string
  quote: string
  attribution: string
  subnote: string
  inspirationNote: string
  photoCaption: string
  backLabel: string
  navIndicator: string
  musicPlayingLabel: string
  musicPausedLabel: string
}

const CONTENT: Record<Language, QuoteContent> = {
  id: {
    eyebrow: 'Refleksi Abadi',
    subEyebrow: 'kasih ibu',
    title: 'The Last Wealth',
    quote:
      'Ketika segala yang dapat dimiliki telah hilang, jangan biarkan apa yang membuat kita menjadi manusia ikut menghilang. Sebab kekayaan dapat diwariskan, kedudukan dapat dilupakan, dan tubuh pada akhirnya akan menua. Namun kebajikan yang tetap hidup dalam diri seseorang akan menjadi warisan yang tidak dapat dirampas oleh waktu.',
    attribution: '— Sebuah Refleksi Kasih Ibu',
    subnote: 'Tentang cinta tanpa pamrih yang melampaui waktu dan materi.',
    inspirationNote:
      'Refleksi pribadi yang terinspirasi dari ajaran Konfusius dalam The Analects IV.5 dan I.2 — bukan kutipan asli Konfusius.',
    photoCaption: 'Lukisan Kasih Ibu • Cat Minyak di atas Kanvas',
    backLabel: '← Beranda',
    navIndicator: 'Refleksi Ibu',
    musicPlayingLabel: 'Grandma’s Home — OST How to Make Millions Before Grandma Dies',
    musicPausedLabel: 'Putar Musik: Grandma’s Home',
  },
  en: {
    eyebrow: 'Timeless Reflection',
    subEyebrow: 'motherhood',
    title: 'The Last Wealth',
    quote:
      'When everything that can be possessed is lost, never let that which makes us human disappear with it. For wealth can be bequeathed, status can be forgotten, and the body will inevitably grow old. Yet the virtue that lives on within a soul becomes an enduring inheritance that time can never take away.',
    attribution: '— A Reflection on a Mother’s Love',
    subnote: 'On unconditional love that endures beyond time and possessions.',
    inspirationNote:
      'A personal reflection inspired by the teachings of Confucius in The Analects IV.5 and I.2 — not a direct quotation of Confucius.',
    photoCaption: 'A Mother’s Love • Oil on Canvas',
    backLabel: '← Portfolio',
    navIndicator: 'Mother’s Reflection',
    musicPlayingLabel: 'Grandma’s Home — Jaithep Raroengjai',
    musicPausedLabel: 'Play BGM: Grandma’s Home',
  },
}

const activeContent = computed(() => CONTENT[currentLang.value])

function setLanguage(lang: Language) {
  currentLang.value = lang
  trackSelectContent('button', `Mother Quotes Switch to ${lang.toUpperCase()}`)
}

// YouTube Audio Controller
function loadYouTubeAPI() {
  if (window.YT && window.YT.Player) {
    initPlayer()
    return
  }

  const existingScript = document.getElementById('youtube-iframe-api')
  if (!existingScript) {
    const tag = document.createElement('script')
    tag.id = 'youtube-iframe-api'
    tag.src = 'https://www.youtube.com/iframe_api'
    const firstScriptTag = document.getElementsByTagName('script')[0]
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag)
  }

  const prevCallback = window.onYouTubeIframeAPIReady
  window.onYouTubeIframeAPIReady = () => {
    if (prevCallback) prevCallback()
    initPlayer()
  }
}

function initPlayer() {
  if (ytPlayer || !window.YT) return

  ytPlayer = new window.YT.Player('youtube-audio-player', {
    videoId: YOUTUBE_VIDEO_ID,
    playerVars: {
      autoplay: 1,
      controls: 0,
      disablekb: 1,
      fs: 0,
      loop: 1,
      playlist: YOUTUBE_VIDEO_ID,
      modestbranding: 1,
      playsinline: 1,
      rel: 0,
    },
    events: {
      onReady: (event: any) => {
        isPlayerReady.value = true
        event.target.setVolume(70)
        tryPlay()
      },
      onStateChange: (event: any) => {
        // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
        if (event.data === 1) {
          isAudioPlaying.value = true
        } else if (event.data === 2 || event.data === 0) {
          isAudioPlaying.value = false
        }
      },
    },
  })
}

function tryPlay() {
  if (ytPlayer && typeof ytPlayer.playVideo === 'function') {
    try {
      ytPlayer.playVideo()
    } catch {
      // Autoplay without user interaction may be deferred by browser policy
    }
  }
}

function toggleAudio() {
  if (!ytPlayer) {
    initPlayer()
    return
  }
  if (isAudioPlaying.value) {
    ytPlayer.pauseVideo()
    trackSelectContent('button', 'Mother Quotes Pause BGM')
  } else {
    ytPlayer.playVideo()
    trackSelectContent('button', 'Mother Quotes Play BGM')
  }
}

function toggleMute() {
  if (!ytPlayer) return
  if (isAudioMuted.value) {
    ytPlayer.unMute()
    isAudioMuted.value = false
  } else {
    ytPlayer.mute()
    isAudioMuted.value = true
  }
}

function handleFirstInteraction() {
  if (hasUserInteracted.value) return
  hasUserInteracted.value = true
  if (ytPlayer && !isAudioPlaying.value) {
    tryPlay()
  }
}

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'instant' })
  loadYouTubeAPI()

  window.addEventListener('click', handleFirstInteraction, { passive: true })
  window.addEventListener('touchstart', handleFirstInteraction, { passive: true })
  window.addEventListener('keydown', handleFirstInteraction, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('click', handleFirstInteraction)
  window.removeEventListener('touchstart', handleFirstInteraction)
  window.removeEventListener('keydown', handleFirstInteraction)

  if (ytPlayer) {
    try {
      ytPlayer.stopVideo()
      ytPlayer.destroy()
    } catch {
      // ignore
    }
    ytPlayer = null
  }
})
</script>

<template>
  <div class="bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white min-h-screen flex flex-col">
    <!-- Hidden YouTube Audio Player -->
    <div
      aria-hidden="true"
      class="fixed -top-[9999px] -left-[9999px] w-1 h-1 opacity-0 pointer-events-none overflow-hidden"
    >
      <div id="youtube-audio-player"></div>
    </div>

    <!-- Minimalist Top Header -->
    <header class="w-full border-b border-neutral-200 bg-white/90 backdrop-blur-md sticky top-0 z-40">
      <div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
        <RouterLink
          to="/"
          class="group inline-flex items-center gap-2.5 text-xs font-semibold text-neutral-500 hover:text-neutral-950 transition-colors uppercase tracking-[0.18em]"
          @click="trackSelectContent('button', 'Mother Quotes Back to Portfolio')"
        >
          <ArrowLeftIcon class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          <span>Back to Portfolio</span>
        </RouterLink>

        <!-- Header Status & Music Indicator -->
        <div class="flex items-center gap-4 text-xs font-mono text-neutral-400 uppercase tracking-widest">
          <button
            type="button"
            class="inline-flex items-center gap-2 px-3 py-1 rounded-full border transition-all cursor-pointer"
            :class="
              isAudioPlaying
                ? 'border-neutral-900 bg-neutral-950 text-white'
                : 'border-neutral-200 bg-neutral-50 text-neutral-600 hover:text-neutral-950'
            "
            @click="toggleAudio"
          >
            <span
              class="w-1.5 h-1.5 rounded-full"
              :class="isAudioPlaying ? 'bg-amber-300 animate-pulse' : 'bg-neutral-400'"
            ></span>
            <span class="text-[11px] font-mono tracking-wider">
              {{ isAudioPlaying ? 'BGM Active' : 'Sound' }}
            </span>
          </button>

          <span class="text-neutral-300 hidden sm:inline">&bull;</span>
          <span class="hidden sm:inline">{{ activeContent.navIndicator }}</span>
        </div>
      </div>
    </header>

    <!-- Main Content Container -->
    <main class="flex-1 max-w-5xl mx-auto px-6 py-12 sm:py-20 w-full flex flex-col justify-center">
      <!-- Black Obsidian Showcase Card (Fokus ke Gambar & Teks) -->
      <section
        class="relative overflow-hidden rounded-3xl bg-neutral-950 text-white border border-neutral-800 shadow-2xl transition-all duration-300"
      >
        <!-- Subtle artistic lighting accent in background -->
        <div class="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-neutral-800/40 blur-3xl pointer-events-none"></div>
        <div class="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-neutral-900/60 blur-3xl pointer-events-none"></div>

        <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center p-6 sm:p-10 lg:p-14">
          <!-- 1. Visual Canvas Column (5 Cols) - Constant Photo -->
          <div class="lg:col-span-5 flex flex-col justify-center">
            <div class="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-lg group">
              <!-- Constant Photo with natural aspect ratio -->
              <div class="aspect-square sm:aspect-[4/5] w-full overflow-hidden">
                <img
                  src="/images/mother-reflection.jpg"
                  alt="A mother and child - The Last Wealth"
                  class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
            </div>

            <!-- Subtle caption under the photo -->
            <div class="mt-3 text-center">
              <span class="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-500">
                {{ activeContent.photoCaption }}
              </span>
            </div>
          </div>

          <!-- 2. The Last Wealth Quote Narrative Column (7 Cols) -->
          <div class="lg:col-span-7 flex flex-col justify-between space-y-8 lg:pl-4">
            <!-- Header Row with Eyebrow and Language Switcher -->
            <div class="flex flex-wrap items-center justify-between gap-4">
              <!-- Eyebrow -->
              <div class="inline-flex items-center gap-2.5 text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                <span class="w-2 h-2 rounded-full bg-white"></span>
                <span>{{ activeContent.eyebrow }}</span>
                <span class="text-neutral-700">&bull;</span>
                <span class="text-neutral-400 font-serif italic lowercase tracking-normal">
                  {{ activeContent.subEyebrow }}
                </span>
              </div>

              <!-- Dedicated Language Switcher (Indo & English) -->
              <div
                class="inline-flex items-center p-1 rounded-full bg-neutral-900 border border-neutral-800 text-xs font-mono tracking-wider"
                role="tablist"
                aria-label="Pilih Bahasa"
              >
                <button
                  type="button"
                  class="px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all duration-200 cursor-pointer"
                  :class="
                    currentLang === 'id'
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  "
                  :aria-selected="currentLang === 'id'"
                  role="tab"
                  @click="setLanguage('id')"
                >
                  ID
                </button>
                <button
                  type="button"
                  class="px-3 py-1 rounded-full text-[11px] font-bold uppercase transition-all duration-200 cursor-pointer"
                  :class="
                    currentLang === 'en'
                      ? 'bg-white text-neutral-950 shadow-xs'
                      : 'text-neutral-400 hover:text-white'
                  "
                  :aria-selected="currentLang === 'en'"
                  role="tab"
                  @click="setLanguage('en')"
                >
                  EN
                </button>
              </div>
            </div>

            <!-- Title -->
            <div>
              <h1 class="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-white tracking-tight leading-[1.1] italic">
                {{ activeContent.title }}
              </h1>
            </div>

            <!-- Quote Separator Ornament -->
            <div class="flex items-center gap-3 text-neutral-700" aria-hidden="true">
              <span class="w-12 h-px bg-neutral-800"></span>
              <span class="font-serif text-xs italic text-neutral-500">&sect;</span>
              <span class="w-12 h-px bg-neutral-800"></span>
            </div>

            <!-- The Quote Body in High-Contrast Elegant Serif with Smooth Fade -->
            <blockquote class="space-y-6">
              <p
                :key="currentLang"
                class="font-serif italic text-lg sm:text-2xl text-neutral-100 leading-[1.6] tracking-tight font-light border-l-2 border-neutral-700 pl-6 sm:pl-8 py-1 transition-all duration-300"
              >
                &ldquo;{{ activeContent.quote }}&rdquo;
              </p>
            </blockquote>

            <!-- Footer Attribution & Action -->
            <div class="pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div class="space-y-2 max-w-xl">
                <cite class="not-italic font-mono text-xs uppercase tracking-[0.2em] text-neutral-400 block font-semibold">
                  {{ activeContent.attribution }}
                </cite>
                <p class="text-xs text-neutral-400 font-serif italic">
                  {{ activeContent.subnote }}
                </p>
                <p class="text-[11px] font-mono text-neutral-500 leading-relaxed border-l border-neutral-800 pl-3 pt-0.5">
                  {{ activeContent.inspirationNote }}
                </p>
              </div>

              <RouterLink
                to="/"
                class="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 rounded-full text-xs font-semibold uppercase tracking-widest transition-all shrink-0"
                @click="trackSelectContent('button', 'Mother Quotes Back Button')"
              >
                <span>{{ activeContent.backLabel }}</span>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Ambient BGM Floating Controller -->
    <aside
      class="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-neutral-950/90 text-white backdrop-blur-md border border-neutral-800 rounded-full pl-3 pr-4 py-2 shadow-2xl transition-all duration-300 hover:border-neutral-700"
      aria-label="Ambient Background Music"
    >
      <!-- Play/Pause Toggle -->
      <button
        type="button"
        class="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer"
        :aria-label="isAudioPlaying ? 'Pause Music' : 'Play Music'"
        @click="toggleAudio"
      >
        <PauseIcon v-if="isAudioPlaying" class="w-4 h-4 text-white" />
        <PlayIcon v-else class="w-4 h-4 text-amber-200 ml-0.5" />
      </button>

      <!-- Equalizer Visualizer & Track Info -->
      <div class="flex items-center gap-2.5 text-xs font-mono">
        <div class="flex items-end gap-0.5 h-3.5 w-3" aria-hidden="true">
          <span
            class="w-0.5 bg-amber-200 rounded-full transition-all duration-300"
            :style="{ height: isAudioPlaying ? '14px' : '4px' }"
          ></span>
          <span
            class="w-0.5 bg-amber-200 rounded-full transition-all duration-300"
            :style="{ height: isAudioPlaying ? '8px' : '6px' }"
          ></span>
          <span
            class="w-0.5 bg-amber-200 rounded-full transition-all duration-300"
            :style="{ height: isAudioPlaying ? '12px' : '3px' }"
          ></span>
        </div>

        <span class="text-neutral-300 font-sans text-xs hidden sm:inline select-none">
          {{ isAudioPlaying ? activeContent.musicPlayingLabel : activeContent.musicPausedLabel }}
        </span>
      </div>

      <!-- Mute/Unmute Toggle -->
      <button
        type="button"
        class="text-neutral-400 hover:text-white transition-colors cursor-pointer p-1 ml-1"
        :aria-label="isAudioMuted ? 'Unmute' : 'Mute'"
        @click="toggleMute"
      >
        <SpeakerXMarkIcon v-if="isAudioMuted" class="w-4 h-4 text-amber-300" />
        <SpeakerWaveIcon v-else class="w-4 h-4 text-neutral-300" />
      </button>
    </aside>

    <!-- Minimalist Monochrome Footer -->
    <footer class="bg-neutral-950 text-white py-12 px-6 border-t border-neutral-900 mt-auto">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
        <p>&copy; {{ new Date().getFullYear() }} Yasha Gozwan Shuhada. The Last Wealth.</p>
        <RouterLink to="/" class="hover:text-white transition-colors">
          Portfolio &rarr;
        </RouterLink>
      </div>
    </footer>
  </div>
</template>
