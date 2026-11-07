<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/services/firebase'
import {
  fetchIdeasFromFirestore,
  saveIdeaToFirestore,
  deleteIdeaFromFirestore,
  seedInitialIdeas,
  formatDriveImageUrl,
} from '@/services/ideasService'
import type { IdeaDocument } from '@/types/portfolio'

const router = useRouter()

const user = ref<User | null>(null)
const ideas = ref<IdeaDocument[]>([])
const isLoading = ref(true)
const isSaving = ref(false)
const showModal = ref(false)
const notification = ref<{ message: string; type: 'success' | 'error' } | null>(null)

// Editing state
const editingId = ref<string | null>(null)
const form = ref({
  id: '',
  title: '',
  category: 'Philosophy',
  description: '',
  coverDriveUrl: '',
  docDriveUrl: '',
  tagsString: '',
  date: `${new Date().getFullYear()}`,
  actionLabel: 'Read Reflection ↗',
  featured: false,
})

function notify(message: string, type: 'success' | 'error' = 'success') {
  notification.value = { message, type }
  setTimeout(() => {
    notification.value = null
  }, 4000)
}

onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    if (!currentUser) {
      router.replace('/admin/login')
    } else {
      user.value = currentUser
      await loadIdeas()
    }
  })
})

async function loadIdeas() {
  isLoading.value = true
  try {
    ideas.value = await fetchIdeasFromFirestore()
  } catch (e: any) {
    notify('Failed to load reflections: ' + e.message, 'error')
  } finally {
    isLoading.value = false
  }
}

async function handleLogout() {
  await signOut(auth)
  router.replace('/admin/login')
}

function openAddModal() {
  editingId.value = null
  const defaultSlug = 'reflection-' + Date.now().toString(36)
  form.value = {
    id: defaultSlug,
    title: '',
    category: 'Philosophy',
    description: '',
    coverDriveUrl: '',
    docDriveUrl: '',
    tagsString: 'Philosophy, Reflection',
    date: `${new Date().getFullYear()}`,
    actionLabel: 'Read Reflection ↗',
    featured: false,
  }
  showModal.value = true
}

function editIdea(item: IdeaDocument) {
  editingId.value = item.id
  form.value = {
    id: item.id,
    title: item.title,
    category: item.category,
    description: item.description,
    coverDriveUrl: item.cover,
    docDriveUrl: item.googleDriveUrl,
    tagsString: item.tags?.join(', ') || '',
    date: item.date || `${new Date().getFullYear()}`,
    actionLabel: item.actionLabel || 'Read Reflection ↗',
    featured: Boolean(item.featured),
  }
  showModal.value = true
}

async function handleSave() {
  if (!form.value.title.trim() || !form.value.docDriveUrl.trim()) {
    notify('Title and Google Drive Document URL are required.', 'error')
    return
  }

  isSaving.value = true
  try {
    const slug = form.value.id.trim() ||
      form.value.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '')

    const tagsArray = form.value.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean)

    await saveIdeaToFirestore({
      id: slug,
      title: form.value.title.trim(),
      category: form.value.category.trim() || 'Philosophy',
      description: form.value.description.trim(),
      cover: form.value.coverDriveUrl.trim(),
      googleDriveUrl: form.value.docDriveUrl.trim(),
      tags: tagsArray,
      date: form.value.date.trim(),
      actionLabel: form.value.actionLabel.trim(),
      featured: form.value.featured,
    })

    showModal.value = false
    notify(editingId.value ? 'Reflection updated successfully.' : 'New reflection created successfully.')
    await loadIdeas()
  } catch (error: any) {
    notify('Save failed: ' + error.message, 'error')
  } finally {
    isSaving.value = false
  }
}

async function handleDelete(id: string, title: string) {
  if (!confirm(`Are you sure you want to delete "${title}"?`)) {
    return
  }

  try {
    await deleteIdeaFromFirestore(id)
    notify('Reflection deleted.')
    await loadIdeas()
  } catch (error: any) {
    notify('Delete failed: ' + error.message, 'error')
  }
}

async function handleSeed() {
  if (!confirm('This will copy default hardcoded reflections into your Firestore database. Continue?')) {
    return
  }
  isSaving.value = true
  try {
    await seedInitialIdeas()
    notify('Default reflections seeded to Firestore.')
    await loadIdeas()
  } catch (e: any) {
    notify('Seeding failed: ' + e.message, 'error')
  } finally {
    isSaving.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA] text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white flex flex-col">
    <!-- Top Bar -->
    <header class="w-full border-b border-neutral-200 bg-white sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <RouterLink
            to="/ideas"
            class="font-display font-bold text-lg text-neutral-950 tracking-tight flex items-center gap-2"
          >
            <span class="w-7 h-7 rounded-full bg-neutral-950 text-white flex items-center justify-center font-serif italic text-sm">
              Y
            </span>
            <span>Ideas CMS</span>
          </RouterLink>
          <span class="text-xs text-neutral-400 font-mono hidden sm:inline">&bull; {{ user?.email }}</span>
        </div>

        <div class="flex items-center gap-3">
          <RouterLink
            to="/ideas"
            target="_blank"
            class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-200 hover:border-neutral-950 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-700 transition-colors"
          >
            <span>View Live Site</span>
            <span>&nearr;</span>
          </RouterLink>

          <button
            type="button"
            class="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
            @click="handleLogout"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
      <!-- Notification toast -->
      <div
        v-if="notification"
        class="mb-6 p-4 rounded-2xl text-xs font-mono flex items-center justify-between border"
        :class="
          notification.type === 'success'
            ? 'bg-neutral-950 text-white border-neutral-950'
            : 'bg-red-50 text-red-900 border-red-200'
        "
      >
        <span>{{ notification.message }}</span>
        <button type="button" @click="notification = null" class="opacity-70 hover:opacity-100 text-sm ml-4">
          &times;
        </button>
      </div>

      <!-- Action Bar Header -->
      <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
        <div>
          <div class="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-2">
            <span>Management Ledger</span>
            <span>&bull;</span>
            <span>{{ ideas.length }} Records</span>
          </div>
          <h1 class="font-display text-3xl font-bold tracking-tight text-neutral-950">
            Ideas &amp; Reflections Content
          </h1>
          <p class="text-xs sm:text-sm text-neutral-500 mt-1 max-w-xl">
            Create, edit, or remove essays from your live digital bookshelf. Changes reflect instantly on the public website.
          </p>
        </div>

        <div class="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            class="px-4 py-2.5 border border-neutral-300 hover:border-neutral-950 text-neutral-700 rounded-full text-xs font-semibold uppercase tracking-wider transition-all"
            @click="handleSeed"
          >
            Sync Local Data
          </button>

          <button
            type="button"
            class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold uppercase tracking-widest transition-all shadow-sm"
            @click="openAddModal"
          >
            + New Reflection
          </button>
        </div>
      </div>

      <!-- Table / Record List -->
      <div v-if="isLoading" class="py-20 text-center text-neutral-400 font-mono text-xs">
        Loading reflections from Firestore...
      </div>

      <div v-else-if="!ideas.length" class="bg-white border border-neutral-200 rounded-2xl p-12 text-center space-y-4">
        <p class="font-serif italic text-lg text-neutral-800">No reflections in database yet.</p>
        <p class="text-xs text-neutral-500 max-w-md mx-auto">
          You can click "Sync Local Data" above to import your existing 4 essays from code into Firestore, or click "+ New Reflection" to write one from scratch.
        </p>
      </div>

      <div v-else class="bg-white border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
        <div class="divide-y divide-neutral-100">
          <div
            v-for="item in ideas"
            :key="item.id"
            class="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#FAF8F5] transition-colors"
          >
            <!-- Left Info -->
            <div class="flex items-start gap-4">
              <!-- Thumbnail preview from Google Drive / Local -->
              <div class="w-16 h-20 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                <img
                  v-if="item.cover"
                  :src="formatDriveImageUrl(item.cover)"
                  :alt="item.title"
                  class="w-full h-full object-cover grayscale"
                  @error="(e) => (e.target as HTMLElement).style.display = 'none'"
                />
              </div>

              <div class="space-y-1">
                <div class="flex items-center gap-2 text-xs font-mono text-neutral-400">
                  <span>{{ item.category }}</span>
                  <span>&bull;</span>
                  <span>{{ item.date }}</span>
                  <span
                    v-if="item.featured"
                    class="px-2 py-0.5 rounded-full bg-neutral-950 text-white text-[10px] uppercase font-sans font-semibold"
                  >
                    Featured
                  </span>
                </div>

                <h3 class="font-display font-bold text-lg text-neutral-950 leading-snug">
                  {{ item.title }}
                </h3>

                <p class="text-xs text-neutral-500 line-clamp-2 max-w-xl">
                  {{ item.description }}
                </p>

                <div class="flex flex-wrap gap-1.5 pt-2">
                  <span
                    v-for="tag in item.tags"
                    :key="tag"
                    class="text-[10px] font-mono px-2 py-0.5 border border-neutral-200 rounded text-neutral-500"
                  >
                    #{{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Right Actions -->
            <div class="flex items-center gap-2 self-end md:self-center shrink-0">
              <a
                v-if="item.googleDriveUrl"
                :href="item.googleDriveUrl"
                target="_blank"
                class="px-3 py-1.5 text-xs text-neutral-600 hover:text-neutral-950 font-mono"
              >
                Drive ↗
              </a>

              <button
                type="button"
                class="px-3.5 py-1.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors"
                @click="editIdea(item)"
              >
                Edit
              </button>

              <button
                type="button"
                class="px-3 py-1.5 text-neutral-400 hover:text-red-600 rounded-lg text-xs font-semibold transition-colors"
                @click="handleDelete(item.id, item.title)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Modal Form (Add / Edit) -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm"
      @click.self="showModal = false"
    >
      <div class="bg-white border border-neutral-200 rounded-3xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative space-y-6">
        <div class="flex items-start justify-between">
          <div>
            <div class="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-400 mb-1">
              {{ editingId ? 'Edit Record' : 'New Entry' }}
            </div>
            <h2 class="font-display text-2xl font-bold text-neutral-950">
              {{ editingId ? 'Edit Reflection' : 'Add New Reflection' }}
            </h2>
          </div>

          <button
            type="button"
            class="text-neutral-400 hover:text-neutral-950 p-2 rounded-full"
            @click="showModal = false"
          >
            &times;
          </button>
        </div>

        <form @submit.prevent="handleSave" class="space-y-4">
          <!-- Document Title -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
              Title *
            </label>
            <input
              v-model="form.title"
              type="text"
              required
              placeholder="e.g. Beyond the Title"
              class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
            />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <!-- Category -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                Category
              </label>
              <input
                v-model="form.category"
                type="text"
                placeholder="Philosophy, Reflection, etc."
                class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
              />
            </div>

            <!-- Year / Date -->
            <div>
              <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
                Year / Date
              </label>
              <input
                v-model="form.date"
                type="text"
                placeholder="2026"
                class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
              />
            </div>
          </div>

          <!-- Description -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
              Summary / Abstract *
            </label>
            <textarea
              v-model="form.description"
              rows="3"
              required
              placeholder="Short premise or central thesis of the essay..."
              class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
            ></textarea>
          </div>

          <!-- Google Drive PDF Link -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
              Google Drive PDF Sharing Link *
            </label>
            <input
              v-model="form.docDriveUrl"
              type="url"
              required
              placeholder="https://drive.google.com/file/d/FILE_ID/view?usp=sharing"
              class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm font-mono text-xs focus:outline-none focus:border-neutral-950"
            />
            <p class="text-[11px] text-neutral-400 mt-1">
              Paste the public "Anyone with the link can view" link from Google Drive.
            </p>
          </div>

          <!-- Google Drive Cover Image -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
              Cover Image (Google Drive Link or /images/path)
            </label>
            <input
              v-model="form.coverDriveUrl"
              type="text"
              placeholder="Google Drive image share link OR local image path"
              class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm font-mono text-xs focus:outline-none focus:border-neutral-950"
            />
            <p class="text-[11px] text-neutral-400 mt-1">
              Supports Google Drive public image link, File ID, or existing `/images/...` path.
            </p>
          </div>

          <!-- Tags -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
              Tags (comma separated)
            </label>
            <input
              v-model="form.tagsString"
              type="text"
              placeholder="Philosophy, Stoicism, Nietzsche, Career"
              class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-neutral-950"
            />
          </div>

          <!-- Custom Slug / ID (optional) -->
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-600 mb-1.5">
              Document ID (Slug)
            </label>
            <input
              v-model="form.id"
              type="text"
              :disabled="Boolean(editingId)"
              placeholder="beyond-the-title"
              class="w-full px-4 py-2.5 bg-[#FAFAFA] border border-neutral-200 rounded-xl text-xs font-mono focus:outline-none focus:border-neutral-950 disabled:opacity-50"
            />
          </div>

          <!-- Featured Checkbox -->
          <div class="flex items-center gap-2 pt-2">
            <input
              id="featured"
              v-model="form.featured"
              type="checkbox"
              class="w-4 h-4 rounded text-neutral-950 focus:ring-neutral-950"
            />
            <label for="featured" class="text-xs font-semibold text-neutral-800">
              Set as Featured Reflection on Homepage
            </label>
          </div>

          <div class="pt-6 border-t border-neutral-100 flex items-center justify-end gap-3">
            <button
              type="button"
              class="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-neutral-950 transition-colors"
              @click="showModal = false"
            >
              Cancel
            </button>

            <button
              type="submit"
              :disabled="isSaving"
              class="px-6 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white rounded-full text-xs font-semibold uppercase tracking-widest transition-all disabled:opacity-50"
            >
              <span v-if="!isSaving">Save Reflection &rarr;</span>
              <span v-else>Saving...</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
