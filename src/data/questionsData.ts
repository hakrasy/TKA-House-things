import { Question } from '../types/exam';

export const EXAM_METADATA = {
  title: 'Tes Kemampuan Akademik (TKA) Bahasa Inggris',
  subject: 'Bahasa Inggris (English Language)',
  grade: 'Kelas 7 SMP',
  level: 'A1 CEFR Elementary Level',
  location: 'Poso, Sulawesi Tengah',
  topic: 'House Things & Rooms in a House',
  learningObjective: 'Siswa mampu menganalisis informasi spesifik dari descriptive text tentang benda dan ruangan di rumah dengan benar.',
  indicators: [
    { code: 'IND-1', label: 'Mengidentifikasi informasi umum tentang benda dan ruangan dari teks deskriptif' },
    { code: 'IND-2', label: 'Menemukan informasi spesifik (nama benda, lokasi, jumlah, warna, fungsi) dalam teks' },
    { code: 'IND-3', label: 'Menghubungkan informasi dari teks dengan gambar living room atau denah rumah' },
    { code: 'IND-4', label: 'Membandingkan informasi tertulis untuk menentukan jawaban tepat berdasarkan bukti teks' },
    { code: 'IND-5', label: 'Menyelesaikan soal literasi dan numerasi sederhana berdasarkan deskripsi dan denah' },
    { code: 'GRAMMAR', label: 'Menguasai tata bahasa: There is/are, Quantifiers, dan Prepositions of Place' }
  ],
  totalQuestions: 30,
  durationMinutes: 45,
  passingScore: 75
};

const FULL_DESCRIPTIVE_TEXT_POSO = `Mr. Dani’s Cozy House in Poso, Central Sulawesi

This is the living room in Mr. Dani’s house in Poso, Central Sulawesi. The room is bright, clean, and comfortable with cool fresh air from Lake Poso. In the center, there is a large window with a view of a green garden. In front of the window, there is an orange sofa with four soft cushions (two cushions on the left and two cushions on the right) and a sleeping ginger cat. A wooden coffee table made of local wood stands on a colorful patterned rug. On the table, there is a cup of warm Poso coffee, two storybooks, reading glasses, and a small green plant.

To the right of the table, there is a blue armchair with a yellow blanket on it. Beside the armchair, a floor lamp gives warm light at night. On the right wall, a wooden bookcase holds books, a blue toy robot, and small plants. On the left side, a television shows a cartoon. The family in Poso loves spending time together in this cozy living room.`;

const FULL_DIALOGUE_TEXT_POSO = `Situation: Morning at home in Poso Kota before going to SMP Negeri.

Farhan: "Mom, where is my English dictionary? I have an English test today at school."
Mother: "Look in the living room, Farhan. Is it on the wooden table?"
Farhan: "No, there are only two storybooks and a cup of Poso coffee on the table."
Mother: "Check the bookcase near the tall lamp."
Farhan: "Oh, yes! It is on the second shelf, next to my blue toy robot!"
Mother: "Good! Before you go, put your dirty school uniform in the basket in the common bathroom."
Farhan: "Yes, Mom! I will put it there right now."`;

export const QUESTIONS_DATA: Question[] = [
  // ==========================================
  // SECTION 1: LITERACY & NUMERACY (Q1 - Q20)
  // Context: Rumah Keluarga Pak Dani di Poso, Sulawesi Tengah
  // ==========================================
  
  // Q1: Single Choice (IND-1: General Information / Main Idea) - Key: B
  {
    id: 1,
    type: 'single_choice',
    category: 'literacy',
    indicator: 'Mengidentifikasi informasi umum tentang benda dan ruangan dalam rumah dari teks deskriptif.',
    indicatorCode: 'IND-1',
    topic: 'Main Idea & General Information',
    stimulusId: 'STIM-POSO-LIVINGROOM-TEXT',
    stimulusTitle: 'Descriptive Text: Mr. Dani’s House in Poso, Central Sulawesi',
    stimulusType: 'image_text',
    stimulusImage: '/images/livingroom.jpg',
    stimulusText: FULL_DESCRIPTIVE_TEXT_POSO,
    questionPrompt: 'What is the main topic of the descriptive text above?',
    instruction: 'Pilihlah satu jawaban yang paling tepat berdasarkan teks.',
    options: [
      { key: 'A', text: 'It explains the daily playing routine of an orange cat in the yard.' },
      { key: 'B', text: 'It describes the furniture and rooms in Mr. Dani’s house in Poso.' },
      { key: 'C', text: 'It tells about the colorful flowers planted in the school garden.' },
      { key: 'D', text: 'It shows the price of wooden bookcases sold in a local market.' }
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Teks secara utuh mendeskripsikan ruang tamu dan perabotan di rumah Pak Dani di Poso.',
      details: 'Paragraf memaparkan perabotan (sofa, meja kopi, rak buku, TV) serta tata letak ruangan di rumah keluarga Pak Dani di Poso.',
      vocabularyTip: 'Main topic = ide pokok atau tema utama dari teks deskriptif.'
    }
  },

  // Q2: Single Choice (IND-2: Specific Details - Items on table) - Key: C
  {
    id: 2,
    type: 'single_choice',
    category: 'literacy',
    indicator: 'Menemukan informasi spesifik berupa nama benda dan lokasi benda dalam teks.',
    indicatorCode: 'IND-2',
    topic: 'Specific Details - Objects on Coffee Table',
    stimulusId: 'STIM-POSO-LIVINGROOM-TEXT',
    stimulusTitle: 'Descriptive Text: Mr. Dani’s House in Poso, Central Sulawesi',
    stimulusType: 'image_text',
    stimulusImage: '/images/livingroom.jpg',
    stimulusText: FULL_DESCRIPTIVE_TEXT_POSO,
    questionPrompt: 'Based on the full text, what objects are on the wooden coffee table?',
    instruction: 'Pilihlah satu jawaban yang paling tepat berdasarkan teks.',
    options: [
      { key: 'A', text: 'A blue robot toy, three notebooks, a pencil case, and fresh milk.' },
      { key: 'B', text: 'A white desk lamp, four cushions, a remote control, and scissors.' },
      { key: 'C', text: 'A cup of warm coffee, two storybooks, reading glasses, and a plant.' },
      { key: 'D', text: 'A small radio, five English comics, a dictionary, and school shoes.' }
    ],
    correctAnswer: 'C',
    explanation: {
      summary: 'Benda di atas meja kopi: secangkir kopi, 2 buku cerita, kacamata baca, dan tanaman kecil.',
      details: 'Sesuai kalimat pada teks: "On the table, there is a cup of warm Poso coffee, two storybooks, reading glasses, and a small green plant."',
      vocabularyTip: 'Coffee table = meja tamu / meja kopi rendah.'
    }
  },

  // Q3: Single Choice (IND-3: Connecting Text with Image - Blanket location) - Key: A
  {
    id: 3,
    type: 'single_choice',
    category: 'literacy',
    indicator: 'Menghubungkan informasi dari teks dengan gambar living room.',
    indicatorCode: 'IND-3',
    topic: 'Visual Literacy - Yellow Blanket Location',
    stimulusId: 'STIM-POSO-LIVINGROOM-TEXT',
    stimulusTitle: 'Descriptive Text & Living Room Picture in Poso',
    stimulusType: 'image_text',
    stimulusImage: '/images/livingroom.jpg',
    stimulusText: FULL_DESCRIPTIVE_TEXT_POSO,
    questionPrompt: 'Look at the picture and text. Where is the soft yellow blanket placed?',
    instruction: 'Perhatikan gambar dan teks dengan saksama.',
    options: [
      { key: 'A', text: 'It is on the armrest of the comfortable blue armchair in the room.' },
      { key: 'B', text: 'It is folded neatly on the lower wooden shelf under the wide TV.' },
      { key: 'C', text: 'It is laid flat under the round wooden table on the floor rug.' },
      { key: 'D', text: 'It is placed behind the sleeping cat on the orange family sofa.' }
    ],
    correctAnswer: 'A',
    explanation: {
      summary: 'Selimut rajut kuning berada di atas sandaran kursi berlengan biru (blue armchair).',
      details: 'Pada gambar dan teks disebutkan: "there is a blue armchair with a yellow blanket on it".',
      vocabularyTip: 'Armchair = kursi berlengan; Blanket = selimut.'
    }
  },

  // Q4: Single Choice (IND-5: Numeracy - 4 Cushions on sofa) - Key: D
  {
    id: 4,
    type: 'single_choice',
    category: 'numeracy',
    indicator: 'Menyelesaikan soal numerasi sederhana berdasarkan teks dan gambar.',
    indicatorCode: 'IND-5',
    topic: 'Numeracy - Counting Cushions (2 Left + 2 Right = 4)',
    stimulusId: 'STIM-POSO-LIVINGROOM-TEXT',
    stimulusTitle: 'Descriptive Text & Living Room Picture in Poso',
    stimulusType: 'image_text',
    stimulusImage: '/images/livingroom.jpg',
    stimulusText: FULL_DESCRIPTIVE_TEXT_POSO,
    questionPrompt: 'Look at the sofa in the picture. There are 2 cushions on the left of the cat and 2 cushions on the right. How many cushions are there on the sofa in total?',
    instruction: 'Hitunglah jumlah bantal sofa (cushions) dengan benar.',
    options: [
      { key: 'A', text: 'There are two soft cushions in total placed on the orange sofa.' },
      { key: 'B', text: 'There are three soft cushions in total placed on the orange sofa.' },
      { key: 'C', text: 'There are five soft cushions in total placed on the orange sofa.' },
      { key: 'D', text: 'There are four soft cushions in total placed on the orange sofa.' }
    ],
    correctAnswer: 'D',
    explanation: {
      summary: 'Jumlah bantal sofa adalah 4 bantal (2 bantal di kiri + 2 bantal di kanan kucing = 4 bantal).',
      details: '2 + 2 = 4 (four cushions in total). Teks menyatakan: "four soft cushions (two cushions on the left and two cushions on the right)".',
      vocabularyTip: 'In total = total / jumlah seluruhnya.'
    }
  },

  // Q5: Complex Choice (IND-2: Items on bookcase) - Key: opt1, opt3, opt4
  {
    id: 5,
    type: 'complex_choice',
    category: 'literacy',
    indicator: 'Menemukan informasi spesifik berupa nama benda di dalam ruangan.',
    indicatorCode: 'IND-2',
    topic: 'Bookshelf Objects - Complex Selection',
    stimulusId: 'STIM-POSO-LIVINGROOM-TEXT',
    stimulusTitle: 'Descriptive Text & Bookshelf in Poso',
    stimulusType: 'image_text',
    stimulusImage: '/images/livingroom.jpg',
    stimulusText: FULL_DESCRIPTIVE_TEXT_POSO,
    questionPrompt: 'Which items are on the wooden bookcase in the living room? (Choose 3 correct items)',
    instruction: 'Pilihlah TIGA (3) benda yang ada di rak buku kayu.',
    complexOptions: [
      { id: 'opt1', text: 'A brown toy teddy bear sitting on the top shelf.', isCorrect: true },
      { id: 'opt2', text: 'A cooking frying pan filled with fresh fried fish.', isCorrect: false },
      { id: 'opt3', text: 'A blue toy robot standing near the colorful books.', isCorrect: true },
      { id: 'opt4', text: 'A green dinosaur toy placed on the middle shelf.', isCorrect: true },
      { id: 'opt5', text: 'A white electric rice cooker connected to a plug.', isCorrect: false }
    ],
    explanation: {
      summary: 'Benda di rak buku: boneka beruang cokelat, robot mainan biru, dan dinosaurus hijau.',
      details: 'Wajan masak dan penanak nasi adalah perlengkapan dapur, bukan di rak buku ruang tamu.',
      vocabularyTip: 'Bookcase = lemari / rak buku.'
    }
  },

  // Q6: True/False Table (IND-4: Comparing details with image)
  {
    id: 6,
    type: 'true_false',
    category: 'literacy',
    indicator: 'Membandingkan informasi tertulis untuk menentukan jawaban tepat berdasarkan bukti teks/gambar.',
    indicatorCode: 'IND-4',
    topic: 'Fact Verification - Living Room in Poso',
    stimulusId: 'STIM-POSO-LIVINGROOM-TEXT',
    stimulusTitle: 'Descriptive Text & Living Room Details',
    stimulusType: 'image_text',
    stimulusImage: '/images/livingroom.jpg',
    stimulusText: FULL_DESCRIPTIVE_TEXT_POSO,
    questionPrompt: 'Read the full text and look at the picture. Choose True (Benar) or False (Salah) for each statement.',
    instruction: 'Tentukan Benar atau Salah untuk tiap pernyataan berikut.',
    tfStatements: [
      { id: 'tf1', statement: 'The TV is showing an animated cartoon program.', isTrue: true },
      { id: 'tf2', statement: 'There are four cushions placed around the sleeping cat.', isTrue: true },
      { id: 'tf3', statement: 'There is a tall floor lamp next to the blue armchair.', isTrue: true },
      { id: 'tf4', statement: 'The coffee table has no rug or mat beneath it on the floor.', isTrue: false }
    ],
    explanation: {
      summary: 'TV menayangkan kartun (True), ada 4 bantal di sofa (True), lampu lantai ada di dekat armchair (True), ada karpet etnik di bawah meja (False untuk pernyataan tanpa karpet).',
      details: 'Gambar dan teks membuktikan ada karpet etnik bermotif indah di bawah meja kopi.',
      vocabularyTip: 'Beneath = di bawah.'
    }
  },

  // Q7: Single Choice (IND-3: Floor Plan - Connecting Rooms) - Key: B
  {
    id: 7,
    type: 'single_choice',
    category: 'literacy',
    indicator: 'Menghubungkan informasi dari teks dengan gambar denah sederhana rumah.',
    indicatorCode: 'IND-3',
    topic: 'Floor Plan - En-suite Bathroom Connection',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'Floor Plan: Dani Family House in Poso',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'Look at the house floor plan. Which room is directly connected to the "Master En-suite Bathroom"?',
    instruction: 'Perhatikan denah rumah keluarga di Poso ini.',
    options: [
      { key: 'A', text: 'The Common Bathroom situated beside the second kids bedroom.' },
      { key: 'B', text: 'The Master Bedroom located at the top-left area of the house.' },
      { key: 'C', text: 'The Kitchen and Dining Area placed directly in the center.' },
      { key: 'D', text: 'The Living Room positioned next to the sunny entrance porch.' }
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Master En-suite Bathroom terhubung langsung ke Master Bedroom.',
      details: 'Pintu kamar mandi en-suite berada di dalam kamar tidur utama (Master Bedroom di sisi kiri atas denah).',
      vocabularyTip: 'En-suite bathroom = kamar mandi di dalam kamar tidur utama.'
    }
  },

  // Q8: Single Choice (IND-5: Numeracy - Counting Bedrooms) - Key: C
  {
    id: 8,
    type: 'single_choice',
    category: 'numeracy',
    indicator: 'Menyelesaikan soal numerasi sederhana berdasarkan denah rumah.',
    indicatorCode: 'IND-5',
    topic: 'Numeracy - Total Bedrooms in House',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'Floor Plan: Bedroom Count in Poso House',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'How many bedrooms are there in this house in Poso according to the floor plan?',
    instruction: 'Hitunglah jumlah kamar tidur (bedrooms) pada denah rumah.',
    options: [
      { key: 'A', text: 'There are two bedrooms in total inside this family home in Poso.' },
      { key: 'B', text: 'There are four bedrooms in total inside this family home in Poso.' },
      { key: 'C', text: 'There are three bedrooms in total inside this family home in Poso.' },
      { key: 'D', text: 'There are five bedrooms in total inside this family home in Poso.' }
    ],
    correctAnswer: 'C',
    explanation: {
      summary: 'Terdapat 3 kamar tidur: Master Bedroom, Bedroom 2, dan Bedroom 3.',
      details: 'Denah menunjukkan 1) Master Bedroom, 2) Bedroom 2, dan 3) Bedroom 3. Total = 3 kamar tidur.',
      vocabularyTip: 'Bedroom = kamar tidur.'
    }
  },

  // Q9: Complex Choice (IND-3: Floor Plan - Kitchen Equipment) - Key: kit1, kit2, kit4
  {
    id: 9,
    type: 'complex_choice',
    category: 'literacy',
    indicator: 'Menghubungkan informasi dari teks dengan gambar denah sederhana rumah.',
    indicatorCode: 'IND-3',
    topic: 'Kitchen & Dining Items from Floor Plan',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'Kitchen & Dining Area in Poso House',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'What furniture and appliances are visible in the Kitchen & Dining Area? (Choose 3 correct items)',
    instruction: 'Pilihlah TIGA (3) benda yang ada di dapur & ruang makan pada denah.',
    complexOptions: [
      { id: 'kit1', text: 'A dining table with four dining chairs.', isCorrect: true },
      { id: 'kit2', text: 'A refrigerator (fridge) for keeping food and drinks.', isCorrect: true },
      { id: 'kit3', text: 'A large bathtub with warm water for bathing.', isCorrect: false },
      { id: 'kit4', text: 'A cooking stove and kitchen sink for washing dishes.', isCorrect: true },
      { id: 'kit5', text: 'A double bed with two soft bedside lamps.', isCorrect: false }
    ],
    explanation: {
      summary: 'Di area dapur terdapat meja makan dengan 4 kursi, kulkas, serta kompor dan wastafel cuci.',
      details: 'Bathtub ada di kamar mandi, dan double bed ada di kamar tidur utama.',
      vocabularyTip: 'Appliances = peralatan rumah tangga elektronik.'
    }
  },

  // Q10: Matching (IND-2: Names of items and their functions)
  {
    id: 10,
    type: 'matching',
    category: 'literacy',
    indicator: 'Menemukan informasi spesifik berupa nama benda dan fungsinya.',
    indicatorCode: 'IND-2',
    topic: 'Household Items & Their Uses',
    stimulusId: 'STIM-MATCH-FUNCTIONS',
    stimulusTitle: 'Household Vocabulary & Functions',
    stimulusType: 'table',
    questionPrompt: 'Match each household item on the left with its use on the right.',
    instruction: 'Pasangkan nama benda dengan kegunaannya yang tepat.',
    matchingPairs: [
      { id: 'p1', left: 'Refrigerator', right: 'Keeps food and fresh drinks cold' },
      { id: 'p2', left: 'Bookcase', right: 'Stores books, school bags, and toys' },
      { id: 'p3', left: 'Bathtub', right: 'Used for taking a warm bath' },
      { id: 'p4', left: 'Dining Table', right: 'A place for the family to eat meals' }
    ],
    explanation: {
      summary: 'Kulkas menjaga makanan tetap dingin, rak buku menyimpan buku, bathtub untuk mandi, meja makan untuk makan bersama keluarga.',
      details: 'Pasangan kosakata perabot rumah tangga dasar A1 level.',
      vocabularyTip: 'Meals = makanan bersama.'
    }
  },

  // Q11: Single Choice (IND-1: Dialogue - Purpose of Talk) - Key: A
  {
    id: 11,
    type: 'single_choice',
    category: 'literacy',
    indicator: 'Mengidentifikasi informasi umum dari percakapan sehari-hari.',
    indicatorCode: 'IND-1',
    topic: 'Dialogue in Poso - Purpose of Talk',
    stimulusId: 'STIM-DIALOGUE-POSO',
    stimulusTitle: 'Dialogue: Getting Ready for School in Poso Kota',
    stimulusType: 'dialogue',
    stimulusText: FULL_DIALOGUE_TEXT_POSO,
    questionPrompt: 'What is Farhan looking for in the conversation?',
    instruction: 'Pilihlah satu jawaban yang paling tepat berdasarkan percakapan utuh di atas.',
    options: [
      { key: 'A', text: 'He is looking for his English dictionary for his school test today.' },
      { key: 'B', text: 'He is looking for his clean blue school shoes in the front garden.' },
      { key: 'C', text: 'He is looking for five storybooks to read with his friends at school.' },
      { key: 'D', text: 'He is looking for a cup of warm sweet tea in the family kitchen.' }
    ],
    correctAnswer: 'A',
    explanation: {
      summary: 'Farhan mencari kamus bahasa Inggrisnya untuk persiapan ujian di sekolah.',
      details: 'Farhan berkata: "Mom, where is my English dictionary? I have an English test today at school."',
      vocabularyTip: 'Dictionary = kamus bahasa.'
    }
  },

  // Q12: Single Choice (IND-2: Dialogue - Specific Location) - Key: D
  {
    id: 12,
    type: 'single_choice',
    category: 'literacy',
    indicator: 'Menemukan informasi spesifik berupa lokasi benda dalam percakapan.',
    indicatorCode: 'IND-2',
    topic: 'Object Location from Dialogue',
    stimulusId: 'STIM-DIALOGUE-POSO',
    stimulusTitle: 'Dialogue: Getting Ready for School in Poso Kota',
    stimulusType: 'dialogue',
    stimulusText: FULL_DIALOGUE_TEXT_POSO,
    questionPrompt: 'Where is Farhan’s English dictionary according to the full conversation?',
    instruction: 'Pilihlah lokasi spesifik kamus Farhan berdasarkan percakapan.',
    options: [
      { key: 'A', text: 'Under the wooden television table, behind the sleeping ginger cat.' },
      { key: 'B', text: 'Inside the big laundry basket in the family common bathroom.' },
      { key: 'C', text: 'On top of the dining table in the kitchen, beside the lunch box.' },
      { key: 'D', text: 'On the second shelf of the bookcase, next to the blue toy robot.' }
    ],
    correctAnswer: 'D',
    explanation: {
      summary: 'Kamus berada di rak kedua rak buku, di sebelah robot mainan biru.',
      details: 'Farhan berkata: "It is on the second shelf, next to my blue toy robot!"',
      vocabularyTip: 'Next to = di sebelah / di samping.'
    }
  },

  // Q13: True/False Table (IND-4: Dialogue Fact Verification)
  {
    id: 13,
    type: 'true_false',
    category: 'literacy',
    indicator: 'Membandingkan informasi tertulis untuk menentukan kebenaran bukti teks dialog.',
    indicatorCode: 'IND-4',
    topic: 'Dialogue Fact Check',
    stimulusId: 'STIM-DIALOGUE-POSO',
    stimulusTitle: 'Dialogue: Getting Ready for School in Poso Kota',
    stimulusType: 'dialogue',
    stimulusText: FULL_DIALOGUE_TEXT_POSO,
    questionPrompt: 'Read the full dialogue in Poso. Choose True (Benar) or False (Salah) for each statement.',
    instruction: 'Tentukan Benar atau Salah untuk tiap pernyataan berikut.',
    tfStatements: [
      { id: 'td1', statement: 'Farhan has an English test at school today.', isTrue: true },
      { id: 'td2', statement: 'The dictionary was lying on the living room table.', isTrue: false },
      { id: 'td3', statement: 'Mother tells Farhan to put dirty clothes into the bathroom basket.', isTrue: true },
      { id: 'td4', statement: 'Farhan refuses to listen to his mother’s advice.', isTrue: false }
    ],
    explanation: {
      summary: 'Farhan ada ujian bahasa Inggris (True), kamus di rak buku bukan di meja (False), ibu menyuruh taruh baju kotor di keranjang (True), Farhan mendengarkan ibunya dengan patuh (False untuk menolak).',
      details: 'Farhan mengatakan "Yes, Mom! I will put it there right now", membuktikan ia patuh.',
      vocabularyTip: 'School uniform = seragam sekolah.'
    }
  },

  // Q14: Single Choice (IND-5: Numeracy - Beds Calculation) - Key: B
  {
    id: 14,
    type: 'single_choice',
    category: 'numeracy',
    indicator: 'Menyelesaikan soal numerasi sederhana berdasarkan denah rumah.',
    indicatorCode: 'IND-5',
    topic: 'Numeracy - Total Beds Calculation',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'Floor Plan: Bed Calculation',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'Master Bedroom has 1 double bed, Bedroom 2 has 1 single bed, and Bedroom 3 has 2 beds. How many beds are there in total in the house?',
    instruction: 'Hitung total tempat tidur (beds) di seluruh rumah.',
    options: [
      { key: 'A', text: 'There are altogether three beds placed inside the bedrooms of the house.' },
      { key: 'B', text: 'There are altogether four beds placed inside the bedrooms of the house.' },
      { key: 'C', text: 'There are altogether five beds placed inside the bedrooms of the house.' },
      { key: 'D', text: 'There are altogether six beds placed inside the bedrooms of the house.' }
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Total tempat tidur adalah 4 buah (1 + 1 + 2 = 4).',
      details: '1 di Master Bedroom + 1 di Bedroom 2 + 2 di Bedroom 3 = 4 beds.',
      vocabularyTip: 'Altogether = secara keseluruhan.'
    }
  },

  // Q15: Complex Choice (IND-4: Comparing Rooms) - Key: cmp1, cmp3
  {
    id: 15,
    type: 'complex_choice',
    category: 'literacy',
    indicator: 'Membandingkan informasi tertulis berdasarkan bukti denah.',
    indicatorCode: 'IND-4',
    topic: 'Comparing Rooms on Floor Plan',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'Room Comparison: Poso Family House',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'Which 2 statements about the floor plan are TRUE? (Choose 2 correct statements)',
    instruction: 'Pilihlah DUA (2) pernyataan perbandingan yang benar.',
    complexOptions: [
      { id: 'cmp1', text: 'The Master Bedroom is bigger than Bedroom 2.', isCorrect: true },
      { id: 'cmp2', text: 'Bedroom 3 has fewer beds than Bedroom 2.', isCorrect: false },
      { id: 'cmp3', text: 'The Common Bathroom has a shower, and En-suite has a bathtub.', isCorrect: true },
      { id: 'cmp4', text: 'The Living Room is located outside the house fence.', isCorrect: false }
    ],
    explanation: {
      summary: 'Master Bedroom lebih besar dari Bedroom 2, dan kamar mandi umum memiliki shower sedangkan en-suite memiliki bathtub.',
      details: 'Bedroom 3 memiliki 2 kasur (lebih banyak dari Bedroom 2 yang hanya 1 kasur).',
      vocabularyTip: 'Bigger than = lebih besar daripada.'
    }
  },

  // Q16: Single Choice (IND-2: Inventory Table - Dining Chairs) - Key: C
  {
    id: 16,
    type: 'single_choice',
    category: 'literacy',
    indicator: 'Menemukan informasi spesifik berupa nama benda, jumlah, dan warna.',
    indicatorCode: 'IND-2',
    topic: 'Table Reading - Furniture Details',
    stimulusId: 'STIM-TABLE-POSO',
    stimulusTitle: 'Table: Furniture Checklist in Poso House',
    stimulusType: 'table',
    stimulusTable: {
      headers: ['Room', 'Item Name', 'Quantity', 'Color', 'Location'],
      rows: [
        ['Living Room', 'Orange Sofa', '1 unit', 'Orange', 'In front of window'],
        ['Living Room', 'Armchair', '1 unit', 'Blue', 'Near floor lamp'],
        ['Dining Area', 'Dining Chairs', '4 units', 'Brown Wood', 'Around the dining table'],
        ['Kitchen', 'Refrigerator', '1 unit', 'Silver', 'Beside the counter'],
        ['Bedroom 3', 'Single Beds', '2 units', 'Blue & Red', 'Next to the wall']
      ]
    },
    questionPrompt: 'Based on the inventory table, what is the color and number of the dining chairs?',
    instruction: 'Perhatikan tabel furnitur di atas.',
    options: [
      { key: 'A', text: 'There are two orange chairs placed in front of the living room window.' },
      { key: 'B', text: 'There is one blue armchair placed near the tall family floor lamp.' },
      { key: 'C', text: 'There are four brown wooden chairs placed around the dining table.' },
      { key: 'D', text: 'There are four silver chairs placed beside the big white refrigerator.' }
    ],
    correctAnswer: 'C',
    explanation: {
      summary: 'Terdapat 4 kursi makan berbahan kayu cokelat (Brown Wood).',
      details: 'Lihat baris ketiga tabel: Room = Dining Area, Item = Dining Chairs, Quantity = 4 units, Color = Brown Wood.',
      vocabularyTip: 'Quantity = kuantitas / jumlah.'
    }
  },

  // Q17: Matching (IND-3: Spatial matching of rooms on floor plan)
  {
    id: 17,
    type: 'matching',
    category: 'literacy',
    indicator: 'Menghubungkan informasi dari teks dengan posisi ruangan pada denah.',
    indicatorCode: 'IND-3',
    topic: 'Matching Rooms with Floor Plan Locations',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'Matching: Rooms & Floor Plan Locations',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'Match each room on the left with its place on the floor plan on the right.',
    instruction: 'Pasangkan nama ruangan dengan letak posisinya pada denah.',
    matchingPairs: [
      { id: 'rm1', left: 'Front Garden', right: 'At the entrance outside the house behind the fence' },
      { id: 'rm2', left: 'Master Bedroom', right: 'At the top-left area with an en-suite bathroom' },
      { id: 'rm3', left: 'Kitchen Area', right: 'At the bottom-left area next to the front porch' },
      { id: 'rm4', left: 'Bedroom 3 (Kids)', right: 'At the bottom-right corner of the house' }
    ],
    explanation: {
      summary: 'Taman depan di luar pagar, Master Bedroom di kiri atas, Kitchen di kiri bawah, Bedroom 3 di pojok kanan bawah.',
      details: 'Orientasi spasial denah rumah (A1 level).',
      vocabularyTip: 'Corner = pojok / sudut ruangan.'
    }
  },

  // Q18: Single Choice (IND-5: Numeracy - Seating Calculation) - Key: A
  {
    id: 18,
    type: 'single_choice',
    category: 'numeracy',
    indicator: 'Menyelesaikan soal numerasi sederhana berdasarkan tabel.',
    indicatorCode: 'IND-5',
    topic: 'Numeracy - Seating Capacity',
    stimulusId: 'STIM-TABLE-SEATS',
    stimulusTitle: 'Table: Seats in Dani Family House in Poso',
    stimulusType: 'table',
    stimulusTable: {
      headers: ['Seat Type', 'Room', 'Capacity'],
      rows: [
        ['Sofa', 'Living Room', '4 people'],
        ['Armchair', 'Living Room', '1 person'],
        ['Dining Chairs', 'Dining Area', '4 people'],
        ['Study Desk Chair', 'Bedroom 2', '1 person']
      ]
    },
    questionPrompt: 'Guests from Tentena visit Mr. Dani’s house. How many seats are there in the living room and dining area combined?',
    instruction: 'Hitung jumlah kursi di Living Room dan Dining Area jika digabungkan.',
    options: [
      { key: 'A', text: 'There are nine seats in total in the living room and dining area.' },
      { key: 'B', text: 'There are eight seats in total in the living room and dining area.' },
      { key: 'C', text: 'There are ten seats in total in the living room and dining area.' },
      { key: 'D', text: 'There are eleven seats in total in the living room and dining area.' }
    ],
    correctAnswer: 'A',
    explanation: {
      summary: 'Jumlah tempat duduk di ruang tamu dan ruang makan adalah 9 kursi (4 + 1 + 4 = 9).',
      details: 'Living Room: Sofa (4) + Armchair (1) = 5 kursi. Dining Area: Dining Chairs (4 kursi). Total = 5 + 4 = 9 tempat duduk.',
      vocabularyTip: 'Combined = jika digabungkan.'
    }
  },

  // Q19: True/False Table (IND-4: Layout Facts)
  {
    id: 19,
    type: 'true_false',
    category: 'literacy',
    indicator: 'Mengidentifikasi informasi umum dan membandingkan fakta tata ruang.',
    indicatorCode: 'IND-4',
    topic: 'Poso House Layout Verification',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'House Layout Statements',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'Choose True (Benar) or False (Salah) for each statement about the house floor plan.',
    instruction: 'Tentukan Benar atau Salah berdasarkan gambar denah.',
    tfStatements: [
      { id: 'hl1', statement: 'Visitors walk through the porch to enter the house from the garden.', isTrue: true },
      { id: 'hl2', statement: 'The house has two bathrooms: en-suite and common bathroom.', isTrue: true },
      { id: 'hl3', statement: 'The kitchen is located outside in the front garden near the trees.', isTrue: false },
      { id: 'hl4', statement: 'Bedroom 2 has a study desk with a chair for doing homework.', isTrue: true }
    ],
    explanation: {
      summary: 'Masuk lewat teras/porch (True), ada 2 kamar mandi (True), dapur di dalam rumah bukan di taman luar (False), Bedroom 2 punya meja belajar (True).',
      details: 'Dapur terletak di dalam ruangan, berdampingan dengan ruang makan.',
      vocabularyTip: 'Porch = serambi / teras.'
    }
  },

  // Q20: Complex Choice (IND-5: Numeracy & Spatial Facts) - Key: num2, num4
  {
    id: 20,
    type: 'complex_choice',
    category: 'numeracy',
    indicator: 'Menyelesaikan soal literasi dan numerasi sederhana berdasarkan denah.',
    indicatorCode: 'IND-5',
    topic: 'Numeracy & Facts on Poso House',
    stimulusId: 'STIM-FLOORPLAN-POSO',
    stimulusTitle: 'Numbers and Spaces in Poso House',
    stimulusType: 'image_only',
    stimulusImage: '/images/denah.jpg',
    questionPrompt: 'Which 2 facts about the house floor plan are CORRECT? (Choose 2 correct facts)',
    instruction: 'Pilihlah DUA (2) fakta numerasi dan denah yang benar.',
    complexOptions: [
      { id: 'num1', text: 'There are five large beds inside the living room area.', isCorrect: false },
      { id: 'num2', text: 'There are two toilets in the house (one in each bathroom).', isCorrect: true },
      { id: 'num3', text: 'The common bathroom has three big bathtubs side by side.', isCorrect: false },
      { id: 'num4', text: 'The dining table has four chairs placed neatly around it.', isCorrect: true }
    ],
    explanation: {
      summary: 'Ada 2 kloset toilet (1 di tiap kamar mandi) dan meja makan dikelilingi 4 kursi.',
      details: 'Tidak ada kasur di ruang tamu, dan hanya ada 1 bathtub di Master En-suite.',
      vocabularyTip: 'Each bathroom = masing-masing kamar mandi.'
    }
  },

  // ==========================================
  // SECTION 2: GRAMMAR (Q21 - Q30)
  // Simple A1 Grammar: There is/are, Quantifiers, Prepositions
  // ==========================================

  // Q21: Single Choice (GRAMMAR: There is vs There are) - Key: D
  {
    id: 21,
    type: 'single_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Penggunaan There is dan There are.',
    indicatorCode: 'GRAMMAR',
    topic: 'There is vs There are',
    stimulusId: 'STIM-GRAMMAR-1',
    stimulusTitle: 'Grammar in Living Room Context',
    stimulusType: 'grammar_context',
    stimulusText: `Complete the sentence:
"In the living room, ________ a sleeping cat, and ________ four cushions on the sofa."`,
    questionPrompt: 'Choose the correct pair of words to complete the sentence.',
    instruction: 'Pilihlah kata yang tepat untuk melengkapi kalimat.',
    options: [
      { key: 'A', text: 'There are, and there is.' },
      { key: 'B', text: 'There are, and there are.' },
      { key: 'C', text: 'There is, and there is.' },
      { key: 'D', text: 'There is, and there are.' }
    ],
    correctAnswer: 'D',
    explanation: {
      summary: 'Gunakan "There is" untuk benda tunggal (a cat), dan "There are" untuk benda jamak (four cushions).',
      details: 'There is + singular noun (1 ekor kucing). There are + plural noun (4 bantal sofa).',
      ruleSummary: 'There is a cat | There are four cushions.'
    }
  },

  // Q22: Single Choice (GRAMMAR: Preposition - between) - Key: B
  {
    id: 22,
    type: 'single_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Prepositions of Place (between, under, behind, on).',
    indicatorCode: 'GRAMMAR',
    topic: 'Preposition of Place: between',
    stimulusId: 'STIM-GRAMMAR-2',
    stimulusTitle: 'Grammar: Object Position',
    stimulusType: 'grammar_context',
    stimulusText: `Complete the sentence:
"Farhan’s dictionary is ________ the toy robot and the green plant on the shelf."`,
    questionPrompt: 'Which preposition of place means "in the middle of two things"?',
    instruction: 'Pilihlah preposisi yang berarti di antara dua benda.',
    options: [
      { key: 'A', text: 'under.' },
      { key: 'B', text: 'between.' },
      { key: 'C', text: 'behind.' },
      { key: 'D', text: 'above.' }
    ],
    correctAnswer: 'B',
    explanation: {
      summary: 'Gunakan "between" (di antara) untuk posisi di tengah-tengah dua benda.',
      details: '"Between the robot and the plant" = di antara robot dan tanaman.',
      vocabularyTip: 'Between = di antara (dua benda).'
    }
  },

  // Q23: Single Choice (GRAMMAR: Quantifiers - many vs much) - Key: C
  {
    id: 23,
    type: 'single_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Quantifiers (many vs much).',
    indicatorCode: 'GRAMMAR',
    topic: 'Quantifiers: many vs much',
    stimulusId: 'STIM-GRAMMAR-3',
    stimulusTitle: 'Grammar: Quantifiers in Poso House',
    stimulusType: 'grammar_context',
    stimulusText: `Complete the sentence:
"There are ________ books on the shelf, but there isn't ________ water in the glass."`,
    questionPrompt: 'Which pair of words correctly fills the blanks for countable and uncountable nouns?',
    instruction: 'Pilihlah pasangan kata yang tepat untuk kata benda yang dapat dihitung dan tidak dapat dihitung.',
    options: [
      { key: 'A', text: 'much, and many.' },
      { key: 'B', text: 'much, and much.' },
      { key: 'C', text: 'many, and much.' },
      { key: 'D', text: 'many, and many.' }
    ],
    correctAnswer: 'C',
    explanation: {
      summary: '"Many" untuk benda dapat dihitung (books), "much" untuk benda cair tak dapat dihitung (water).',
      details: 'Many books (banyak buku); Much water (banyak air).',
      ruleSummary: 'Many + countable plural | Much + uncountable.'
    }
  },

  // Q24: Complex Choice (GRAMMAR: Correct sentences with There is / There are) - Key: g1, g2, g4
  {
    id: 24,
    type: 'complex_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Kalimat There is dan There are yang benar.',
    indicatorCode: 'GRAMMAR',
    topic: 'There is & There are Sentence Accuracy',
    stimulusId: 'STIM-GRAMMAR-4',
    stimulusTitle: 'Sentence Check: There is & There are',
    stimulusType: 'grammar_context',
    questionPrompt: 'Which 3 sentences are GRAMMATICALLY CORRECT? (Choose 3 correct sentences)',
    instruction: 'Pilihlah TIGA (3) kalimat yang susunan tata bahasanya benar.',
    complexOptions: [
      { id: 'g1', text: 'There is a big refrigerator in the kitchen.', isCorrect: true },
      { id: 'g2', text: 'There are four wooden chairs around the table.', isCorrect: true },
      { id: 'g3', text: 'There are a small alarm clock on the nightstand.', isCorrect: false },
      { id: 'g4', text: 'There are two beds in Bedroom 3.', isCorrect: true },
      { id: 'g5', text: 'There is three books in the school bag.', isCorrect: false }
    ],
    explanation: {
      summary: 'Kalimat 1, 2, dan 4 benar. Kalimat 3 salah (a small clock tunggal, harus There is). Kalimat 5 salah (three books jamak, harus There are).',
      details: 'There is + singular (a clock). There are + plural (two beds, four chairs).',
      ruleSummary: 'There is a... | There are two/three...'
    }
  },

  // Q25: Single Choice (GRAMMAR: Preposition - under) - Key: A
  {
    id: 25,
    type: 'single_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Prepositions of Place (under, on, in).',
    indicatorCode: 'GRAMMAR',
    topic: 'Preposition of Place: under',
    stimulusId: 'STIM-GRAMMAR-5',
    stimulusTitle: 'Grammar: Rug Position',
    stimulusType: 'grammar_context',
    stimulusText: `Complete the sentence:
"The colorful patterned rug is ________ the wooden coffee table."`,
    questionPrompt: 'Which preposition of place means "below" or "beneath" the table?',
    instruction: 'Pilihlah preposisi yang menyatakan posisi di bawah meja.',
    options: [
      { key: 'A', text: 'under.' },
      { key: 'B', text: 'inside.' },
      { key: 'C', text: 'behind.' },
      { key: 'D', text: 'above.' }
    ],
    correctAnswer: 'A',
    explanation: {
      summary: 'Gunakan "under" (di bawah) karena karpet berada di kolong / bawah meja kayu.',
      details: 'Under the coffee table = di bawah meja kopi.',
      vocabularyTip: 'Under = di bawah.'
    }
  },

  // Q26: True/False Table (GRAMMAR: Some vs Any)
  {
    id: 26,
    type: 'true_false',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Penggunaan some dan any.',
    indicatorCode: 'GRAMMAR',
    topic: 'Some vs Any Rules',
    stimulusId: 'STIM-GRAMMAR-6',
    stimulusTitle: 'Grammar Rules: Some and Any',
    stimulusType: 'grammar_context',
    questionPrompt: 'Is each sentence grammatically correct? Choose True (Benar) or False (Salah).',
    instruction: 'Tentukan Benar jika susunannya tepat, atau Salah jika keliru.',
    tfStatements: [
      { id: 'sa1', statement: 'Positive: "There are some apples in the kitchen basket."', isTrue: true },
      { id: 'sa2', statement: 'Negative: "There aren’t any dirty spoons in the sink."', isTrue: true },
      { id: 'sa3', statement: 'Question: "Are there some towels in the bathroom?" (Standard question)', isTrue: false },
      { id: 'sa4', statement: 'Negative: "There isn’t some milk inside the fridge."', isTrue: false }
    ],
    explanation: {
      summary: '"Some" digunakan dalam kalimat positif (+). "Any" digunakan dalam kalimat negatif (-) dan kalimat tanya (?).',
      details: 'Kalimat tanya standar memakai "Are there any...?". Kalimat negatif memakai "There isn\'t any...".',
      ruleSummary: 'Positive: some | Negative/Question: any.'
    }
  },

  // Q27: Single Choice (GRAMMAR: Quantifiers - a few vs a little) - Key: B
  {
    id: 27,
    type: 'single_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Quantifiers (a few vs a little).',
    indicatorCode: 'GRAMMAR',
    topic: 'Quantifiers: a few vs a little',
    stimulusId: 'STIM-GRAMMAR-7',
    stimulusTitle: 'Grammar in Kitchen Context',
    stimulusType: 'grammar_context',
    stimulusText: `In the kitchen:
"We only have ________ eggs, but we still have ________ cooking oil."`,
    questionPrompt: 'Which words correctly complete the sentence for countable and uncountable things?',
    instruction: 'Pilihlah pasangan kata yang tepat untuk telur (dapat dihitung) dan minyak (cair).',
    options: [
      { key: 'A', text: 'a little, and a few.' },
      { key: 'B', text: 'a few, and a little.' },
      { key: 'C', text: 'a few, and a few.' },
      { key: 'D', text: 'a little, and a little.' }
    ],
    correctAnswer: 'B',
    explanation: {
      summary: '"A few" untuk benda dapat dihitung (eggs), "a little" untuk benda cair tak dapat dihitung (oil).',
      details: 'A few eggs (beberapa butir telur); A little oil (sedikit minyak goreng).',
      ruleSummary: 'A few + countable | A little + uncountable.'
    }
  },

  // Q28: Matching (GRAMMAR: Prepositions of Place)
  {
    id: 28,
    type: 'matching',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Prepositions of Place (in front of, next to, behind, between).',
    indicatorCode: 'GRAMMAR',
    topic: 'Prepositions of Place Meanings',
    stimulusId: 'STIM-GRAMMAR-8',
    stimulusTitle: 'Prepositions of Place & Meaning',
    stimulusType: 'grammar_context',
    questionPrompt: 'Match each preposition on the left with its Indonesian meaning on the right.',
    instruction: 'Pasangkan preposisi tempat dalam bahasa Inggris dengan artinya dalam bahasa Indonesia.',
    matchingPairs: [
      { id: 'pr1', left: 'In front of', right: 'Di depan sesuatu' },
      { id: 'pr2', left: 'Next to / Beside', right: 'Di sebelah / di samping sesuatu' },
      { id: 'pr3', left: 'Behind', right: 'Di belakang sesuatu' },
      { id: 'pr4', left: 'Between', right: 'Di antara dua benda' }
    ],
    explanation: {
      summary: 'In front of = di depan; Next to = di samping; Behind = di belakang; Between = di antara dua benda.',
      details: 'Preposisi tempat penting untuk mendeskripsikan letak benda di dalam rumah.',
      vocabularyTip: 'Preposition of place = kata depan penunjuk tempat/posisi.'
    }
  },

  // Q29: Single Choice (GRAMMAR: Question & Negative with There is / are) - Key: D
  {
    id: 29,
    type: 'single_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Bentuk tanya dan negatif There is / There are.',
    indicatorCode: 'GRAMMAR',
    topic: 'Questions with There is / are',
    stimulusId: 'STIM-GRAMMAR-9',
    stimulusTitle: 'Asking About Bedroom Things',
    stimulusType: 'grammar_context',
    stimulusText: `Complete the conversation:
Rani: "________ an air conditioner in Bedroom 3?"
Farhan: "No, ________. There is only a fan."`,
    questionPrompt: 'Which pair of words completes the question and negative answer for a singular object?',
    instruction: 'Pilihlah pasangan kata tanya dan jawaban sangkalan yang tepat.',
    options: [
      { key: 'A', text: 'Are there, and there aren’t.' },
      { key: 'B', text: 'Is there, and there aren’t.' },
      { key: 'C', text: 'Are there, and there isn’t.' },
      { key: 'D', text: 'Is there, and there isn’t.' }
    ],
    correctAnswer: 'D',
    explanation: {
      summary: 'Karena "an air conditioner" tunggal (singular), pertanyaannya "Is there...?" dan jawabannya "No, there isn\'t".',
      details: 'Is there an AC? -> No, there isn\'t.',
      ruleSummary: 'Is there + singular? -> Yes, there is / No, there isn\'t.'
    }
  },

  // Q30: Complex Choice (GRAMMAR: Integrated Prepositions & Quantifiers) - Key: ig2, ig3
  {
    id: 30,
    type: 'complex_choice',
    category: 'grammar',
    indicator: 'Menguasai tata bahasa: Penerapan preposisi dan quantifiers.',
    indicatorCode: 'GRAMMAR',
    topic: 'Integrated Grammar in Bedroom Context',
    stimulusId: 'STIM-GRAMMAR-10',
    stimulusTitle: 'Bedroom Grammar Check',
    stimulusType: 'grammar_context',
    questionPrompt: 'Which 2 sentences use prepositions and quantifiers CORRECTLY? (Choose 2 correct sentences)',
    instruction: 'Pilihlah DUA (2) kalimat yang penggunaan tata bahasanya benar.',
    complexOptions: [
      { id: 'ig1', text: 'There is much pillows on the bed in Bedroom 2.', isCorrect: false },
      { id: 'ig2', text: 'There are several colorful toys on the rug in Bedroom 3.', isCorrect: true },
      { id: 'ig3', text: 'The lamp is on the table next to the double bed.', isCorrect: true },
      { id: 'ig4', text: 'Rani puts a few milk into the small tea glass.', isCorrect: false }
    ],
    explanation: {
      summary: 'Kalimat 2 benar (several toys on the rug), kalimat 3 benar (lamp next to the bed).',
      details: 'Kalimat 1 salah karena pillows jamak (harus many pillows). Kalimat 4 salah karena milk tak dapat dihitung (harus a little milk).',
      ruleSummary: 'Several + plural | Much/A little + uncountable.'
    }
  }
];
