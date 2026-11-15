import type {
  LessonSession,
  GrammarPattern,
  SentenceBuilderChallenge,
  InteractiveDialogue,
  MatchingPair,
  ParticleQuiz,
  TranslateQuiz,
  EvaluationIndicator,
  StudyPlanDay,
} from '@/data/nihongoLesson1'

export interface JapaneseVocabL2 {
  id: string
  japanese: string
  romaji: string
  meaning: string
  category: 'Kata Tunjuk Benda' | 'Benda Kelas & Alat Tulis' | 'Elektronik & Kendaraan' | 'Makanan, Bahasa & Lainnya' | 'Kata Tanya & Ungkapan'
  notes?: string
}

export interface DemonstrativeQuiz {
  id: number
  context: string
  sentenceBefore: string
  sentenceAfter: string
  options: string[]
  correct: string
  reason: string
  fullSentence: string
  romaji: string
  indonesian: string
}

export interface FillBlankQuizL2 {
  id: number
  sentence: string
  hint: string
  answer: string
  romaji: string
  meaning: string
}

export interface TranslateQuizL2 {
  id: number
  indonesian: string
  japanese: string
  romaji: string
}

export interface WordScrambleQuiz {
  id: number
  scrambledWords: string[]
  correctSentence: string
  romaji: string
  indonesian: string
}

export interface EverydaySituation {
  id: string
  situation: string
  japanese: string
  romaji: string
  meaning: string
}

export const LESSON_2_META = {
  course: '日本語 • PELAJARAN 02',
  title: 'BAB 2 — BENDA & KATA TUNJUK',
  subtitle: 'Menunjuk Benda, Bertanya, dan Menyatakan Kepemilikan',
  curriculum: 'Materi pendamping bergaya kurikulum Minna no Nihongo I',
  description: 'Disusun dalam Bahasa Indonesia • Membedakan これ・それ・あれ vs この・その・あの, konfirmasi そうです, dan kepemilikan の.',
  targets: [
    { title: 'Menunjuk benda', result: 'Membedakan これ・それ・あれ berdasarkan posisi benda.' },
    { title: 'Menerangkan benda', result: 'Menggunakan この・その・あの sebelum kata benda.' },
    { title: 'Bertanya dan menjawab', result: 'Menggunakan 何, そうです, dan そうじゃありません.' },
    { title: 'Menyatakan kepemilikan', result: 'Menggunakan の dan bertanya だれの.' },
    { title: 'Mengenali benda', result: 'Menyebutkan nama benda umum di kelas dan kehidupan sehari-hari.' },
  ],
}

export const LESSON_SESSIONS_L2: LessonSession[] = [
  {
    id: 'l2-s-1',
    number: 1,
    title: 'Pengantar Bab 2',
    subtitle: 'Tujuan & Peta Pembelajaran',
    icon: '',
    durationMinutes: 5,
    description: 'Pahami sasaran kompetensi Bab 2: Menunjuk benda, bertanya identitas, dan menyatakan kepemilikan.',
  },
  {
    id: 'l2-s-2',
    number: 2,
    title: 'Kata Tunjuk Dasar',
    subtitle: 'これ・それ・あれ vs この・その・あの',
    icon: '',
    durationMinutes: 10,
    description: 'Kuasai 3 zona posisi penunjuk serta perbedaan krusial bentuk berdiri sendiri vs menempel kata benda.',
  },
  {
    id: 'l2-s-3',
    number: 3,
    title: 'Kosakata Benda (ことば)',
    subtitle: '43 Kosakata Benda, Elektronik & Ungkapan',
    icon: '',
    durationMinutes: 15,
    description: 'Pelajari nama benda kelas, alat tulis, kendaraan, dan makanan dengan audio dan 3D flashcard drill.',
  },
  {
    id: 'l2-s-4',
    number: 4,
    title: 'Tata Bahasa Visual (文法)',
    subtitle: '7 Pola Tata Bahasa & Balok Komponen',
    icon: '',
    durationMinutes: 20,
    description: 'Bongkar struktur kalimat tanya 何 (nan), konfirmasi そうです / そうじゃありません, dan partikel kepemilikan の.',
  },
  {
    id: 'l2-s-5',
    number: 5,
    title: 'Susun Kalimat (Sentence Builder)',
    subtitle: 'Tantangan Balok Kata Interaktif',
    icon: '',
    durationMinutes: 15,
    description: 'Susun balok-balok kata acak menjadi kalimat penunjuk dan kepemilikan dengan umpan balik edukatif.',
  },
  {
    id: 'l2-s-6',
    number: 6,
    title: 'Praktik Percakapan (会話)',
    subtitle: '4 Skenario Dialog & Roleplay Karakter',
    icon: '',
    durationMinutes: 15,
    description: 'Simulasi percakapan nyata menanyakan benda, memastikan kepemilikan, dan etika menerima bantuan.',
  },
  {
    id: 'l2-s-7',
    number: 7,
    title: 'Latihan & Kuis Terpadu',
    subtitle: 'Pasang Kata, Kuis Kata Tunjuk & Terjemahan',
    icon: '',
    durationMinutes: 15,
    description: 'Uji kemampuan aktif dengan menjodohkan pasangan kata, kuis pilihan ganda, dan latihan terjemahan.',
  },
  {
    id: 'l2-s-8',
    number: 8,
    title: 'Rangkuman & Kelulusan',
    subtitle: 'Skor Akurasi, XP & Evaluasi Capaian',
    icon: '',
    durationMinutes: 10,
    description: 'Tinjau pencapaian Anda, periksa topik yang perlu diulang, dan klaim kelulusan Bab 2.',
  },
]

export const VOCABULARIES_L2_DATA: JapaneseVocabL2[] = [
  // Kata Tunjuk
  { id: 'l2-v-1', japanese: 'これ', romaji: 'kore', meaning: 'Ini (benda dekat pembicara)', category: 'Kata Tunjuk Benda', notes: 'Berdiri sendiri sebagai kata ganti benda.' },
  { id: 'l2-v-2', japanese: 'それ', romaji: 'sore', meaning: 'Itu (benda dekat lawan bicara)', category: 'Kata Tunjuk Benda', notes: 'Berdiri sendiri sebagai kata ganti benda.' },
  { id: 'l2-v-3', japanese: 'あれ', romaji: 'are', meaning: 'Itu (benda jauh dari keduanya)', category: 'Kata Tunjuk Benda', notes: 'Berdiri sendiri sebagai kata ganti benda.' },
  { id: 'l2-v-4', japanese: 'この～', romaji: 'kono-', meaning: '... ini (wajib diikuti kata benda)', category: 'Kata Tunjuk Benda', notes: 'Contoh: この ほん (buku ini).' },
  { id: 'l2-v-5', japanese: 'その～', romaji: 'sono-', meaning: '... itu (wajib diikuti kata benda)', category: 'Kata Tunjuk Benda', notes: 'Contoh: その かばん (tas itu).' },
  { id: 'l2-v-6', japanese: 'あの～', romaji: 'ano-', meaning: '... itu (jauh; wajib diikuti kata benda)', category: 'Kata Tunjuk Benda', notes: 'Contoh: あの くるま (mobil itu).' },

  // Benda Kelas & Alat Tulis
  { id: 'l2-v-7', japanese: 'ほん', romaji: 'hon', meaning: 'Buku', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-8', japanese: 'じしょ', romaji: 'jisho', meaning: 'Kamus', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-9', japanese: 'ざっし', romaji: 'zasshi', meaning: 'Majalah', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-10', japanese: 'しんぶん', romaji: 'shinbun', meaning: 'Koran', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-11', japanese: 'ノート', romaji: 'nooto', meaning: 'Buku catatan', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-12', japanese: 'てちょう', romaji: 'techou', meaning: 'Buku agenda / organizer', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-13', japanese: 'めいし', romaji: 'meishi', meaning: 'Kartu nama', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-14', japanese: 'カード', romaji: 'kaado', meaning: 'Kartu', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-15', japanese: 'テレホンカード', romaji: 'terehon kaado', meaning: 'Kartu telepon', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-16', japanese: 'えんぴつ', romaji: 'enpitsu', meaning: 'Pensil', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-17', japanese: 'ボールペン', romaji: 'boorupen', meaning: 'Pulpen', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-18', japanese: 'シャープペンシル', romaji: 'shaapu penshiru', meaning: 'Pensil mekanik', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-19', japanese: 'かぎ', romaji: 'kagi', meaning: 'Kunci', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-20', japanese: 'とけい', romaji: 'tokei', meaning: 'Jam / arloji', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-21', japanese: 'かさ', romaji: 'kasa', meaning: 'Payung', category: 'Benda Kelas & Alat Tulis' },
  { id: 'l2-v-22', japanese: 'かばん', romaji: 'kaban', meaning: 'Tas', category: 'Benda Kelas & Alat Tulis' },

  // Elektronik & Kendaraan
  { id: 'l2-v-23', japanese: 'CD', romaji: 'shii-dii', meaning: 'CD', category: 'Elektronik & Kendaraan' },
  { id: 'l2-v-24', japanese: 'テレビ', romaji: 'terebi', meaning: 'Televisi', category: 'Elektronik & Kendaraan' },
  { id: 'l2-v-25', japanese: 'ラジオ', romaji: 'rajio', meaning: 'Radio', category: 'Elektronik & Kendaraan' },
  { id: 'l2-v-26', japanese: 'カメラ', romaji: 'kamera', meaning: 'Kamera', category: 'Elektronik & Kendaraan' },
  { id: 'l2-v-27', japanese: 'コンピューター', romaji: 'konpyuutaa', meaning: 'Komputer', category: 'Elektronik & Kendaraan' },
  { id: 'l2-v-28', japanese: 'くるま', romaji: 'kuruma', meaning: 'Mobil', category: 'Elektronik & Kendaraan' },
  { id: 'l2-v-29', japanese: 'つくえ', romaji: 'tsukue', meaning: 'Meja', category: 'Elektronik & Kendaraan' },
  { id: 'l2-v-30', japanese: 'いす', romaji: 'isu', meaning: 'Kursi', category: 'Elektronik & Kendaraan' },

  // Makanan, Bahasa & Lainnya
  { id: 'l2-v-31', japanese: 'チョコレート', romaji: 'chokoreeto', meaning: 'Cokelat', category: 'Makanan, Bahasa & Lainnya' },
  { id: 'l2-v-32', japanese: 'コーヒー', romaji: 'koohii', meaning: 'Kopi', category: 'Makanan, Bahasa & Lainnya' },
  { id: 'l2-v-33', japanese: 'えいご', romaji: 'eigo', meaning: 'Bahasa Inggris', category: 'Makanan, Bahasa & Lainnya' },
  { id: 'l2-v-34', japanese: 'にほんご', romaji: 'nihongo', meaning: 'Bahasa Jepang', category: 'Makanan, Bahasa & Lainnya' },
  { id: 'l2-v-35', japanese: '～ご', romaji: '-go', meaning: 'Bahasa ...', category: 'Makanan, Bahasa & Lainnya', notes: 'Ditambahkan setelah nama negara (contoh: インドネシアご).' },

  // Kata Tanya & Ungkapan
  { id: 'l2-v-36', japanese: 'なん (何)', romaji: 'nan', meaning: 'Apa', category: 'Kata Tanya & Ungkapan' },
  { id: 'l2-v-37', japanese: 'そう', romaji: 'sou', meaning: 'Begitu / demikian', category: 'Kata Tanya & Ungkapan' },
  { id: 'l2-v-38', japanese: 'ちがいます', romaji: 'chigaimasu', meaning: 'Bukan / salah / berbeda', category: 'Kata Tanya & Ungkapan' },
  { id: 'l2-v-39', japanese: 'そうですか', romaji: 'sou desu ka', meaning: 'Oh, begitu? / begitu ya', category: 'Kata Tanya & Ungkapan' },
  { id: 'l2-v-40', japanese: 'どうぞ', romaji: 'douzo', meaning: 'Silakan', category: 'Kata Tanya & Ungkapan' },
  { id: 'l2-v-41', japanese: 'どうも', romaji: 'doumo', meaning: 'Terima kasih (singkat/kasual)', category: 'Kata Tanya & Ungkapan' },
  { id: 'l2-v-42', japanese: 'これから おせわに なります', romaji: 'kore kara osewa ni narimasu', meaning: 'Mohon bantuannya mulai sekarang', category: 'Kata Tanya & Ungkapan' },
  { id: 'l2-v-43', japanese: 'こちらこそ', romaji: 'kochira koso', meaning: 'Saya juga / justru saya yang ...', category: 'Kata Tanya & Ungkapan' },
]

export const GRAMMAR_PATTERNS_L2_DATA: GrammarPattern[] = [
  {
    id: 'l2-p-1',
    number: 1,
    title: 'これ・それ・あれ は ～ です',
    formula: 'これ / それ / あれ + は + Kata Benda + です。',
    functionDesc: 'Kata tunjuk benda yang dapat berdiri sendiri sebagai subjek/topik. Digunakan berdasarkan posisi benda terhadap pembicara dan lawan bicara.',
    structureFormula: ['Topik (Kata Tunjuk)', 'は', 'Informasi (Kata Benda)', 'です'],
    breakdownExample: {
      japanese: 'これは ほんです。',
      romaji: 'Kore wa hon desu.',
      meaning: 'Ini adalah buku.',
      tokens: [
        { token: 'これ', romaji: 'kore', role: 'Kata Tunjuk Benda (Dekat Pembicara)', meaning: 'Ini' },
        { token: 'は', romaji: 'wa', role: 'Partikel Penanda Topik', meaning: 'Adalah / Perihal' },
        { token: 'ほん', romaji: 'hon', role: 'Kata Benda (Nomina)', meaning: 'Buku' },
        { token: 'です', romaji: 'desu', role: 'Kopula Penutup Sopan', meaning: 'Adalah (Polite ending)' },
      ],
    },
    examples: [
      { japanese: 'これは ほんです。', romaji: 'Kore wa hon desu.', meaning: 'Ini buku (dekat pembicara).' },
      { japanese: 'それは じしょです。', romaji: 'Sore wa jisho desu.', meaning: 'Itu kamus (dekat lawan bicara).' },
      { japanese: 'あれは くるまです。', romaji: 'Are wa kuruma desu.', meaning: 'Itu mobil (jauh dari pembicara dan lawan bicara).' },
    ],
    usageScenario: 'Menunjuk dan mengenalkan benda yang sedang Anda pegang di tangan sendiri atau berada di atas meja Anda.',
    commonMistakes: [
      {
        wrong: 'これ ほんです',
        correct: 'これは ほんです',
        explanation: 'Jangan lupakan partikel topik は (dilafalkan wa) setelah kata tunjuk これ.',
      },
      {
        wrong: 'この です',
        correct: 'これ です',
        explanation: 'Bentuk この wajib diikuti kata benda, sedangkan これ bisa berdiri sendiri sebelum です.',
      },
    ],
    miniExercise: {
      question: 'Benda berada di tangan Anda sendiri: (____) は ほんです。',
      options: ['これ', 'それ', 'あれ'],
      answer: 'これ',
      explanation: 'Gunakan これ karena benda berada di tangan sendiri / dekat dengan pembicara.',
    },
    notes: 'Ingat: は sebagai partikel penanda topik ditulis "ha" tetapi dilafalkan "wa".',
  },
  {
    id: 'l2-p-2',
    number: 2,
    title: 'これは 何ですか',
    formula: 'これ / それ / あれ + は + 何 (なん) + ですか？',
    functionDesc: '何 (dalam pola ini dibaca "nan") berarti "apa". Digunakan untuk menanyakan identitas benda yang belum diketahui.',
    structureFormula: ['Topik (Kata Tunjuk)', 'は', '何 (nan)', 'ですか'],
    breakdownExample: {
      japanese: 'それは 何ですか。',
      romaji: 'Sore wa nan desu ka.',
      meaning: 'Itu apa?',
      tokens: [
        { token: 'それ', romaji: 'sore', role: 'Kata Tunjuk Benda (Dekat Lawan Bicara)', meaning: 'Itu' },
        { token: 'は', romaji: 'wa', role: 'Partikel Penanda Topik', meaning: 'Perihal' },
        { token: '何', furigana: 'なん', romaji: 'nan', role: 'Kata Tanya Benda', meaning: 'Apa' },
        { token: 'ですか', romaji: 'desu ka', role: 'Kopula Tanya Sopan', meaning: 'Apakah (Pertanyaan)' },
      ],
    },
    examples: [
      { japanese: 'これは 何ですか。', romaji: 'Kore wa nan desu ka.', meaning: 'Ini apa?' },
      { japanese: 'これは かぎです。', romaji: 'Kore wa kagi desu.', meaning: 'Ini kunci.' },
      { japanese: 'それは 何ですか。', romaji: 'Sore wa nan desu ka.', meaning: 'Itu apa?' },
      { japanese: 'それは めいしです。', romaji: 'Sore wa meishi desu.', meaning: 'Itu kartu nama.' },
      { japanese: 'あれは 何ですか。', romaji: 'Are wa nan desu ka.', meaning: 'Itu (jauh) apa?' },
      { japanese: 'あれは テレビです。', romaji: 'Are wa terebi desu.', meaning: 'Itu televisi.' },
    ],
    usageScenario: 'Menanyakan identitas atau nama benda asing yang sedang dibawa atau dipegang oleh lawan bicara.',
    commonMistakes: [
      {
        wrong: 'それは なにですか',
        correct: 'それは なんですか',
        explanation: 'Sebelum kopula です / ですか, kanji 何 wajib dilafalkan "nan", bukan "nani".',
      },
    ],
    miniExercise: {
      question: 'Menanyakan benda yang dipegang lawan bicara: (____) は 何ですか。',
      options: ['これ', 'それ', 'あれ'],
      answer: 'それ',
      explanation: 'Gunakan それ karena benda berada di dekat lawan bicara.',
    },
  },
  {
    id: 'l2-p-3',
    number: 3,
    title: 'そうです / そうじゃありません',
    formula: 'はい、そうです。 / いいえ、そうじゃありません。',
    functionDesc: 'Gunakan そうです untuk membenarkan pernyataan lawan bicara ("Ya, benar"). Gunakan そうじゃありません untuk menyangkal ("Bukan begitu / Salah").',
    structureFormula: ['Respon (はい / いいえ)', 'そう', 'Kopula (です / じゃありません)'],
    breakdownExample: {
      japanese: 'はい、そうです。',
      romaji: 'Hai, sou desu.',
      meaning: 'Ya, benar begitu.',
      tokens: [
        { token: 'はい', romaji: 'hai', role: 'Kata Seru Persetujuan', meaning: 'Ya' },
        { token: 'そう', romaji: 'sou', role: 'Keterangan Pembenar', meaning: 'Begitu / Demikian' },
        { token: 'です', romaji: 'desu', role: 'Kopula Penegas Sopan', meaning: 'Adalah (Sopan)' },
      ],
    },
    examples: [
      { japanese: 'A: これは じしょですか。 B: はい、そうです。', romaji: 'A: Kore wa jisho desu ka. B: Hai, sou desu.', meaning: 'A: Apakah ini kamus? B: Ya, benar.' },
      { japanese: 'A: 这是 ほんですか。 B: いいえ、そうじゃありません。', romaji: 'A: Kore wa hon desu ka. B: Iie, sou ja arimasen.', meaning: 'A: Apakah ini buku? B: Tidak, bukan begitu.' },
      { japanese: 'いいえ、ちがいます。じしょです。', romaji: 'Iie, chigaimasu. Jisho desu.', meaning: 'Bukan, salah. Ini adalah kamus.' },
    ],
    usageScenario: 'Menjawab konfirmasi atau tebakan orang lain tentang identitas benda secara singkat dan santun.',
    commonMistakes: [
      {
        wrong: 'A: これは じしょですか。 B: そうですか。',
        correct: 'A: これは じしょですか。 B: はい、そうです。',
        explanation: 'そうです (Ya benar) untuk menjawab, sedangkan そうですか (Oh, begitu?) digunakan ketika baru menerima informasi.',
      },
    ],
    miniExercise: {
      question: 'Pertanyaan: "これは じしょですか。" Jawaban membenarkan: "(____)、そうです。"',
      options: ['はい', 'いいえ', 'ちがいます'],
      answer: 'はい',
      explanation: 'Gunakan "はい" untuk membenarkan pertanyaan konfirmasi identitas.',
    },
  },
  {
    id: 'l2-p-4',
    number: 4,
    title: 'この・その・あの + Kata Benda',
    formula: 'この / その / あの + Kata Benda + は ... です。',
    functionDesc: 'Berbeda dengan これ・それ・あれ, bentuk この・その・あの TIDAK BISA berdiri sendiri; harus menempel langsung di depan kata benda untuk menerangkan benda tersebut.',
    structureFormula: ['Penunjuk Menerangkan (この/その/あの)', 'Kata Benda', 'は', 'Keterangan', 'です'],
    breakdownExample: {
      japanese: 'この ほんは わたしのです。',
      romaji: 'Kono hon wa watashi no desu.',
      meaning: 'Buku ini milik saya.',
      tokens: [
        { token: 'この', romaji: 'kono', role: 'Penunjuk Nomina Menerangkan', meaning: '... ini' },
        { token: 'ほん', romaji: 'hon', role: 'Kata Benda yang Diterangkan', meaning: 'Buku' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Perihal' },
        { token: 'わたしの', romaji: 'watashi no', role: 'Frasa Kepemilikan', meaning: 'Milik saya' },
        { token: 'です', romaji: 'desu', role: 'Kopula Sopan', meaning: 'Adalah' },
      ],
    },
    examples: [
      { japanese: 'この ほんは わたしのです。', romaji: 'Kono hon wa watashi no desu.', meaning: 'Buku ini milik saya.' },
      { japanese: 'その かばんは だれのですか。', romaji: 'Sono kaban wa dare no desu ka.', meaning: 'Tas itu milik siapa?' },
      { japanese: 'あの くるまは ミラーさんのです。', romaji: 'Ano kuruma wa Miraa-san no desu.', meaning: 'Mobil itu milik Miller.' },
    ],
    usageScenario: 'Menunjuk benda spesifik yang sedang dibicarakan dan memberikan atribut atau keterangan kepemilikan.',
    commonMistakes: [
      {
        wrong: 'この ほんです',
        correct: 'これは ほんです / この ほんは わたしのです',
        explanation: 'Bentuk この harus diikuti kata benda dan membutuhkan predikat kalimat, tidak boleh "kono hon desu".',
      },
    ],
    miniExercise: {
      question: 'Menyebut "Kamus ini milik saya": (____) じしょは わたしのです。',
      options: ['この', 'これ', 'ここ'],
      answer: 'この',
      explanation: 'Gunakan この karena langsung menempel sebelum kata benda じしょ.',
    },
    notes: 'Perbandingan: 这是 ほんです (Ini buku) vs この ほんは わたしのです (Buku ini milik saya).',
  },
  {
    id: 'l2-p-5',
    number: 5,
    title: 'A は B の です (Menyatakan Kepemilikan)',
    formula: 'Benda + は + Pemilik + の (milik) です。',
    functionDesc: 'Partikel の menghubungkan pemilik dengan bendanya. Jika konteks benda sudah dipahami, kata benda setelah の dapat dihilangkan agar lebih natural.',
    structureFormula: ['Benda Topik', 'は', 'Pemilik', 'の (Kepemilikan)', 'です'],
    breakdownExample: {
      japanese: 'その かばんは ミラーさんのです。',
      romaji: 'Sono kaban wa Miraa-san no desu.',
      meaning: 'Tas itu milik Miller.',
      tokens: [
        { token: 'その かばん', romaji: 'sono kaban', role: 'Frasa Nomina Topik', meaning: 'Tas itu' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Adalah' },
        { token: 'ミラーさん', romaji: 'Miraa-san', role: 'Pemilik Benda', meaning: 'Tuan Miller' },
        { token: 'の', romaji: 'no', role: 'Partikel Kepemilikan', meaning: 'Milik' },
        { token: 'です', romaji: 'desu', role: 'Kopula Penutup Sopan', meaning: 'Adalah' },
      ],
    },
    examples: [
      { japanese: 'これは わたしの ほんです。', romaji: 'Kore wa watashi no hon desu.', meaning: 'Ini adalah buku saya.' },
      { japanese: 'その かばんは ミラーさんのです。', romaji: 'Sono kaban wa Miraa-san no desu.', meaning: 'Tas itu milik Miller (kata kaban tidak diulang).' },
      { japanese: 'この じしょは せんせいのです。', romaji: 'Kono jisho wa sensei no desu.', meaning: 'Kamus ini milik guru.' },
    ],
    usageScenario: 'Menjelaskan hak milik suatu barang tanpa perlu mengulang kata bendanya jika sudah jelas dalam konteks percakapan.',
    commonMistakes: [
      {
        wrong: 'その かばんは ミラーさん かばんです',
        correct: 'その かばんは ミラーさんのです',
        explanation: 'Jika benda sudah jelas dibicarakan, cukup gunakan のです tanpa mengulang kata bendanya.',
      },
    ],
    miniExercise: {
      question: 'Menyatakan "Buku ini milik guru": この ほんは せんせい (____) です。',
      options: ['の', 'は', 'も'],
      answer: 'の',
      explanation: 'Gunakan partikel の untuk menyatakan kepemilikan (milik guru).',
    },
  },
  {
    id: 'l2-p-6',
    number: 6,
    title: 'だれの～ですか (Menanyakan Pemilik)',
    formula: 'Kata Tunjuk + は + だれの + Kata Benda + ですか？',
    functionDesc: 'だれの (dare no) berarti "milik siapa". Gunakan untuk menanyakan kepemilikan suatu benda.',
    structureFormula: ['Topik Benda', 'は', 'だれ (Siapa)', 'の (Milik)', 'Kata Benda', 'ですか'],
    breakdownExample: {
      japanese: 'これは だれの ほんですか。',
      romaji: 'Kore wa dare no hon desu ka.',
      meaning: 'Ini buku milik siapa?',
      tokens: [
        { token: 'これ', romaji: 'kore', role: 'Kata Tunjuk Topik', meaning: 'Ini' },
        { token: 'は', romaji: 'wa', role: 'Partikel Penanda Topik', meaning: 'Perihal' },
        { token: 'だれ', romaji: 'dare', role: 'Kata Tanya Orang', meaning: 'Siapa' },
        { token: 'の', romaji: 'no', role: 'Partikel Kepemilikan', meaning: 'Milik' },
        { token: 'ほん', romaji: 'hon', role: 'Kata Benda', meaning: 'Buku' },
        { token: 'ですか', romaji: 'desu ka', role: 'Kopula Tanya Sopan', meaning: 'Apakah (Pertanyaan)' },
      ],
    },
    examples: [
      { japanese: 'これは だれの ほんですか。', romaji: 'Kore wa dare no hon desu ka.', meaning: 'Ini buku milik siapa?' },
      { japanese: 'わたしの ほんです。', romaji: 'Watashi no hon desu.', meaning: 'Buku milik saya.' },
      { japanese: 'その かさは だれのですか。', romaji: 'Sono kasa wa dare no desu ka.', meaning: 'Payung itu milik siapa?' },
      { japanese: 'サントスさんのです。', romaji: 'Santosu-san no desu.', meaning: 'Milik Santos.' },
    ],
    usageScenario: 'Menanyakan pemilik barang yang tertinggal atau ditemukan di meja kerja atau kelas.',
    commonMistakes: [
      {
        wrong: '这是 だれ ほんですか',
        correct: 'これは だれの ほんですか',
        explanation: 'Wajib menyertakan partikel の setelah だれ untuk membentuk arti "milik siapa".',
      },
    ],
    miniExercise: {
      question: 'Menanyakan pemilik payung: その かさは (____) のですか。',
      options: ['だれ', 'なん', 'どこ'],
      answer: 'だれ',
      explanation: 'Gunakan だれ (siapa) + の untuk menanyakan pemilik barang.',
    },
  },
  {
    id: 'l2-p-7',
    number: 7,
    title: '～ですか (Konfirmasi Identitas Benda)',
    formula: 'Kata Tunjuk + は + Keterangan + ですか？',
    functionDesc: 'Tambahkan か pada akhir kalimat untuk memastikan jenis, bahasa, atau identitas benda.',
    structureFormula: ['Topik', 'は', 'Keterangan Modifikasi', 'ですか'],
    breakdownExample: {
      japanese: 'その ほんは にほんごの ほんですか。',
      romaji: 'Sono hon wa nihongo no hon desu ka.',
      meaning: 'Apakah buku itu buku bahasa Jepang?',
      tokens: [
        { token: 'その ほん', romaji: 'sono hon', role: 'Frasa Nomina Topik', meaning: 'Buku itu' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Apakah' },
        { token: 'にほんごの ほん', romaji: 'nihongo no hon', role: 'Keterangan Benda', meaning: 'Buku bahasa Jepang' },
        { token: 'ですか', romaji: 'desu ka', role: 'Kopula Konfirmasi Tanya', meaning: 'Apakah' },
      ],
    },
    examples: [
      { japanese: 'これは カメラですか。', romaji: 'Kore wa kamera desu ka.', meaning: 'Apakah ini kamera?' },
      { japanese: 'その ほんは にほんごの ほんですか。', romaji: 'Sono hon wa nihongo no hon desu ka.', meaning: 'Apakah buku itu buku bahasa Jepang?' },
      { japanese: 'はい、にほんごの ほんです。', romaji: 'Hai, nihongo no hon desu.', meaning: 'Ya, buku bahasa Jepang.' },
    ],
    usageScenario: 'Memastikan jenis buku, bahasa kamus, atau fungsi suatu barang dengan lawan bicara.',
    commonMistakes: [
      {
        wrong: 'その ほんは にほんご ほんですか',
        correct: 'その ほんは にほんごの ほんですか',
        explanation: 'Hubungkan dua kata benda (bahasa dan buku) dengan partikel の.',
      },
    ],
    miniExercise: {
      question: 'Menanyakan "Apakah ini kamera?": これは カメラ (____)。',
      options: ['ですか', 'です', 'じゃありません'],
      answer: 'ですか',
      explanation: 'Gunakan "ですか" untuk membuat kalimat tanya atau konfirmasi identitas benda.',
    },
  },
]

export const COMPARISON_DATA = {
  title: 'Perbedaan Wajib: これ・それ・あれ vs この・その・あの',
  rows: [
    {
      type: 'Berdiri Sendiri (Pengganti Benda)',
      demonstratives: 'これ・それ・あれ',
      usage: 'Tidak diikuti kata benda langsung.',
      exampleJapanese: 'これは ほんです。',
      exampleRomaji: 'Kore wa hon desu.',
      exampleMeaning: 'Ini adalah buku.',
    },
    {
      type: 'Menerangkan Kata Benda',
      demonstratives: 'この・その・あの',
      usage: 'Wajib diikuti kata benda (Kono/Sono/Ano + N).',
      exampleJapanese: 'この ほんは わたしのです。',
      exampleRomaji: 'Kono hon wa watashi no desu.',
      exampleMeaning: 'Buku ini milik saya.',
    },
  ],
  memorizeTip: 'Cara cepat menghafal: Kalau ada akhiran "れ" (Kore/Sore/Are) bisa berdiri sendiri. Kalau berakhiran "の" (Kono/Sono/Ano) harus nempel ke kata benda!',
}

export const SENTENCE_BUILDER_CHALLENGES_L2: SentenceBuilderChallenge[] = [
  {
    id: 'sb-l2-1',
    patternId: 'l2-p-1',
    targetIndonesian: 'Ini adalah buku.',
    hint: 'Gunakan kata tunjuk benda dekat pembicara: これ + は + ほん + です',
    scrambledWords: ['です', 'これ', 'ほん', 'は'],
    correctOrder: ['これ', 'は', 'ほん', 'です'],
    romaji: 'Kore wa hon desu.',
    explanation: 'これ (Ini) berdiri sendiri sebagai topik penunjuk, diikuti partikel は, kata benda ほん, dan ditutup dengan kopula sopan です.',
  },
  {
    id: 'sb-l2-2',
    patternId: 'l2-p-1',
    targetIndonesian: 'Itu (dekat lawan bicara) adalah kamus.',
    hint: 'Gunakan kata tunjuk benda dekat lawan bicara: それ + は + じしょ + です',
    scrambledWords: ['じしょ', 'は', 'です', 'それ'],
    correctOrder: ['それ', 'は', 'じしょ', 'です'],
    romaji: 'Sore wa jisho desu.',
    explanation: 'それ digunakan untuk menunjuk benda yang posisinya berada di dekat lawan bicara.',
  },
  {
    id: 'sb-l2-3',
    patternId: 'l2-p-4',
    targetIndonesian: 'Buku ini adalah milik saya.',
    hint: 'Bentuk menerangkan: この + ほん + は + わたし + の + です',
    scrambledWords: ['わたし', 'の', 'です', 'この', 'ほん', 'は'],
    correctOrder: ['この', 'ほん', 'は', 'わたし', 'の', 'です'],
    romaji: 'Kono hon wa watashi no desu.',
    explanation: 'この menempel langsung di depan kata benda ほん (buku ini). Kata わたしの (milik saya) adalah bentuk ringkas tanpa mengulang kata buku.',
  },
  {
    id: 'sb-l2-4',
    patternId: 'l2-p-6',
    targetIndonesian: 'Tas itu milik siapa?',
    hint: 'Susun: その + かばん + は + だれ + の + ですか',
    scrambledWords: ['だれ', 'の', 'ですか', 'その', 'かばん', 'は'],
    correctOrder: ['その', 'かばん', 'は', 'だれ', 'の', 'ですか'],
    romaji: 'Sono kaban wa dare no desu ka.',
    explanation: 'その menerangkan かばん (tas itu), lalu ditanyakan kepemilikannya dengan だれの (milik siapa).',
  },
  {
    id: 'sb-l2-5',
    patternId: 'l2-p-3',
    targetIndonesian: 'Bukan, bukan begitu.',
    hint: 'Penyangkalan konfirmasi: いいえ + そう + じゃ + ありません',
    scrambledWords: ['ありません', 'いいえ', 'じゃ', 'そう'],
    correctOrder: ['いいえ', 'そう', 'じゃ', 'ありません'],
    romaji: 'Iie, sou ja arimasen.',
    explanation: 'Ungkapan sopan standar untuk menyangkal tebakan lawan bicara mengenai identitas suatu benda.',
  },
  {
    id: 'sb-l2-6',
    patternId: 'l2-p-5',
    targetIndonesian: 'Apakah mobil itu (jauh) milik Miller?',
    hint: 'Susun: あの + くるま + は + ミラーさん + の + ですか',
    scrambledWords: ['ですか', 'あの', 'くるま', 'は', 'ミラーさん', 'の'],
    correctOrder: ['あの', 'くるま', 'は', 'ミラーさん', 'の', 'ですか'],
    romaji: 'Ano kuruma wa Miraa-san no desu ka.',
    explanation: 'あの menunjuk benda yang jauh dari pembicara maupun lawan bicara. Partikel の menunjukkan kepemilikan Tuan Miller.',
  },
  {
    id: 'sb-l2-7',
    patternId: 'l2-p-2',
    targetIndonesian: 'Ini apa? Ini adalah kunci.',
    hint: 'Tanya jawab: これ + は + 何 + ですか + かぎ + です',
    scrambledWords: ['何', 'これ', 'ですか', 'は', 'かぎ', 'です'],
    correctOrder: ['これ', 'は', '何', 'ですか', 'かぎ', 'です'],
    romaji: 'Kore wa nan desu ka. Kagi desu.',
    explanation: 'Pertanyaan menanyakan identitas benda dengan 何 (nan) dan dijawab langsung dengan nama bendanya.',
  },
]

export const INTERACTIVE_DIALOGUES_L2: InteractiveDialogue[] = [
  {
    id: 'l2-dlg-a',
    title: 'Dialog A — Menanyakan Benda Asing',
    context: 'Ali menanyakan benda yang sedang dipegang oleh Yamada di meja kantor.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Penanya' },
      { name: 'Yamada', avatar: 'JP', role: 'Rekan kantor lokal' },
    ],
    turns: [
      {
        id: 'l2-d1-t1',
        speaker: 'Ali',
        japanese: 'これは 何ですか。',
        romaji: 'Kore wa nan desu ka.',
        indonesian: 'Ini apa?',
      },
      {
        id: 'l2-d1-t2',
        speaker: 'Yamada',
        japanese: 'それは じしょです。',
        romaji: 'Sore wa jisho desu.',
        indonesian: 'Itu adalah kamus.',
      },
      {
        id: 'l2-d1-t3',
        speaker: 'Ali',
        japanese: '',
        romaji: '',
        indonesian: '',
        isUserTurn: true,
        options: [
          {
            text: 'そうですか。ありがとうございます。',
            romaji: 'Sou desu ka. Arigatou gozaimasu.',
            isCorrect: true,
            feedback: 'Sangat tepat! Ungkapan "そうですか" (Oh begitu) dan terima kasih sangat santun dalam etika kerja Jepang.',
          },
          {
            text: 'いいえ、そうじゃありません。',
            romaji: 'Iie, sou ja arimasen.',
            isCorrect: false,
            feedback: 'Kurang tepat. Ali yang bertanya, jadi tidak perlu menyangkal jawaban Yamada.',
          },
          {
            text: 'はじめまして。',
            romaji: 'Hajimemashite.',
            isCorrect: false,
            feedback: 'Kurang tepat. Hajimemashite hanya diucapkan saat perkenalan pertama kali.',
          },
        ],
      },
      {
        id: 'l2-d1-t4',
        speaker: 'Yamada',
        japanese: 'どういたしまして。',
        romaji: 'Dou itashimashite.',
        indonesian: 'Sama-sama.',
      },
    ],
  },
  {
    id: 'l2-dlg-b',
    title: 'Dialog B — Memastikan Pemilik Benda',
    context: 'Ali menemukan buku di meja dan memastikan apakah itu buku milik Miller.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Penemu buku' },
      { name: 'Santos', avatar: 'BR', role: 'Rekan kerja' },
    ],
    turns: [
      {
        id: 'l2-d2-t1',
        speaker: 'Ali',
        japanese: 'これは ミラーさんの ほんですか。',
        romaji: 'Kore wa Miraa-san no hon desu ka.',
        indonesian: 'Apakah ini buku Tuan Miller?',
      },
      {
        id: 'l2-d2-t2',
        speaker: 'Santos',
        japanese: 'いいえ、そうじゃありません。',
        romaji: 'Iie, sou ja arimasen.',
        indonesian: 'Bukan, bukan begitu.',
      },
      {
        id: 'l2-d2-t3',
        speaker: 'Ali',
        japanese: '',
        romaji: '',
        indonesian: '',
        isUserTurn: true,
        options: [
          {
            text: 'そうですか。だれの ほんですか。',
            romaji: 'Sou desu ka. Dare no hon desu ka.',
            isCorrect: true,
            feedback: 'Bagus sekali! Menanyakan pemilik sebenarnya menggunakan "だれの".',
          },
          {
            text: 'はい、そうです。',
            romaji: 'Hai, sou desu.',
            isCorrect: false,
            feedback: 'Kurang tepat. Santos baru saja menyangkal, sehingga tidak cocok menjawab "hai, sou desu".',
          },
        ],
      },
      {
        id: 'l2-d2-t4',
        speaker: 'Santos',
        japanese: 'それは サントスさんの ほんです。わたしの ほんです。',
        romaji: 'Sore wa Santosu-san no hon desu. Watashi no hon desu.',
        indonesian: 'Itu buku Santos. Buku milik saya.',
      },
    ],
  },
  {
    id: 'l2-dlg-c',
    title: 'Dialog C — Menanyakan Pemilik Tas',
    context: 'Miller menanyakan tas yang ditaruh di dekat tempat duduk Ali.',
    characters: [
      { name: 'Miller', avatar: 'US', role: 'Penanya' },
      { name: 'Ali', avatar: 'ID', role: 'Pemilik tas' },
    ],
    turns: [
      {
        id: 'l2-d3-t1',
        speaker: 'Miller',
        japanese: 'その かばんは だれのですか。',
        romaji: 'Sono kaban wa dare no desu ka.',
        indonesian: 'Tas itu milik siapa?',
      },
      {
        id: 'l2-d3-t2',
        speaker: 'Ali',
        japanese: '',
        romaji: '',
        indonesian: '',
        isUserTurn: true,
        options: [
          {
            text: 'わたしのです。',
            romaji: 'Watashi no desu.',
            isCorrect: true,
            feedback: 'Benar! Bentuk ringkas yang sangat alami dalam percakapan sehari-hari tanpa mengulang kata tas.',
          },
          {
            text: 'これは かばんです。',
            romaji: 'Kore wa kaban desu.',
            isCorrect: false,
            feedback: 'Kurang tepat. Miller menanyakan siapa pemiliknya, bukan apa nama bendanya.',
          },
        ],
      },
      {
        id: 'l2-d3-t3',
        speaker: 'Miller',
        japanese: 'そうですか。とても いい かばんですね。',
        romaji: 'Sou desu ka. Totemo ii kaban desu ne.',
        indonesian: 'Oh begitu. Tas yang sangat bagus ya.',
      },
      {
        id: 'l2-d3-t4',
        speaker: 'Ali',
        japanese: 'ありがとうございます。',
        romaji: 'Arigatou gozaimasu.',
        indonesian: 'Terima kasih banyak.',
      },
    ],
  },
  {
    id: 'l2-dlg-d',
    title: 'Dialog D — Menanyakan Bahasa & Kamus',
    context: 'Ali memeriksa buku dan kamus yang ada di perpustakaan kantor bersama Yamada.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Pembelajar' },
      { name: 'Yamada', avatar: 'JP', role: 'Rekan senior' },
    ],
    turns: [
      {
        id: 'l2-d4-t1',
        speaker: 'Ali',
        japanese: 'これは にほんごの ほんですか。',
        romaji: 'Kore wa nihongo no hon desu ka.',
        indonesian: 'Apakah ini buku bahasa Jepang?',
      },
      {
        id: 'l2-d4-t2',
        speaker: 'Yamada',
        japanese: 'はい、そうです。にほんごの ほんです。',
        romaji: 'Hai, sou desu. Nihongo no hon desu.',
        indonesian: 'Ya, benar. Ini buku bahasa Jepang.',
      },
      {
        id: 'l2-d4-t3',
        speaker: 'Ali',
        japanese: 'それは えいごの じしょですか。',
        romaji: 'Sore wa eigo no jisho desu ka.',
        indonesian: 'Apakah itu kamus bahasa Inggris?',
      },
      {
        id: 'l2-d4-t4',
        speaker: 'Yamada',
        japanese: '',
        romaji: '',
        indonesian: '',
        isUserTurn: true,
        options: [
          {
            text: 'いいえ、にほんごの じしょです。',
            romaji: 'Iie, nihongo no jisho desu.',
            isCorrect: true,
            feedback: 'Sempurna! Menyangkal sekaligus menyebutkan identitas benda yang sebenarnya.',
          },
          {
            text: 'はい、えいごです。',
            romaji: 'Hai, eigo desu.',
            isCorrect: false,
            feedback: 'Salah. Kamus tersebut adalah kamus bahasa Jepang, bukan bahasa Inggris.',
          },
        ],
      },
    ],
  },
]

export const VOCAB_MATCHING_PAIRS_L2: MatchingPair[] = [
  { id: 'l2-mp-1', japanese: 'ほん', romaji: 'hon', indonesian: 'Buku' },
  { id: 'l2-mp-2', japanese: 'じしょ', romaji: 'jisho', indonesian: 'Kamus' },
  { id: 'l2-mp-3', japanese: 'かさ', romaji: 'kasa', indonesian: 'Payung' },
  { id: 'l2-mp-4', japanese: 'とけい', romaji: 'tokei', indonesian: 'Jam / Arloji' },
  { id: 'l2-mp-5', japanese: 'かばん', romaji: 'kaban', indonesian: 'Tas' },
  { id: 'l2-mp-6', japanese: 'くるま', romaji: 'kuruma', indonesian: 'Mobil' },
  { id: 'l2-mp-7', japanese: 'かぎ', romaji: 'kagi', indonesian: 'Kunci' },
  { id: 'l2-mp-8', japanese: 'えんぴつ', romaji: 'enpitsu', indonesian: 'Pensil' },
]

export const PARTICLE_QUIZZES_L2: ParticleQuiz[] = [
  {
    id: 1,
    sentenceBefore: 'これは ',
    sentenceAfter: ' ですか。— かぎです。',
    options: ['何', 'だれ', 'どこ'],
    correct: '何',
    reason: 'Jawaban berupa nama benda ("kagi" / kunci), sehingga kata tanya yang tepat adalah 何 (nan/apa).',
    fullSentence: 'これは 何ですか。— かぎです。',
    romaji: 'Kore wa nan desu ka. - Kagi desu.',
    indonesian: 'Ini apa? — Kunci.',
  },
  {
    id: 2,
    sentenceBefore: 'その かばんは ',
    sentenceAfter: ' のですか。— わたしのです。',
    options: ['だれ', 'なん', 'どこ'],
    correct: 'だれ',
    reason: 'Gunakan だれ (siapa) + の untuk menanyakan pemilik benda.',
    fullSentence: 'その かばんは だれのですか。— わたしのです。',
    romaji: 'Sono kaban wa dare no desu ka. - Watashi no desu.',
    indonesian: 'Tas itu milik siapa? — Milik saya.',
  },
  {
    id: 3,
    sentenceBefore: 'これは わたし ',
    sentenceAfter: ' ほんです。',
    options: ['の', 'は', 'も'],
    correct: 'の',
    reason: 'Partikel の menghubungkan pemilik (わたし) dengan bendanya (ほん). わたしの ほん = buku saya.',
    fullSentence: 'これは わたしの ほんです。',
    romaji: 'Kore wa watashi no hon desu.',
    indonesian: 'Ini adalah buku saya.',
  },
  {
    id: 4,
    sentenceBefore: 'これは カメラですか。— はい、',
    sentenceAfter: '。',
    options: ['そうです', 'そうですか', 'ちがいます'],
    correct: 'そうです',
    reason: 'Gunakan そうです untuk mengiyakan atau membenarkan pertanyaan identitas benda.',
    fullSentence: 'これは カメラですか。— はい、そうです。',
    romaji: 'Kore wa kamera desu ka. - Hai, sou desu.',
    indonesian: 'Apakah ini kamera? — Ya, benar.',
  },
  {
    id: 5,
    sentenceBefore: 'これは じしょですか。— いいえ、そうじゃ ',
    sentenceAfter: '。',
    options: ['ありません', 'です', 'あります'],
    correct: 'ありません',
    reason: 'Penyangkalan sopan dari そうです adalah そうじゃありません (bukan begitu).',
    fullSentence: '这是 じしょですか。— いいえ、そうじゃありません。',
    romaji: 'Kore wa jisho desu ka. - Iie, sou ja arimasen.',
    indonesian: 'Apakah ini kamus? — Bukan, bukan begitu.',
  },
  {
    id: 6,
    sentenceBefore: '(',
    sentenceAfter: ') ほんは わたしのです。',
    options: ['この', 'これ', 'ここ'],
    correct: 'この',
    reason: 'Gunakan この karena langsung menempel sebelum kata benda ほん. これ tidak boleh menempel langsung ke kata benda.',
    fullSentence: 'この ほんは わたしのです。',
    romaji: 'Kono hon wa watashi no desu.',
    indonesian: 'Buku ini milik saya.',
  },
]

export const TRANSLATE_QUIZZES_L2: TranslateQuiz[] = [
  {
    id: 1,
    indonesian: 'Ini adalah buku.',
    japanese: 'これは ほんです。',
    romaji: 'Kore wa hon desu.',
  },
  {
    id: 2,
    indonesian: 'Itu (dekat lawan bicara) apa?',
    japanese: 'それは 何ですか。',
    romaji: 'Sore wa nan desu ka.',
  },
  {
    id: 3,
    indonesian: 'Buku ini milik saya.',
    japanese: 'この ほんは わたしのです。',
    romaji: 'Kono hon wa watashi no desu.',
  },
  {
    id: 4,
    indonesian: 'Apakah itu kamus? Ya, benar.',
    japanese: 'それは じしょですか。はい、そうです。',
    romaji: 'Sore wa jisho desu ka. Hai, sou desu.',
  },
  {
    id: 5,
    indonesian: 'Payung itu milik siapa?',
    japanese: 'その かさは だれのですか。',
    romaji: 'Sono kasa wa dare no desu ka.',
  },
  {
    id: 6,
    indonesian: 'Itu bukan kamera.',
    japanese: 'それは カメラじゃありません。',
    romaji: 'Sore wa kamera ja arimasen.',
  },
]

export const EVERYDAY_SITUATIONS: EverydaySituation[] = [
  { id: 'sit-1', situation: 'Menunjuk benda di tangan sendiri', japanese: 'これは わたしの かぎです。', romaji: 'Kore wa watashi no kagi desu.', meaning: 'Ini kunci saya.' },
  { id: 'sit-2', situation: 'Menanyakan benda di dekat teman', japanese: 'それは 何ですか。', romaji: 'Sore wa nan desu ka.', meaning: 'Itu apa?' },
  { id: 'sit-3', situation: 'Menunjuk benda di kejauhan', japanese: 'あれは わたしの くるまです。', romaji: 'Are wa watashi no kuruma desu.', meaning: 'Itu mobil saya.' },
  { id: 'sit-4', situation: 'Menanyakan pemilik buku', japanese: 'この ほんは だれのですか。', romaji: 'Kono hon wa dare no desu ka.', meaning: 'Buku ini milik siapa?' },
  { id: 'sit-5', situation: 'Menjawab kepemilikan singkat', japanese: 'わたしのです。', romaji: 'Watashi no desu.', meaning: 'Milik saya.' },
  { id: 'sit-6', situation: 'Menanyakan jenis buku', japanese: 'その ほんは にほんごの ほんですか。', romaji: 'Sono hon wa nihongo no hon desu ka.', meaning: 'Apakah buku itu buku bahasa Jepang?' },
]

export const COMMON_MISTAKES_L2 = [
  {
    id: 'cm-1',
    wrong: 'この です (Kono desu)',
    correct: 'これ です (Kore desu)',
    explanation: 'この (kono) tidak boleh berdiri sendiri tanpa kata benda. Gunakan これ (kore) jika berdiri sendiri.',
  },
  {
    id: 'cm-2',
    wrong: 'これ ほんです (Kore hon desu)',
    correct: 'これは ほんです (Kore wa hon desu)',
    explanation: 'Jangan lupakan partikel topik は (wa) setelah kata tunjuk これ.',
  },
  {
    id: 'cm-3',
    wrong: 'Menghitung jarak dalam meter secara kaku',
    correct: 'Berdasarkan zona pembicara vs lawan bicara',
    explanation: 'これ dekat pembicara; それ dekat lawan bicara; あれ jauh dari keduanya (bukan ditentukan oleh angka meter tertentu).',
  },
  {
    id: 'cm-4',
    wrong: 'Mengulang kata benda yang sudah jelas',
    correct: 'わたしのです (Watashi no desu)',
    explanation: 'Jika sudah jelas berbicara tentang tas, cukup katakan わたしのです (milik saya), tidak perlu わたしの かばんです.',
  },
  {
    id: 'cm-5',
    wrong: 'Tertukar antara そうですか dan そうです',
    correct: 'そうです (Ya benar) vs そうですか (Oh, begitu)',
    explanation: 'そうです digunakan untuk membenarkan jawaban. Sedangkan そうですか digunakan saat menerima informasi baru ("Oh, begitu ya").',
  },
]

export const DEMONSTRATIVE_QUIZZES: DemonstrativeQuiz[] = [
  {
    id: 1,
    context: 'Benda berada di tangan sendiri (dekat pembicara)',
    sentenceBefore: '(',
    sentenceAfter: ') は ほんです。',
    options: ['これ', 'それ', 'あれ'],
    correct: 'これ',
    reason: 'Gunakan これ karena benda berada di tangan sendiri / dekat dengan pembicara.',
    fullSentence: 'これは ほんです。',
    romaji: 'Kore wa hon desu.',
    indonesian: 'Ini adalah buku.',
  },
  {
    id: 2,
    context: 'Benda berada di dekat lawan bicara',
    sentenceBefore: '(',
    sentenceAfter: ') は かばんです。',
    options: ['これ', 'それ', 'あれ'],
    correct: 'それ',
    reason: 'Gunakan それ karena benda berada di dekat lawan bicara.',
    fullSentence: 'それは かばんです。',
    romaji: 'Sore wa kaban desu.',
    indonesian: 'Itu adalah tas.',
  },
  {
    id: 3,
    context: 'Benda berada jauh dari kedua orang',
    sentenceBefore: '(',
    sentenceAfter: ') は くるまです。',
    options: ['これ', 'それ', 'あれ'],
    correct: 'あれ',
    reason: 'Gunakan あれ karena benda berada di kejauhan dari pembicara maupun lawan bicara.',
    fullSentence: 'あれは くるまです。',
    romaji: 'Are wa kuruma desu.',
    indonesian: 'Itu adalah mobil.',
  },
  {
    id: 4,
    context: 'Diikuti langsung oleh kata benda じしょ (kamus)',
    sentenceBefore: '(',
    sentenceAfter: ') じしょは わたしのです。',
    options: ['この', 'これ'],
    correct: 'この',
    reason: 'Harus menggunakan この karena langsung diikuti oleh kata benda (じしょ). これ tidak boleh menempel langsung di depan kata benda.',
    fullSentence: 'この じしょは わたしのです。',
    romaji: 'Kono jisho wa watashi no desu.',
    indonesian: 'Kamus ini milik saya.',
  },
  {
    id: 5,
    context: 'Menanyakan benda dekat lawan bicara (berdiri sendiri)',
    sentenceBefore: '(',
    sentenceAfter: ') は 何ですか。',
    options: ['その', 'それ'],
    correct: 'それ',
    reason: 'Menggunakan それ karena berdiri sendiri sebagai subjek sebelum partikel は. その harus diikuti kata benda.',
    fullSentence: 'それは 何ですか。',
    romaji: 'Sore wa nan desu ka.',
    indonesian: 'Itu apa?',
  },
  {
    id: 6,
    context: 'Menunjuk orang di kejauhan (diikuti kata ひと)',
    sentenceBefore: '(',
    sentenceAfter: ') ひとは せんせいです。',
    options: ['あの', 'あれ'],
    correct: 'あの',
    reason: 'Menggunakan あの karena diikuti kata benda (ひと / orang). あのひと = orang itu.',
    fullSentence: 'あの ひとは せんせいです。',
    romaji: 'Ano hito wa sensei desu.',
    indonesian: 'Orang itu adalah guru.',
  },
]

export const FILL_BLANK_QUIZZES_L2: FillBlankQuizL2[] = [
  {
    id: 1,
    sentence: 'これは ______ ですか。',
    hint: 'Kata tanya "apa"',
    answer: 'なん',
    romaji: 'Kore wa nan desu ka.',
    meaning: 'Ini apa?',
  },
  {
    id: 2,
    sentence: 'その ほんは ______ のですか。',
    hint: 'Kata tanya "siapa"',
    answer: 'だれ',
    romaji: 'Sono hon wa dare no desu ka.',
    meaning: 'Buku itu milik siapa?',
  },
  {
    id: 3,
    sentence: 'これは わたし ______ ほんです。',
    hint: 'Partikel kepemilikan',
    answer: 'の',
    romaji: 'Kore wa watashi no hon desu.',
    meaning: 'Ini buku milik saya.',
  },
  {
    id: 4,
    sentence: '这是 カメラですか。— はい、______。',
    hint: 'Jawaban konfirmasi "ya, benar"',
    answer: 'そうです',
    romaji: 'Hai, sou desu.',
    meaning: 'Ya, benar.',
  },
  {
    id: 5,
    sentence: 'これは じしょですか。— いいえ、そうじゃ ______。',
    hint: 'Lanjutan bentuk negatif sopan',
    answer: 'ありません',
    romaji: 'Iie, sou ja arimasen.',
    meaning: 'Bukan, bukan begitu.',
  },
]

export const WORD_SCRAMBLE_QUIZZES: WordScrambleQuiz[] = [
  {
    id: 1,
    scrambledWords: ['です', 'これ', 'ほん', 'は'],
    correctSentence: 'これは ほんです。',
    romaji: 'Kore wa hon desu.',
    indonesian: 'Ini adalah buku.',
  },
  {
    id: 2,
    scrambledWords: ['その', 'かばんは', 'だれの', 'ですか'],
    correctSentence: 'その かばんは だれのですか。',
    romaji: 'Sono kaban wa dare no desu ka.',
    indonesian: 'Tas itu milik siapa?',
  },
  {
    id: 3,
    scrambledWords: ['この', 'じしょは', 'わたしの', 'です'],
    correctSentence: 'この じしょは わたしのです。',
    romaji: 'Kono jisho wa watashi no desu.',
    indonesian: 'Kamus ini milik saya.',
  },
  {
    id: 4,
    scrambledWords: ['いいえ、', 'そうじゃ', 'ありません。'],
    correctSentence: 'いいえ、そうじゃ ありません。',
    romaji: 'Iie, sou ja arimasen.',
    indonesian: 'Bukan, bukan begitu.',
  },
]

export const EVALUATION_INDICATORS_L2: EvaluationIndicator[] = [
  { id: 'l2-eval-1', label: 'Saya dapat membedakan penggunaan これ・それ・あれ berdasarkan posisi.' },
  { id: 'l2-eval-2', label: 'Saya dapat menggunakan この・その・あの yang menempel sebelum kata benda.' },
  { id: 'l2-eval-3', label: 'Saya dapat bertanya menggunakan 何ですか (nan desu ka).' },
  { id: 'l2-eval-4', label: 'Saya dapat menjawab konfirmasi dengan そうです / そうじゃありません.' },
  { id: 'l2-eval-5', label: 'Saya dapat menyatakan kepemilikan benda dengan partikel の.' },
  { id: 'l2-eval-6', label: 'Saya dapat menanyakan pemilik menggunakan だれの (dare no).' },
  { id: 'l2-eval-7', label: 'Saya dapat membuat dialog sederhana tentang identitas dan kepemilikan benda.' },
]

export const STUDY_PLAN_5_DAYS_L2: StudyPlanDay[] = [
  {
    day: 1,
    title: 'Hari 1: Kosakata Benda Sehari-hari',
    focus: 'Mengenal nama benda di sekitar kelas dan kantor.',
    tasks: [
      'Hafalkan 15–20 nama benda (hon, jisho, kaban, tokei, kuruma, dll).',
      'Gunakan kartu flashcards untuk melatih daya ingat visual dan audio.',
    ],
  },
  {
    day: 2,
    title: 'Hari 2: Pola これ・それ・あれ',
    focus: 'Menunjuk benda berdasarkan posisi pembicara dan lawan bicara.',
    tasks: [
      'Latih rumus これ/それ/あれ + は + Kata Benda + です.',
      'Tunjuk 5 benda di mejamu dan ucapkan kalimatnya dengan suara keras.',
    ],
  },
  {
    day: 3,
    title: 'Hari 3: Pola この・その・あの + Kata Benda',
    focus: 'Menerangkan benda spesifik.',
    tasks: [
      'Pahami perbedaan wajib: これほんです (SALAH) vs この ほんです (BENAR).',
      'Buat 10 frasa benda dengan kono, sono, dan ano.',
    ],
  },
  {
    day: 4,
    title: 'Hari 4: Konfirmasi そうです & Kepemilikan の',
    focus: 'Tanya jawab identitas benda dan kepemilikan.',
    tasks: [
      'Latih pertanyaan: これは 何ですか dan jawabannya.',
      'Gunakan だれの untuk menanyakan pemilik benda.',
      'Gunakan そうです untuk mengiyakan dan そうじゃありません untuk menyangkal.',
    ],
  },
  {
    day: 5,
    title: 'Hari 5: Review, Dialog & Evaluasi Mandiri',
    focus: 'Praktik dialog dan pengujian pemahaman.',
    tasks: [
      'Praktikkan Dialog A, B, C, dan D.',
      'Selesaikan Latihan A, B, C, dan D.',
      'Centang Evaluasi Mandiri Bab 2 (minimal 6 dari 7 indikator tercapai).',
    ],
  },
]
