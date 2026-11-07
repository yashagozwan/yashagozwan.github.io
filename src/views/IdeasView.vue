<script setup lang="ts">
import { computed, ref } from 'vue'
import { IDEAS_COLLECTION } from '@/data/ideas'
import type { IdeaDocument } from '@/types/portfolio'
import PdfReaderModal from '@/components/PdfReaderModal.vue'
import { trackSelectContent } from '@/utils/analytics'

const activeTag = ref<string>('All')
const searchQuery = ref<string>('')
const previewDoc = ref<IdeaDocument | null>(null)

const allTags = computed(() => {
  const tagSet = new Set<string>()
  for (const doc of IDEAS_COLLECTION) {
    for (const tag of doc.tags || []) {
      tagSet.add(tag)
    }
  }
  return ['All', ...Array.from(tagSet)]
})

const filteredIdeas = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  return IDEAS_COLLECTION.filter((item) => {
    const matchesTag = activeTag.value === 'All' || item.tags?.includes(activeTag.value)
    if (!matchesTag) return false
    if (!q) return true

    const inTitle = item.title.toLowerCase().includes(q)
    const inDesc = item.description.toLowerCase().includes(q)
    const inTags = item.tags?.some((t) => t.toLowerCase().includes(q))
    return inTitle || inDesc || inTags
  })
})

function openPreview(doc: IdeaDocument) {
  previewDoc.value = doc
  trackSelectContent('document_preview', doc.id)
}
</script>

<template>
  <div
    class="bg-[#FAF8F5] text-stone-800 font-sans antialiased selection:bg-brand-500 selection:text-white overflow-x-hidden min-h-screen flex flex-col"
  >
    <!-- Navigation Bar -->
    <header class="w-full border-b border-stone-200/60 bg-white/70 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <RouterLink
          to="/"
          class="group inline-flex items-center gap-2.5 text-xs font-semibold text-stone-500 hover:text-stone-900 transition-colors uppercase tracking-widest"
        >
          <svg
            class="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
          Back to Portfolio
        </RouterLink>

        <div class="flex items-center gap-4 text-xs text-stone-400 uppercase tracking-widest font-semibold">
          <span>Digital Bookshelf</span>
          <span class="w-1 h-1 rounded-full bg-stone-300"></span>
          <span class="text-stone-700">Archive ({{ IDEAS_COLLECTION.length }})</span>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow max-w-6xl mx-auto px-6 py-16 md:py-24 w-full">
      <!-- Editorial Page Header -->
      <section class="max-w-2xl mb-12 md:mb-16">
        <div
          class="inline-flex items-center gap-2 mb-4 text-xs font-semibold tracking-[0.25em] text-slate-500 uppercase"
        >
          <span class="w-6 h-px bg-slate-300"></span>
          <span>Personal Archive</span>
        </div>
        <h1
          class="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-[1.15] mb-5"
        >
          Ideas &amp; Reflections
        </h1>
        <p class="font-sans text-lg sm:text-xl text-stone-600 leading-relaxed font-normal">
          Things I'm curious about outside of code.
        </p>

        <!-- Non-Tech Curiosity Notice -->
        <div
          class="mt-6 inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-stone-100/90 border border-stone-200 text-stone-600 text-xs font-medium"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-stone-400"></span>
          <span>Personal reflections &amp; philosophy &mdash; not about coding or programming ideas.</span>
        </div>
      </section>

      <!-- Search & Topic Tag Filters -->
      <div class="mb-10 pb-6 border-b border-stone-200/70 space-y-4">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <!-- Search Input -->
          <div class="relative max-w-md w-full">
            <svg
              class="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search reflections, philosophers, or topics..."
              class="w-full pl-10 pr-4 py-2.5 bg-white border border-stone-200/90 rounded-2xl text-xs sm:text-sm text-stone-800 placeholder-stone-400 focus:outline-none focus:border-stone-400 transition-colors"
            />
          </div>

          <div class="text-xs text-stone-500 font-medium">
            Showing <strong>{{ filteredIdeas.length }}</strong> of {{ IDEAS_COLLECTION.length }} documents
          </div>
        </div>

        <!-- Topic Tag Pills -->
        <div id="category-filters" class="flex flex-wrap items-center gap-2">
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            class="filter-btn px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all"
            :class="
              tag === activeTag
                ? 'bg-stone-900 text-white shadow-sm'
                : 'bg-white text-stone-600 hover:bg-stone-100 border border-stone-200/80'
            "
            @click="activeTag = tag"
          >
            {{ tag === 'All' ? 'All Topics' : tag }}
          </button>
        </div>
      </div>

      <!-- Document Grid -->
      <section aria-label="Documents and Reflections">
        <div
          v-if="!filteredIdeas.length"
          class="col-span-full py-16 text-center text-stone-500 bg-white rounded-3xl border border-stone-200/60 p-8"
        >
          <p class="font-serif italic text-lg text-stone-700 mb-2">No matching reflections found.</p>
          <p class="text-sm text-stone-500 mb-4">Try clearing your search query or selecting another topic tag.</p>
          <button
            type="button"
            class="px-4 py-2 bg-stone-900 text-white rounded-full text-xs font-semibold"
            @click="
              () => {
                activeTag = 'All'
                searchQuery = ''
              }
            "
          >
            Reset Filters
          </button>
        </div>

        <TransitionGroup
          v-else
          id="ideas-grid"
          name="skill-list"
          tag="div"
          class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch"
        >
          <article
            v-for="doc in filteredIdeas"
            :key="doc.id"
            class="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-500 flex flex-col"
          >
            <!-- Cover Image -->
            <div
              class="relative aspect-[16/10] overflow-hidden bg-stone-100 cursor-pointer"
              @click="openPreview(doc)"
            >
              <img
                :src="doc.cover"
                :alt="`${doc.title} - Cover Artwork`"
                loading="lazy"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div class="absolute top-4 left-4 flex items-center gap-2">
                <span
                  class="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-semibold tracking-wider uppercase text-stone-800 shadow-sm border border-stone-200/50"
                >
                  {{ doc.category || 'Reflection' }}
                </span>
                <span
                  v-if="doc.featured"
                  class="px-2.5 py-1 bg-stone-900/85 backdrop-blur-md rounded-full text-[10px] font-semibold tracking-wider uppercase text-white"
                >
                  Featured
                </span>
              </div>
            </div>

            <!-- Document Content -->
            <div class="p-7 sm:p-8 flex flex-col flex-grow justify-between space-y-6">
              <div class="space-y-3">
                <div class="flex items-center justify-between gap-2 text-xs text-stone-400">
                  <span>{{ doc.date || 'Reflection' }}</span>
                  <span>PDF Document</span>
                </div>

                <h2 class="font-serif italic text-2xl sm:text-3xl text-stone-900 font-medium leading-snug">
                  {{ doc.title }}
                </h2>

                <p class="font-sans text-stone-600 text-sm sm:text-base leading-relaxed font-normal">
                  {{ doc.description }}
                </p>
              </div>

              <!-- Tags & Actions -->
              <div class="pt-4 border-t border-stone-100 space-y-5">
                <div v-if="doc.tags?.length" class="flex flex-wrap gap-2">
                  <button
                    v-for="tag in doc.tags"
                    :key="tag"
                    type="button"
                    class="px-2.5 py-1 rounded-full text-[11px] font-medium tracking-wide transition-colors"
                    :class="
                      activeTag === tag
                        ? 'bg-stone-900 text-white'
                        : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                    "
                    @click="activeTag = activeTag === tag ? 'All' : tag"
                  >
                    {{ tag }}
                  </button>
                </div>

                <div class="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-stone-100 hover:bg-stone-200/80 text-stone-900 text-xs font-semibold rounded-2xl transition-all"
                    @click="openPreview(doc)"
                  >
                    <svg class="w-4 h-4 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <span>Quick Preview</span>
                  </button>

                  <a
                    :href="doc.googleDriveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 px-4 py-3.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-2xl transition-all shadow-sm hover:shadow"
                    @click="trackSelectContent('document', doc.id)"
                  >
                    <span>{{ doc.actionLabel || 'Read Reflection ↗' }}</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </section>
    </main>

    <!-- Editorial Footer -->
    <footer class="border-t border-stone-200/60 bg-white py-12">
      <div
        class="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500"
      >
        <p>© 2026 Yasha Gozwan Shuhada. All rights reserved.</p>
        <div class="flex items-center gap-6">
          <RouterLink to="/" class="hover:text-stone-900 transition-colors">Portfolio</RouterLink>
          <RouterLink to="/bio" class="hover:text-stone-900 transition-colors">Bio</RouterLink>
          <RouterLink to="/hobbies" class="hover:text-stone-900 transition-colors">Hobbies</RouterLink>
          <a
            href="https://github.com/yashagozwan"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-stone-900 transition-colors"
            >GitHub</a
          >
        </div>
      </div>
    </footer>

    <!-- In-App PDF Reader Modal -->
    <PdfReaderModal :document="previewDoc" @close="previewDoc = null" />
  </div>
</template>
