<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { trackSelectContent } from '@/utils/analytics'

const emit = defineEmits<{
  (e: 'open-ideas-modal'): void
}>()

const isMobileMenuOpen = ref(false)
const activeSection = ref<string>('')
const isScrolled = ref(false)

const sectionLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Work' },
  { id: 'education', label: 'Path' },
]

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function handleIdeasClick() {
  closeMobileMenu()
  emit('open-ideas-modal')
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20

  const scrollPos = window.scrollY + 140
  let current = ''
  for (const sec of sectionLinks) {
    const el = document.getElementById(sec.id)
    if (el) {
      const top = el.offsetTop
      const height = el.offsetHeight
      if (scrollPos >= top && scrollPos < top + height) {
        current = sec.id
      }
    }
  }
  activeSection.value = current
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('keydown', handleKeydown)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <nav
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    :class="
      isScrolled || isMobileMenuOpen
        ? 'bg-white/95 backdrop-blur-md border-b border-neutral-200/80'
        : 'bg-white/80 backdrop-blur-sm border-b border-neutral-100'
    "
  >
    <div class="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
      <!-- Monochrome Yin-Yang Inspired Wordmark -->
      <RouterLink
        to="/"
        class="font-display font-bold text-lg text-neutral-950 tracking-tight flex items-center gap-3 group"
        @click="closeMobileMenu"
      >
        <span
          class="w-7 h-7 rounded-full bg-neutral-950 text-white flex items-center justify-center font-serif italic text-sm transition-transform duration-300 group-hover:scale-105"
        >
          Y
        </span>
        <span>Yasha Gozwan<span class="text-neutral-400">.</span></span>
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.16em] font-semibold text-neutral-500">
        <a
          v-for="item in sectionLinks"
          :key="item.id"
          :href="`#${item.id}`"
          class="relative py-1 transition-colors hover:text-neutral-950"
          :class="activeSection === item.id ? 'text-neutral-950' : 'text-neutral-500'"
        >
          {{ item.label }}
          <span
            v-if="activeSection === item.id"
            class="absolute -bottom-0.5 left-0 right-0 h-px bg-neutral-950 transition-all"
          ></span>
        </a>
        <span class="h-3.5 w-px bg-neutral-200" aria-hidden="true"></span>
        <RouterLink to="/bio" class="hover:text-neutral-950 transition-colors">Bio</RouterLink>
        <RouterLink to="/hobbies" class="hover:text-neutral-950 transition-colors">Hobbies</RouterLink>
        <a
          href="/ideas"
          class="hover:text-neutral-950 transition-colors"
          @click.prevent="emit('open-ideas-modal')"
        >
          Ideas
        </a>
      </div>

      <!-- Desktop CTA -->
      <a
        href="mailto:yashagozwan13@gmail.com"
        class="hidden md:inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-all"
        @click="trackSelectContent('button', 'Nav Say Hello')"
      >
        <span>Contact</span>
        <span>&nearr;</span>
      </a>

      <!-- Mobile Hamburger Button -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-100 transition-all focus:outline-none"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <svg v-if="!isMobileMenuOpen" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 7h16M4 12h16M4 17h16" />
        </svg>
        <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white border-b border-neutral-200 px-6 pt-4 pb-8"
      >
        <div class="flex flex-col space-y-1">
          <div class="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 px-2 pt-1 pb-2">
            Index
          </div>
          <a
            v-for="item in sectionLinks"
            :key="item.id"
            :href="`#${item.id}`"
            class="flex items-center justify-between px-2 py-2.5 text-sm font-medium border-b border-neutral-100 transition-colors"
            :class="activeSection === item.id ? 'text-neutral-950 font-semibold' : 'text-neutral-600'"
            @click="closeMobileMenu"
          >
            <span>{{ item.label }}</span>
            <span v-if="activeSection === item.id" class="w-1.5 h-1.5 rounded-full bg-neutral-950"></span>
          </a>

          <div class="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400 px-2 pt-5 pb-2">
            Pages
          </div>
          <RouterLink
            to="/bio"
            class="flex items-center justify-between px-2 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-950 border-b border-neutral-100"
            @click="closeMobileMenu"
          >
            <span>Bio &amp; Profile</span>
            <span class="text-xs text-neutral-400">&rarr;</span>
          </RouterLink>
          <RouterLink
            to="/hobbies"
            class="flex items-center justify-between px-2 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-950 border-b border-neutral-100"
            @click="closeMobileMenu"
          >
            <span>Hobbies &amp; Discipline</span>
            <span class="text-xs text-neutral-400">&rarr;</span>
          </RouterLink>
          <a
            href="/ideas"
            class="flex items-center justify-between px-2 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-950"
            @click.prevent="handleIdeasClick"
          >
            <span>Ideas &amp; Reflections</span>
            <span class="text-xs text-neutral-400">&rarr;</span>
          </a>

          <div class="pt-5">
            <a
              href="mailto:yashagozwan13@gmail.com"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-neutral-950 text-white text-xs font-semibold uppercase tracking-widest rounded-full"
              @click="
                () => {
                  trackSelectContent('button', 'Mobile Nav Say Hello')
                  closeMobileMenu()
                }
              "
            >
              <span>Get in Touch &nearr;</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
