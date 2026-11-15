<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { signOut, onAuthStateChanged, type User } from 'firebase/auth'
import { auth } from '@/services/firebase'
import { isPasswordAuthenticatedAdmin } from '@/services/adminAuthService'
import {
  fetchAllLearnerFeedbacksFromFirestore,
  deleteLearnerFeedbackFromFirestore,
  getLocalFeedbacks,
  type LearnerFeedback,
} from '@/services/nihongoFeedbackService'
import {
  fetchJyashHomeVisibility,
  updateJyashHomeVisibility,
} from '@/services/siteSettingsService'
import {
  ChatBubbleBottomCenterTextIcon,
  ArrowPathIcon,
  TrashIcon,
  CheckCircleIcon,
  ArrowDownTrayIcon,
  ClipboardDocumentCheckIcon,
  MagnifyingGlassIcon,
  EyeSlashIcon,
  GlobeAltIcon,
} from '@heroicons/vue/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'

const router = useRouter()

const user = ref<User | null>(null)
const feedbacks = ref<LearnerFeedback[]>([])
const isLoading = ref(true)
const isDeletingId = ref<string | null>(null)
const lastFetchedAt = ref<string>('')
const hasPermissionError = ref(false)
const notification = ref<{ message: string; type: 'success' | 'error' } | null>(null)

const isHomeShowcaseEnabled = ref(true)
const isUpdatingShowcase = ref(false)

// Filters & Search
const searchQuery = ref('')
const selectedCategory = ref<string>('All')
const selectedTopic = ref<string>('All')
const selectedRating = ref<string>('All')

function notify(message: string, type: 'success' | 'error' = 'success') {
  notification.value = { message, type }
  setTimeout(() => {
    notification.value = null
  }, 4000)
}

onMounted(() => {
  onAuthStateChanged(auth, async (currentUser) => {
    // Strictly require Email & Password authentication for admin access
    if (!currentUser || !isPasswordAuthenticatedAdmin(currentUser)) {
      router.replace('/admin/login')
    } else {
      user.value = currentUser
      await loadSettings()
      await loadFeedbacks()
    }
  })
})

async function loadSettings() {
  try {
    isHomeShowcaseEnabled.value = await fetchJyashHomeVisibility()
  } catch (err) {
    console.warn('Could not load site setting:', err)
  }
}

async function handleToggleShowcase() {
  isUpdatingShowcase.value = true
  const nextVal = !isHomeShowcaseEnabled.value
  try {
    await updateJyashHomeVisibility(nextVal)
    isHomeShowcaseEnabled.value = nextVal
    notify(
      nextVal
        ? 'Section JYash sekarang AKTIF dan DITAMPILKAN di halaman utama (HomeView).'
        : 'Section JYash sekarang NONAKTIF dan DISEMBUNYIKAN dari halaman utama (HomeView).',
      'success'
    )
  } catch (err: any) {
    notify('Gagal memperbarui pengaturan homepage: ' + (err?.message || 'Error'), 'error')
  } finally {
    isUpdatingShowcase.value = false
  }
}

async function loadFeedbacks() {
  isLoading.value = true
  hasPermissionError.value = false
  try {
    feedbacks.value = await fetchAllLearnerFeedbacksFromFirestore()
    lastFetchedAt.value = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
    notify(`Berhasil mengambil ${feedbacks.value.length} masukan pembelajar dari Cloud Firestore.`)
  } catch (e: any) {
    const errorMsg = e?.message || ''
    if (errorMsg.includes('permission') || errorMsg.includes('insufficient') || e?.code === 'permission-denied') {
      hasPermissionError.value = true
      // Graceful fallback to locally saved feedbacks from this device
      const local = getLocalFeedbacks()
      feedbacks.value = local
      notify(
        'Aturan Firestore Rules di Firebase Console belum mengizinkan koleksi jyash_feedbacks. Menampilkan data lokal browser.',
        'error'
      )
    } else {
      notify('Gagal mengambil feedback: ' + (e?.message || 'Koneksi error'), 'error')
    }
  } finally {
    isLoading.value = false
  }
}

const FIRESTORE_RULES_SNIPPET = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 1. Nihongo Learners Progress
    match /nihongo_learners/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // 2. JYash Learner Feedbacks
    match /jyash_feedbacks/{feedbackId} {
      allow create, read: if true;
      allow update, delete: if request.auth != null;
    }

    // 3. Ideas & Reflections
    match /ideas_reflections/{document=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // 4. Site Settings (Homepage Visibility Toggle)
    match /site_settings/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`

function copyRulesSnippet() {
  copyToClipboard(FIRESTORE_RULES_SNIPPET)
  notify('Kode Firestore Rules telah disalin! Buka Firebase Console > Firestore > Rules dan klik Publish.')
}

async function handleLogout() {
  await signOut(auth)
  router.replace('/admin/login')
}

async function handleDeleteFeedback(fb: LearnerFeedback) {
  if (!fb.id) return
  const confirmDelete = window.confirm(
    `Apakah Anda yakin ingin menghapus masukan dari "${fb.userName || 'Anonim'}"? Tindakan ini tidak dapat dibatalkan.`
  )
  if (!confirmDelete) return

  isDeletingId.value = fb.id
  try {
    await deleteLearnerFeedbackFromFirestore(fb.id)
    feedbacks.value = feedbacks.value.filter((item) => item.id !== fb.id)
    notify('Feedback berhasil dihapus dari Cloud Firestore.')
  } catch (err: any) {
    notify('Gagal menghapus feedback: ' + (err?.message || 'Error'), 'error')
  } finally {
    isDeletingId.value = null
  }
}

function copyToClipboard(text: string) {
  if (!navigator?.clipboard) return
  navigator.clipboard.writeText(text)
  notify('Isi pesan disalin ke clipboard.')
}

// Export feedbacks to CSV
function exportToCsv() {
  if (!feedbacks.value.length) {
    notify('Tidak ada data feedback untuk diekspor.', 'error')
    return
  }

  const headers = ['ID', 'Tanggal', 'Nama', 'Email', 'Rating', 'Kategori', 'Topik', 'Pesan']
  const rows = feedbacks.value.map((f) => [
    `"${f.id || ''}"`,
    `"${f.createdAt || ''}"`,
    `"${(f.userName || '').replace(/"/g, '""')}"`,
    `"${f.userEmail || ''}"`,
    f.rating || 5,
    `"${f.category || ''}"`,
    `"${f.topicArea || ''}"`,
    `"${(f.message || '').replace(/"/g, '""')}"`,
  ])

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', `jyash_feedbacks_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  notify('File CSV berhasil diunduh.')
}

// Computed Metrics
const totalCount = computed(() => feedbacks.value.length)

const averageRating = computed(() => {
  if (!feedbacks.value.length) return '0.0'
  const total = feedbacks.value.reduce((acc, f) => acc + (f.rating || 5), 0)
  return (total / feedbacks.value.length).toFixed(1)
})

const googleAuthCount = computed(() => {
  return feedbacks.value.filter((f) => f.userId && f.userId !== 'guest').length
})

const filteredFeedbacks = computed(() => {
  return feedbacks.value.filter((fb) => {
    // Search query
    if (searchQuery.value.trim()) {
      const q = searchQuery.value.toLowerCase()
      const matchName = fb.userName?.toLowerCase().includes(q)
      const matchEmail = fb.userEmail?.toLowerCase().includes(q)
      const matchMsg = fb.message?.toLowerCase().includes(q)
      if (!matchName && !matchEmail && !matchMsg) return false
    }

    // Category
    if (selectedCategory.value !== 'All' && fb.category !== selectedCategory.value) {
      return false
    }

    // Topic
    if (selectedTopic.value !== 'All' && fb.topicArea !== selectedTopic.value) {
      return false
    }

    // Rating
    if (selectedRating.value !== 'All') {
      const r = fb.rating || 5
      if (selectedRating.value === '5' && r !== 5) return false
      if (selectedRating.value === '4' && r !== 4) return false
      if (selectedRating.value === 'low' && r > 3) return false
    }

    return true
  })
})

function formatDateTime(isoStr?: string) {
  if (!isoStr) return '-'
  try {
    const d = new Date(isoStr)
    return d.toLocaleString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return isoStr
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#FAFAFA] text-neutral-950 font-sans antialiased selection:bg-neutral-950 selection:text-white flex flex-col">
    <!-- Top Bar -->
    <header class="w-full border-b border-neutral-200 bg-white sticky top-0 z-40">
      <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <div class="flex items-center gap-5">
          <RouterLink
            to="/admin/feedback"
            class="font-display font-bold text-lg text-neutral-950 tracking-tight flex items-center gap-2.5"
          >
            <span class="w-8 h-8 rounded-xl bg-neutral-950 text-white flex items-center justify-center font-bold text-sm">
              日
            </span>
            <span class="leading-none">
              <span>JYash</span>
              <span class="text-neutral-400 font-mono text-xs block mt-0.5">Admin Feedback Hub</span>
            </span>
          </RouterLink>

          <!-- Navigation Tab Switcher -->
          <nav class="hidden sm:flex items-center gap-1 bg-neutral-100 p-1 rounded-full text-xs font-mono font-bold">
            <RouterLink
              to="/admin/ideas"
              class="px-3.5 py-1.5 rounded-full transition-all text-neutral-600 hover:text-neutral-950"
            >
              Ideas CMS
            </RouterLink>
            <RouterLink
              to="/admin/feedback"
              class="px-3.5 py-1.5 rounded-full transition-all bg-neutral-950 text-white shadow-2xs flex items-center gap-1.5"
            >
              <span>Learner Feedbacks</span>
              <span v-if="totalCount" class="text-[9px] px-1.5 py-0.2 rounded-full bg-white text-neutral-950">
                {{ totalCount }}
              </span>
            </RouterLink>
          </nav>
        </div>

        <div class="flex items-center gap-3">
          <RouterLink
            to="/nihongo"
            target="_blank"
            class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 border border-neutral-200 hover:border-neutral-950 rounded-full text-xs font-semibold uppercase tracking-wider text-neutral-700 transition-colors"
          >
            <span>Live JYash</span>
            <span>&nearr;</span>
          </RouterLink>

          <button
            type="button"
            class="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-full text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
            @click="handleLogout"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 max-w-6xl mx-auto px-6 py-10 w-full">
      <!-- Notification toast -->
      <div
        v-if="notification"
        class="mb-6 p-4 rounded-2xl text-xs font-mono flex items-center justify-between border shadow-sm animate-fadeIn"
        :class="
          notification.type === 'success'
            ? 'bg-neutral-950 text-white border-neutral-950'
            : 'bg-rose-50 text-rose-900 border-rose-200'
        "
      >
        <span>{{ notification.message }}</span>
        <button type="button" @click="notification = null" class="opacity-70 hover:opacity-100 text-sm ml-4 cursor-pointer">
          &times;
        </button>
      </div>

      <!-- Permission Notice Guide Banner -->
      <div
        v-if="hasPermissionError"
        class="mb-8 p-6 rounded-3xl bg-amber-50/90 border border-amber-200 text-neutral-900 shadow-sm animate-fadeIn"
      >
        <div class="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div class="space-y-2">
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-200 text-amber-900 text-[10px] font-mono font-bold uppercase tracking-wider">
              <span>Firebase Security Rules Notice</span>
            </div>
            <h3 class="font-display font-bold text-base text-neutral-950">
              Perizinan Cloud Firestore Belum Diterapkan di Firebase Console
            </h3>
            <p class="text-xs text-neutral-700 leading-relaxed max-w-2xl">
              Error <code class="bg-amber-100 px-1 py-0.5 rounded text-amber-900">Missing or insufficient permissions</code> terjadi karena aturan keamanan untuk koleksi <code class="bg-amber-100 px-1 py-0.5 rounded text-amber-900">jyash_feedbacks</code> belum di-publish pada tab <strong>Firestore Database &gt; Rules</strong> di Firebase Console proyek Anda.
            </p>
            <div class="pt-2 flex flex-wrap items-center gap-2">
              <button
                type="button"
                class="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs"
                @click="copyRulesSnippet"
              >
                <ClipboardDocumentCheckIcon class="w-4 h-4" />
                <span>Salin Kode Aturan Rules</span>
              </button>
              <a
                href="https://console.firebase.google.com/"
                target="_blank"
                class="px-4 py-2 bg-white hover:bg-neutral-100 border border-neutral-300 text-neutral-800 rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5"
              >
                <span>Buka Firebase Console &nearr;</span>
              </a>
              <button
                type="button"
                class="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-950 rounded-xl text-xs font-mono font-bold transition cursor-pointer"
                @click="loadFeedbacks"
              >
                Coba Ambil Lagi
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Bar Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200 mb-8">
        <div>
          <div class="flex items-center gap-2 text-xs font-mono text-neutral-500 uppercase tracking-widest mb-1.5">
            <span>Feedback Management</span>
            <span v-if="lastFetchedAt" class="text-neutral-400">&bull; Update: {{ lastFetchedAt }} WIB</span>
          </div>
          <h1 class="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
            Masukan Pembelajar JYash
          </h1>
          <p class="text-neutral-600 text-xs sm:text-sm mt-1 max-w-xl">
            Tinjau seluruh masukan, saran fitur, bug report, dan evaluasi kurikulum Minna no Nihongo langsung dari Cloud Firestore.
          </p>
        </div>

        <div class="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            class="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
            @click="exportToCsv"
          >
            <ArrowDownTrayIcon class="w-4 h-4 text-neutral-600" />
            <span>Export CSV</span>
          </button>

          <button
            type="button"
            :disabled="isLoading"
            class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white rounded-xl text-xs font-semibold uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
            @click="loadFeedbacks"
          >
            <ArrowPathIcon class="w-4 h-4" :class="{ 'animate-spin': isLoading }" />
            <span>{{ isLoading ? 'Mengambil Data...' : 'Ambil Feedback' }}</span>
          </button>
        </div>
      </div>

      <!-- Homepage Showcase Visibility Control Card -->
      <div class="p-6 rounded-3xl bg-white border border-neutral-200 shadow-2xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div class="flex items-start gap-4">
          <div
            class="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
            :class="isHomeShowcaseEnabled ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-neutral-100 text-neutral-500 border-neutral-200'"
          >
            <GlobeAltIcon v-if="isHomeShowcaseEnabled" class="w-6 h-6" />
            <EyeSlashIcon v-else class="w-6 h-6" />
          </div>

          <div class="space-y-1">
            <div class="flex items-center gap-2 flex-wrap">
              <h3 class="font-display font-bold text-base text-neutral-950">
                Kontrol Tampilan Section JYash di Homepage
              </h3>
              <span
                class="text-[10px] font-mono px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1.5 border"
                :class="
                  isHomeShowcaseEnabled
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    : 'bg-neutral-100 text-neutral-600 border-neutral-200'
                "
              >
                <span
                  class="w-1.5 h-1.5 rounded-full"
                  :class="isHomeShowcaseEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-neutral-400'"
                ></span>
                <span>{{ isHomeShowcaseEnabled ? 'AKTIF (Ditampilkan)' : 'NONAKTIF (Disembunyikan)' }}</span>
              </span>
            </div>
            <p class="text-xs text-neutral-600 max-w-2xl leading-relaxed">
              Sakelar ini mengontrol apakah Section 05 (Showcase JYash Belajar Jepang) muncul di halaman utama portofolio (<code class="bg-neutral-100 px-1 py-0.5 rounded">HomeView</code>).
              Halaman <code class="bg-neutral-100 px-1 py-0.5 rounded">/nihongo</code> tetap dapat diakses via link langsung.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 shrink-0 self-end md:self-center">
          <button
            type="button"
            :disabled="isUpdatingShowcase"
            class="relative inline-flex h-8 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:opacity-50"
            :class="isHomeShowcaseEnabled ? 'bg-neutral-950' : 'bg-neutral-300'"
            role="switch"
            :aria-checked="isHomeShowcaseEnabled"
            @click="handleToggleShowcase"
          >
            <span class="sr-only">Toggle JYash Home Showcase</span>
            <span
              aria-hidden="true"
              class="pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
              :class="isHomeShowcaseEnabled ? 'translate-x-6' : 'translate-x-0'"
            />
          </button>
          <span class="text-xs font-mono font-bold text-neutral-800 min-w-[70px]">
            {{ isUpdatingShowcase ? 'Menyimpan...' : (isHomeShowcaseEnabled ? 'Aktif' : 'Nonaktif') }}
          </span>
        </div>
      </div>

      <!-- High-Level Metric Summary Cards -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div class="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <div class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
            Total Masukan
          </div>
          <div class="font-display text-3xl font-bold text-neutral-950">
            {{ totalCount }}
          </div>
          <div class="text-[11px] text-neutral-500 mt-1 font-mono">
            Tersimpan di Cloud Firestore
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <div class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
            Rata-rata Rating
          </div>
          <div class="font-display text-3xl font-bold text-neutral-950 flex items-center gap-1.5">
            <span>{{ averageRating }}</span>
            <StarSolidIcon class="w-6 h-6 text-amber-500" />
          </div>
          <div class="text-[11px] text-neutral-500 mt-1 font-mono">
            Skala 1.0 s/d 5.0
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <div class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
            Google Account
          </div>
          <div class="font-display text-3xl font-bold text-neutral-950">
            {{ googleAuthCount }}
          </div>
          <div class="text-[11px] text-emerald-600 mt-1 font-mono flex items-center gap-1 font-semibold">
            <CheckCircleIcon class="w-3.5 h-3.5 text-emerald-600" />
            <span>Pengguna Login</span>
          </div>
        </div>

        <div class="p-5 rounded-2xl bg-white border border-neutral-200 shadow-2xs">
          <div class="text-[11px] font-mono uppercase tracking-wider text-neutral-400 font-bold mb-1">
            Filter Aktif
          </div>
          <div class="font-display text-3xl font-bold text-neutral-950">
            {{ filteredFeedbacks.length }}
          </div>
          <div class="text-[11px] text-neutral-500 mt-1 font-mono">
            Menampilkan dari pencarian
          </div>
        </div>
      </div>

      <!-- Filters & Search Toolbar -->
      <div class="p-4 rounded-2xl bg-white border border-neutral-200 shadow-2xs mb-6 space-y-3">
        <div class="flex flex-col sm:flex-row items-center gap-3">
          <!-- Search Input -->
          <div class="relative flex-1 w-full">
            <MagnifyingGlassIcon class="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari berdasarkan nama, email, atau isi masukan..."
              class="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 bg-[#FAFAFA] focus:outline-none focus:border-neutral-950 font-sans"
            />
          </div>

          <!-- Rating Filter -->
          <select
            v-model="selectedRating"
            class="px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-[#FAFAFA] text-neutral-800 focus:outline-none focus:border-neutral-950 font-mono w-full sm:w-auto"
          >
            <option value="All">Semua Rating</option>
            <option value="5">5 Bintang (Puas)</option>
            <option value="4">4 Bintang</option>
            <option value="low">3 Bintang ke Bawah</option>
          </select>

          <!-- Category Filter -->
          <select
            v-model="selectedCategory"
            class="px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-[#FAFAFA] text-neutral-800 focus:outline-none focus:border-neutral-950 font-mono w-full sm:w-auto"
          >
            <option value="All">Semua Kategori</option>
            <option value="Saran Fitur Baru">Saran Fitur Baru</option>
            <option value="Laporan Masalah / Bug">Laporan Masalah / Bug</option>
            <option value="Kritik Materi & Tata Bahasa">Kritik Materi & Tata Bahasa</option>
            <option value="Kesan Pengalaman Belajar">Kesan Pengalaman Belajar</option>
            <option value="Lainnya">Lainnya</option>
          </select>

          <!-- Topic Filter -->
          <select
            v-model="selectedTopic"
            class="px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-[#FAFAFA] text-neutral-800 focus:outline-none focus:border-neutral-950 font-mono w-full sm:w-auto"
          >
            <option value="All">Semua Bagian Materi</option>
            <option value="Umum">Umum</option>
            <option value="Huruf Kana (Hiragana/Katakana)">Huruf Kana</option>
            <option value="Angka N5">Angka N5</option>
            <option value="Panduan Kanji">Panduan Kanji</option>
            <option value="Bab 1 s/d Bab 5">Bab 1 s/d 5</option>
            <option value="Simulator Generator">Simulator Generator</option>
            <option value="Kuis & Latihan">Kuis & Latihan</option>
          </select>
        </div>
      </div>

      <!-- Feedbacks Feed / List -->
      <div v-if="isLoading && !feedbacks.length" class="text-center py-20 font-mono text-xs text-neutral-400">
        <ArrowPathIcon class="w-8 h-8 mx-auto mb-3 animate-spin text-neutral-900" />
        <span>Menghubungi Cloud Firestore & mengambil masukan...</span>
      </div>

      <div
        v-else-if="!filteredFeedbacks.length"
        class="text-center py-20 rounded-3xl border border-dashed border-neutral-300 bg-white p-10"
      >
        <ChatBubbleBottomCenterTextIcon class="w-12 h-12 text-neutral-300 mx-auto mb-3" />
        <h3 class="font-display text-lg font-bold text-neutral-950 mb-1">
          Tidak ada masukan yang cocok
        </h3>
        <p class="text-xs text-neutral-500 max-w-sm mx-auto mb-4">
          Belum ada masukan pembelajar dengan filter saat ini, atau klik tombol di bawah untuk mengambil data dari server.
        </p>
        <button
          type="button"
          class="px-4 py-2 bg-neutral-950 text-white rounded-xl text-xs font-semibold cursor-pointer"
          @click="loadFeedbacks"
        >
          Ambil Feedback Sekarang
        </button>
      </div>

      <div v-else class="space-y-4">
        <div
          v-for="fb in filteredFeedbacks"
          :key="fb.id"
          class="p-5 rounded-2xl bg-white border border-neutral-200 hover:border-neutral-400 transition-all shadow-2xs group"
        >
          <!-- Top Row: User & Meta -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-100">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-neutral-900 text-white font-bold flex items-center justify-center text-xs shrink-0 font-mono uppercase">
                {{ fb.userName ? fb.userName.charAt(0) : 'L' }}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <h4 class="font-display font-bold text-sm text-neutral-950 leading-tight">
                    {{ fb.userName || 'Anonim' }}
                  </h4>
                  <span
                    v-if="fb.userId && fb.userId !== 'guest'"
                    class="text-[10px] font-mono px-2 py-0.2 rounded-full bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200 inline-flex items-center gap-1"
                  >
                    <CheckCircleIcon class="w-3 h-3 text-emerald-600" />
                    <span>Google Auth</span>
                  </span>
                </div>
                <div class="text-[11px] font-mono text-neutral-400">
                  <span v-if="fb.userEmail">{{ fb.userEmail }} &bull; </span>
                  <span>{{ formatDateTime(fb.createdAt) }}</span>
                </div>
              </div>
            </div>

            <!-- Star Rating Display -->
            <div class="flex items-center gap-1 self-start sm:self-center">
              <StarSolidIcon
                v-for="i in 5"
                :key="i"
                class="w-4 h-4"
                :class="i <= (fb.rating || 5) ? 'text-amber-400' : 'text-neutral-200'"
              />
              <span class="text-xs font-mono font-bold text-neutral-800 ml-1.5">
                {{ fb.rating || 5 }}/5
              </span>
            </div>
          </div>

          <!-- Middle Badges -->
          <div class="flex flex-wrap items-center gap-2 py-3">
            <span
              class="text-[10px] font-mono px-2.5 py-0.8 rounded-lg font-bold border"
              :class="{
                'bg-rose-50 text-rose-800 border-rose-200': fb.category === 'Laporan Masalah / Bug',
                'bg-emerald-50 text-emerald-800 border-emerald-200': fb.category === 'Saran Fitur Baru',
                'bg-amber-50 text-amber-800 border-amber-200': fb.category === 'Kritik Materi & Tata Bahasa',
                'bg-neutral-100 text-neutral-800 border-neutral-200': fb.category === 'Kesan Pengalaman Belajar' || fb.category === 'Lainnya',
              }"
            >
              {{ fb.category }}
            </span>

            <span class="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-neutral-100 text-neutral-600 border border-neutral-200">
              Bagian: {{ fb.topicArea }}
            </span>
          </div>

          <!-- Message Body -->
          <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed whitespace-pre-wrap bg-neutral-50/70 p-3.5 rounded-xl border border-neutral-100 font-sans">
            {{ fb.message }}
          </p>

          <!-- Bottom Actions -->
          <div class="flex items-center justify-between pt-3 mt-1 text-xs">
            <span class="text-[10px] font-mono text-neutral-400">
              ID: {{ fb.id }}
            </span>

            <div class="flex items-center gap-2">
              <button
                type="button"
                class="px-2.5 py-1 text-[11px] font-mono text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                title="Salin Pesan"
                @click="copyToClipboard(fb.message)"
              >
                <ClipboardDocumentCheckIcon class="w-3.5 h-3.5" />
                <span>Salin</span>
              </button>

              <button
                type="button"
                :disabled="isDeletingId === fb.id"
                class="px-2.5 py-1 text-[11px] font-mono text-rose-600 hover:bg-rose-50 rounded-lg transition-colors flex items-center gap-1 disabled:opacity-50 cursor-pointer"
                title="Hapus Feedback dari Firestore"
                @click="handleDeleteFeedback(fb)"
              >
                <TrashIcon class="w-3.5 h-3.5" />
                <span>{{ isDeletingId === fb.id ? 'Menghapus...' : 'Hapus' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>
