export interface KanaCharacter {
  id: string
  kana: string
  romaji: string
  type: 'hiragana' | 'katakana'
  category: 'basic' | 'dakuon' | 'handakuon' | 'youon' | 'extended'
  row?: string
  exampleWord?: {
    japanese: string
    romaji: string
    meaning: string
  }
}

// ==========================================
// HIRAGANA DATA
// ==========================================

export const HIRAGANA_BASIC: KanaCharacter[] = [
  // A Row
  { id: 'h-a', kana: 'あ', romaji: 'a', type: 'hiragana', category: 'basic', row: 'A', exampleWord: { japanese: 'あさ', romaji: 'asa', meaning: 'Pagi' } },
  { id: 'h-i', kana: 'い', romaji: 'i', type: 'hiragana', category: 'basic', row: 'A', exampleWord: { japanese: 'いぬ', romaji: 'inu', meaning: 'Anjing' } },
  { id: 'h-u', kana: 'う', romaji: 'u', type: 'hiragana', category: 'basic', row: 'A', exampleWord: { japanese: 'うみ', romaji: 'umi', meaning: 'Laut' } },
  { id: 'h-e', kana: 'え', romaji: 'e', type: 'hiragana', category: 'basic', row: 'A', exampleWord: { japanese: 'えき', romaji: 'eki', meaning: 'Stasiun' } },
  { id: 'h-o', kana: 'お', romaji: 'o', type: 'hiragana', category: 'basic', row: 'A', exampleWord: { japanese: 'おちゃ', romaji: 'ocha', meaning: 'Teh hijau' } },

  // KA Row
  { id: 'h-ka', kana: 'か', romaji: 'ka', type: 'hiragana', category: 'basic', row: 'KA', exampleWord: { japanese: 'かさ', romaji: 'kasa', meaning: 'Payung' } },
  { id: 'h-ki', kana: 'き', romaji: 'ki', type: 'hiragana', category: 'basic', row: 'KA', exampleWord: { japanese: 'き', romaji: 'ki', meaning: 'Pohon' } },
  { id: 'h-ku', kana: 'く', romaji: 'ku', type: 'hiragana', category: 'basic', row: 'KA', exampleWord: { japanese: 'くるま', romaji: 'kuruma', meaning: 'Mobil' } },
  { id: 'h-ke', kana: 'け', romaji: 'ke', type: 'hiragana', category: 'basic', row: 'KA', exampleWord: { japanese: 'けいさつ', romaji: 'keisatsu', meaning: 'Polisi' } },
  { id: 'h-ko', kana: 'こ', romaji: 'ko', type: 'hiragana', category: 'basic', row: 'KA', exampleWord: { japanese: 'こども', romaji: 'kodomo', meaning: 'Anak-anak' } },

  // SA Row
  { id: 'h-sa', kana: 'さ', romaji: 'sa', type: 'hiragana', category: 'basic', row: 'SA', exampleWord: { japanese: 'さくら', romaji: 'sakura', meaning: 'Bunga sakura' } },
  { id: 'h-shi', kana: 'し', romaji: 'shi', type: 'hiragana', category: 'basic', row: 'SA', exampleWord: { japanese: 'しんぶん', romaji: 'shinbun', meaning: 'Koran' } },
  { id: 'h-su', kana: 'す', romaji: 'su', type: 'hiragana', category: 'basic', row: 'SA', exampleWord: { japanese: 'すし', romaji: 'sushi', meaning: 'Sushi' } },
  { id: 'h-se', kana: 'せ', romaji: 'se', type: 'hiragana', category: 'basic', row: 'SA', exampleWord: { japanese: 'せんせい', romaji: 'sensei', meaning: 'Guru' } },
  { id: 'h-so', kana: 'そ', romaji: 'so', type: 'hiragana', category: 'basic', row: 'SA', exampleWord: { japanese: 'そら', romaji: 'sora', meaning: 'Langit' } },

  // TA Row
  { id: 'h-ta', kana: 'た', romaji: 'ta', type: 'hiragana', category: 'basic', row: 'TA', exampleWord: { japanese: 'たまご', romaji: 'tamago', meaning: 'Telur' } },
  { id: 'h-chi', kana: 'ち', romaji: 'chi', type: 'hiragana', category: 'basic', row: 'TA', exampleWord: { japanese: 'ちず', romaji: 'chizu', meaning: 'Peta' } },
  { id: 'h-tsu', kana: 'つ', romaji: 'tsu', type: 'hiragana', category: 'basic', row: 'TA', exampleWord: { japanese: 'つき', romaji: 'tsuki', meaning: 'Bulan' } },
  { id: 'h-te', kana: 'て', romaji: 'te', type: 'hiragana', category: 'basic', row: 'TA', exampleWord: { japanese: 'てがみ', romaji: 'tegami', meaning: 'Surat' } },
  { id: 'h-to', kana: 'と', romaji: 'to', type: 'hiragana', category: 'basic', row: 'TA', exampleWord: { japanese: 'ともだち', romaji: 'tomodachi', meaning: 'Teman' } },

  // NA Row
  { id: 'h-na', kana: 'な', romaji: 'na', type: 'hiragana', category: 'basic', row: 'NA', exampleWord: { japanese: 'なつ', romaji: 'natsu', meaning: 'Musim panas' } },
  { id: 'h-ni', kana: 'に', romaji: 'ni', type: 'hiragana', category: 'basic', row: 'NA', exampleWord: { japanese: 'にほん', romaji: 'nihon', meaning: 'Jepang' } },
  { id: 'h-nu', kana: 'ぬ', romaji: 'ぬ', type: 'hiragana', category: 'basic', row: 'NA', exampleWord: { japanese: 'いぬ', romaji: 'inu', meaning: 'Anjing' } },
  { id: 'h-ne', kana: 'ね', romaji: 'ne', type: 'hiragana', category: 'basic', row: 'NA', exampleWord: { japanese: 'ねこ', romaji: 'neko', meaning: 'Kucing' } },
  { id: 'h-no', kana: 'の', romaji: 'no', type: 'hiragana', category: 'basic', row: 'NA', exampleWord: { japanese: 'のみもの', romaji: 'nomimono', meaning: 'Minuman' } },

  // HA Row
  { id: 'h-ha', kana: 'は', romaji: 'ha', type: 'hiragana', category: 'basic', row: 'HA', exampleWord: { japanese: 'はな', romaji: 'hana', meaning: 'Bunga' } },
  { id: 'h-hi', kana: 'ひ', romaji: 'hi', type: 'hiragana', category: 'basic', row: 'HA', exampleWord: { japanese: 'ひと', romaji: 'hito', meaning: 'Orang' } },
  { id: 'h-fu', kana: 'ふ', romaji: 'fu', type: 'hiragana', category: 'basic', row: 'HA', exampleWord: { japanese: 'ふね', romaji: 'fune', meaning: 'Kapal laut' } },
  { id: 'h-he', kana: 'へ', romaji: 'he', type: 'hiragana', category: 'basic', row: 'HA', exampleWord: { japanese: 'へや', romaji: 'heya', meaning: 'Kamar' } },
  { id: 'h-ho', kana: 'ほ', romaji: 'ho', type: 'hiragana', category: 'basic', row: 'HA', exampleWord: { japanese: 'ほん', romaji: 'hon', meaning: 'Buku' } },

  // MA Row
  { id: 'h-ma', kana: 'ま', romaji: 'ma', type: 'hiragana', category: 'basic', row: 'MA', exampleWord: { japanese: 'まち', romaji: 'machi', meaning: 'Kota' } },
  { id: 'h-mi', kana: 'み', romaji: 'mi', type: 'hiragana', category: 'basic', row: 'MA', exampleWord: { japanese: 'みず', romaji: 'mizu', meaning: 'Air' } },
  { id: 'h-mu', kana: 'む', romaji: 'mu', type: 'hiragana', category: 'basic', row: 'MA', exampleWord: { japanese: 'むし', romaji: 'mushi', meaning: 'Serangga' } },
  { id: 'h-me', kana: 'め', romaji: 'me', type: 'hiragana', category: 'basic', row: 'MA', exampleWord: { japanese: 'めがね', romaji: 'megane', meaning: 'Kacamata' } },
  { id: 'h-mo', kana: 'も', romaji: 'mo', type: 'hiragana', category: 'basic', row: 'MA', exampleWord: { japanese: 'もり', romaji: 'mori', meaning: 'Hutan' } },

  // YA Row
  { id: 'h-ya', kana: 'や', romaji: 'ya', type: 'hiragana', category: 'basic', row: 'YA', exampleWord: { japanese: 'やま', romaji: 'yama', meaning: 'Gunung' } },
  { id: 'h-yu', kana: 'ゆ', romaji: 'yu', type: 'hiragana', category: 'basic', row: 'YA', exampleWord: { japanese: 'ゆき', romaji: 'yuki', meaning: 'Salju' } },
  { id: 'h-yo', kana: 'よ', romaji: 'yo', type: 'hiragana', category: 'basic', row: 'YA', exampleWord: { japanese: 'よる', romaji: 'yoru', meaning: 'Malam' } },

  // RA Row
  { id: 'h-ra', kana: 'ら', romaji: 'ra', type: 'hiragana', category: 'basic', row: 'RA', exampleWord: { japanese: 'らいげつ', romaji: 'raigetsu', meaning: 'Bulan depan' } },
  { id: 'h-ri', kana: 'り', romaji: 'ri', type: 'hiragana', category: 'basic', row: 'RA', exampleWord: { japanese: 'りんご', romaji: 'ringo', meaning: 'Apel' } },
  { id: 'h-ru', kana: 'る', romaji: 'る', type: 'hiragana', category: 'basic', row: 'RA', exampleWord: { japanese: 'くるま', romaji: 'kuruma', meaning: 'Mobil' } },
  { id: 'h-re', kana: 'れ', romaji: 're', type: 'hiragana', category: 'basic', row: 'RA', exampleWord: { japanese: 'れきし', romaji: 'rekishi', meaning: 'Sejarah' } },
  { id: 'h-ro', kana: 'ろ', romaji: 'ro', type: 'hiragana', category: 'basic', row: 'RA', exampleWord: { japanese: 'ろうか', romaji: 'rouka', meaning: 'Koridor' } },

  // WA Row & N
  { id: 'h-wa', kana: 'わ', romaji: 'wa', type: 'hiragana', category: 'basic', row: 'WA', exampleWord: { japanese: 'わたし', romaji: 'watashi', meaning: 'Saya' } },
  { id: 'h-wo', kana: 'を', romaji: 'wo (o)', type: 'hiragana', category: 'basic', row: 'WA', exampleWord: { japanese: 'ほんを', romaji: 'hon o', meaning: 'Partikel objek' } },
  { id: 'h-n', kana: 'ん', romaji: 'n', type: 'hiragana', category: 'basic', row: 'N', exampleWord: { japanese: 'にほん', romaji: 'nihon', meaning: 'Jepang' } },
]

export const HIRAGANA_DAKUON: KanaCharacter[] = [
  // GA Row
  { id: 'h-ga', kana: 'が', romaji: 'ga', type: 'hiragana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'がくせい', romaji: 'gakusei', meaning: 'Mahasiswa' } },
  { id: 'h-gi', kana: 'ぎ', romaji: 'gi', type: 'hiragana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'ぎんこう', romaji: 'ginkou', meaning: 'Bank' } },
  { id: 'h-gu', kana: 'ぐ', romaji: 'gu', type: 'hiragana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'ぐんたい', romaji: 'guntai', meaning: 'Militer' } },
  { id: 'h-ge', kana: 'げ', romaji: 'ge', type: 'hiragana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'げつようび', romaji: 'getsuyoubi', meaning: 'Hari Senin' } },
  { id: 'h-go', kana: 'ご', romaji: 'go', type: 'hiragana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'ごはん', romaji: 'gohan', meaning: 'Nasi' } },

  // ZA Row
  { id: 'h-za', kana: 'ざ', romaji: 'za', type: 'hiragana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'ざっし', romaji: 'zasshi', meaning: 'Majalah' } },
  { id: 'h-ji', kana: 'じ', romaji: 'ji', type: 'hiragana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'じどうしゃ', romaji: 'jidousha', meaning: 'Mobil' } },
  { id: 'h-zu', kana: 'ず', romaji: 'zu', type: 'hiragana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'ちず', romaji: 'chizu', meaning: 'Peta' } },
  { id: 'h-ze', kana: 'ぜ', romaji: 'ze', type: 'hiragana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'ぜんぶ', romaji: 'zenbu', meaning: 'Semua' } },
  { id: 'h-zo', kana: 'ぞ', romaji: 'zo', type: 'hiragana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'ぞう', romaji: 'zou', meaning: 'Gajah' } },

  // DA Row
  { id: 'h-da', kana: 'だ', romaji: 'da', type: 'hiragana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'だれ', romaji: 'dare', meaning: 'Siapa' } },
  { id: 'h-d-ji', kana: 'ぢ', romaji: 'ji (di)', type: 'hiragana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'はなぢ', romaji: 'hanaji', meaning: 'Mimisan' } },
  { id: 'h-d-zu', kana: 'づ', romaji: 'zu (du)', type: 'hiragana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'つづく', romaji: 'tsuzuku', meaning: 'Berlanjut' } },
  { id: 'h-de', kana: 'で', romaji: 'de', type: 'hiragana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'でんしゃ', romaji: 'densha', meaning: 'Kereta' } },
  { id: 'h-do', kana: 'ど', romaji: 'do', type: 'hiragana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'どこ', romaji: 'doko', meaning: 'Di mana' } },

  // BA Row
  { id: 'h-ba', kana: 'ば', romaji: 'ba', type: 'hiragana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'ばんごう', romaji: 'bangou', meaning: 'Nomor' } },
  { id: 'h-bi', kana: 'び', romaji: 'bi', type: 'hiragana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'びょういん', romaji: 'byouin', meaning: 'Rumah sakit' } },
  { id: 'h-bu', kana: 'ぶ', romaji: 'bu', type: 'hiragana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'ぶんか', romaji: 'bunka', meaning: 'Budaya' } },
  { id: 'h-be', kana: 'べ', romaji: 'be', type: 'hiragana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'べんきょう', romaji: 'benkyou', meaning: 'Belajar' } },
  { id: 'h-bo', kana: 'ぼ', romaji: 'bo', type: 'hiragana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'ぼうし', romaji: 'boushi', meaning: 'Topi' } },

  // PA Row (Handakuon)
  { id: 'h-pa', kana: 'ぱ', romaji: 'pa', type: 'hiragana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ぱん', romaji: 'pan', meaning: 'Roti' } },
  { id: 'h-pi', kana: 'ぴ', romaji: 'pi', type: 'hiragana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ぴかぴか', romaji: 'pikapika', meaning: 'Berkilau' } },
  { id: 'h-pu', kana: 'ぷ', romaji: 'pu', type: 'hiragana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ぷーる', romaji: 'puuru', meaning: 'Kolam renang' } },
  { id: 'h-pe', kana: 'ぺ', romaji: 'pe', type: 'hiragana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ぺん', romaji: 'pen', meaning: 'Pena' } },
  { id: 'h-po', kana: 'ぽ', romaji: 'po', type: 'hiragana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ぽけっと', romaji: 'poketto', meaning: 'Saku' } },
]

export const HIRAGANA_YOUON: KanaCharacter[] = [
  { id: 'h-kya', kana: 'きゃ', romaji: 'kya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'きゃく', romaji: 'kyaku', meaning: 'Tamu' } },
  { id: 'h-kyu', kana: 'きゅ', romaji: 'kyu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'きゅう', romaji: 'kyuu', meaning: 'Sembilan' } },
  { id: 'h-kyo', kana: 'きょ', romaji: 'kyo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'きょう', romaji: 'kyou', meaning: 'Hari ini' } },

  { id: 'h-sha', kana: 'しゃ', romaji: 'sha', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'しゃしん', romaji: 'shashin', meaning: 'Foto' } },
  { id: 'h-shu', kana: 'しゅ', romaji: 'shu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'しゅみ', romaji: 'shumi', meaning: 'Hobi' } },
  { id: 'h-sho', kana: 'しょ', romaji: 'sho', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'しょくどう', romaji: 'shokudou', meaning: 'Kantin' } },

  { id: 'h-cha', kana: 'ちゃ', romaji: 'cha', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'おちゃ', romaji: 'ocha', meaning: 'Teh' } },
  { id: 'h-chu', kana: 'ちゅ', romaji: 'chu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ちゅうごく', romaji: 'chuugoku', meaning: 'Tiongkok' } },
  { id: 'h-cho', kana: 'ちょ', romaji: 'cho', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ちょっと', romaji: 'chotto', meaning: 'Sebentar' } },

  { id: 'h-nya', kana: 'にゃ', romaji: 'nya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'にゃんこ', romaji: 'nyanko', meaning: 'Kucing (manja)' } },
  { id: 'h-nyu', kana: 'にゅ', romaji: 'nyu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ぎゅうにゅう', romaji: 'gyuunyuu', meaning: 'Susu sapi' } },
  { id: 'h-nyo', kana: 'にょ', romaji: 'nyo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'にょうぼう', romaji: 'nyoubou', meaning: 'Istri' } },

  { id: 'h-hya', kana: 'ひゃ', romaji: 'hya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ひゃく', romaji: 'hyaku', meaning: 'Seratus' } },
  { id: 'h-hyu', kana: 'ひゅ', romaji: 'hyu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ひゅう', romaji: 'hyuu', meaning: 'Desir angin' } },
  { id: 'h-hyo', kana: 'ひょ', romaji: 'ひょ', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ひょう', romaji: 'hyou', meaning: 'Tabel' } },

  { id: 'h-mya', kana: 'みゃ', romaji: 'mya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'みゃく', romaji: 'myaku', meaning: 'Denyut nadi' } },
  { id: 'h-myu', kana: 'みゅ', romaji: 'myu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'みゅーじっく', romaji: 'myuujikku', meaning: 'Musik' } },
  { id: 'h-myo', kana: 'みょ', romaji: 'myo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'みょうじ', romaji: 'myouji', meaning: 'Nama keluarga' } },

  { id: 'h-rya', kana: 'りゃ', romaji: 'rya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'りゃく', romaji: 'ryaku', meaning: 'Singkatan' } },
  { id: 'h-ryu', kana: 'りゅ', romaji: 'ryu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'りゅうがくせい', romaji: 'ryuugakusei', meaning: 'Mahasiswa asing' } },
  { id: 'h-ryo', kana: 'りょ', romaji: 'ryo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'りょこう', romaji: 'ryokou', meaning: 'Wisata / Liburan' } },

  { id: 'h-gya', kana: 'ぎゃ', romaji: 'gya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ぎゃく', romaji: 'gyaku', meaning: 'Kebalikan' } },
  { id: 'h-gyu', kana: 'ぎゅ', romaji: 'gyu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ぎゅうにく', romaji: 'gyuuniku', meaning: 'Daging sapi' } },
  { id: 'h-gyo', kana: 'ぎょ', romaji: 'gyo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ぎょうざ', romaji: 'gyouza', meaning: 'Gyoza' } },

  { id: 'h-ja', kana: 'じゃ', romaji: 'ja', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'じゃ、また', romaji: 'ja, mata', meaning: 'Sampai jumpa' } },
  { id: 'h-ju', kana: 'じゅ', romaji: 'ju', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'じゅんび', romaji: 'junbi', meaning: 'Persiapan' } },
  { id: 'h-jo', kana: 'じょ', romaji: 'jo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'じょせい', romaji: 'josei', meaning: 'Wanita' } },

  { id: 'h-bya', kana: 'びゃ', romaji: 'bya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'さんびゃく', romaji: 'sanbyaku', meaning: 'Tiga ratus' } },
  { id: 'h-byu', kana: 'びゅ', romaji: 'byu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'びゅーてぃー', romaji: 'byuutii', meaning: 'Kecantikan' } },
  { id: 'h-byo', kana: 'びょ', romaji: 'byo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'びょういん', romaji: 'byouin', meaning: 'Rumah sakit' } },

  { id: 'h-pya', kana: 'ぴゃ', romaji: 'pya', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ろっぴゃく', romaji: 'roppyaku', meaning: 'Enam ratus' } },
  { id: 'h-pyu', kana: 'ぴゅ', romaji: 'pyu', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'ぴゅー', romaji: 'pyuu', meaning: 'Suara tiupan' } },
  { id: 'h-pyo', kana: 'ぴょ', romaji: 'pyo', type: 'hiragana', category: 'youon', exampleWord: { japanese: 'はっぴょう', romaji: 'happyou', meaning: 'Presentasi' } },
]

// ==========================================
// KATAKANA DATA
// ==========================================

export const KATAKANA_BASIC: KanaCharacter[] = [
  // A Row
  { id: 'k-a', kana: 'ア', romaji: 'a', type: 'katakana', category: 'basic', row: 'A', exampleWord: { japanese: 'アメリカ', romaji: 'amerika', meaning: 'Amerika' } },
  { id: 'k-i', kana: 'イ', romaji: 'i', type: 'katakana', category: 'basic', row: 'A', exampleWord: { japanese: 'インドネシア', romaji: 'indoneshia', meaning: 'Indonesia' } },
  { id: 'k-u', kana: 'ウ', romaji: 'u', type: 'katakana', category: 'basic', row: 'A', exampleWord: { japanese: 'ウェイター', romaji: 'weitaa', meaning: 'Pelayan' } },
  { id: 'k-e', kana: 'エ', romaji: 'e', type: 'katakana', category: 'basic', row: 'A', exampleWord: { japanese: 'エレベーター', romaji: 'erebeetaa', meaning: 'Lift' } },
  { id: 'k-o', kana: 'オ', romaji: 'o', type: 'katakana', category: 'basic', row: 'A', exampleWord: { japanese: 'オレンジ', romaji: 'orenji', meaning: 'Jeruk' } },

  // KA Row
  { id: 'k-ka', kana: 'カ', romaji: 'ka', type: 'katakana', category: 'basic', row: 'KA', exampleWord: { japanese: 'カメラ', romaji: 'kamera', meaning: 'Kamera' } },
  { id: 'k-ki', kana: 'キ', romaji: 'ki', type: 'katakana', category: 'basic', row: 'KA', exampleWord: { japanese: 'キッチン', romaji: 'kicchin', meaning: 'Dapur' } },
  { id: 'k-ku', kana: 'ク', romaji: 'ku', type: 'katakana', category: 'basic', row: 'KA', exampleWord: { japanese: 'クラス', romaji: 'kurasu', meaning: 'Kelas' } },
  { id: 'k-ke', kana: 'ケ', romaji: 'ke', type: 'katakana', category: 'basic', row: 'KA', exampleWord: { japanese: 'ケーキ', romaji: 'keeki', meaning: 'Kue' } },
  { id: 'k-ko', kana: 'コ', romaji: 'ko', type: 'katakana', category: 'basic', row: 'KA', exampleWord: { japanese: 'コーヒー', romaji: 'koohii', meaning: 'Kopi' } },

  // SA Row
  { id: 'k-sa', kana: 'サ', romaji: 'sa', type: 'katakana', category: 'basic', row: 'SA', exampleWord: { japanese: 'サラダ', romaji: 'sarada', meaning: 'Salad' } },
  { id: 'k-shi', kana: 'シ', romaji: 'shi', type: 'katakana', category: 'basic', row: 'SA', exampleWord: { japanese: 'シャツ', romaji: 'shatsu', meaning: 'Kemeja' } },
  { id: 'k-su', kana: 'ス', romaji: 'su', type: 'katakana', category: 'basic', row: 'SA', exampleWord: { japanese: 'スプーン', romaji: 'supuun', meaning: 'Sendok' } },
  { id: 'k-se', kana: 'セ', romaji: 'se', type: 'katakana', category: 'basic', row: 'SA', exampleWord: { japanese: 'セーター', romaji: 'seetaa', meaning: 'Sweter' } },
  { id: 'k-so', kana: 'ソ', romaji: 'so', type: 'katakana', category: 'basic', row: 'SA', exampleWord: { japanese: 'ソファ', romaji: 'sofa', meaning: 'Sofa' } },

  // TA Row
  { id: 'k-ta', kana: 'タ', romaji: 'ta', type: 'katakana', category: 'basic', row: 'TA', exampleWord: { japanese: 'タクシー', romaji: 'takushii', meaning: 'Taksi' } },
  { id: 'k-chi', kana: 'チ', romaji: 'chi', type: 'katakana', category: 'basic', row: 'TA', exampleWord: { japanese: 'チーズ', romaji: 'chiizu', meaning: 'Keju' } },
  { id: 'k-tsu', kana: 'ツ', romaji: 'tsu', type: 'katakana', category: 'basic', row: 'TA', exampleWord: { japanese: 'ツアー', romaji: 'tsuaa', meaning: 'Tur wisata' } },
  { id: 'k-te', kana: 'テ', romaji: 'te', type: 'katakana', category: 'basic', row: 'TA', exampleWord: { japanese: 'テレビ', romaji: 'terebi', meaning: 'Televisi' } },
  { id: 'k-to', kana: 'ト', romaji: 'to', type: 'katakana', category: 'basic', row: 'TA', exampleWord: { japanese: 'トイレ', romaji: 'toire', meaning: 'Toilet' } },

  // NA Row
  { id: 'k-na', kana: 'ナ', romaji: 'na', type: 'katakana', category: 'basic', row: 'NA', exampleWord: { japanese: 'ナイフ', romaji: 'naifu', meaning: 'Pisau' } },
  { id: 'k-ni', kana: 'ニ', romaji: 'ni', type: 'katakana', category: 'basic', row: 'NA', exampleWord: { japanese: 'ニュース', romaji: 'nyuusu', meaning: 'Berita' } },
  { id: 'k-nu', kana: 'ヌ', romaji: 'nu', type: 'katakana', category: 'basic', row: 'NA', exampleWord: { japanese: 'カヌー', romaji: 'kanuu', meaning: 'Kano' } },
  { id: 'k-ne', kana: 'ネ', romaji: 'ne', type: 'katakana', category: 'basic', row: 'NA', exampleWord: { japanese: 'ネクタイ', romaji: 'nekutai', meaning: 'Dasi' } },
  { id: 'k-no', kana: 'ノ', romaji: 'no', type: 'katakana', category: 'basic', row: 'NA', exampleWord: { japanese: 'ノート', romaji: 'nooto', meaning: 'Buku catatan' } },

  // HA Row
  { id: 'k-ha', kana: 'ハ', romaji: 'ha', type: 'katakana', category: 'basic', row: 'HA', exampleWord: { japanese: 'ハンバーガー', romaji: 'hanbaagaa', meaning: 'Burger' } },
  { id: 'k-hi', kana: 'ヒ', romaji: 'hi', type: 'katakana', category: 'basic', row: 'HA', exampleWord: { japanese: 'ヒーター', romaji: 'hiitaa', meaning: 'Penghangat' } },
  { id: 'k-fu', kana: 'フ', romaji: 'fu', type: 'katakana', category: 'basic', row: 'HA', exampleWord: { japanese: 'フランス', romaji: 'furansu', meaning: 'Prancis' } },
  { id: 'k-he', kana: 'ヘ', romaji: 'he', type: 'katakana', category: 'basic', row: 'HA', exampleWord: { japanese: 'ヘリコプター', romaji: 'herikoputaa', meaning: 'Helikopter' } },
  { id: 'k-ho', kana: 'ホ', romaji: 'ho', type: 'katakana', category: 'basic', row: 'HA', exampleWord: { japanese: 'ホテル', romaji: 'hoteru', meaning: 'Hotel' } },

  // MA Row
  { id: 'k-ma', kana: 'マ', romaji: 'ma', type: 'katakana', category: 'basic', row: 'MA', exampleWord: { japanese: 'マイク', romaji: 'maiku', meaning: 'Mikrofon' } },
  { id: 'k-mi', kana: 'ミ', romaji: 'mi', type: 'katakana', category: 'basic', row: 'MA', exampleWord: { japanese: 'ミラー', romaji: 'miraa', meaning: 'Miller (Nama)' } },
  { id: 'k-mu', kana: 'ム', romaji: 'mu', type: 'katakana', category: 'basic', row: 'MA', exampleWord: { japanese: 'チーム', romaji: 'chiimu', meaning: 'Tim' } },
  { id: 'k-me', kana: 'メ', romaji: 'me', type: 'katakana', category: 'basic', row: 'MA', exampleWord: { japanese: 'メニュー', romaji: 'menyuu', meaning: 'Menu' } },
  { id: 'k-mo', kana: 'モ', romaji: 'mo', type: 'katakana', category: 'basic', row: 'MA', exampleWord: { japanese: 'モデル', romaji: 'moderu', meaning: 'Model' } },

  // YA Row
  { id: 'k-ya', kana: 'ヤ', romaji: 'ya', type: 'katakana', category: 'basic', row: 'YA', exampleWord: { japanese: 'タイヤ', romaji: 'taiya', meaning: 'Ban' } },
  { id: 'k-yu', kana: 'ユ', romaji: 'yu', type: 'katakana', category: 'basic', row: 'YA', exampleWord: { japanese: 'ユーザー', romaji: 'yuuzaa', meaning: 'Pengguna' } },
  { id: 'k-yo', kana: 'ヨ', romaji: 'yo', type: 'katakana', category: 'basic', row: 'YA', exampleWord: { japanese: 'ヨーロッパ', romaji: 'yooroppa', meaning: 'Eropa' } },

  // RA Row
  { id: 'k-ra', kana: 'ラ', romaji: 'ra', type: 'katakana', category: 'basic', row: 'RA', exampleWord: { japanese: 'ラジオ', romaji: 'rajio', meaning: 'Radio' } },
  { id: 'k-ri', kana: 'リ', romaji: 'ri', type: 'katakana', category: 'basic', row: 'RA', exampleWord: { japanese: 'リーダー', romaji: 'riidaa', meaning: 'Pemimpin' } },
  { id: 'k-ru', kana: 'ル', romaji: 'ru', type: 'katakana', category: 'basic', row: 'RA', exampleWord: { japanese: 'ルール', romaji: 'ruuru', meaning: 'Aturan' } },
  { id: 'k-re', kana: 'レ', romaji: 're', type: 'katakana', category: 'basic', row: 'RA', exampleWord: { japanese: 'レストラン', romaji: 'resutoran', meaning: 'Restoran' } },
  { id: 'k-ro', kana: 'ロ', romaji: 'ro', type: 'katakana', category: 'basic', row: 'RA', exampleWord: { japanese: 'ロビー', romaji: 'robii', meaning: 'Lobi' } },

  // WA Row & N
  { id: 'k-wa', kana: 'ワ', romaji: 'wa', type: 'katakana', category: 'basic', row: 'WA', exampleWord: { japanese: 'ワイン', romaji: 'wain', meaning: 'Anggur / Wine' } },
  { id: 'k-wo', kana: 'ヲ', romaji: 'wo', type: 'katakana', category: 'basic', row: 'WA', exampleWord: { japanese: 'ヲ', romaji: 'wo', meaning: 'Jarang digunakan' } },
  { id: 'k-n', kana: 'ン', romaji: 'n', type: 'katakana', category: 'basic', row: 'N', exampleWord: { japanese: 'パン', romaji: 'pan', meaning: 'Roti' } },
]

export const KATAKANA_DAKUON: KanaCharacter[] = [
  // GA Row
  { id: 'k-ga', kana: 'ガ', romaji: 'ga', type: 'katakana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'ガス', romaji: 'gasu', meaning: 'Gas' } },
  { id: 'k-gi', kana: 'ギ', romaji: 'gi', type: 'katakana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'ギター', romaji: 'gitaa', meaning: 'Gitar' } },
  { id: 'k-gu', kana: 'グ', romaji: 'gu', type: 'katakana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'グループ', romaji: 'guruupu', meaning: 'Grup' } },
  { id: 'k-ge', kana: 'ゲ', romaji: 'ge', type: 'katakana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'ゲーム', romaji: 'geemu', meaning: 'Game' } },
  { id: 'k-go', kana: 'ゴ', romaji: 'go', type: 'katakana', category: 'dakuon', row: 'GA', exampleWord: { japanese: 'ゴルフ', romaji: 'gorufu', meaning: 'Golf' } },

  // ZA Row
  { id: 'k-za', kana: 'ザ', romaji: 'za', type: 'katakana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'デザート', romaji: 'dezaato', meaning: 'Pencuci mulut' } },
  { id: 'k-ji', kana: 'ジ', romaji: 'ji', type: 'katakana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'ジーンズ', romaji: 'jiinzu', meaning: 'Celana jeans' } },
  { id: 'k-zu', kana: 'ズ', romaji: 'zu', type: 'katakana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'チーズ', romaji: 'chiizu', meaning: 'Keju' } },
  { id: 'k-ze', kana: 'ゼ', romaji: 'ze', type: 'katakana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'ゼロ', romaji: 'zero', meaning: 'Nol' } },
  { id: 'k-zo', kana: 'ゾ', romaji: 'zo', type: 'katakana', category: 'dakuon', row: 'ZA', exampleWord: { japanese: 'ゾーン', romaji: 'zoon', meaning: 'Zona' } },

  // DA Row
  { id: 'k-da', kana: 'ダ', romaji: 'da', type: 'katakana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'ダンス', romaji: 'dansu', meaning: 'Tari / Dansa' } },
  { id: 'k-d-ji', kana: 'ヂ', romaji: 'ji (di)', type: 'katakana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'ヂ', romaji: 'ji', meaning: 'Jarang digunakan' } },
  { id: 'k-d-zu', kana: 'ヅ', romaji: 'zu (du)', type: 'katakana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'ヅ', romaji: 'zu', meaning: 'Jarang digunakan' } },
  { id: 'k-de', kana: 'デ', romaji: 'de', type: 'katakana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'デパート', romaji: 'depaato', meaning: 'Dept. Store' } },
  { id: 'k-do', kana: 'ド', romaji: 'do', type: 'katakana', category: 'dakuon', row: 'DA', exampleWord: { japanese: 'ドア', romaji: 'doa', meaning: 'Pintu' } },

  // BA Row
  { id: 'k-ba', kana: 'バ', romaji: 'ba', type: 'katakana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'バス', romaji: 'basu', meaning: 'Bus' } },
  { id: 'k-bi', kana: 'ビ', romaji: 'bi', type: 'katakana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'ビル', romaji: 'biru', meaning: 'Gedung' } },
  { id: 'k-bu', kana: 'ブ', romaji: 'bu', type: 'katakana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'ブラウス', romaji: 'burausu', meaning: 'Blus' } },
  { id: 'k-be', kana: 'ベ', romaji: 'be', type: 'katakana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'ベッド', romaji: 'beddo', meaning: 'Tempat tidur' } },
  { id: 'k-bo', kana: 'ボ', romaji: 'bo', type: 'katakana', category: 'dakuon', row: 'BA', exampleWord: { japanese: 'ボタン', romaji: 'botan', meaning: 'Tombol' } },

  // PA Row
  { id: 'k-pa', kana: 'パ', romaji: 'pa', type: 'katakana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'パソコン', romaji: 'pasokon', meaning: 'Laptop / PC' } },
  { id: 'k-pi', kana: 'ピ', romaji: 'pi', type: 'katakana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ピアノ', romaji: 'piano', meaning: 'Piano' } },
  { id: 'k-pu', kana: 'プ', romaji: 'pu', type: 'katakana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'プール', romaji: 'puuru', meaning: 'Kolam renang' } },
  { id: 'k-pe', kana: 'ペ', romaji: 'pe', type: 'katakana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ペン', romaji: 'pen', meaning: 'Pena' } },
  { id: 'k-po', kana: 'ポ', romaji: 'po', type: 'katakana', category: 'handakuon', row: 'PA', exampleWord: { japanese: 'ポスト', romaji: 'posuto', meaning: 'Kotak pos' } },
]

export const KATAKANA_YOUON: KanaCharacter[] = [
  { id: 'k-kya', kana: 'キャ', romaji: 'kya', type: 'katakana', category: 'youon', exampleWord: { japanese: 'キャンプ', romaji: 'kyanpu', meaning: 'Kemah' } },
  { id: 'k-kyu', kana: 'キュ', romaji: 'kyu', type: 'katakana', category: 'youon', exampleWord: { japanese: 'キューバ', romaji: 'kyuuba', meaning: 'Kuba' } },
  { id: 'k-kyo', kana: 'キョ', romaji: 'kyo', type: 'katakana', category: 'youon', exampleWord: { japanese: 'キロ', romaji: 'kiro', meaning: 'Kilo' } },

  { id: 'k-sha', kana: 'シャ', romaji: 'sha', type: 'katakana', category: 'youon', exampleWord: { japanese: 'シャワー', romaji: 'shawaa', meaning: 'Shower' } },
  { id: 'k-shu', kana: 'シュ', romaji: 'shu', type: 'katakana', category: 'youon', exampleWord: { japanese: 'シューズ', romaji: 'shuuzu', meaning: 'Sepatu' } },
  { id: 'k-sho', kana: 'ショ', romaji: 'sho', type: 'katakana', category: 'youon', exampleWord: { japanese: 'シャツ', romaji: 'shatsu', meaning: 'Kemeja' } },

  { id: 'k-cha', kana: 'チャ', romaji: 'cha', type: 'katakana', category: 'youon', exampleWord: { japanese: 'チャンス', romaji: 'chansu', meaning: 'Kesempatan' } },
  { id: 'k-chu', kana: 'チュ', romaji: 'chu', type: 'katakana', category: 'youon', exampleWord: { japanese: 'チューリップ', romaji: 'chuurippu', meaning: 'Bunga tulip' } },
  { id: 'k-cho', kana: 'チョ', romaji: 'cho', type: 'katakana', category: 'youon', exampleWord: { japanese: 'チョコレート', romaji: 'chokoreeto', meaning: 'Cokelat' } },

  { id: 'k-ja', kana: 'ジャ', romaji: 'ja', type: 'katakana', category: 'youon', exampleWord: { japanese: 'ジャケット', romaji: 'jaketto', meaning: 'Jaket' } },
  { id: 'k-ju', kana: 'ジュ', romaji: 'ju', type: 'katakana', category: 'youon', exampleWord: { japanese: 'ジュース', romaji: 'juusu', meaning: 'Jus' } },
  { id: 'k-jo', kana: 'ジョ', romaji: 'jo', type: 'katakana', category: 'youon', exampleWord: { japanese: 'ジョギング', romaji: 'jogingu', meaning: 'Jogging' } },

  // Modern loanword Katakana
  { id: 'k-fa', kana: 'ファ', romaji: 'fa', type: 'katakana', category: 'extended', exampleWord: { japanese: 'ファイル', romaji: 'fairu', meaning: 'File' } },
  { id: 'k-fi', kana: 'フィ', romaji: 'fi', type: 'katakana', category: 'extended', exampleWord: { japanese: 'フィルム', romaji: 'firumu', meaning: 'Film' } },
  { id: 'k-fe', kana: 'フェ', romaji: 'fe', type: 'katakana', category: 'extended', exampleWord: { japanese: 'カフェ', romaji: 'kafe', meaning: 'Kafe' } },
  { id: 'k-fo', kana: 'フォ', romaji: 'fo', type: 'katakana', category: 'extended', exampleWord: { japanese: 'フォーク', romaji: 'fooku', meaning: 'Garpu' } },
  { id: 'k-ti', kana: 'ティ', romaji: 'ti', type: 'katakana', category: 'extended', exampleWord: { japanese: 'パーティー', romaji: 'paatii', meaning: 'Pesta' } },
  { id: 'k-di', kana: 'ディ', romaji: 'di', type: 'katakana', category: 'extended', exampleWord: { japanese: 'ビルディング', romaji: 'birudingu', meaning: 'Gedung' } },
  { id: 'k-wi', kana: 'ウィ', romaji: 'wi', type: 'katakana', category: 'extended', exampleWord: { japanese: 'ウィスキー', romaji: 'wisukii', meaning: 'Wiski' } },
  { id: 'k-we', kana: 'ウェ', romaji: 'we', type: 'katakana', category: 'extended', exampleWord: { japanese: 'ウェイター', romaji: 'weitaa', meaning: 'Pelayan' } },
]
