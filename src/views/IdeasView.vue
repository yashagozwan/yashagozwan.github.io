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

        <div class="flex items-center gap-3 text-xs text-neutral-400 uppercase tracking-widest font-mono">
          <span>03 / Archive</span>
          <span>&middot;</span>
          <span class="text-neutral-900">{{ IDEAS_COLLECTION.length }} Essays</span>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main class="flex-grow max-w-5xl mx-auto px-6 py-16 md:py-24 w-full">
      <!-- Editorial Page Header -->
      <section class="max-w-2xl mb-14">
        <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-4">
          <span class="w-2 h-2 rounded-full bg-neutral-950"></span>
          <span>Personal Reading Archive</span>
        </div>
        <h1 class="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-neutral-950 tracking-tight leading-[1.1] mb-5">
          Ideas &amp; <span class="font-serif italic font-normal">Reflections</span>
        </h1>
        <p class="text-base sm:text-lg text-neutral-600 leading-relaxed">
          Essays, book notes, and personal inquiries explored outside of software engineering.
        </p>
      </section>

      <!-- Search & Topic Tag Filters -->
      <div class="mb-12 pb-6 border-b border-neutral-200 space-y-5">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <!-- Search Input -->
          <div class="relative max-w-md w-full">
            <svg
              class="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.75"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              v-model="searchQuery"
              type="search"
              placeholder="Search reflections or topics..."
              class="w-full pl-10 pr-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-full text-xs sm:text-sm text-neutral-900 placeholder-neutral-400 focus:outline-none focus:border-neutral-950 transition-colors"
            />
          </div>

          <div class="text-xs text-neutral-400 font-mono">
            Showing <strong class="text-neutral-950">{{ filteredIdeas.length }}</strong> of {{ IDEAS_COLLECTION.length }}
          </div>
        </div>

        <!-- Topic Tag Pills -->
        <div id="category-filters" class="flex flex-wrap items-center gap-1.5">
          <button
            v-for="tag in allTags"
            :key="tag"
            type="button"
            class="px-3.5 py-1.5 rounded-full text-xs font-medium transition-all"
            :class="
              tag === activeTag
                ? 'bg-neutral-950 text-white'
                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-neutral-950'
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
          class="py-16 text-center text-neutral-500 border border-neutral-200 rounded-2xl p-8"
        >
          <p class="font-serif italic text-lg text-neutral-800 mb-2">No matching reflections found.</p>
          <p class="text-sm text-neutral-500 mb-5">Try clearing your search query or selecting another topic tag.</p>
          <button
            type="button"
            class="px-5 py-2.5 bg-neutral-950 text-white rounded-full text-xs font-semibold uppercase tracking-widest"
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
          class="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
        >
          <article
            v-for="doc in filteredIdeas"
            :key="doc.id"
            class="group bg-white rounded-2xl border border-neutral-200 hover:border-neutral-950 overflow-hidden transition-all duration-300 flex flex-col"
          >
            <!-- Cover Image -->
            <div
              class="relative aspect-[16/10] overflow-hidden bg-neutral-100 cursor-pointer border-b border-neutral-100"
              @click="openPreview(doc)"
            >
              <img
                :src="doc.cover"
                :alt="`${doc.title} - Cover Artwork`"
                loading="lazy"
                class="w-full h-full object-cover grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-[1.02]"
              />
              <div class="absolute top-4 left-4 flex items-center gap-2">
                <span
                  class="px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full text-[10px] font-bold tracking-widest uppercase text-neutral-950 border border-neutral-200"
                >
                  {{ doc.category || 'Reflection' }}
                </span>
                <span
                  v-if="doc.featured"
                  class="px-2.5 py-1 bg-neutral-950 rounded-full text-[10px] font-semibold tracking-widest uppercase text-white"
                >
                  Featured
                </span>
              </div>
            </div>

            <!-- Document Content -->
            <div class="p-7 flex flex-col flex-grow justify-between space-y-6">
              <div class="space-y-3">
                <div class="flex items-center justify-between gap-2 text-xs font-mono text-neutral-400">
                  <span>{{ doc.date || 'Reflection' }}</span>
                  <span>PDF Essay</span>
                </div>

                <h2 class="font-serif italic text-2xl sm:text-3xl text-neutral-950 font-normal leading-snug">
                  {{ doc.title }}
                </h2>

                <p class="text-neutral-600 text-sm leading-relaxed">
                  {{ doc.description }}
                </p>
              </div>

              <!-- Tags & Actions -->
              <div class="pt-5 border-t border-neutral-100 space-y-5">
                <div v-if="doc.tags?.length" class="flex flex-wrap gap-1.5">
                  <button
                    v-for="tag in doc.tags"
                    :key="tag"
                    type="button"
                    class="px-2.5 py-0.5 rounded-full text-[11px] font-medium border transition-colors"
                    :class="
                      activeTag === tag
                        ? 'bg-neutral-950 text-white border-neutral-950'
                        : 'bg-white text-neutral-500 border-neutral-200 hover:border-neutral-950 hover:text-neutral-950'
                    "
                    @click="activeTag = activeTag === tag ? 'All' : tag"
                  >
                    {{ tag }}
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 px-4 py-3 bg-white border border-neutral-200 hover:border-neutral-950 text-neutral-950 text-xs font-semibold uppercase tracking-widest rounded-full transition-all"
                    @click="openPreview(doc)"
                  >
                    <span>Preview</span>
                  </button>

                  <a
                    :href="doc.googleDriveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-flex items-center justify-center gap-2 px-4 py-3 bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-semibold uppercase tracking-widest rounded-full transition-all"
                    @click="trackSelectContent('document', doc.id)"
                  >
                    <span>Read &nearr;</span>
                  </a>
                </div>
              </div>
            </div>
          </article>
        </TransitionGroup>
      </section>
    </main>

    <!-- Minimalist Monochrome Footer -->
    <footer class="border-t border-neutral-200 bg-white py-12 px-6">
      <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
        <p>&copy; {{ new Date().getFullYear() }} Yasha Gozwan Shuhada.</p>
        <div class="flex items-center gap-6 font-medium text-neutral-500">
          <RouterLink to="/" class="hover:text-neutral-950 transition-colors">Portfolio</RouterLink>
          <RouterLink to="/bio" class="hover:text-neutral-950 transition-colors">Bio</RouterLink>
          <RouterLink to="/hobbies" class="hover:text-neutral-950 transition-colors">Hobbies</RouterLink>
        </div>
      </div>
    </footer>

    <!-- In-App PDF Reader Modal -->
    <PdfReaderModal :document="previewDoc" @close="previewDoc = null" />
  </div>
</template>
