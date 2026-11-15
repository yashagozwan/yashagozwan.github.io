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

export interface JapaneseVocabL3 {
  id: string
  japanese: string
  romaji: string
  meaning: string
  category: 'Kata Tunjuk Lokasi & Arah' | 'Fasilitas & Ruangan' | 'Benda & Produk' | 'Lantai & Bangunan' | 'Angka & Mata Uang' | 'Ungkapan Transaksi'
  notes?: string
}

export interface SpecialPriceItem {
  number: number
  japanese: string
  romaji: string
  meaning: string
  isSpecial?: boolean
  notes?: string
}

export interface LocationComparisonItem {
  basic: {
    japanese: string
    romaji: string
    meaning: string
  }
  polite: {
    japanese: string
    romaji: string
    meaning: string
  }
  zone: string
  description: string
}

export const LESSON_3_META = {
  course: '日本語 • PELAJARAN 03',
  title: 'BAB 3 — TEMPAT, LOKASI & HARGA',
  subtitle: 'Menanyakan Lokasi, Mengenali Fasilitas, dan Bertanya Harga',
  curriculum: 'Materi pendamping bergaya kurikulum Minna no Nihongo I',
  description: 'Disusun dalam Bahasa Indonesia • Membedakan ここ・そこ・あそこ・どこ vs こちら・そちら・あちら・どちら, menanyakan lantai (なんがい), asal produk (どこの), dan nominal harga Yen (いくら).',
  targets: [
    { title: 'Menunjuk lokasi', result: 'Membedakan ここ・そこ・あそこ・どこ sesuai posisi pembicara dan lawan bicara.' },
    { title: 'Berbicara sopan', result: 'Menggunakan こちら・そちら・あちら・どちら dalam situasi kantor atau toko.' },
    { title: 'Menanyakan tempat', result: 'Membuat pertanyaan [Tempat] は どこですか dan menyebutkan lantai [Lantai]かいです.' },
    { title: 'Menanyakan asal produk', result: 'Menggunakan どcon / どこの [Benda] ですか untuk asal negara atau perusahaan.' },
    { title: 'Menanyakan harga', result: 'Menggunakan いくらですか dan menyebutkan nominal harga Yen dengan pelafalan khusus.' },
  ],
}

export const LESSON_SESSIONS_L3: LessonSession[] = [
  {
    id: 'l3-s-1',
    number: 1,
    title: 'Pengantar Bab 3',
    subtitle: 'Sasaran Kompetensi & Peta Pembelajaran',
    icon: 'AcademicCapIcon',
    durationMinutes: 4,
    description: 'Pahami tujuan belajar menunjuk lokasi ruangan, bertanya arah sopan, menanyakan asal produk, dan bertanya harga barang.',
  },
  {
    id: 'l3-s-2',
    number: 2,
    title: 'Kata Tunjuk Lokasi & Arah',
    subtitle: 'ここ・そこ・あそこ vs こちら・そちら・あちら',
    icon: 'MapPinIcon',
    durationMinutes: 8,
    description: 'Kuasai perbedaan kata tunjuk lokasi fisik biasa dan bentuk sopan (arah / layanan kantor & toko) secara visual.',
  },
  {
    id: 'l3-s-3',
    number: 3,
    title: 'Kosakata Fasilitas & Harga',
    subtitle: '42 Kosakata Fasilitas, Benda & Belanja',
    icon: 'BookOpenIcon',
    durationMinutes: 12,
    description: 'Hafalkan ruangan kantor, fasilitas umum, kata tunjuk arah, nomor lantai, serta istilah mata uang dan nominal harga Yen.',
  },
  {
    id: 'l3-s-4',
    number: 4,
    title: 'Tata Bahasa Visual',
    subtitle: '7 Pola Kalimat Lokasi, Asal & Harga',
    icon: 'PuzzlePieceIcon',
    durationMinutes: 15,
    description: 'Bedah rumus kalimat [Tempat] はどこ, bentuk sopan こちら, どこの [Benda], serta rumus bertanya harga いくらですか.',
  },
  {
    id: 'l3-s-5',
    number: 5,
    title: 'Susun Kalimat',
    subtitle: 'Tantangan Sentence Builder',
    icon: 'SquaresPlusIcon',
    durationMinutes: 8,
    description: 'Susun ubin kata acak menjadi kalimat tanya-jawab lokasi dan transaksi belanja yang tepat dan gramatikal.',
  },
  {
    id: 'l3-s-6',
    number: 6,
    title: 'Praktik Percakapan',
    subtitle: '5 Skenario Dialog (Di Gedung & Toko)',
    icon: 'ChatBubbleLeftRightIcon',
    durationMinutes: 10,
    description: 'Simulasi percakapan interaktif mencari toilet, ruangan kantor di lantai 2, asal sepatu Italia, belanja tas, dan negara asal.',
  },
  {
    id: 'l3-s-7',
    number: 7,
    title: 'Latihan & Kuis Terpadu',
    subtitle: 'Pasang Kata, Kuis Lokasi & Terjemahan',
    icon: 'PencilSquareIcon',
    durationMinutes: 10,
    description: 'Uji pemahaman komprehensif Anda melalui kuis pilihan ganda, memasangkan kosakata tempat, dan terjemahan aktif.',
  },
  {
    id: 'l3-s-8',
    number: 8,
    title: 'Rangkuman & Kelulusan',
    subtitle: '7 Indikator Kelulusan & Rencana 5 Hari',
    icon: 'TrophyIcon',
    durationMinutes: 5,
    description: 'Evaluasi pencapaian kompetensi Bab 3, review topik yang perlu diulang, dan tandai roadmap belajar 5 hari konsisten.',
  },
]

export const VOCABULARIES_L3_DATA: JapaneseVocabL3[] = [
  // 1. Kata Tunjuk Lokasi & Arah
  { id: 'v3-1', japanese: 'ここ', romaji: 'koko', meaning: 'Di sini (dekat pembicara)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Bentuk biasa tempat' },
  { id: 'v3-2', japanese: 'そこ', romaji: 'soko', meaning: 'Di situ (dekat lawan bicara)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Bentuk biasa tempat' },
  { id: 'v3-3', japanese: 'あそこ', romaji: 'asoko', meaning: 'Di sana (jauh dari keduanya)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Bentuk biasa tempat' },
  { id: 'v3-4', japanese: 'どこ', romaji: 'doko', meaning: 'Di mana (kata tanya lokasi)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Tanya tempat biasa' },
  { id: 'v3-5', japanese: 'こちら', romaji: 'kochira', meaning: 'Di sini / sebelah sini (sopan / arah)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Bentuk sopan dari koko' },
  { id: 'v3-6', japanese: 'そちら', romaji: 'sochira', meaning: 'Di situ / sebelah situ (sopan / arah)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Bentuk sopan dari soko' },
  { id: 'v3-7', japanese: 'あちら', romaji: 'achira', meaning: 'Di sana / sebelah sana (sopan / arah)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Bentuk sopan dari asoko' },
  { id: 'v3-8', japanese: 'どちら', romaji: 'dochira', meaning: 'Di mana / sebelah mana (sopan / arah)', category: 'Kata Tunjuk Lokasi & Arah', notes: 'Bentuk sopan dari doko' },

  // 2. Fasilitas & Ruangan
  { id: 'v3-9', japanese: 'きょうしつ', romaji: 'kyoushitsu', meaning: 'Ruang kelas', category: 'Fasilitas & Ruangan', notes: 'Ruang belajar' },
  { id: 'v3-10', japanese: 'しょくどう', romaji: 'shokudou', meaning: 'Kantin / ruang makan', category: 'Fasilitas & Ruangan', notes: 'Tempat makan' },
  { id: 'v3-11', japanese: 'じむしょ', romaji: 'jimusho', meaning: 'Kantor', category: 'Fasilitas & Ruangan', notes: 'Ruang kerja tata usaha' },
  { id: 'v3-12', japanese: 'かいぎしつ', romaji: 'kaigishitsu', meaning: 'Ruang rapat', category: 'Fasilitas & Ruangan', notes: 'Ruang pertemuan' },
  { id: 'v3-13', japanese: 'うけつけ', romaji: 'uketsuke', meaning: 'Resepsionis / meja informasi', category: 'Fasilitas & Ruangan', notes: 'Penerima tamu di lobi' },
  { id: 'v3-14', japanese: 'ロビー', romaji: 'robii', meaning: 'Lobi', category: 'Fasilitas & Ruangan', notes: 'Ruang tunggu depan' },
  { id: 'v3-15', japanese: 'へや', romaji: 'heya', meaning: 'Kamar / ruangan', category: 'Fasilitas & Ruangan', notes: 'Ruangan umum' },
  { id: 'v3-16', japanese: 'トイレ', romaji: 'toire', meaning: 'Toilet / WC', category: 'Fasilitas & Ruangan', notes: 'Kata serapan umum' },
  { id: 'v3-17', japanese: 'おてあらい', romaji: 'otearai', meaning: 'Toilet (lebih halus / sopan)', category: 'Fasilitas & Ruangan', notes: 'Arti harfiah: cuci tangan' },
  { id: 'v3-18', japanese: 'かいだん', romaji: 'kaidan', meaning: 'Tangga', category: 'Fasilitas & Ruangan', notes: 'Tangga gedung' },
  { id: 'v3-19', japanese: 'エレベーター', romaji: 'erebeetaa', meaning: 'Lift / elevator', category: 'Fasilitas & Ruangan', notes: 'Alat angkut vertikal' },
  { id: 'v3-20', japanese: 'エスカレーター', romaji: 'esukareetaa', meaning: 'Eskalator', category: 'Fasilitas & Ruangan', notes: 'Tangga berjalan' },
  { id: 'v3-21', japanese: 'じどうはんばいき', romaji: 'jidouhanbaiki', meaning: 'Mesin penjual otomatis (vending machine)', category: 'Fasilitas & Ruangan', notes: 'Sangat umum di Jepang' },
  { id: 'v3-22', japanese: 'でんわ', romaji: 'denwa', meaning: 'Telepon', category: 'Fasilitas & Ruangan', notes: 'Alat komunikasi' },
  { id: 'v3-23', japanese: 'うりば', romaji: 'uriba', meaning: 'Bagian penjualan / konter toko', category: 'Fasilitas & Ruangan', notes: 'Tempat jualan spesifik' },

  // 3. Benda & Produk
  { id: 'v3-24', japanese: 'くに', romaji: 'kuni', meaning: 'Negara (sering disebut おくに / okuni)', category: 'Benda & Produk', notes: 'Tanah air / negara asal' },
  { id: 'v3-25', japanese: 'かいしゃ', romaji: 'kaisha', meaning: 'Perusahaan', category: 'Benda & Produk', notes: 'Instansi kerja' },
  { id: 'v3-26', japanese: 'うち', romaji: 'uchi', meaning: 'Rumah (sendiri)', category: 'Benda & Produk', notes: 'Tempat tinggal' },
  { id: 'v3-27', japanese: 'くつ', romaji: 'kutsu', meaning: 'Sepatu', category: 'Benda & Produk', notes: 'Alas kaki' },
  { id: 'v3-28', japanese: 'ネクタイ', romaji: 'nekutai', meaning: 'Dasi', category: 'Benda & Produk', notes: 'Aksesori kemeja' },
  { id: 'v3-29', japanese: 'ワイン', romaji: 'wain', meaning: 'Wine / anggur minuman', category: 'Benda & Produk', notes: 'Minuman beralkohol' },
  { id: 'v3-30', japanese: 'カメラ', romaji: 'kamera', meaning: 'Kamera', category: 'Benda & Produk', notes: 'Alat potret foto' },

  // 4. Lantai & Bangunan
  { id: 'v3-31', japanese: 'ちか', romaji: 'chika', meaning: 'Lantai bawah tanah (Basement)', category: 'Lantai & Bangunan', notes: 'Singkatan B1/B2' },
  { id: 'v3-32', japanese: '～かい', romaji: '-kai', meaning: 'Lantai ke-... (Penghitung tingkat)', category: 'Lantai & Bangunan', notes: '1-kai, 2-kai, dsb.' },
  { id: 'v3-33', japanese: 'なんがい', romaji: 'nangai', meaning: 'Lantai berapa?', category: 'Lantai & Bangunan', notes: 'Kata tanya tingkat gedung' },

  // 5. Angka & Mata Uang
  { id: 'v3-34', japanese: 'えん', romaji: 'en', meaning: 'Yen (Mata uang Jepang)', category: 'Angka & Mata Uang', notes: 'Dituliskan ¥' },
  { id: 'v3-35', japanese: 'いくら', romaji: 'ikura', meaning: 'Berapa harga?', category: 'Angka & Mata Uang', notes: 'Kata tanya harga' },
  { id: 'v3-36', japanese: 'ひゃく', romaji: 'hyaku', meaning: 'Seratus (100)', category: 'Angka & Mata Uang', notes: '100' },
  { id: 'v3-37', japanese: 'せん', romaji: 'sen', meaning: 'Seribu (1.000)', category: 'Angka & Mata Uang', notes: '1.000' },
  { id: 'v3-38', japanese: 'まん', romaji: 'man', meaning: 'Sepuluh ribu (10.000 / いちまん)', category: 'Angka & Mata Uang', notes: 'Satuan 10.000 di Jepang' },

  // 6. Ungkapan Transaksi
  { id: 'v3-39', japanese: 'すみません', romaji: 'sumimasen', meaning: 'Permisi / maaf', category: 'Ungkapan Transaksi', notes: 'Membuka percakapan / memanggil pelayan' },
  { id: 'v3-40', japanese: '～でございます', romaji: '-de gozaimasu', meaning: 'Bentuk sangat sopan dari です', category: 'Ungkapan Transaksi', notes: 'Bahasa pelayan toko/hotel' },
  { id: 'v3-41', japanese: '～を みせてください', romaji: '-o misete kudasai', meaning: 'Tolong perlihatkan ...', category: 'Ungkapan Transaksi', notes: 'Minta izin melihat barang' },
  { id: 'v3-42', japanese: '～を ください', romaji: '-o kudasai', meaning: 'Tolong berikan ... / Saya beli yang ini', category: 'Ungkapan Transaksi', notes: 'Menyatakan deal pembelian' },
  { id: 'v3-43', japanese: 'じゃ', romaji: 'ja', meaning: 'Kalau begitu', category: 'Ungkapan Transaksi', notes: 'Penghubung pengambilan keputusan' },
]

export const LOCATION_COMPARISON_L3: LocationComparisonItem[] = [
  {
    basic: { japanese: 'ここ', romaji: 'koko', meaning: 'Di sini' },
    polite: { japanese: 'こちら', romaji: 'kochira', meaning: 'Sebelah sini / Di sini' },
    zone: 'Dekat Pembicara',
    description: 'Menunjuk lokasi fisik yang berada dekat dengan pembicara atau arah ke pihak pembicara.',
  },
  {
    basic: { japanese: 'そこ', romaji: 'soko', meaning: 'Di situ' },
    polite: { japanese: 'そちら', romaji: 'sochira', meaning: 'Sebelah situ / Di situ' },
    zone: 'Dekat Lawan Bicara',
    description: 'Menunjuk lokasi yang dekat dengan lawan bicara atau arah ke pihak lawan bicara.',
  },
  {
    basic: { japanese: 'あそこ', romaji: 'asoko', meaning: 'Di sana' },
    polite: { japanese: 'あちら', romaji: 'achira', meaning: 'Sebelah sana / Di sana' },
    zone: 'Jauh dari Keduanya',
    description: 'Menunjuk lokasi yang berjarak jauh dari posisi pembicara maupun lawan bicara.',
  },
  {
    basic: { japanese: 'どこ', romaji: 'doko', meaning: 'Di mana?' },
    polite: { japanese: 'どちら', romaji: 'dochira', meaning: 'Sebelah mana / Di mana?' },
    zone: 'Kata Tanya Lokasi / Arah',
    description: 'Digunakan untuk menanyakan tempat. Bentuk dochira juga dipakai menanyakan negara asal (Okuni wa dochira desu ka).',
  },
]

export const SPECIAL_PRICES_L3: SpecialPriceItem[] = [
  { number: 100, japanese: 'ひゃくえん', romaji: 'hyaku en', meaning: '100 Yen' },
  { number: 300, japanese: 'さんびゃくえん', romaji: 'sanbyaku en', meaning: '300 Yen', isSpecial: true, notes: 'Pelafalan b, bukan hyaku (さんびゃく)' },
  { number: 600, japanese: 'ろっぴゃくえん', romaji: 'roppyaku en', meaning: '600 Yen', isSpecial: true, notes: 'Bunyi konsonan ganda p (ろっぴゃく)' },
  { number: 800, japanese: 'はっぴゃくえん', romaji: 'happyaku en', meaning: '800 Yen', isSpecial: true, notes: 'Bunyi konsonan ganda p (はっぴゃく)' },
  { number: 1000, japanese: 'せんえん', romaji: 'sen en', meaning: '1.000 Yen' },
  { number: 3000, japanese: 'さんぜんえん', romaji: 'sanzen en', meaning: '3.000 Yen', isSpecial: true, notes: 'Pelafalan z, bukan sen (さんぜん)' },
  { number: 8000, japanese: 'はっせんえん', romaji: 'hassen en', meaning: '8.000 Yen', isSpecial: true, notes: 'Bunyi konsonan ganda s (はっせん)' },
  { number: 10000, japanese: 'いちまんえん', romaji: 'ichiman en', meaning: '10.000 Yen', notes: 'Wajib sebut ichi sebelum man (10.000 = いちまん)' },
  { number: 15000, japanese: 'いちまんごせんえん', romaji: 'ichiman gosen en', meaning: '15.000 Yen' },
]

export const GRAMMAR_PATTERNS_L3_DATA: GrammarPattern[] = [
  {
    id: 'g3-1',
    number: 1,
    title: 'Pola 1 — ここ・そこ・あそこ は [Tempat] です',
    formula: 'ここ / そこ / あそこ ＋ は ＋ [Nama Tempat] ＋ です。',
    functionDesc:
      'Kata tunjuk ここ, そこ, あそこ digunakan untuk menunjuk lokasi fisik. Penentuannya berdasarkan letak pembicara dan lawan bicara: ここ (dekat pembicara), そこ (dekat lawan bicara), あそこ (jauh dari keduanya).',
    structureFormula: ['Kata Tunjuk Lokasi', 'は', 'Nama Tempat', 'です'],
    breakdownExample: {
      japanese: 'ここは きょうしつです。',
      romaji: 'Koko wa kyoushitsu desu.',
      meaning: 'Di sini adalah ruang kelas.',
      tokens: [
        { token: 'ここ', romaji: 'koko', role: 'Kata Tunjuk Lokasi', meaning: 'Di sini (dekat pembicara)' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Penanda topik pembicaraan' },
        { token: 'きょうしつ', romaji: 'kyoushitsu', role: 'Nomina Tempat', meaning: 'Ruang kelas' },
        { token: 'です', romaji: 'desu', role: 'Kopula Sopan', meaning: 'Bentuk sopan penutup kalimat' },
      ],
    },
    examples: [
      { japanese: 'ここは きょうしつです。', romaji: 'Koko wa kyoushitsu desu.', meaning: 'Di sini adalah ruang kelas.' },
      { japanese: 'そこは じむしょです。', romaji: 'Soko wa jimusho desu.', meaning: 'Di situ adalah kantor.' },
      { japanese: 'あそこは しょくどうです。', romaji: 'Asoko wa shokudou desu.', meaning: 'Di sana adalah kantin.' },
    ],
    usageScenario: 'Memberitahu orang lain atau rekan kantor baru nama ruangan tempat Anda berdua sedang berdiri.',
    commonMistakes: [
      {
        wrong: 'ここ きょうしつ です。 (Koko kyoushitsu desu)',
        correct: 'ここは きょうしつです。 (Koko wa kyoushitsu desu)',
        explanation: 'Partikel は (wa) wajib diletakkan setelah kata tunjuk lokasi sebagai penanda subjek/topik kalimat.',
      },
    ],
    miniExercise: {
      question: 'Manakah kalimat yang tepat untuk menyatakan "Di sana adalah kantin" (jauh dari kita berdua)?',
      options: ['ここは しょくどうです。', 'そこは しょくどうです。', 'あそこは しょくどうです。'],
      answer: 'あそこは しょくどうです。',
      explanation: 'Untuk lokasi yang jauh dari pembicara dan lawan bicara, gunakan kata tunjuk あそこ (asoko).',
    },
  },
  {
    id: 'g3-2',
    number: 2,
    title: 'Pola 2 — [Tempat / Subjek] は どこですか',
    formula: '[Tempat / Benda] ＋ は ＋ どこですか。',
    functionDesc:
      'どこ (doko) berarti "di mana". Pola ini digunakan untuk menanyakan keberadaan suatu fasilitas atau ruangan. Jawaban dapat berupa kata tunjuk ([Tempat] は あそこです) atau nomor lantai ([Tempat] は ２かいです).',
    structureFormula: ['Subjek Tempat', 'は', 'どこ', 'ですか'],
    breakdownExample: {
      japanese: 'トイレは どこですか。',
      romaji: 'Toire wa doko desu ka.',
      meaning: 'Toilet ada di mana?',
      tokens: [
        { token: 'トイレ', romaji: 'toire', role: 'Subjek / Tempat Dicari', meaning: 'Toilet / WC' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Penanda topik' },
        { token: 'どこ', romaji: 'doko', role: 'Kata Tanya Lokasi', meaning: 'Di mana' },
        { token: 'ですか', romaji: 'desu ka', role: 'Kopula Tanya', meaning: 'Apakah (kalimat tanya)' },
      ],
    },
    examples: [
      { japanese: 'トイレは どこですか。', romaji: 'Toire wa doko desu ka.', meaning: 'Toilet ada di mana?' },
      { japanese: 'トイレは あそこです。', romaji: 'Toire wa asoko desu.', meaning: 'Toilet ada di sana.' },
      { japanese: 'じむしょは どこですか。', romaji: 'Jimusho wa doko desu ka.', meaning: 'Kantor ada di mana?' },
      { japanese: 'じむしょは ２かいです。', romaji: 'Jimusho wa ni-kai desu.', meaning: 'Kantor ada di lantai 2.' },
    ],
    usageScenario: 'Bertanya letak toilet, lift, atau kantor saat Anda mengunjungi gedung perkantoran, stasiun, atau mal.',
    commonMistakes: [
      {
        wrong: 'どこは トイレですか。 (Doko wa toire desu ka)',
        correct: 'トイレは どこですか。 (Toire wa doko desu ka)',
        explanation: 'Tempat yang ingin dicari harus selalu berada di depan sebelum partikel は.',
      },
    ],
    miniExercise: {
      question: 'Seseorang bertanya: "じむしょは どこですか。" Jika kantor berada di lantai 2, jawabannya adalah...',
      options: ['２かいです。', '２ばんです。', '２さいです。'],
      answer: '２かいです。',
      explanation: 'Tingkat lantai gedung dihitung dengan partikel ～かい (kai). Lantai 2 = ２かい (ni-kai).',
    },
  },
  {
    id: 'g3-3',
    number: 3,
    title: 'Pola 3 — こちら・そちら・あちら・どちら (Bentuk Sopan)',
    formula: 'こちら / そちら / あちら / どちら (Arah & Lokasi Sopan)',
    functionDesc:
      'こちら, そちら, あちら, どちら adalah padanan yang lebih santun dan sopan dari ここ, そこ, あそこ, どこ. Selain menunjukkan arah, bentuk ini lazim digunakan petugas pelayanan di resepsionis, toko, atau menanyakan negara asal lawan bicara (おくに は どちらですか).',
    structureFormula: ['Bentuk Sopan Arah', 'は', 'Tempat', 'です'],
    breakdownExample: {
      japanese: 'うけつけは こちらです。',
      romaji: 'Uketsuke wa kochira desu.',
      meaning: 'Resepsionis ada di sebelah sini (sopan).',
      tokens: [
        { token: 'うけつけ', romaji: 'uketsuke', role: 'Subjek Tempat', meaning: 'Resepsionis' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Penanda topik' },
        { token: 'こちら', romaji: 'kochira', role: 'Arah Sopan', meaning: 'Sebelah sini / di sini' },
        { token: 'です', romaji: 'desu', role: 'Kopula Sopan', meaning: 'Penutup kalimat santun' },
      ],
    },
    examples: [
      { japanese: 'うけつけは こちらです。', romaji: 'Uketsuke wa kochira desu.', meaning: 'Resepsionis di sebelah sini (sopan).' },
      { japanese: 'エレベーターは あちらです。', romaji: 'Erebeetaa wa achira desu.', meaning: 'Lift di sebelah sana.' },
      { japanese: 'おくには どちらですか。', romaji: 'Okuni wa dochira desu ka.', meaning: 'Berasal dari negara mana (sopan)?' },
    ],
    usageScenario: 'Mengantarkan tamu kantor ke ruang rapat atau menanyakan asal negara rekan kerja dengan penuh rasa hormat.',
    commonMistakes: [
      {
        wrong: 'おくには どこですか。 (Okuni wa doko desu ka — terdengar terlalu kasual)',
        correct: 'おくには どちらですか。 (Okuni wa dochira desu ka — sangat santun)',
        explanation: 'Saat menanyakan negara asal seseorang, gunakan bentuk sopan どちら (dochira) didahului prefiks kehormatan お (okuni).',
      },
    ],
    miniExercise: {
      question: 'Bentuk sopan dari kata tanya lokasi "どこ" adalah...',
      options: ['こちら', 'そちら', 'どちら'],
      answer: 'どちら',
      explanation: 'どこ berpasangan dengan bentuk sopan どちら (dochira).',
    },
  },
  {
    id: 'g3-4',
    number: 4,
    title: 'Pola 4 — どこの [Nomina] ですか (Asal Negara & Afiliasi)',
    formula: 'これは どこの ＋ [Kata Benda] ＋ ですか。',
    functionDesc:
      'どこの (doko no) digunakan untuk menanyakan dari negara mana suatu produk berasal, atau perusahaan mana yang memproduksinya. Dijawab dengan format [Negara / Perusahaan] の [Benda] です.',
    structureFormula: ['Kata Tunjuk', 'は', 'どこの', 'Nomina', 'ですか'],
    breakdownExample: {
      japanese: 'これは どこの くつですか。',
      romaji: 'Kore wa doko no kutsu desu ka.',
      meaning: 'Ini sepatu buatan negara mana?',
      tokens: [
        { token: 'これ', romaji: 'kore', role: 'Kata Tunjuk Benda', meaning: 'Ini' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Penanda topik' },
        { token: 'どこの', romaji: 'doko no', role: 'Kata Tanya Afiliasi/Asal', meaning: 'Dari mana / buatan mana' },
        { token: 'くつ', romaji: 'kutsu', role: 'Nomina Benda', meaning: 'Sepatu' },
        { token: 'ですか', romaji: 'desu ka', role: 'Kopula Tanya', meaning: 'Apakah' },
      ],
    },
    examples: [
      { japanese: 'これは どこの くつですか。', romaji: 'Kore wa doko no kutsu desu ka.', meaning: 'Ini sepatu buatan mana?' },
      { japanese: 'これは イタリアの くつです。', romaji: 'Kore wa Itaria no kutsu desu.', meaning: 'Ini sepatu buatan Italia.' },
      { japanese: 'それは どこの カメラですか。', romaji: 'Sore wa doko no kamera desu ka.', meaning: 'Itu kamera buatan mana?' },
      { japanese: 'にほんの カメラです。', romaji: 'Nihon no kamera desu.', meaning: 'Kamera buatan Jepang.' },
    ],
    usageScenario: 'Melihat barang di etalase toko dan menanyakan negara produsen (misalnya kamera Jepang, wine Prancis, sepatu Italia).',
    commonMistakes: [
      {
        wrong: 'これは どこ くつですか。 (Kore wa doko kutsu desu ka)',
        correct: 'これは どこの くつですか。 (Kore wa doko no kutsu desu ka)',
        explanation: 'Wajib menggunakan partikel penghubung の setelah kata tanya どこ.',
      },
    ],
    miniExercise: {
      question: 'Bagaimana menjawab: "それは どこの ワインですか。" jika wine tersebut berasal dari Prancis?',
      options: ['フランス ワインです。', 'フランスの ワインです。', 'ワインの フランスです。'],
      answer: 'フランスの ワインです。',
      explanation: 'Negara asal diletakkan di depan benda dengan partikel の: [Negara] の [Benda] です.',
    },
  },
  {
    id: 'g3-5',
    number: 5,
    title: 'Pola 5 — [Nama Barang] は いくらですか',
    formula: '[Kata Tunjuk / Nama Barang] ＋ は ＋ いくらですか。',
    functionDesc:
      'いくら (ikura) berarti "berapa harganya". Digunakan untuk menanyakan harga barang di toko atau pasar. Dijawab dengan nominal harga dalam Yen ([Nominal] えんです).',
    structureFormula: ['Nomina Barang', 'は', 'いくら', 'ですか'],
    breakdownExample: {
      japanese: 'この かばんは いくらですか。',
      romaji: 'Kono kaban wa ikura desu ka.',
      meaning: 'Tas ini berapa harganya?',
      tokens: [
        { token: 'この', romaji: 'kono', role: 'Pewatas Tunjuk', meaning: '... ini' },
        { token: 'かばん', romaji: 'kaban', role: 'Nomina Barang', meaning: 'Tas' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Penanda topik' },
        { token: 'いくら', romaji: 'ikura', role: 'Kata Tanya Harga', meaning: 'Berapa harga' },
        { token: 'ですか', romaji: 'desu ka', role: 'Kopula Tanya', meaning: 'Apakah' },
      ],
    },
    examples: [
      { japanese: 'この かばんは いくらですか。', romaji: 'Kono kaban wa ikura desu ka.', meaning: 'Tas ini berapa harganya?' },
      { japanese: 'その ネクタイは いくらですか。', romaji: 'Sono nekutai wa ikura desu ka.', meaning: 'Dasi itu berapa harganya?' },
      { japanese: '３,５００えんです。', romaji: 'Sanzen gohyaku en desu.', meaning: 'Harganya 3.500 Yen.' },
    ],
    usageScenario: 'Menanyakan harga baju, dasi, atau souvenir di pusat perbelanjaan di Jepang.',
    commonMistakes: [
      {
        wrong: 'この かばんは なんえん ですか。 (Kono kaban wa nan-en desu ka — kurang alami)',
        correct: 'この かばんは いくらですか。 (Kono kaban wa ikura desu ka — pola baku)',
        explanation: 'Pola standar dan paling lazim dalam bahasa Jepang untuk menanyakan harga adalah いくらですか.',
      },
    ],
    miniExercise: {
      question: 'Jika dasi berharga 3.500 Yen, bagaimana cara mengatakannya dalam bahasa Jepang?',
      options: ['さんぜんごひゃくえんです。', 'さんせんごひゃくえんです。', 'さんぜんごせんえんです。'],
      answer: 'さんぜんごひゃくえんです。',
      explanation: '3.000 dilafalkan khusus さんぜん (sanzen), dan 500 adalah ごひゃく (gohyaku) + えん.',
    },
  },
  {
    id: 'g3-6',
    number: 6,
    title: 'Pola 6 — Nominal Harga Yen & Pelafalan Khusus',
    formula: '[Nominal Angka] ＋ えん (Pelafalan Khusus 300, 600, 800, 3000, 8000)',
    functionDesc:
      'Mata uang Jepang adalah 円 (えん / en). Angka ratusan (ひゃく) dan ribuan (せん) memiliki perubahan bunyi khusus: 300 (さんびゃく), 600 (ろっぴゃく), 800 (はっぴゃく), 3.000 (さんぜん), dan 8.000 (はっせん). Selain itu, 10.000 disebut いちまん (bukan man saja).',
    structureFormula: ['Angka Khusus', 'えん (Yen)'],
    breakdownExample: {
      japanese: 'この くつは ８,０００えんです。',
      romaji: 'Kono kutsu wa hassen-en desu.',
      meaning: 'Sepatu ini harganya 8.000 Yen.',
      tokens: [
        { token: 'この くつ', romaji: 'kono kutsu', role: 'Subjek Barang', meaning: 'Sepatu ini' },
        { token: 'は', romaji: 'wa', role: 'Partikel Topik', meaning: 'Penanda topik' },
        { token: '８,０００', romaji: 'hassen', role: 'Nominal Khusus', meaning: '8.000 (bunyi konsonan ganda s)' },
        { token: 'えんです', romaji: 'en desu', role: 'Satuan Mata Uang & Kopula', meaning: 'Yen' },
      ],
    },
    examples: [
      { japanese: 'この くつは ８,０００えんです。', romaji: 'Kono kutsu wa hassen-en desu.', meaning: 'Sepatu ini harganya 8.000 Yen.' },
      { japanese: 'あの カメラは ３０,０００えんです。', romaji: 'Ano kamera wa sanman-en desu.', meaning: 'Kamera itu harganya 30.000 Yen.' },
      { japanese: 'ワインは ろっぴゃくえんです。', romaji: 'Wain wa roppyaku-en desu.', meaning: 'Wine ini harganya 600 Yen.' },
    ],
    usageScenario: 'Mendengarkan kasir menyebutkan total belanjaan atau membaca price tag barang di toko.',
    commonMistakes: [
      {
        wrong: 'はちせんえん (Hachisen en)',
        correct: 'はっせんえん (Hassen en)',
        explanation: 'Angka 8.000 mengalami asimilasi bunyi menjadi konsonan ganda はっせん (hassen).',
      },
    ],
    miniExercise: {
      question: 'Manakah pelafalan yang tepat untuk harga 600 Yen?',
      options: ['ろくひゃくえん', 'ろっぴゃくえん', 'ろくびゃくえん'],
      answer: 'ろっぴゃくえん',
      explanation: '600 dilafalkan khusus sebagai ろっぴゃく (roppyaku).',
    },
  },
  {
    id: 'g3-7',
    number: 7,
    title: 'Pola 7 — Ungkapan Transaksi Toko (すみません / ください)',
    formula: 'すみません。 ＋ [Barang] ＋ を ください / を みせてください。',
    functionDesc:
      'Gunakan すみません (sumimasen) untuk memanggil staf toko. Gunakan [Barang] を みせてください saat ingin melihat barang lebih dekat, dan [Barang] を ください saat memutuskan untuk membeli barang tersebut.',
    structureFormula: ['すみません', '[Barang] を ください'],
    breakdownExample: {
      japanese: 'じゃ、これを ください。',
      romaji: 'Ja, kore o kudasai.',
      meaning: 'Kalau begitu, tolong berikan yang ini (saya beli yang ini).',
      tokens: [
        { token: 'じゃ', romaji: 'ja', role: 'Kata Penghubung', meaning: 'Kalau begitu' },
        { token: 'これ', romaji: 'kore', role: 'Objek Pilihan', meaning: 'Yang ini' },
        { token: 'を', romaji: 'o', role: 'Partikel Objek', meaning: 'Penanda objek penderita' },
        { token: 'ください', romaji: 'kudasai', role: 'Kata Permintaan Santun', meaning: 'Tolong berikan' },
      ],
    },
    examples: [
      { japanese: 'すみません、その カメラを みせてください。', romaji: 'Sumimasen, sono kamera o misete kudasai.', meaning: 'Permisi, tolong perlihatkan kamera itu.' },
      { japanese: 'はい、どうぞ。', romaji: 'Hai, douzo.', meaning: 'Ya, silakan.' },
      { japanese: 'じゃ、これを ください。', romaji: 'Ja, kore o kudasai.', meaning: 'Kalau begitu, saya beli yang ini.' },
    ],
    usageScenario: 'Mengambil keputusan belanja di kasir setelah menanyakan harga dan spesifikasi barang.',
    commonMistakes: [
      {
        wrong: 'これ ください (Kore kudasai — kurang partikel objek)',
        correct: 'これを ください (Kore o kudasai)',
        explanation: 'Partikel を (ditulis wo, dibaca o) menghubungkan objek benda dengan kata kerja permintaan ください.',
      },
    ],
    miniExercise: {
      question: 'Apa arti ungkapan "これを みせてください" saat berbelanja?',
      options: ['Tolong berikan yang ini (saya beli)', 'Tolong perlihatkan yang ini', 'Ini harganya berapa'],
      answer: 'Tolong perlihatkan yang ini',
      explanation: 'みせてください (misete kudasai) berarti tolong perlihatkan / perkenankan saya melihat.',
    },
  },
]

export const SENTENCE_BUILDER_CHALLENGES_L3: SentenceBuilderChallenge[] = [
  {
    id: 'sbc3-1',
    patternId: 'g3-1',
    targetIndonesian: 'Di sini adalah ruang kelas.',
    hint: 'Gunakan kata tunjuk dekat pembicara dan nama ruangan belajar.',
    scrambledWords: ['きょうしつ', 'です', 'ここ', 'は'],
    correctOrder: ['ここ', 'は', 'きょうしつ', 'です'],
    romaji: 'Koko wa kyoushitsu desu.',
    explanation: 'Subjek lokasi ここ diikuti partikel は, nama ruangan きょうしつ, dan diakhiri kopula sopan です.',
  },
  {
    id: 'sbc3-2',
    patternId: 'g3-2',
    targetIndonesian: 'Toilet ada di mana?',
    hint: 'Subjek yang dicari diletakkan di depan sebelum partikel は.',
    scrambledWords: ['どこ', 'トイレ', 'ですか', 'は'],
    correctOrder: ['トイレ', 'は', 'どこ', 'ですか'],
    romaji: 'Toire wa doko desu ka.',
    explanation: 'Tempat yang dicari (トイレ) diletakkan sebagai topik di awal kalimat, diikuti kata tanya lokasi (どこですか).',
  },
  {
    id: 'sbc3-3',
    patternId: 'g3-2',
    targetIndonesian: 'Kantor ada di lantai 2.',
    hint: 'Penghitung lantai gedung menggunakan ～かい.',
    scrambledWords: ['２かい', 'じむしょ', 'です', 'は'],
    correctOrder: ['じむしょ', 'は', '２かい', 'です'],
    romaji: 'Jimusho wa ni-kai desu.',
    explanation: 'じむしょ (kantor) adalah topik, letaknya adalah ２かい (lantai dua), diakhiri です.',
  },
  {
    id: 'sbc3-4',
    patternId: 'g3-3',
    targetIndonesian: 'Resepsionis ada di sebelah sini.',
    hint: 'Gunakan bentuk sopan arah kochira.',
    scrambledWords: ['こちら', 'うけつけ', 'です', 'は'],
    correctOrder: ['うけつけ', 'は', 'こちら', 'です'],
    romaji: 'Uketsuke wa kochira desu.',
    explanation: 'うけつけ (resepsionis) + は + こちら (sebelah sini) + です.',
  },
  {
    id: 'sbc3-5',
    patternId: 'g3-4',
    targetIndonesian: 'Sepatu ini berasal dari Italia.',
    hint: 'Gunakan partikel kepemilikan / asal の setelah nama negara.',
    scrambledWords: ['イタリア', 'この', 'です', 'くつ', 'の', 'は'],
    correctOrder: ['この', 'くつ', 'は', 'イタリア', 'の', 'です'],
    romaji: 'Kono kutsu wa Itaria no desu.',
    explanation: 'この くつ (sepatu ini) + は + イタリアの (buatan Italia) + です.',
  },
  {
    id: 'sbc3-6',
    patternId: 'g3-5',
    targetIndonesian: 'Tas itu berapa harganya?',
    hint: 'Kata tanya harga adalah いくら.',
    scrambledWords: ['かばん', 'その', 'ですか', 'いくら', 'は'],
    correctOrder: ['その', 'かばん', 'は', 'いくら', 'ですか'],
    romaji: 'Sono kaban wa ikura desu ka.',
    explanation: 'その かばん (tas itu) + は + いくら (berapa harga) + ですか.',
  },
  {
    id: 'sbc3-7',
    patternId: 'g3-7',
    targetIndonesian: 'Kalau begitu, tolong berikan yang ini.',
    hint: 'Awali dengan kata penghubung ja, lalu objek kore dan partikel o.',
    scrambledWords: ['じゃ', 'ください', 'を', 'これ'],
    correctOrder: ['じゃ', 'これ', 'を', 'ください'],
    romaji: 'Ja, kore o kudasai.',
    explanation: 'じゃ (kalau begitu) + これ (yang ini) + を (partikel objek) + ください (tolong berikan).',
  },
]

export const INTERACTIVE_DIALOGUES_L3: InteractiveDialogue[] = [
  {
    id: 'dlg3-1',
    title: 'Dialog A — Menanyakan Toilet di Gedung',
    context: 'Ali baru tiba di gedung perkantoran dan ingin menanyakan posisi toilet kepada staf resepsionis.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Pengunjung' },
      { name: 'Staf', avatar: 'JP', role: 'Petugas Resepsionis' },
    ],
    turns: [
      {
        id: 'd1-t1',
        speaker: 'Ali',
        japanese: 'すみません。トイレは どこですか。',
        romaji: 'Sumimasen. Toire wa doko desu ka.',
        indonesian: 'Permisi. Toilet ada di mana?',
      },
      {
        id: 'd1-t2',
        speaker: 'Staf',
        japanese: 'あそこです。',
        romaji: 'Asoko desu.',
        indonesian: 'Ada di sana (jauh dari posisi kita).',
      },
      {
        id: 'd1-t3',
        speaker: 'Ali',
        japanese: 'ありがとうございます。',
        romaji: 'Arigatou gozaimasu.',
        indonesian: 'Terima kasih banyak.',
        isUserTurn: true,
        options: [
          {
            text: 'ありがとうございます。',
            romaji: 'Arigatou gozaimasu.',
            isCorrect: true,
            feedback: 'Tepat sekali! Mengucapkan terima kasih setelah diberitahu arah adalah etika dasar di Jepang.',
          },
          {
            text: 'いいえ、ちがいます。',
            romaji: 'Iie, chigaimasu.',
            isCorrect: false,
            feedback: 'Kurang tepat. Ini berarti "Bukan, salah" yang tidak pantas diucapkan saat menerima bantuan.',
          },
        ],
      },
      {
        id: 'd1-t4',
        speaker: 'Staf',
        japanese: 'どういたしまして。',
        romaji: 'Dou itashimashite.',
        indonesian: 'Sama-sama.',
      },
    ],
  },
  {
    id: 'dlg3-2',
    title: 'Dialog B — Menanyakan Lokasi Kantor & Lift',
    context: 'Miller menanyakan keberadaan kantor tata usaha dan letak lift gedung kepada Tanaka.',
    characters: [
      { name: 'Miller', avatar: 'US', role: 'Karyawan Baru' },
      { name: 'Tanaka', avatar: 'JP', role: 'Rekan Senior' },
    ],
    turns: [
      {
        id: 'd2-t1',
        speaker: 'Miller',
        japanese: 'じむしょは どこですか。',
        romaji: 'Jimusho wa doko desu ka.',
        indonesian: 'Kantor tata usaha ada di mana?',
      },
      {
        id: 'd2-t2',
        speaker: 'Tanaka',
        japanese: '２かいです。',
        romaji: 'Ni-kai desu.',
        indonesian: 'Ada di lantai dua.',
      },
      {
        id: 'd2-t3',
        speaker: 'Miller',
        japanese: 'エレベーターは どこですか。',
        romaji: 'Erebeetaa wa doko desu ka.',
        indonesian: 'Lift ada di mana?',
        isUserTurn: true,
        options: [
          {
            text: 'エレベーターは どこですか。',
            romaji: 'Erebeetaa wa doko desu ka.',
            isCorrect: true,
            feedback: 'Bagus! Menanyakan letak lift dengan menempatkannya sebagai topik sebelum partikel は.',
          },
          {
            text: 'エレベーターは なんさいですか。',
            romaji: 'Erebeetaa wa nansai desu ka.',
            isCorrect: false,
            feedback: 'Salah. なんさい (nansai) digunakan untuk menanyakan umur orang, bukan lokasi benda.',
          },
        ],
      },
      {
        id: 'd2-t4',
        speaker: 'Tanaka',
        japanese: 'エレベーターは こちらです。',
        romaji: 'Erebeetaa wa kochira desu.',
        indonesian: 'Lift ada di sebelah sini.',
      },
    ],
  },
  {
    id: 'dlg3-3',
    title: 'Dialog C — Menanyakan Asal Produk Sepatu',
    context: 'Ali sedang melihat etalase sepatu dan menanyakan dari mana sepatu tersebut diimpor.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Pelanggan' },
      { name: 'Penjual', avatar: 'JP', role: 'Pramuniaga Toko' },
    ],
    turns: [
      {
        id: 'd3-t1',
        speaker: 'Ali',
        japanese: 'これは どこの くつですか。',
        romaji: 'Kore wa doko no kutsu desu ka.',
        indonesian: 'Sepatu ini buatan mana?',
      },
      {
        id: 'd3-t2',
        speaker: 'Penjual',
        japanese: 'イタリアの くつで ございます。',
        romaji: 'Itaria no kutsu de gozaimasu.',
        indonesian: 'Ini sepatu buatan Italia (sopan).',
      },
      {
        id: 'd3-t3',
        speaker: 'Ali',
        japanese: 'そうですか。',
        romaji: 'Sou desu ka.',
        indonesian: 'Oh, begitu ya.',
        isUserTurn: true,
        options: [
          {
            text: 'そうですか。',
            romaji: 'Sou desu ka.',
            isCorrect: true,
            feedback: 'Tepat! Ungkapan そうですか digunakan saat menerima informasi baru dari orang lain.',
          },
          {
            text: 'はじめまして。',
            romaji: 'Hajimemashite.',
            isCorrect: false,
            feedback: 'Kurang tepat. はじめまして adalah salam perkenalan pertama kali bertemu.',
          },
        ],
      },
    ],
  },
  {
    id: 'dlg3-4',
    title: 'Dialog D — Berbelanja Tas di Mal',
    context: 'Ali menanyakan harga tas kulit dan memutuskan untuk membelinya.',
    characters: [
      { name: 'Ali', avatar: 'ID', role: 'Pembeli' },
      { name: 'Kasir', avatar: 'JP', role: 'Kasir Toko' },
    ],
    turns: [
      {
        id: 'd4-t1',
        speaker: 'Ali',
        japanese: 'すみません。この かばんは いくらですか。',
        romaji: 'Sumimasen. Kono kaban wa ikura desu ka.',
        indonesian: 'Permisi. Tas ini berapa harganya?',
      },
      {
        id: 'd4-t2',
        speaker: 'Kasir',
        japanese: '１２,０００えんです。',
        romaji: 'Ichiman nisen-en desu.',
        indonesian: 'Harganya 12.000 Yen.',
      },
      {
        id: 'd4-t3',
        speaker: 'Ali',
        japanese: 'じゃ、これを ください。',
        romaji: 'Ja, kore o kudasai.',
        indonesian: 'Kalau begitu, tolong berikan yang ini (saya beli yang ini).',
        isUserTurn: true,
        options: [
          {
            text: 'じゃ、これを ください。',
            romaji: 'Ja, kore o kudasai.',
            isCorrect: true,
            feedback: 'Benar sekali! "Kore o kudasai" adalah ungkapan paten dalam transaksi pembelian di toko.',
          },
          {
            text: 'じゃ、これを みせません。',
            romaji: 'Ja, kore o misemasen.',
            isCorrect: false,
            feedback: 'Salah. Ini berarti "tidak memperlihatkan yang ini".',
          },
        ],
      },
      {
        id: 'd4-t4',
        speaker: 'Kasir',
        japanese: 'ありがとうございます。',
        romaji: 'Arigatou gozaimasu.',
        indonesian: 'Terima kasih banyak atas pembelian Anda.',
      },
    ],
  },
  {
    id: 'dlg3-5',
    title: 'Dialog E — Menanyakan Negara Asal Secara Sopan',
    context: 'Tanaka berbincang dengan Ali di lobi kantor dan menanyakan negara asalnya dengan bentuk santun.',
    characters: [
      { name: 'Tanaka', avatar: 'JP', role: 'Karyawan Senior' },
      { name: 'Ali', avatar: 'ID', role: 'Peserta Baru' },
    ],
    turns: [
      {
        id: 'd5-t1',
        speaker: 'Tanaka',
        japanese: 'おくには どちらですか。',
        romaji: 'Okuni wa dochira desu ka.',
        indonesian: 'Negara asal Anda dari mana?',
      },
      {
        id: 'd5-t2',
        speaker: 'Ali',
        japanese: 'インドネシアです。',
        romaji: 'Indoneshia desu.',
        indonesian: 'Indonesia.',
        isUserTurn: true,
        options: [
          {
            text: 'インドネシアです。',
            romaji: 'Indoneshia desu.',
            isCorrect: true,
            feedback: 'Sempurna! Menjawab nama negara secara lugas dan sopan.',
          },
          {
            text: 'インドネシアの くつです。',
            romaji: 'Indoneshia no kutsu desu.',
            isCorrect: false,
            feedback: 'Salah. Ini berarti "sepatu buatan Indonesia", padahal pertanyaannya adalah negara asal Anda.',
          },
        ],
      },
      {
        id: 'd5-t3',
        speaker: 'Tanaka',
        japanese: 'そうですか。',
        romaji: 'Sou desu ka.',
        indonesian: 'Oh, begitu ya.',
      },
    ],
  },
]

export const VOCAB_MATCHING_PAIRS_L3: MatchingPair[] = [
  { id: 'm3-1', japanese: 'きょうしつ', romaji: 'kyoushitsu', indonesian: 'Ruang kelas' },
  { id: 'm3-2', japanese: 'しょくどう', romaji: 'shokudou', indonesian: 'Kantin' },
  { id: 'm3-3', japanese: 'じむしょ', romaji: 'jimusho', indonesian: 'Kantor' },
  { id: 'm3-4', japanese: 'うけつけ', romaji: 'uketsuke', indonesian: 'Resepsionis' },
  { id: 'm3-5', japanese: 'エレベーター', romaji: 'erebeetaa', indonesian: 'Lift' },
  { id: 'm3-6', japanese: 'かいだん', romaji: 'kaidan', indonesian: 'Tangga' },
  { id: 'm3-7', japanese: 'いくら', romaji: 'ikura', indonesian: 'Berapa harga' },
  { id: 'm3-8', japanese: 'どちら', romaji: 'dochira', indonesian: 'Sebelah mana (sopan)' },
]

export const LOCATION_QUIZZES_L3: ParticleQuiz[] = [
  {
    id: 1,
    sentenceBefore: 'トイレは',
    sentenceAfter: 'ですか。 (Menanyakan lokasi toilet)',
    options: ['どこ', 'いくra', 'なんがい', 'だれ'],
    correct: 'どこ',
    reason: 'どこ (doko) adalah kata tanya standar untuk menanyakan letak lokasi keberadaan ruangan/fasilitas.',
    fullSentence: 'トイレは どこですか。',
    romaji: 'Toire wa doko desu ka.',
    indonesian: 'Toilet ada di mana?',
  },
  {
    id: 2,
    sentenceBefore: 'ここは きょうしつ',
    sentenceAfter: '。 (Di sini adalah ruang kelas)',
    options: ['です', 'か', 'の', 'も'],
    correct: 'です',
    reason: 'Kalimat deklaratif sopan ditutup dengan kopula です (desu).',
    fullSentence: 'ここは きょうしつです。',
    romaji: 'Koko wa kyoushitsu desu.',
    indonesian: 'Di sini adalah ruang kelas.',
  },
  {
    id: 3,
    sentenceBefore: 'この くつは',
    sentenceAfter: 'ですか。 (Menanyakan harga sepatu)',
    options: ['いくら', 'どこ', 'なんさい', 'どちら'],
    correct: 'いくら',
    reason: 'いくら (ikura) adalah kata tanya khusus untuk menanyakan harga barang.',
    fullSentence: 'この くつは いくらですか。',
    romaji: 'Kono kutsu wa ikura desu ka.',
    indonesian: 'Sepatu ini berapa harganya?',
  },
  {
    id: 4,
    sentenceBefore: 'これは',
    sentenceAfter: 'の カメラですか。 (Dari negara mana kamera ini)',
    options: ['どこ', 'だれ', 'なん', 'いくら'],
    correct: 'どこ',
    reason: 'どこの (doko no) digunakan untuk menanyakan negara asal atau produsen suatu barang.',
    fullSentence: 'これは どこの カメラですか。',
    romaji: 'Kore wa doko no kamera desu ka.',
    indonesian: 'Ini kamera buatan negara mana?',
  },
  {
    id: 5,
    sentenceBefore: 'じむしょは ３',
    sentenceAfter: 'です。 (Kantor ada di lantai tiga)',
    options: ['かい', 'さい', 'ねん', 'ばん'],
    correct: 'かい',
    reason: 'Tingkat lantai gedung dihitung menggunakan satuan ～かい (kai / -gai).',
    fullSentence: 'じむしょは ３かいです。',
    romaji: 'Jimusho wa san-kai desu.',
    indonesian: 'Kantor ada di lantai tiga.',
  },
  {
    id: 6,
    sentenceBefore: 'おくには',
    sentenceAfter: 'ですか。 (Bentuk sopan menanyakan negara asal)',
    options: ['どちら', 'どこ', 'だれ', 'どれ'],
    correct: 'どちら',
    reason: 'どちら (dochira) adalah bentuk sopan kehormatan dari doko untuk menanyakan negara asal orang lain.',
    fullSentence: 'おくには どちらですか。',
    romaji: 'Okuni wa dochira desu ka.',
    indonesian: 'Negara asal Anda dari mana?',
  },
]

export const TRANSLATE_QUIZZES_L3: TranslateQuiz[] = [
  {
    id: 1,
    indonesian: 'Di sini adalah ruang kelas.',
    japanese: 'ここは きょうしつです。',
    romaji: 'Koko wa kyoushitsu desu.',
  },
  {
    id: 2,
    indonesian: 'Toilet ada di mana?',
    japanese: 'トイレは どこですか。',
    romaji: 'Toire wa doko desu ka.',
  },
  {
    id: 3,
    indonesian: 'Kantor ada di lantai tiga.',
    japanese: 'じむしょは ３かいです。',
    romaji: 'Jimusho wa san-kai desu.',
  },
  {
    id: 4,
    indonesian: 'Sepatu ini berasal dari Italia.',
    japanese: 'この くつは イタリアのです。',
    romaji: 'Kono kutsu wa Itaria no desu.',
  },
  {
    id: 5,
    indonesian: 'Tas itu berapa harganya?',
    japanese: 'その かばんは いくらですか。',
    romaji: 'Sono kaban wa ikura desu ka.',
  },
  {
    id: 6,
    indonesian: 'Negara Anda dari mana? (Bentuk sopan)',
    japanese: 'おくには どちらですか。',
    romaji: 'Okuni wa dochira desu ka.',
  },
]

export const EVALUATION_INDICATORS_L3: EvaluationIndicator[] = [
  { id: 'eval3-1', label: 'Dapat membedakan kata tunjuk lokasi fisik ここ, そこ, dan あそこ' },
  { id: 'eval3-2', label: 'Dapat bertanya lokasi fasilitas gedung dengan pola ～は どこですか' },
  { id: 'eval3-3', label: 'Mengenali dan menggunakan bentuk sopan arah こちら・そちら・あちら・どちら' },
  { id: 'eval3-4', label: 'Dapat menyatakan letak lantai gedung dengan satuan ～かい (なんがい)' },
  { id: 'eval3-5', label: 'Dapat menanyakan asal produsen/negara suatu barang dengan どこの' },
  { id: 'eval3-6', label: 'Dapat menanyakan harga barang dengan pola ～は いくらですか' },
  { id: 'eval3-7', label: 'Dapat menyebutkan nominal angka harga Yen termasuk pelafalan khusus (300, 600, 800, 3000, 8000)' },
]

export const STUDY_PLAN_5_DAYS_L3: StudyPlanDay[] = [
  {
    day: 1,
    title: 'Kosakata Tempat & Fasilitas Gedung',
    focus: 'Pengenalan 15 nama fasilitas dan ruangan utama',
    tasks: [
      'Hafalkan kosakata ruangan (きょうしつ, しょくどう, じむしょ, かいぎしつ, うけつけ, トイレ).',
      'Latih pengucapan fasilitas transportasi vertikal (かいだん, エレベーター, エスカレーター).',
      'Kerjakan drill flashcard kategori Fasilitas & Ruangan sampai status hafal.',
    ],
  },
  {
    day: 2,
    title: 'Kata Tunjuk Lokasi & Model Spasial',
    focus: 'Membedakan ここ・そこ・あそこ dan bentuk sopan こちら・そちら・あちら',
    tasks: [
      'Pahami 3 zona jarak lokasi terhadap posisi pembicara dan lawan bicara.',
      'Bandingkan kapan memakai bentuk biasa (koko) vs bentuk pelayanan sopan (kochira).',
      'Selesaikan kuis kilas balik zona lokasi di Sesi 2.',
    ],
  },
  {
    day: 3,
    title: 'Pola Pertanyaan Tempat & Lantai Gedung',
    focus: 'Membuat 8 pertanyaan lokasi dengan どこ dan どちら',
    tasks: [
      'Latih pertanyaan: トイレは どこですか / エレベーターは どちらですか.',
      'Kuasai penomoran lantai gedung (1かい, 2かい, 3かい, basement ちか).',
      'Praktikkan simulasi dialog menanyakan kantor dan toilet di Sesi 6.',
    ],
  },
  {
    day: 4,
    title: 'Asal Produk & Menanyakan Harga Yen',
    focus: 'Penggunaan どcon / どこの dan pola ～は いくらですか',
    tasks: [
      'Latih rumus asal barang: これは どこの くつですか -> イタリアの くつです.',
      'Hafalkan angka dan pelafalan khusus Yen: 300 (sanbyaku), 600 (roppyaku), 800 (happyaku), 3000 (sanzen), 8000 (hassen).',
      'Gunakan Simulator Generator Bab 3 untuk meracik dialog belanja dan cek harga.',
    ],
  },
  {
    day: 5,
    title: 'Simulasi Belanja Lengkap & Evaluasi Mandiri',
    focus: 'Roleplay belanja di toko dan verifikasi 7 indikator kelulusan',
    tasks: [
      'Praktikkan kalimat transaksi: すみません -> これを みせてください -> いくらですか -> これを ください.',
      'Selesaikan tantangan Sentence Builder dan seluruh kuis di Sesi 7.',
      'Centang minimal 6 dari 7 indikator kelulusan Bab 3 di Sesi 8.',
    ],
  },
]
