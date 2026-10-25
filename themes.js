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
      kw: ['pabrik', 'industri', 'mesin', 'gear', 'roda gigi', 'factory', 'produksi', 'kerja', 'kantor', 'safety', 'k3', 'robot', 'bengkel'],
      c: { page: '#E9ECEF', a: '#CED4DA', b: '#E2E6EA', num: '#343A40', start: '#9AD1B5', finish: '#F4B400', rail: '#F4B400', rung: '#343A40', body: '#455A64', pattern: '#90A4AE', accent: '#E8590C' },
      lIcon: '⚙️', sIcon: '🦺', decor: ['⚙️', '🔩', '🔧', '🦺', '🏭', '⛑️'] },
    { id: 'sekolah', name: 'Hari Sekolah', ladderName: 'tangga juara', snakeName: 'PR menumpuk',
      kw: ['sekolah', 'belajar', 'kelas', 'guru', 'murid', 'school', 'buku', 'ujian', 'pelajaran'],
      c: { page: '#F1F6FF', a: '#DCE8FF', b: '#F7FAFF', num: '#2B4A7F', start: '#C8F0D6', finish: '#FFCF5C', rail: '#3D6FD8', rung: '#DCE8FF', body: '#E85D75', pattern: '#FFB3C1', accent: '#3D6FD8' },
      lIcon: '🎓', sIcon: '📚', decor: ['✏️', '📐', '📏', '🎒', '🍎', '📝'] },
    { id: 'permen', name: 'Negeri Permen', ladderName: 'tangga cokelat', snakeName: 'ular jeli',
      kw: ['permen', 'kue', 'manis', 'candy', 'cokelat', 'coklat', 'es krim', 'dessert', 'donat', 'ulang tahun', 'ultah', 'pesta'],
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
      kw: ['natal', 'christmas', 'xmas', 'santa', 'sinterklas', 'desember', 'tahun baru', 'new year', 'liburan akhir tahun'],
      c: { page: '#FDF2F0', a: '#F6D5D0', b: '#FFF8F6', num: '#7B1E1E', start: '#CDEBD5', finish: '#E2B13C', rail: '#2E7D32', rung: '#F6D5D0', body: '#C62828', pattern: '#FFFFFF', accent: '#2E7D32' },
      lIcon: '🎄', sIcon: '🍭', decor: ['🎄', '🎁', '⭐', '🔔', '❄️', '🦌'] },
    { id: 'olahraga', name: 'Arena Olahraga', ladderName: 'podium', snakeName: 'kartu merah',
      kw: ['olahraga', 'sepak bola', 'bola', 'futsal', 'tenis meja', 'pingpong', 'badminton', 'sport', 'stadion', 'lari', 'basket', 'voli'],
      c: { page: '#EAF6EC', a: '#7CC67F', b: '#8FD392', num: '#14421A', start: '#FFFFFF', finish: '#FFD54F', rail: '#FFFFFF', rung: '#2E7D32', body: '#E53935', pattern: '#FFCDD2', accent: '#1565C0' },
      lIcon: '🏆', sIcon: '🟥', decor: ['⚽', '🏓', '🏸', '🏀', '🏐', '🥇'] }
  ];

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
