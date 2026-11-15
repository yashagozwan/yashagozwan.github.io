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

export interface JapaneseVocabL4 {
  id: string
  japanese: string
  romaji: string
  meaning: string
  category: 'Kata Kerja Inti (動詞)' | 'Waktu & Keterangan Waktu' | 'Hari dalam Seminggu (曜日)' | 'Aktivitas & Rutinitas' | 'Kata Tanya Waktu & Partikel'
  notes?: string
}

export interface HourItem {
  hour: number
  japanese: string
  romaji: string
  meaning: string
  isSpecial?: boolean
  notes?: string
}

export interface MinuteItem {
  minute: number
  japanese: string
  romaji: string
  meaning: string
  isSpecial?: boolean
  notes?: string
}

export interface DayOfWeekItem {
  id: string
  kanji: string
  japanese: string
  romaji: string
  indonesian: string
  elementMeaning: string
}

export interface VerbConjugationItem {
  verb: string
  romaji: string
  meaning: string
  presentPositive: { japanese: string; romaji: string }
  presentNegative: { japanese: string; romaji: string }
  pastPositive: { japanese: string; romaji: string }
  pastNegative: { japanese: string; romaji: string }
}

export const LESSON_4_META = {
  course: '日本語 • PELAJARAN 04',
  title: 'BAB 4 — WAKTU & AKTIVITAS',
  subtitle: 'Jam, Hari, Rutinitas, dan 4 Perubahan Bentuk Kata Kerja Sopan',
  curriculum: 'Materi pendamping bergaya kurikulum Minna no Nihongo I',
  description: 'Disusun dalam Bahasa Indonesia • Membaca jam/menit (なんじ・なんぷん), nama hari (なんようび), 4 bentuk konjugasi kata kerja (～ます・～ません・～ました・～ませんでした), serta partikel waktu に・から・まで・と・ね.',
  targets: [
    { title: 'Menyebutkan waktu', result: 'Membaca jam/menit (termasuk 4, 7, 9) dan bertanya いま なんじですか.' },
    { title: 'Menyebutkan hari', result: 'Mengenali 7 nama hari dalam seminggu dan bertanya なんようびですか.' },
    { title: 'Menceritakan jadwal', result: 'Menggunakan kata kerja bentuk ます dan partikel waktu spesifik に.' },
    { title: 'Rentang waktu', result: 'Menggunakan から (dari) dan まで (sampai) untuk rentang jam atau hari.' },
    { title: 'Masa kini & masa lalu', result: 'Membedakan konjugasi ます・ません・ました・ませんでした dengan tepat.' },
  ],
}

export const LESSON_SESSIONS_L4: LessonSession[] = [
  {
    id: 'l4-s-1',
    number: 1,
    title: 'Pengantar Bab 4',
    subtitle: 'Sasaran Kompetensi & Peta Pembelajaran',
    icon: 'AcademicCapIcon',
    durationMinutes: 4,
    description: 'Pahami tujuan belajar waktu, nama hari, empat perubahan kata kerja sopan, dan partikel rentang waktu.',
  },
  {
    id: 'l4-s-2',
    number: 2,
    title: 'Jam, Menit & Hari',
    subtitle: 'Pelafalan Khusus (4, 7, 9) & 7 Hari Seminggu',
    icon: 'ClockIcon',
    durationMinutes: 8,
    description: 'Kuasai jam (じ), menit (ふん/ぷん), AM (ごぜん), PM (ごご), dan 7 hari dalam seminggu dengan audio pelafalan asli.',
  },
  {
    id: 'l4-s-3',
    number: 3,
    title: 'Kosakata Aktivitas',
    subtitle: '53 Kosakata Kata Kerja & Waktu',
    icon: 'BookOpenIcon',
    durationMinutes: 12,
    description: 'Hafalkan kata kerja harian (bangun, tidur, kerja, belajar) dan penanda waktu (sekarang, kemarin, besok, setiap hari).',
  },
  {
    id: 'l4-s-4',
    number: 4,
    title: 'Tata Bahasa & Konjugasi',
    subtitle: '5 Pola Tata Bahasa & 4 Bentuk Kata Kerja',
    icon: 'PuzzlePieceIcon',
    durationMinutes: 15,
    description: 'Pahami konjugasi ます/ません/ました/ませんでした, partikel に untuk waktu, から～まで, と, dan partikel penegas ね.',
  },
  {
    id: 'l4-s-5',
    number: 5,
    title: 'Susun Pola Kalimat',
    subtitle: 'Tantangan Interaktif Jadwal Harian',
    icon: 'SquaresPlusIcon',
    durationMinutes: 10,
    description: 'Rangkai balok kata menjadi kalimat rutinitas, rentang waktu kerja, dan kegiatan masa lalu yang akurat.',
  },
  {
    id: 'l4-s-6',
    number: 6,
    title: 'Percakapan Jadwal',
    subtitle: '5 Dialog Interaktif & Roleplay',
    icon: 'ChatBubbleLeftRightIcon',
    durationMinutes: 12,
    description: 'Latih dialog menanyakan jam, jadwal kerja harian, kegiatan kemarin, hari libur, dan janji temu.',
  },
  {
    id: 'l4-s-7',
    number: 7,
    title: 'Latihan & Kuis Terpadu',
    subtitle: 'Kuis Partikel Waktu & Terjemahan',
    icon: 'PencilSquareIcon',
    durationMinutes: 10,
    description: 'Uji pemahamanmu dengan kuis partikel に/から/まで/と/ね, konjugasi kata kerja, dan terjemahan waktu.',
  },
  {
    id: 'l4-s-8',
    number: 8,
    title: 'Rangkuman & Simulator',
    subtitle: 'Evaluasi Mandiri & Generator Jadwal',
    icon: 'TrophyIcon',
    durationMinutes: 8,
    description: 'Review komprehensif, checklist 7 indikator keberhasilan, rencana belajar 5 hari, dan simulator jadwal harian.',
  },
]

export const VOCABULARIES_L4_DATA: JapaneseVocabL4[] = [
  // Kata Kerja Inti (19 kata kerja)
  { id: 'v4-1', japanese: 'おきます（起きます）', romaji: 'okimasu', meaning: 'Bangun tidur', category: 'Kata Kerja Inti (動詞)', notes: 'Bentuk kamus: okiru. 例: 6時に起きます (Bangun pukul 6).' },
  { id: 'v4-2', japanese: 'ねます（寝ます）', romaji: 'nemasu', meaning: 'Tidur', category: 'Kata Kerja Inti (動詞)', notes: 'Bentuk kamus: neru. 例: 11時に寝ます (Tidur pukul 11).' },
  { id: 'v4-3', japanese: 'はたらきます（働きます）', romaji: 'hatarakimasu', meaning: 'Bekerja', category: 'Kata Kerja Inti (動詞)', notes: '例: 9時から5時まで働きます (Bekerja dari jam 9 sampai 5).' },
  { id: 'v4-4', japanese: 'やすみます（休みます）', romaji: 'yasumimasu', meaning: 'Beristirahat / libur', category: 'Kata Kerja Inti (動詞)', notes: '例: 日曜日は休みます (Hari Minggu libur/istirahat).' },
  { id: 'v4-5', japanese: 'べんきょうします（勉強します）', romaji: 'benkyou shimasu', meaning: 'Belajar', category: 'Kata Kerja Inti (動詞)', notes: '例: 日本語を勉強します (Belajar bahasa Jepang).' },
  { id: 'v4-6', japanese: 'おわります（終わります）', romaji: 'owarimasu', meaning: 'Selesai / berakhir', category: 'Kata Kerja Inti (動詞)', notes: '例: 会議が終わります (Rapat selesai).' },
  { id: 'v4-7', japanese: 'はじまります（始まります）', romaji: 'hajimarimasu', meaning: 'Mulai / dimulai', category: 'Kata Kerja Inti (動詞)', notes: '例: 授業が始まります (Pelajaran dimulai).' },
  { id: 'v4-8', japanese: 'いきます（行きます）', romaji: 'ikimasu', meaning: 'Pergi', category: 'Kata Kerja Inti (動詞)', notes: '例: 会社へ行きます (Pergi ke kantor).' },
  { id: 'v4-9', japanese: 'かえります（帰ります）', romaji: 'kaerimasu', meaning: 'Pulang', category: 'Kata Kerja Inti (動詞)', notes: '例: うちへ帰ります (Pulang ke rumah).' },
  { id: 'v4-10', japanese: 'みます（見ます）', romaji: 'mimasu', meaning: 'Melihat / menonton', category: 'Kata Kerja Inti (動詞)', notes: '例: テレビを見ます (Menonton TV).' },
  { id: 'v4-11', japanese: 'よみます（読みます）', romaji: 'yomimasu', meaning: 'Membaca', category: 'Kata Kerja Inti (動詞)', notes: '例: 本を読みます (Membaca buku).' },
  { id: 'v4-12', japanese: 'ききます（聞きます）', romaji: 'kikimasu', meaning: 'Mendengar / bertanya', category: 'Kata Kerja Inti (動詞)', notes: '例: 音楽を聞きます (Mendengarkan musik).' },
  { id: 'v4-13', japanese: 'かきます（書きます）', romaji: 'kakimasu', meaning: 'Menulis', category: 'Kata Kerja Inti (動詞)', notes: '例: レポートを書きます (Menulis laporan).' },
  { id: 'v4-14', japanese: 'のみます（飲みます）', romaji: 'nomimasu', meaning: 'Minum', category: 'Kata Kerja Inti (動詞)', notes: '例: お茶を飲みます (Minum teh hijau).' },
  { id: 'v4-15', japanese: 'たべます（食べます）', romaji: 'tabemasu', meaning: 'Makan', category: 'Kata Kerja Inti (動詞)', notes: '例: あさごはんを食べます (Sarapan pagi).' },
  { id: 'v4-16', japanese: 'かいます（買います）', romaji: 'kaimasu', meaning: 'Membeli', category: 'Kata Kerja Inti (動詞)', notes: '例: パンを買います (Membeli roti).' },
  { id: 'v4-17', japanese: 'します', romaji: 'shimasu', meaning: 'Melakukan / mengerjakan', category: 'Kata Kerja Inti (動詞)', notes: 'Kata kerja serba guna: テニスをします (Bermain tenis).' },
  { id: 'v4-18', japanese: 'きます（来ます）', romaji: 'kimasu', meaning: 'Datang', category: 'Kata Kerja Inti (動詞)', notes: 'Bentuk kamus: kuru. 例: 日本へ来ました (Datang ke Jepang).' },
  { id: 'v4-19', japanese: 'でんわをします（電話をします）', romaji: 'denwa o shimasu', meaning: 'Menelepon', category: 'Kata Kerja Inti (動詞)', notes: 'Menghubungi seseorang via telepon.' },

  // Waktu & Keterangan Waktu
  { id: 'v4-20', japanese: 'いま（今）', romaji: 'ima', meaning: 'Sekarang', category: 'Waktu & Keterangan Waktu', notes: '例: いま なんじですか (Sekarang jam berapa?).' },
  { id: 'v4-21', japanese: 'ごぜん（午前）', romaji: 'gozen', meaning: 'AM / pagi (sebelum tengah hari)', category: 'Waktu & Keterangan Waktu', notes: 'Diletakkan sebelum jam: ごぜん 7じ (07.00 AM).' },
  { id: 'v4-22', japanese: 'ごご（午後）', romaji: 'gogo', meaning: 'PM / sore-malam (setelah tengah hari)', category: 'Waktu & Keterangan Waktu', notes: 'Diletakkan sebelum jam: ごご 8じ (08.00 PM).' },
  { id: 'v4-23', japanese: 'あさ（朝）', romaji: 'asa', meaning: 'Pagi', category: 'Waktu & Keterangan Waktu', notes: 'Waktu fajar hingga menjelang siang.' },
  { id: 'v4-24', japanese: 'ひる（昼）', romaji: 'hiru', meaning: 'Siang', category: 'Waktu & Keterangan Waktu', notes: 'Tengah hari / siang hari.' },
  { id: 'v4-25', japanese: 'よる（夜） / ばん（晩）', romaji: 'yoru / ban', meaning: 'Malam', category: 'Waktu & Keterangan Waktu', notes: 'Setelah matahari terbenam.' },
  { id: 'v4-26', japanese: 'まいあさ（毎朝）', romaji: 'maiasa', meaning: 'Setiap pagi', category: 'Waktu & Keterangan Waktu', notes: 'Umumnya tidak diikuti partikel に.' },
  { id: 'v4-27', japanese: 'まいばん（毎晩）', romaji: 'maiban', meaning: 'Setiap malam', category: 'Waktu & Keterangan Waktu', notes: 'Umumnya tidak diikuti partikel に.' },
  { id: 'v4-28', japanese: 'まいにち（毎日）', romaji: 'mainichi', meaning: 'Setiap hari', category: 'Waktu & Keterangan Waktu', notes: 'Rutinitas sehari-hari tanpa partikel に.' },
  { id: 'v4-29', japanese: 'けさ（今朝）', romaji: 'kesa', meaning: 'Tadi pagi', category: 'Waktu & Keterangan Waktu', notes: 'Keterangan waktu lampau pada hari yang sama.' },
  { id: 'v4-30', japanese: 'こんばん（今晩）', romaji: 'konban', meaning: 'Malam ini', category: 'Waktu & Keterangan Waktu', notes: 'Sama artinya dengan 今夜 (kon\'ya).' },
  { id: 'v4-31', japanese: 'きょう（今日）', romaji: 'kyou', meaning: 'Hari ini', category: 'Waktu & Keterangan Waktu', notes: 'Umumnya tidak memakai partikel に.' },
  { id: 'v4-32', japanese: 'あした（明日）', romaji: 'ashita', meaning: 'Besok', category: 'Waktu & Keterangan Waktu', notes: 'Rencana masa mendatang tanpa partikel に.' },
  { id: 'v4-33', japanese: 'あさって', romaji: 'asatte', meaning: 'Lusa / besok lusa', category: 'Waktu & Keterangan Waktu', notes: 'Dua hari setelah hari ini.' },
  { id: 'v4-34', japanese: 'きのう（昨日）', romaji: 'kinou', meaning: 'Kemarin', category: 'Waktu & Keterangan Waktu', notes: 'Waktu lampau kemarin, diikuti kata kerja ました.' },
  { id: 'v4-35', japanese: 'おととい', romaji: 'ototoi', meaning: 'Kemarin lusa', category: 'Waktu & Keterangan Waktu', notes: 'Dua hari sebelum hari ini.' },

  // Hari dalam Seminggu
  { id: 'v4-36', japanese: 'げつようび（月曜日）', romaji: 'getsuyoubi', meaning: 'Senin', category: 'Hari dalam Seminggu (曜日)', notes: 'Kanji Bulan (月). Hari pertama kerja/sekolah.' },
  { id: 'v4-37', japanese: 'かようび（火曜日）', romaji: 'kayoubi', meaning: 'Selasa', category: 'Hari dalam Seminggu (曜日)', notes: 'Kanji Api (火).' },
  { id: 'v4-38', japanese: 'すいようび（水曜日）', romaji: 'suiyoubi', meaning: 'Rabu', category: 'Hari dalam Seminggu (曜日)', notes: 'Kanji Air (水).' },
  { id: 'v4-39', japanese: 'もくようび（木曜日）', romaji: 'mokuyoubi', meaning: 'Kamis', category: 'Hari dalam Seminggu (曜日)', notes: 'Kanji Pohon/Kayu (木).' },
  { id: 'v4-40', japanese: 'きんようび（金曜日）', romaji: 'kinyoubi', meaning: 'Jumat', category: 'Hari dalam Seminggu (曜日)', notes: 'Kanji Emas/Uang (金).' },
  { id: 'v4-41', japanese: 'どようび（土曜日）', romaji: 'doyoubi', meaning: 'Sabtu', category: 'Hari dalam Seminggu (曜日)', notes: 'Kanji Tanah (土). Hari libur akhir pekan.' },
  { id: 'v4-42', japanese: 'にちようび（日曜日）', romaji: 'nichiyoubi', meaning: 'Minggu', category: 'Hari dalam Seminggu (曜日)', notes: 'Kanji Matahari (日). Hari libur.' },

  // Aktivitas & Rutinitas
  { id: 'v4-43', japanese: 'しごと（仕事）', romaji: 'shigoto', meaning: 'Pekerjaan / kerja', category: 'Aktivitas & Rutinitas', notes: '例: 5時に仕事が終わります (Pukul 5 pekerjaan selesai).' },
  { id: 'v4-44', japanese: 'かいぎ（会議）', romaji: 'kaigi', meaning: 'Rapat / meeting', category: 'Aktivitas & Rutinitas', notes: '例: 会議は10時からです (Rapat mulai dari jam 10).' },
  { id: 'v4-45', japanese: 'やすみ（休み）', romaji: 'yasumi', meaning: 'Istirahat / hari libur', category: 'Aktivitas & Rutinitas', notes: 'Bentuk kata benda dari yasumimasu.' },
  { id: 'v4-46', japanese: 'ひるやすみ（昼休み）', romaji: 'hiruyasumi', meaning: 'Istirahat siang / makan siang', category: 'Aktivitas & Rutinitas', notes: 'Umumnya jam 12.00–13.00.' },
  { id: 'v4-47', japanese: 'じゅぎょう（授業）', romaji: 'jugyou', meaning: 'Pelajaran / kelas', category: 'Aktivitas & Rutinitas', notes: 'Sesi belajar di sekolah/universitas.' },

  // Kata Tanya Waktu & Partikel
  { id: 'v4-48', japanese: 'なんじ（何時）', romaji: 'nanji', meaning: 'Jam berapa', category: 'Kata Tanya Waktu & Partikel', notes: 'Tanya waktu: いま 何時ですか (Sekarang jam berapa?).' },
  { id: 'v4-49', japanese: 'なんぷん（何分）', romaji: 'nanpun', meaning: 'Menit berapa', category: 'Kata Tanya Waktu & Partikel', notes: 'Tanya menit spesifik.' },
  { id: 'v4-50', japanese: 'なんようび（何曜日）', romaji: 'nanyoubi', meaning: 'Hari apa', category: 'Kata Tanya Waktu & Partikel', notes: 'Tanya nama hari: きょうは 何曜日ですか.' },
  { id: 'v4-51', japanese: 'いつ', romaji: 'itsu', meaning: 'Kapan', category: 'Kata Tanya Waktu & Partikel', notes: 'Kata tanya waktu umum tanpa partikel に.' },
  { id: 'v4-52', japanese: 'から', romaji: 'kara', meaning: 'Dari / sejak (titik awal)', category: 'Kata Tanya Waktu & Partikel', notes: 'Menandai waktu atau tempat awal: 9時から (Dari jam 9).' },
  { id: 'v4-53', japanese: 'まで', romaji: 'made', meaning: 'Sampai / hingga (titik akhir)', category: 'Kata Tanya Waktu & Partikel', notes: 'Menandai batas akhir: 5時まで (Sampai jam 5).' },
  { id: 'v4-54', japanese: 'と', romaji: 'to', meaning: 'Dan (menghubungkan kata benda)', category: 'Kata Tanya Waktu & Partikel', notes: '例: 土曜日と日曜日 (Sabtu dan Minggu).' },
  { id: 'v4-55', japanese: 'ね', romaji: 'ne', meaning: 'Ya / bukan? (partikel akhir meminta persetujuan)', category: 'Kata Tanya Waktu & Partikel', notes: 'Diletakkan di akhir kalimat: いいですね (Bagus ya).' },
]

export const HOURS_DATA_L4: HourItem[] = [
  { hour: 1, japanese: 'いちじ（1時）', romaji: 'ichiji', meaning: 'Pukul 01.00' },
  { hour: 2, japanese: 'にじ（2時）', romaji: 'niji', meaning: 'Pukul 02.00' },
  { hour: 3, japanese: 'さんじ（3時）', romaji: 'sanji', meaning: 'Pukul 03.00' },
  { hour: 4, japanese: 'よじ（4時）', romaji: 'yoji', meaning: 'Pukul 04.00', isSpecial: true, notes: 'PERHATIAN KHUSUS: Dibaca "yoji", BUKAN "yonji" atau "shiji"!' },
  { hour: 5, japanese: 'ごじ（5時）', romaji: 'goji', meaning: 'Pukul 05.00' },
  { hour: 6, japanese: 'ろくじ（6時）', romaji: 'rokuji', meaning: 'Pukul 06.00' },
  { hour: 7, japanese: 'しちじ（7時）', romaji: 'shichiji', meaning: 'Pukul 07.00', isSpecial: true, notes: 'PERHATIAN KHUSUS: Umumnya dibaca "shichiji", bukan "nanaji".' },
  { hour: 8, japanese: 'はちじ（8時）', romaji: 'hachiji', meaning: 'Pukul 08.00' },
  { hour: 9, japanese: 'くじ（9時）', romaji: 'kuji', meaning: 'Pukul 09.00', isSpecial: true, notes: 'PERHATIAN KHUSUS: Dibaca "kuji", BUKAN "kyuuji"!' },
  { hour: 10, japanese: 'じゅうじ（10時）', romaji: 'juuji', meaning: 'Pukul 10.00' },
  { hour: 11, japanese: 'じゅういちじ（11時）', romaji: 'juuichiji', meaning: 'Pukul 11.00' },
  { hour: 12, japanese: 'じゅうにじ（12時）', romaji: 'juuniji', meaning: 'Pukul 12.00 (Tengah hari/malam)' },
]

export const MINUTES_DATA_L4: MinuteItem[] = [
  { minute: 1, japanese: 'いっぷん（1分）', romaji: 'ippun', meaning: '1 Menit', isSpecial: true, notes: 'Bunyi konsonan rangkap (Tsu kecil)' },
  { minute: 2, japanese: 'にふん（2分）', romaji: 'nifun', meaning: '2 Menit' },
  { minute: 3, japanese: 'さんぷん（3分）', romaji: 'sanpun', meaning: '3 Menit', isSpecial: true, notes: 'Berubah menjadi "pun"' },
  { minute: 4, japanese: 'よんぷん（4分）', romaji: 'yonpun', meaning: '4 Menit', isSpecial: true, notes: 'Berubah menjadi "pun"' },
  { minute: 5, japanese: 'ごふん（5分）', romaji: 'gofun', meaning: '5 Menit' },
  { minute: 6, japanese: 'ろっぷん（6分）', romaji: 'roppun', meaning: '6 Menit', isSpecial: true, notes: 'Bunyi konsonan rangkap "roppun"' },
  { minute: 7, japanese: 'ななふん（7分）', romaji: 'nanafun', meaning: '7 Menit' },
  { minute: 8, japanese: 'はっぷん / はちふん（8分）', romaji: 'happun / hachifun', meaning: '8 Menit', isSpecial: true, notes: 'Sering diucapkan "happun"' },
  { minute: 9, japanese: 'きゅうふん（9分）', romaji: 'kyuufun', meaning: '9 Menit' },
  { minute: 10, japanese: 'じゅっぷん / じっぷん（10分）', romaji: 'juppun / jippun', meaning: '10 Menit', isSpecial: true, notes: 'Bisa "juppun" atau "jippun"' },
  { minute: 15, japanese: 'じゅうごふん（15分）', romaji: 'juugofun', meaning: '15 Menit' },
  { minute: 30, japanese: 'さんじゅっぷん / はん（30分 / 半）', romaji: 'sanjuppun / han', meaning: '30 Menit / Lewat Setengah', isSpecial: true, notes: '"han" sering dipakai untuk waktu: 例: 8時半 (08.30)' },
  { minute: 45, japanese: 'よんじゅうごふん（45分）', romaji: 'yonjuugofun', meaning: '45 Menit' },
]

export const DAYS_DATA_L4: DayOfWeekItem[] = [
  { id: 'mon', kanji: '月', japanese: 'げつようび', romaji: 'getsuyoubi', indonesian: 'Senin', elementMeaning: 'Bulan (Moon)' },
  { id: 'tue', kanji: '火', japanese: 'かようび', romaji: 'kayoubi', indonesian: 'Selasa', elementMeaning: 'Api (Fire)' },
  { id: 'wed', kanji: '水', japanese: 'すいようび', romaji: 'suiyoubi', indonesian: 'Rabu', elementMeaning: 'Air (Water)' },
  { id: 'thu', kanji: '木', japanese: 'もくようび', romaji: 'mokuyoubi', indonesian: 'Kamis', elementMeaning: 'Kayu/Pohon (Tree)' },
  { id: 'fri', kanji: '金', japanese: 'きんようび', romaji: 'kinyoubi', indonesian: 'Jumat', elementMeaning: 'Emas/Logam (Gold)' },
  { id: 'sat', kanji: '土', japanese: 'どようび', romaji: 'doyoubi', indonesian: 'Sabtu', elementMeaning: 'Tanah/Bumi (Earth)' },
  { id: 'sun', kanji: '日', japanese: 'にちようび', romaji: 'nichiyoubi', indonesian: 'Minggu', elementMeaning: 'Matahari (Sun)' },
]

export const VERB_CONJUGATIONS_L4: VerbConjugationItem[] = [
  {
    verb: 'はたらきます（働きます）',
    romaji: 'hatarakimasu',
    meaning: 'Bekerja',
    presentPositive: { japanese: 'はたらきます', romaji: 'hatarakimasu' },
    presentNegative: { japanese: 'はたらきません', romaji: 'hatarakimasen' },
    pastPositive: { japanese: 'はたらきました', romaji: 'hatarakimashita' },
    pastNegative: { japanese: 'はたらきませんでした', romaji: 'hatarakimasen deshita' },
  },
  {
    verb: 'おきます（起きます）',
    romaji: 'okimasu',
    meaning: 'Bangun tidur',
    presentPositive: { japanese: 'おきます', romaji: 'okimasu' },
    presentNegative: { japanese: 'おきません', romaji: 'okimasen' },
    pastPositive: { japanese: 'おきました', romaji: 'okimashita' },
    pastNegative: { japanese: 'おきませんでした', romaji: 'okimasen deshita' },
  },
  {
    verb: 'ねます（寝ます）',
    romaji: 'nemasu',
    meaning: 'Tidur',
    presentPositive: { japanese: 'ねます', romaji: 'nemasu' },
    presentNegative: { japanese: 'ねません', romaji: 'nemasen' },
    pastPositive: { japanese: 'ねました', romaji: 'nemashita' },
    pastNegative: { japanese: 'ねませんでした', romaji: 'nemasen deshita' },
  },
  {
    verb: 'べんきょうします（勉強します）',
    romaji: 'benkyou shimasu',
    meaning: 'Belajar',
    presentPositive: { japanese: 'べんきょうします', romaji: 'benkyou shimasu' },
    presentNegative: { japanese: 'べんきょうしません', romaji: 'benkyou shimasen' },
    pastPositive: { japanese: 'べんきょうしました', romaji: 'benkyou shimashita' },
    pastNegative: { japanese: 'べんきょうしませんでした', romaji: 'benkyou shimasen deshita' },
  },
  {
    verb: 'やすみます（休みます）',
    romaji: 'yasumimasu',
    meaning: 'Beristirahat / libur',
    presentPositive: { japanese: 'やすみます', romaji: 'yasumimasu' },
    presentNegative: { japanese: 'やすみません', romaji: 'yasumimasen' },
    pastPositive: { japanese: 'やすみました', romaji: 'yasumimashita' },
    pastNegative: { japanese: 'やすみませんでした', romaji: 'yasumimasen deshita' },
  },
  {
    verb: 'のみます（飲みます）',
    romaji: 'nomimasu',
    meaning: 'Minum',
    presentPositive: { japanese: 'のみます', romaji: 'nomimasu' },
    presentNegative: { japanese: 'のみません', romaji: 'nomimasen' },
    pastPositive: { japanese: 'のみました', romaji: 'nomimashita' },
    pastNegative: { japanese: 'のみませんでした', romaji: 'nomimasen deshita' },
  },
  {
    verb: 'みます（見ます）',
    romaji: 'mimasu',
    meaning: 'Melihat / menonton',
    presentPositive: { japanese: 'みます', romaji: 'mimasu' },
    presentNegative: { japanese: 'みません', romaji: 'mimasen' },
    pastPositive: { japanese: 'みました', romaji: 'mimashita' },
    pastNegative: { japanese: 'みませんでした', romaji: 'mimasen deshita' },
  },
]

export const GRAMMAR_PATTERNS_L4_DATA: GrammarPattern[] = [
  {
    id: 'p4-1',
    number: 1,
    title: 'Kata Kerja Bentuk ます (ます・ません・ました・ませんでした)',
    formula: 'Kata Kerja Dasar + ます / ません / ました / ませんでした',
    functionDesc: 'Menyatakan kebiasaan, rencana masa depan, atau peristiwa lampau dalam ragam sopan standar.',
    structureFormula: ['[Kata Kerja]', '[～ます / ～ません / ～ました / ～ませんでした]'],
    examples: [
      {
        japanese: 'まいにち べんきょうします。',
        romaji: 'Mainichi benkyou shimasu.',
        meaning: 'Setiap hari saya belajar (kebiasaan positif).',
      },
      {
        japanese: 'にちようびは はたらきません。',
        romaji: 'Nichiyoubi wa hatarakimasen.',
        meaning: 'Hari Minggu saya tidak bekerja (kebiasaan negatif).',
      },
      {
        japanese: 'きのう べんきょうしました。',
        romaji: 'Kinou benkyou shimashita.',
        meaning: 'Kemarin saya belajar (lampau positif).',
      },
      {
        japanese: 'きのう テレビを みませんでした。',
        romaji: 'Kinou terebi o mimasen deshita.',
        meaning: 'Kemarin saya tidak menonton televisi (lampau negatif).',
      },
    ],
    notes: 'Perubahan akhir: -masu (kini/kebiasaan positif), -masen (kini/kebiasaan negatif), -mashita (lampau positif), -masen deshita (lampau negatif).',
  },
  {
    id: 'p4-2',
    number: 2,
    title: '[Waktu Spesifik] に + Kata Kerja',
    formula: '[Waktu Berangka / Hari] + に + [Kata Kerja]',
    functionDesc: 'Menandai titik waktu tertentu saat suatu aktivitas dilakukan.',
    structureFormula: ['[Waktu Spesifik]', '[に]', '[Kata Kerja]'],
    examples: [
      {
        japanese: '６じに おきます。',
        romaji: 'Rokuji ni okimasu.',
        meaning: 'Saya bangun pukul 6.',
      },
      {
        japanese: 'まいあさ ６じに おきます。',
        romaji: 'Maiasa rokuji ni okimasu.',
        meaning: 'Setiap pagi saya bangun pukul 6 (maiasa tanpa partikel ni).',
      },
      {
        japanese: 'げつようびに はたらきます。',
        romaji: 'Getsuyoubi ni hatarakimasu.',
        meaning: 'Saya bekerja pada hari Senin.',
      },
    ],
    notes: 'Waktu berangka jam dan nama hari memakai partikel に. Waktu relatif (kyou, ashita, kinou, mainichi, maiasa) TIDAK memakai に.',
  },
  {
    id: 'p4-3',
    number: 3,
    title: '～から ～まで (Rentang Waktu)',
    formula: '[Waktu Awal] から + [Waktu Akhir] まで + [Kata Kerja / です]',
    functionDesc: 'Menunjukkan rentang waktu dari titik awal (から) hingga batas akhir (まで).',
    structureFormula: ['[Waktu Awal]', '[から]', '[Waktu Akhir]', '[まで]', '[Kata Kerja / です]'],
    examples: [
      {
        japanese: '９じから ５じまで はたらきます。',
        romaji: 'Kuji kara goji made hatarakimasu.',
        meaning: 'Saya bekerja dari jam 9 sampai jam 5.',
      },
      {
        japanese: 'ぎんこうは ９じから ３じまでです。',
        romaji: 'Ginkou wa kuji kara sanji made desu.',
        meaning: 'Bank buka dari jam 9 sampai jam 3.',
      },
      {
        japanese: 'げつようびから きんようびまで べんきょうします。',
        romaji: 'Getsuyoubi kara kinyoubi made benkyou shimasu.',
        meaning: 'Saya belajar dari hari Senin sampai hari Jumat.',
      },
    ],
    notes: 'から berarti "dari" dan まで berarti "sampai". Bisa berdiri sendiri atau berpasangan.',
  },
  {
    id: 'p4-4',
    number: 4,
    title: 'Kata Benda 1 と Kata Benda 2 (Partikel Dan)',
    formula: '[Kata Benda 1] + と + [Kata Benda 2]',
    functionDesc: 'Menghubungkan dua kata benda sejajar yang berarti "dan".',
    structureFormula: ['[Kata Benda 1]', '[と]', '[Kata Benda 2]'],
    examples: [
      {
        japanese: 'どようびと にちようびは やすみます。',
        romaji: 'Doyoubi to nichiyoubi wa yasumimasu.',
        meaning: 'Saya libur pada hari Sabtu dan Minggu.',
      },
      {
        japanese: 'ぎんこうの やすみは どようびと にちようびです。',
        romaji: 'Ginkou no yasumi wa doyoubi to nichiyoubi desu.',
        meaning: 'Hari libur bank adalah hari Sabtu dan Minggu.',
      },
    ],
    notes: 'Partikel と hanya menghubungkan kata benda (noun + と + noun).',
  },
  {
    id: 'p4-5',
    number: 5,
    title: 'Kalimat + ね (Meminta Persetujuan / Empati)',
    formula: '[Kalimat Sopan] + ね',
    functionDesc: 'Partikel akhir penegas untuk meminta persetujuan lawan bicara atau berbagi informasi empati ("ya?", "kan?").',
    structureFormula: ['[Kalimat]', '[ね]'],
    examples: [
      {
        japanese: 'きょうは すいようびですね。',
        romaji: 'Kyou wa suiyoubi desu ne.',
        meaning: 'Hari ini hari Rabu ya.',
      },
      {
        japanese: 'あしたは やすみですね。',
        romaji: 'Ashita wa yasumi desu ne.',
        meaning: 'Besok hari libur kan ya.',
      },
      {
        japanese: 'まいにち たいへんですね。',
        romaji: 'Mainichi taihen desu ne.',
        meaning: 'Setiap hari sibuk/berat ya.',
      },
    ],
    notes: 'ね diucapkan dengan intonasi lembut untuk menghangatkan percakapan sopan.',
  },
]

export const SENTENCE_BUILDER_CHALLENGES_L4: SentenceBuilderChallenge[] = [
  {
    id: 'sb4-1',
    patternId: 'p4-2',
    targetIndonesian: 'Saya bangun pukul 6 setiap pagi.',
    hint: 'Keterangan waktu umum (まいあさ) + Jam berpartikel に + Kata kerja.',
    scrambledWords: ['まいあさ', 'おきます', '６じに'],
    correctOrder: ['まいあさ', '６じに', 'おきます'],
    romaji: 'Maiasa rokuji ni okimasu.',
    explanation: 'Keterangan relatif まいあさ tanpa partikel に, jam 6 diikuti に, diakhiri kata kerja おきます.',
  },
  {
    id: 'sb4-2',
    patternId: 'p4-3',
    targetIndonesian: 'Saya bekerja dari jam 9 sampai jam 5.',
    hint: 'Gunakan partikel rentang から (dari) dan まで (sampai).',
    scrambledWords: ['はたらきます', '９じから', '５じまで'],
    correctOrder: ['９じから', '５じまで', 'はたらきます'],
    romaji: 'Kuji kara goji made hatarakimasu.',
    explanation: 'Jam mulai (9じから) + jam selesai (5じまで) + kata kerja はたらきます.',
  },
  {
    id: 'sb4-3',
    patternId: 'p4-1',
    targetIndonesian: 'Kemarin saya belajar bahasa Jepang.',
    hint: 'Kegiatan lampau kemarin menggunakan bentuk lampau positif べんきょうしました.',
    scrambledWords: ['べんきょうしました', 'きのう', 'にほんごを'],
    correctOrder: ['きのう', 'にほんごを', 'べんきょうしました'],
    romaji: 'Kinou nihongo o benkyou shimashita.',
    explanation: 'Keterangan waktu きのう berpasangan dengan kata kerja lampau positif べんきょうしました.',
  },
  {
    id: 'sb4-4',
    patternId: 'p4-1',
    targetIndonesian: 'Hari ini hari apa? Hari ini hari Jumat.',
    hint: 'Tanya nama hari: なんようびですか. Dijawab nama hari + です.',
    scrambledWords: ['きょうは', 'きんようびです', 'なんようびですか'],
    correctOrder: ['きょうは', 'なんようびですか', 'きんようびです'],
    romaji: 'Kyou wa nanyoubi desu ka. Kinyoubi desu.',
    explanation: 'Topik きょうは diikuti kata tanya hari なんようびですか, dijawab きんようびです.',
  },
  {
    id: 'sb4-5',
    patternId: 'p4-4',
    targetIndonesian: 'Saya libur pada hari Sabtu dan Minggu.',
    hint: 'Hubungkan hari libur dengan partikel と: どようびと にちようびは やすみます.',
    scrambledWords: ['にちようびは', 'どようびと', 'やすみます'],
    correctOrder: ['どようびと', 'にちようびは', 'やすみます'],
    romaji: 'Doyoubi to nichiyoubi wa yasumimasu.',
    explanation: 'Hubungkan dua hari libur dengan partikel と (どようびと にちようびは やすみます).',
  },
  {
    id: 'sb4-6',
    patternId: 'p4-1',
    targetIndonesian: 'Kemarin saya tidak menonton televisi.',
    hint: 'Bentuk lampau negatif untuk kemarin: みませんでした.',
    scrambledWords: ['テレビを', 'みませんでした', 'きのう'],
    correctOrder: ['きのう', 'テレビを', 'みませんでした'],
    romaji: 'Kinou terebi o mimasen deshita.',
    explanation: 'Keterangan lampau きのう berpasangan dengan bentuk lampau negatif みませんでした.',
  },
]

export const INTERACTIVE_DIALOGUES_L4: InteractiveDialogue[] = [
  {
    id: 'd4-1',
    title: 'Dialog A — Menanyakan Jam Sekarang (いま 何時ですか)',
    context: 'Di stasiun kereta, Anda ingin memastikan waktu saat ini kepada orang di sekitar.',
    characters: [
      { name: 'Anda', avatar: 'ID', role: 'Penanya' },
      { name: 'Warga', avatar: 'JP', role: 'Warga Lokal' },
    ],
    turns: [
      {
        id: 'd1-t1',
        speaker: 'Anda',
        japanese: 'すみません。いま なんじですか。',
        romaji: 'Sumimasen. Ima nanji desu ka.',
        indonesian: 'Permisi, sekarang jam berapa?',
      },
      {
        id: 'd1-t2',
        speaker: 'Warga',
        japanese: 'ごぜん ８じ はんです。',
        romaji: 'Gozen hachiji han desu.',
        indonesian: 'Jam 8.30 pagi.',
      },
      {
        id: 'd1-t3',
        speaker: 'Anda',
        japanese: 'ありがとうございます。',
        romaji: 'Arigatou gozaimasu.',
        indonesian: 'Terima kasih banyak.',
        isUserTurn: true,
        options: [
          {
            text: 'ありがとうございます。',
            romaji: 'Arigatou gozaimasu.',
            isCorrect: true,
            feedback: 'Tepat sekali! Mengucapkan terima kasih setelah diberitahu waktu.',
          },
          {
            text: 'どういたしまして。',
            romaji: 'Douitashimashite.',
            isCorrect: false,
            feedback: 'Kurang tepat. "Douitashimashite" berarti sama-sama.',
          },
        ],
      },
      {
        id: 'd1-t4',
        speaker: 'Warga',
        japanese: 'どういたしまして。',
        romaji: 'Douitashimashite.',
        indonesian: 'Sama-sama.',
      },
    ],
  },
  {
    id: 'd4-2',
    title: 'Dialog B — Jadwal Kerja & Jam Bangun (毎朝のスケジュール)',
    context: 'Berbincang dengan rekan kerja mengenai rutinitas bangun pagi dan jam kerja di kantor.',
    characters: [
      { name: 'Rekan', avatar: 'JP', role: 'Rekan Kantor' },
      { name: 'Anda', avatar: 'ID', role: 'Karyawan Baru' },
    ],
    turns: [
      {
        id: 'd2-t1',
        speaker: 'Rekan',
        japanese: 'まいあさ なんじに おきますか。',
        romaji: 'Maiasa nanji ni okimasu ka.',
        indonesian: 'Setiap pagi Anda bangun jam berapa?',
      },
      {
        id: 'd2-t2',
        speaker: 'Anda',
        japanese: '６じに おきます。',
        romaji: 'Rokuji ni okimasu.',
        indonesian: 'Saya bangun pukul 6.',
        isUserTurn: true,
        options: [
          {
            text: '６じに おきます。',
            romaji: 'Rokuji ni okimasu.',
            isCorrect: true,
            feedback: 'Bagus! Menyebutkan angka jam dengan partikel に dan kata kerja おきます.',
          },
          {
            text: '６じに ねます。',
            romaji: 'Rokuji ni nemasu.',
            isCorrect: false,
            feedback: 'Salah. ねます (nemasu) artinya tidur, bukan bangun.',
          },
        ],
      },
      {
        id: 'd2-t3',
        speaker: 'Rekan',
        japanese: 'なんじから なんじまで はたらきますか。',
        romaji: 'Nanji kara nanji made hatarakimasu ka.',
        indonesian: 'Bekerja dari jam berapa sampai jam berapa?',
      },
      {
        id: 'd2-t4',
        speaker: 'Anda',
        japanese: '８じから ５じまで はたらきます。',
        romaji: 'Hachiji kara goji made hatarakimasu.',
        indonesian: 'Saya bekerja dari jam 8 sampai jam 5.',
      },
    ],
  },
  {
    id: 'd4-3',
    title: 'Dialog C — Kegiatan Belajar Kemarin (昨日の勉強)',
    context: 'Membahas rutinitas belajar semalam dengan teman sekelas kursus bahasa Jepang.',
    characters: [
      { name: 'Teman', avatar: 'JP', role: 'Teman Sekelas' },
      { name: 'Anda', avatar: 'ID', role: 'Pelajar' },
    ],
    turns: [
      {
        id: 'd3-t1',
        speaker: 'Teman',
        japanese: 'きのう べんきょうしましたか。',
        romaji: 'Kinou benkyou shimashita ka.',
        indonesian: 'Apakah kemarin kamu belajar?',
      },
      {
        id: 'd3-t2',
        speaker: 'Anda',
        japanese: 'はい、べんきょうしました。',
        romaji: 'Hai, benkyou shimashita.',
        indonesian: 'Ya, saya belajar.',
        isUserTurn: true,
        options: [
          {
            text: 'はい、べんきょうしました。',
            romaji: 'Hai, benkyou shimashita.',
            isCorrect: true,
            feedback: 'Tepat! Menjawab kegiatan kemarin dengan bentuk lampau positif ました.',
          },
          {
            text: 'いいえ、べんきょうしました。',
            romaji: 'Iie, benkyou shimashita.',
            isCorrect: false,
            feedback: 'Kurang tepat. Kalau "iie", kata kerjanya harus negatif (べんきょうしませんでした).',
          },
        ],
      },
      {
        id: 'd3-t3',
        speaker: 'Teman',
        japanese: 'なんじまで べんきょうしましたか。',
        romaji: 'Nanji made benkyou shimashita ka.',
        indonesian: 'Belajar sampai jam berapa?',
      },
      {
        id: 'd3-t4',
        speaker: 'Anda',
        japanese: '１０じまで べんきょうしました。',
        romaji: 'Juuji made benkyou shimashita.',
        indonesian: 'Saya belajar sampai jam 10 malam.',
      },
    ],
  },
  {
    id: 'd4-4',
    title: 'Dialog D — Hari Libur Akhir Pekan (週末の休み)',
    context: 'Membahas jadwal libur mingguan dengan manajer atau rekan di tempat kerja.',
    characters: [
      { name: 'Rekan', avatar: 'JP', role: 'Rekan Senior' },
      { name: 'Anda', avatar: 'ID', role: 'Karyawan' },
    ],
    turns: [
      {
        id: 'd4-t1',
        speaker: 'Rekan',
        japanese: 'どようびと にちようびは はたらきますか。',
        romaji: 'Doyoubi to nichiyoubi wa hatarakimasu ka.',
        indonesian: 'Apakah Anda bekerja pada hari Sabtu dan Minggu?',
      },
      {
        id: 'd4-t2',
        speaker: 'Anda',
        japanese: 'いいえ、はたらきません。やすみます。',
        romaji: 'Iie, hatarakimasen. Yasumimasu.',
        indonesian: 'Tidak, saya tidak bekerja. Saya libur.',
        isUserTurn: true,
        options: [
          {
            text: 'いいえ、はたらきません。やすみます。',
            romaji: 'Iie, hatarakimasen. Yasumimasu.',
            isCorrect: true,
            feedback: 'Bagus! Menjawab dengan negatif kebiasaan はたらきません dan menjelaskan libur やすみます.',
          },
          {
            text: 'はい、はたらきませんでした。',
            romaji: 'Hai, hatarakimasen deshita.',
            isCorrect: false,
            feedback: 'Salah konteks. Pertanyaannya adalah kebiasaan masa kini, bukan kegiatan masa lalu.',
          },
        ],
      },
      {
        id: 'd4-t3',
        speaker: 'Rekan',
        japanese: 'いいですね。',
        romaji: 'Ii desu ne.',
        indonesian: 'Bagus sekali ya.',
      },
    ],
  },
  {
    id: 'd4-5',
    title: 'Dialog E — Menanyakan Hari Ini (今日は何曜日ですか)',
    context: 'Memastikan nama hari ini dan menyadari bahwa besok adalah hari libur.',
    characters: [
      { name: 'Anda', avatar: 'ID', role: 'Penanya' },
      { name: 'Rekan', avatar: 'JP', role: 'Rekan Kerja' },
    ],
    turns: [
      {
        id: 'd5-t1',
        speaker: 'Anda',
        japanese: 'きょうは なんようびですか。',
        romaji: 'Kyou wa nanyoubi desu ka.',
        indonesian: 'Hari ini hari apa ya?',
      },
      {
        id: 'd5-t2',
        speaker: 'Rekan',
        japanese: 'きんようびです。',
        romaji: 'Kinyoubi desu.',
        indonesian: 'Hari Jumat.',
      },
      {
        id: 'd5-t3',
        speaker: 'Anda',
        japanese: 'あしたは やすみですね。',
        romaji: 'Ashita wa yasumi desu ne.',
        indonesian: 'Berarti besok libur kan ya.',
        isUserTurn: true,
        options: [
          {
            text: 'あしたは やすみですね。',
            romaji: 'Ashita wa yasumi desu ne.',
            isCorrect: true,
            feedback: 'Sempurna! Partikel ね digunakan untuk mengonfirmasi bahwa besok Sabtu adalah hari libur.',
          },
          {
            text: 'あしたは なんじですか。',
            romaji: 'Ashita wa nanji desu ka.',
            isCorrect: false,
            feedback: 'Kurang tepat secara alur percakapan.',
          },
        ],
      },
      {
        id: 'd5-t4',
        speaker: 'Rekan',
        japanese: 'はい、そうです。',
        romaji: 'Hai, sou desu.',
        indonesian: 'Ya, benar sekali.',
      },
    ],
  },
]

export const VOCAB_MATCHING_PAIRS_L4: MatchingPair[] = [
  { id: 'mp4-1', japanese: 'おきます', romaji: 'okimasu', indonesian: 'Bangun tidur' },
  { id: 'mp4-2', japanese: 'ねます', romaji: 'nemasu', indonesian: 'Tidur' },
  { id: 'mp4-3', japanese: 'はたらきます', romaji: 'hatarakimasu', indonesian: 'Bekerja' },
  { id: 'mp4-4', japanese: 'やすみます', romaji: 'yasumimasu', indonesian: 'Beristirahat / libur' },
  { id: 'mp4-5', japanese: 'げつようび', romaji: 'getsuyoubi', indonesian: 'Hari Senin' },
  { id: 'mp4-6', japanese: 'きんようび', romaji: 'kinyoubi', indonesian: 'Hari Jumat' },
  { id: 'mp4-7', japanese: 'きのう', romaji: 'kinou', indonesian: 'Kemarin' },
  { id: 'mp4-8', japanese: 'あした', romaji: 'ashita', indonesian: 'Besok' },
]

export const PARTICLE_QUIZZES_L4: ParticleQuiz[] = [
  {
    id: 1,
    sentenceBefore: '７じ',
    sentenceAfter: 'おきます。 (Bangun pukul 7)',
    options: ['に', 'で', 'を', 'は'],
    correct: 'に',
    reason: 'Partikel に digunakan setelah angka jam spesifik (7時に).',
    fullSentence: '７じに おきます。',
    romaji: 'Shichiji ni okimasu.',
    indonesian: 'Saya bangun pukul 7.',
  },
  {
    id: 2,
    sentenceBefore: '９じから ５じ',
    sentenceAfter: 'はたらきます。 (Bekerja dari jam 9 sampai 5)',
    options: ['まで', 'に', 'と', 'へ'],
    correct: 'まで',
    reason: 'まで menandai batas akhir waktu ("sampai").',
    fullSentence: '９じから ５じまで はたらきます。',
    romaji: 'Kuji kara goji made hatarakimasu.',
    indonesian: 'Saya bekerja dari jam 9 sampai jam 5.',
  },
  {
    id: 3,
    sentenceBefore: 'どようび',
    sentenceAfter: 'にちようびは やすみです。 (Sabtu dan Minggu libur)',
    options: ['と', 'に', 'も', 'で'],
    correct: 'と',
    reason: 'Partikel と berfungsi menghubungkan dua kata benda sejajar ("dan").',
    fullSentence: 'どようびと にちようびは やすみです。',
    romaji: 'Doyoubi to nichiyoubi wa yasumi desu.',
    indonesian: 'Hari Sabtu dan Minggu adalah hari libur.',
  },
  {
    id: 4,
    sentenceBefore: 'きのう １０じ',
    sentenceAfter: 'べんきょうしました。 (Kemarin belajar sampai jam 10)',
    options: ['まで', 'から', 'に', 'へ'],
    correct: 'まで',
    reason: 'まで menyatakan batas waktu akhir ("sampai pukul 10").',
    fullSentence: 'きのう １０じまで べんきょうしました。',
    romaji: 'Kinou juuji made benkyou shimashita.',
    indonesian: 'Kemarin saya belajar sampai pukul 10.',
  },
  {
    id: 5,
    sentenceBefore: 'げつようび',
    sentenceAfter: 'はたらきます。 (Bekerja pada hari Senin)',
    options: ['に', 'から', 'を', 'と'],
    correct: 'に',
    reason: 'Nama hari spesifik (げつようび) dapat diikuti partikel に untuk menandai waktu kegiatan.',
    fullSentence: 'げつようびに はたらきます。',
    romaji: 'Getsuyoubi ni hatarakimasu.',
    indonesian: 'Saya bekerja pada hari Senin.',
  },
  {
    id: 6,
    sentenceBefore: 'あしたは やすみです',
    sentenceAfter: '。 (Besok libur kan ya)',
    options: ['ね', 'よ', 'か', 'に'],
    correct: 'ね',
    reason: 'ね di akhir kalimat meminta persetujuan atau konfirmasi pemahaman bersama.',
    fullSentence: 'あしたは やすみですね。',
    romaji: 'Ashita wa yasumi desu ne.',
    indonesian: 'Besok hari libur kan ya.',
  },
]

export const TRANSLATE_QUIZZES_L4: TranslateQuiz[] = [
  {
    id: 1,
    indonesian: 'Sekarang jam 8 pagi.',
    japanese: 'いま ごぜん ８じです。',
    romaji: 'Ima gozen hachiji desu.',
  },
  {
    id: 2,
    indonesian: 'Saya tidak bekerja pada hari Minggu.',
    japanese: 'にちようびは はたらきません。',
    romaji: 'Nichiyoubi wa hatarakimasen.',
  },
  {
    id: 3,
    indonesian: 'Kemarin saya tidak menonton televisi.',
    japanese: 'きのう テレビを みませんでした。',
    romaji: 'Kinou terebi o mimasen deshita.',
  },
  {
    id: 4,
    indonesian: 'Hari ini hari Rabu ya.',
    japanese: 'きょうは すいようびですね。',
    romaji: 'Kyou wa suiyoubi desu ne.',
  },
  {
    id: 5,
    indonesian: 'Setiap pagi saya bangun pukul 6.',
    japanese: 'まいあさ ６じに おきます。',
    romaji: 'Maiasa rokuji ni okimasu.',
  },
]

export const DAILY_SCHEDULE_EXAMPLES_L4 = [
  { time: '06.00', japanese: '６じに おきます。', romaji: 'Rokuji ni okimasu.', meaning: 'Bangun tidur pukul 6.' },
  { time: '07.00', japanese: '７じに あさごはんを たべます。', romaji: 'Shichiji ni asagohan o tabemasu.', meaning: 'Sarapan pagi pukul 7.' },
  { time: '08.00', japanese: '８じに かいしゃへ いきます。', romaji: 'Hachiji ni kaisha e ikimasu.', meaning: 'Berangkat kerja ke kantor pukul 8.' },
  { time: '12.00–13.00', japanese: '１２じから １じまで ひるやすみです。', romaji: 'Juuniji kara ichiji made hiruyasumi desu.', meaning: 'Istirahat siang dari jam 12 sampai jam 1.' },
  { time: '17.00', japanese: '５じに しごとが おわります。', romaji: 'Goji ni shigoto ga owarimasu.', meaning: 'Pekerjaan selesai pukul 5 sore.' },
  { time: '19.00', japanese: '７じに にほんごを べんきょうします。', romaji: 'Shichiji ni nihongo o benkyou shimasu.', meaning: 'Belajar bahasa Jepang pukul 7 malam.' },
  { time: '22.00', japanese: '１０じに ねます。', romaji: 'Juuji ni nemasu.', meaning: 'Tidur pukul 10 malam.' },
]

export const EVALUATION_INDICATORS_L4: EvaluationIndicator[] = [
  { id: 'eval4-1', label: 'Saya dapat membaca dan menyebutkan jam serta menit (termasuk 4時, 7時, 9時).' },
  { id: 'eval4-2', label: 'Saya hafal ke-7 nama hari dalam seminggu (Senin s/d Minggu) dan bertanya なんようびですか.' },
  { id: 'eval4-3', label: 'Saya dapat menggunakan bentuk positif dan negatif non-lampau (ます・ません).' },
  { id: 'eval4-4', label: 'Saya dapat menggunakan bentuk positif dan negatif lampau (ました・ませんでした).' },
  { id: 'eval4-5', label: 'Saya dapat menggunakan partikel に untuk jam dan waktu spesifik secara akurat.' },
  { id: 'eval4-6', label: 'Saya dapat menggunakan rentang waktu から (dari) dan まで (sampai).' },
  { id: 'eval4-7', label: 'Saya memahami fungsi partikel と (penghubung kata benda) dan ね (penegas persetujuan).' },
]

export const STUDY_PLAN_5_DAYS_L4: StudyPlanDay[] = [
  {
    day: 1,
    title: 'Hari 1: Jam dan Menit',
    focus: 'Latih membaca jam (4時=よじ, 7時=しちじ, 9時=くじ) dan variasi menit (ふん・ぷん, 半) secara lisan.',
    tasks: ['Lafalkan jam 1-12 dan perhatikan 4, 7, 9', 'Kuasai menit 1-10 dan setengah jam (半)', 'Tanyakan waktu sekarang (いま 何時ですか)'],
  },
  {
    day: 2,
    title: 'Hari 2: Hari dan Kosakata Inti',
    focus: 'Hafalkan 7 hari dalam seminggu dan 10 kata kerja harian utama.',
    tasks: ['Hafalkan Senin s/d Minggu beserta elemen kanjinya', 'Kuasai kata kerja bangun, tidur, kerja, libur, belajar', 'Bedakan keterangan waktu: kyou, ashita, kinou, mainichi'],
  },
  {
    day: 3,
    title: 'Hari 3: Empat Bentuk Kata Kerja',
    focus: 'Latih konjugasi empat bentuk kata kerja (ます・ません・ました・ませんでした).',
    tasks: ['Ubah 5 kata kerja ke 4 bentuk secara tertulis dan lisan', 'Latih kalimat kebiasaan (mainichi hatarakimasu)', 'Latih kalimat lampau (kinou benkyou shimashita)'],
  },
  {
    day: 4,
    title: 'Hari 4: Partikel Waktu & Rentang',
    focus: 'Buat kalimat dengan partikel に, から, まで, dan と.',
    tasks: ['Tentukan kapan memakai に dan kapan tidak', 'Buat kalimat rentang jam kerja dengan から～まで', 'Gunakan partikel と untuk hari libur (どようびと にちようび)'],
  },
  {
    day: 5,
    title: 'Hari 5: Review & Generator Jadwal',
    focus: 'Ceritakan jadwal rutinitas harianmu dan selesaikan seluruh kuis evaluasi Bab 4.',
    tasks: ['Gunakan Simulator Generator Jadwal Bab 4', 'Selesaikan latihan susun kalimat dan kuis partikel', 'Checklist 7 indikator keberhasilan mandiri'],
  },
]
