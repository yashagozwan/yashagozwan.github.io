export interface NumberEntry {
  number: number | string
  kanji: string
  hiragana: string
  romaji: string
  meaning: string
  notes?: string
  isSpecial?: boolean
}

export interface CounterCategory {
  id: string
  name: string
  japanese: string
  suffix: string
  description: string
  items: {
    count: number | string
    japanese: string
    romaji: string
    meaning: string
    isSpecial?: boolean
    notes?: string
  }[]
}

// ==========================================
// ANGKA DASAR 0 - 10
// ==========================================
export const BASIC_NUMBERS_0_TO_10: NumberEntry[] = [
  { number: 0, kanji: '零 / 〇', hiragana: 'ぜろ / れい', romaji: 'zero / rei', meaning: 'Nol', notes: 'Zero paling umum, rei sering untuk suhu atau skor formal' },
  { number: 1, kanji: '一', hiragana: 'いち', romaji: 'ichi', meaning: 'Satu' },
  { number: 2, kanji: '二', hiragana: 'に', romaji: 'ni', meaning: 'Dua' },
  { number: 3, kanji: '三', hiragana: 'さん', romaji: 'san', meaning: 'Tiga' },
  { number: 4, kanji: '四', hiragana: 'よん / し', romaji: 'yon / shi', meaning: 'Empat', isSpecial: true, notes: 'Yon paling sering digunakan sehari-hari. Shi dihindari dalam konteks sial (kematian)' },
  { number: 5, kanji: '五', hiragana: 'ご', romaji: 'go', meaning: 'Lima' },
  { number: 6, kanji: '六', hiragana: 'ろく', romaji: 'roku', meaning: 'Enam' },
  { number: 7, kanji: '七', hiragana: 'なな / しち', romaji: 'nana / shichi', meaning: 'Tujuh', isSpecial: true, notes: 'Nana paling umum untuk nomor telepon & harga agar tidak tertukar dengan ichi' },
  { number: 8, kanji: '八', hiragana: 'はち', romaji: 'hachi', meaning: 'Delapan' },
  { number: 9, kanji: '九', hiragana: 'きゅう / く', romaji: 'kyuu / ku', meaning: 'Sembilan', isSpecial: true, notes: 'Kyuu paling umum. Ku sering untuk jam (ku-ji) atau bulan September (kugatsu)' },
  { number: 10, kanji: '十', hiragana: 'じゅう', romaji: 'juu', meaning: 'Sepuluh' },
]

// ==========================================
// PULUHAN, RATUSAN, RIBUAN, & PULUHAN RIBU
// ==========================================
export const LARGE_NUMBERS: NumberEntry[] = [
  // Puluhan
  { number: 20, kanji: '二十', hiragana: 'にじゅう', romaji: 'ni-juu', meaning: 'Dua puluh' },
  { number: 30, kanji: '三十', hiragana: 'さんじゅう', romaji: 'san-juu', meaning: 'Tiga puluh' },
  { number: 40, kanji: '四十', hiragana: 'よんじゅう', romaji: 'yon-juu', meaning: 'Empat puluh', notes: 'Wajib yon-juu (bukan shi-juu)' },
  { number: 50, kanji: '五十', hiragana: 'ごじゅう', romaji: 'go-juu', meaning: 'Lima puluh' },
  { number: 60, kanji: '六十', hiragana: 'ろくじゅう', romaji: 'roku-juu', meaning: 'Enam puluh' },
  { number: 70, kanji: '七十', hiragana: 'ななじゅう', romaji: 'nana-juu', meaning: 'Tujuh puluh' },
  { number: 80, kanji: '八十', hiragana: 'はちじゅう', romaji: 'hachi-juu', meaning: 'Delapan puluh' },
  { number: 90, kanji: '九十', hiragana: 'きゅうじゅう', romaji: 'kyuu-juu', meaning: 'Sembilan puluh' },

  // Ratusan
  { number: 100, kanji: '百', hiragana: 'ひゃく', romaji: 'hyaku', meaning: 'Seratus', notes: 'Cukup hyaku (bukan ichi-hyaku)' },
  { number: 200, kanji: '二百', hiragana: 'にひゃく', romaji: 'ni-hyaku', meaning: 'Dua ratus' },
  { number: 300, kanji: '三百', hiragana: 'さんびゃく', romaji: 'sanbyaku', meaning: 'Tiga ratus', isSpecial: true, notes: 'Perubahan bunyi: hyaku -> byaku (さんびゃく)' },
  { number: 400, kanji: '四百', hiragana: 'よんひゃく', romaji: 'yon-hyaku', meaning: 'Empat ratus' },
  { number: 500, kanji: '五百', hiragana: 'ごひゃく', romaji: 'go-hyaku', meaning: 'Lima ratus' },
  { number: 600, kanji: '六百', hiragana: 'ろっぴゃく', romaji: 'roppyaku', meaning: 'Enam ratus', isSpecial: true, notes: 'Konsonan ganda: roku + hyaku -> roppyaku (ろっぴゃく)' },
  { number: 700, kanji: '七百', hiragana: 'ななひゃく', romaji: 'nana-hyaku', meaning: 'Tujuh ratus' },
  { number: 800, kanji: '八百', hiragana: 'はっぴゃく', romaji: 'happyaku', meaning: 'Delapan ratus', isSpecial: true, notes: 'Konsonan ganda: hachi + hyaku -> happyaku (はっぴゃく)' },
  { number: 900, kanji: '九百', hiragana: 'きゅうひゃく', romaji: 'kyuu-hyaku', meaning: 'Sembilan ratus' },

  // Ribuan
  { number: 1000, kanji: '千', hiragana: 'せん', romaji: 'sen', meaning: 'Seribu', notes: 'Cukup sen (bukan ichi-sen)' },
  { number: 2000, kanji: '二千', hiragana: 'にせん', romaji: 'ni-sen', meaning: 'Dua ribu' },
  { number: 3000, kanji: '三千', hiragana: 'さんぜん', romaji: 'sanzen', meaning: 'Tiga ribu', isSpecial: true, notes: 'Perubahan bunyi sen -> zen (さんぜん)' },
  { number: 4000, kanji: '四千', hiragana: 'よんせん', romaji: 'yon-sen', meaning: 'Empat ribu' },
  { number: 5000, kanji: '五千', hiragana: 'ごせん', romaji: 'go-sen', meaning: 'Lima ribu' },
  { number: 6000, kanji: '六千', hiragana: 'ろくせん', romaji: 'roku-sen', meaning: 'Enam ribu' },
  { number: 7000, kanji: '七千', hiragana: 'ななせん', romaji: 'nana-sen', meaning: 'Tujuh ribu' },
  { number: 8000, kanji: '八千', hiragana: 'はっせん', romaji: 'hassen', meaning: 'Delapan ribu', isSpecial: true, notes: 'Konsonan ganda: hachi + sen -> hassen (はっせん)' },
  { number: 9000, kanji: '九千', hiragana: 'きゅうせん', romaji: 'kyuu-sen', meaning: 'Sembilan ribu' },

  // Puluhan Ribu ke Atas (Sistem 4 Digit / 万 • Man)
  { number: 10000, kanji: '一万', hiragana: 'いちまん', romaji: 'ichiman', meaning: 'Sepuluh ribu (10.000)', notes: 'Wajib sebut ichi sebelum man (いちまん)' },
  { number: 100000, kanji: '十万', hiragana: 'じゅうまん', romaji: 'juuman', meaning: 'Seratus ribu (100.000)' },
  { number: 1000000, kanji: '百万', hiragana: 'ひゃくまん', romaji: 'hyakuman', meaning: 'Satu juta (1.000.000)' },
  { number: 10000000, kanji: '千万', hiragana: 'せんまん', romaji: 'senman', meaning: 'Sepuluh juta (10.000.000)' },
  { number: 100000000, kanji: '一億', hiragana: 'いちおく', romaji: 'ichioku', meaning: 'Seratus juta (100.000.000)', notes: 'Satuan 億 (Oku) mewakili kelipatan 100 juta' },
]

// ==========================================
// SATUAN HITUNG N5 (COUNTERS / 助数詞)
// ==========================================
export const N5_COUNTERS: CounterCategory[] = [
  {
    id: 'general-things',
    name: 'Hitungan Benda Umum (ひとつ・ふたつ)',
    japanese: 'もの (一つ・二つ)',
    suffix: 'つ',
    description: 'Sistem hitungan asli Jepang (Wago) untuk benda umum hingga jumlah 10. Di atas 10 kembali ke angka biasa.',
    items: [
      { count: 1, japanese: 'ひとつ', romaji: 'hitotsu', meaning: 'Satu buah', isSpecial: true },
      { count: 2, japanese: 'ふたつ', romaji: 'futatsu', meaning: 'Dua buah', isSpecial: true },
      { count: 3, japanese: 'みっつ', romaji: 'mittsu', meaning: 'Tiga buah', isSpecial: true },
      { count: 4, japanese: 'よっつ', romaji: 'yottsu', meaning: 'Empat buah', isSpecial: true },
      { count: 5, japanese: 'いつつ', romaji: 'itsutsu', meaning: 'Lima buah', isSpecial: true },
      { count: 6, japanese: 'むっつ', romaji: 'muttsu', meaning: 'Enam buah', isSpecial: true },
      { count: 7, japanese: 'ななつ', romaji: 'nanatsu', meaning: 'Tujuh buah', isSpecial: true },
      { count: 8, japanese: 'やっつ', romaji: 'yattsu', meaning: 'Delapan buah', isSpecial: true },
      { count: 9, japanese: 'ここのつ', romaji: 'kokonotsu', meaning: 'Sembilan buah', isSpecial: true },
      { count: 10, japanese: 'とお', romaji: 'too', meaning: 'Sepuluh buah', isSpecial: true },
      { count: '?', japanese: 'いくつ', romaji: 'ikutsu', meaning: 'Berapa buah? (Tanya)' },
    ],
  },
  {
    id: 'people',
    name: 'Hitungan Orang (～にん)',
    japanese: 'ひと (～人)',
    suffix: 'にん / 人',
    description: 'Menghitung orang. 1 orang dan 2 orang menggunakan pelafalan khusus (hitori, futari), 4 orang dilafalkan yonin (bukan shi-nin).',
    items: [
      { count: 1, japanese: 'ひとり', romaji: 'hitori', meaning: '1 orang (sendiri)', isSpecial: true },
      { count: 2, japanese: 'ふたり', romaji: 'futari', meaning: '2 orang (berdua)', isSpecial: true },
      { count: 3, japanese: 'さんにん', romaji: 'sannin', meaning: '3 orang' },
      { count: 4, japanese: 'よにん', romaji: 'yonin', meaning: '4 orang', isSpecial: true, notes: 'Wajib yonin, jangan sebut shi-nin' },
      { count: 5, japanese: 'ごにん', romaji: 'gonin', meaning: '5 orang' },
      { count: 6, japanese: 'ろくにん', romaji: 'rokunin', meaning: '6 orang' },
      { count: 7, japanese: 'ななにん / しちにん', romaji: 'nananin / shichinin', meaning: '7 orang' },
      { count: 8, japanese: 'はちにん', romaji: 'hachinin', meaning: '8 orang' },
      { count: 9, japanese: 'きゅうにん / くにん', romaji: 'kyuunin / kunin', meaning: '9 orang' },
      { count: 10, japanese: 'じゅうにん', romaji: 'juunin', meaning: '10 orang' },
      { count: '?', japanese: 'なんにん', romaji: 'nannin', meaning: 'Berapa orang? (Tanya)' },
    ],
  },
  {
    id: 'days-dates',
    name: 'Hitungan Tanggal & Hari (～にち)',
    japanese: 'ひ・ひづけ (～日)',
    suffix: 'にち / 日',
    description: 'Tanggal 1 sampai 10, 14, 20, dan 24 memiliki pelafalan khusus yang wajib dihafal untuk JLPT N5.',
    items: [
      { count: '1日', japanese: 'ついたち', romaji: 'tsuitachi', meaning: 'Tanggal 1', isSpecial: true },
      { count: '2日', japanese: 'ふつか', romaji: 'futsuka', meaning: 'Tanggal 2 / 2 hari', isSpecial: true },
      { count: '3日', japanese: 'みっか', romaji: 'mikka', meaning: 'Tanggal 3 / 3 hari', isSpecial: true },
      { count: '4日', japanese: 'よっか', romaji: 'yokka', meaning: 'Tanggal 4 / 4 hari', isSpecial: true },
      { count: '5日', japanese: 'いつか', romaji: 'itsuka', meaning: 'Tanggal 5 / 5 hari', isSpecial: true },
      { count: '6日', japanese: 'むいか', romaji: 'muika', meaning: 'Tanggal 6 / 6 hari', isSpecial: true },
      { count: '7日', japanese: 'なのか', romaji: 'nanoka', meaning: 'Tanggal 7 / 7 hari', isSpecial: true },
      { count: '8日', japanese: 'ようか', romaji: 'youka', meaning: 'Tanggal 8 / 8 hari', isSpecial: true },
      { count: '9日', japanese: 'ここのか', romaji: 'kokonoka', meaning: 'Tanggal 9 / 9 hari', isSpecial: true },
      { count: '10日', japanese: 'とおか', romaji: 'tooka', meaning: 'Tanggal 10 / 10 hari', isSpecial: true },
      { count: '14日', japanese: 'じゅうよっか', romaji: 'juuyokka', meaning: 'Tanggal 14', isSpecial: true },
      { count: '20日', japanese: 'はつか', romaji: 'hatsuka', meaning: 'Tanggal 20', isSpecial: true },
      { count: '24日', japanese: 'にじゅうよっか', romaji: 'nijuuyokka', meaning: 'Tanggal 24', isSpecial: true },
      { count: '?', japanese: 'なんにち', romaji: 'nannichi', meaning: 'Tanggal berapa? / Berapa hari?' },
    ],
  },
  {
    id: 'hours-minutes',
    name: 'Hitungan Jam & Menit (～じ・～ふん)',
    japanese: 'じかん (～時・～分)',
    suffix: 'じ / ふん・ぷん',
    description: 'Menyebutkan waktu. Jam 4 (yo-ji), jam 7 (shichi-ji), jam 9 (ku-ji). Menit mengalami perubahan konsonan pada angka 1, 3, 4, 6, 8, 10.',
    items: [
      { count: '4:00', japanese: 'よじ', romaji: 'yo-ji', meaning: 'Jam 4', isSpecial: true, notes: 'Wajib yo-ji (bukan yon-ji/shi-ji)' },
      { count: '7:00', japanese: 'しちじ', romaji: 'shichi-ji', meaning: 'Jam 7', isSpecial: true, notes: 'Standar pelafalan jam adalah shichi-ji' },
      { count: '9:00', japanese: 'くじ', romaji: 'ku-ji', meaning: 'Jam 9', isSpecial: true, notes: 'Wajib ku-ji (bukan kyuu-ji)' },
      { count: '1 menit', japanese: 'いっぷん', romaji: 'ippun', meaning: '1 menit', isSpecial: true },
      { count: '2 menit', japanese: 'にふん', romaji: 'nifun', meaning: '2 menit' },
      { count: '3 menit', japanese: 'さんぷん', romaji: 'sanpun', meaning: '3 menit', isSpecial: true },
      { count: '4 menit', japanese: 'よんぷん', romaji: 'yonpun', meaning: '4 menit', isSpecial: true },
      { count: '5 menit', japanese: 'ごふん', romaji: 'gofun', meaning: '5 menit' },
      { count: '6 menit', japanese: 'ろっぷん', romaji: 'roppun', meaning: '6 menit', isSpecial: true },
      { count: '8 menit', japanese: 'はっぷん', romaji: 'happun', meaning: '8 menit', isSpecial: true },
      { count: '10 menit', japanese: 'じっぷん (じゅっぷん)', romaji: 'jippun / juppun', meaning: '10 menit', isSpecial: true },
      { count: '30 menit', japanese: 'さんじっぷん / はん', romaji: 'sanjippun / han', meaning: '30 menit / Setengah jam', isSpecial: true },
      { count: '?', japanese: 'なんじ・なんぷん', romaji: 'nan-ji / nan-pun', meaning: 'Jam berapa? / Berapa menit?' },
    ],
  },
  {
    id: 'building-floors',
    name: 'Hitungan Tingkat Lantai (～かい)',
    japanese: 'かいだん・フロア (～階)',
    suffix: 'かい・がい',
    description: 'Menghitung tingkat lantai gedung (dibahas di Minna no Nihongo Bab 3).',
    items: [
      { count: 'Lantai 1', japanese: 'いっかい', romaji: 'ikkai', meaning: 'Lantai 1', isSpecial: true },
      { count: 'Lantai 2', japanese: 'にかい', romaji: 'nikai', meaning: 'Lantai 2' },
      { count: 'Lantai 3', japanese: 'さんがい', romaji: 'sangai', meaning: 'Lantai 3', isSpecial: true, notes: 'Bunyi dakuon: kai -> gai (さんがい)' },
      { count: 'Lantai 4', japanese: 'よんかい', romaji: 'yonkai', meaning: 'Lantai 4' },
      { count: 'Lantai 5', japanese: 'ごかい', romaji: 'gokai', meaning: 'Lantai 5' },
      { count: 'Lantai 6', japanese: 'ろっかい', romaji: 'rokkai', meaning: 'Lantai 6', isSpecial: true },
      { count: 'Lantai 7', japanese: 'ななかい', romaji: 'nanakai', meaning: 'Lantai 7' },
      { count: 'Lantai 8', japanese: 'はっかい', romaji: 'hakkai', meaning: 'Lantai 8', isSpecial: true },
      { count: 'Lantai 9', japanese: 'きゅうかい', romaji: 'kyuukai', meaning: 'Lantai 9' },
      { count: 'Lantai 10', japanese: 'じっかい (じゅっかい)', romaji: 'jikkai / jukkai', meaning: 'Lantai 10', isSpecial: true },
      { count: 'Basement 1', japanese: 'ちかいっかい (B1)', romaji: 'chika ikkai', meaning: 'Basement 1', isSpecial: true },
      { count: '?', japanese: 'なんがい', romaji: 'nangai', meaning: 'Lantai berapa? (Tanya)' },
    ],
  },
]
