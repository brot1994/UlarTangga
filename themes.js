// =====================================================================
//  TEMA BAWAAN + SUSUNAN PAPAN (template & acak adil)
// =====================================================================
(function () {
  // c: page = latar halaman, a/b = kotak papan selang-seling, num = warna angka,
  //    start/finish = kotak 1 & 100, rail/rung = tangga, body/pattern = ular, accent = tombol utama
  var T = [
    { id: 'klasik', name: 'Klasik', ladderName: 'tangga', snakeName: 'ular',
      kw: ['klasik', 'biasa', 'standar', 'original', 'default', 'classic', 'normal'],
      c: { page: '#FFF4DC', a: '#FFE7A8', b: '#FFF8E6', num: '#6B5A33', start: '#BFE6CC', finish: '#F7C548', rail: '#8A5A2B', rung: '#FFE7A8', body: '#D9483B', pattern: '#F6B0A7', accent: '#1F8A5B' },
      lIcon: '', sIcon: '', decor: [] },
    { id: 'hutan', name: 'Petualangan Hutan', ladderName: 'akar pohon', snakeName: 'ular hutan',
      kw: ['hutan', 'rimba', 'jungle', 'forest', 'pohon', 'alam', 'kebun binatang', 'safari', 'binatang', 'hewan', 'monyet', 'harimau'],
      c: { page: '#E4F0D8', a: '#B9D99B', b: '#D8EBC4', num: '#2F4A1E', start: '#F3E3A0', finish: '#F2B84B', rail: '#6B4423', rung: '#C89B6A', body: '#3E7D2C', pattern: '#A6D47E', accent: '#2E7D32' },
      lIcon: '🌳', sIcon: '', decor: ['🌿', '🍃', '🐒', '🦜', '🍄', '🌴'] },
    { id: 'pantai', name: 'Liburan Pantai', ladderName: 'papan selancar', snakeName: 'ombak',
      kw: ['pantai', 'laut', 'beach', 'liburan', 'selancar', 'bali', 'pasir', 'pulau', 'summer', 'musim panas', 'kelapa'],
      c: { page: '#E3F6FA', a: '#F7E6B8', b: '#FFF5DA', num: '#7A5B2E', start: '#BDE7F0', finish: '#FF9F68', rail: '#E0703A', rung: '#FFD8B8', body: '#1F7EA8', pattern: '#8FD6EE', accent: '#0F8FB0' },
      lIcon: '🏄', sIcon: '🌊', decor: ['🐚', '🦀', '⛱️', '🌴', '🐠', '☀️'] },
    { id: 'angkasa', name: 'Petualangan Galaksi', ladderName: 'roket', snakeName: 'lubang cacing',
      kw: ['luar angkasa', 'angkasa', 'galaksi', 'space', 'planet', 'bintang', 'roket', 'astronot', 'alien', 'bulan', 'tata surya', 'ufo'],
      c: { page: '#0E1430', a: '#1E2752', b: '#182046', num: '#AEB8E0', start: '#2C8C6A', finish: '#F7C548', rail: '#5FD3F3', rung: '#141B3A', body: '#9B5DE5', pattern: '#D7B8FF', accent: '#5B6CFF' },
      lIcon: '🚀', sIcon: '🌀', decor: ['⭐', '🪐', '✨', '🌙', '☄️', '👽'] },
    { id: 'merdeka', name: 'Lomba 17 Agustus', ladderName: 'panjat pinang', snakeName: 'karung goni',
      kw: ['17 agustus', 'agustus', 'merdeka', 'kemerdekaan', 'agustusan', 'indonesia', 'merah putih', 'lomba', 'hut ri', 'panjat pinang'],
      c: { page: '#FFF1F0', a: '#FFFFFF', b: '#FFE1DE', num: '#9B1C1C', start: '#FFFFFF', finish: '#E53935', rail: '#B71C1C', rung: '#FFFFFF', body: '#B98A55', pattern: '#E6CBA3', accent: '#D32F2F' },
      lIcon: '🇮🇩', sIcon: '', decor: ['🇮🇩', '🎉', '🏃', '🍘', '🎈', '🏆'] },
    { id: 'pabrik', name: 'Pabrik Roda Gigi', ladderName: 'lift barang', snakeName: 'konveyor',
      kw: ['pabrik', 'industri', 'mesin', 'gear', 'roda gigi', 'factory', 'produksi', 'bengkel', 'manufaktur', 'asano'],
      c: { page: '#E9ECEF', a: '#CED4DA', b: '#E2E6EA', num: '#343A40', start: '#9AD1B5', finish: '#F4B400', rail: '#F4B400', rung: '#343A40', body: '#455A64', pattern: '#90A4AE', accent: '#E8590C' },
      lIcon: '⚙️', sIcon: '🦺', decor: ['⚙️', '🔩', '🔧', '🦺', '🏭', '⛑️'] },
    { id: 'sekolah', name: 'Hari Sekolah', ladderName: 'tangga juara', snakeName: 'PR menumpuk',
      kw: ['sekolah', 'belajar', 'kelas', 'guru', 'murid', 'school', 'buku', 'ujian', 'pelajaran'],
      c: { page: '#F1F6FF', a: '#DCE8FF', b: '#F7FAFF', num: '#2B4A7F', start: '#C8F0D6', finish: '#FFCF5C', rail: '#3D6FD8', rung: '#DCE8FF', body: '#E85D75', pattern: '#FFB3C1', accent: '#3D6FD8' },
      lIcon: '🎓', sIcon: '📚', decor: ['✏️', '📐', '📏', '🎒', '🍎', '📝'] },
    { id: 'permen', name: 'Negeri Permen', ladderName: 'tangga cokelat', snakeName: 'ular jeli',
      kw: ['permen', 'kue', 'manis', 'candy', 'cokelat', 'coklat', 'es krim', 'dessert', 'donat'],
      c: { page: '#FFF0F6', a: '#FFD6E8', b: '#FFF5FA', num: '#8E2C5A', start: '#C9F2E2', finish: '#FFC94D', rail: '#7B4A2E', rung: '#F7C59F', body: '#2EC4B6', pattern: '#B8F2EC', accent: '#E64980' },
      lIcon: '🍫', sIcon: '🍬', decor: ['🍭', '🧁', '🍩', '🍦', '🍰', '🎂'] },
    { id: 'salju', name: 'Negeri Salju', ladderName: 'tangga es', snakeName: 'seluncuran es',
      kw: ['salju', 'es', 'dingin', 'winter', 'musim dingin', 'kutub', 'snow', 'beku', 'penguin', 'frozen'],
      c: { page: '#EEF6FC', a: '#D6EAF8', b: '#F7FBFF', num: '#2C5577', start: '#CDEFE0', finish: '#9AD0F5', rail: '#5DADE2', rung: '#FFFFFF', body: '#7FB3D5', pattern: '#E8F4FC', accent: '#2E86C1' },
      lIcon: '⛄', sIcon: '❄️', decor: ['❄️', '⛄', '🐧', '🌨️', '🧣', '🏔️'] },
    { id: 'gurun', name: 'Gurun Pasir', ladderName: 'tangga piramida', snakeName: 'ular gurun',
      kw: ['gurun', 'padang pasir', 'mesir', 'piramida', 'desert', 'unta', 'arab', 'timur tengah', 'oasis'],
      c: { page: '#FBF0DC', a: '#F0D9A7', b: '#F9EACB', num: '#7A5520', start: '#B7E1C1', finish: '#E8A33D', rail: '#A0522D', rung: '#F0D9A7', body: '#C9A227', pattern: '#7A5B12', accent: '#C0711E' },
      lIcon: '🐫', sIcon: '🦂', decor: ['🌵', '🐫', '🏜️', '☀️', '🦎', '🏺'] },
    { id: 'lautdalam', name: 'Dasar Laut', ladderName: 'gelembung', snakeName: 'belut laut',
      kw: ['dasar laut', 'bawah laut', 'laut dalam', 'ikan', 'ocean', 'samudra', 'menyelam', 'diving', 'gurita', 'hiu', 'terumbu'],
      c: { page: '#0B3954', a: '#0F4C75', b: '#11577F', num: '#BFE3F2', start: '#2A9D8F', finish: '#FFD166', rail: '#7FDBFF', rung: '#0B3954', body: '#F4A261', pattern: '#FFE1C4', accent: '#00A6A6' },
      lIcon: '🫧', sIcon: '🐙', decor: ['🐠', '🐟', '🐡', '🦑', '🐚', '🪸'] },
    { id: 'sawah', name: 'Kebun & Sawah', ladderName: 'tangga bambu', snakeName: 'ular sawah',
      kw: ['sawah', 'desa', 'kampung', 'kebun', 'petani', 'tani', 'farm', 'pertanian', 'panen', 'padi', 'sapi', 'ayam'],
      c: { page: '#F3F8E6', a: '#D9EBA6', b: '#EEF6D2', num: '#4B5E1A', start: '#FFE59A', finish: '#F2A541', rail: '#9C7A3C', rung: '#E8D9A8', body: '#5D8C2D', pattern: '#C5E1A5', accent: '#558B2F' },
      lIcon: '🌾', sIcon: '🐍', decor: ['🌾', '🐄', '🐓', '🌽', '🚜', '🌻'] },
    { id: 'kota', name: 'Kota Malam', ladderName: 'eskalator', snakeName: 'perosotan',
      kw: ['kota', 'malam', 'city', 'jakarta', 'neon', 'gedung', 'urban', 'mall', 'jalan raya', 'macet'],
      c: { page: '#151726', a: '#262A45', b: '#1E2138', num: '#C3C8E8', start: '#2BB673', finish: '#FF4F9A', rail: '#00E5FF', rung: '#151726', body: '#FF4F9A', pattern: '#FFB3D4', accent: '#7C4DFF' },
      lIcon: '🏙️', sIcon: '🚕', decor: ['🌃', '🚕', '🏢', '🌆', '🚦', '💡'] },
    { id: 'horor', name: 'Rumah Hantu', ladderName: 'tangga tua', snakeName: 'ular hantu',
      kw: ['horor', 'hantu', 'seram', 'halloween', 'misteri', 'kuburan', 'pocong', 'kuntilanak', 'zombie', 'malam jumat'],
      c: { page: '#1B1423', a: '#2E2240', b: '#251B34', num: '#C8B6E2', start: '#3D8B5A', finish: '#FF8C1A', rail: '#8D6E63', rung: '#2E2240', body: '#6BCB77', pattern: '#1B1423', accent: '#FF8C1A' },
      lIcon: '🕯️', sIcon: '👻', decor: ['🎃', '🦇', '🕸️', '👻', '🌕', '🕯️'] },
    { id: 'lebaran', name: 'Hari Raya', ladderName: 'tangga berkah', snakeName: 'ular ketupat',
      kw: ['lebaran', 'idul fitri', 'ramadan', 'ramadhan', 'puasa', 'ketupat', 'mudik', 'hari raya', 'eid', 'takbiran'],
      c: { page: '#EFF7EE', a: '#CDE8C8', b: '#F4FAF2', num: '#1E5631', start: '#FFF1B8', finish: '#D4AF37', rail: '#1E5631', rung: '#D4AF37', body: '#C49A3A', pattern: '#F4E1A1', accent: '#1E7B45' },
      lIcon: '🌙', sIcon: '', decor: ['🌙', '⭐', '🕌', '🏮', '🎁', '✨'] },
    { id: 'natal', name: 'Natal Ceria', ladderName: 'tangga hadiah', snakeName: 'tongkat permen',
      kw: ['natal', 'christmas', 'xmas', 'santa', 'sinterklas', 'desember'],
      c: { page: '#FDF2F0', a: '#F6D5D0', b: '#FFF8F6', num: '#7B1E1E', start: '#CDEBD5', finish: '#E2B13C', rail: '#2E7D32', rung: '#F6D5D0', body: '#C62828', pattern: '#FFFFFF', accent: '#2E7D32' },
      lIcon: '🎄', sIcon: '🍭', decor: ['🎄', '🎁', '⭐', '🔔', '❄️', '🦌'] },
    { id: 'olahraga', name: 'Arena Olahraga', ladderName: 'podium', snakeName: 'kartu merah',
      kw: ['olahraga', 'sepak bola', 'bola', 'futsal', 'tenis meja', 'pingpong', 'badminton', 'sport', 'stadion', 'lari', 'basket', 'voli'],
      c: { page: '#EAF6EC', a: '#7CC67F', b: '#8FD392', num: '#14421A', start: '#FFFFFF', finish: '#FFD54F', rail: '#FFFFFF', rung: '#2E7D32', body: '#E53935', pattern: '#FFCDD2', accent: '#1565C0' },
      lIcon: '🏆', sIcon: '🟥', decor: ['⚽', '🏓', '🏸', '🏀', '🏐', '🥇'] }
  ];

  // ---- tema tambahan (ringkas): id, nama, tangga jadi, ular jadi, kata kunci,
  //      [page, a, b, num, start, finish, rail, rung, body, pattern, accent], ikon tangga, ikon ular, hiasan
  function mk(id, name, ln, sn, kw, w, li, si, dec) {
    var k = ['page', 'a', 'b', 'num', 'start', 'finish', 'rail', 'rung', 'body', 'pattern', 'accent'], c = {};
    k.forEach(function (x, i) { c[x] = w[i]; });
    return { id: id, name: name, ladderName: ln, snakeName: sn, kw: kw, c: c, lIcon: li, sIcon: si, decor: dec };
  }
  T.push(
    mk('kantor', 'Hari di Kantor', 'lift kantor', 'tumpukan berkas', ['kantor', 'office', 'meeting', 'rapat', 'karyawan', 'kerja', 'pekerjaan'], ['#EEF2F7', '#D6DEE9', '#F4F7FB', '#33415C', '#CDEFD9', '#FFC857', '#2B6CB0', '#2B6CB0', '#C0392B', '#F5B7B1', '#2B6CB0'], '📈', '📎', ['💼', '☕', '🖨️', '📊', '🗂️', '💻']),
    mk('safety', 'Safety First K3', 'tangga aman', 'bahaya terpeleset', ['safety', 'k3', 'keselamatan', 'apd', 'helm', 'kecelakaan', 'zero accident', 'keselamatan kerja'], ['#FFF8E1', '#FFE082', '#FFF3C4', '#5D4037', '#A5D6A7', '#43A047', '#2E7D32', '#2E7D32', '#212121', '#FFD600', '#F57F17'], '⛑️', '⚠️', ['⛑️', '🦺', '🧤', '🥽', '🚧', '🧯']),
    mk('mudik', 'Mudik Lebaran', 'jalan tol', 'macet panjang', ['mudik', 'pulang kampung', 'tol', 'kampung halaman', 'arus balik'], ['#F1F8E9', '#DCEDC8', '#F7FBF0', '#33691E', '#FFF59D', '#FFB74D', '#455A64', '#CFD8DC', '#E53935', '#FFCDD2', '#2E7D32'], '🚗', '🚧', ['🚌', '🚗', '🏡', '🛣️', '🎒', '🌄']),
    mk('kuliner', 'Kuliner Nusantara', 'tusuk sate', 'mi panjang', ['kuliner', 'makanan', 'makan', 'food', 'nasi goreng', 'sate', 'rendang', 'bakso', 'jajanan', 'masak'], ['#FFF6E9', '#FFE0B2', '#FFF3E0', '#6D4C41', '#C8E6C9', '#FF7043', '#8D6E63', '#8D6E63', '#E0A800', '#FFF59D', '#E64A19'], '🍢', '🍜', ['🍛', '🍢', '🥟', '🍤', '🌶️', '🥥']),
    mk('dino', 'Zaman Dinosaurus', 'leher dino', 'ekor T-Rex', ['dinosaurus', 'dino', 'purba', 'jurassic', 'fosil', 't rex', 'zaman batu'], ['#EEF3E2', '#CFE0B4', '#E6EFD3', '#3E4A26', '#FFE08A', '#E67E22', '#546E7A', '#546E7A', '#A0522D', '#E8C39E', '#558B2F'], '🦕', '🦖', ['🦴', '🌋', '🥚', '🌿', '🦕', '🦖']),
    mk('bajaklaut', 'Kapal Bajak Laut', 'tali layar', 'papan maut', ['bajak laut', 'pirate', 'kapal', 'harta karun', 'perompak', 'bajak'], ['#E8F1F5', '#D7C4A3', '#E8DCC4', '#4E342E', '#A5D6A7', '#FFD54F', '#5D4037', '#5D4037', '#263238', '#90A4AE', '#00838F'], '⚓', '🦈', ['💰', '🗺️', '⚓', '🦜', '💎', '🏝️']),
    mk('robot', 'Dunia Robot', 'lengan robot', 'kabel kusut', ['robot', 'teknologi', 'ai', 'komputer', 'futuristik', 'canggih', 'digital'], ['#E9F2F7', '#CFE3EE', '#EAF3F8', '#1F3B4D', '#B2F2BB', '#FFD43B', '#1C7ED6', '#1C7ED6', '#F76707', '#FFD8A8', '#1C7ED6'], '🤖', '🔌', ['🤖', '💡', '🔋', '🛰️', '⚙️', '💾']),
    mk('musik', 'Konser Musik', 'tangga nada', 'kabel mik', ['musik', 'konser', 'lagu', 'band', 'dangdut', 'karaoke', 'nyanyi', 'music'], ['#1E1B2E', '#2F2A48', '#262140', '#CFC8F0', '#20C997', '#FFD43B', '#F06595', '#F06595', '#4DABF7', '#D0EBFF', '#F06595'], '🎤', '🎧', ['🎵', '🎸', '🥁', '🎹', '🎶', '🎺']),
    mk('hujan', 'Musim Hujan', 'pelangi', 'banjir kecil', ['hujan', 'musim hujan', 'banjir', 'pelangi', 'payung', 'rain', 'gerimis'], ['#E7EEF6', '#CFDDEC', '#E9F0F8', '#2C4A6B', '#C3F0CA', '#FFD166', '#EF476F', '#EF476F', '#118AB2', '#A9DEF0', '#118AB2'], '🌈', '💧', ['☔', '🌧️', '🐸', '⛈️', '🌂', '🐌']),
    mk('bunga', 'Taman Bunga', 'batang bunga', 'ulat daun', ['bunga', 'taman', 'flower', 'garden', 'kupu kupu', 'musim semi', 'spring', 'mawar'], ['#FDF2F8', '#FBD3E9', '#FEEBF5', '#7A2950', '#C8F7C5', '#FFD43B', '#2B8A3E', '#2B8A3E', '#74B816', '#D8F5A2', '#D6336C'], '🌻', '🐛', ['🌸', '🌷', '🦋', '🐝', '🌼', '🌺']),
    mk('kotatua', 'Batavia Tempo Dulu', 'tangga menara', 'kereta kuda', ['sejarah', 'kota tua', 'batavia', 'museum', 'zaman dulu', 'jadul', 'retro', 'vintage'], ['#F4ECDD', '#E6D5B8', '#F2E7D3', '#5C4326', '#C9DDB0', '#C99A2E', '#6D4C41', '#6D4C41', '#2F4858', '#9FB3BF', '#8D5524'], '🏛️', '🐎', ['🏛️', '🚲', '📜', '🕰️', '🛺', '📻']),
    mk('gowes', 'Gowes Bareng', 'tanjakan', 'jalan berlubang', ['sepeda', 'gowes', 'bersepeda', 'cycling', 'bike', 'olahraga pagi', 'car free day'], ['#EEF7F1', '#CDEBD7', '#E8F5EC', '#1F5133', '#FFF3BF', '#FF922B', '#343A40', '#343A40', '#E8590C', '#FFD8A8', '#2F9E44'], '🚴', '🕳️', ['🚲', '🚴', '⛰️', '💨', '🧢', '🥤']),
    mk('kopi', 'Kedai Kopi', 'tangga barista', 'tumpahan kopi', ['kopi', 'coffee', 'cafe', 'kafe', 'nongkrong', 'ngopi', 'teh', 'warkop'], ['#F5EEE6', '#E3D0BC', '#F1E6DA', '#4B3621', '#CDE6C1', '#D4A373', '#2A9D8F', '#2A9D8F', '#3D2B1F', '#B08968', '#7F5539'], '☕', '🫖', ['☕', '🥐', '🍪', '🫘', '🧁', '🥛']),
    mk('gunung', 'Pendakian Gunung', 'jalur pendakian', 'longsoran', ['gunung', 'mendaki', 'hiking', 'camping', 'kemah', 'pramuka', 'alam terbuka', 'naik gunung'], ['#EAF2EF', '#C9DDD3', '#E3EEE8', '#234236', '#FFEC99', '#F08C00', '#8B5E34', '#8B5E34', '#5C677D', '#C5CCD9', '#2B8A3E'], '⛺', '🪨', ['⛰️', '🌲', '🏕️', '🔥', '🧭', '🦅']),
    mk('ninja', 'Dojo Ninja', 'tali ninja', 'jebakan', ['ninja', 'jepang', 'samurai', 'kungfu', 'silat', 'bela diri', 'karate', 'japan'], ['#F7F3EE', '#EADBC8', '#F5EDE2', '#3A2E2A', '#CDE9C5', '#E03131', '#343A40', '#343A40', '#C92A2A', '#FFC9C9', '#C92A2A'], '🥷', '🐉', ['🏯', '🎋', '⛩️', '🍙', '🥋', '🎐']),
    mk('superhero', 'Kota Pahlawan Super', 'lompatan super', 'jurus penjahat', ['superhero', 'pahlawan', 'hero', 'super', 'komik', 'pahlawan super'], ['#EEF3FF', '#D0DCFF', '#E8EEFF', '#1D2B6B', '#B2F2BB', '#FCC419', '#E03131', '#E03131', '#5F3DC4', '#D0BFFF', '#1C7ED6'], '🦸', '🦹', ['💥', '⚡', '🏙️', '🛡️', '⭐', '🦸']),
    mk('kereta', 'Petualangan Kereta', 'jembatan rel', 'terowongan', ['kereta', 'train', 'stasiun', 'krl', 'mrt', 'rel', 'kereta api', 'whoosh'], ['#F1F3F5', '#DEE2E6', '#F4F6F8', '#343A40', '#B2F2BB', '#FFD43B', '#495057', '#495057', '#E8590C', '#FFE8CC', '#1971C2'], '🚆', '🚇', ['🚂', '🚉', '🎫', '🛤️', '🚃', '⏰']),
    mk('pesawat', 'Terbang ke Langit', 'pesawat naik', 'turbulensi', ['pesawat', 'terbang', 'bandara', 'langit', 'awan', 'airplane', 'traveling', 'jalan jalan', 'liburan'], ['#EAF6FF', '#CFE8FF', '#EEF7FF', '#1B4F72', '#C3FAE8', '#FFD43B', '#F76707', '#F76707', '#495057', '#ADB5BD', '#1C7ED6'], '✈️', '🌪️', ['☁️', '✈️', '🛫', '🌤️', '🧳', '🎈']),
    mk('pasarmalam', 'Pasar Malam', 'bianglala', 'rollercoaster', ['pasar malam', 'karnaval', 'festival', 'taman hiburan', 'dufan', 'komidi putar', 'sirkus'], ['#241B35', '#3B2A57', '#31234A', '#E5DBFF', '#38D9A9', '#FFD43B', '#FFD43B', '#FFD43B', '#FF6B6B', '#FFE3E3', '#FF6B6B'], '🎡', '🎢', ['🎠', '🎪', '🍭', '🎆', '🎈', '🍿']),
    mk('imlek', 'Imlek Ceria', 'tangga naga', 'barongsai', ['imlek', 'tahun baru cina', 'chinese new year', 'angpao', 'barongsai', 'lampion', 'gong xi'], ['#FFF1EC', '#FFD6CC', '#FFE8E1', '#8B1A1A', '#FFE066', '#F59F00', '#C92A2A', '#C92A2A', '#E09F00', '#FFF3BF', '#C92A2A'], '🧧', '🐉', ['🏮', '🧧', '🍊', '🎆', '🐲', '🥟']),
    mk('batik', 'Nuansa Batik', 'tangga keraton', 'ular batik', ['batik', 'jawa', 'budaya', 'tradisional', 'keraton', 'wayang', 'nusantara', 'jogja', 'solo'], ['#F5EDE3', '#E3CBA8', '#EFDFC7', '#4A2C17', '#C5D8A4', '#B5651D', '#4A2C17', '#4A2C17', '#1D3557', '#C9A227', '#8C3B12'], '🎭', '', ['🪔', '🎭', '🥁', '🏯', '🌾', '🪘']),
    mk('bali', 'Pesona Bali', 'tangga pura', 'ombak Kuta', ['bali', 'pura', 'pulau dewata', 'liburan bali', 'sanur', 'ubud', 'kuta'], ['#FFF7E8', '#FFE3B3', '#FFF0D6', '#6B4423', '#B7E4C7', '#FF8C42', '#2D6A4F', '#2D6A4F', '#0077B6', '#90E0EF', '#E76F51'], '🌺', '🌊', ['🌺', '🌴', '🛕', '🥥', '🏄', '🌅']),
    mk('komodo', 'Pulau Komodo', 'tebing', 'komodo', ['komodo', 'nusa tenggara', 'labuan bajo', 'reptil', 'kadal', 'flores'], ['#EEF4EA', '#D6E5C8', '#EAF2E1', '#3B4A2A', '#FFE8A3', '#E9A23B', '#7A5C3A', '#7A5C3A', '#6B705C', '#CB997E', '#3A7D44'], '🏝️', '🦎', ['🦎', '🏝️', '⛰️', '🌊', '🐐', '☀️']),
    mk('fantasi', 'Kerajaan Fantasi', 'tangga istana', 'naga', ['kerajaan', 'istana', 'putri', 'pangeran', 'fantasi', 'dongeng', 'kastil', 'unicorn', 'peri', 'raja'], ['#F8F0FF', '#E9D8FD', '#F5EDFF', '#4C2A85', '#C3FAE8', '#FFD43B', '#F08C00', '#F08C00', '#2F9E44', '#B2F2BB', '#9C36B5'], '🏰', '🐉', ['👑', '🦄', '🧚', '🏰', '💎', '🌟']),
    mk('buah', 'Kebun Buah', 'pohon mangga', 'ulat buah', ['buah', 'kebun buah', 'mangga', 'durian', 'rambutan', 'pisang', 'fruit', 'semangka'], ['#FFFBEA', '#FFF0B3', '#FFF8D6', '#6B5300', '#C0EB75', '#FF922B', '#6D4C41', '#6D4C41', '#74B816', '#D8F5A2', '#F76707'], '🥭', '🐛', ['🍌', '🍍', '🥭', '🍉', '🍇', '🍓']),
    mk('kucing', 'Dunia Kucing', 'tiang garukan', 'gulungan benang', ['kucing', 'cat', 'meong', 'anabul', 'hewan peliharaan', 'pet', 'kitten'], ['#FFF4EC', '#FFE0CC', '#FFF0E5', '#6B3E26', '#D3F9D8', '#FFA94D', '#845EF7', '#845EF7', '#F06595', '#FFDEEB', '#E8590C'], '🐱', '🧶', ['🐾', '🐟', '🐈', '🥛', '🧶', '😺']),
    mk('anjing', 'Taman Anjing', 'tangga tulang', 'genangan lumpur', ['anjing', 'dog', 'guguk', 'puppy', 'doggy'], ['#F3F8FF', '#DBE9FF', '#EDF4FF', '#23395B', '#D3F9D8', '#FFC078', '#E8590C', '#E8590C', '#8B5E3C', '#D9B99B', '#1C7ED6'], '🐶', '🦴', ['🐕', '🦴', '🎾', '🐾', '🏡', '🌳']),
    mk('angka', 'Petualangan Angka', 'tangga perkalian', 'soal susah', ['matematika', 'angka', 'hitung', 'math', 'pintar', 'kuis', 'cerdas cermat', 'berhitung'], ['#F0F4FF', '#DCE4FF', '#F3F6FF', '#283593', '#C8F7DC', '#FFD43B', '#2F9E44', '#2F9E44', '#E8590C', '#FFD8A8', '#3B5BDB'], '➕', '➗', ['➕', '➖', '✖️', '➗', '🔢', '📐']),
    mk('sains', 'Laboratorium Sains', 'tangga penemuan', 'eksperimen gagal', ['sains', 'ilmu', 'laboratorium', 'kimia', 'fisika', 'eksperimen', 'science', 'ilmuwan', 'biologi'], ['#EDFBF7', '#C9F2E6', '#E6F9F3', '#0B4F3E', '#FFF3BF', '#FAB005', '#5F3DC4', '#5F3DC4', '#F03E3E', '#FFC9C9', '#0CA678'], '🔬', '🧪', ['⚗️', '🧬', '🔭', '🧲', '💡', '🧫']),
    mk('bioskop', 'Malam Nonton', 'tangga bioskop', 'gulungan film', ['film', 'bioskop', 'nonton', 'movie', 'cinema', 'sinema', 'drama'], ['#1A1A24', '#2B2B3A', '#232331', '#D6D6E7', '#2F9E44', '#FCC419', '#FCC419', '#FCC419', '#E03131', '#FFA8A8', '#E03131'], '🎬', '🎞️', ['🍿', '🎬', '🎥', '🎟️', '⭐', '🥤']),
    mk('game', 'Dunia Game', 'power up', 'game over', ['game', 'gaming', 'arcade', 'retro game', 'piksel', 'pixel', 'esports', 'main game', 'video game'], ['#0F1226', '#1F2547', '#181D3B', '#A5B4FC', '#22C55E', '#FACC15', '#22D3EE', '#22D3EE', '#F43F5E', '#FDA4AF', '#8B5CF6'], '🍄', '👾', ['👾', '🕹️', '🎮', '💎', '⭐', '🪙']),
    mk('bambu', 'Hutan Bambu', 'batang bambu', 'akar licin', ['panda', 'bambu', 'china', 'tiongkok', 'hutan bambu'], ['#F0F7EE', '#D3EACB', '#EBF5E7', '#2B4A23', '#FFF3BF', '#FFA94D', '#8F6B3A', '#8F6B3A', '#212529', '#ADB5BD', '#2B8A3E'], '🐼', '', ['🎋', '🐼', '🍃', '🏮', '🎍', '🌿']),
    mk('sungai', 'Petualangan Sungai', 'jembatan kayu', 'arus deras', ['sungai', 'rafting', 'arung jeram', 'danau', 'perahu', 'mancing', 'memancing', 'kolam'], ['#ECF7F7', '#C5E8E8', '#E5F4F4', '#134E4A', '#FFF3BF', '#FFA94D', '#8D6E63', '#8D6E63', '#1971C2', '#A5D8FF', '#0B7285'], '🛶', '🌊', ['🎣', '🐟', '🛶', '🦆', '🪨', '🌾']),
    mk('kasih', 'Hari Kasih Sayang', 'tangga cinta', 'patah hati', ['valentine', 'cinta', 'sayang', 'love', 'romantis', 'pacaran', 'anniversary', 'kasih sayang'], ['#FFF0F3', '#FFD6E0', '#FFEAF0', '#8C1D40', '#D3F9D8', '#FF4D6D', '#C9184A', '#C9184A', '#7B2CBF', '#E0AAFF', '#FF4D6D'], '💖', '💔', ['💕', '🌹', '💌', '🍫', '💘', '🧸']),
    mk('ultah', 'Pesta Ulang Tahun', 'tumpukan kado', 'pita kusut', ['ulang tahun', 'ultah', 'birthday', 'pesta', 'kado', 'hadiah', 'party'], ['#F3F0FF', '#E5DBFF', '#F3F0FF', '#4527A0', '#C3FAE8', '#FF922B', '#12B886', '#12B886', '#FF6B6B', '#FFE3E3', '#7950F2'], '🎁', '🎀', ['🎂', '🎈', '🎉', '🎁', '🕯️', '🥳']),
    mk('tahunbaru', 'Malam Tahun Baru', 'kembang api', 'terompet', ['tahun baru', 'new year', 'malam tahun baru', 'kembang api', 'pergantian tahun', 'countdown'], ['#0D1B2A', '#1B263B', '#142033', '#C9D6EA', '#2A9D8F', '#FFD60A', '#FFD60A', '#FFD60A', '#E63946', '#F1A7AE', '#4361EE'], '🎆', '🎺', ['🎆', '🎇', '🥂', '🕛', '✨', '🎉']),
    mk('pahlawan', 'Hari Pahlawan', 'tangga perjuangan', 'rintangan', ['hari pahlawan', 'pahlawan nasional', '10 november', 'perjuangan', 'bambu runcing', 'surabaya', 'veteran'], ['#FFF5F5', '#FFE3E3', '#FFF8F8', '#8B1A1A', '#FFFFFF', '#C92A2A', '#5C3D2E', '#5C3D2E', '#495057', '#CED4DA', '#C92A2A'], '🎖️', '', ['🇮🇩', '🎖️', '🕊️', '📜', '⭐', '🏳️']),
    mk('sehat', 'Hidup Sehat', 'tangga sehat', 'junk food', ['sehat', 'kesehatan', 'olahraga sehat', 'diet', 'gizi', 'sayur', 'dokter', 'rumah sakit', 'puskesmas'], ['#F0FBF4', '#D3F2DE', '#EBF9F0', '#1B5E3B', '#FFF3BF', '#51CF66', '#1C7ED6', '#1C7ED6', '#F59F00', '#FFE066', '#2F9E44'], '🥦', '🍟', ['🥗', '🍎', '💧', '🏃', '🥕', '❤️']),
    mk('surya', 'Energi Surya', 'panel surya', 'boros listrik', ['surya', 'solar', 'matahari', 'energi', 'listrik', 'hemat energi', 'panel surya', 'plts'], ['#FFFBEB', '#FEF3C7', '#FFFAEB', '#78350F', '#BBF7D0', '#F59E0B', '#1E3A8A', '#1E3A8A', '#6B7280', '#D1D5DB', '#D97706'], '☀️', '🔌', ['☀️', '🔋', '⚡', '🌞', '💡', '🌱']),
    mk('balap', 'Sirkuit Balap', 'jalur turbo', 'ban kempes', ['balap', 'mobil', 'racing', 'sirkuit', 'formula', 'motogp', 'otomotif', 'mobil listrik', 'motor'], ['#F1F3F5', '#CED4DA', '#E9ECEF', '#212529', '#FFFFFF', '#FFD43B', '#E03131', '#E03131', '#212529', '#FFFFFF', '#E03131'], '🏎️', '🛞', ['🏁', '🏎️', '🏍️', '⛽', '🏆', '🚥']),
    mk('gua', 'Gua Misteri', 'tangga tali', 'kelelawar', ['gua', 'goa', 'tambang', 'harta', 'misteri', 'bawah tanah', 'petualangan gua'], ['#2B2522', '#3E3530', '#352D29', '#E0D2C3', '#2F9E44', '#FFD43B', '#C08552', '#C08552', '#7D8597', '#CFD4DC', '#E8590C'], '🔦', '🦇', ['💎', '🦇', '🕯️', '⛏️', '🪨', '🗝️']),
    mk('kebunteh', 'Kebun Teh Puncak', 'jalan setapak', 'kabut', ['kebun teh', 'puncak', 'bogor', 'bandung', 'pegunungan', 'sejuk', 'villa', 'lembang'], ['#EEF6EC', '#CFE5C6', '#E8F2E4', '#2D4A22', '#FFF3BF', '#FFA94D', '#7C4A2D', '#7C4A2D', '#868E96', '#DEE2E6', '#2B8A3E'], '🍵', '🌫️', ['🍵', '🌿', '⛰️', '🏡', '🌄', '🍓'])
  );

  function norm(s) { return String(s || '').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim(); }

  // Cocokkan teks bebas ke tema bawaan. Kembalikan {theme, exact}
  function matchTheme(text) {
    var q = norm(text);
    if (!q) return { theme: T[0], exact: true };
    var best = null, bestScore = 0;
    T.forEach(function (t) {
      var score = 0;
      if (norm(t.name) === q || t.id === q) score += 100;
      t.kw.forEach(function (k) {
        var nk = norm(k);
        if (q === nk) score += 50;
        else if ((' ' + q + ' ').indexOf(' ' + nk + ' ') >= 0) score += 20 + nk.length;
        else if (nk.length >= 4 && q.indexOf(nk) >= 0) score += 10;
        else if (q.length >= 4 && nk.indexOf(q) >= 0) score += 8;
      });
      if (score > bestScore) { bestScore = score; best = t; }
    });
    if (best) return { theme: best, exact: true };
    // tidak ketemu: pilih tema berdasarkan "hash" teks agar konsisten, beri nama sesuai ketikan
    var h = 0; for (var i = 0; i < q.length; i++) h = (h * 31 + q.charCodeAt(i)) >>> 0;
    var pick = T[1 + (h % (T.length - 1))];
    var t2 = JSON.parse(JSON.stringify(pick));
    t2.id = 'custom'; t2.name = 'Tema ' + titleCase(text.trim()).slice(0, 30);
    return { theme: t2, exact: false };
  }
  function titleCase(s) { return s.replace(/\S+/g, function (w) { return w.charAt(0).toUpperCase() + w.slice(1).toLowerCase(); }); }

  // ---------- Susunan papan ----------
  var LAYOUTS = {
    klasik: { ladders: [[4, 25], [13, 46], [42, 63], [50, 69], [62, 81], [74, 92]], snakes: [[27, 5], [40, 3], [54, 31], [66, 45], [89, 53], [99, 41], [95, 76]] },
    santai: { ladders: [[2, 38], [7, 14], [8, 31], [15, 26], [21, 42], [28, 84], [36, 44], [51, 67], [71, 91], [78, 98], [87, 94]], snakes: [[16, 6], [46, 25], [49, 11], [62, 19], [74, 53], [92, 88], [95, 75]] },
    tegang: { ladders: [[3, 22], [11, 30], [33, 52], [59, 78], [70, 89]], snakes: [[17, 4], [25, 6], [38, 19], [47, 26], [55, 34], [64, 42], [76, 57], [83, 61], [91, 73], [97, 81], [99, 80]] }
  };
  function row(n) { return Math.floor((n - 1) / 10); }
  function xy(n) { var r = row(n), c = (n - 1) % 10; if (r % 2) c = 9 - c; return [c, 9 - r]; }
  function cross(s, o) {
    function ccw(A, B, C) { return (C[1] - A[1]) * (B[0] - A[0]) - (B[1] - A[1]) * (C[0] - A[0]); }
    var d1 = ccw(o[0], o[1], s[0]), d2 = ccw(o[0], o[1], s[1]), d3 = ccw(s[0], s[1], o[0]), d4 = ccw(s[0], s[1], o[1]);
    return ((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) && ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0));
  }

  // Acak tapi adil: titik tidak dobel, tidak di 1/100, beda baris, panjang wajar, total naik-turun seimbang
  function randomLayout(seed) {
    var rnd = mulberry(seed || (Date.now() & 0xffffffff));
    for (var attempt = 0; attempt < 400; attempt++) {
      var used = {}; used[1] = used[100] = true;
      var ladders = [], snakes = [], ok = true, segs = [];
      var nL = 6 + Math.floor(rnd() * 2), nS = 7 + Math.floor(rnd() * 2);
      function pickPair(isLadder) {
        for (var k = 0; k < 300; k++) {
          var a, b, len = 9 + Math.floor(rnd() * 24);
          if (isLadder) { a = 2 + Math.floor(rnd() * 88); b = a + len; if (b > 98) continue; }
          else { a = 12 + Math.floor(rnd() * 87); if (a > 98) continue; b = a - len; if (b < 2) continue; }
          var dr = Math.abs(row(a) - row(b));
          if (used[a] || used[b] || dr < 1 || dr > 3) continue;
          var s = [xy(a), xy(b)];
          // jangan menyilang dengan tangga/ular lain (kalau masih bisa dicari)
          if (k < 240 && segs.some(function (o) { return cross(s, o); })) continue;
          used[a] = used[b] = true; segs.push(s);
          return [a, b];
        }
        return null;
      }
      for (var i = 0; i < nL && ok; i++) { var p = pickPair(true); if (!p) ok = false; else ladders.push(p); }
      for (var j = 0; j < nS && ok; j++) { var s = pickPair(false); if (!s) ok = false; else snakes.push(s); }
      if (!ok) continue;
      var up = ladders.reduce(function (t, x) { return t + x[1] - x[0]; }, 0);
      var down = snakes.reduce(function (t, x) { return t + x[0] - x[1]; }, 0);
      if (Math.abs(up - down) > 45) continue;
      // minimal satu ular di baris 8-9 dan satu tangga di baris 0-2 biar seru
      if (!snakes.some(function (x) { return x[0] > 80; })) continue;
      if (!ladders.some(function (x) { return x[0] < 30; })) continue;
      return { ladders: ladders, snakes: snakes };
    }
    return JSON.parse(JSON.stringify(LAYOUTS.klasik));
  }
  function mulberry(a) { return function () { a |= 0; a = a + 0x6D2B79F5 | 0; var t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }

  function makeLayout(type, seed) {
    if (type === 'acak') return randomLayout(seed);
    return JSON.parse(JSON.stringify(LAYOUTS[type] || LAYOUTS.klasik));
  }

  // Validasi tema dari AI / data luar
  var HEX = /^#[0-9a-fA-F]{6}$/;
  function sanitizeTheme(raw) {
    var base = T[0];
    var t = { id: 'ai', name: 'Tema AI', ladderName: 'tangga', snakeName: 'ular', c: {}, lIcon: '', sIcon: '', decor: [] };
    if (!raw || typeof raw !== 'object') return JSON.parse(JSON.stringify(base));
    function str(v, max, d) { v = (typeof v === 'string' ? v : '').replace(/[<>]/g, '').trim(); return v ? v.slice(0, max) : d; }
    t.id = str(raw.id, 20, 'ai');
    t.name = str(raw.name, 40, 'Tema AI');
    t.ladderName = str(raw.ladderName, 24, 'tangga');
    t.snakeName = str(raw.snakeName, 24, 'ular');
    var c = raw.c || raw.colors || {};
    Object.keys(base.c).forEach(function (k) { t.c[k] = HEX.test(c[k]) ? c[k] : base.c[k]; });
    t.lIcon = str(raw.lIcon || raw.ladderIcon, 8, '');
    t.sIcon = str(raw.sIcon || raw.snakeIcon, 8, '');
    t.decor = (Array.isArray(raw.decor) ? raw.decor : []).slice(0, 6).map(function (d) { return str(d, 8, ''); }).filter(Boolean);
    return t;
  }

  window.UT_THEMES = { list: T, matchTheme: matchTheme, makeLayout: makeLayout, sanitizeTheme: sanitizeTheme, mulberry: mulberry };
})();
