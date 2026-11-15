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

export interface JapaneseVocabL5 {
  id: string
  japanese: string
  romaji: string
  meaning: string
  category: 'Kata Kerja Perjalanan' | 'Alat Transportasi' | 'Tempat & Tujuan' | 'Kata Waktu & Ungkapan'
  notes?: string
}

export interface TransportModeItem {
  id: string
  japanese: string
  romaji: string
  meaning: string
  category: 'darat' | 'rel' | 'udara' | 'laut' | 'kaki'
  particleUsage: string
  notes?: string
}

export const TRANSPORT_MODES_L5: TransportModeItem[] = [
  { id: 'tr-1', japanese: '電車', romaji: 'densha', meaning: 'Kereta listrik', category: 'rel', particleUsage: '電車で (densha de)', notes: 'Kereta komuter perkotaan harian di Jepang (JR / Subway).' },
  { id: 'tr-2', japanese: '新幹線', romaji: 'shinkansen', meaning: 'Kereta cepat (Bullet train)', category: 'rel', particleUsage: '新幹線で (shinkansen de)', notes: 'Kereta peluru antarkota berkecepatan 300+ km/jam (misal Tokyo ke Kyoto).' },
  { id: 'tr-3', japanese: '地下鉄', romaji: 'chikatetsu', meaning: 'Kereta bawah tanah / MRT', category: 'rel', particleUsage: '地下鉄で (chikatetsu de)', notes: 'Jaringan kereta metro bawah tanah di kota-kota besar Jepang.' },
  { id: 'tr-4', japanese: 'バス', romaji: 'basu', meaning: 'Bus', category: 'darat', particleUsage: 'バスで (basu de)', notes: 'Kata serapan asing (gairaigo) dari bahasa Inggris.' },
  { id: 'tr-5', japanese: 'タクシー', romaji: 'takushii', meaning: 'Taksi', category: 'darat', particleUsage: 'タクシーで (takushii de)', notes: 'Pintu belakang taksi di Jepang terbuka dan tertutup otomatis.' },
  { id: 'tr-6', japanese: '飛行機', romaji: 'hikouki', meaning: 'Pesawat terbang', category: 'udara', particleUsage: '飛行機で (hikouki de)', notes: 'Digunakan untuk perjalanan antar pulau atau perjalanan internasional.' },
  { id: 'tr-7', japanese: '船', romaji: 'fune', meaning: 'Kapal laut / Feri', category: 'laut', particleUsage: '船で (fune de)', notes: 'Kapal penumpang atau feri penyeberangan antar pelabuhan.' },
  { id: 'tr-8', japanese: '自転車', romaji: 'jitensha', meaning: 'Sepeda', category: 'darat', particleUsage: '自転車で (jitensha de)', notes: 'Alat transportasi yang sangat populer bagi pelajar dan pekerja di Jepang.' },
  { id: 'tr-9', japanese: '車', romaji: 'kuruma', meaning: 'Mobil', category: 'darat', particleUsage: '車で (kuruma de)', notes: 'Mobil pribadi atau kendaraan roda empat.' },
  { id: 'tr-10', japanese: '歩いて', romaji: 'aruite', meaning: 'Dengan berjalan kaki', category: 'kaki', particleUsage: '歩いて (aruite - TANPA partikel で!)', notes: 'PENTING: Jangan gunakan partikel で setelah 歩いて (cukup: 歩いて 行きます).' },
]

export const LESSON_5_META = {
  course: '日本語 • PELAJARAN 05',
  title: 'BAB 5 — TRANSPORTASI, TUJUAN & PERJALANAN',
  subtitle: 'Pergi, Datang, Pulang, dan Alat Transportasi (交通・目的地・旅行)',
  curriculum: 'Materi pendamping bergaya kurikulum Minna no Nihongo I',
  description: 'Disusun dalam Bahasa Indonesia • Mempelajari 3 kata kerja gerakan (行きます・来ます・帰ります), ragam alat transportasi, tempat tujuan, serta penggunaan partikel へ (arah), で (sarana), と (teman), から (asal), dan に (waktu).',
  targets: [
    { title: 'Menyebutkan alat transportasi', result: 'Menyebutkan 10 kendaraan (densha, shinkansen, basu, kuruma, dll.) dan perkecualian berjalan kaki (aruite).' },
    { title: 'Menggunakan 3 kata kerja gerakan', result: 'Membedakan 行きます (pergi), 来ます (datang), dan 帰ります (pulang) secara tepat konteks.' },
    { title: 'Menguasai 5 partikel perjalanan', result: 'Memakai partikel へ (arah tujuan), で (alat transportasi), と (teman), から (asal), dan に (waktu tertentu).' },
    { title: 'Menanyakan detail perjalanan', result: 'Menanyakan tujuan (どこへ), waktu (いつ), sarana (何で / どうやって), dan teman (だれと).' },
    { title: 'Bercakap-cakap tentang perjalanan', result: 'Menyusun dan memperagakan dialog rencana bepergian di akhir pekan dan asal negara.' },
  ],
}

export const LESSON_SESSIONS_L5: LessonSession[] = [
  {
    id: 'l5-s-1',
    number: 1,
    title: 'Pengantar Bab 5',
    subtitle: 'Sasaran Kompetensi & Peta Pembelajaran',
    icon: 'AcademicCapIcon',
    durationMinutes: 4,
    description: 'Pahami tujuan belajar arah perjalanan, kendaraan, teman perjalanan, dan 3 kata kerja gerakan utama.',
  },
  {
    id: 'l5-s-2',
    number: 2,
    title: 'Studio Transportasi & Arah',
    subtitle: '10 Alat Transportasi & Perbedaan Partikel',
    icon: 'MapPinIcon',
    durationMinutes: 8,
    description: 'Kuasai nama kendaraan, aturan partikel で vs perkecualian 歩いて (jalan kaki), serta partikel tujuan へ (e).',
  },
  {
    id: 'l5-s-3',
    number: 3,
    title: 'Kosakata Perjalanan',
    subtitle: '38 Kosakata Kata Kerja, Tempat & Waktu',
    icon: 'BookOpenIcon',
    durationMinutes: 12,
    description: 'Hafalkan kata kerja perjalanan (ikimasu, kimasu, kaerimasu), fasilitas umum, kota-kota besar, dan keterangan waktu.',
  },
  {
    id: 'l5-s-4',
    number: 4,
    title: 'Tata Bahasa Visual',
    subtitle: '8 Pola Kalimat Perjalanan & Partikel',
    icon: 'PuzzlePieceIcon',
    durationMinutes: 15,
    description: 'Bedah tuntas rumus kalimat tujuan (へ), sarana (で), teman (と/一人で), waktu (いつ/に), dan asal (から).',
  },
  {
    id: 'l5-s-5',
    number: 5,
    title: 'Susun Kalimat',
    subtitle: 'Tantangan Sentence Builder',
    icon: 'SquaresPlusIcon',
    durationMinutes: 8,
    description: 'Susun ubin kata acak menjadi kalimat perjalanan, alat transportasi, dan asal negara yang gramatikal.',
  },
  {
    id: 'l5-s-6',
    number: 6,
    title: 'Praktik Percakapan',
    subtitle: '3 Skenario Dialog (Liburan & Asal Usul)',
    icon: 'ChatBubbleLeftRightIcon',
    durationMinutes: 10,
    description: 'Simulasi percakapan interaktif rencana liburan ke Kyoto naik Shinkansen dan wawancara asal negara.',
  },
  {
    id: 'l5-s-7',
    number: 7,
    title: 'Latihan & Kuis Terpadu',
    subtitle: 'Pasang Kata, Kuis Partikel & Terjemahan',
    icon: 'PencilSquareIcon',
    durationMinutes: 12,
    description: 'Uji pemahaman partikel へ, で, と, から, に, serta latihan menerjemahkan kalimat perjalanan secara mandiri.',
  },
  {
    id: 'l5-s-8',
    number: 8,
    title: 'Rangkuman & Evaluasi',
    subtitle: 'Pola Siap Pakai & Rencana Belajar 5 Hari',
    icon: 'TrophyIcon',
    durationMinutes: 6,
    description: 'Review rumus cepat, checklist 5 target kompetensi, dan rencana belajar terstruktur untuk menguasai Bab 5.',
  },
]

export const VOCABULARIES_L5_DATA: JapaneseVocabL5[] = [
  // A. Kata kerja perjalanan
  { id: 'v5-1', japanese: '行きます', romaji: 'ikimasu', meaning: 'Pergi', category: 'Kata Kerja Perjalanan', notes: 'Bentuk kamus: iku (行く). Bergerak menjauh dari posisi pembicara.' },
  { id: 'v5-2', japanese: '来ます', romaji: 'kimasu', meaning: 'Datang', category: 'Kata Kerja Perjalanan', notes: 'Bentuk kamus: kuru (来る). Bergerak mendekat ke posisi pembicara.' },
  { id: 'v5-3', japanese: '帰ります', romaji: 'kaerimasu', meaning: 'Pulang / kembali', category: 'Kata Kerja Perjalanan', notes: 'Bentuk kamus: kaeru (帰る). Kembali ke tempat asal (rumah, asrama, negara asal).' },

  // B. Alat transportasi
  { id: 'v5-4', japanese: '電車', romaji: 'densha', meaning: 'Kereta listrik', category: 'Alat Transportasi', notes: 'Kereta komuter perkotaan listrik (JR, Keio, Tokyu, dll).' },
  { id: 'v5-5', japanese: '新幹線', romaji: 'shinkansen', meaning: 'Kereta cepat (bullet train)', category: 'Alat Transportasi', notes: 'Kereta super cepat Shinkansen yang menghubungkan kota-kota besar di Jepang.' },
  { id: 'v5-6', japanese: '地下鉄', romaji: 'chikatetsu', meaning: 'Kereta bawah tanah / MRT', category: 'Alat Transportasi', notes: 'Secara harfiah: jalur besi di bawah tanah (chika = bawah tanah, tetsu = besi).' },
  { id: 'v5-7', japanese: 'バス', romaji: 'basu', meaning: 'Bus', category: 'Alat Transportasi', notes: 'Kata serapan asing.' },
  { id: 'v5-8', japanese: 'タクシー', romaji: 'takushii', meaning: 'Taksi', category: 'Alat Transportasi', notes: 'Kata serapan asing.' },
  { id: 'v5-9', japanese: '飛行機', romaji: 'hikouki', meaning: 'Pesawat terbang', category: 'Alat Transportasi', notes: 'Kanji: 飛 (terbang) + 行 (pergi) + 機 (mesin).' },
  { id: 'v5-10', japanese: '船', romaji: 'fune', meaning: 'Kapal laut / feri', category: 'Alat Transportasi', notes: 'Alat transportasi air.' },
  { id: 'v5-11', japanese: '自転車', romaji: 'jitensha', meaning: 'Sepeda', category: 'Alat Transportasi', notes: 'Secara harfiah: kendaraan yang berputar sendiri (ji-ten-sha).' },
  { id: 'v5-12', japanese: '車', romaji: 'kuruma', meaning: 'Mobil', category: 'Alat Transportasi', notes: 'Kendaraan roda empat secara umum.' },
  { id: 'v5-13', japanese: '歩いて', romaji: 'aruite', meaning: 'Dengan berjalan kaki', category: 'Alat Transportasi', notes: 'Bentuk -te dari kata kerja aruku (berjalan). INGAT: Jangan ditambahkan partikel で!' },

  // C. Tempat dan tujuan
  { id: 'v5-14', japanese: '学校', romaji: 'gakkou', meaning: 'Sekolah', category: 'Tempat & Tujuan', notes: 'Tempat menuntut ilmu.' },
  { id: 'v5-15', japanese: '会社', romaji: 'kaisha', meaning: 'Kantor / perusahaan', category: 'Tempat & Tujuan', notes: 'Tempat bekerja.' },
  { id: 'v5-16', japanese: '駅', romaji: 'eki', meaning: 'Stasiun kereta', category: 'Tempat & Tujuan', notes: 'Pusat transportasi umum di Jepang.' },
  { id: 'v5-17', japanese: 'スーパー', romaji: 'suupaa', meaning: 'Supermarket', category: 'Tempat & Tujuan', notes: 'Singkatan dari supermarket.' },
  { id: 'v5-18', japanese: 'デパート', romaji: 'depaato', meaning: 'Department store / toserba', category: 'Tempat & Tujuan', notes: 'Pusat perbelanjaan serba ada bertingkat.' },
  { id: 'v5-19', japanese: '病院', romaji: 'byouin', meaning: 'Rumah sakit', category: 'Tempat & Tujuan', notes: 'Jangan tertukar dengan biyouin (salon kecantikan)!' },
  { id: 'v5-20', japanese: '図書館', romaji: 'toshokan', meaning: 'Perpustakaan', category: 'Tempat & Tujuan', notes: 'Gedung penyimpanan buku-buku bacaan.' },
  { id: 'v5-21', japanese: '日本', romaji: 'Nihon / Nippon', meaning: 'Jepang', category: 'Tempat & Tujuan', notes: 'Negara matahari terbit.' },
  { id: 'v5-22', japanese: 'うち', romaji: 'uchi', meaning: 'Rumah (sendiri)', category: 'Tempat & Tujuan', notes: 'Menunjukkan rumah atau kediaman penutur.' },
  { id: 'v5-23', japanese: '国', romaji: 'kuni / okuni', meaning: 'Negara / tanah air', category: 'Tempat & Tujuan', notes: 'Sering diucapkan dengan prefiks sopan お国 (okuni).' },
  { id: 'v5-24', japanese: '東京', romaji: 'Toukyou', meaning: 'Tokyo (Ibu Kota Jepang)', category: 'Tempat & Tujuan', notes: 'Secara harfiah berarti "Ibu Kota Timur".' },
  { id: 'v5-25', japanese: '大阪', romaji: 'Oosaka', meaning: 'Osaka', category: 'Tempat & Tujuan', notes: 'Kota metropolitan terbesar kedua di Jepang (wilayah Kansai).' },
  { id: 'v5-26', japanese: '京都', romaji: 'Kyouto', meaning: 'Kyoto', category: 'Tempat & Tujuan', notes: 'Kota budaya dan bekas ibu kota kekaisaran kuno Jepang.' },
  { id: 'v5-27', japanese: 'インドネシア', romaji: 'Indonesia', meaning: 'Indonesia', category: 'Tempat & Tujuan', notes: 'Ditulis dengan huruf Katakana.' },
  { id: 'v5-28', japanese: 'アメリカ', romaji: 'Amerika', meaning: 'Amerika Serikat', category: 'Tempat & Tujuan', notes: 'Ditulis dengan huruf Katakana.' },

  // D. Kata waktu dan ungkapan
  { id: 'v5-29', japanese: '今日', romaji: 'kyou', meaning: 'Hari ini', category: 'Kata Waktu & Ungkapan', notes: 'Keterangan waktu relatif hari ini.' },
  { id: 'v5-30', japanese: '明日', romaji: 'ashita', meaning: 'Besok', category: 'Kata Waktu & Ungkapan', notes: 'Hari setelah hari ini.' },
  { id: 'v5-31', japanese: '昨日', romaji: 'kinou', meaning: 'Kemarin', category: 'Kata Waktu & Ungkapan', notes: 'Satu hari sebelum hari ini.' },
  { id: 'v5-32', japanese: '毎日', romaji: 'mainichi', meaning: 'Setiap hari', category: 'Kata Waktu & Ungkapan', notes: 'Menunjukkan rutinitas harian.' },
  { id: 'v5-33', japanese: '先週', romaji: 'senshuu', meaning: 'Minggu lalu', category: 'Kata Waktu & Ungkapan', notes: 'Satu pekan sebelum pekan ini.' },
  { id: 'v5-34', japanese: '今週', romaji: 'konshuu', meaning: 'Minggu ini', category: 'Kata Waktu & Ungkapan', notes: 'Pekan yang sedang berjalan.' },
  { id: 'v5-35', japanese: '来週', romaji: 'raishuu', meaning: 'Minggu depan', category: 'Kata Waktu & Ungkapan', notes: 'Satu pekan setelah pekan ini.' },
  { id: 'v5-36', japanese: '先月', romaji: 'sengetsu', meaning: 'Bulan lalu', category: 'Kata Waktu & Ungkapan', notes: 'Satu bulan sebelumnya.' },
  { id: 'v5-37', japanese: '今月', romaji: 'kongetsu', meaning: 'Bulan ini', category: 'Kata Waktu & Ungkapan', notes: 'Bulan yang sedang berjalan.' },
  { id: 'v5-38', japanese: '来月', romaji: 'raigetsu', meaning: 'Bulan depan', category: 'Kata Waktu & Ungkapan', notes: 'Satu bulan setelah bulan ini.' },
  { id: 'v5-39', japanese: '去年', romaji: 'kyonen', meaning: 'Tahun lalu', category: 'Kata Waktu & Ungkapan', notes: 'Satu tahun sebelum tahun ini.' },
  { id: 'v5-40', japanese: '今年', romaji: 'kotoshi', meaning: 'Tahun ini', category: 'Kata Waktu & Ungkapan', notes: 'Tahun yang sedang berjalan.' },
  { id: 'v5-41', japanese: '来年', romaji: 'rainen', meaning: 'Tahun depan', category: 'Kata Waktu & Ungkapan', notes: 'Satu tahun setelah tahun ini.' },
  { id: 'v5-42', japanese: 'いつ', romaji: 'itsu', meaning: 'Kapan', category: 'Kata Waktu & Ungkapan', notes: 'Kata tanya waktu. Biasanya tidak membutuhkan partikel に.' },
  { id: 'v5-43', japanese: '一人で', romaji: 'hitori de', meaning: 'Sendirian / seorang diri', category: 'Kata Waktu & Ungkapan', notes: 'Keterangan cara bepergian tanpa teman perjalanan.' },
  { id: 'v5-44', japanese: 'いっしょに', romaji: 'issho ni', meaning: 'Bersama-sama', category: 'Kata Waktu & Ungkapan', notes: 'Sering digunakan dalam ajakan bepergian.' },
  { id: 'v5-45', japanese: '友達', romaji: 'tomodachi', meaning: 'Teman / sahabat', category: 'Kata Waktu & Ungkapan', notes: 'Orang yang menemani perjalanan.' },
  { id: 'v5-46', japanese: '家族', romaji: 'kazoku', meaning: 'Keluarga', category: 'Kata Waktu & Ungkapan', notes: 'Anggota keluarga.' },
]

export const GRAMMAR_PATTERNS_L5_DATA: GrammarPattern[] = [
  {
    id: 'g5-1',
    number: 1,
    title: '[Tempat] へ 行きます／来ます／帰ります',
    formula: 'Subjek + は + [Tempat Tujuan] + へ (e) + 行きます / 来ます / 帰ります。',
    functionDesc: 'Menyatakan arah pergerakan menuju tempat tujuan. Partikel へ ditulis "he" tetapi DIBACA "e" saat berfungsi sebagai partikel penunjuk arah.',
    examples: [
      {
        japanese: 'わたしは 学校へ 行きます。',
        romaji: 'Watashi wa gakkou e ikimasu.',
        meaning: 'Saya pergi ke sekolah.',
      },
      {
        japanese: 'マリアさんは 日本へ 来ます。',
        romaji: 'Maria-san wa Nihon e kimasu.',
        meaning: 'Maria datang ke Jepang.',
      },
      {
        japanese: '父は うちへ 帰ります。',
        romaji: 'Chichi wa uchi e kaerimasu.',
        meaning: 'Ayah pulang ke rumah.',
      },
    ],
    notes: 'Partikel へ berfokus pada arah pergerakan menuju suatu titik destinasi.',
  },
  {
    id: 'g5-2',
    number: 2,
    title: '[Kendaraan] で 行きます & 歩いて 行きます',
    formula: '[Kendaraan] + で + [Tujuan] + へ + 行きます。 // [歩いて] + [Tujuan] + へ + 行きます。',
    functionDesc: 'Partikel で (de) menunjukkan alat atau sarana transportasi. Perkecualian khusus untuk jalan kaki: gunakan 歩いて (aruite) langsung tanpa partikel で.',
    examples: [
      {
        japanese: '電車で 会社へ 行きます。',
        romaji: 'Densha de kaisha e ikimasu.',
        meaning: 'Saya pergi ke kantor naik kereta listrik.',
      },
      {
        japanese: 'バスで 学校へ 行きます。',
        romaji: 'Basu de gakkou e ikimasu.',
        meaning: 'Saya pergi ke sekolah naik bus.',
      },
      {
        japanese: '歩いて 駅へ 行きます。',
        romaji: 'Aruite eki e ikimasu.',
        meaning: 'Saya pergi ke stasiun dengan berjalan kaki.',
      },
    ],
    notes: 'Ingat rumus pembeda: で menunjukkan sarana (alat transportasi), sedangkan へ menunjukkan destinasi (tujuan akhir).',
  },
  {
    id: 'g5-3',
    number: 3,
    title: '[Orang] と 行きます & 一人で 行きます',
    formula: '[Orang] + と + [Tujuan] + へ + 行きます。 // 一人で + [Tujuan] + へ + 行きます。',
    functionDesc: 'Partikel と (to) berarti "bersama" penanda orang yang menemani perjalanan. Jika bepergian sendirian, gunakan ungkapan 一人で (hitori de) tanpa partikel と.',
    examples: [
      {
        japanese: '友達と デパートへ 行きます。',
        romaji: 'Tomodachi to depaato e ikimasu.',
        meaning: 'Saya pergi ke department store bersama teman.',
      },
      {
        japanese: '家族と 日本へ 来ました。',
        romaji: 'Kazoku to Nihon e kimashita.',
        meaning: 'Saya datang ke Jepang bersama keluarga.',
      },
      {
        japanese: '一人で 大阪へ 行きます。',
        romaji: 'Hitori de Oosaka e ikimasu.',
        meaning: 'Saya pergi ke Osaka sendirian.',
      },
    ],
    notes: 'Untuk bertanya teman perjalanan: だれと 東京へ 行きますか (Pergi ke Tokyo bersama siapa?).',
  },
  {
    id: 'g5-4',
    number: 4,
    title: 'いつ (kapan) & [Waktu Spesifik] に 行きます',
    formula: 'いつ + [Tujuan] + へ + 行きますか。 // [Waktu Berangka] + に + 行きます。',
    functionDesc: 'いつ (itsu) adalah kata tanya waktu tanpa partikel に. Jawaban yang menyebutkan angka waktu spesifik (tanggal/bulan/jam) memakai partikel に.',
    examples: [
      {
        japanese: 'いつ 日本へ 行きますか。',
        romaji: 'Itsu Nihon e ikimasu ka.',
        meaning: 'Kapan Anda akan pergi ke Jepang?',
      },
      {
        japanese: '来月 日本へ 行きます。',
        romaji: 'Raigetsu Nihon e ikimasu.',
        meaning: 'Saya pergi ke Jepang bulan depan.',
      },
      {
        japanese: '7月15日に 日本へ 行きます。',
        romaji: 'Shichigatsu juugo-nichi ni Nihon e ikimasu.',
        meaning: 'Saya pergi ke Jepang pada tanggal 15 Juli.',
      },
    ],
    notes: 'Waktu relatif (seperti 今日, 明日, 来週, 去年) tidak memakai に. Waktu berangka (7月, 15日) memakai に.',
  },
  {
    id: 'g5-5',
    number: 5,
    title: 'どこへ 行きますか & どこへも 行きません',
    formula: '[Waktu] + どこへ + 行きますか。 // どこへも + 行きません / 行きませんでした。',
    functionDesc: 'Menanyakan tempat tujuan yang akan dikunjungi. Jawaban penolakan menyeluruh ("tidak pergi ke mana-mana") memakai どこへも 行きません.',
    examples: [
      {
        japanese: 'あした どこへ 行きますか。',
        romaji: 'Ashita doko e ikimasu ka.',
        meaning: 'Besok Anda mau pergi ke mana?',
      },
      {
        japanese: '図書館へ 行きます。',
        romaji: 'Toshokan e ikimasu.',
        meaning: 'Saya mau pergi ke perpustakaan.',
      },
      {
        japanese: '日曜日は どこへも 行きませんでした。',
        romaji: 'Nichiyoubi wa doko e mo ikimasen deshita.',
        meaning: 'Hari Minggu saya tidak pergi ke mana-mana.',
      },
    ],
    notes: 'Partikel も setelah kata tanya (doko + e + mo) menegaskan penolakan menyeluruh.',
  },
  {
    id: 'g5-6',
    number: 6,
    title: '何で／どうやって 行きますか (Sarana & Rute)',
    formula: '何で + [Tujuan] + へ + 行きますか。 // どうやって + [Tujuan] + へ + 行きますか。',
    functionDesc: '何で (nan de) menanyakan jenis kendaraan. どうやって (dou yatte) menanyakan panduan cara/rute bepergian dari awal hingga sampai.',
    examples: [
      {
        japanese: '何で 会社へ 行きますか。',
        romaji: 'Nan de kaisha e ikimasu ka.',
        meaning: 'Pergi ke kantor naik apa?',
      },
      {
        japanese: 'バスで 行きます。',
        romaji: 'Basu de ikimasu.',
        meaning: 'Saya pergi naik bus.',
      },
      {
        japanese: 'どうやって 駅へ 行きますか。',
        romaji: 'Dou yatte eki e ikimasu ka.',
        meaning: 'Bagaimana cara pergi ke stasiun?',
      },
    ],
    notes: 'Jawaban 何で berupa nama kendaraan + で (densha de, basu de, dll).',
  },
  {
    id: 'g5-7',
    number: 7,
    title: '[Tempat Asal] から 来ました (Menyatakan Asal Usul)',
    formula: 'Subjek + は + [Tempat / Negara Asal] + から + 来ました。',
    functionDesc: 'Partikel から (kara) menunjukkan titik keberangkatan atau asal usul. Pola ini umum dipakai saat berkenalan untuk menyatakan asal negara atau kota.',
    examples: [
      {
        japanese: 'インドネシアから 来ました。',
        romaji: 'Indonesia kara kimashita.',
        meaning: 'Saya datang dari Indonesia.',
      },
      {
        japanese: 'マイクさんは どこから 来ましたか。',
        romaji: 'Maiku-san wa doko kara kimashita ka.',
        meaning: 'Mike datang dari mana?',
      },
      {
        japanese: 'アメリカから 来ました。',
        romaji: 'Amerika kara kimashita.',
        meaning: 'Saya datang dari Amerika.',
      },
    ],
    notes: 'Gunakan bentuk lampau 来ました (kimashita) karena kedatangan sudah terlaksana di masa lalu.',
  },
  {
    id: 'g5-8',
    number: 8,
    title: '何月何日 (Menanyakan Tanggal Perjalanan)',
    formula: '[Agenda / Peristiwa] は 何月何日ですか。 // [Bulan]月 [Tanggal]日です。',
    functionDesc: 'Menanyakan tanggal dan bulan spesifik. Dalam bahasa Jepang urutannya selalu dari satuan terbesar: Tahun -> Bulan -> Tanggal.',
    examples: [
      {
        japanese: 'きょうは 何月何日ですか。',
        romaji: 'Kyou wa nangatsu nannichi desu ka.',
        meaning: 'Hari ini tanggal berapa (bulan apa tanggal berapa)?',
      },
      {
        japanese: '5月15日です。',
        romaji: 'Gogatsu juugo-nichi desu.',
        meaning: 'Tanggal 15 Mei (Bulan 5 tanggal 15).',
      },
      {
        japanese: '誕生日は いつですか。',
        romaji: 'Tanjoubi wa itsu desu ka.',
        meaning: 'Kapan ulang tahun Anda?',
      },
    ],
    notes: 'Hafalkan tanggal khusus 1-10: tsuitachi, futsuka, mikka, yokka, itsuka, muika, nanoka, youka, kokonoka, tooka.',
  },
]

export const SENTENCE_BUILDER_CHALLENGES_L5: SentenceBuilderChallenge[] = [
  {
    id: 'sb5-1',
    patternId: 'g5-1',
    targetIndonesian: 'Saya pergi ke sekolah.',
    scrambledWords: ['行きます。', '学校へ', 'わたしは', '会社へ'],
    correctOrder: ['わたしは', '学校へ', '行きます。'],
    romaji: 'Watashi wa gakkou e ikimasu.',
    explanation: 'Gunakan partikel へ (dibaca e) setelah tujuan (学校) diikuti kata kerja 行きます.',
  },
  {
    id: 'sb5-2',
    patternId: 'g5-2',
    targetIndonesian: 'Saya pergi ke kantor naik kereta.',
    scrambledWords: ['行きます。', '電車で', '会社へ', 'バスで'],
    correctOrder: ['電車で', '会社へ', '行きます。'],
    romaji: 'Densha de kaisha e ikimasu.',
    explanation: 'Partikel で ditaruh setelah kendaraan (電車), kemudian tujuan dengan へ (会社へ), diakhiri 行きます.',
  },
  {
    id: 'sb5-3',
    patternId: 'g5-3',
    targetIndonesian: 'Saya pergi ke Kyoto bersama teman.',
    scrambledWords: ['京都へ', '友達と', '行きます。', '一人で'],
    correctOrder: ['友達と', '京都へ', '行きます。'],
    romaji: 'Tomodachi to Kyouto e ikimasu.',
    explanation: 'Teman perjalanan ditandai dengan partikel と (友達と), lalu tujuan dengan へ (京都へ).',
  },
  {
    id: 'sb5-4',
    patternId: 'g5-7',
    targetIndonesian: 'Saya datang dari Indonesia.',
    scrambledWords: ['来ました。', 'インドネシアから', '日本へ', '行きました。'],
    correctOrder: ['インドネシアから', '来ました。'],
    romaji: 'Indonesia kara kimashita.',
    explanation: 'Asal negara ditandai dengan partikel から (インドネシアから), diikuti kata kerja lampau 来ました.',
  },
  {
    id: 'sb5-5',
    patternId: 'g5-2',
    targetIndonesian: 'Saya pergi ke stasiun dengan berjalan kaki.',
    scrambledWords: ['駅へ', '歩いて', '行きます。', '歩いてで'],
    correctOrder: ['歩いて', '駅へ', '行きます。'],
    romaji: 'Aruite eki e ikimasu.',
    explanation: 'PENTING: Berjalan kaki menggunakan 歩いて (aruite) langsung TANPA partikel で.',
  },
  {
    id: 'sb5-6',
    patternId: 'g5-3',
    targetIndonesian: 'Saya pergi ke Osaka sendirian.',
    scrambledWords: ['大阪へ', '一人で', '行きます。', '友達と'],
    correctOrder: ['一人で', '大阪へ', '行きます。'],
    romaji: 'Hitori de Oosaka e ikimasu.',
    explanation: 'Sendirian menggunakan ungkapan 一人で (hitori de) tanpa partikel と.',
  },
]

export const INTERACTIVE_DIALOGUES_L5: InteractiveDialogue[] = [
  {
    id: 'dlg5-1',
    title: 'Dialog A: Rencana Akhir Pekan (週末の予定)',
    context: 'Ani dan Mira sedang berbincang santai di kantor mengenai rencana liburan di akhir pekan.',
    characters: [
      { name: 'アニ (Ani)', avatar: 'アニ', role: 'Rekan Kerja' },
      { name: 'ミラ (Mira)', avatar: 'ミラ', role: 'Rekan Kerja' },
    ],
    turns: [
      {
        id: 't5-1',
        speaker: 'アニ (Ani)',
        japanese: '土曜日 どこへ 行きますか。',
        romaji: 'Doyoubi doko e ikimasu ka?',
        indonesian: 'Hari Sabtu kamu mau pergi ke mana?',
      },
      {
        id: 't5-2',
        speaker: 'ミラ (Mira)',
        japanese: '京都へ 行きます。',
        romaji: 'Kyouto e ikimasu.',
        indonesian: 'Saya mau pergi ke Kyoto.',
      },
      {
        id: 't5-3',
        speaker: 'アニ (Ani)',
        japanese: 'だれと 行きますか。',
        romaji: 'Dare to ikimasu ka?',
        indonesian: 'Pergi dengan siapa?',
      },
      {
        id: 't5-4',
        speaker: 'ミラ (Mira)',
        japanese: '友達と 行きます。',
        romaji: 'Tomodachi to ikimasu.',
        indonesian: 'Pergi bersama teman.',
      },
      {
        id: 't5-5',
        speaker: 'アニ (Ani)',
        japanese: '何で 行きますか。',
        romaji: 'Nan de ikimasu ka?',
        indonesian: 'Naik apa ke sana?',
      },
      {
        id: 't5-6',
        speaker: 'ミラ (Mira)',
        japanese: '新幹線で 行きます。',
        romaji: 'Shinkansen de ikimasu.',
        indonesian: 'Pergi naik Shinkansen (kereta cepat).',
      },
    ],
  },
  {
    id: 'dlg5-2',
    title: 'Dialog B: Asal dan Waktu Kedatangan (出身と来日)',
    context: 'Guru bahasa Jepang sedang menanyakan asal usul dan waktu kedatangan Mike di Jepang.',
    characters: [
      { name: '先生 (Sensei)', avatar: '先生', role: 'Guru Pengajar' },
      { name: 'マイク (Mike)', avatar: 'マイク', role: 'Siswa Asing' },
    ],
    turns: [
      {
        id: 't5-7',
        speaker: '先生 (Sensei)',
        japanese: 'マイクさんは どこから 来ましたか。',
        romaji: 'Maiku-san wa doko kara kimashita ka?',
        indonesian: 'Mike-san datang dari mana?',
      },
      {
        id: 't5-8',
        speaker: 'マイク (Mike)',
        japanese: 'アメリカから 来ました。',
        romaji: 'Amerika kara kimashita.',
        indonesian: 'Saya datang dari Amerika.',
      },
      {
        id: 't5-9',
        speaker: '先生 (Sensei)',
        japanese: 'いつ 日本へ 来ましたか。',
        romaji: 'Itsu Nihon e kimashita ka?',
        indonesian: 'Kapan kamu datang ke Jepang?',
      },
      {
        id: 't5-10',
        speaker: 'マイク (Mike)',
        japanese: '去年の 4月に 来ました。',
        romaji: 'Kyonen no shigatsu ni kimashita.',
        indonesian: 'Saya datang pada bulan April tahun lalu.',
      },
    ],
  },
  {
    id: 'dlg5-3',
    title: 'Dialog C: Berangkat ke Stasiun (駅へ行く)',
    context: 'Tanya jawab mengenai sarana transportasi menuju stasiun terdekat.',
    characters: [
      { name: '田中 (Tanaka)', avatar: '田中', role: 'Warga Lokal' },
      { name: 'サントス (Santos)', avatar: 'サントス', role: 'Karyawan Asing' },
    ],
    turns: [
      {
        id: 't5-11',
        speaker: '田中 (Tanaka)',
        japanese: 'サントスさん、毎朝 どうやって 駅へ 行きますか。',
        romaji: 'Santosu-san, maiasa dou yatte eki e ikimasu ka?',
        indonesian: 'Santos-san, setiap pagi bagaimana cara kamu pergi ke stasiun?',
      },
      {
        id: 't5-12',
        speaker: 'サントス (Santos)',
        japanese: '自転車で 行きます。田中さんは？',
        romaji: 'Jitensha de ikimasu. Tanaka-san wa?',
        indonesian: 'Saya pergi naik sepeda. Kalau Tanaka-san?',
      },
      {
        id: 't5-13',
        speaker: '田中 (Tanaka)',
        japanese: 'わたしは 近いですから、歩いて 行きます。',
        romaji: 'Watashi wa chikai desu kara, aruite ikimasu.',
        indonesian: 'Karena rumah saya dekat, saya pergi dengan berjalan kaki.',
      },
    ],
  },
]

export const VOCAB_MATCHING_PAIRS_L5: MatchingPair[] = [
  { id: 'm5-1', japanese: '電車（でんしゃ）', romaji: 'densha', indonesian: 'Kereta listrik' },
  { id: 'm5-2', japanese: '飛行機（ひこうき）', romaji: 'hikouki', indonesian: 'Pesawat terbang' },
  { id: 'm5-3', japanese: '自転車（じてんしゃ）', romaji: 'jitensha', indonesian: 'Sepeda' },
  { id: 'm5-4', japanese: '帰ります（かえります）', romaji: 'kaerimasu', indonesian: 'Pulang / kembali' },
  { id: 'm5-5', japanese: '一人で（ひとりで）', romaji: 'hitori de', indonesian: 'Sendirian' },
  { id: 'm5-6', japanese: '歩いて（あるいて）', romaji: 'aruite', indonesian: 'Dengan berjalan kaki' },
]

export const PARTICLE_QUIZZES_L5: ParticleQuiz[] = [
  {
    id: 1,
    sentenceBefore: 'わたしは バス',
    sentenceAfter: '学校へ 行きます。',
    options: ['へ', 'で', 'に', 'と'],
    correct: 'で',
    reason: 'Partikel で menunjukkan alat atau sarana transportasi (naik bus).',
    fullSentence: 'わたしは バスで 学校へ 行きます。',
    romaji: 'Watashi wa basu de gakkou e ikimasu.',
    indonesian: 'Saya pergi ke sekolah naik bus.',
  },
  {
    id: 2,
    sentenceBefore: '友達',
    sentenceAfter: '東京へ 行きます。',
    options: ['と', 'で', 'へ', 'を'],
    correct: 'と',
    reason: 'Partikel と berarti "bersama" penanda teman yang menemani perjalanan.',
    fullSentence: '友達と 東京へ 行きます。',
    romaji: 'Tomodachi to Toukyou e ikimasu.',
    indonesian: 'Saya pergi ke Tokyo bersama teman.',
  },
  {
    id: 3,
    sentenceBefore: 'インドネシア',
    sentenceAfter: '来ました。',
    options: ['から', 'へ', 'で', 'に'],
    correct: 'から',
    reason: 'Partikel から menunjukkan titik asal keberangkatan (datang dari Indonesia).',
    fullSentence: 'インドネシアから 来ました。',
    romaji: 'Indonesia kara kimashita.',
    indonesian: 'Saya datang dari Indonesia.',
  },
  {
    id: 4,
    sentenceBefore: '7月',
    sentenceAfter: '日本へ 行きます。',
    options: ['に', 'と', 'で', 'へ'],
    correct: 'に',
    reason: 'Waktu yang mengandung angka spesifik (bulan 7 / Juli) ditandai dengan partikel waktu に.',
    fullSentence: '7月に 日本へ 行きます。',
    romaji: 'Shichigatsu ni Nihon e ikimasu.',
    indonesian: 'Saya pergi ke Jepang pada bulan Juli.',
  },
  {
    id: 5,
    sentenceBefore: 'あした 京都',
    sentenceAfter: '行きます。',
    options: ['へ', 'で', 'から', 'と'],
    correct: 'へ',
    reason: 'Partikel へ (dibaca e) menunjukkan arah atau tempat tujuan perjalanan (ke Kyoto).',
    fullSentence: 'あした 京都へ 行きます。',
    romaji: 'Ashita Kyouto e ikimasu.',
    indonesian: 'Besok saya pergi ke Kyoto.',
  },
]

export const TRANSLATE_QUIZZES_L5: TranslateQuiz[] = [
  {
    id: 1,
    indonesian: 'Saya pergi ke kantor naik kereta.',
    japanese: 'わたしは 電車で 会社へ 行きます。',
    romaji: 'Watashi wa densha de kaisha e ikimasu.',
  },
  {
    id: 2,
    indonesian: 'Saya pergi ke Jepang bersama keluarga.',
    japanese: 'わたしは 家族と 日本へ 行きます。',
    romaji: 'Watashi wa kazoku to Nihon e ikimasu.',
  },
  {
    id: 3,
    indonesian: 'Besok kamu pergi ke mana?',
    japanese: 'あした どこへ 行きますか。',
    romaji: 'Ashita doko e ikimasu ka.',
  },
  {
    id: 4,
    indonesian: 'Kapan kamu pulang ke rumah?',
    japanese: 'いつ うちへ 帰りますか。',
    romaji: 'Itsu uchi e kaerimasu ka.',
  },
  {
    id: 5,
    indonesian: 'Saya pergi ke stasiun dengan berjalan kaki.',
    japanese: '歩いて 駅へ 行きます。',
    romaji: 'Aruite eki e ikimasu.',
  },
]

export const EVALUATION_INDICATORS_L5: EvaluationIndicator[] = [
  { id: 'eval5-1', label: 'Saya hafal minimal 15 kosakata Bab 5 (kendaraan, tempat, waktu).' },
  { id: 'eval5-2', label: 'Saya memahami perbedaan 行きます (pergi), 来ます (datang), dan 帰ります (pulang).' },
  { id: 'eval5-3', label: 'Saya dapat menggunakan partikel へ, で, と, から, dan に secara tepat konteks.' },
  { id: 'eval5-4', label: 'Saya dapat bertanya tujuan (どこへ), waktu (いつ), kendaraan (何で), dan teman (だれと).' },
  { id: 'eval5-5', label: 'Saya dapat membuat dan memperagakan percakapan rencana perjalanan sederhana.' },
]

export const STUDY_PLAN_5_DAYS_L5: StudyPlanDay[] = [
  {
    day: 1,
    title: 'Hari 1: Kosakata Transportasi & Tempat',
    focus: 'Hafalkan 15–20 kosakata Bab 5. Buat kartu Jepang–romaji–arti dan ucapkan tiap kata 3 kali dengan suara lantang.',
    tasks: ['Hafal 10 alat transportasi', 'Hafal fasilitas umum dan kata kerja gerakan', 'Latihan pelafalan audio native'],
  },
  {
    day: 2,
    title: 'Hari 2: 3 Kata Kerja Gerakan Utama',
    focus: 'Buat 9 kalimat: masing-masing 3 kalimat dengan 行きます (pergi), 来ます (datang), dan 帰ります (pulang).',
    tasks: ['Pahami perbedaan arah gerakan', 'Gunakan partikel tujuan へ (dibaca e)', 'Bedakan rumah (uchi) vs negara (kuni)'],
  },
  {
    day: 3,
    title: 'Hari 3: Penguasaan 5 Partikel Perjalanan',
    focus: 'Latih partikel へ (tujuan), で (kendaraan), と (teman), から (asal), dan に (waktu). Buat minimal 2 contoh kalimat per partikel.',
    tasks: ['Ingat aturan khusus 歩いて tanpa で', 'Latih 一人で untuk pergi sendiri', 'Bedakan kapan に dipakai vs tidak'],
  },
  {
    day: 4,
    title: 'Hari 4: Tanya Jawab & Rute Perjalanan',
    focus: 'Latih kalimat tanya どこへ (ke mana), いつ (kapan), 何で (naik apa), dan だれと (dengan siapa) dengan suara keras.',
    tasks: ['Praktik Dialog A (Liburan ke Kyoto)', 'Praktik Dialog B (Asal negara)', 'Simulasikan rute harian ke kantor/sekolah'],
  },
  {
    day: 5,
    title: 'Hari 5: Review & Tantangan Cerita Perjalanan',
    focus: 'Kerjakan kuis latihan tanpa melihat kunci jawaban, lalu rekam cerita rencana perjalanan selama 1 menit dalam bahasa Jepang.',
    tasks: ['Selesaikan kuis partikel dan susun kata', 'Uji hafalan di flashcard', 'Tulis 4-6 kalimat rencana perjalanan akhir pekan'],
  },
]
