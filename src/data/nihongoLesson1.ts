export interface JapaneseGreeting {
  id: string
  japanese: string
  romaji: string
  meaning: string
  context?: string
}

export interface JapaneseVocab {
  id: string
  japanese: string
  romaji: string
  meaning: string
  category: 'Orang & Sapaan' | 'Profesi' | 'Tempat & Instansi' | 'Negara & Kebangsaan' | 'Kata Tanya & Respons'
  notes?: string
}

export interface SentenceBreakdownToken {
  token: string
  furigana?: string
  romaji: string
  role: string
  meaning: string
  color?: string
}

export interface CommonMistakeItem {
  wrong: string
  correct: string
  explanation: string
}

export interface MiniExerciseItem {
  question: string
  options: string[]
  answer: string
  explanation: string
}

export interface GrammarExample {
  japanese: string
  romaji: string
  meaning: string
}

export interface GrammarPattern {
  id: string
  number: number
  title: string
  formula: string
  functionDesc: string
  structureFormula?: string[]
  breakdownExample?: {
    japanese: string
    romaji: string
    meaning: string
    tokens: SentenceBreakdownToken[]
  }
  examples: GrammarExample[]
  usageScenario?: string
  commonMistakes?: CommonMistakeItem[]
  miniExercise?: MiniExerciseItem
  notes?: string
}

export interface DialogueLine {
  speaker: string
  japanese: string
  romaji: string
  indonesian: string
}

export interface Dialogue {
  id: string
  title: string
  context: string
  lines: DialogueLine[]
}

export interface DialogueTurn {
  id: string
  speaker: string
  japanese: string
  romaji: string
  indonesian: string
  isUserTurn?: boolean
  options?: {
    text: string
    romaji: string
    isCorrect: boolean
    feedback: string
  }[]
}

export interface InteractiveDialogue {
  id: string
  title: string
  context: string
  characters: { name: string; avatar: string; role: string }[]
  turns: DialogueTurn[]
}

export interface SentenceBuilderChallenge {
  id: string
  patternId: string
  targetIndonesian: string
  hint?: string
  scrambledWords: string[]
  correctOrder: string[]
  romaji: string
  explanation: string
}

export interface MatchingPair {
  id: string
  japanese: string
  romaji: string
  indonesian: string
}

export interface LessonSession {
  id: string
  number: number
  title: string
  subtitle: string
  icon: string
  durationMinutes: number
  description: string
}

export interface ParticleQuiz {
  id: number
  sentenceBefore: string
  sentenceAfter: string
  options: string[]
  correct: string
  reason: string
  fullSentence: string
  romaji: string
  indonesian: string
}

export interface TranslateQuiz {
  id: number
  indonesian: string
  japanese: string
  romaji: string
}

export interface EvaluationIndicator {
  id: string
  label: string
}

export interface StudyPlanDay {
  day: number
  title: string
  focus: string
  tasks: string[]
}

export const LESSON_META = {
  course: '日本語 • PELAJARAN 01',
  title: 'BAB 1 — PERKENALAN DIRI',
  subtitle: 'Panduan Belajar Bahasa Jepang Interaktif untuk Pemula',
  curriculum: 'Kurikulum standar Minna no Nihongo I diperkaya metode interaktif Duolingo',
  description: 'Pengenalan diri formal & kasual, partikel dasar (は, も, の), dan tata bahasa penting disertai latihan aktif.',
  targets: [
    { title: 'Memperkenalkan Diri', result: 'Mampu menyebutkan nama, asal negara, profesi, dan usia.' },
    { title: 'Salam & Etika', result: 'Menguasai 9 salam pokok dan etika sapaan bahasa Jepang.' },
    { title: 'Struktur Kalimat Dasar', result: 'Memahami fungsi topik (は), kopula (です/じゃありません), dan tanya (か).' },
    { title: 'Koneksi & Kepemilikan', result: 'Mampu menggunakan partikel kesamaan (も) dan afiliasi/pemilik (の).' },
  ],
}

export const LESSON_SESSIONS_L1: LessonSession[] = [
  {
    id: 's-1',
    number: 1,
    title: 'Pengantar Bab 1',
    subtitle: 'Tujuan & Peta Pembelajaran',
    icon: '',
    durationMinutes: 5,
    description: 'Pahami sasaran kompetensi, struktur kurikulum, dan peta konsep yang akan Anda kuasai.',
  },
  {
    id: 's-2',
    number: 2,
    title: 'Salam Dasar (あいさつ)',
    subtitle: '9 Ungkapan Sapaan Pokok',
    icon: '',
    durationMinutes: 10,
    description: 'Kuasai salam penting dari pagi hingga malam dengan pelafalan audio penutur asli.',
  },
  {
    id: 's-3',
    number: 3,
    title: 'Kosakata Inti (単語)',
    subtitle: '26 Kata Kunci & Drill Flashcard',
    icon: '',
    durationMinutes: 15,
    description: 'Pelajari kata benda, profesi, dan kebangsaan menggunakan kartu bolak-balik interaktif.',
  },
  {
    id: 's-4',
    number: 4,
    title: 'Tata Bahasa Visual (文法)',
    subtitle: '7 Pola & Pemecahan Komponen',
    icon: '',
    durationMinutes: 20,
    description: 'Bongkar struktur kalimat blok demi blok: [Topik] + [は] + [Info] + [です] dengan contoh nyata & koreksi kekeliruan umum.',
  },
  {
    id: 's-5',
    number: 5,
    title: 'Susun Kalimat (Sentence Builder)',
    subtitle: 'Tantangan Balok Kata Interaktif',
    icon: '',
    durationMinutes: 15,
    description: 'Susun balok-balok kata acak menjadi kalimat bahasa Jepang yang sempurna dengan umpan balik edukatif.',
  },
  {
    id: 's-6',
    number: 6,
    title: 'Praktik Percakapan (会話)',
    subtitle: 'Simulasi Dialog & Roleplay Karakter',
    icon: '',
    durationMinutes: 15,
    description: 'Pilih karakter (Ali atau Miller), jalankan percakapan langkah demi langkah, dan tentukan respons yang tepat.',
  },
  {
    id: 's-7',
    number: 7,
    title: 'Latihan & Kuis Terpadu',
    subtitle: 'Uji Partikel, Terjemahan & Pasang Kata',
    icon: '',
    durationMinutes: 15,
    description: 'Uji kemampuan aktif dengan kuis partikel, tebak terjemahan, dan menjodohkan pasangan kata.',
  },
  {
    id: 's-8',
    number: 8,
    title: 'Rangkuman & Kelulusan',
    subtitle: 'Skor Akurasi, XP & Evaluasi Capaian',
    icon: '',
    durationMinutes: 10,
    description: 'Tinjau pencapaian Anda, periksa topik yang perlu diulang, dan klaim kelulusan Bab 1.',
  },
]

export const GREETINGS_DATA: JapaneseGreeting[] = [
  {
    id: 'g-1',
    japanese: 'おはようございます',
    romaji: 'ohayou gozaimasu',
    meaning: 'Selamat pagi (sopan)',
    context: 'Diucapkan saat pagi hari hingga sekitar jam 10 pagi kepada rekan kerja, guru, atau atasan.',
  },
  {
    id: 'g-2',
    japanese: 'こんにちは',
    romaji: 'konnichiwa',
    meaning: 'Selamat siang / Halo',
    context: 'Salam umum saat siang hari hingga sore (dari jam 10 pagi hingga matahari terbenam).',
  },
  {
    id: 'g-3',
    japanese: 'こんばんは',
    romaji: 'konbanwa',
    meaning: 'Selamat malam',
    context: 'Salam saat malam hari saat bertemu seseorang (bukan saat hendak tidur).',
  },
  {
    id: 'g-4',
    japanese: 'はじめまして',
    romaji: 'hajimemashite',
    meaning: 'Salam saat pertama kali bertemu',
    context: 'Berasal dari kata "hajime" (awal/perdana). Awali setiap perkenalan diri dengan ungkapan ini.',
  },
  {
    id: 'g-5',
    japanese: 'どうぞよろしく おねがいします',
    romaji: 'douzo yoroshiku onegaishimasu',
    meaning: 'Mohon kerja samanya / Senang berkenalan',
    context: 'Kalimat penutup wajib dalam perkenalan resmi maupun kasual di Jepang.',
  },
  {
    id: 'g-6',
    japanese: 'ありがとうございます',
    romaji: 'arigatou gozaimasu',
    meaning: 'Terima kasih banyak (sopan)',
    context: 'Ungkapan rasa terima kasih dalam bentuk sopan dan formal.',
  },
  {
    id: 'g-7',
    japanese: 'すみません',
    romaji: 'sumimasen',
    meaning: 'Permisi / Maaf / Terima kasih atas repotnya',
    context: 'Dapat digunakan untuk memanggil pelayan restoran, meminta izin lewat, atau meminta maaf ringan.',
  },
  {
    id: 'g-8',
    japanese: 'はい',
    romaji: 'hai',
    meaning: 'Ya / Benar / Siap',
    context: 'Jawaban mengiyakan, atau tanda aktif menyimak ucapan lawan bicara (aizuchi).',
  },
  {
    id: 'g-9',
    japanese: 'いいえ',
    romaji: 'iie',
    meaning: 'Tidak / Bukan / Sama-sama',
    context: 'Jawaban menyangkal atau "tidak masalah" saat dipuji atau diberi ucapan terima kasih.',
  },
]

export const VOCABULARIES_DATA: JapaneseVocab[] = [
  { id: 'v-1', japanese: 'わたし', romaji: 'watashi', meaning: 'Saya', category: 'Orang & Sapaan', notes: 'Kata ganti orang pertama paling umum dan netral untuk pria maupun wanita.' },
  { id: 'v-2', japanese: 'あなた', romaji: 'anata', meaning: 'Anda', category: 'Orang & Sapaan', notes: 'Gunakan dengan hati-hati; menyebut nama lawan bicara + さん jauh lebih sopan dan alami.' },
  { id: 'v-3', japanese: 'あのひと', romaji: 'ano hito', meaning: 'Orang itu', category: 'Orang & Sapaan' },
  { id: 'v-4', japanese: 'あのかた', romaji: 'ano kata', meaning: 'Orang itu (lebih sopan/beliau)', category: 'Orang & Sapaan', notes: 'Bentuk sopan dari あのひと.' },
  { id: 'v-5', japanese: 'みなさん', romaji: 'minasan', meaning: 'Semuanya / Saudara-saudara', category: 'Orang & Sapaan' },
  { id: 'v-6', japanese: '～さん', romaji: '-san', meaning: 'Sapaan sopan setelah nama', category: 'Orang & Sapaan', notes: 'PENTING: Jangan tempelkan pada nama sendiri!' },
  
  { id: 'v-7', japanese: 'せんせい', romaji: 'sensei', meaning: 'Guru / Pengajar / Dokter', category: 'Profesi', notes: 'Panggilan hormat untuk guru/dokter. Jangan menyebut diri sendiri "sensei".' },
  { id: 'v-8', japanese: 'がくせい', romaji: 'gakusei', meaning: 'Pelajar / Mahasiswa', category: 'Profesi' },
  { id: 'v-9', japanese: 'かいしゃいん', romaji: 'kaishain', meaning: 'Karyawan kantor', category: 'Profesi' },
  { id: 'v-10', japanese: 'しゃいん', romaji: 'shain', meaning: 'Karyawan suatu perusahaan', category: 'Profesi', notes: 'Didahului nama perusahaan (contoh: IMCの しゃいん).' },
  { id: 'v-11', japanese: 'ぎんこういん', romaji: 'ginkouin', meaning: 'Pegawai bank', category: 'Profesi' },
  { id: 'v-12', japanese: 'いしゃ', romaji: 'isha', meaning: 'Dokter', category: 'Profesi' },
  { id: 'v-13', japanese: 'エンジニア', romaji: 'enjinia', meaning: 'Insinyur / Engineer', category: 'Profesi' },
  { id: 'v-14', japanese: 'けんきゅうしゃ', romaji: 'kenkyuusha', meaning: 'Peneliti / Riset', category: 'Profesi' },

  { id: 'v-15', japanese: 'だいがく', romaji: 'daigaku', meaning: 'Universitas / Perguruan tinggi', category: 'Tempat & Instansi' },
  { id: 'v-16', japanese: 'びょういん', romaji: 'byouin', meaning: 'Rumah sakit', category: 'Tempat & Instansi' },
  { id: 'v-17', japanese: 'かいしゃ', romaji: 'kaisha', meaning: 'Perusahaan / Kantor', category: 'Tempat & Instansi' },

  { id: 'v-18', japanese: 'にほん', romaji: 'Nihon', meaning: 'Jepang', category: 'Negara & Kebangsaan' },
  { id: 'v-19', japanese: 'インドネシア', romaji: 'Indoneshia', meaning: 'Indonesia', category: 'Negara & Kebangsaan' },
  { id: 'v-20', japanese: 'アメリカ', romaji: 'Amerika', meaning: 'Amerika Serikat', category: 'Negara & Kebangsaan' },
  { id: 'v-21', japanese: '～じん', romaji: '-jin', meaning: 'Orang berkebangsaan ...', category: 'Negara & Kebangsaan', notes: 'Nama negara + じん = kebangsaan (contoh: にほんじん).' },

  { id: 'v-22', japanese: 'なんさい', romaji: 'nansai', meaning: 'Berapa umur?', category: 'Kata Tanya & Respons' },
  { id: 'v-23', japanese: 'おいくつ', romaji: 'oikutsu', meaning: 'Berapa usia? (lebih sopan)', category: 'Kata Tanya & Respons' },
  { id: 'v-24', japanese: 'だれ', romaji: 'dare', meaning: 'Siapa?', category: 'Kata Tanya & Respons' },
  { id: 'v-25', japanese: 'どなた', romaji: 'donata', meaning: 'Siapa? (lebih sopan)', category: 'Kata Tanya & Respons' },
  { id: 'v-26', japanese: 'はい / いいえ', romaji: 'hai / iie', meaning: 'Ya / Tidak', category: 'Kata Tanya & Respons' },
]

export const GRAMMAR_PATTERNS_DATA: GrammarPattern[] = [
  {
    id: 'p-1',
    number: 1,
    title: 'A は B です',
    formula: 'Topik (A) + は (wa) + Informasi (B) + です (desu)。',
    functionDesc: 'Menyatakan identitas, profesi, kebangsaan, atau informasi sederhana ("A adalah B"). Partikel は ditulis dengan huruf hiragana "ha", tetapi diucapkan "wa" saat berfungsi sebagai penanda topik kalimat.',
    structureFormula: ['[Topik (A)]', '[は (wa)]', '[Informasi (B)]', '[です (desu)]'],
    breakdownExample: {
      japanese: 'わたしは がくせいです。',
      romaji: 'Watashi wa gakusei desu.',
      meaning: 'Saya adalah mahasiswa.',
      tokens: [
        { token: 'わたし', romaji: 'watashi', role: 'Topik / Subjek', meaning: 'Saya', color: 'bg-neutral-900 text-white' },
        { token: 'は', romaji: 'wa', role: 'Partikel Penanda Topik', meaning: 'Mengenai / Adalah', color: 'bg-emerald-600 text-white' },
        { token: 'がくせい', romaji: 'gakusei', role: 'Informasi Predikat', meaning: 'Mahasiswa / Pelajar', color: 'bg-blue-600 text-white' },
        { token: 'です', romaji: 'desu', role: 'Kopula Sopan', meaning: 'Penutup Sopan', color: 'bg-amber-600 text-white' },
      ],
    },
    examples: [
      { japanese: 'わたしは エンジニアです。', romaji: 'Watashi wa enjinia desu.', meaning: 'Saya seorang engineer.' },
      { japanese: 'わたしは がくせいです。', romaji: 'Watashi wa gakusei desu.', meaning: 'Saya mahasiswa.' },
      { japanese: 'ミラーさんは せんせいです。', romaji: 'Miraa-san wa sensei desu.', meaning: 'Miller adalah guru.' },
      { japanese: 'サントスさんは ブラジルじんです。', romaji: 'Santosu-san wa Burajiru-jin desu.', meaning: 'Santos orang Brasil.' },
    ],
    usageScenario: 'Digunakan saat memperkenalkan diri secara sopan pada pertemuan pertama, sesi orientasi kerja, atau percakapan formal.',
    commonMistakes: [
      {
        wrong: 'わたし がくせい です (Lupa partikel は)',
        correct: 'わたしは がくせいです。',
        explanation: 'Partikel は mutlak diperlukan untuk menetapkan subjek/topik yang dibahas.',
      },
      {
        wrong: 'わたしは がくせい (Lupa です di situasi sopan)',
        correct: 'わたしは がくせいです。',
        explanation: 'Tanpa です, kalimat menjadi bahasa kasual yang kurang sopan untuk orang baru.',
      },
    ],
    miniExercise: {
      question: 'Pilih partikel yang tepat: わたし ____ エンジニアです。',
      options: ['は', 'の', 'も'],
      answer: 'は',
      explanation: 'Partikel は menandai "わたし" sebagai topik utama yang sedang dibicarakan.',
    },
  },
  {
    id: 'p-2',
    number: 2,
    title: 'A は B じゃありません',
    formula: 'Topik (A) + は + B + じゃありません (ja arimasen)。',
    functionDesc: 'Bentuk negatif sopan yang umum dalam percakapan sehari-hari ("A bukan B"). Bentuk yang lebih formal/tertulis adalah ではありません (dewa arimasen).',
    structureFormula: ['[Topik (A)]', '[は (wa)]', '[Informasi (B)]', '[じゃありません]'],
    breakdownExample: {
      japanese: 'わたしは せんせいじゃありません。',
      romaji: 'Watashi wa sensei ja arimasen.',
      meaning: 'Saya bukan guru.',
      tokens: [
        { token: 'わたし', romaji: 'watashi', role: 'Topik', meaning: 'Saya', color: 'bg-neutral-900 text-white' },
        { token: 'は', romaji: 'wa', role: 'Partikel', meaning: 'Penanda Topik', color: 'bg-emerald-600 text-white' },
        { token: 'せんせい', romaji: 'sensei', role: 'Predikat yang disangkal', meaning: 'Guru', color: 'bg-blue-600 text-white' },
        { token: 'じゃありません', romaji: 'ja arimasen', role: 'Bentuk Negatif Sopan', meaning: 'Bukan', color: 'bg-rose-600 text-white' },
      ],
    },
    examples: [
      { japanese: 'わたしは せんせいじゃありません。', romaji: 'Watashi wa sensei ja arimasen.', meaning: 'Saya bukan guru.' },
      { japanese: 'ミラーさんは がくせいじゃありません。', romaji: 'Miraa-san wa gakusei ja arimasen.', meaning: 'Miller bukan mahasiswa.' },
    ],
    usageScenario: 'Mengoreksi salah sangka mengenai profesi, status, atau kewarganegaraan Anda.',
    commonMistakes: [
      {
        wrong: 'わたしは せんせいない (Bentuk kasual kasar)',
        correct: 'わたしは せんせいじゃありません。',
        explanation: 'Gunakan selalu じゃありません untuk percakapan sopan kepada orang yang baru dikenal.',
      },
    ],
    miniExercise: {
      question: 'Bagaimana mengatakan "Saya bukan dokter" secara sopan?',
      options: ['わたしは いしゃじゃありません。', 'わたしは いしゃです。', 'わたしは いしゃではありませんでした。'],
      answer: 'わたしは いしゃじゃありません。',
      explanation: 'Ganti kopula です menjadi じゃありません untuk menyangkal status dokter.',
    },
    notes: 'Catatan: じゃありません tidak berarti "tidak ada", melainkan menyangkal identitas atau kategori nomina.',
  },
  {
    id: 'p-3',
    number: 3,
    title: 'A は B ですか',
    formula: 'Topik (A) + は + B + ですか (desu ka)？',
    functionDesc: 'Membuat pertanyaan ya/tidak ("Apakah A adalah B?"). Partikel か di akhir kalimat sudah menandai kalimat tanya sehingga tanda baca tanya (?) tidak wajib di teks formal.',
    structureFormula: ['[Topik (A)]', '[は (wa)]', '[Informasi (B)]', '[ですか]'],
    breakdownExample: {
      japanese: 'あなたは がくせいですか。',
      romaji: 'Anata wa gakusei desu ka.',
      meaning: 'Apakah Anda mahasiswa?',
      tokens: [
        { token: 'あなた', romaji: 'anata', role: 'Topik Lawan Bicara', meaning: 'Anda', color: 'bg-neutral-900 text-white' },
        { token: 'は', romaji: 'wa', role: 'Partikel', meaning: 'Penanda Topik', color: 'bg-emerald-600 text-white' },
        { token: 'がくせい', romaji: 'gakusei', role: 'Hal yang ditanyakan', meaning: 'Mahasiswa', color: 'bg-blue-600 text-white' },
        { token: 'ですか', romaji: 'desu ka', role: 'Partikel Tanya Sopan', meaning: 'Apakah benar?', color: 'bg-purple-600 text-white' },
      ],
    },
    examples: [
      { japanese: 'あなたは がくせいですか。', romaji: 'Anata wa gakusei desu ka.', meaning: 'Apakah Anda mahasiswa?' },
      { japanese: 'はい、がくせいです。', romaji: 'Hai, gakusei desu.', meaning: 'Ya, saya mahasiswa.' },
      { japanese: 'ミラーさんは いしゃですか。', romaji: 'Miraa-san wa isha desu ka.', meaning: 'Apakah Miller dokter?' },
      { japanese: 'いいえ、いしゃじゃありません。', romaji: 'Iie, isha ja arimasen.', meaning: 'Tidak, bukan dokter.' },
    ],
    usageScenario: 'Mengonfirmasi pekerjaan atau kebangsaan seseorang dalam percakapan.',
    commonMistakes: [
      {
        wrong: 'あなたは がくせいです (Tanpa か)',
        correct: 'あなたは がくせいですか。',
        explanation: 'Tanpa partikel か, kalimat tersebut merupakan pernyataan deklaratif, bukan pertanyaan.',
      },
    ],
    miniExercise: {
      question: 'Bagaimana menjawab "Ya, benar saya mahasiswa" saat ditanya "がくせいですか"?',
      options: ['はい、がくせいです。', 'いいえ、がくせいです。', 'はい、がくせいじゃありません。'],
      answer: 'はい、がくせいです。',
      explanation: 'Gunakan "はい" (ya) diikuti pernyataan penegas "がくせいです".',
    },
  },
  {
    id: 'p-4',
    number: 4,
    title: 'A も B です',
    formula: 'Topik kedua (A) + も (mo) + B + です。',
    functionDesc: 'Partikel も berarti "juga". Partikel ini MENGGANTIKAN partikel は ketika informasi predikat yang sama berlaku untuk topik berikutnya.',
    structureFormula: ['[Topik Kedua (A)]', '[も (mo)]', '[Predikat Sama (B)]', '[です]'],
    breakdownExample: {
      japanese: 'アリさんも インドネシアじんです。',
      romaji: 'Ari-san mo Indoneshia-jin desu.',
      meaning: 'Ali juga orang Indonesia.',
      tokens: [
        { token: 'アリさん', romaji: 'Ari-san', role: 'Topik Baru', meaning: 'Tuan Ali', color: 'bg-neutral-900 text-white' },
        { token: 'も', romaji: 'mo', role: 'Partikel "Juga"', meaning: 'Juga (ganti は)', color: 'bg-amber-600 text-white' },
        { token: 'インドネシアじん', romaji: 'Indoneshia-jin', role: 'Predikat yang Sama', meaning: 'Orang Indonesia', color: 'bg-blue-600 text-white' },
        { token: 'です', romaji: 'desu', role: 'Kopula Sopan', meaning: 'Adalah', color: 'bg-neutral-800 text-white' },
      ],
    },
    examples: [
      { japanese: 'わたしは インドネシアじんです。アリさんも インドネシアじんです。', romaji: 'Watashi wa Indoneshia-jin desu. Ari-san mo Indoneshia-jin desu.', meaning: 'Saya orang Indonesia. Ali juga orang Indonesia.' },
      { japanese: 'ワンさんも エンジニアです。', romaji: 'Wan-san mo enjinia desu.', meaning: 'Wang juga seorang engineer.' },
    ],
    usageScenario: 'Menyatakan kesamaan status atau asal ketika sedang memperkenalkan beberapa orang sekaligus.',
    commonMistakes: [
      {
        wrong: 'アリさんはも インドネシアじんです (Menggabungkan は dan も)',
        correct: 'アリさんも インドネシアじんです。',
        explanation: 'Partikel も menggantikan は secara penuh, tidak boleh digabung menjadi "はも".',
      },
    ],
    miniExercise: {
      question: 'Lengkapi: わたしは がくせいです。ミラーさん ____ がくせいです。',
      options: ['も', 'は', 'の'],
      answer: 'も',
      explanation: 'Karena Miller juga mahasiswa seperti saya, gunakan partikel も (juga).',
    },
  },
  {
    id: 'p-5',
    number: 5,
    title: 'A の B',
    formula: 'Kata Benda (A) + の (no) + Kata Benda (B)。',
    functionDesc: 'Partikel の menghubungkan dua kata benda. Menunjukkan kepemilikan, afiliasi perusahaan/kampus, atau hubungan penjelas.',
    structureFormula: ['[Organisasi / Pemilik (A)]', '[の (no)]', '[Jabatan / Benda (B)]'],
    breakdownExample: {
      japanese: 'わたしは ABCの しゃいんです。',
      romaji: 'Watashi wa ABC no shain desu.',
      meaning: 'Saya karyawan perusahaan ABC.',
      tokens: [
        { token: 'わたし', romaji: 'watashi', role: 'Topik', meaning: 'Saya', color: 'bg-neutral-900 text-white' },
        { token: 'は', romaji: 'wa', role: 'Partikel', meaning: 'Penanda Topik', color: 'bg-emerald-600 text-white' },
        { token: 'ABC', romaji: 'ABC', role: 'Nama Instansi', meaning: 'Perusahaan ABC', color: 'bg-indigo-600 text-white' },
        { token: 'の', romaji: 'no', role: 'Partikel Afiliasi', meaning: 'Dari / Milik', color: 'bg-teal-600 text-white' },
        { token: 'しゃいん', romaji: 'shain', role: 'Status Posisi', meaning: 'Karyawan', color: 'bg-blue-600 text-white' },
        { token: 'です', romaji: 'desu', role: 'Kopula', meaning: 'Penutup Sopan', color: 'bg-neutral-800 text-white' },
      ],
    },
    examples: [
      { japanese: 'IMCの しゃいん', romaji: 'IMC no shain', meaning: 'Karyawan IMC' },
      { japanese: 'だいがくの せんせい', romaji: 'daigaku no sensei', meaning: 'Dosen universitas' },
      { japanese: 'にほんごの せんせい', romaji: 'nihongo no sensei', meaning: 'Guru bahasa Jepang' },
      { japanese: 'わたしは ABCの しゃいんです。', romaji: 'Watashi wa ABC no shain desu.', meaning: 'Saya karyawan ABC.' },
    ],
    usageScenario: 'Menyebutkan tempat kantor atau kampus saat bertukar kartu nama (*meishi*).',
    commonMistakes: [
      {
        wrong: 'しゃいんの ABC (Urutan terbalik)',
        correct: 'ABCの しゃいん',
        explanation: 'Dalam bahasa Jepang, organisasi/pemilik (A) diletakkan DI DEPAN partikel の.',
      },
    ],
    miniExercise: {
      question: 'Bagaimana susunan tepat untuk "Guru bahasa Jepang"?',
      options: ['にほんごの せんせい', 'せんせいの にほんご', 'にほんごは せんせい'],
      answer: 'にほんごの せんせい',
      explanation: 'Bidang ajar (Nihongo) menerangkan profesi (Sensei) dengan partikel の.',
    },
  },
  {
    id: 'p-6',
    number: 6,
    title: 'Kata Tanya だれ / どなた',
    formula: 'Topik + は + だれ / どなた + ですか？',
    functionDesc: 'だれ (dare) berarti "siapa". どなた (donata) adalah bentuk yang lebih sopan dan hormat. Digunakan untuk menanyakan identitas seseorang.',
    structureFormula: ['[Orang yang ditunjuk]', '[は (wa)]', '[だれ / どなた]', '[ですか]'],
    breakdownExample: {
      japanese: 'あのかたは どなたですか。',
      romaji: 'Ano kata wa donata desu ka.',
      meaning: 'Siapakah beliau? (sopan)',
      tokens: [
        { token: 'あのかた', romaji: 'ano kata', role: 'Topik Hormat', meaning: 'Beliau / Orang itu', color: 'bg-neutral-900 text-white' },
        { token: 'は', romaji: 'wa', role: 'Partikel', meaning: 'Penanda Topik', color: 'bg-emerald-600 text-white' },
        { token: 'どなた', romaji: 'donata', role: 'Kata Tanya Hormat', meaning: 'Siapa', color: 'bg-rose-600 text-white' },
        { token: 'ですか', romaji: 'desu ka', role: 'Partikel Tanya', meaning: '?', color: 'bg-purple-600 text-white' },
      ],
    },
    examples: [
      { japanese: 'あのひとは だれですか。', romaji: 'Ano hito wa dare desu ka.', meaning: 'Siapa orang itu?' },
      { japanese: 'あのかたは どなたですか。', romaji: 'Ano kata wa donata desu ka.', meaning: 'Siapakah beliau? (lebih sopan)' },
      { japanese: 'あのひとは ミラーさんです。', romaji: 'Ano hito wa Miraa-san desu.', meaning: 'Orang itu adalah Miller.' },
    ],
    usageScenario: 'Menanyakan identitas kolega atau tamu baru yang hadir di kantor.',
    commonMistakes: [
      {
        wrong: 'あのかたは だれですか (Mencampur ragam hormat dengan kasual)',
        correct: 'あのかたは どなたですか。',
        explanation: 'Pasangan sepadan: gunakan あのひと dengan だれ, atau あのかた dengan どなた.',
      },
    ],
    miniExercise: {
      question: 'Bentuk lebih sopan dari "あのひとは だれですか" adalah...?',
      options: ['あのかたは どなたですか。', 'あのひとは どなたですか。', 'あのかたは だれですか。'],
      answer: 'あのかたは どなたですか。',
      explanation: 'Ganti "ano hito" menjadi "ano kata" dan "dare" menjadi "donata" untuk kesopanan maksimal.',
    },
  },
  {
    id: 'p-7',
    number: 7,
    title: 'Kebangsaan dan Umur',
    formula: 'Nama Negara + じん (jin) / Angka + さい (sai) です。',
    functionDesc: 'Untuk kebangsaan, gabungkan nama negara dengan じん (-jin). Untuk bertanya umur, gunakan なんさいですか atau bentuk sopan おいくつですか.',
    structureFormula: ['[Nama Negara + じん]', '/ [Angka + さい です]'],
    breakdownExample: {
      japanese: 'わたしは ２４さいです。',
      romaji: 'Watashi wa nijuuyon-sai desu.',
      meaning: 'Saya berumur 24 tahun.',
      tokens: [
        { token: 'わたし', romaji: 'watashi', role: 'Topik', meaning: 'Saya', color: 'bg-neutral-900 text-white' },
        { token: 'は', romaji: 'wa', role: 'Partikel', meaning: 'Penanda', color: 'bg-emerald-600 text-white' },
        { token: '２４', romaji: 'nijuuyon', role: 'Angka', meaning: '24', color: 'bg-blue-600 text-white' },
        { token: 'さい', romaji: 'sai', role: 'Penghitung Usia', meaning: 'Tahun', color: 'bg-amber-600 text-white' },
        { token: 'です', romaji: 'desu', role: 'Kopula', meaning: 'Adalah', color: 'bg-neutral-800 text-white' },
      ],
    },
    examples: [
      { japanese: 'インドネシアじん / にほんじん / アメリカじん', romaji: 'Indoneshia-jin / Nihon-jin / Amerika-jin', meaning: 'Orang Indonesia / Orang Jepang / Orang Amerika' },
      { japanese: 'なんさいですか。', romaji: 'Nansai desu ka.', meaning: 'Berapa umur Anda?' },
      { japanese: 'おいくつですか。', romaji: 'Oikutsu desu ka.', meaning: 'Berapa usia Anda? (lebih sopan)' },
      { japanese: '２５さいです。', romaji: 'Nijuugo-sai desu.', meaning: 'Umur saya 25 tahun.' },
    ],
    usageScenario: 'Mengisi data diri atau menjawab pertanyaan umur dan asal negara saat wawancara.',
    commonMistakes: [
      {
        wrong: 'にじゅっさい (Untuk usia 20 tahun)',
        correct: 'はたち (hatachi)',
        explanation: 'Khusus umur 20 tahun memiliki sebutan tradisional "hatachi", bukan ni-juu-sai.',
      },
    ],
    miniExercise: {
      question: 'Bagaimana cara menyebut umur 20 tahun yang benar dalam bahasa Jepang?',
      options: ['はたち (hatachi)', 'にじゅっさい (nijussai)', 'にじゅうさい (nijuusai)'],
      answer: 'はたち (hatachi)',
      explanation: 'Umur 20 tahun di Jepang adalah usia kedewasaan dan secara khusus disebut はたち (hatachi).',
    },
    notes: 'Catatan penting: Untuk umur 20 tahun, terdapat pelafalan khusus yaitu はたち (hatachi), bukan ni-juu-sai.',
  },
]

export const SENTENCE_BUILDER_CHALLENGES_L1: SentenceBuilderChallenge[] = [
  {
    id: 'sb-1',
    patternId: 'p-1',
    targetIndonesian: 'Saya adalah mahasiswa.',
    hint: 'Topik (Saya) + partikel は + predikat (mahasiswa) + です',
    scrambledWords: ['です', 'わたし', 'がくせい', 'は'],
    correctOrder: ['わたし', 'は', 'がくせい', 'です'],
    romaji: 'Watashi wa gakusei desu.',
    explanation: 'Dalam bahasa Jepang, partikel は diletakkan tepat setelah topik (わたし) dan predikat (がくせい) ditutup dengan kopula sopan です.',
  },
  {
    id: 'sb-2',
    patternId: 'p-1',
    targetIndonesian: 'Miller adalah seorang guru.',
    hint: 'Nama orang + sapaan さん + は + profesi + です',
    scrambledWords: ['は', 'ミラーさん', 'です', 'せんせい'],
    correctOrder: ['ミラーさん', 'は', 'せんせい', 'です'],
    romaji: 'Miraa-san wa sensei desu.',
    explanation: 'Subjek pembicaraan adalah "ミラーさん", ditandai dengan partikel "は", diikuti status profesinya "せんせい", dan ditutup dengan "です".',
  },
  {
    id: 'sb-3',
    patternId: 'p-2',
    targetIndonesian: 'Saya bukan dokter.',
    hint: 'Gunakan bentuk penyangkalan sopan: じゃありません',
    scrambledWords: ['じゃありません', 'いしゃ', 'は', 'わたし'],
    correctOrder: ['わたし', 'は', 'いしゃ', 'じゃありません'],
    romaji: 'Watashi wa isha ja arimasen.',
    explanation: 'Untuk menyatakan penyangkalan identitas ("bukan dokter"), ganti です menjadi じゃありません.',
  },
  {
    id: 'sb-4',
    patternId: 'p-3',
    targetIndonesian: 'Apakah Anda orang Jepang?',
    hint: 'Gunakan partikel tanya か di akhir kalimat',
    scrambledWords: ['ですか', 'あなた', 'は', 'にほんじん'],
    correctOrder: ['あなた', 'は', 'にほんじん', 'ですか'],
    romaji: 'Anata wa Nihon-jin desu ka.',
    explanation: 'Partikel か di ujung kalimat berfungsi sebagai tanda tanya yang sopan.',
  },
  {
    id: 'sb-5',
    patternId: 'p-4',
    targetIndonesian: 'Ali juga orang Indonesia.',
    hint: 'Partikel も menggantikan partikel は untuk menyatakan "juga"',
    scrambledWords: ['インドネシアじん', 'アリさん', 'です', 'も'],
    correctOrder: ['アリさん', 'も', 'インドネシアじん', 'です'],
    romaji: 'Ari-san mo Indoneshia-jin desu.',
    explanation: 'Partikel も (mo) berarti "juga", menggantikan partikel は karena predikatnya sama persis dengan subjek sebelumnya.',
  },
  {
    id: 'sb-6',
    patternId: 'p-5',
    targetIndonesian: 'Saya karyawan perusahaan ABC.',
    hint: 'Nama perusahaan (ABC) + partikel の + status (しゃいん)',
    scrambledWords: ['しゃいん', 'わたし', 'ABC', 'は', 'です', 'の'],
    correctOrder: ['わたし', 'は', 'ABC', 'の', 'しゃいん', 'です'],
    romaji: 'Watashi wa ABC no shain desu.',
    explanation: 'Partikel の menghubungkan nama instansi/perusahaan dengan status karyawan untuk menyatakan afiliasi.',
  },
  {
    id: 'sb-7',
    patternId: 'p-6',
    targetIndonesian: 'Siapakah orang itu?',
    hint: 'Topik (あのひと) + は + kata tanya (だれ) + ですか',
    scrambledWords: ['だれ', 'は', 'あのひと', 'ですか'],
    correctOrder: ['あのひと', 'は', 'だれ', 'ですか'],
    romaji: 'Ano hito wa dare desu ka.',
    explanation: 'Topiknya adalah "あのひと" (orang itu), kata tanyanya adalah "だれ" (siapa), dan diakhiri bentuk tanya "ですか".',
  },
]

export const INTERACTIVE_DIALOGUES_L1: InteractiveDialogue[] = [
  {
    id: 'dlg-1',
    title: 'Pertemuan Perdana di Resepsi Penyambutan',
    context: 'Ali (dari Indonesia) bertemu pertama kali dengan Miller (dari Amerika Serikat) di aula pertemuan penyambutan.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Peserta dari Indonesia' },
      { name: 'Miller', avatar: 'US', role: 'Karyawan dari Amerika Serikat' },
    ],
    turns: [
      {
        id: 't-1',
        speaker: 'Ali',
        japanese: 'はじめまして。わたしは アリです。',
        romaji: 'Hajimemashite. Watashi wa Ari desu.',
        indonesian: 'Salam kenal. Saya Ali.',
      },
      {
        id: 't-2',
        speaker: 'Miller',
        japanese: 'はじめまして。わたしは ミラーです。',
        romaji: 'Hajimemashite. Watashi wa Miraa desu.',
        indonesian: 'Salam kenal. Saya Miller.',
        isUserTurn: true,
        options: [
          {
            text: 'はじめまして。わたしは ミラーです。',
            romaji: 'Hajimemashite. Watashi wa Miraa desu.',
            isCorrect: true,
            feedback: 'Sempurna! Balas salam "Hajimemashite" dengan "Hajimemashite" dan sebutkan nama Anda.',
          },
          {
            text: 'すみません。わたしは ミラーさんです。',
            romaji: 'Sumimasen. Watashi wa Miraa-san desu.',
            isCorrect: false,
            feedback: 'Kurang tepat: jangan gunakan "Sumimasen" untuk sapaan awal perkenalan, dan jangan menempelkan "-san" pada nama sendiri!',
          },
        ],
      },
      {
        id: 't-3',
        speaker: 'Ali',
        japanese: 'インドネシアじんです。ミラーさんは？',
        romaji: 'Indoneshia-jin desu. Miraa-san wa?',
        indonesian: 'Saya orang Indonesia. Kalau Miller-san dari mana?',
      },
      {
        id: 't-4',
        speaker: 'Miller',
        japanese: 'アメリカじんです。どうぞよろしく おねがいします。',
        romaji: 'Amerika-jin desu. Douzo yoroshiku onegaishimasu.',
        indonesian: 'Saya orang Amerika. Senang berkenalan dengan Anda.',
        isUserTurn: true,
        options: [
          {
            text: 'アメリカじんです。どうぞよろしく おねがいします。',
            romaji: 'Amerika-jin desu. Douzo yoroshiku onegaishimasu.',
            isCorrect: true,
            feedback: 'Tepat sekali! Sebutkan kebangsaan (Amerika-jin) lalu tutup dengan salam "Douzo yoroshiku onegaishimasu".',
          },
          {
            text: 'アメリカの しゃいんじゃありません。',
            romaji: 'Amerika no shain ja arimasen.',
            isCorrect: false,
            feedback: 'Jawaban ini menyangkal karyawan Amerika, bukan menjawab pertanyaan asal negara.',
          },
        ],
      },
      {
        id: 't-5',
        speaker: 'Ali',
        japanese: 'こちらこそ、どうぞよろしく おねがいします。',
        romaji: 'Kochira koso, douzo yoroshiku onegaishimasu.',
        indonesian: 'Saya pun demikian, senang berkenalan dengan Anda.',
      },
    ],
  },
  {
    id: 'dlg-2',
    title: 'Menanyakan Profesi Rekan Kerja',
    context: 'Ali mengonfirmasi profesi Miller dan Santos dengan Yamada di kantor.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Penanya' },
      { name: 'Yamada', avatar: 'JP', role: 'Rekan kantor lokal' },
    ],
    turns: [
      {
        id: 't2-1',
        speaker: 'Ali',
        japanese: 'サントスさんは エンジニアですか。',
        romaji: 'Santosu-san wa enjinia desu ka.',
        indonesian: 'Apakah Santos seorang engineer?',
      },
      {
        id: 't2-2',
        speaker: 'Yamada',
        japanese: 'はい、エンジニアです。',
        romaji: 'Hai, enjinia desu.',
        indonesian: 'Ya, benar seorang engineer.',
      },
      {
        id: 't2-3',
        speaker: 'Ali',
        japanese: 'ミラーさんも エンジニアですか。',
        romaji: 'Miraa-san mo enjinia desu ka.',
        indonesian: 'Apakah Miller juga seorang engineer?',
        isUserTurn: true,
        options: [
          {
            text: 'ミラーさんも エンジニアですか。',
            romaji: 'Miraa-san mo enjinia desu ka.',
            isCorrect: true,
            feedback: 'Tepat! Gunakan partikel も (mo) untuk menanyakan apakah Miller JUGA seorang engineer.',
          },
          {
            text: 'ミラーさんは だれですか。',
            romaji: 'Miraa-san wa dare desu ka.',
            isCorrect: false,
            feedback: 'Ini menanyakan siapa Miller, bukan menanyakan apakah profesinya sama.',
          },
        ],
      },
      {
        id: 't2-4',
        speaker: 'Yamada',
        japanese: 'いいえ、エンジニアじゃありません。がくせいです。',
        romaji: 'Iie, enjinia ja arimasen. Gakusei desu.',
        indonesian: 'Bukan, dia bukan engineer. Dia adalah mahasiswa.',
      },
    ],
  },
]

export const VOCAB_MATCHING_PAIRS_L1: MatchingPair[] = [
  { id: 'm-1', japanese: 'がくせい', romaji: 'gakusei', indonesian: 'Mahasiswa / Pelajar' },
  { id: 'm-2', japanese: 'せんせい', romaji: 'sensei', indonesian: 'Guru / Dosen' },
  { id: 'm-3', japanese: 'かいしゃいん', romaji: 'kaishain', indonesian: 'Karyawan kantor' },
  { id: 'm-4', japanese: 'いしゃ', romaji: 'isha', indonesian: 'Dokter' },
  { id: 'm-5', japanese: 'エンジニア', romaji: 'enjinia', indonesian: 'Insinyur / Engineer' },
  { id: 'm-6', japanese: 'びょういん', romaji: 'byouin', indonesian: 'Rumah sakit' },
  { id: 'm-7', japanese: 'だいがく', romaji: 'daigaku', indonesian: 'Universitas' },
  { id: 'm-8', japanese: 'にほんじん', romaji: 'Nihon-jin', indonesian: 'Orang Jepang' },
]

export const DIALOGUES_DATA: Dialogue[] = [
  {
    id: 'dialog-a',
    title: 'Dialog A — Berkenalan Pertama Kali',
    context: 'A (Ali, Indonesia) bertemu pertama kali dengan B (Miller, Amerika) di acara penyambutan.',
    lines: [
      { speaker: 'A (Ali)', japanese: 'はじめまして。わたしは アリです。', romaji: 'Hajimemashite. Watashi wa Ari desu.', indonesian: 'Salam kenal. Saya Ali.' },
      { speaker: 'B (Miller)', japanese: 'はじめまして。わたしは ミラーです。', romaji: 'Hajimemashite. Watashi wa Miraa desu.', indonesian: 'Salam kenal. Saya Miller.' },
      { speaker: 'A (Ali)', japanese: 'インドネシアじんです。ミラーさんは？', romaji: 'Indoneshia-jin desu. Miraa-san wa?', indonesian: 'Saya orang Indonesia. Miller-san berasal dari mana?' },
      { speaker: 'B (Miller)', japanese: 'アメリカじんです。どうぞよろしく おねがいします。', romaji: 'Amerika-jin desu. Douzo yoroshiku onegaishimasu.', indonesian: 'Saya orang Amerika. Senang berkenalan dengan Anda.' },
      { speaker: 'A (Ali)', japanese: 'こちらこそ、どうぞよろしく おねがいします。', romaji: 'Kochira koso, douzo yoroshiku onegaishimasu.', indonesian: 'Saya pun demikian, senang berkenalan dengan Anda.' },
    ],
  },
  {
    id: 'dialog-b',
    title: 'Dialog B — Menanyakan Pekerjaan',
    context: 'A menanyakan profesi Santos dan Miller.',
    lines: [
      { speaker: 'A', japanese: 'サントスさんは エンジニアですか。', romaji: 'Santosu-san wa enjinia desu ka.', indonesian: 'Apakah Santos seorang engineer?' },
      { speaker: 'B', japanese: 'はい、エンジニアです。', romaji: 'Hai, enjinia desu.', indonesian: 'Ya, benar seorang engineer.' },
      { speaker: 'A', japanese: 'ミラーさんも エンジニアですか。', romaji: 'Miraa-san mo enjinia desu ka.', indonesian: 'Apakah Miller juga engineer?' },
      { speaker: 'B', japanese: 'いいえ、エンジニアじゃありません。がくせいです。', romaji: 'Iie, enjinia ja arimasen. Gakusei desu.', indonesian: 'Tidak, bukan engineer. Miller adalah mahasiswa.' },
    ],
  },
  {
    id: 'dialog-c',
    title: 'Dialog C — Menanyakan Orang dan Afiliasi',
    context: 'Menanyakan identitas dan perusahaan tempat seseorang bekerja dengan sopan.',
    lines: [
      { speaker: 'A', japanese: 'あのかたは どなたですか。', romaji: 'Ano kata wa donata desu ka.', indonesian: 'Siapakah beliau?' },
      { speaker: 'B', japanese: 'ワンさんです。ABCの しゃいんです。', romaji: 'Wan-san desu. ABC no shain desu.', indonesian: 'Beliau adalah Tuan Wang, karyawan perusahaan ABC.' },
      { speaker: 'A', japanese: 'そうですか。', romaji: 'Sou desu ka.', indonesian: 'Oh, begitu ya.' },
    ],
  },
]

export const PRONUNCIATION_TIPS = [
  {
    id: 'tip-1',
    title: 'Partikel は dibaca "Wa"',
    description: 'Ketika は berfungsi sebagai partikel penanda topik (seperti dalam わたしは), huruf ini diucapkan "wa", BUKAN "ha". Hanya dibaca "ha" jika merupakan bagian dari kata benda (misalnya はい atau はたち).',
  },
  {
    id: 'tip-2',
    title: 'Bunyi des(u) yang Ringan',
    description: 'です di akhir kalimat biasanya diucapkan dengan vokal "u" yang disenyapkan atau sangat halus ("des"), bukan "de-su" yang ditekan kaku.',
  },
  {
    id: 'tip-3',
    title: 'Jangan Menempelkan ～さん pada Diri Sendiri',
    description: 'Sapaan さん (-san) adalah bentuk penghormatan untuk orang lain (contoh: Tanaka-san). Saat memperkenalkan diri sendiri, jangan pernah berkata "Watashi wa Yasha-san desu", cukup "Watashi wa Yasha desu".',
  },
  {
    id: 'tip-4',
    title: 'Penggunaan あなた (Anata)',
    description: 'Secara kamus berarti "Anda", tetapi orang Jepang jarang menggunakannya jika sudah tahu nama lawan bicara. Menggunakan [Nama] + さん jauh lebih sopan dan alami.',
  },
  {
    id: 'tip-5',
    title: 'Hindari Terjemahan Kata per Kata Kaku',
    description: 'Pahami fungsi partikel dan konteks kalimat daripada mencocokkan struktur bahasa Indonesia secara harfiah. Intonasi yang sopan dan percaya diri adalah kunci utama.',
  },
]

export const PARTICLE_QUIZZES: ParticleQuiz[] = [
  {
    id: 1,
    sentenceBefore: 'わたし',
    sentenceAfter: 'アリです。',
    options: ['は', 'の'],
    correct: 'は',
    reason: 'Partikel は menandai topik pembicaraan ("Mengenai saya, saya adalah Ali").',
    fullSentence: 'わたしは アリです。',
    romaji: 'Watashi wa Ari desu.',
    indonesian: 'Saya adalah Ali.',
  },
  {
    id: 2,
    sentenceBefore: 'ミラーさん',
    sentenceAfter: 'アメリカじんです。',
    options: ['も', 'の'],
    correct: 'も',
    reason: 'Partikel も berarti "juga", digunakan ketika predikat orang kedua sama dengan orang sebelumnya.',
    fullSentence: 'ミラーさんも アメリカじんです。',
    romaji: 'Miraa-san mo Amerika-jin desu.',
    indonesian: 'Miller juga orang Amerika.',
  },
  {
    id: 3,
    sentenceBefore: 'ABC',
    sentenceAfter: 'しゃいんです。',
    options: ['の', 'は'],
    correct: 'の',
    reason: 'Partikel の menghubungkan perusahaan (ABC) dengan status karyawan (shain), menyatakan afiliasi.',
    fullSentence: 'ABCの しゃいんです。',
    romaji: 'ABC no shain desu.',
    indonesian: 'Karyawan perusahaan ABC.',
  },
  {
    id: 4,
    sentenceBefore: 'あなたは がくせいです',
    sentenceAfter: '。',
    options: ['か', 'も'],
    correct: 'か',
    reason: 'Partikel か diletakkan di akhir kalimat untuk mengubah kalimat pernyataan menjadi kalimat tanya.',
    fullSentence: 'あなたは がくせいですか。',
    romaji: 'Anata wa gakusei desu ka.',
    indonesian: 'Apakah Anda mahasiswa?',
  },
  {
    id: 5,
    sentenceBefore: 'サントスさん',
    sentenceAfter: 'エンジニアです。',
    options: ['は', 'の'],
    correct: 'は',
    reason: 'Partikel は menandai subjek / topik pembicaraan mengenai Santos.',
    fullSentence: 'サントスさんは エンジニアです。',
    romaji: 'Santosu-san wa enjinia desu.',
    indonesian: 'Santos adalah seorang engineer.',
  },
]

export const TRANSLATE_QUIZZES: TranslateQuiz[] = [
  {
    id: 1,
    indonesian: 'Saya mahasiswa.',
    japanese: 'わたしは がくせいです。',
    romaji: 'Watashi wa gakusei desu.',
  },
  {
    id: 2,
    indonesian: 'Saya bukan dokter.',
    japanese: 'わたしは いしゃじゃありません。',
    romaji: 'Watashi wa isha ja arimasen.',
  },
  {
    id: 3,
    indonesian: 'Apakah Anda orang Jepang?',
    japanese: 'あなたは にほんじんですか。',
    romaji: 'Anata wa Nihon-jin desu ka.',
  },
  {
    id: 4,
    indonesian: 'Wang juga seorang engineer.',
    japanese: 'ワンさんも エンジニアです。',
    romaji: 'Wan-san mo enjinia desu.',
  },
  {
    id: 5,
    indonesian: 'Siapa orang itu?',
    japanese: 'あのひとは だれですか。',
    romaji: 'Ano hito wa dare desu ka.',
  },
  {
    id: 6,
    indonesian: 'Saya karyawan perusahaan ABC.',
    japanese: 'わたしは ABCの しゃいんです。',
    romaji: 'Watashi wa ABC no shain desu.',
  },
]

export const EVALUATION_INDICATORS: EvaluationIndicator[] = [
  { id: 'eval-1', label: 'Saya dapat menyapa dan memperkenalkan diri dengan sopan.' },
  { id: 'eval-2', label: 'Saya memahami fungsi partikel は (wa) sebagai penanda topik.' },
  { id: 'eval-3', label: 'Saya dapat membuat kalimat menyangkal/negatif dengan じゃありません.' },
  { id: 'eval-4', label: 'Saya dapat membuat pertanyaan ya/tidak dengan partikel か.' },
  { id: 'eval-5', label: 'Saya dapat menggunakan partikel も (juga) dan の (kepemilikan/afiliasi).' },
  { id: 'eval-6', label: 'Saya dapat bertanya menggunakan kata tanya だれ / どなた.' },
  { id: 'eval-7', label: 'Saya dapat menyebutkan kebangsaan dan umur dengan benar.' },
]

export const STUDY_PLAN_5_DAYS: StudyPlanDay[] = [
  {
    day: 1,
    title: 'Hari 1: Salam & Kosakata Inti',
    focus: 'Membangun kosakata dasar dan ungkapan sapaan harian.',
    tasks: [
      'Hafalkan 9 ungkapan salam dasar (ohayou gozaimasu, konnichiwa, dll).',
      'Hafalkan 10-15 kosakata inti (orang, profesi, negara).',
      'Latih pelafalan dengan fitur audio speaker.',
    ],
  },
  {
    day: 2,
    title: 'Hari 2: Pola Kalimat は dan です',
    focus: 'Menyusun identitas diri dan pernyataan positif.',
    tasks: [
      'Pahami rumus A は B です (Topik + wa + Info + desu).',
      'Buat minimal 8 kalimat pernyataan positif tentang nama, profesi, dan kebangsaan.',
      'Ucapkan kalimat dengan suara lantang dan perhatikan bunyi "wa".',
    ],
  },
  {
    day: 3,
    title: 'Hari 3: Pola Negatif & Bertanya',
    focus: 'Menyangkal kategori dan membuat pertanyaan.',
    tasks: [
      'Pelajari perbedaan です vs じゃありません (bukan dokter, bukan guru).',
      'Latih pola pertanyaan dengan menambahkan か di akhir.',
      'Jawab pertanyaan dengan: はい、... です atau いいえ、... じゃありません.',
    ],
  },
  {
    day: 4,
    title: 'Hari 4: Partikel も, の & Kata Tanya',
    focus: 'Menghubungkan afiliasi dan menanyakan identitas orang lain.',
    tasks: [
      'Gunakan も untuk menyatakan kesamaan ("Ali juga orang Indonesia").',
      'Gunakan の untuk afiliasi ("Karyawan perusahaan ABC").',
      'Latih percakapan pendek menggunakan だれ dan どなた.',
    ],
  },
  {
    day: 5,
    title: 'Hari 5: Review, Percakapan & Evaluasi',
    focus: 'Perkenalan diri lisan dan uji mandiri.',
    tasks: [
      'Lakukan perkenalan diri lengkap selama 30–60 detik tanpa melihat contekan.',
      'Selesaikan Latihan A, B, C, dan D.',
      'Centang Evaluasi Mandiri (minimal 6 dari 7 indikator tercapai).',
    ],
  },
]
