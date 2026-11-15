<script setup lang="ts">
import { ref } from 'vue'
import {
  TRANSPORT_MODES_L5,
  type TransportModeItem,
} from '@/data/nihongoLesson5'
import {
  SpeakerWaveIcon,
  ArrowRightIcon,
  SparklesIcon,
  InformationCircleIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'

defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
  (e: 'next-session'): void
  (e: 'gain-xp', amount: number): void
}>()

const selectedVehicle = ref<TransportModeItem>(TRANSPORT_MODES_L5[0])
const sampleDestinations = [
  { kanji: '学校', romaji: 'gakkou', meaning: 'Sekolah' },
  { kanji: '会社', romaji: 'kaisha', meaning: 'Kantor' },
  { kanji: '駅', romaji: 'eki', meaning: 'Stasiun' },
  { kanji: '京都', romaji: 'Kyouto', meaning: 'Kyoto' },
  { kanji: 'スーパー', romaji: 'suupaa', meaning: 'Supermarket' },
]
const selectedDestination = ref(sampleDestinations[0])

function selectVehicle(v: TransportModeItem) {
  selectedVehicle.value = v
  emit('play-audio', v.japanese)
  emit('gain-xp', 2)
}

function playFullSentence() {
  const sentence = selectedVehicle.value.id === 'tr-10'
    ? `歩いて ${selectedDestination.value.kanji}へ 行きます。`
    : `${selectedVehicle.value.japanese}で ${selectedDestination.value.kanji}へ 行きます。`
  emit('play-audio', sentence)
}
</script>

<template>
  <div class="bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 space-y-7 shadow-xs">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-neutral-200">
      <div class="space-y-1">
        <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
          <span class="w-2 h-2 rounded-full bg-neutral-950"></span>
          <span>Sesi 2 &bull; Ragam Transportasi & Aturan Partikel</span>
        </div>
        <h3 class="font-display text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
          Alat Transportasi & Sarana Perjalanan (乗り物)
        </h3>
        <p class="text-xs sm:text-sm text-neutral-600 max-w-2xl">
          Ketuk kendaraan untuk mendengarkan pelafalan audio aslinya dan amati aturan partikel sarana <strong>で (de)</strong> serta perkecualian <strong>歩いて (jalan kaki)</strong>.
        </p>
      </div>

      <button
        type="button"
        class="px-4 py-2 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 self-start sm:self-auto cursor-pointer shadow-xs"
        @click="emit('next-session')"
      >
        <span>Lanjut ke Kosakata</span>
        <ArrowRightIcon class="w-3.5 h-3.5" />
      </button>
    </div>

    <!-- Vehicles Grid -->
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      <button
        v-for="v in TRANSPORT_MODES_L5"
        :key="v.id"
        type="button"
        class="p-4 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[110px]"
        :class="
          selectedVehicle.id === v.id
            ? 'bg-neutral-950 text-white border-neutral-950 shadow-md ring-2 ring-neutral-950/20'
            : 'bg-white hover:bg-neutral-50 text-neutral-900 border-neutral-200 hover:border-neutral-400'
        "
        @click="selectVehicle(v)"
      >
        <div>
          <div class="flex items-center justify-between">
            <span
              class="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded font-bold"
              :class="selectedVehicle.id === v.id ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-100 text-neutral-500'"
            >
              {{ v.category }}
            </span>
            <SpeakerWaveIcon
              class="w-4 h-4 transition opacity-50 group-hover:opacity-100"
              :class="selectedVehicle.id === v.id ? 'text-white' : 'text-neutral-700'"
            />
          </div>
          <div class="font-sans font-black text-xl sm:text-2xl mt-2 tracking-tight">
            {{ v.japanese }}
          </div>
          <div v-if="showRomaji" class="font-mono text-xs mt-0.5" :class="selectedVehicle.id === v.id ? 'text-neutral-300' : 'text-neutral-500'">
            /{{ v.romaji }}/
          </div>
        </div>

        <div class="text-xs font-medium mt-2 pt-2 border-t" :class="selectedVehicle.id === v.id ? 'border-neutral-800 text-neutral-200' : 'border-neutral-100 text-neutral-700'">
          {{ v.meaning }}
        </div>
      </button>
    </div>

    <!-- Active Transport Inspector & Real-Time Sentence Tester -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-5 sm:p-6 space-y-5">
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-2.5">
          <SparklesIcon class="w-5 h-5 text-amber-500 shrink-0" />
          <h4 class="font-display font-bold text-sm sm:text-base text-neutral-950">
            Simulator Gabungan Kalimat Transportasi:
          </h4>
        </div>

        <!-- Destination Selector -->
        <div class="flex items-center gap-1.5 flex-wrap">
          <span class="text-xs font-mono text-neutral-500 font-bold uppercase">Pilih Tujuan:</span>
          <button
            v-for="dest in sampleDestinations"
            :key="dest.kanji"
            type="button"
            class="px-2.5 py-1 rounded-lg text-xs font-semibold transition cursor-pointer border"
            :class="
              selectedDestination.kanji === dest.kanji
                ? 'bg-neutral-950 text-white border-neutral-950'
                : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
            "
            @click="selectedDestination = dest"
          >
            {{ dest.kanji }}
          </button>
        </div>
      </div>

      <!-- Generated Sentence Banner -->
      <div class="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-2xs">
        <div class="space-y-1">
          <div class="text-[10px] font-mono uppercase text-neutral-400 font-bold tracking-wider">
            Kalimat Siap Pakai:
          </div>
          <div class="font-sans font-black text-2xl sm:text-3xl text-neutral-950 tracking-tight flex items-baseline gap-2 flex-wrap">
            <span class="underline decoration-neutral-950 decoration-2 underline-offset-4">
              {{ selectedVehicle.id === 'tr-10' ? '歩いて' : selectedVehicle.japanese + 'で' }}
            </span>
            <span class="underline decoration-neutral-400 decoration-2 underline-offset-4">
              {{ selectedDestination.kanji }}へ
            </span>
            <span>行きます。</span>
          </div>
          <div v-if="showRomaji" class="font-mono text-xs text-neutral-500">
            {{ selectedVehicle.id === 'tr-10' ? 'Aruite' : selectedVehicle.romaji + ' de' }} {{ selectedDestination.romaji }} e ikimasu.
          </div>
          <div class="text-xs sm:text-sm text-neutral-700 font-medium">
            = Saya pergi ke {{ selectedDestination.meaning }} {{ selectedVehicle.id === 'tr-10' ? 'dengan berjalan kaki' : 'naik ' + selectedVehicle.meaning }}.
          </div>
        </div>

        <button
          type="button"
          class="px-5 py-3 bg-neutral-950 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-xs shrink-0"
          @click="playFullSentence"
        >
          <SpeakerWaveIcon class="w-4 h-4" />
          <span>Dengarkan Kalimat</span>
        </button>
      </div>

      <!-- Golden Rule Alert Box -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div class="p-4 bg-white border border-neutral-200 rounded-2xl space-y-1.5">
          <div class="font-bold text-neutral-950 flex items-center gap-1.5">
            <CheckCircleIcon class="w-4 h-4 text-emerald-600" />
            <span>Aturan Baku Partikel で (Sarana / Alat)</span>
          </div>
          <p class="text-neutral-600 leading-relaxed">
            Semua kendaraan (kereta, mobil, sepeda, bus, pesawat) wajib memakai <strong>で</strong>:
            <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[11px] text-neutral-900">電車で</code>,
            <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[11px] text-neutral-900">バスで</code>,
            <code class="bg-neutral-100 px-1 py-0.5 rounded font-mono text-[11px] text-neutral-900">自転車で</code>.
          </p>
        </div>

        <div class="p-4 bg-white border border-amber-300 rounded-2xl space-y-1.5 bg-amber-50/40">
          <div class="font-bold text-amber-950 flex items-center gap-1.5">
            <InformationCircleIcon class="w-4 h-4 text-amber-600" />
            <span>Jebakan Pemula: Berjalan Kaki (歩いて)</span>
          </div>
          <p class="text-amber-900/80 leading-relaxed">
            Kata <strong>歩いて (aruite)</strong> adalah bentuk kata kerja <em>-te</em> dari <em>aruku</em>. Oleh karena itu, <strong>JANGAN PERNAH menambahkan partikel で</strong> (salah: <s>歩いてで</s>). Cukup katakan <strong class="text-amber-950">歩いて 行きます</strong>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
