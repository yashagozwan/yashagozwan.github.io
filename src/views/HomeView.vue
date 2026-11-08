<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import LearningPathTimeline from '@/components/LearningPathTimeline.vue'
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
import { fetchIdeasFromFirestore } from '@/services/ideasService'
import type { EngineeringHighlight, IdeaDocument, ProjectItem, SkillCategory } from '@/types/portfolio'
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
const liveIdeas = ref<IdeaDocument[]>(IDEAS_COLLECTION)
const featuredIdea = computed(() => liveIdeas.value.find((i) => i.featured) || liveIdeas.value[0])

function openIdeasModal(analyticsLabel?: string) {
  if (analyticsLabel) {
    trackSelectContent('button', analyticsLabel)
  }
  isIdeasModalOpen.value = true
}

function openHighlight(item: EngineeringHighlight, event: Event) {
  lastHighlightTrigger = event.currentTarget as HTMLElement
  activeHighlight.value = item
  trackSelectContent('highlight', `Engineering Highlight: ${item.title}`)
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
  target.src = 'https://ui-avatars.com/api/?name=Yasha+Gozwan&size=512&background=171717&color=ffffff'
}

let cleanupScrollTracking: (() => void) | null = null

onMounted(async () => {
  cleanupScrollTracking = initScrollDepthTracking()
  try {
    const fetched = await fetchIdeasFromFirestore()
    if (fetched && fetched.length > 0) {
      liveIdeas.value = fetched
    }
  } catch (e) {
    console.warn('Using local fallback ideas:', e)
  }
})

onUnmounted(() => {
  if (cleanupScrollTracking) {
    cleanupScrollTracking()
  }
})
</script>

<template>
  <div class="bg-white text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white overflow-x-hidden">
    <!-- Minimalist Navigation -->
    <Navbar @open-ideas-modal="openIdeasModal()" />

    <!-- YANG: Hero Section (Crisp White Editorial) -->
    <section class="pt-36 pb-20 md:pt-44 md:pb-28 px-6">
      <div class="max-w-5xl mx-auto">
        <!-- Status & Role Indicator -->
        <div class="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 mb-8">
          <span class="w-2 h-2 rounded-full bg-neutral-950"></span>
          <span>Mobile Engineer &mdash; Flutter &amp; Native iOS / Android</span>
        </div>

        <!-- Editorial Headline -->
        <h1
          class="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08] max-w-4xl mb-8"
        >
          Engineering quiet,
          <span class="font-serif italic font-normal">resilient</span>
          mobile applications.
        </h1>

        <!-- Clear Purpose Statement -->
        <p class="text-lg md:text-xl text-neutral-600 font-normal max-w-2xl leading-relaxed mb-10">
          I'm <strong class="text-neutral-950 font-semibold">Yasha Gozwan Shuhada</strong>. With over 4 years of
          production experience across fintech and enterprise ecosystems, I architect scalable mobile applications built
          on Clean Architecture, Domain-Driven Design, and native platform integration.
        </p>

        <!-- High-Contrast Yin & Yang Actions -->
        <div class="flex flex-wrap items-center gap-3.5 mb-20">
          <a
            href="#projects"
            class="px-7 py-3.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
            @click="trackSelectContent('button', 'Hero View My Work')"
          >
            Selected Work
          </a>
          <a
            href="https://1drv.ms/w/c/3a9078387366ac10/IQDvgYAtuqWsQob5YH9n7O-xAZACWNW0mJR8rGJ-OCwm6AA?e=ZjleGe"
            target="_blank"
            rel="noopener noreferrer"
            class="px-7 py-3.5 bg-white border border-neutral-300 hover:border-neutral-950 text-neutral-950 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
            @click="trackSelectContent('button', 'Hero Preview Full CV')"
          >
            Curriculum Vitae &nearr;
          </a>
          <a
            href="https://github.com/yashagozwan"
            target="_blank"
            rel="noopener noreferrer"
            class="px-6 py-3.5 text-neutral-500 hover:text-neutral-950 text-xs font-semibold uppercase tracking-widest transition-colors"
            @click="trackSelectContent('button', 'Hero GitHub Profile')"
          >
            GitHub &nearr;
          </a>
          <a
            href="https://www.linkedin.com/in/yasha-gozwan-shuhada-b924a699/"
            target="_blank"
            rel="noopener noreferrer"
            class="px-4 py-3.5 text-neutral-500 hover:text-neutral-950 text-xs font-semibold uppercase tracking-widest transition-colors"
            @click="trackSelectContent('button', 'Hero LinkedIn Profile')"
          >
            LinkedIn &nearr;
          </a>
        </div>

        <!-- Architectural Metrics Hairline Bar -->
        <div class="border-y border-neutral-200 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in STATS" :key="stat.label">
            <div class="font-display font-bold text-3xl md:text-4xl text-neutral-950 tracking-tight mb-1">
              {{ stat.value }}
            </div>
            <div class="text-[11px] font-semibold text-neutral-400 uppercase tracking-[0.18em]">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 01 / ABOUT & CORE STACK (Yang — White) -->
    <section id="about" class="py-20 md:py-28 px-6">
      <div class="max-w-5xl mx-auto">
        <!-- Section Index Header -->
        <div class="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-12">
          <span>01</span>
          <span class="w-8 h-px bg-neutral-300"></span>
          <span>Profile &amp; Capabilities</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <!-- Left: Monochrome Architectural Portrait -->
          <div class="lg:col-span-4">
            <div class="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 mb-4">
              <img
                src="/images/yasha.png"
                alt="Yasha Gozwan Shuhada"
                loading="lazy"
                class="w-full h-full object-cover object-center grayscale contrast-105 hover:grayscale-0 transition-all duration-700"
                @error="handleProfileImgError"
              />
            </div>
            <div class="flex items-center justify-between text-xs text-neutral-500 pt-1">
              <span>Jakarta, Indonesia</span>
              <RouterLink
                to="/bio"
                class="font-semibold text-neutral-950 hover:underline underline-offset-4"
              >
                Full Biography &rarr;
              </RouterLink>
            </div>
          </div>

          <!-- Right: Engineering Narrative & Stack -->
          <div class="lg:col-span-8 space-y-10">
            <div>
              <h2 class="font-display text-3xl md:text-4xl font-bold text-neutral-950 tracking-tight leading-snug mb-6">
                Focused on architectural clarity, long-term maintainability, and native-grade performance.
              </h2>
              <p class="text-base md:text-lg text-neutral-600 leading-relaxed mb-4">
                I specialize in <strong class="text-neutral-950 font-semibold">Flutter</strong> and native
                <strong class="text-neutral-950 font-semibold">iOS / Android</strong> development. My daily work
                revolves around translating complex fintech and enterprise requirements into clean, testable layers
                using Bloc, Domain-Driven Design (DDD), and custom MethodChannel bridges.
              </p>
              <p class="text-base text-neutral-500 leading-relaxed">
                Collaborating within Agile Scrum teams alongside QA, backend, and product engineers, I prioritize
                predictable delivery and software that remains effortless to scale.
              </p>
            </div>

            <!-- Core Technical Stack -->
            <div class="pt-8 border-t border-neutral-200">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
                <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-neutral-950">
                  Technical Stack
                </h3>
                <span class="text-xs text-neutral-400 font-mono">
                  {{ filteredSkills.length }} / {{ CORE_STACK_ITEMS.length }} technologies
                </span>
              </div>

              <!-- Monochrome Category Filter Tabs -->
              <div class="flex flex-wrap gap-1.5 mb-6">
                <button
                  v-for="cat in skillCategories"
                  :key="cat"
                  type="button"
                  class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
                  :class="
                    selectedSkillCategory === cat
                      ? 'bg-neutral-950 text-white'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950'
                  "
                  @click="selectedSkillCategory = cat"
                >
                  {{ cat }}
                </button>
              </div>

              <!-- Skills Hairline Pills -->
              <TransitionGroup name="skill-list" tag="div" class="flex flex-wrap gap-2">
                <span
                  v-for="skill in filteredSkills"
                  :key="skill.name"
                  class="px-3.5 py-1.5 bg-white border border-neutral-200 rounded-full text-xs font-medium text-neutral-800 hover:border-neutral-950 transition-colors cursor-default"
                >
                  {{ skill.name }}
                </span>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 02 / EXPERIENCE (Yang — Editorial Ledger) -->
    <section id="experience" class="py-20 md:py-28 px-6 border-t border-neutral-200 bg-[#FAFAFA]">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
          <div>
            <div class="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
              <span>02</span>
              <span class="w-8 h-px bg-neutral-300"></span>
              <span>Career Ledger</span>
            </div>
            <h2 class="font-display text-3xl md:text-5xl font-bold text-neutral-950 tracking-tight">
              Professional Experience
            </h2>
          </div>
          <p class="text-sm text-neutral-500 max-w-sm">
            Enterprise, fintech, and commercial engineering roles across Indonesia's technology sector.
          </p>
        </div>

        <!-- Primary Roles Ledger -->
        <div class="divide-y divide-neutral-200 border-t border-b border-neutral-200">
          <article
            v-for="exp in MAIN_EXPERIENCES"
            :key="exp.id"
            class="py-10 md:py-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10"
          >
            <!-- Left Meta Column -->
            <div class="md:col-span-4 space-y-1.5">
              <div class="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                {{ exp.period }}
              </div>
              <h3 class="font-display text-xl font-bold text-neutral-950">
                {{ exp.company }}
              </h3>
              <div v-if="exp.isPrimary" class="pt-1">
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-neutral-950 text-white text-[10px] font-semibold uppercase tracking-widest rounded-full">
                  Current Role
                </span>
              </div>
            </div>

            <!-- Right Details Column -->
            <div class="md:col-span-8 space-y-5">
              <div>
                <h4 class="font-display text-lg md:text-xl font-semibold text-neutral-900 mb-2">
                  {{ exp.role }}
                </h4>
                <p class="text-sm md:text-base text-neutral-600 leading-relaxed">
                  {{ exp.summary }}
                </p>
              </div>

              <ul v-if="exp.highlights?.length" class="space-y-2.5">
                <li
                  v-for="(point, idx) in exp.highlights"
                  :key="idx"
                  class="flex items-start gap-3 text-sm text-neutral-600 leading-relaxed"
                >
                  <span class="text-neutral-400 select-none font-mono">&mdash;</span>
                  <span v-html="point"></span>
                </li>
              </ul>

              <div v-if="exp.tags?.length" class="flex flex-wrap gap-2 pt-2">
                <span
                  v-for="tag in exp.tags"
                  :key="tag"
                  class="text-[11px] font-medium text-neutral-600 bg-white border border-neutral-200 px-3 py-1 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </article>
        </div>

        <!-- Earlier & Freelance Roles -->
        <div class="mt-14">
          <div class="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 mb-6">
            Earlier &amp; Independent Engagements
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="item in FREELANCE_EXPERIENCES"
              :key="item.id"
              class="bg-white border border-neutral-200 rounded-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div class="flex items-center justify-between gap-2 text-xs text-neutral-400 font-mono mb-2">
                  <span>{{ item.period }}</span>
                  <span class="uppercase tracking-wider">{{ item.type || 'Freelance' }}</span>
                </div>
                <h4 class="font-display font-bold text-neutral-950 text-lg">{{ item.role }}</h4>
                <p class="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">{{ item.company }}</p>
                <p class="text-neutral-600 text-sm leading-relaxed">{{ item.summary }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 03 / SELECTED WORK & ARCHITECTURE (YIN — Deep Obsidian Black #0A0A0A) -->
    <section id="projects" class="py-24 md:py-32 px-6 bg-neutral-950 text-white">
      <div class="max-w-5xl mx-auto">
        <!-- Section Header -->
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div class="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-4">
              <span>03</span>
              <span class="w-8 h-px bg-neutral-700"></span>
              <span>Selected Work</span>
            </div>
            <h2 class="font-display text-3xl md:text-5xl font-bold text-white tracking-tight">
              Production Case Studies
              <span class="font-serif italic font-normal text-neutral-400 block sm:inline">&amp; Architecture</span>
            </h2>
          </div>
          <p class="text-sm text-neutral-400 max-w-sm leading-relaxed">
            Select any application or architectural highlight below to inspect its engineering challenge, design
            approach, and impact.
          </p>
        </div>

        <!-- Featured Projects Grid (3 Columns) -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div
            v-for="(project, idx) in featuredProjects"
            :key="project.id"
            tabindex="0"
            role="button"
            aria-haspopup="dialog"
            :aria-label="`View case study for ${project.title}`"
            class="group bg-neutral-900/50 border border-neutral-800 hover:border-white/70 rounded-2xl p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            @click="openProject(project, $event)"
            @keydown.enter.prevent="openProject(project, $event)"
            @keydown.space.prevent="openProject(project, $event)"
          >
            <div>
              <div class="flex items-center justify-between text-xs font-mono text-neutral-500 mb-6">
                <span>0{{ idx + 1 }} / {{ project.company }}</span>
                <span class="text-neutral-400 group-hover:text-white transition-colors">
                  Case Study &nearr;
                </span>
              </div>

              <h3 class="font-display text-2xl font-bold text-white mb-3 tracking-tight">
                {{ project.title }}
              </h3>
              <p class="text-neutral-400 text-sm leading-relaxed mb-8">
                {{ project.summary }}
              </p>
            </div>

            <div class="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/80">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="text-[11px] font-medium text-neutral-300 border border-neutral-800 px-2.5 py-0.5 rounded-full"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>

        <!-- Additional Commercial Projects (Sleek Tabular Ledger) -->
        <div class="mb-24">
          <div class="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4">
            Additional Production Deliveries
          </div>
          <div class="divide-y divide-neutral-800/80 border-t border-b border-neutral-800/80">
            <div
              v-for="mini in otherProjects"
              :key="mini.id"
              tabindex="0"
              role="button"
              aria-haspopup="dialog"
              :aria-label="`View case study for ${mini.title}`"
              class="group py-4 px-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-neutral-900/50 transition-colors cursor-pointer"
              @click="openProject(mini, $event)"
              @keydown.enter.prevent="openProject(mini, $event)"
              @keydown.space.prevent="openProject(mini, $event)"
            >
              <div class="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                <h4 class="font-display font-bold text-white text-base group-hover:underline underline-offset-4">
                  {{ mini.title }}
                </h4>
                <span class="text-xs text-neutral-500">{{ mini.summary }}</span>
              </div>
              <div class="flex items-center gap-4 text-xs font-mono text-neutral-400 shrink-0">
                <span class="hidden md:inline text-neutral-600">{{ mini.platform }}</span>
                <span class="group-hover:text-white transition-colors">Inspect &rarr;</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Architectural & Engineering Highlights (Inside Yin Section) -->
        <div id="engineering-highlights" class="pt-16 border-t border-neutral-800">
          <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                Architectural Notes
              </span>
              <h3 class="font-display text-2xl md:text-3xl font-bold text-white tracking-tight">
                Engineering Problem Solving
              </h3>
            </div>
            <p class="text-xs text-neutral-400 max-w-xs">
              Core technical challenges, architectural trade-offs, and research explorations.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              v-for="item in ENGINEERING_HIGHLIGHTS"
              :key="item.id"
              tabindex="0"
              role="button"
              aria-haspopup="dialog"
              :aria-label="`View ${item.title} case details`"
              class="group bg-neutral-900/30 border border-neutral-800 hover:border-white/70 rounded-2xl p-7 transition-all duration-300 cursor-pointer flex flex-col justify-between"
              @click="openHighlight(item, $event)"
              @keydown.enter.prevent="openHighlight(item, $event)"
              @keydown.space.prevent="openHighlight(item, $event)"
            >
              <div>
                <div class="flex items-center justify-between mb-4">
                  <h4 class="font-display text-xl font-bold text-white">
                    {{ item.title }}
                  </h4>
                  <span class="text-xs font-mono text-neutral-500 group-hover:text-white transition-colors">
                    Notes &nearr;
                  </span>
                </div>

                <div class="space-y-2.5 mb-6 text-sm">
                  <p class="text-neutral-300 leading-relaxed">
                    <span class="text-neutral-500 font-mono text-xs uppercase mr-1.5">Problem:</span>
                    {{ item.problem }}
                  </p>
                  <p class="text-neutral-400 leading-relaxed">
                    <span class="text-neutral-500 font-mono text-xs uppercase mr-1.5">Approach:</span>
                    {{ item.approach }}
                  </p>
                </div>
              </div>

              <div class="flex flex-wrap gap-1.5 pt-4 border-t border-neutral-800/80">
                <span
                  v-for="tag in item.tags"
                  :key="tag"
                  class="text-[11px] font-medium text-neutral-400 border border-neutral-800 px-2.5 py-0.5 rounded-full"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 04 / EDUCATION & PROFESSIONAL PATH (Yang — Crisp White) -->
    <section id="education" class="py-24 md:py-32 px-6 bg-white">
      <div class="max-w-5xl mx-auto space-y-16">
        <!-- Section Header -->
        <div>
          <div class="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
            <span>04</span>
            <span class="w-8 h-px bg-neutral-300"></span>
            <span>Education &amp; Mastery</span>
          </div>
          <h2 class="font-display text-3xl md:text-5xl font-bold text-neutral-950 tracking-tight">
            Academic &amp; Professional Path
          </h2>
        </div>

        <!-- Academic & Intensive Programs (2-Column Editorial Layout) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          <!-- Academic Column -->
          <div class="space-y-6">
            <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-200 pb-3">
              Formal Academic Degrees
            </h3>

            <div
              v-for="acad in ACADEMIC_EDUCATION"
              :key="acad.id"
              class="border border-neutral-200 rounded-2xl p-6 space-y-3"
            >
              <div class="flex items-center justify-between text-xs font-mono text-neutral-400">
                <span>{{ acad.badgeText }}</span>
                <span class="uppercase">{{ acad.levelLabel }}</span>
              </div>
              <div>
                <h4 class="font-display text-xl font-bold text-neutral-950">{{ acad.degree }}</h4>
                <p class="text-sm font-medium text-neutral-600">{{ acad.institution }}</p>
              </div>
              <p class="text-sm text-neutral-500 leading-relaxed">{{ acad.description }}</p>

              <div v-if="acad.sourceUrl" class="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs">
                <span class="text-neutral-400">{{ acad.footerLabel }}</span>
                <a
                  :href="acad.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-semibold text-neutral-950 hover:underline underline-offset-4"
                  @click="acad.analyticsId && trackSelectContent('button', acad.analyticsId)"
                >
                  Source Code &nearr;
                </a>
              </div>
            </div>
          </div>

          <!-- Intensive Programs Column -->
          <div class="space-y-6">
            <h3 class="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 border-b border-neutral-200 pb-3">
              Industry Bootcamps &amp; Fellowships
            </h3>

            <div class="divide-y divide-neutral-200 border border-neutral-200 rounded-2xl px-6">
              <div
                v-for="boot in BOOTCAMPS"
                :key="boot.id"
                class="py-5 space-y-1.5"
              >
                <div class="flex items-center justify-between text-xs font-mono">
                  <span class="font-semibold text-neutral-950 uppercase tracking-wider font-sans text-[11px]">
                    {{ boot.programBadge }}
                  </span>
                  <span
                    :class="
                      boot.isAwardBadge
                        ? 'px-2 py-0.5 bg-neutral-950 text-white rounded-full text-[10px] font-sans font-semibold'
                        : 'text-neutral-400'
                    "
                  >
                    {{ boot.organizerOrAward }}
                  </span>
                </div>
                <h4 class="font-display text-base font-bold text-neutral-950">{{ boot.title }}</h4>
                <p class="text-xs sm:text-sm text-neutral-500 leading-relaxed">{{ boot.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Horizontal Timeline: Dicoding x Google Multi-Platform App Developer -->
        <LearningPathTimeline />

        <!-- Verified Certifications Carousel -->
        <CertificateCarousel />
      </div>
    </section>

    <!-- 05 / BEYOND CODE (Editorial Index to /bio, /hobbies, /ideas) -->
    <section class="py-20 md:py-28 px-6 border-t border-neutral-200 bg-[#FAFAFA]">
      <div class="max-w-5xl mx-auto">
        <div class="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-10">
          <span>05</span>
          <span class="w-8 h-px bg-neutral-300"></span>
          <span>Beyond Software</span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 01. Bio -->
          <RouterLink
            to="/bio"
            class="group bg-white border border-neutral-200 hover:border-neutral-950 rounded-2xl p-7 flex flex-col justify-between transition-all"
          >
            <div>
              <div class="text-xs font-mono text-neutral-400 mb-4">01 / PROFILE</div>
              <h3 class="font-display text-xl font-bold text-neutral-950 mb-2">
                Biography &amp; Ethos
              </h3>
              <p class="text-sm text-neutral-500 leading-relaxed mb-6">
                Concise overview of my engineering philosophy, domain focus, and bilingual profile notes.
              </p>
            </div>
            <div class="text-xs font-semibold uppercase tracking-widest text-neutral-950 inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Read Bio</span>
              <span>&rarr;</span>
            </div>
          </RouterLink>

          <!-- 02. Hobbies -->
          <RouterLink
            to="/hobbies"
            class="group bg-white border border-neutral-200 hover:border-neutral-950 rounded-2xl p-7 flex flex-col justify-between transition-all"
            @click="trackSelectContent('button', 'Index View Hobbies Section')"
          >
            <div>
              <div class="text-xs font-mono text-neutral-400 mb-4">02 / DISCIPLINE</div>
              <h3 class="font-display text-xl font-bold text-neutral-950 mb-2">
                Hobbies &amp; Passions
              </h3>
              <p class="text-sm text-neutral-500 leading-relaxed mb-6">
                Nietzschean philosophy readings, structured strength training, and deep mobile engine exploration.
              </p>
            </div>
            <div class="text-xs font-semibold uppercase tracking-widest text-neutral-950 inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Explore Hobbies</span>
              <span>&rarr;</span>
            </div>
          </RouterLink>

          <!-- 03. Ideas & Reflections -->
          <a
            href="/ideas"
            class="group bg-neutral-950 text-white rounded-2xl p-7 flex flex-col justify-between transition-all hover:bg-neutral-900"
            @click.prevent="openIdeasModal('Index View Ideas Section')"
          >
            <div>
              <div class="text-xs font-mono text-neutral-400 mb-4">03 / ARCHIVE</div>
              <h3 class="font-display text-xl font-bold text-white mb-2">
                Ideas &amp; Reflections
              </h3>
              <p class="text-sm text-neutral-400 leading-relaxed mb-3">
                Personal essays and reading notes outside of code.
              </p>
              <p v-if="featuredIdea" class="font-serif italic text-xs text-neutral-300 border-l border-neutral-700 pl-3 py-0.5">
                Featured: &ldquo;{{ featuredIdea.title }}&rdquo;
              </p>
            </div>
            <div class="pt-6 text-xs font-semibold uppercase tracking-widest text-white inline-flex items-center gap-1.5 group-hover:translate-x-1 transition-transform">
              <span>Open Archive</span>
              <span>&rarr;</span>
            </div>
          </a>
        </div>
      </div>
    </section>

    <!-- YIN: Minimalist Monochrome Footer -->
    <footer class="bg-neutral-950 text-white py-20 px-6 border-t border-neutral-900">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-neutral-800">
          <div class="max-w-xl">
            <div class="text-xs font-mono uppercase tracking-[0.2em] text-neutral-500 mb-3">
              Contact &amp; Dialogue
            </div>
            <h2 class="font-display text-3xl sm:text-5xl font-bold tracking-tight text-white mb-4">
              Let's build something <span class="font-serif italic font-normal text-neutral-300">enduring.</span>
            </h2>
            <p class="text-neutral-400 text-sm sm:text-base leading-relaxed">
              Open to mobile engineering opportunities, architectural consulting, and professional connections.
            </p>
          </div>

          <div class="flex flex-wrap gap-3 shrink-0">
            <a
              href="mailto:yashagozwan13@gmail.com"
              class="px-7 py-3.5 bg-white hover:bg-neutral-200 text-neutral-950 rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
              @click="trackSelectContent('button', 'Footer Email Me')"
            >
              yashagozwan13@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/yasha-gozwan-shuhada-b924a699/"
              target="_blank"
              rel="noopener noreferrer"
              class="px-6 py-3.5 border border-neutral-700 hover:border-white text-white rounded-full text-xs font-semibold uppercase tracking-widest transition-all"
              @click="trackSelectContent('button', 'Footer LinkedIn')"
            >
              LinkedIn &nearr;
            </a>
          </div>
        </div>

        <div class="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>&copy; {{ new Date().getFullYear() }} Yasha Gozwan Shuhada. Crafted in monochrome.</p>

          <div class="flex items-center gap-6">
            <a
              href="https://github.com/yashagozwan"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              @click="trackSelectContent('button', 'Social GitHub')"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yasha-gozwan-shuhada-b924a699"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              @click="trackSelectContent('button', 'Social LinkedIn')"
            >
              LinkedIn
            </a>
            <a
              href="https://www.instagram.com/yashagozwan"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              @click="trackSelectContent('button', 'Social Instagram')"
            >
              Instagram
            </a>
            <a
              href="https://x.com/letyasha"
              target="_blank"
              rel="noopener noreferrer"
              class="hover:text-white transition-colors"
              @click="trackSelectContent('button', 'Social X')"
            >
              X
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
