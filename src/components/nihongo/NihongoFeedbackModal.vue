<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { auth } from '@/services/firebase'
import { trackEvent } from '@/utils/analytics'
import {
  ChatBubbleBottomCenterTextIcon,
  XMarkIcon,
  CheckCircleIcon,
  StarIcon as StarOutlineIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from '@heroicons/vue/24/outline'
import { StarIcon as StarSolidIcon } from '@heroicons/vue/24/solid'
import {
  submitLearnerFeedback,
  getLocalFeedbacks,
  type FeedbackCategory,
  type TopicArea,
  type LearnerFeedback,
} from '@/services/nihongoFeedbackService'

const props = defineProps<{
  isOpen: boolean
  defaultUserName?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'submitted'): void
}>()

const activeTab = ref<'form' | 'history'>('form')

// Form state
const rating = ref<number>(5)
const category = ref<FeedbackCategory>('Saran Fitur Baru')
const topicArea = ref<TopicArea>('Umum')
const userName = ref<string>('')
const isAutofilledFromGoogle = ref(false)
const message = ref<string>('')
const isSubmitting = ref(false)
const submitSuccess = ref(false)
const errorMessage = ref('')

const CATEGORIES: FeedbackCategory[] = [
  'Saran Fitur Baru',
  'Kesan Pengalaman Belajar',
  'Kritik Materi & Tata Bahasa',
  'Laporan Masalah / Bug',
  'Lainnya',
]

const TOPIC_AREAS: TopicArea[] = [
  'Umum',
  'Huruf Kana (Hiragana/Katakana)',
  'Angka N5',
  'Panduan Kanji',
  'Bab 1 s/d Bab 5',
  'Simulator Generator',
  'Kuis & Latihan',
]

// Feedback History
const feedbackHistory = ref<LearnerFeedback[]>([])

function loadHistory() {
  feedbackHistory.value = getLocalFeedbacks()
}

const isValid = computed(() => {
  return message.value.trim().length >= 5
})

function autofillNameIfAvailable() {
  const googleUser = auth.currentUser
  const resolvedName = props.defaultUserName || googleUser?.displayName || ''
  if (resolvedName) {
    userName.value = resolvedName
    isAutofilledFromGoogle.value = true
  }
}

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      autofillNameIfAvailable()
      loadHistory()
      errorMessage.value = ''
      submitSuccess.value = false
    }
  },
  { immediate: true }
)

watch(
  () => props.defaultUserName,
  (newName) => {
    if (newName) {
      userName.value = newName
      isAutofilledFromGoogle.value = true
    }
  }
)

async function handleSubmit() {
  errorMessage.value = ''
  const trimmedMsg = message.value.trim()
  if (trimmedMsg.length < 5) {
    errorMessage.value = 'Mohon tuliskan masukan minimal 5 karakter.'
    return
  }

  isSubmitting.value = true
  try {
    await submitLearnerFeedback({
      userName: userName.value.trim() || 'Pembelajar JYash',
      rating: rating.value,
      category: category.value,
      topicArea: topicArea.value,
      message: trimmedMsg,
    })

    trackEvent('jyash_feedback_submit', {
      category: category.value,
      topic_area: topicArea.value,
      rating: rating.value,
      has_google_account: Boolean(auth.currentUser),
    })

    submitSuccess.value = true
    loadHistory()
    emit('submitted')
  } catch (err: any) {
    errorMessage.value = err?.message || 'Gagal mengirim masukan. Coba lagi.'
  } finally {
    isSubmitting.value = false
  }
}

function resetForm() {
  message.value = ''
  submitSuccess.value = false
  errorMessage.value = ''
  activeTab.value = 'form'
  autofillNameIfAvailable()
}

onMounted(() => {
  loadHistory()
  autofillNameIfAvailable()
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/70 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="bg-white border-2 border-neutral-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6 text-neutral-950 animate-scaleIn relative overflow-hidden"
        >
          <!-- Top Header -->
          <div class="flex items-center justify-between pb-4 border-b border-neutral-200">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-neutral-950 text-white flex items-center justify-center shadow-xs shrink-0">
                <ChatBubbleBottomCenterTextIcon class="w-5 h-5" />
              </div>
              <div>
                <h3 class="font-display font-black text-lg sm:text-xl text-neutral-950 tracking-tight leading-none">
                  Feedback & Masukan JYash
                </h3>
                <p class="text-[11px] font-mono text-neutral-500 uppercase tracking-wider mt-1">
                  Suara Pengguna Belajar Jepang
                </p>
              </div>
            </div>

            <button
              type="button"
              class="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition cursor-pointer"
              @click="emit('close')"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Tab Selector (Form vs History) -->
          <div class="flex items-center gap-1 p-1 bg-neutral-100 rounded-xl">
            <button
              type="button"
              class="flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer text-center"
              :class="activeTab === 'form' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
              @click="activeTab = 'form'"
            >
              Form Masukan Baru
            </button>
            <button
              type="button"
              class="flex-1 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer text-center flex items-center justify-center gap-1.5"
              :class="activeTab === 'history' ? 'bg-neutral-950 text-white shadow-xs' : 'text-neutral-600 hover:text-neutral-950'"
              @click="activeTab = 'history'; loadHistory()"
            >
              <span>Riwayat Masukan</span>
              <span v-if="feedbackHistory.length > 0" class="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-neutral-200 text-neutral-900 font-extrabold">
                {{ feedbackHistory.length }}
              </span>
            </button>
          </div>

          <!-- ============================================================ -->
          <!-- TAB 1: FORM MASUKAN -->
          <!-- ============================================================ -->
          <div v-if="activeTab === 'form'">
            <!-- Success Notification Card -->
            <div
              v-if="submitSuccess"
              class="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl text-center space-y-4 animate-fadeIn"
            >
              <div class="w-12 h-12 mx-auto rounded-full bg-neutral-950 text-white flex items-center justify-center shadow-xs">
                <CheckCircleIcon class="w-6 h-6 text-emerald-400" />
              </div>
              <div class="space-y-1">
                <h4 class="font-display font-bold text-base text-neutral-950">
                  Terima Kasih Banyak!
                </h4>
                <p class="text-xs text-neutral-600 leading-relaxed max-w-sm mx-auto">
                  Masukan Anda telah tersimpan dengan aman. Saran dan kritik Anda sangat berharga bagi Yasha untuk menyempurnakan kurikulum belajar bahasa Jepang di JYash.
                </p>
              </div>
              <div class="pt-2 flex items-center justify-center gap-2">
                <button
                  type="button"
                  class="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl hover:bg-neutral-800 transition cursor-pointer"
                  @click="resetForm"
                >
                  Kirim Masukan Lain
                </button>
                <button
                  type="button"
                  class="px-4 py-2 border border-neutral-300 text-neutral-700 text-xs font-bold rounded-xl hover:border-neutral-950 transition cursor-pointer"
                  @click="emit('close')"
                >
                  Selesai
                </button>
              </div>
            </div>

            <!-- Main Input Form -->
            <form v-else class="space-y-4" @submit.prevent="handleSubmit">
              <!-- Rating Selector -->
              <div class="space-y-1.5">
                <label class="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Kepuasan Fitur & Pengalaman Belajar:
                </label>
                <div class="flex items-center gap-2">
                  <div class="flex items-center gap-1">
                    <button
                      v-for="star in 5"
                      :key="star"
                      type="button"
                      class="p-1 hover:scale-110 transition-transform cursor-pointer"
                      @click="rating = star"
                    >
                      <StarSolidIcon v-if="star <= rating" class="w-6 h-6 text-neutral-950" />
                      <StarOutlineIcon v-else class="w-6 h-6 text-neutral-300" />
                    </button>
                  </div>
                  <span class="text-xs font-mono font-bold text-neutral-700">
                    {{ rating }}/5 Bintang
                  </span>
                </div>
              </div>

              <!-- Category Pills -->
              <div class="space-y-1.5">
                <label class="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Kategori Masukan:
                </label>
                <div class="flex flex-wrap gap-1.5">
                  <button
                    v-for="cat in CATEGORIES"
                    :key="cat"
                    type="button"
                    class="px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer border"
                    :class="
                      category === cat
                        ? 'bg-neutral-950 text-white border-neutral-950 shadow-2xs'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                    "
                    @click="category = cat"
                  >
                    {{ cat }}
                  </button>
                </div>
              </div>

              <!-- Topic Area Selector -->
              <div class="space-y-1.5">
                <label class="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                  Bagian Materi yang Disorot:
                </label>
                <select
                  v-model="topicArea"
                  class="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-900 focus:outline-none focus:border-neutral-950 font-sans"
                >
                  <option v-for="area in TOPIC_AREAS" :key="area" :value="area">
                    {{ area }}
                  </option>
                </select>
              </div>

              <!-- User Name Input -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between">
                  <label class="block text-xs font-mono font-bold uppercase tracking-wider text-neutral-500">
                    Nama Anda:
                  </label>
                  <span v-if="isAutofilledFromGoogle" class="text-[10px] font-mono text-emerald-600 flex items-center gap-1 font-semibold">
                    <CheckCircleIcon class="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>Terisi otomatis dari Google</span>
                  </span>
                </div>
                <input
                  v-model="userName"
                  type="text"
                  placeholder="Nama Anda atau Anonim"
                  class="w-full px-3.5 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-950 font-sans"
                />
              </div>

              <!-- Message Textarea -->
              <div class="space-y-1.5">
                <div class="flex items-center justify-between text-xs font-mono">
                  <label class="font-bold uppercase tracking-wider text-neutral-500">
                    Pesan Masukan / Kesan Belajar:
                  </label>
                  <span class="text-neutral-400 text-[11px]">{{ message.length }}/800</span>
                </div>
                <textarea
                  v-model="message"
                  rows="4"
                  maxlength="800"
                  placeholder="Tuliskan saran penambahan materi, kritik tentang tata bahasa, atau kendala yang Anda alami saat menggunakan platform JYash..."
                  class="w-full p-3 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:border-neutral-950 font-sans resize-none leading-relaxed"
                ></textarea>
              </div>

              <!-- Error Banner -->
              <div v-if="errorMessage" class="text-xs text-rose-600 font-semibold bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {{ errorMessage }}
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center justify-end gap-2.5 pt-2">
                <button
                  type="button"
                  class="px-4 py-2.5 text-xs font-bold text-neutral-600 hover:text-neutral-950 cursor-pointer"
                  @click="emit('close')"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  :disabled="!isValid || isSubmitting"
                  class="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 disabled:opacity-40 text-white rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <PaperAirplaneIcon class="w-3.5 h-3.5" />
                  <span>{{ isSubmitting ? 'Mengirim...' : 'Kirim Feedback' }}</span>
                </button>
              </div>
            </form>
          </div>

          <!-- ============================================================ -->
          <!-- TAB 2: RIWAYAT MASUKAN SAYA -->
          <!-- ============================================================ -->
          <div v-else class="space-y-3 max-h-80 overflow-y-auto scrollbar-thin pr-1">
            <div v-if="feedbackHistory.length === 0" class="text-center py-10 space-y-2">
              <ClockIcon class="w-8 h-8 text-neutral-300 mx-auto" />
              <p class="text-xs text-neutral-500">Belum ada riwayat masukan yang dikirim dari browser ini.</p>
            </div>

            <div
              v-for="fb in feedbackHistory"
              :key="fb.id"
              class="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs"
            >
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-1.5">
                  <span class="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-200 text-neutral-900">
                    {{ fb.category }}
                  </span>
                  <span class="text-[10px] font-mono text-neutral-500">
                    {{ fb.topicArea }}
                  </span>
                </div>
                <div class="flex items-center gap-0.5 text-neutral-950">
                  <StarSolidIcon class="w-3.5 h-3.5 text-neutral-950" />
                  <span class="font-mono font-bold text-[11px]">{{ fb.rating }}</span>
                </div>
              </div>

              <p class="text-neutral-800 leading-relaxed">{{ fb.message }}</p>

              <div class="text-[10px] font-mono text-neutral-400">
                Pengirim: {{ fb.userName }} &bull; {{ fb.createdAt ? new Date(fb.createdAt).toLocaleDateString('id-ID') : 'Baru saja' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
