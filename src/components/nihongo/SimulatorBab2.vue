<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  SpeakerWaveIcon,
  ClipboardDocumentIcon,
  CheckIcon,
} from '@heroicons/vue/24/outline'

const props = defineProps<{
  showRomaji: boolean
}>()

const emit = defineEmits<{
  (e: 'play-audio', text: string): void
}>()

const demoForm = ref({
  position: 'dekat-saya' as 'dekat-saya' | 'dekat-lawan-bicara' | 'jauh',
  formType: 'pengganti-benda' as 'pengganti-benda' | 'menerangkan-benda',
  sentenceType: 'positif' as 'positif' | 'negatif' | 'tanya-apa' | 'tanya-pemilik' | 'konfirmasi',
  itemIndex: 0,
  ownerIndex: 0,
})

const demoItems = [
  { japanese: 'ほん', romaji: 'hon', indonesian: 'buku' },
  { japanese: 'じしょ', romaji: 'jisho', indonesian: 'kamus' },
  { japanese: 'かばん', romaji: 'kaban', indonesian: 'tas' },
  { japanese: 'かぎ', romaji: 'kagi', indonesian: 'kunci' },
  { japanese: 'とけい', romaji: 'tokei', indonesian: 'jam' },
  { japanese: 'くるま', romaji: 'kuruma', indonesian: 'mobil' },
  { japanese: 'かさ', romaji: 'kasa', indonesian: 'payung' },
  { japanese: 'カメラ', romaji: 'kamera', indonesian: 'kamera' },
  { japanese: 'ノート', romaji: 'nooto', indonesian: 'buku catatan' },
]

const demoOwners = [
  { japanese: 'わたし', romaji: 'watashi', indonesian: 'saya' },
  { japanese: 'ミラーさん', romaji: 'Miraa-san', indonesian: 'Tuan Miller' },
  { japanese: 'サントスさん', romaji: 'Santosu-san', indonesian: 'Tuan Santos' },
  { japanese: 'せんせい', romaji: 'sensei', indonesian: 'guru / dosen' },
  { japanese: 'ワンさん', romaji: 'Wan-san', indonesian: 'Tuan Wang' },
]

const generatedDemoOutput = computed(() => {
  const f = demoForm.value
  const item = demoItems[f.itemIndex]
  const owner = demoOwners[f.ownerIndex]

  let demonstrativeJp = ''
  let demonstrativeRo = ''
  let posTextIndo = ''

  if (f.formType === 'pengganti-benda') {
    if (f.position === 'dekat-saya') {
      demonstrativeJp = 'これ'
      demonstrativeRo = 'Kore'
      posTextIndo = 'ini'
    } else if (f.position === 'dekat-lawan-bicara') {
      demonstrativeJp = 'それ'
      demonstrativeRo = 'Sore'
      posTextIndo = 'itu (dekat Anda)'
    } else {
      demonstrativeJp = 'あれ'
      demonstrativeRo = 'Are'
      posTextIndo = 'itu (jauh di sana)'
    }
  } else {
    if (f.position === 'dekat-saya') {
      demonstrativeJp = 'この'
      demonstrativeRo = 'Kono'
      posTextIndo = 'ini'
    } else if (f.position === 'dekat-lawan-bicara') {
      demonstrativeJp = 'その'
      demonstrativeRo = 'Sono'
      posTextIndo = 'itu'
    } else {
      demonstrativeJp = 'あの'
      demonstrativeRo = 'Ano'
      posTextIndo = 'itu (jauh)'
    }
  }

  let jp = ''
  let ro = ''
  let id = ''

  if (f.formType === 'pengganti-benda') {
    if (f.sentenceType === 'positif') {
      jp = `${demonstrativeJp}は ${item.japanese}です。`
      ro = `${demonstrativeRo} wa ${item.romaji} desu.`
      id = `${demonstrativeRo} adalah ${item.indonesian}.`
    } else if (f.sentenceType === 'negatif') {
      jp = `${demonstrativeJp}は ${item.japanese}じゃありません。`
      ro = `${demonstrativeRo} wa ${item.romaji} ja arimasen.`
      id = `${demonstrativeRo} bukan ${item.indonesian}.`
    } else if (f.sentenceType === 'tanya-apa') {
      jp = `${demonstrativeJp}は 何（なん）ですか。`
      ro = `${demonstrativeRo} wa nan desu ka.`
      id = `Apakah ${posTextIndo}? (Ini/itu benda apa?)`
    } else if (f.sentenceType === 'tanya-pemilik') {
      jp = `${demonstrativeJp}は だれの ${item.japanese}ですか。`
      ro = `${demonstrativeRo} wa dare no ${item.romaji} desu ka.`
      id = `${posTextIndo.charAt(0).toUpperCase() + posTextIndo.slice(1)} ${item.indonesian} milik siapa?`
    } else {
      jp = `${demonstrativeJp}は ${item.japanese}ですか。\nはい、そうです。`
      ro = `${demonstrativeRo} wa ${item.romaji} desu ka.\nHai, sou desu.`
      id = `Apakah ${posTextIndo} ${item.indonesian}? Ya, benar.`
    }
  } else {
    if (f.sentenceType === 'positif') {
      jp = `${demonstrativeJp} ${item.japanese}は ${owner.japanese}のです。`
      ro = `${demonstrativeRo} ${item.romaji} wa ${owner.romaji} no desu.`
      id = `${item.indonesian.charAt(0).toUpperCase() + item.indonesian.slice(1)} ${posTextIndo} milik ${owner.indonesian}.`
    } else if (f.sentenceType === 'negatif') {
      jp = `${demonstrativeJp} ${item.japanese}は ${owner.japanese}のじゃありません。`
      ro = `${demonstrativeRo} ${item.romaji} wa ${owner.romaji} no ja arimasen.`
      id = `${item.indonesian.charAt(0).toUpperCase() + item.indonesian.slice(1)} ${posTextIndo} bukan milik ${owner.indonesian}.`
    } else if (f.sentenceType === 'tanya-pemilik') {
      jp = `${demonstrativeJp} ${item.japanese}は だれのですか。`
      ro = `${demonstrativeRo} ${item.romaji} wa dare no desu ka.`
      id = `${item.indonesian.charAt(0).toUpperCase() + item.indonesian.slice(1)} ${posTextIndo} milik siapa?`
    } else {
      jp = `${demonstrativeJp} ${item.japanese}は ${owner.japanese}のですか。`
      ro = `${demonstrativeRo} ${item.romaji} wa ${owner.romaji} no desu ka.`
      id = `Apakah ${item.indonesian} ${posTextIndo} milik ${owner.indonesian}?`
    }
  }

  return { jp, ro, id }
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
        <span class="px-2 py-0.5 rounded bg-neutral-950 text-white font-bold">Simulator Bab 2</span>
        <span>これ・それ・あれ &bull; Demonstrative Generator</span>
      </div>
      <h2 class="font-display text-2xl sm:text-3xl font-bold text-neutral-950">
        Simulator Kata Tunjuk &amp; Kepemilikan
      </h2>
      <p class="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl">
        Eksplorasi rumus penunjuk benda (berdiri sendiri vs menerangkan kata benda) serta pembentukan kalimat kepemilikan dengan partikel の secara interaktif.
      </p>
    </div>

    <!-- Main Grid: Form on Left, Output Card on Right -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
      <!-- Input Controls Card -->
      <div class="bg-white border-2 border-neutral-950 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm">
        <div class="flex items-center justify-between border-b border-neutral-100 pb-3">
          <h3 class="font-display font-bold text-base text-neutral-950">
            Konfigurasi Penunjuk
          </h3>
          <span class="text-xs font-mono text-neutral-400">Parameter Kalimat</span>
        </div>

        <!-- Relative Position -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">
            Posisi Relatif Benda
          </label>
          <div class="grid grid-cols-3 gap-2">
            <button
              type="button"
              class="py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer"
              :class="
                demoForm.position === 'dekat-saya'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-950'
              "
              @click="demoForm.position = 'dekat-saya'"
            >
              <div class="font-bold text-sm">Dekat Saya</div>
              <div class="text-[10px] opacity-75">これ / この</div>
            </button>

            <button
              type="button"
              class="py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer"
              :class="
                demoForm.position === 'dekat-lawan-bicara'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-950'
              "
              @click="demoForm.position = 'dekat-lawan-bicara'"
            >
              <div class="font-bold text-sm">Dekat Lawan</div>
              <div class="text-[10px] opacity-75">それ / その</div>
            </button>

            <button
              type="button"
              class="py-2.5 px-2 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer"
              :class="
                demoForm.position === 'jauh'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-950'
              "
              @click="demoForm.position = 'jauh'"
            >
              <div class="font-bold text-sm">Jauh di Sana</div>
              <div class="text-[10px] opacity-75">あれ / あの</div>
            </button>
          </div>
        </div>

        <!-- Form Structure Type -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-2 font-bold">
            Struktur Pola Kalimat
          </label>
          <div class="grid grid-cols-2 gap-2">
            <button
              type="button"
              class="py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-left cursor-pointer"
              :class="
                demoForm.formType === 'pengganti-benda'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-950'
              "
              @click="demoForm.formType = 'pengganti-benda'"
            >
              <div class="font-bold">Berdiri Sendiri</div>
              <div class="text-[10px] opacity-75">これ / それ / あれ は...</div>
            </button>

            <button
              type="button"
              class="py-2.5 px-3 rounded-xl text-xs font-medium border transition-all text-left cursor-pointer"
              :class="
                demoForm.formType === 'menerangkan-benda'
                  ? 'bg-neutral-950 text-white border-neutral-950 shadow-xs'
                  : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:border-neutral-950'
              "
              @click="demoForm.formType = 'menerangkan-benda'"
            >
              <div class="font-bold">+ Kata Benda</div>
              <div class="text-[10px] opacity-75">この / その / あの ほんは...</div>
            </button>
          </div>
        </div>

        <!-- Item & Owner pickers -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
              Pilihan Benda
            </label>
            <select
              v-model="demoForm.itemIndex"
              class="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950"
            >
              <option v-for="(item, idx) in demoItems" :key="idx" :value="idx">
                {{ item.japanese }} ({{ item.indonesian }})
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
              Pemilik Benda
            </label>
            <select
              v-model="demoForm.ownerIndex"
              class="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950"
            >
              <option v-for="(owner, idx) in demoOwners" :key="idx" :value="idx">
                {{ owner.japanese }} ({{ owner.indonesian }})
              </option>
            </select>
          </div>
        </div>

        <!-- Sentence Type -->
        <div>
          <label class="block text-xs font-mono uppercase tracking-wider text-neutral-500 mb-1.5 font-bold">
            Tipe Kalimat
          </label>
          <select
            v-model="demoForm.sentenceType"
            class="w-full px-3 py-2.5 text-xs bg-neutral-50 border border-neutral-300 rounded-xl focus:outline-none focus:border-neutral-950 font-medium"
          >
            <option value="positif">Pernyataan Positif</option>
            <option value="negatif">Penyangkalan Negatif (じゃありません)</option>
            <option v-if="demoForm.formType === 'pengganti-benda'" value="tanya-apa">Tanya Identitas Benda (何ですか)</option>
            <option value="tanya-pemilik">Tanya Kepemilikan (だれの...)</option>
            <option value="konfirmasi">Konfirmasi (そうですか / そうです)</option>
          </select>
        </div>
      </div>

      <!-- Live Generated Output Card -->
      <div class="bg-neutral-950 text-white rounded-3xl p-7 space-y-6 shadow-xl">
        <div class="flex items-center justify-between border-b border-neutral-800 pb-3">
          <span class="text-xs font-mono uppercase tracking-widest text-neutral-400">Hasil Pola Kalimat</span>
          <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300 font-bold">
            Bab 2 Generator
          </span>
        </div>

        <div class="space-y-1.5">
          <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Bahasa Jepang (Nihongo):
          </div>
          <div class="font-sans text-xl sm:text-2xl font-bold tracking-wide leading-relaxed text-neutral-100 bg-neutral-900 p-4 rounded-2xl border border-neutral-800 whitespace-pre-line">
            {{ generatedDemoOutput.jp }}
          </div>
        </div>

        <div v-if="props.showRomaji" class="space-y-1">
          <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Cara Baca (Romaji):
          </div>
          <div class="font-mono text-xs text-neutral-300 whitespace-pre-line leading-relaxed bg-neutral-900/60 p-3 rounded-xl">
            {{ generatedDemoOutput.ro }}
          </div>
        </div>

        <div class="space-y-1">
          <div class="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
            Arti Bahasa Indonesia:
          </div>
          <p class="text-xs text-neutral-400 leading-relaxed italic">
            {{ generatedDemoOutput.id }}
          </p>
        </div>

        <div class="pt-4 border-t border-neutral-800 flex flex-wrap gap-3">
          <button
            type="button"
            class="flex-1 py-3 px-4 bg-white text-neutral-950 hover:bg-neutral-200 rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            @click="emit('play-audio', generatedDemoOutput.jp)"
          >
            <SpeakerWaveIcon class="w-4 h-4" />
            <span>Dengarkan Suara</span>
          </button>

          <button
            type="button"
            class="py-3 px-4 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            @click="copyText(generatedDemoOutput.jp)"
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
