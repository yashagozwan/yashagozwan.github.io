<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import {
  AcademicCapIcon,
  PencilSquareIcon,
  BookOpenIcon,
  PuzzlePieceIcon,
  CloudArrowUpIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  XMarkIcon,
  CheckCircleIcon,
  SparklesIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'complete'): void
}>()

const currentStep = ref(0)
const dontShowAgain = ref(false)

interface TourStep {
  title: string
  subtitle: string
  badge: string
  icon: any
  description: string
  keyPoints: string[]
  previewText?: string
}

const TOUR_STEPS: TourStep[] = [
  {
    badge: 'Langkah 1 dari 5',
    title: 'Selamat Datang di JYash',
    subtitle: 'Platform Belajar Bahasa Jepang yang Terstruktur & Mandiri',
    icon: AcademicCapIcon,
    description:
      'JYash dirancang khusus agar Anda tidak bingung dengan tumpukan menu. Setiap tahapan berdiri mandiri (independent screen) dengan alur bertahap yang runut:',
    keyPoints: [
      'Alur terarah: Huruf Kana -> Angka N5 -> Panduan Kanji -> Bab 1 s/d Bab 5 -> Roadmap.',
      'Menu navigasi kiri (Left Navigator) selalu siap membantu Anda berpindah bab kapan saja.',
      'Tombol "Langkah Belajar Selanjutnya" di bawah layar memandu Anda melanjutkan ke materi berikutnya.',
    ],
    previewText: 'Huruf Kana -> Angka N5 -> Panduan Kanji -> Bab 1 - 5 -> Roadmap',
  },
  {
    badge: 'Langkah 2 dari 5',
    title: 'Studio Kaligrafi & Animasi Coretan',
    subtitle: 'Kuasai Hiragana & Katakana dengan Engine Hanzi-Writer',
    icon: PencilSquareIcon,
    description:
      'Di layar Huruf Kana, ketuk karakter apapun untuk membuka studio kaligrafi interaktif di dalam kotak Genkouyoushi 4 kuadran:',
    keyPoints: [
      'Animasi Coretan: Amati urutan sapuan kuas kaligrafi resmi (Kakijun) dengan kecepatan yang bisa diatur.',
      'Latihan Menulis Langsung: Sentuh atau seret mouse untuk menulis; sistem mendeteksi arah dan bentuk coretan Anda secara real-time.',
      'Audio Pelafalan Asli: Dengarkan pengucapan native speaker untuk huruf dan contoh kosakata.',
    ],
    previewText: 'Kotak 4 Kuadran (マス目) • Animasi Goresan Kuas • Kuis Tracing Tangan',
  },
  {
    badge: 'Langkah 3 dari 5',
    title: 'Layar Panduan Kanji: On\'yomi & Kun\'yomi',
    subtitle: 'Pahami Alasan Mengapa 1 Kanji Memiliki 2 Cara Baca',
    icon: BookOpenIcon,
    description:
      'Tak perlu takut menghafal Kanji! Kami menyediakan 1 layar khusus untuk mengupas tuntas cara baca On dan Kun sebelum Anda masuk ke bab kalimat:',
    keyPoints: [
      'Komparasi Visual: Pahami On\'yomi (bunyi serapan Tiongkok) vs Kun\'yomi (makna asli Jepang) dengan analogi mudah.',
      'Simulator Audio Interaktif: Uji coba kanji majemuk vs kanji ber-okurigana langsung dengan suara native.',
      'Rumus Praktis 80/20: Aturan cepat menentukan kapan kanji dibaca On dan kapan dibaca Kun.',
    ],
    previewText: 'Rumus 80/20 Kanji • Simulator Audio On vs Kun • Katalog Bab 1 - 5',
  },
  {
    badge: 'Langkah 4 dari 5',
    title: 'Struktur Belajar 6 Tab di Tiap Bab',
    subtitle: 'Penguasaan Menyeluruh untuk Minna no Nihongo I',
    icon: PuzzlePieceIcon,
    description:
      'Setiap bab (Bab 1 sampai Bab 5) memiliki 6 sub-tab internal yang lengkap dan tidak bertumpuk:',
    keyPoints: [
      'Kosakata & Dasar: Hafalkan kata baru, audio native, dan studio khusus (Salam, Benda, Lokasi, Jam, Transportasi).',
      'Kanji N5: Daftar kanji wajib hafal di bab tersebut lengkap dengan mnemonic (jembatan keledai visual).',
      'Tata Bahasa & Latihan: Pola kalimat visual, tantangan susun kata (Sentence Builder), dan dialog roleplay.',
      'Simulator & Rangkuman: Generator kalimat siap pakai dan evaluasi mandiri 5 hari.',
    ],
    previewText: 'Kosakata • Kanji N5 • Tata Bahasa • Latihan Dialog • Simulator • Rangkuman',
  },
  {
    badge: 'Langkah 5 dari 5',
    title: 'Gamifikasi & Sinkronisasi Cloud',
    subtitle: 'Pantau Konsistensi Belajar & Simpan Progres Anda',
    icon: CloudArrowUpIcon,
    description:
      'Belajar lebih termotivasi dengan sistem progres yang tersimpan otomatis di perangkat Anda:',
    keyPoints: [
      'XP & Daily Streak: Dapatkan poin pengalaman setiap kali menyelesaikan kuis, mendengar audio, dan menghafal kosakata.',
      'Simpan Cloud Google: Hubungkan akun Google dengan 1 klik untuk menyinkronkan seluruh riwayat belajar Anda antar-perangkat.',
      'Tur ini bisa dibuka kembali kapan saja lewat tombol "Panduan Tur" di menu navigasi.',
    ],
    previewText: 'Level XP • Daily Streak • 1-Click Google Cloud Sync',
  },
]

function nextStep() {
  if (currentStep.value < TOUR_STEPS.length - 1) {
    currentStep.value++
  } else {
    finishTour()
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--
  }
}

function finishTour() {
  if (dontShowAgain.value) {
    try {
      localStorage.setItem('nihongo_coachmark_seen', 'true')
    } catch {}
  }
  emit('complete')
  emit('close')
}

function handleKeydown(e: KeyboardEvent) {
  if (!props.isOpen) return
  if (e.key === 'Escape') {
    finishTour()
  } else if (e.key === 'ArrowRight' || e.key === 'Enter') {
    nextStep()
  } else if (e.key === 'ArrowLeft') {
    prevStep()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/75 backdrop-blur-sm"
        @click.self="finishTour"
      >
        <div
          class="bg-white border-2 border-neutral-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl space-y-6 text-neutral-950 animate-scaleIn relative overflow-hidden"
        >
          <!-- Background Accent Element -->
          <div
            class="absolute -right-8 -bottom-10 font-sans font-black text-9xl text-neutral-100 pointer-events-none select-none -z-0"
          >
            道
          </div>

          <!-- Top Header Navigation of Tour -->
          <div class="relative z-10 flex items-center justify-between pb-4 border-b border-neutral-200">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full bg-neutral-950 animate-pulse"></span>
              <span class="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold uppercase bg-neutral-100 text-neutral-800">
                {{ TOUR_STEPS[currentStep].badge }}
              </span>
            </div>

            <!-- Skip Tour / Close Button -->
            <button
              type="button"
              class="p-1.5 text-neutral-400 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition cursor-pointer"
              title="Tutup Panduan Tur"
              @click="finishTour"
            >
              <XMarkIcon class="w-5 h-5" />
            </button>
          </div>

          <!-- Active Step Main Content -->
          <div class="relative z-10 space-y-4">
            <!-- Icon & Heading -->
            <div class="flex items-start gap-3.5">
              <div
                class="w-12 h-12 rounded-2xl bg-neutral-950 text-white flex items-center justify-center shrink-0 shadow-xs"
              >
                <component :is="TOUR_STEPS[currentStep].icon" class="w-6 h-6" />
              </div>
              <div>
                <h3 class="font-display font-black text-xl sm:text-2xl text-neutral-950 tracking-tight leading-snug">
                  {{ TOUR_STEPS[currentStep].title }}
                </h3>
                <p class="text-xs font-semibold text-neutral-500 mt-0.5">
                  {{ TOUR_STEPS[currentStep].subtitle }}
                </p>
              </div>
            </div>

            <!-- Description -->
            <p class="text-xs sm:text-sm text-neutral-700 leading-relaxed">
              {{ TOUR_STEPS[currentStep].description }}
            </p>

            <!-- Key Points Bullet Cards -->
            <div class="space-y-2 pt-1">
              <div
                v-for="(point, pIdx) in TOUR_STEPS[currentStep].keyPoints"
                :key="pIdx"
                class="flex items-start gap-2.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-800"
              >
                <CheckCircleIcon class="w-4 h-4 text-neutral-950 shrink-0 mt-0.5" />
                <span class="leading-relaxed">{{ point }}</span>
              </div>
            </div>

            <!-- Preview Pill Banner -->
            <div
              v-if="TOUR_STEPS[currentStep].previewText"
              class="px-3.5 py-2 rounded-xl bg-neutral-100 border border-neutral-300/80 text-[11px] font-mono font-medium text-neutral-700 text-center"
            >
              {{ TOUR_STEPS[currentStep].previewText }}
            </div>
          </div>

          <!-- Bottom Footer Bar (Dots, Checkbox & Actions) -->
          <div class="relative z-10 pt-4 border-t border-neutral-200 space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <!-- Dots Indicator -->
              <div class="flex items-center gap-1.5">
                <button
                  v-for="(_, dotIdx) in TOUR_STEPS"
                  :key="dotIdx"
                  type="button"
                  class="h-2 rounded-full transition-all cursor-pointer"
                  :class="
                    currentStep === dotIdx
                      ? 'w-7 bg-neutral-950'
                      : 'w-2 bg-neutral-200 hover:bg-neutral-400'
                  "
                  :title="`Pergi ke langkah ${dotIdx + 1}`"
                  @click="currentStep = dotIdx"
                />
              </div>

              <!-- Action Buttons -->
              <div class="flex items-center gap-2 self-end sm:self-auto">
                <button
                  v-if="currentStep > 0"
                  type="button"
                  class="px-4 py-2.5 rounded-xl border border-neutral-200 hover:border-neutral-950 bg-white text-neutral-800 text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                  @click="prevStep"
                >
                  <ArrowLeftIcon class="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>

                <button
                  type="button"
                  class="px-5 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition flex items-center gap-2 cursor-pointer shadow-xs"
                  @click="nextStep"
                >
                  <span>{{ currentStep === TOUR_STEPS.length - 1 ? 'Mulai Belajar Sekarang!' : 'Lanjut' }}</span>
                  <ArrowRightIcon v-if="currentStep < TOUR_STEPS.length - 1" class="w-3.5 h-3.5" />
                  <SparklesIcon v-else class="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>

            <!-- "Don't show automatically again" checkbox -->
            <div class="flex items-center justify-between pt-1 text-[11px] text-neutral-500">
              <label class="flex items-center gap-2 cursor-pointer select-none">
                <input
                  v-model="dontShowAgain"
                  type="checkbox"
                  class="w-3.5 h-3.5 rounded border-neutral-300 text-neutral-950 focus:ring-0 cursor-pointer"
                />
                <span>Jangan tampilkan panduan tur ini secara otomatis lagi</span>
              </label>

              <button
                type="button"
                class="hover:text-neutral-950 underline underline-offset-2 cursor-pointer"
                @click="finishTour"
              >
                Lewati Tur
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
