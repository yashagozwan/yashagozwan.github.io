<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SpeakerWaveIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  showRomaji: boolean
  defaultName?: string
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
}>()

const introForm = ref({
  name: 'ヤシャ',
  nameRomaji: props.defaultName || 'Yasha',
  country: 'インドネシア',
  countryRomaji: 'Indoneshia',
  affiliation: 'KPC',
  job: 'エンジニア',
  jobRomaji: 'enjinia',
  age: 24,
})

const generatedIntroJapanese = computed(() => {
  const f = introForm.value
  const ageStr = f.age === 20 ? 'はたち' : `${f.age}さい`
  return `はじめまして。\nわたしは ${f.name}です。\n${f.country}から きました。\n${f.affiliation}の ${f.job}です。\n${ageStr}です。\nどうぞ よろしく おねがいします。`
})

const generatedIntroRomaji = computed(() => {
  const f = introForm.value
  const ageStr = f.age === 20 ? 'hatachi' : `${f.age}-sai`
  return `Hajimemashite.\nWatashi wa ${f.nameRomaji} desu.\n${f.countryRomaji} kara kimashita.\n${f.affiliation} no ${f.jobRomaji} desu.\n${ageStr} desu.\nDouzo yoroshiku onegaishimasu.`
})

const generatedIntroIndo = computed(() => {
  const f = introForm.value
  const countryName =
    f.country === 'インドネシア' ? 'Indonesia' : f.country === 'にほん' ? 'Jepang' : 'Amerika Serikat'
  return `Perkenalkan. Saya ${f.nameRomaji}. Saya berasal dari ${countryName}. Saya ${f.jobRomaji} di ${f.affiliation}. Umur saya ${f.age} tahun. Senang berkenalan dengan Anda.`
})

const copyNotification = ref(false)
function copyText(text: string) {
  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    navigator.clipboard.writeText(text)
    copyNotification.value = true
    setTimeout(() => {
      copyNotification.value = false
    }, 2500)
  }
}
</script>

<template>
  <div class="space-y-8 max-w-4xl mx-auto">
    <!-- Header banner -->
    <div class="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 sm:p-7 space-y-2">
      <div class="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-neutral-500">
        <span class="px-2 py-0.5 rounded bg-neutral-950 text-white font-bold">Simulator Bab 1</span>
        <span>自己紹介 &bull; Jikoshoukai Generator</span>
      </div>
      <h2 class="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
        Simulator Perkenalan Diri Otomatis
      </h2>
      <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
        Masukkan data diri Anda pada formulir di sebelah kiri. Sistem akan otomatis merakit teks perkenalan diri (*Jikoshoukai*) yang santun sesuai standar tata bahasa Minna no Nihongo Bab 1, lengkap dengan audio pelafalan.
      </p>
    </div>

    <!-- Main Grid: Form on Left, Output Card on Right -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <!-- Input Form Card -->
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 class="font-display font-bold text-base text-neutral-950">
            Formulir Data Diri
          </h3>
          <span class="text-xs font-mono text-neutral-400">Parameter Kalimat</span>
        </div>

        <!-- Name Inputs -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
            Nama Anda (Katakana &amp; Romaji)
          </label>
          <div class="grid grid-cols-2 gap-2">
            <input
              v-model="introForm.name"
              type="text"
              placeholder="ヤシャ (Katakana)"
              class="px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950 font-sans"
            />
            <input
              v-model="introForm.nameRomaji"
              type="text"
              placeholder="Yasha (Romaji)"
              class="px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950 font-mono"
            />
          </div>
        </div>

        <!-- Country -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
            Asal Negara
          </label>
          <select
            v-model="introForm.country"
            class="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950"
            @change="
              introForm.countryRomaji =
                introForm.country === 'インドネシア'
                  ? 'Indoneshia'
                  : introForm.country === 'にほん'
                  ? 'Nihon'
                  : 'Amerika'
            "
          >
            <option value="インドネシア">インドネシア (Indonesia)</option>
            <option value="にほん">にほん (Jepang)</option>
            <option value="アメリカ">アメリカ (Amerika Serikat)</option>
          </select>
        </div>

        <!-- Job & Affiliation -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
              Profesi
            </label>
            <select
              v-model="introForm.job"
              class="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950"
              @change="
                introForm.jobRomaji =
                  introForm.job === 'エンジニア'
                    ? 'enjinia'
                    : introForm.job === 'がくせい'
                    ? 'gakusei'
                    : introForm.job === 'かいしゃいん'
                    ? 'kaishain'
                    : introForm.job === 'いしゃ'
                    ? 'isha'
                    : 'sensei'
              "
            >
              <option value="エンジニア">エンジニア (Engineer)</option>
              <option value="がくせい">がくせい (Mahasiswa)</option>
              <option value="かいしゃいん">かいしゃいん (Karyawan)</option>
              <option value="せんせい">せんせい (Guru / Dosen)</option>
              <option value="いしゃ">いしゃ (Dokter)</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
              Perusahaan / Kampus
            </label>
            <input
              v-model="introForm.affiliation"
              type="text"
              placeholder="Contoh: KPC, IMC"
              class="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950 font-mono"
            />
          </div>
        </div>

        <!-- Age -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
            Usia (Tahun)
          </label>
          <input
            v-model.number="introForm.age"
            type="number"
            min="10"
            max="99"
            class="w-full px-3.5 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950 font-mono"
          />
          <span v-if="introForm.age === 20" class="text-[11px] text-amber-600 block mt-1 font-semibold">
            Catatan khusus: Usia 20 tahun diucapkan <strong>はたち (hatachi)</strong>, bukan nijuu-sai!
          </span>
        </div>
      </div>

      <!-- Live Generated Output Card -->
      <div class="bg-neutral-950 text-white rounded-3xl p-7 space-y-6 shadow-xl">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Hasil Teks Perkenalan</span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold">
            Live Output
          </span>
        </div>

        <!-- Japanese Sentence -->
        <div class="space-y-1.5">
          <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Bahasa Jepang (Nihongo):
          </div>
          <div class="font-sans text-lg sm:text-xl font-bold tracking-wide leading-relaxed text-neutral-100 bg-neutral-900 p-4 rounded-2xl border border-neutral-800 whitespace-pre-line">
            {{ generatedIntroJapanese }}
          </div>
        </div>

        <!-- Romaji -->
        <div v-if="props.showRomaji" class="space-y-1">
          <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Cara Baca (Romaji):
          </div>
          <div class="font-mono text-xs text-neutral-300 whitespace-pre-line leading-relaxed bg-neutral-900/60 p-3 rounded-xl">
            {{ generatedIntroRomaji }}
          </div>
        </div>

        <!-- Indonesian Meaning -->
        <div class="space-y-1">
          <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Terjemahan Bahasa Indonesia:
          </div>
          <p class="text-xs text-neutral-400 leading-relaxed italic">
            {{ generatedIntroIndo }}
          </p>
        </div>

        <!-- Audio & Copy Action Buttons -->
        <div class="pt-4 border-t border-neutral-800 flex flex-wrap gap-3">
          <button
            type="button"
            class="flex-1 py-3 px-4 bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            @click="emit('play-audio', generatedIntroJapanese)"
          >
            <SpeakerWaveIcon class="w-4 h-4" />
            <span>Dengarkan Pelafalan</span>
          </button>

          <button
            type="button"
            class="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            @click="copyText(generatedIntroJapanese)"
          >
            <CheckIcon v-if="copyNotification" class="w-4 h-4 text-emerald-400" />
            <ClipboardDocumentIcon v-else class="w-4 h-4 text-neutral-300" />
            <span>{{ copyNotification ? 'Tersalin!' : 'Salin Teks' }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
