<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import CertificateCarousel from '@/components/CertificateCarousel.vue'
import IdeasNoticeModal from '@/components/IdeasNoticeModal.vue'
import HighlightDetailModal from '@/components/HighlightDetailModal.vue'
import ProjectDetailModal from '@/components/ProjectDetailModal.vue'
import {
  ACADEMIC_EDUCATION,
  BOOTCAMPS,
  CORE_STACK_ITEMS,
  ENGINEERING_HIGHLIGHTS,
  FREELANCE_EXPERIENCES,
  MAIN_EXPERIENCES,
  PROJECTS,
  STATS,
} from '@/data/portfolio'
import { IDEAS_COLLECTION } from '@/data/ideas'
import type { EngineeringHighlight, ProjectItem, SkillCategory } from '@/types/portfolio'
import { initScrollDepthTracking, trackSelectContent } from '@/utils/analytics'

const isIdeasModalOpen = ref(false)
const activeHighlight = ref<EngineeringHighlight | null>(null)
const activeProject = ref<ProjectItem | null>(null)
const selectedSkillCategory = ref<SkillCategory>('All')

let lastHighlightTrigger: HTMLElement | null = null
let lastProjectTrigger: HTMLElement | null = null

const skillCategories: SkillCategory[] = [
  'All',
  'Mobile',
  'Architecture & DevOps',
  'Web',
  'Backend & Cloud',
  'AI & Design',
]

const filteredSkills = computed(() => {
  if (selectedSkillCategory.value === 'All') {
    return CORE_STACK_ITEMS
  }
  return CORE_STACK_ITEMS.filter((item) => item.category === selectedSkillCategory.value)
})

const featuredProjects = computed(() => PROJECTS.filter((p) => p.featured))
const otherProjects = computed(() => PROJECTS.filter((p) => !p.featured))

const featuredIdea = computed(() => {
  return IDEAS_COLLECTION.find((item) => item.featured) || IDEAS_COLLECTION[0]
})

function openIdeasModal(analyticsItemId?: string) {
  if (analyticsItemId) {
    trackSelectContent('button', analyticsItemId)
  }
  isIdeasModalOpen.value = true
}

function openHighlight(item: EngineeringHighlight, event: Event) {
  lastHighlightTrigger = event.currentTarget as HTMLElement
  activeHighlight.value = item
  trackSelectContent('engineering_highlight', `Engineering Highlight: ${item.title}`)
}

function closeHighlight() {
  activeHighlight.value = null
  if (lastHighlightTrigger) {
    lastHighlightTrigger.focus()
    lastHighlightTrigger = null
  }
}

function openProject(project: ProjectItem, event: Event) {
  lastProjectTrigger = event.currentTarget as HTMLElement
  activeProject.value = project
  trackSelectContent('project', `Project Case Study: ${project.title}`)
}

function closeProject() {
  activeProject.value = null
  if (lastProjectTrigger) {
    lastProjectTrigger.focus()
    lastProjectTrigger = null
  }
}

function handleProfileImgError(e: Event) {
  const target = e.target as HTMLImageElement
  target.src = 'https://ui-avatars.com/api/?name=Yasha+Gozwan&size=512&background=f3f4f6&color=4b5563'
}

let cleanupScrollTracking: (() => void) | null = null

onMounted(() => {
  cleanupScrollTracking = initScrollDepthTracking()
})

onUnmounted(() => {
  if (cleanupScrollTracking) {
    cleanupScrollTracking()
  }
})
</script>

<template>
  <div class="bg-gray-50/50 text-gray-800 font-sans antialiased selection:bg-brand-500 selection:text-white overflow-x-hidden">
    <!-- Navigation -->
    <Navbar @open-ideas-modal="openIdeasModal()" />

    <!-- Hero Section -->
    <section class="relative pt-40 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
      <!-- Abstract Decoration -->
      <div
        class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none"
      ></div>
      <div
        class="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
      ></div>

      <div class="max-w-6xl mx-auto flex flex-col items-center text-center relative z-10">
        <div
          class="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 text-brand-600 rounded-full text-sm font-semibold mb-8 border border-brand-100 shadow-sm"
        >
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-500 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
          </span>
          Available for New Opportunities
        </div>

        <h1
          class="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-gray-900 mb-6 leading-[1.1]"
        >
          Crafting
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-indigo-600">Seamless</span
          ><br />
          Mobile Experiences.
        </h1>

        <p class="text-xl md:text-2xl text-gray-500 font-medium max-w-3xl mb-10 leading-relaxed">
          Hi, I'm
          <span class="text-gray-900 font-semibold">Yasha Gozwan Shuhada</span>.
          A Mobile Engineer specializing in Flutter &amp; native iOS/Android
          development, helping businesses scale through robust applications.
        </p>

        <div class="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            class="px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0"
            @click="trackSelectContent('button', 'Hero View My Work')"
          >
            View My Work
          </a>
          <a
            href="https://1drv.ms/w/c/3a9078387366ac10/IQDvgYAtuqWsQob5YH9n7O-xAZACWNW0mJR8rGJ-OCwm6AA?e=ZjleGe"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
            @click="trackSelectContent('button', 'Hero Preview Full CV')"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              ></path>
            </svg>
            Preview Full CV
          </a>
          <a
            href="https://github.com/yashagozwan"
            target="_blank"
            rel="noopener noreferrer"
            class="px-8 py-4 bg-white border border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all shadow-sm hover:shadow hover:-translate-y-1 active:translate-y-0 flex items-center gap-2"
            @click="trackSelectContent('button', 'Hero GitHub Profile')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
            GitHub Profile
          </a>
        </div>
      </div>
    </section>

    <!-- Stats / Overview Bar -->
    <div class="max-w-6xl mx-auto px-6 mb-20 md:mb-24 -mt-10 relative z-20">
      <div
        class="bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-8 border border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-100"
      >
        <div v-for="stat in STATS" :key="stat.label">
          <h3 class="font-display font-bold text-4xl text-gray-900 mb-1">{{ stat.value }}</h3>
          <p class="text-sm font-medium text-gray-500 uppercase tracking-wider">{{ stat.label }}</p>
        </div>
      </div>
    </div>

    <!-- About Section -->
    <section id="about" class="py-20 md:py-24 bg-white border-t border-gray-100/50">
      <div class="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-16 items-center">
        <div class="flex-1">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Over 4 years building enterprise mobile solutions.
          </h2>
          <p class="text-lg text-gray-600 leading-relaxed mb-8">
            I specialize in <span class="text-gray-900 font-semibold">Flutter</span>
            for Android and iOS application development, building scalable and
            maintainable mobile applications with a strong focus on performance,
            architecture, and user experience. I work extensively with Clean
            Architecture, Bloc, Domain-Driven Design (DDD), and native platform
            integration.
          </p>
          <p class="text-lg text-gray-600 leading-relaxed mb-6">
            I thrive in Agile Scrum environments, collaborating deeply with QA,
            backend engineering, and product teams to bring ideas to reality.
            Let's create something extraordinary together.
          </p>

          <div class="mb-10">
            <RouterLink
              to="/bio"
              class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-gray-900 hover:bg-gray-800 text-white rounded-2xl text-sm font-semibold shadow-md hover:shadow-lg transition-all group"
            >
              <span>Explore Full Bio</span>
              <span class="transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
            </RouterLink>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 class="font-bold text-gray-900 text-lg">My Core Stack</h3>
            <span class="text-xs font-medium text-gray-400">
              Showing {{ filteredSkills.length }} of {{ CORE_STACK_ITEMS.length }} technologies
            </span>
          </div>

          <!-- Interactive Category Filter Tabs -->
          <div class="flex flex-wrap gap-2 mb-5 pb-3 border-b border-gray-100">
            <button
              v-for="cat in skillCategories"
              :key="cat"
              type="button"
              class="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all"
              :class="
                selectedSkillCategory === cat
                  ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                  : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
              "
              @click="selectedSkillCategory = cat"
            >
              {{ cat }}
            </button>
          </div>

          <TransitionGroup name="skill-list" tag="div" class="flex flex-wrap gap-3">
            <span
              v-for="skill in filteredSkills"
              :key="skill.name"
              class="px-4 py-2 bg-gray-50 border border-gray-100 hover:border-brand-200 hover:bg-brand-50/40 rounded-xl text-sm font-semibold text-gray-700 hover:text-brand-700 hover:-translate-y-1 transition-all cursor-default"
            >
              {{ skill.name }}
            </span>
          </TransitionGroup>
        </div>

        <div class="w-full md:w-[450px] shrink-0 relative group">
          <div
            class="absolute inset-0 bg-gradient-to-tr from-brand-600 to-indigo-500 rounded-3xl rotate-3 scale-105 opacity-20 group-hover:rotate-6 group-hover:scale-110 transition-all duration-700"
          ></div>
          <div class="relative rounded-3xl overflow-hidden shadow-2xl bg-gray-100 aspect-[4/5] border border-white/50">
            <img
              src="/images/yasha.png"
              alt="Yasha Gozwan"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              @error="handleProfileImgError"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Experience Section (Modern Cards) -->
    <section id="experience" class="py-20 md:py-24 bg-gray-50/40 border-t border-gray-100/60">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Professional Experience</h2>
          <p class="text-lg text-gray-500">A journey through leading tech companies and diverse projects.</p>
        </div>

        <div class="space-y-8">
          <!-- Main Expanded Experience Cards -->
          <div
            v-for="exp in MAIN_EXPERIENCES"
            :key="exp.id"
            class="group bg-white rounded-3xl p-8 md:p-10 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 transition-all duration-500 border border-gray-100 relative overflow-hidden"
          >
            <div
              v-if="exp.isPrimary"
              class="absolute top-0 right-0 w-32 h-32 bg-brand-50 rounded-bl-full -z-10 transition-transform duration-500 group-hover:scale-150"
            ></div>

            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 class="font-display text-2xl font-bold text-gray-900 mb-1">{{ exp.role }}</h3>
                <p
                  class="font-semibold text-lg"
                  :class="exp.highlightCompany ? 'text-brand-600' : 'text-gray-800'"
                >
                  {{ exp.company }}
                </p>
              </div>
              <div
                class="inline-flex items-center justify-center px-4 py-2 bg-gray-50 rounded-full text-sm font-medium text-gray-600 whitespace-nowrap"
              >
                {{ exp.period }}
              </div>
            </div>

            <p class="text-gray-600 leading-relaxed mb-6">{{ exp.summary }}</p>

            <ul v-if="exp.highlights?.length" class="space-y-3 mb-8">
              <li
                v-for="(point, idx) in exp.highlights"
                :key="idx"
                class="flex items-start gap-3 text-gray-600"
              >
                <svg
                  v-if="exp.isPrimary"
                  class="w-5 h-5 text-brand-500 mt-1 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <svg
                  v-else
                  class="w-5 h-5 text-gray-400 mt-1 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span v-html="point"></span>
              </li>
            </ul>

            <div v-if="exp.tags?.length" class="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
              <span
                v-for="tag in exp.tags"
                :key="tag"
                class="text-xs font-semibold text-gray-500 bg-gray-50 px-3 py-1 rounded-md"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Grid for Freelance / Earlier Roles -->
          <div class="grid md:grid-cols-2 gap-6 mt-8">
            <div
              v-for="item in FREELANCE_EXPERIENCES"
              :key="item.id"
              class="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 hover:border-gray-200 transition-colors"
            >
              <div class="flex justify-between items-start mb-4">
                <div>
                  <h4 class="font-display font-bold text-gray-900 text-xl">{{ item.role }}</h4>
                  <p class="text-sm font-medium text-gray-500">{{ item.company }}</p>
                </div>
                <span class="text-xs font-semibold bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {{ item.type || 'Freelance' }}
                </span>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed mb-4">{{ item.summary }}</p>
              <p class="text-xs text-gray-400 font-medium tracking-wide border-t border-gray-50 pt-4">
                {{ item.period }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section
      id="projects"
      class="py-20 md:py-24 bg-gray-900 text-white rounded-[2.5rem] md:rounded-[3rem] mx-3 md:mx-6 my-12 md:my-16 relative overflow-hidden"
    >
      <!-- Decoration -->
      <div
        class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-gray-900 to-black opacity-50"
      ></div>

      <div class="max-w-6xl mx-auto px-6 relative z-10">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div class="max-w-xl">
            <h2 class="font-display text-4xl md:text-5xl font-bold text-white mb-4">Featured Work</h2>
            <p class="text-gray-400 text-lg">
              A selection of my best enterprise and commercial mobile applications built on solid architectures. Click
              any project to inspect its case study.
            </p>
          </div>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <!-- Main Featured Project Cards -->
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            tabindex="0"
            role="button"
            aria-haspopup="dialog"
            :aria-label="`View case study for ${project.title}`"
            class="group relative bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 hover:border-gray-500 rounded-3xl p-8 hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            @click="openProject(project, $event)"
            @keydown.enter.prevent="openProject(project, $event)"
            @keydown.space.prevent="openProject(project, $event)"
          >
            <div>
              <div class="flex items-start justify-between gap-4 mb-6">
                <div
                  class="w-14 h-14 rounded-2xl bg-gradient-to-br text-white flex items-center justify-center shadow-lg"
                  :class="project.gradientClass"
                  v-html="project.icon"
                ></div>
                <span
                  class="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 group-hover:text-white transition-colors pt-1"
                >
                  Case Study
                  <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>

              <h3 class="text-2xl font-bold font-display text-white mb-2 group-hover:text-brand-400 transition-colors">
                {{ project.title }}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-8">
                {{ project.summary }}
              </p>
            </div>

            <div class="flex flex-wrap gap-2 mt-auto">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-xs font-medium text-gray-300 bg-gray-700/50 px-3 py-1.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>

          <!-- Feature Mini Cards List -->
          <div class="md:col-span-2 lg:col-span-3 grid md:grid-cols-2 gap-4 mt-8">
            <div
              v-for="mini in otherProjects"
              :key="mini.id"
              tabindex="0"
              role="button"
              aria-haspopup="dialog"
              :aria-label="`View case study for ${mini.title}`"
              class="group bg-gray-800/30 border border-gray-700/50 rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-gray-500 hover:bg-gray-800/60 transition-all cursor-pointer"
              @click="openProject(mini, $event)"
              @keydown.enter.prevent="openProject(mini, $event)"
              @keydown.space.prevent="openProject(mini, $event)"
            >
              <div class="flex items-center gap-4">
                <div
                  class="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  :class="mini.miniIconColorClass"
                  v-html="mini.icon"
                ></div>
                <div>
                  <h4 class="text-white font-semibold group-hover:text-brand-400 transition-colors">
                    {{ mini.title }}
                  </h4>
                  <p class="text-gray-500 text-sm">{{ mini.summary }}</p>
                </div>
              </div>
              <span
                class="text-xs font-semibold text-gray-500 group-hover:text-white transition-colors shrink-0 flex items-center gap-1"
              >
                Details
                <span class="transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Engineering Highlights Section -->
    <section id="engineering-highlights" class="py-20 md:py-24">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12 md:mb-16">
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-50 text-brand-600 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 border border-brand-100"
          >
            Case Studies &amp; Problem Solving
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Engineering Highlights
          </h2>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            A few engineering problems, technical approaches, and lessons from the things I build.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="item in ENGINEERING_HIGHLIGHTS"
            :key="item.id"
            class="engineering-card group bg-white border border-gray-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 hover:border-brand-200 transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
            tabindex="0"
            role="button"
            aria-haspopup="dialog"
            :aria-label="`View ${item.title} case details`"
            @click="openHighlight(item, $event)"
            @keydown.enter.prevent="openHighlight(item, $event)"
            @keydown.space.prevent="openHighlight(item, $event)"
          >
            <div>
              <div class="flex items-center justify-between mb-5">
                <div
                  class="w-11 h-11 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100/80 group-hover:bg-brand-600 group-hover:text-white transition-colors duration-300"
                  v-html="item.cardIcon"
                ></div>
                <span
                  class="inline-flex items-center text-xs font-semibold text-gray-400 group-hover:text-brand-600 transition-colors gap-1"
                >
                  Case details
                  <span class="text-sm transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
                </span>
              </div>

              <h3 class="font-display text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-600 transition-colors">
                {{ item.title }}
              </h3>

              <div class="space-y-2 mb-6 text-sm">
                <p class="text-gray-600 leading-relaxed">
                  <span class="font-semibold text-gray-800">Problem:</span> {{ item.problem }}
                </p>
                <p class="text-gray-500 leading-relaxed">
                  <span class="font-semibold text-gray-700">Approach:</span> {{ item.approach }}
                </p>
              </div>
            </div>

            <div class="flex flex-wrap gap-2 pt-4 border-t border-gray-100">
              <span
                v-for="tag in item.tags"
                :key="tag"
                class="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Education & Training Section -->
    <section id="education" class="py-20 md:py-24 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12 md:mb-16">
          <div
            class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-50 text-brand-600 rounded-full text-xs font-semibold tracking-wide uppercase mb-4 border border-brand-100"
          >
            Academic &amp; Continuous Learning
          </div>
          <h2 class="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Education &amp; Learning Journey
          </h2>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Formal academic foundations, specialized bootcamps, and continuous technical certifications.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 lg:gap-10">
          <!-- Academic Background Column -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center border border-brand-100 shadow-sm"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l9-5-9-5-9 5 9 5z"
                  ></path>
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-gray-900">Academic Background</h3>
                <p class="text-xs text-gray-500">Degree programs &amp; research focus</p>
              </div>
            </div>

            <div
              v-for="acad in ACADEMIC_EDUCATION"
              :key="acad.id"
              class="bg-white border border-gray-100 rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 hover:border-brand-200 transition-all duration-300"
            >
              <div class="flex items-center justify-between gap-2 mb-3">
                <span
                  class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border"
                  :class="
                    acad.badgeVariant === 'brand'
                      ? 'bg-brand-50 text-brand-600 border-brand-100'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-100'
                  "
                >
                  <span
                    v-if="acad.badgePulse"
                    class="w-2 h-2 rounded-full bg-brand-600 animate-pulse"
                  ></span>
                  {{ acad.badgeText }}
                </span>
                <span class="text-xs font-medium text-gray-400">{{ acad.levelLabel }}</span>
              </div>

              <h4 class="text-xl font-bold font-display text-gray-900 mb-1">{{ acad.degree }}</h4>
              <p
                class="text-sm font-semibold mb-3"
                :class="acad.badgeVariant === 'brand' ? 'text-brand-600' : 'text-gray-700'"
              >
                {{ acad.institution }}
              </p>
              <p class="text-sm text-gray-600 leading-relaxed mb-5">{{ acad.description }}</p>

              <div v-if="acad.tags?.length" class="flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                <span
                  v-for="tag in acad.tags"
                  :key="tag"
                  class="text-xs font-medium text-gray-600 bg-gray-50 border border-gray-100 px-2.5 py-1 rounded-lg"
                >
                  {{ tag }}
                </span>
              </div>

              <div
                v-else-if="acad.sourceUrl"
                class="pt-4 border-t border-gray-100 flex items-center justify-between"
              >
                <span class="text-xs text-gray-400">{{ acad.footerLabel }}</span>
                <a
                  :href="acad.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-flex items-center gap-1.5 text-brand-600 text-xs font-semibold hover:text-brand-700 transition-colors group"
                  @click="acad.analyticsId && trackSelectContent('button', acad.analyticsId)"
                >
                  <span>View Source Code</span>
                  <span class="transition-transform group-hover:translate-x-0.5">&rarr;</span>
                </a>
              </div>
            </div>
          </div>

          <!-- Continuous Learning Column -->
          <div class="space-y-6">
            <div class="flex items-center gap-3 mb-2">
              <div
                class="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  ></path>
                </svg>
              </div>
              <div>
                <h3 class="font-display text-xl font-bold text-gray-900">Continuous Learning</h3>
                <p class="text-xs text-gray-500">Intensive industry bootcamps</p>
              </div>
            </div>

            <div
              v-for="boot in BOOTCAMPS"
              :key="boot.id"
              class="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-brand-500/5 hover:border-brand-200 transition-all duration-300"
            >
              <div class="flex items-center justify-between gap-2 mb-2">
                <span class="text-xs font-bold uppercase tracking-wider" :class="boot.programColorClass">
                  {{ boot.programBadge }}
                </span>
                <span
                  v-if="boot.isAwardBadge"
                  class="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200/80 rounded-full text-xs font-semibold"
                >
                  <svg class="w-3 h-3 text-amber-500 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    ></path>
                  </svg>
                  {{ boot.organizerOrAward }}
                </span>
                <span v-else class="text-xs font-medium text-gray-400">{{ boot.organizerOrAward }}</span>
              </div>
              <h4 class="text-base font-bold font-display text-gray-900 mb-1">{{ boot.title }}</h4>
              <p class="text-sm text-gray-600 leading-relaxed">{{ boot.description }}</p>
            </div>
          </div>
        </div>

        <!-- Flutter & Dart Verified Certifications Carousel -->
        <CertificateCarousel />
      </div>
    </section>

    <!-- LinkedIn Highlight Section -->
    <section id="linkedin" class="py-12 md:py-16">
      <div class="max-w-6xl mx-auto px-6">
        <div
          class="relative overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-gradient-to-br from-[#0A66C2] via-[#004182] to-[#002244] p-8 md:p-14 lg:p-16 text-white shadow-2xl shadow-blue-900/30 border border-blue-400/20"
        >
          <!-- Ambient Glow Effects -->
          <div
            class="absolute -right-20 -top-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"
          ></div>
          <div
            class="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-600/30 rounded-full blur-3xl pointer-events-none"
          ></div>
          <div
            class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-black/30 pointer-events-none"
          ></div>

          <div class="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <!-- Left Column: Copy & Messaging -->
            <div class="lg:col-span-7 space-y-6">
              <div
                class="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 text-blue-100 border border-white/20 rounded-full text-xs font-semibold tracking-wide uppercase backdrop-blur-md"
              >
                <span class="relative flex h-2 w-2">
                  <span
                    class="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"
                  ></span>
                  <span class="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
                </span>
                Let's Connect &amp; Network
              </div>

              <h2
                class="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight"
              >
                Connect with Me on
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-white">LinkedIn</span>
              </h2>

              <p class="text-blue-100/90 text-base sm:text-lg leading-relaxed font-normal max-w-xl">
                Let's connect to expand our professional network. Whether you'd like to discuss mobile engineering,
                explore potential collaboration, or have an exciting engineering opportunity open, feel free to reach
                out.
              </p>

              <!-- Key Highlights / Badges -->
              <div class="flex flex-wrap gap-2.5 pt-2">
                <span
                  class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/15 rounded-xl text-xs font-medium text-white backdrop-blur-sm"
                >
                  <svg class="w-3.5 h-3.5 text-cyan-300" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                    />
                  </svg>
                  Mobile Engineer (4+ Yrs)
                </span>
                <span
                  class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/15 rounded-xl text-xs font-medium text-white backdrop-blur-sm"
                >
                  <svg class="w-3.5 h-3.5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Fintech &amp; Enterprise
                </span>
                <span
                  class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 border border-white/15 rounded-xl text-xs font-medium text-white backdrop-blur-sm"
                >
                  <svg class="w-3.5 h-3.5 text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                  Open to Dialogue
                </span>
              </div>
            </div>

            <!-- Right Column: Interactive Profile Showcase Card -->
            <div class="lg:col-span-5">
              <div
                class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden group hover:bg-white/[0.14] transition-all duration-500"
              >
                <!-- Decorative corner glow -->
                <div
                  class="absolute top-0 right-0 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none"
                ></div>

                <!-- Top Row: LinkedIn Logo & Status -->
                <div class="flex items-center justify-between gap-4 mb-6">
                  <div
                    class="w-14 h-14 rounded-2xl bg-white text-[#0A66C2] flex items-center justify-center shadow-xl shadow-blue-950/30"
                  >
                    <svg class="w-8 h-8 fill-current" viewBox="0 0 24 24">
                      <path
                        d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                      />
                    </svg>
                  </div>
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 rounded-full text-xs font-semibold"
                  >
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Open to Connect
                  </span>
                </div>

                <!-- Profile Details -->
                <div class="mb-6">
                  <div class="flex items-center gap-1.5 text-white font-bold text-xl sm:text-2xl font-display">
                    <span>Yasha Gozwan Shuhada</span>
                    <svg
                      class="w-5 h-5 text-cyan-300 fill-current shrink-0"
                      viewBox="0 0 24 24"
                      title="Verified Professional"
                    >
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                      />
                    </svg>
                  </div>
                  <p class="text-blue-200 text-sm font-medium mt-1">
                    Mobile Engineer (Flutter &amp; Native iOS/Android)
                  </p>
                  <p class="text-xs text-blue-200/70 mt-1 flex items-center gap-1">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Indonesia &bull; 500+ connections
                  </p>
                </div>

                <!-- CTA Button -->
                <a
                  href="https://www.linkedin.com/in/yasha-gozwan-shuhada-b924a699/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 bg-white text-[#0A66C2] hover:bg-blue-50 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 text-sm sm:text-base group/btn"
                  @click="trackSelectContent('button', 'LinkedIn Highlight Card Connect')"
                >
                  <span>View Profile &amp; Connect</span>
                  <svg
                    class="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hobbies Section (Elegant Navigation Card) -->
    <section class="py-20 md:py-24 bg-gray-50/30 border-t border-gray-100/50">
      <div class="max-w-6xl mx-auto px-6">
        <div
          class="bg-gradient-to-br from-white to-gray-50 border border-gray-100 rounded-[2.5rem] p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm hover:shadow-md transition-all relative overflow-hidden"
        >
          <!-- Floating Ambient Glow -->
          <div
            class="absolute -left-10 -bottom-10 w-64 h-64 bg-brand-500/5 rounded-full blur-3xl pointer-events-none"
          ></div>

          <div class="relative z-10 max-w-xl text-left">
            <span class="text-xs font-bold text-brand-600 uppercase tracking-widest block mb-3"
              >Life Outside of Code</span
            >
            <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Hobbies &amp; Passions
            </h2>
            <p class="text-gray-500 text-base md:text-lg leading-relaxed mb-6">
              I believe in cultivating discipline and curiosity across all dimensions of life. Discover my engagement
              with Nietzsche's philosophy, structured physical training, and deep technical exploration.
            </p>
            <div class="flex flex-wrap gap-3">
              <span
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-50/50 text-brand-700 rounded-full text-xs font-semibold"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Philosophy
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-50/50 text-brand-700 rounded-full text-xs font-semibold"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
                Gym &amp; Fitness
              </span>
              <span
                class="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-50/50 text-brand-700 rounded-full text-xs font-semibold"
              >
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Tech Exploration
              </span>
            </div>
          </div>

          <div class="relative z-10 shrink-0 w-full lg:w-auto">
            <RouterLink
              to="/hobbies"
              class="w-full lg:w-auto inline-flex items-center justify-center gap-2 px-8 py-5 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-700 hover:shadow-xl hover:-translate-y-0.5 transition-all text-base"
              @click="trackSelectContent('button', 'Index View Hobbies Section')"
            >
              Explore Hobbies
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </RouterLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Ideas & Reflections Featured Section -->
    <section class="py-20 md:py-24 bg-white border-t border-gray-100/60 relative overflow-hidden">
      <div class="max-w-6xl mx-auto px-6">
        <!-- Curated Editorial Bookshelf Card -->
        <div
          class="bg-[#FAF8F5] border border-stone-200/80 rounded-[2.5rem] p-8 md:p-14 lg:p-16 relative overflow-hidden transition-all duration-500 hover:border-stone-300 hover:shadow-lg shadow-sm"
        >
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            <!-- Left Header & Context -->
            <div class="lg:col-span-6 space-y-6">
              <div>
                <div
                  class="inline-flex items-center gap-2 mb-3 text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase"
                >
                  <span class="w-5 h-px bg-slate-300"></span>
                  <span>Ideas &amp; Reflections</span>
                </div>
                <h2 class="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Ideas I'm Exploring
                </h2>
              </div>

              <p class="text-stone-600 text-base md:text-lg leading-relaxed font-normal">
                A collection of books, ideas, and personal reflections I'm exploring outside of code.
              </p>

              <p class="text-stone-500 text-sm leading-relaxed">
                Curated reading notes, philosophical inquiries, and technical thoughts written as standalone documents.
              </p>

              <!-- Action Link -->
              <div class="pt-2">
                <a
                  href="/ideas"
                  class="inline-flex items-center gap-2.5 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold hover:bg-gray-800 hover:shadow-lg hover:-translate-y-0.5 transition-all text-sm group"
                  @click.prevent="openIdeasModal('Index View Ideas Section')"
                >
                  Explore Ideas
                  <svg
                    class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Right Side: Typographic Featured Card (No Image) -->
            <div class="lg:col-span-6">
              <a
                href="/ideas"
                class="group block relative bg-white rounded-3xl border border-stone-200/80 p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-500"
                @click.prevent="openIdeasModal()"
              >
                <!-- Card Header Badge & Tag -->
                <div class="flex items-center justify-between gap-4 pb-6 border-b border-stone-100 text-xs">
                  <span
                    class="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-700 rounded-full font-semibold tracking-wide"
                  >
                    <span class="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
                    <span id="featured-idea-category">Featured: {{ featuredIdea?.category || 'Philosophy' }}</span>
                  </span>
                  <span class="text-stone-400 font-mono text-[11px] uppercase tracking-wider">Archive Item</span>
                </div>

                <!-- Typography Core: Title & Description -->
                <div class="py-7 space-y-4">
                  <h3 class="font-serif italic text-2xl sm:text-3xl lg:text-4xl text-stone-900 font-medium leading-snug">
                    &ldquo;<span id="featured-idea-title">{{ featuredIdea?.title }}</span>&rdquo;
                  </h3>
                  <p id="featured-idea-desc" class="text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                    {{ featuredIdea?.description }}
                  </p>
                </div>

                <!-- Card Footer Action -->
                <div class="pt-6 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                  <span class="text-stone-400 font-medium">Read Document</span>
                  <span
                    class="inline-flex items-center gap-1.5 font-semibold text-stone-900 group-hover:text-brand-600 transition-colors"
                  >
                    View in Archive
                    <svg
                      class="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Built With Section -->
    <section class="py-20 md:py-24 bg-white border-t border-gray-100/50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-12 md:mb-16">
          <h2 class="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built with Purpose</h2>
          <p class="text-gray-500 max-w-2xl mx-auto">
            This portfolio is a testament to modern web performance and minimalist engineering. Here's a look at the
            core stack powering this experience.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-5 gap-8">
          <!-- Tailwind -->
          <div class="flex flex-col items-center text-center p-6 grayscale hover:grayscale-0 transition-all duration-500">
            <div class="w-12 h-12 mb-4">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#38BDF8"
                  d="M12 6c-2.5 0-4 1.2-4.5 3.5 1-.8 2-.9 3-.4.6.3 1 .8 1.5 1.4C13 11.5 14 13 16 13c2.5 0 4-1.2 4.5-3.5-1 .8-2 .9-3 .4-.6-.3-1-.8-1.5-1.4C15 7.5 14 6 12 6zM8 13c-2.5 0-4 1.2-4.5 3.5 1-.8 2-.9 3-.4.6.3 1 .8 1.5 1.4C9 18.5 10 20 12 20c2.5 0 4-1.2 4.5-3.5-1 .8-2 .9-3 .4-.6-.3-1-.8-1.5-1.4C11 14.5 10 13 8 13z"
                />
              </svg>
            </div>
            <span class="text-sm font-bold text-gray-900">Tailwind CSS</span>
            <span class="text-[11px] text-gray-400 mt-1">Design System</span>
          </div>
          <!-- Vue.js -->
          <div class="flex flex-col items-center text-center p-6 grayscale hover:grayscale-0 transition-all duration-500">
            <div class="w-12 h-12 mb-4">
              <svg class="w-full h-full" viewBox="0 0 261.76 226.69" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M161.096.001l-30.225 52.351L100.647.001H-.005l130.877 226.688L261.749.001z"
                  fill="#41b883"
                />
                <path
                  d="M161.096.001l-30.225 52.351L100.647.001H52.346l78.526 136.01L209.398.001z"
                  fill="#34495e"
                />
              </svg>
            </div>
            <span class="text-sm font-bold text-gray-900">Vue.js 3</span>
            <span class="text-[11px] text-gray-400 mt-1">Reactive UI</span>
          </div>
          <!-- GTM/GA -->
          <div class="flex flex-col items-center text-center p-6 grayscale hover:grayscale-0 transition-all duration-500">
            <div class="w-12 h-12 mb-4">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <circle cx="6" cy="18" r="2" fill="#F9AB00" />
                <rect x="10" y="10" width="4" height="10" rx="2" fill="#F9AB00" />
                <rect x="16" y="4" width="4" height="16" rx="2" fill="#E37400" />
              </svg>
            </div>
            <span class="text-sm font-bold text-gray-900">GTM / GA4</span>
            <span class="text-[11px] text-gray-400 mt-1">Analytics</span>
          </div>
          <!-- GitHub Pages -->
          <div class="flex flex-col items-center text-center p-6 grayscale hover:grayscale-0 transition-all duration-500">
            <div class="w-12 h-12 mb-4">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="#181717"
                  d="M12 1C5.9 1 1 5.9 1 12c0 4.9 3.2 9 7.6 10.5.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.3-3.8-1.3-.5-1.2-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 1.6 2.6 1.1 3.2.9.1-.7.4-1.1.7-1.4-2.5-.3-5.1-1.2-5.1-5.4 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.8 0 0 .9-.3 2.9 1.1.8-.2 1.7-.4 2.6-.4s1.8.2 2.6.4c2-1.4 2.9-1.1 2.9-1.1.6 1.4.2 2.5.1 2.8.7.8 1.1 1.8 1.1 3 0 4.2-2.6 5.1-5.1 5.4.4.3.7 1 .7 2v3c0 .3.2.7.8.6C19.8 21 23 16.9 23 12c0-6.1-4.9-11-11-11z"
                />
              </svg>
            </div>
            <span class="text-sm font-bold text-gray-900">GitHub Pages</span>
            <span class="text-[11px] text-gray-400 mt-1">Hosting</span>
          </div>
          <!-- Search Console -->
          <div class="flex flex-col items-center text-center p-6 grayscale hover:grayscale-0 transition-all duration-500">
            <div class="w-12 h-12 mb-4">
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <rect x="3" y="4" width="14" height="16" rx="2" fill="#1A73E8" />
                <rect x="6" y="8" width="8" height="2" fill="white" />
                <rect x="6" y="12" width="6" height="2" fill="white" />
                <circle cx="18" cy="18" r="3" fill="#34A853" />
              </svg>
            </div>
            <span class="text-sm font-bold text-gray-900">SEO Optimized</span>
            <span class="text-[11px] text-gray-400 mt-1">Visibility</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Template Banner -->
    <section class="max-w-6xl mx-auto px-6 mb-20 md:mb-24">
      <div
        class="bg-gradient-to-r from-gray-900 to-gray-800 rounded-[2.5rem] p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
      >
        <div
          class="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none -mr-10 -mt-20"
        ></div>
        <div class="relative z-10 text-center md:text-left max-w-xl">
          <h3 class="font-display text-3xl md:text-4xl font-bold text-white mb-3">Want this exact portfolio?</h3>
          <p class="text-gray-400 text-lg">
            Use my open-source template to build your own stunning developer portfolio in minutes.
          </p>
        </div>
        <a
          href="https://github.com/yashagozwan/yashagozwan.github.io"
          target="_blank"
          rel="noopener noreferrer"
          class="relative z-10 shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-50 hover:shadow-xl hover:-translate-y-1 transition-all"
          @click="trackSelectContent('button', 'Banner Use My Template')"
        >
          <svg class="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
          </svg>
          Use My Template
        </a>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 pt-20 pb-10">
      <div class="max-w-6xl mx-auto px-6 text-center">
        <h2 class="font-display text-4xl font-bold text-gray-900 mb-6">Let's build something beautiful.</h2>
        <p class="text-gray-500 mb-10 text-lg max-w-xl mx-auto">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my
          best to get back to you!
        </p>

        <a
          href="mailto:yashagozwan13@gmail.com"
          class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 text-white rounded-full font-bold hover:bg-brand-700 hover:shadow-xl hover:-translate-y-1 transition-all"
          @click="trackSelectContent('button', 'Footer Send Email')"
        >
          Send an Email
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </a>

        <div class="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p class="text-gray-400 font-medium text-sm">© 2026 Yasha Gozwan Shuhada. All rights reserved.</p>
          <div class="flex items-center gap-5">
            <a
              href="https://github.com/yashagozwan"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="GitHub"
              @click="trackSelectContent('button', 'Social GitHub')"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/yasha-gozwan-shuhada-b924a699"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-brand-600 transition-colors"
              aria-label="LinkedIn"
              @click="trackSelectContent('button', 'Social LinkedIn')"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/yashagozwan"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-pink-600 transition-colors"
              aria-label="Instagram"
              @click="trackSelectContent('button', 'Social Instagram')"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
                />
              </svg>
            </a>
            <a
              href="https://x.com/letyasha"
              target="_blank"
              rel="noopener noreferrer"
              class="text-gray-400 hover:text-gray-900 transition-colors"
              aria-label="X"
              @click="trackSelectContent('button', 'Social X')"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path
                  d="M18.244 2H21.5l-7.19 8.21L22 22h-6.828l-5.348-6.99L3.5 22H.244l7.69-8.78L2 2h6.828l4.84 6.41L18.244 2zm-1.2 18h1.89L7.01 4h-2.02l12.054 16z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Modals -->
    <IdeasNoticeModal :is-open="isIdeasModalOpen" @close="isIdeasModalOpen = false" />
    <HighlightDetailModal :highlight="activeHighlight" @close="closeHighlight" />
    <ProjectDetailModal :project="activeProject" @close="closeProject" />
  </div>
</template>
