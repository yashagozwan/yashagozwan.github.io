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
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
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
        ? 'bg-white/85 backdrop-blur-xl border-b border-gray-200/60 shadow-sm'
        : 'bg-white/70 backdrop-blur-lg border-b border-gray-100/50'
    "
  >
    <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
      <RouterLink
        to="/"
        class="font-display font-bold text-xl text-gray-900 tracking-tight flex items-center gap-2"
        @click="closeMobileMenu"
      >
        <div
          class="w-8 h-8 bg-gradient-to-br from-brand-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-sm shadow-sm"
        >
          Y
        </div>
        yashagozwan
      </RouterLink>

      <!-- Desktop Navigation -->
      <div class="hidden md:flex items-center gap-7 text-[15px] font-medium text-gray-600">
        <a
          v-for="item in sectionLinks"
          :key="item.id"
          :href="`#${item.id}`"
          class="relative py-1 transition-colors hover:text-brand-600"
          :class="activeSection === item.id ? 'text-brand-600 font-semibold' : 'text-gray-600'"
        >
          {{ item.label }}
          <span
            v-if="activeSection === item.id"
            class="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-600 rounded-full transition-all"
          ></span>
        </a>
        <span class="h-4 w-px bg-gray-200" aria-hidden="true"></span>
        <RouterLink to="/bio" class="hover:text-brand-600 transition-colors">Bio</RouterLink>
        <RouterLink to="/hobbies" class="hover:text-brand-600 transition-colors">Hobbies</RouterLink>
        <a
          href="/ideas"
          class="hover:text-brand-600 transition-colors ideas-nav-trigger"
          @click.prevent="emit('open-ideas-modal')"
        >
          Ideas
        </a>
      </div>

      <!-- Desktop CTA -->
      <a
        href="mailto:yashagozwan13@gmail.com"
        class="hidden md:inline-flex px-5 py-2.5 bg-gray-900 hover:bg-gray-800 text-white text-sm font-medium rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
        @click="trackSelectContent('button', 'Nav Say Hello')"
      >
        Say Hello &rarr;
      </a>

      <!-- Mobile Hamburger Button -->
      <button
        type="button"
        class="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-gray-200/80 bg-white/80 text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-all focus:outline-none focus:ring-2 focus:ring-brand-500"
        :aria-expanded="isMobileMenuOpen"
        aria-label="Toggle navigation menu"
        @click="toggleMobileMenu"
      >
        <svg v-if="!isMobileMenuOpen" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile Navigation Drawer -->
    <Transition name="mobile-menu">
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden bg-white/95 backdrop-blur-xl border-b border-gray-200/80 px-6 pt-3 pb-6 shadow-xl"
      >
        <div class="flex flex-col space-y-1">
          <div class="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-3 pt-2 pb-1">
            Portfolio Sections
          </div>
          <a
            v-for="item in sectionLinks"
            :key="item.id"
            :href="`#${item.id}`"
            class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            :class="
              activeSection === item.id
                ? 'bg-brand-50 text-brand-600'
                : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
            "
            @click="closeMobileMenu"
          >
            <span>{{ item.label }}</span>
            <span v-if="activeSection === item.id" class="w-1.5 h-1.5 rounded-full bg-brand-600"></span>
          </a>

          <div class="my-2 border-t border-gray-100"></div>

          <div class="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-3 pt-1 pb-1">Pages</div>
          <RouterLink
            to="/bio"
            class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-600 transition-colors"
            @click="closeMobileMenu"
          >
            <span>Bio &amp; Profile</span>
            <span class="text-xs text-gray-400">&rarr;</span>
          </RouterLink>
          <RouterLink
            to="/hobbies"
            class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-600 transition-colors"
            @click="closeMobileMenu"
          >
            <span>Hobbies &amp; Passions</span>
            <span class="text-xs text-gray-400">&rarr;</span>
          </RouterLink>
          <a
            href="/ideas"
            class="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold text-gray-700 hover:bg-gray-100 hover:text-brand-600 transition-colors"
            @click.prevent="handleIdeasClick"
          >
            <span>Ideas &amp; Reflections</span>
            <span class="text-xs text-gray-400">&rarr;</span>
          </a>

          <div class="pt-4">
            <a
              href="mailto:yashagozwan13@gmail.com"
              class="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold rounded-full transition-all shadow-md"
              @click="
                () => {
                  trackSelectContent('button', 'Mobile Nav Say Hello')
                  closeMobileMenu()
                }
              "
            >
              <span>Say Hello &rarr;</span>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>
</template>
