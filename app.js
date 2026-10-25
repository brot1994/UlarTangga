// =====================================================================
//  ULAR TANGGA — versi web (HP, tablet, fold, iPhone)
// =====================================================================
(function () {
  'use strict';
  var CFG = window.UT_CONFIG, TH = window.UT_THEMES;
  var COLORS = ['#E04A3F', '#2F6FD6', '#1F9D55', '#E8B21E', '#8A4FD1', '#F07F2A'];
  var app = document.getElementById('app');

  // ---------- util ----------
  function $(s, el) { return (el || document).querySelector(s); }
  function $$(s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function sleep(ms) { return new Promise(function (r) { setTimeout(r, ms); }); }
  var LS = {
    get: function (k, d) { try { var v = localStorage.getItem('ut_' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set: function (k, v) { try { localStorage.setItem('ut_' + k, JSON.stringify(v)); } catch (e) { } },
    del: function (k) { try { localStorage.removeItem('ut_' + k); } catch (e) { } }
  };
  function rand6() { try { var a = new Uint32Array(1); crypto.getRandomValues(a); return 1 + (a[0] % 6); } catch (e) { return 1 + Math.floor(Math.random() * 6); } }
  var toastT;
  function toast(msg, ms) { var t = $('#toast'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('on'); }, ms || 2600); }

  var I = {
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>',
    menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
    gear: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>',
    chat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>',
    mic: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg>',
    send: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12l16-8-6 16-2-7z"/></svg>',
    stop: '<svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2" fill="#fff"/></svg>',
    play: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4l13 8-13 8z" fill="#fff"/></svg>',
    pause: '<svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="5" width="4" height="14" fill="#fff"/><rect x="14" y="5" width="4" height="14" fill="#fff"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    min: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M5 19h14"/></svg>',
    max: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"/></svg>',
    spark: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F7C548" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/></svg>',
    ladder: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F8A5B" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M7 21V3M17 21V3M7 8h10M7 14h10"/></svg>',
    palette: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.8 1.6-1.6 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-.9.7-1.6 1.6-1.6H16a5 5 0 0 0 5-5c0-4-4-7.4-9-7.4z"/><circle cx="7.5" cy="11" r="1.2" fill="currentColor"/><circle cx="10.5" cy="7" r="1.2" fill="currentColor"/><circle cx="15.5" cy="7.5" r="1.2" fill="currentColor"/></svg>',
    gem: '<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2c.6 5.4 4.6 9.4 10 10-5.4.6-9.4 4.6-10 10-.6-5.4-4.6-9.4-10-10 5.4-.6 9.4-4.6 10-10z" fill="currentColor"/></svg>',
    info: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2F6FD6" stroke-width="2.3" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'
  };

  // ---------- identitas & pengaturan ----------
  var me = LS.get('me', null);
  if (!me) { me = { uid: 'u' + Math.random().toString(36).slice(2, 10), name: '', photo: '' }; LS.set('me', me); }
  function saveMe() { LS.set('me', me); }
  var S = {
    mode: LS.get('mode', 'bot'),
    count: LS.get('count', 2),
    names: LS.get('names', []),
    theme: TH.sanitizeTheme(LS.get('theme', TH.list[0])),
    themeText: LS.get('themeText', ''),
    layoutType: LS.get('layoutType', 'klasik'),
    seed: LS.get('seed', 12345),
    rules: LS.get('rules', { six: true, exact: false }),
    sound: LS.get('sound', true)
  };
  function saveS() { ['mode', 'count', 'names', 'theme', 'themeText', 'layoutType', 'seed', 'rules', 'sound'].forEach(function (k) { LS.set(k, S[k]); }); }

  // ---------- suara ----------
  var AC = null;
  function beep(freq, dur, type, vol, when, endFreq) {
    if (!S.sound) return;
    try {
      AC = AC || new (window.AudioContext || window.webkitAudioContext)();
      if (AC.state === 'suspended') AC.resume();
      var t = AC.currentTime + (when || 0), o = AC.createOscillator(), g = AC.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
      if (endFreq) o.frequency.exponentialRampToValueAtTime(endFreq, t + dur);
      g.gain.setValueAtTime(vol || 0.12, t); g.gain.exponentialRampToValueAtTime(0.001, t + dur);
      o.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + dur + 0.03);
    } catch (e) { }
  }
  var SFX = {
    step: function () { beep(640, 0.05, 'triangle', 0.07); },
    dice: function () { for (var i = 0; i < 6; i++) beep(220 + Math.random() * 380, 0.04, 'square', 0.035, i * 0.08); },
    ladder: function () { [523, 659, 784, 1047].forEach(function (f, i) { beep(f, 0.13, 'triangle', 0.12, i * 0.09); }); },
    snake: function () { beep(760, 0.7, 'sawtooth', 0.06, 0, 130); },
    win: function () { [523, 659, 784, 1047, 784, 1047].forEach(function (f, i) { beep(f, 0.2, 'triangle', 0.14, i * 0.15); }); },
    ping: function () { beep(880, 0.09, 'sine', 0.09); beep(1320, 0.12, 'sine', 0.07, 0.08); }
  };
  function buzz(p) { try { if (navigator.vibrate) navigator.vibrate(p); } catch (e) { } }

  // ---------- tema (warna halaman) ----------
  function lum(hex) { var n = parseInt(hex.slice(1), 16), r = (n >> 16) / 255, g = (n >> 8 & 255) / 255, b = (n & 255) / 255; return 0.299 * r + 0.587 * g + 0.114 * b; }
  function shade(hex, f) { var n = parseInt(hex.slice(1), 16); var r = Math.round((n >> 16) * f), g = Math.round((n >> 8 & 255) * f), b = Math.round((n & 255) * f); return '#' + [r, g, b].map(function (x) { return Math.max(0, Math.min(255, x)).toString(16).padStart(2, '0'); }).join(''); }
  function applyTheme(t) {
    var c = t.c, dark = lum(c.page) < 0.45, st = document.documentElement.style;
    st.setProperty('--page', c.page); st.setProperty('--ink', dark ? '#F4F6FB' : '#23304A');
    st.setProperty('--accent', c.accent); st.setProperty('--accent-dark', shade(c.accent, 0.7));
    document.body.classList.toggle('dark', dark);
    var m = $('meta[name=theme-color]'); if (m) m.setAttribute('content', c.page);
  }

  // ---------- papan (SVG) ----------
  function cellXY(n) { if (n < 1) n = 1; var r = Math.floor((n - 1) / 10), col = (n - 1) % 10; if (r % 2) col = 9 - col; return [col * 100 + 50, (9 - r) * 100 + 50]; }
  function boardSVG(theme, layout, opt) {
    opt = opt || {};
    var c = theme.c, h = [], used = {};
    layout.ladders.concat(layout.snakes).forEach(function (p) { used[p[0]] = used[p[1]] = 1; });
    h.push('<svg class="' + (opt.cls || 'board-svg') + '" viewBox="0 0 1000 1000" role="img" aria-label="Papan ' + esc(theme.name) + ' dengan ' + layout.ladders.length + ' ' + esc(theme.ladderName) + ' dan ' + layout.snakes.length + ' ' + esc(theme.snakeName) + '">');
    for (var n = 1; n <= 100; n++) {
      var xy = cellXY(n), x = xy[0] - 50, y = xy[1] - 50, r = Math.floor((n - 1) / 10), col = (n - 1) % 10;
      var fill = (r + col) % 2 ? c.b : c.a; if (n === 1) fill = c.start; if (n === 100) fill = c.finish;
      h.push('<rect x="' + x + '" y="' + y + '" width="100" height="100" fill="' + fill + '"/>');
      h.push('<text x="' + (x + 8) + '" y="' + (y + 26) + '" font-size="24" font-weight="800" font-family="Nunito,sans-serif" fill="' + (n === 100 || n === 1 ? '#23304A' : c.num) + '">' + n + '</text>');
    }
    // dekorasi
    var dec = theme.decor || [];
    if (dec.length) {
      var rnd = TH.mulberry(theme.name.length * 977 + 13), cnt = 0, tries = 0;
      while (cnt < 9 && tries < 200) {
        tries++; var k = 2 + Math.floor(rnd() * 98); if (used[k]) continue; used[k] = 2; cnt++;
        var p = cellXY(k);
        h.push('<text x="' + p[0] + '" y="' + (p[1] + 22) + '" font-size="46" text-anchor="middle" opacity=".38">' + esc(dec[cnt % dec.length]) + '</text>');
      }
    }
    // tangga
    layout.ladders.forEach(function (L) {
      var a = cellXY(L[0]), b = cellXY(L[1]), dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), ux = dx / len, uy = dy / len, nx = -uy * 17, ny = ux * 17;
      var ax = a[0] - ux * 18, ay = a[1] - uy * 18, bx = b[0] + ux * 6, by = b[1] + uy * 6;
      h.push('<g stroke-linecap="round">');
      [[1, 'rgba(0,0,0,.22)', 15, 4], [0, c.rail, 10, 0]].forEach(function (s) {
        var o = s[3];
        h.push('<line x1="' + (ax + nx + o) + '" y1="' + (ay + ny + o) + '" x2="' + (bx + nx + o) + '" y2="' + (by + ny + o) + '" stroke="' + s[1] + '" stroke-width="' + s[2] + '"/>');
        h.push('<line x1="' + (ax - nx + o) + '" y1="' + (ay - ny + o) + '" x2="' + (bx - nx + o) + '" y2="' + (by - ny + o) + '" stroke="' + s[1] + '" stroke-width="' + s[2] + '"/>');
      });
      var steps = Math.max(2, Math.floor(len / 42));
      for (var i = 1; i < steps; i++) { var t = i / steps, px = ax + (bx - ax) * t, py = ay + (by - ay) * t; h.push('<line x1="' + (px + nx) + '" y1="' + (py + ny) + '" x2="' + (px - nx) + '" y2="' + (py - ny) + '" stroke="' + c.rail + '" stroke-width="7"/>'); }
      h.push('</g>');
      if (theme.lIcon) h.push('<text x="' + (b[0] + 26) + '" y="' + (b[1] - 12) + '" font-size="40" text-anchor="middle">' + esc(theme.lIcon) + '</text>');
    });
    // ular
    layout.snakes.forEach(function (Sn) {
      var a = cellXY(Sn[0]), b = cellXY(Sn[1]), dx = b[0] - a[0], dy = b[1] - a[1], len = Math.hypot(dx, dy), nx = -dy / len, ny = dx / len, off = Math.min(110, len * 0.32);
      var c1x = a[0] + dx * 0.33 + nx * off, c1y = a[1] + dy * 0.33 + ny * off, c2x = a[0] + dx * 0.66 - nx * off, c2y = a[1] + dy * 0.66 - ny * off;
      var d = 'M' + a[0] + ' ' + a[1] + ' C ' + c1x + ' ' + c1y + ', ' + c2x + ' ' + c2y + ', ' + b[0] + ' ' + b[1];
      h.push('<g fill="none" stroke-linecap="round"><path d="' + d + '" stroke="rgba(0,0,0,.25)" stroke-width="34" transform="translate(3 4)"/><path d="' + d + '" stroke="' + c.body + '" stroke-width="28"/><path d="' + d + '" stroke="' + c.pattern + '" stroke-width="9" stroke-dasharray="5 22"/></g>');
      var ang = Math.atan2(a[1] - c1y, a[0] - c1x) * 180 / Math.PI;
      if (theme.sIcon) {
        h.push('<circle cx="' + a[0] + '" cy="' + a[1] + '" r="30" fill="' + c.body + '"/><text x="' + a[0] + '" y="' + (a[1] + 16) + '" font-size="44" text-anchor="middle">' + esc(theme.sIcon) + '</text>');
      } else {
        h.push('<g transform="translate(' + a[0] + ' ' + a[1] + ') rotate(' + ang + ')"><path d="M24 0 l18 -5 M24 0 l18 5" stroke="#D62828" stroke-width="4" stroke-linecap="round"/><ellipse rx="30" ry="24" fill="' + c.body + '"/><circle cx="10" cy="-10" r="7" fill="#fff"/><circle cx="10" cy="10" r="7" fill="#fff"/><circle cx="12" cy="-10" r="3.5" fill="#111"/><circle cx="12" cy="10" r="3.5" fill="#111"/></g>');
      }
    });
    if (!opt.noTokens) h.push('<g id="tokens"></g>');
    h.push('</svg>');
    return h.join('');
  }
  function themeThumb(theme) {
    var c = theme.c, h = ['<svg viewBox="0 0 64 64" aria-hidden="true">'];
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) h.push('<rect x="' + j * 16 + '" y="' + i * 16 + '" width="16" height="16" fill="' + ((i + j) % 2 ? c.b : c.a) + '"/>');
    h.push('<line x1="14" y1="54" x2="26" y2="18" stroke="' + c.rail + '" stroke-width="5" stroke-linecap="round"/><path d="M50 12 C 30 24, 54 38, 36 54" stroke="' + c.body + '" stroke-width="6" fill="none" stroke-linecap="round"/>');
    if (theme.lIcon) h.push('<text x="46" y="60" font-size="16">' + esc(theme.lIcon) + '</text>');
    h.push('</svg>'); return h.join('');
  }
  function diceSVG(n) {
    var P = { 1: [[32, 32]], 2: [[18, 18], [46, 46]], 3: [[18, 18], [32, 32], [46, 46]], 4: [[18, 18], [46, 18], [18, 46], [46, 46]], 5: [[18, 18], [46, 18], [32, 32], [18, 46], [46, 46]], 6: [[18, 16], [46, 16], [18, 32], [46, 32], [18, 48], [46, 48]] }[n || 1];
    return '<svg viewBox="0 0 64 64" role="img" aria-label="Dadu ' + (n || 1) + '"><rect x="2" y="2" width="60" height="60" rx="12" fill="#fff" stroke="#23304A" stroke-width="3"/>' + P.map(function (p, i) { return '<circle cx="' + p[0] + '" cy="' + p[1] + '" r="6" fill="' + (n === 1 || (n === 5 && i === 0) ? '#E04A3F' : '#23304A') + '"/>'; }).join('') + '</svg>';
  }

  // ---------- logika permainan ----------
  function currentLayout() { return TH.makeLayout(S.layoutType, S.seed); }
  function newGame(players, theme, layout, rules) {
    return {
      seq: 0, started: Date.now() + Math.floor(Math.random() * 1000), theme: theme, layout: layout, rules: rules,
      players: players.map(function (p, i) { return { id: p.id || ('p' + i), uid: p.uid || 'local', name: p.name, color: COLORS[i], bot: !!p.bot, photo: p.photo || '', pos: 0 }; }),
      turn: 0, move: null, winner: null
    };
  }
  function jumpMap(layout) { var m = {}; layout.ladders.forEach(function (x) { m[x[0]] = { to: x[1], via: 'ladder' }; }); layout.snakes.forEach(function (x) { m[x[0]] = { to: x[1], via: 'snake' }; }); return m; }
  function applyRoll(g, roll) {
    var ng = clone(g), p = ng.players[ng.turn], from = p.pos, t = from + roll, bounced = false, stay = false;
    if (t > 100) { if (ng.rules && ng.rules.exact) { t = from; stay = true; } else { t = 200 - t; bounced = true; } }
    var j = stay ? null : jumpMap(ng.layout)[t], to = j ? j.to : t;
    p.pos = to; ng.seq = (g.seq || 0) + 1;
    ng.move = { seq: ng.seq, pid: p.id, from: from, roll: roll, mid: t, to: to, via: j ? j.via : '', bounced: bounced, stay: stay };
    if (to === 100) ng.winner = p.id;
    else if (!(roll === 6 && ng.rules && ng.rules.six)) ng.turn = (ng.turn + 1) % ng.players.length;
    return ng;
  }
  function skipTurn(g) {
    var ng = clone(g), p = ng.players[ng.turn]; ng.seq = (g.seq || 0) + 1;
    ng.move = { seq: ng.seq, pid: p.id, skip: true, roll: 0, from: p.pos, mid: p.pos, to: p.pos };
    ng.turn = (ng.turn + 1) % ng.players.length; return ng;
  }
  function pById(g, id) { for (var i = 0; i < g.players.length; i++) if (g.players[i].id === id) return g.players[i]; return null; }
  function moveText(g, m) {
    var p = pById(g, m.pid), n = p ? p.name : '?', th = g.theme;
    if (m.skip) return n + ' dilewati.';
    if (m.theme) return 'Tema diganti jadi ' + th.name + '. Giliran ' + g.players[g.turn].name + '.';
    var s = n + ' dapat ' + m.roll + '.';
    if (m.stay) s += ' Harus pas di 100, tetap di ' + m.from + '.';
    else if (m.via === 'ladder') s = n + ' dapat ' + m.roll + ', naik ' + th.ladderName + ' ' + m.mid + ' → ' + m.to + '!';
    else if (m.via === 'snake') s = n + ' dapat ' + m.roll + ', kena ' + th.snakeName + ' ' + m.mid + ' → ' + m.to + '.';
    else if (m.bounced) s += ' Kelewatan, mantul ke ' + m.to + '.';
    else s += ' Maju ke ' + m.to + '.';
    if (m.roll === 6 && g.rules && g.rules.six && !g.winner && !m.skip) s += ' Dapat 6, main lagi!';
    return s;
  }

  // ---------- state layar permainan ----------
  var G = { game: null, mode: 'bot', disp: {}, queue: [], busy: false, shownSeq: -1, isHost: false, chatOpen: false, unread: 0, video: null, botSeq: -1, rolling: false, winShown: 0, msg: '' };

  // =====================================================================
  //  FIREBASE (REST + streaming), data di /ulartangga
  // =====================================================================
  var DBU = (CFG.FIREBASE_DB_URL || '').replace(/\/$/, ''), ROOT = CFG.DB_ROOT || 'ulartangga';
  function dbUrl(p) { return DBU + '/' + ROOT + '/' + p + '.json'; }
  function db(path, method, body) {
    var o = { method: method || 'GET', cache: 'no-store' };
    if (body !== undefined) { o.headers = { 'Content-Type': 'application/json' }; o.body = JSON.stringify(body); }
    return fetch(dbUrl(path), o).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); });
  }
  var TS = { '.sv': 'timestamp' };
  var R = { code: null, data: null, es: null, chatKeys: {} };
  function stopListen() { if (R.es) { R.es.close(); R.es = null; } }
  function listenRoom(code) {
    stopListen(); R.code = code; R.data = null; R.chatKeys = {};
    var es = new EventSource(dbUrl('rooms/' + code));
    R.es = es;
    function on(patch) { return function (e) { var d; try { d = JSON.parse(e.data); } catch (x) { return; } if (!d) return; applyPath(d.path, d.data, patch); onRoom(); }; }
    es.addEventListener('put', on(false)); es.addEventListener('patch', on(true));
    es.addEventListener('cancel', function () { toast('Koneksi room ditolak server'); });
    es.onerror = function () { setConn(false); };
    es.onopen = function () { setConn(true); };
  }
  function applyPath(path, data, patch) {
    var seg = path.split('/').filter(Boolean);
    if (!seg.length) {
      if (patch) { R.data = R.data || {}; Object.keys(data || {}).forEach(function (k) { if (data[k] === null) delete R.data[k]; else R.data[k] = data[k]; }); }
      else R.data = data;
      return;
    }
    if (!R.data || typeof R.data !== 'object') R.data = {};
    var node = R.data;
    for (var i = 0; i < seg.length - 1; i++) { if (!node[seg[i]] || typeof node[seg[i]] !== 'object') node[seg[i]] = {}; node = node[seg[i]]; }
    var last = seg[seg.length - 1];
    if (patch) {
      var t = (node[last] && typeof node[last] === 'object') ? node[last] : {};
      Object.keys(data || {}).forEach(function (k) { if (data[k] === null) delete t[k]; else t[k] = data[k]; });
      node[last] = t;
    } else if (data === null) delete node[last]; else node[last] = data;
  }
  var connOk = true;
  function setConn(ok) { if (ok === connOk) return; connOk = ok; if (!ok) toast('Koneksi terputus, mencoba lagi…'); else toast('Tersambung lagi'); }

  function roomPlayers(d) {
    var ps = d && d.players ? d.players : {};
    return Object.keys(ps).map(function (k) { var p = ps[k]; return { id: k, uid: p.bot ? k : k, name: p.name || 'Pemain', photo: p.photo || '', bot: !!p.bot, joined: p.joined || 0 }; })
      .sort(function (a, b) { return a.joined - b.joined; });
  }
  function onRoom() {
    var d = R.data;
    if (!d) { if (current === 'lobby' || current === 'game') { toast('Room sudah ditutup'); leaveRoom(true); } return; }
    G.isHost = d.host === me.uid;
    if (d.status === 'play' && d.game) {
      if (current !== 'game') { G.mode = 'online'; showGame(d.game); }
      else receiveGame(d.game);
    } else if (current === 'lobby') renderLobby();
    else if (current === 'game' && d.status === 'lobby') { showLobby(); }
    if (current === 'game') renderChatNew();
  }

  // =====================================================================
  //  NAVIGASI LAYAR
  // =====================================================================
  var current = '';
  function go(name) { current = name; window.scrollTo(0, 0); }

  // ---------- BERANDA ----------
  function showHome() {
    go('home'); applyTheme(S.theme); stopListen(); G.mode = S.mode;
    var q = new URLSearchParams(location.search).get('room') || '';
    var local = LS.get('local', null), lastRoom = LS.get('room', null);
    var modes = [['satu', 'Satu HP', 'Gantian di 1 HP'], ['bot', 'Lawan Bot', 'Main sendiri'], ['online', 'Online', 'HP masing-masing']];
    var lt = [['klasik', 'Klasik', 'Seimbang'], ['santai', 'Santai', 'Banyak tangga'], ['tegang', 'Tegang', 'Banyak ular'], ['acak', 'Acak', 'Tetap adil']];
    var h = '<div class="screen">';
    h += '<div class="row" style="justify-content:flex-end;margin-bottom:-14px"><button class="icon-btn" id="btnSet" aria-label="Pengaturan">' + I.gear + '</button></div>';
    h += '<div class="logo"><svg width="64" height="64" viewBox="0 0 64 64" aria-hidden="true"><rect x="4" y="4" width="56" height="56" rx="14" fill="#1F8A5B"/><rect x="18" y="10" width="5" height="44" rx="2" fill="#FFE7A8"/><rect x="41" y="10" width="5" height="44" rx="2" fill="#FFE7A8"/><rect x="20" y="18" width="24" height="4" fill="#FFE7A8"/><rect x="20" y="30" width="24" height="4" fill="#FFE7A8"/><rect x="20" y="42" width="24" height="4" fill="#FFE7A8"/><path d="M50 14 C 30 22, 46 36, 24 46 S 12 56, 14 58" stroke="#E04A3F" stroke-width="6" fill="none" stroke-linecap="round"/><circle cx="50" cy="14" r="5" fill="#E04A3F"/></svg><h1>Ular Tangga</h1><p>Main sendiri atau bareng sampai 6 orang</p></div>';
    if (local && local.game && !local.game.winner) h += '<button class="btn dark" id="btnResume">Lanjutkan permainan tadi</button>';
    if (lastRoom && !q) h += '<button class="btn dark" id="btnBackRoom">Kembali ke Room ' + esc(lastRoom) + '</button>';
    // nama
    h += '<div style="display:flex;flex-direction:column;gap:8px"><label class="label" for="myName">Namamu</label><div class="row">';
    if (me.photo) h += '<span class="dot" style="background-image:url(' + esc(me.photo) + ')"></span>';
    h += '<input class="input grow" id="myName" maxlength="16" placeholder="Ketik nama" value="' + esc(me.name) + '">';
    if (CFG.FIREBASE_WEB) h += me.google ? '<button class="btn small ghost" id="btnLogout" style="height:48px">Keluar</button>' : '<button class="btn small white" id="btnGoogle" style="height:48px;border:2px solid var(--line)">Login Google</button>';
    h += '</div></div>';
    // mode
    h += '<div style="display:flex;flex-direction:column;gap:8px"><span class="label">Mode main</span><div class="seg" style="grid-template-columns:repeat(3,minmax(0,1fr))">';
    modes.forEach(function (m) { h += '<button type="button" data-mode="' + m[0] + '" class="' + (S.mode === m[0] ? 'on' : '') + '"><b>' + m[1] + '</b><span>' + m[2] + '</span></button>'; });
    h += '</div></div>';
    // jumlah
    h += '<div style="display:flex;flex-direction:column;gap:8px"><span class="label">' + (S.mode === 'online' ? 'Kursi maksimal' : 'Jumlah pemain') + '</span><div class="seg count" style="grid-template-columns:repeat(6,minmax(0,1fr))">';
    for (var n = 1; n <= 6; n++) h += '<button type="button" data-count="' + n + '" aria-label="' + n + ' pemain" class="' + (S.count === n ? 'on' : '') + '"' + (S.mode === 'online' && n === 1 ? ' disabled' : '') + '>' + n + '</button>';
    h += '</div></div>';
    if (S.mode !== 'online') { h += '<div class="plist" id="plist"></div>'; }
    // tema + susunan
    h += '<div style="display:flex;flex-direction:column;gap:8px"><span class="label">Tema papan</span><button class="theme-card" id="btnTheme">' + themeThumb(S.theme) + '<div class="grow"><b>' + esc(S.theme.name) + '</b><span>Tangga = ' + esc(S.theme.ladderName) + ', ular = ' + esc(S.theme.snakeName) + '. Ketuk untuk ganti tema hari ini</span></div></button></div>';
    h += '<div style="display:flex;flex-direction:column;gap:8px"><span class="label">Susunan ular &amp; tangga</span><div class="seg" style="grid-template-columns:repeat(4,minmax(0,1fr))">';
    lt.forEach(function (l) { h += '<button type="button" data-lt="' + l[0] + '" class="' + (S.layoutType === l[0] ? 'on' : '') + '" style="min-height:56px"><b style="font-size:13px">' + l[1] + '</b><span style="font-size:10px">' + l[2] + '</span></button>'; });
    h += '</div></div>';
    h += '<div class="card" style="display:flex;flex-direction:column;gap:6px"><label class="row" style="min-height:36px"><input type="checkbox" id="rSix" style="width:22px;height:22px;accent-color:var(--accent)"' + (S.rules.six ? ' checked' : '') + '> <span>Dapat 6 = main lagi</span></label><label class="row" style="min-height:36px"><input type="checkbox" id="rExact" style="width:22px;height:22px;accent-color:var(--accent)"' + (S.rules.exact ? ' checked' : '') + '> <span>Harus pas di 100 (kalau tidak, mantul balik)</span></label></div>';
    h += '<button class="btn" id="btnStart">' + (S.mode === 'online' ? 'Buat Room' : 'Mulai Main') + '</button>';
    // gabung
    h += '<div class="card" style="display:flex;flex-direction:column;gap:8px"><label class="label" for="joinCode" style="color:#5A6478">Gabung room teman</label><div class="row"><input class="input grow" id="joinCode" inputmode="numeric" maxlength="4" placeholder="Kode 4 angka" value="' + esc(q) + '"><button class="btn small dark" id="btnJoin" style="height:48px">Gabung</button></div></div>';
    h += '</div>';
    app.innerHTML = h;
    renderPlist();

    $('#myName').oninput = function (e) { me.name = e.target.value.trim(); saveMe(); renderPlist(); };
    $('#btnSet').onclick = showSettings;
    $$('[data-mode]').forEach(function (b) { b.onclick = function () { S.mode = b.dataset.mode; if (S.mode === 'online' && S.count < 2) S.count = 4; saveS(); showHome(); }; });
    $$('[data-count]').forEach(function (b) { b.onclick = function () { S.count = +b.dataset.count; saveS(); $$('[data-count]').forEach(function (x) { x.classList.toggle('on', x === b); }); renderPlist(); }; });
    $$('[data-lt]').forEach(function (b) { b.onclick = function () { S.layoutType = b.dataset.lt; if (S.layoutType === 'acak') S.seed = Date.now() & 0x7fffffff; saveS(); $$('[data-lt]').forEach(function (x) { x.classList.toggle('on', x === b); }); }; });
    $('#rSix').onchange = function (e) { S.rules.six = e.target.checked; saveS(); };
    $('#rExact').onchange = function (e) { S.rules.exact = e.target.checked; saveS(); };
    $('#btnTheme').onclick = function () { showTheme(function () { showHome(); }); };
    $('#btnStart').onclick = startFromHome;
    $('#btnJoin').onclick = function () { joinRoom($('#joinCode').value.trim()); };
    var g = $('#btnGoogle'); if (g) g.onclick = googleLogin;
    var lo = $('#btnLogout'); if (lo) lo.onclick = googleLogout;
    var rs = $('#btnResume'); if (rs) rs.onclick = function () { G.mode = local.mode; showGame(local.game); };
    var br = $('#btnBackRoom'); if (br) br.onclick = function () { joinRoom(lastRoom, true); };
    if (q && me.name) { setTimeout(function () { joinRoom(q); }, 50); }
    else if (q) { toast('Ketik namamu, lalu tekan Gabung'); $('#myName').focus(); }
  }
  function renderPlist() {
    var el = $('#plist'); if (!el) return;
    var h = '';
    for (var i = 0; i < S.count; i++) {
      var isBot = S.mode === 'bot' && i > 0;
      var nm = i === 0 ? (me.name || 'Pemain 1') : (isBot ? 'Bot ' + i : (S.names[i] || 'Pemain ' + (i + 1)));
      h += '<div class="prow"><span class="dot" style="background:' + COLORS[i] + '"></span>';
      if (S.mode === 'satu' && i > 0) h += '<label class="sr" for="pn' + i + '">Nama pemain ' + (i + 1) + '</label><input id="pn' + i + '" data-i="' + i + '" maxlength="16" value="' + esc(S.names[i] || '') + '" placeholder="Pemain ' + (i + 1) + '">';
      else h += '<span class="grow" style="font-weight:800">' + esc(nm) + '</span>';
      h += '<span class="chip ' + (isBot ? 'gray' : '') + '">' + (isBot ? 'Bot' : 'Manusia') + '</span></div>';
    }
    if (S.mode === 'bot' && S.count === 1) h += '<div class="sys" style="background:var(--card)">Main sendirian: coba sampai 100 dengan kocokan sesedikit mungkin</div>';
    el.innerHTML = h;
    $$('input[data-i]', el).forEach(function (inp) { inp.oninput = function () { S.names[+inp.dataset.i] = inp.value.trim(); saveS(); }; });
  }
  function needName() { if (!me.name) { toast('Isi namamu dulu ya'); var n = $('#myName'); if (n) n.focus(); return true; } return false; }

  function startFromHome() {
    if (needName()) return;
    if (S.mode === 'online') { createRoom(); return; }
    var ps = [];
    for (var i = 0; i < S.count; i++) {
      if (i === 0) ps.push({ id: 'p0', name: me.name, photo: me.photo });
      else if (S.mode === 'bot') ps.push({ id: 'p' + i, name: 'Bot ' + i, bot: true });
      else ps.push({ id: 'p' + i, name: S.names[i] || 'Pemain ' + (i + 1) });
    }
    G.mode = S.mode;
    var g = newGame(ps, S.theme, currentLayout(), clone(S.rules));
    LS.set('local', { mode: S.mode, game: g });
    showGame(g);
  }

  // ---------- PILIH TEMA ----------
  function showTheme(done) {
    go('theme');
    var prev = clone(S.theme), prevText = S.themeText;
    function draw() {
      applyTheme(S.theme);
      var h = '<div class="screen">';
      h += '<div class="row"><button class="icon-btn" id="tBack" aria-label="Kembali">' + I.back + '</button><h1 style="font-size:26px">Tema Hari Ini</h1></div>';
      h += '<div style="display:flex;flex-direction:column;gap:6px"><label class="label" for="tText">Mau tema apa hari ini?</label><input class="input" id="tText" maxlength="60" placeholder="mis. pantai, luar angkasa, 17 Agustus…" value="' + esc(S.themeText) + '"><div class="row"><button class="btn small dark grow" id="tFind">Cari di tema bawaan</button><button class="btn small dark grow" id="tAI">' + I.spark + ' Buat pakai AI</button></div></div>';
      h += '<div style="display:flex;gap:6px;flex-wrap:wrap">';
      TH.list.forEach(function (t) { h += '<button class="pill" data-tid="' + t.id + '">' + esc(t.name) + '</button>'; });
      h += '</div>';
      h += '<div class="card" style="display:flex;flex-direction:column;align-items:center;gap:8px"><div class="row" style="width:100%;justify-content:space-between"><b style="font-family:var(--display);font-size:19px">' + esc(S.theme.name) + '</b><span style="font-size:12px;color:#4A5468;font-weight:700">Pratinjau</span></div>';
      h += '<div style="width:min(100%,340px);aspect-ratio:1">' + boardSVG(S.theme, currentLayout(), { noTokens: true }) + '</div>';
      h += '<span style="font-size:13px;color:#4A5468;text-align:center;margin-top:10px">Tangga jadi <b>' + esc(S.theme.ladderName) + '</b>, ular jadi <b>' + esc(S.theme.snakeName) + '</b></span>';
      if (S.layoutType === 'acak') h += '<button class="btn small ghost" id="tReroll" style="color:#23304A">Acak susunan lagi</button>';
      h += '</div><button class="btn" id="tUse">Pakai Papan Ini</button></div>';
      app.innerHTML = h;
      $('#tBack').onclick = function () { S.theme = prev; S.themeText = prevText; saveS(); done(); };
      $('#tUse').onclick = function () { saveS(); done(true); };
      $('#tFind').onclick = function () { var v = $('#tText').value.trim(); S.themeText = v; var m = TH.matchTheme(v); S.theme = clone(m.theme); if (!m.exact) toast('Tidak ada yang persis, dipilihkan tema yang mirip'); draw(); };
      $('#tAI').onclick = function () { var v = $('#tText').value.trim(); if (!v) { toast('Tulis temanya dulu'); return; } S.themeText = v; aiTheme(v, this, function (t) { S.theme = t; draw(); }); };
      $$('[data-tid]').forEach(function (b) { b.onclick = function () { var t = TH.list.filter(function (x) { return x.id === b.dataset.tid; })[0]; S.theme = clone(t); S.themeText = t.name; draw(); }; });
      var rr = $('#tReroll'); if (rr) rr.onclick = function () { S.seed = Date.now() & 0x7fffffff; draw(); };
      $('#tText').onkeydown = function (e) { if (e.key === 'Enter') $('#tFind').click(); };
    }
    draw();
  }

  var GBASE = 'https://generativelanguage.googleapis.com/v1beta/';
  function gFetch(path, key, body) {
    var o = { method: body ? 'POST' : 'GET', headers: { 'x-goog-api-key': key } };
    if (body) { o.headers['Content-Type'] = 'application/json'; o.body = JSON.stringify(body); }
    var ac = window.AbortController ? new AbortController() : null; if (ac) { o.signal = ac.signal; setTimeout(function () { ac.abort(); }, 35000); }
    return fetch(GBASE + path, o).catch(function (e) { throw new Error(e && e.name === 'AbortError' ? 'Gemini terlalu lama menjawab' : 'tidak bisa terhubung ke Gemini'); }).then(function (r) { return r.json().then(function (j) { if (!r.ok) { var e = new Error((j.error && j.error.message) || ('HTTP ' + r.status)); e.status = r.status; throw e; } return j; }); });
  }
  // cari model Flash terbaru yang tersedia untuk key ini
  function discoverModel(key) {
    return gFetch('models?pageSize=200', key).then(function (j) {
      var list = (j.models || []).filter(function (m) {
        var n = (m.name || '').toLowerCase();
        return (m.supportedGenerationMethods || []).indexOf('generateContent') >= 0 && n.indexOf('flash') >= 0 &&
          !/image|tts|audio|live|embed|thinking|exp/.test(n);
      }).map(function (m) {
        var n = m.name.replace(/^models\//, ''), v = parseFloat((n.match(/gemini-(\d+(?:\.\d+)?)/) || [0, 0])[1]) || 0;
        var score = v * 100 + (/lite/.test(n) ? -30 : 0) + (/preview/.test(n) ? -10 : 0) + (/latest/.test(n) ? 5 : 0);
        return { n: n, s: score };
      }).sort(function (a, b) { return b.s - a.s; });
      if (!list.length) throw new Error('tidak ada model Gemini Flash yang tersedia untuk key ini');
      LS.set('geminiAutoModel', list[0].n); return list[0].n;
    });
  }
  function geminiRequest(prompt, asJson) {
    var key = LS.get('gemini', '');
    if (!key) return Promise.reject(new Error('API key Gemini belum diisi'));
    var manual = LS.get('geminiModel', ''), model = manual || LS.get('geminiAutoModel', '') || CFG.GEMINI_MODEL;
    var gc = { temperature: asJson ? 0.9 : 0.8 }; if (asJson) gc.responseMimeType = 'application/json';
    var body = { contents: [{ role: 'user', parts: [{ text: prompt }] }], generationConfig: gc };
    function run(mdl) {
      return gFetch('models/' + encodeURIComponent(mdl) + ':generateContent', key, body).then(function (j) {
        var c = j.candidates && j.candidates[0];
        if (!c || !c.content || !c.content.parts) throw new Error(j.promptFeedback && j.promptFeedback.blockReason ? 'ditolak filter Gemini' : 'jawaban kosong');
        return c.content.parts.filter(function (p) { return !p.thought; }).map(function (p) { return p.text || ''; }).join('').trim();
      });
    }
    return run(model).catch(function (e) {
      var gone = e.status === 404 || /no longer available|not found|not supported|deprecated|update your code/i.test(e.message);
      if (manual || !gone) throw e;
      LS.del('geminiAutoModel');
      return discoverModel(key).then(function (m2) { if (m2 === model) throw e; return run(m2); });
    });
  }
  function aiThemeRaw(text) {
    var prompt = 'Kamu desainer papan permainan ular tangga anak-anak dan keluarga. Buat tema papan untuk: "' + String(text).slice(0, 80) + '".\n' +
      'Balas HANYA JSON dengan bentuk:\n{"name":"nama papan (maks 30 huruf, bahasa Indonesia)","ladderName":"tangga diganti jadi benda apa (maks 20 huruf)","snakeName":"ular diganti jadi apa (maks 20 huruf)",' +
      '"c":{"page":"#hex latar halaman","a":"#hex kotak papan 1","b":"#hex kotak papan 2","num":"#hex angka di kotak (kontras dengan a dan b)","start":"#hex kotak 1","finish":"#hex kotak 100","rail":"#hex tangga (kontras dengan a dan b)","rung":"#hex","body":"#hex badan ular (kontras dengan a, b, dan rail)","pattern":"#hex corak ular","accent":"#hex tombol utama (teks putih harus terbaca)"},' +
      '"lIcon":"1 emoji di ujung atas tangga","sIcon":"1 emoji kepala ular atau kosong","decor":["4-6 emoji hiasan"]}\n' +
      'Warna a dan b mirip tapi beda sedikit. Semua warna format #RRGGBB.';
    return geminiRequest(prompt, true).then(function (txt) {
      txt = txt.replace(/^```(json)?/i, '').replace(/```$/, '').trim();
      var t = TH.sanitizeTheme(JSON.parse(txt)); t.id = 'ai'; return t;
    });
  }
  function aiTheme(text, btn, cb) {
    if (!LS.get('gemini', '')) { toast('Isi API key Gemini dulu di Pengaturan'); showSettings(); return; }
    var old = btn.innerHTML; btn.disabled = true; btn.textContent = 'AI sedang membuat…';
    aiThemeRaw(text).then(function (t) { toast('Tema AI siap: ' + t.name); cb(t); })
      .catch(function (e) { btn.disabled = false; btn.innerHTML = old; toast('AI gagal: ' + String(e.message || e).slice(0, 90), 4500); });
  }

  // ---------- PENGATURAN ----------
  function showSettings() {
    var m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = '<div class="sheet" role="dialog" aria-label="Pengaturan"><div class="row" style="justify-content:space-between"><h2 style="font-size:24px">Pengaturan</h2><button class="icon-btn" id="sClose" aria-label="Tutup">' + I.close + '</button></div>' +
      '<label class="row card" style="min-height:52px"><input type="checkbox" id="sSound" style="width:22px;height:22px"' + (S.sound ? ' checked' : '') + '> <span>Suara efek</span></label>' +
      '<div class="card" style="display:flex;flex-direction:column;gap:8px"><b>Tema pakai AI (Gemini)</b><span style="font-size:13px;color:#4A5468">Buat API key gratis di <a href="https://aistudio.google.com/apikey" target="_blank" rel="noopener">aistudio.google.com/apikey</a> (login akun Google), lalu tempel di sini. Key hanya disimpan di HP ini.</span>' +
      '<label class="sr" for="sKey">API key Gemini</label><input class="input" id="sKey" type="password" autocomplete="off" placeholder="Tempel API key" value="' + esc(LS.get('gemini', '')) + '">' +
      '<button class="btn small dark" id="sTest" type="button">Tes key</button><span id="sTestRes" style="font-size:13px;font-weight:700"></span>' +
      '<label style="font-size:13px;font-weight:700" for="sModel">Model (biarkan kosong: game memilih model Flash terbaru otomatis)</label><input class="input" id="sModel" placeholder="' + esc(CFG.GEMINI_MODEL) + '" value="' + esc(LS.get('geminiModel', '')) + '"></div>' +
      '<button class="btn" id="sSave">Simpan</button><span style="font-size:11px;color:var(--muted);text-align:center">Versi game: 20261025c</span></div>';
    document.body.appendChild(m);
    function close() { m.remove(); }
    $('#sClose', m).onclick = close; m.onclick = function (e) { if (e.target === m) close(); };
    $('#sTest', m).onclick = function () {
      var res = $('#sTestRes', m), oldK = LS.get('gemini', ''), oldM = LS.get('geminiModel', '');
      LS.set('gemini', $('#sKey', m).value.trim()); LS.set('geminiModel', $('#sModel', m).value.trim());
      res.style.color = '#4A5468'; res.textContent = 'Mengetes…';
      geminiRequest('Balas dengan satu kata saja: siap', false)
        .then(function (t) { res.style.color = '#1F8A5B'; res.textContent = 'Berhasil! Model: ' + (LS.get('geminiModel', '') || LS.get('geminiAutoModel', '') || CFG.GEMINI_MODEL) + '. Jawaban: ' + t.slice(0, 30); })
        .catch(function (e) { res.style.color = '#C62828'; res.textContent = 'Gagal: ' + String(e.message || e).slice(0, 140); })
        .then(function () { LS.set('gemini', oldK); LS.set('geminiModel', oldM); });
    };
    $('#sSave', m).onclick = function () { S.sound = $('#sSound', m).checked; saveS(); LS.set('gemini', $('#sKey', m).value.trim()); LS.set('geminiModel', $('#sModel', m).value.trim()); toast('Tersimpan'); close(); };
  }

  // ---------- LOGIN GOOGLE (opsional) ----------
  var fbAuthP = null;
  function loadScript(src) { return new Promise(function (res, rej) { var s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s); }); }
  function fbAuth() {
    if (!fbAuthP) fbAuthP = loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js').then(function () { return loadScript('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js'); })
      .then(function () { if (!firebase.apps.length) firebase.initializeApp(CFG.FIREBASE_WEB); return firebase.auth(); });
    return fbAuthP;
  }
  function googleLogin() {
    fbAuth().then(function (auth) { return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()); })
      .then(function (res) { var u = res.user; me.uid = 'g' + u.uid.slice(0, 20); me.name = (u.displayName || me.name || '').split(' ')[0].slice(0, 16); me.photo = u.photoURL || ''; me.google = true; saveMe(); toast('Halo, ' + me.name + '!'); showHome(); })
      .catch(function (e) { toast('Login gagal: ' + String(e.message || e).slice(0, 80), 4000); });
  }
  function googleLogout() { fbAuth().then(function (a) { return a.signOut(); }).catch(function () { }); me.google = false; me.photo = ''; me.uid = 'u' + Math.random().toString(36).slice(2, 10); saveMe(); showHome(); }

  // =====================================================================
  //  ROOM ONLINE
  // =====================================================================
  function cleanupOld() {
    db('index').then(function (idx) {
      if (!idx) return; var now = Date.now();
      Object.keys(idx).forEach(function (code) { if (now - idx[code] > 36 * 3600 * 1000) { db('rooms/' + code, 'DELETE').catch(function () { }); db('index/' + code, 'DELETE').catch(function () { }); } });
    }).catch(function () { });
  }
  function createRoom() {
    var btn = $('#btnStart'); if (btn) { btn.disabled = true; btn.textContent = 'Membuat room…'; }
    cleanupOld();
    var tries = 0;
    function attempt() {
      var code = String(1000 + Math.floor(Math.random() * 9000));
      return db('rooms/' + code + '/host').then(function (ex) {
        if (ex != null && tries++ < 8) return attempt();
        var pl = {}; pl[me.uid] = { name: me.name, photo: me.photo || '', joined: TS };
        return db('rooms/' + code, 'PUT', { created: TS, host: me.uid, status: 'lobby', max: S.count, settings: { theme: S.theme, layoutType: S.layoutType, seed: S.seed, rules: S.rules }, players: pl })
          .then(function () { return db('index/' + code, 'PUT', TS); }).then(function () { return code; });
      });
    }
    attempt().then(function (code) { openRoom(code); })
      .catch(function (e) { toast('Gagal membuat room: ' + e.message, 4000); if (btn) { btn.disabled = false; btn.textContent = 'Buat Room'; } });
  }
  function joinRoom(code, resume) {
    if (!/^\d{4}$/.test(code)) { toast('Kode room 4 angka'); return; }
    if (needName()) return;
    db('rooms/' + code).then(function (d) {
      if (!d) { toast('Room ' + code + ' tidak ditemukan'); LS.del('room'); if (resume) showHome(); return; }
      var ps = d.players || {}, inRoom = !!ps[me.uid];
      if (!inRoom && d.status === 'play') { toast('Permainan sudah mulai, kamu ikut menonton'); openRoom(code); return; }
      if (!inRoom && Object.keys(ps).length >= (d.max || 6)) { toast('Room penuh'); return; }
      var upd = inRoom ? { name: me.name, photo: me.photo || '' } : { name: me.name, photo: me.photo || '', joined: TS };
      return db('rooms/' + code + '/players/' + me.uid, 'PATCH', upd).then(function () { openRoom(code); });
    }).catch(function (e) { toast('Gagal gabung: ' + e.message, 4000); });
  }
  function openRoom(code) {
    LS.set('room', code); G.mode = 'online';
    try { history.replaceState(null, '', location.pathname + '?room=' + code); } catch (e) { }
    listenRoom(code); showLobby();
  }
  function leaveRoom(silent) {
    var code = R.code; stopListen();
    if (code && R.data && R.data.status === 'lobby' && R.data.players && R.data.players[me.uid]) db('rooms/' + code + '/players/' + me.uid, 'DELETE').catch(function () { });
    R.code = null; R.data = null; LS.del('room'); G.video = null; G.game = null;
    try { history.replaceState(null, '', location.pathname); } catch (e) { }
    showHome();
  }
  function shareLink() { return location.origin + location.pathname + '?room=' + R.code; }

  function showLobby() { go('lobby'); renderLobby(); }
  function renderLobby() {
    var d = R.data;
    var h = '<div class="screen"><div class="row"><button class="icon-btn" id="lBack" aria-label="Keluar dari room">' + I.back + '</button><h1 style="font-size:26px">Room Online</h1></div>';
    if (!d) { app.innerHTML = h + '<div class="card">Menyambung ke room ' + esc(R.code) + '…</div></div>'; $('#lBack').onclick = function () { leaveRoom(); }; return; }
    var st = d.settings || {}, theme = TH.sanitizeTheme(st.theme || TH.list[0]); applyTheme(theme);
    var ps = roomPlayers(d), max = d.max || 6;
    h += '<div style="background:#23304A;color:#fff;border-radius:20px;padding:18px;display:flex;flex-direction:column;align-items:center;gap:6px"><span style="font-size:13px;font-weight:700;color:#C9D1E3">Kode room — bagikan ke teman</span><span style="font-family:var(--display);font-weight:800;font-size:52px;letter-spacing:.08em;line-height:1.1">' + esc(R.code) + '</span>' +
      '<div class="row"><button class="btn small white" id="lCopy">Salin link</button><a class="btn small" style="display:inline-flex;align-items:center;text-decoration:none;background:#1F9D55" target="_blank" rel="noopener" href="https://wa.me/?text=' + encodeURIComponent('Ayo main Ular Tangga! Kode room ' + R.code + ': ' + shareLink()) + '">Kirim ke WA</a></div></div>';
    h += '<button class="theme-card" id="lTheme"' + (G.isHost ? '' : ' disabled style="opacity:1"') + '>' + themeThumb(theme) + '<div class="grow"><b>' + esc(theme.name) + '</b><span>' + ({ klasik: 'Susunan klasik', santai: 'Santai, banyak tangga', tegang: 'Tegang, banyak ular', acak: 'Acak tapi adil' }[st.layoutType] || '') + (G.isHost ? ' · ketuk untuk ganti' : '') + '</span></div></button>';
    h += '<div class="row" style="justify-content:space-between"><span class="label">Pemain di room</span><b>' + ps.length + ' / ' + max + '</b></div><div class="plist">';
    ps.forEach(function (p, i) {
      h += '<div class="prow"><span class="dot" style="background:' + COLORS[i] + (p.photo ? ';background-image:url(' + esc(p.photo) + ')' : '') + '"></span><span class="grow" style="font-weight:800">' + esc(p.name) + (p.id === me.uid ? ' (kamu)' : '') + '</span>';
      h += p.id === d.host ? '<span class="chip gold">Tuan rumah</span>' : (p.bot ? '<span class="chip gray">Bot</span>' : '<span class="chip">Siap</span>');
      if (G.isHost && p.id !== me.uid) h += '<button class="icon-btn" style="width:36px;height:36px" data-kick="' + esc(p.id) + '" aria-label="Keluarkan ' + esc(p.name) + '">' + I.close + '</button>';
      h += '</div>';
    });
    if (ps.length < max) h += '<div class="sys" style="background:transparent;border:2px dashed var(--line);border-radius:14px;padding:12px;color:var(--muted)">Menunggu pemain lain…</div>';
    h += '</div>';
    if (G.isHost) {
      if (ps.length < max) h += '<button class="btn ghost" id="lBot">+ Isi kursi kosong dengan Bot</button>';
      h += '<button class="btn" id="lStart"' + (ps.length < 1 ? ' disabled' : '') + '>Mulai Main</button>';
    } else h += '<div class="card" style="text-align:center;font-weight:700">Menunggu tuan rumah memulai…</div>';
    h += '</div>';
    app.innerHTML = h;
    $('#lBack').onclick = function () { leaveRoom(); };
    $('#lCopy').onclick = function () { copyText(shareLink()); };
    $$('[data-kick]').forEach(function (b) { b.onclick = function () { db('rooms/' + R.code + '/players/' + b.dataset.kick, 'DELETE').catch(function () { }); }; });
    var lb = $('#lBot'); if (lb) lb.onclick = function () { var n = ps.filter(function (p) { return p.bot; }).length + 1; db('rooms/' + R.code + '/players/bot' + Date.now().toString(36), 'PUT', { name: 'Bot ' + n, bot: true, joined: TS }).catch(function (e) { toast(e.message); }); };
    var ls = $('#lStart'); if (ls) ls.onclick = hostStart;
    var lt = $('#lTheme'); if (lt && G.isHost) lt.onclick = function () {
      S.theme = theme; S.layoutType = st.layoutType || 'klasik'; S.seed = st.seed || S.seed;
      showTheme(function (used) { if (used) db('rooms/' + R.code + '/settings', 'PATCH', { theme: S.theme, seed: S.seed }).catch(function () { }); showLobby(); });
    };
  }
  function copyText(t) {
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(t).then(function () { toast('Link disalin'); }, function () { prompt('Salin link ini:', t); });
    else prompt('Salin link ini:', t);
  }
  function hostStart() {
    var d = R.data, st = d.settings || {};
    var ps = roomPlayers(d).map(function (p) { return { id: p.id, uid: p.id, name: p.name, photo: p.photo, bot: p.bot }; });
    var layout = st.layoutType === 'acak' ? TH.makeLayout('acak', (st.seed || 1) + Math.floor(Math.random() * 1e6)) : TH.makeLayout(st.layoutType || 'klasik');
    var g = newGame(ps, TH.sanitizeTheme(st.theme), layout, st.rules || { six: true, exact: false });
    db('rooms/' + R.code + '/game', 'PUT', g).then(function () { return db('rooms/' + R.code, 'PATCH', { status: 'play' }); }).catch(function (e) { toast('Gagal mulai: ' + e.message); });
  }

  // =====================================================================
  //  LAYAR PERMAINAN
  // =====================================================================
  function online() { return G.mode === 'online'; }
  function showGame(g) {
    go('game');
    g = clone(g); fixGame(g);
    G.game = g; G.shownSeq = g.seq; G.disp = {}; G.queue = []; G.busy = false; G.rolling = false; G.winShown = 0; G.botSeq = -1; G.unread = 0; G.chatOpen = false; G.pendingTheme = null;
    g.players.forEach(function (p) { G.disp[p.id] = p.pos; });
    G.msg = g.move ? moveText(g, g.move) : 'Giliran ' + g.players[g.turn].name + '. Kocok dadunya!';
    applyTheme(g.theme); G.drawnTheme = JSON.stringify(g.theme);
    var h = '<div class="game has-chat">';
    h += '<div class="g-top"><button class="icon-btn" id="gMenu" aria-label="Menu">' + I.menu + '</button><button class="title theme-btn" id="gTheme" aria-label="Ganti tema"><span class="pal">' + I.palette + '</span><span class="tn">' + esc(g.theme.name) + '</span><span class="caret">' + I.down + '</span></button>' + (online() ? '<span class="chip">Room ' + esc(R.code) + '</span>' : '<span class="chip gray">' + (G.mode === 'satu' ? 'Satu HP' : 'Lawan Bot') + '</span>') + '</div>';
    h += '<div class="g-players" id="gPlayers"></div>';
    h += '<div class="g-board" id="gBoard">' + boardSVG(g.theme, g.layout) + '</div>';
    h += '<div class="g-msg" id="gMsg"></div>';
    h += '<div class="g-controls"><div class="dice" id="gDice">' + diceSVG(g.move ? g.move.roll : 1) + '</div><div class="grow" style="display:flex;flex-direction:column;gap:6px"><span class="turn-label" id="gTurn"></span><div class="row">' +
      '<button class="icon-btn chat-toggle" id="gChatBtn" aria-label="Buka obrolan" style="width:56px;height:56px;border-radius:16px">' + I.chat + '<span class="badge" id="gBadge" hidden>0</span></button>' +
      '<button class="btn red grow" id="gRoll">Kocok Dadu</button></div></div></div>';
    h += chatHTML();
    h += '</div><div class="scrim" id="scrim"></div>';
    app.innerHTML = h;
    $('#gMenu').onclick = showMenu;
    $('#gTheme').onclick = onThemeBtn;
    $('#gRoll').onclick = doRoll;
    $('#gDice').onclick = doRoll;
    R.chatKeys = {}; G.chatReady = false; G.aiMode = null; G.aiSince = Date.now(); bindChat();
    if (!online()) { var lc = LS.get('localchat', null); G.localChat = (lc && lc.started === g.started) ? lc.chat : {}; }
    renderPlayers(); placeTokens(); setMsg(G.msg); updateControls(); renderVideo();
    renderChatNew();
    afterSettle();
  }
  function fixGame(g) {
    g.theme = TH.sanitizeTheme(g.theme); g.rules = g.rules || {}; g.seq = g.seq || 0;
    g.layout.ladders = g.layout.ladders || []; g.layout.snakes = g.layout.snakes || [];
    g.players.forEach(function (p) { p.pos = p.pos || 0; });
  }
  function renderPlayers() {
    var g = G.game, el = $('#gPlayers'); if (!el) return;
    var cur = g.players[g.turn];
    el.style.gridTemplateColumns = window.innerWidth >= 760 ? '' : 'repeat(' + Math.min(g.players.length, 6) + ',minmax(0,1fr))';
    el.innerHTML = g.players.map(function (p) {
      return '<div class="pcard' + (!g.winner && p.id === cur.id ? ' turn' : '') + '" style="--pc:' + p.color + '"><span class="dot" style="background:' + p.color + (p.photo ? ';background-image:url(' + esc(p.photo) + ')' : '') + '"></span><span class="nm">' + esc(p.name) + (online() && p.uid === me.uid ? ' (kamu)' : '') + '</span><span class="ps">' + (p.bot ? 'Bot · ' : '') + 'Kotak ' + (G.disp[p.id] || 0) + '</span></div>';
    }).join('');
  }
  var OFFS = [[[0, 0]], [[-22, -14], [22, 14]], [[-24, -22], [24, -22], [0, 22]], [[-24, -24], [24, -24], [-24, 24], [24, 24]], [[-26, -26], [26, -26], [0, 0], [-26, 26], [26, 26]], [[-28, -24], [0, -24], [28, -24], [-28, 24], [0, 24], [28, 24]]];
  var GSCALE = [1, 0.74, 0.6, 0.6, 0.52, 0.5];
  function tokLabel(n) { n = String(n || '?').trim().split(/\s+/)[0]; return n.length > 6 ? n.slice(0, 5) + '…' : n; }
  function placeTokens(slideId) {
    var g = G.game, layer = $('#tokens'); if (!layer || !g) return;
    var groups = {};
    g.players.forEach(function (p) { var pos = G.disp[p.id] || 0; (groups[pos] = groups[pos] || []).push(p); });
    var cur = g.players[g.turn];
    g.players.forEach(function (p) {
      var el = $('#tok-' + cssId(p.id), layer);
      if (!el) {
        el = document.createElementNS('http://www.w3.org/2000/svg', 'g'); el.setAttribute('class', 'tok'); el.id = 'tok-' + cssId(p.id);
        var lb = tokLabel(p.name), fs = [34, 34, 30, 26, 22, 19, 17][Math.min(lb.length, 6)];
        el.innerHTML = '<circle class="ring" r="48" fill="none" stroke="' + p.color + '" stroke-width="7" style="display:none"/><circle r="40" cy="3" fill="rgba(0,0,0,.28)"/><circle r="38" fill="' + p.color + '" stroke="#fff" stroke-width="5"/><text y="' + Math.round(fs * 0.36) + '" text-anchor="middle" font-size="' + fs + '" font-weight="800" font-family="Nunito,sans-serif" fill="#fff" stroke="rgba(0,0,0,.45)" stroke-width="3.5" paint-order="stroke">' + esc(lb) + '</text>';
        layer.appendChild(el);
      }
      var pos = G.disp[p.id] || 0, grp = groups[pos], k = grp.indexOf(p), off = OFFS[Math.min(grp.length, 6) - 1][k] || [0, 0];
      var xy = cellXY(pos), x = xy[0] + off[0], y = xy[1] + off[1], sc = GSCALE[Math.min(grp.length, 6) - 1];
      el.classList.toggle('slide', slideId === p.id);
      el.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + sc + ')'); el.style.transform = 'translate(' + x + 'px,' + y + 'px) scale(' + sc + ')';
      el.querySelector('.ring').style.display = (!g.winner && cur && cur.id === p.id && !G.busy) ? '' : 'none';
    });
    // token pemain yang sedang jalan selalu di paling atas
    if (slideId) { var top = $('#tok-' + cssId(slideId), layer); if (top) layer.appendChild(top); }
  }
  function cssId(s) { return String(s).replace(/[^a-zA-Z0-9_-]/g, '_'); }
  function setMsg(t, icon) { G.msg = t; var el = $('#gMsg'); if (el) el.innerHTML = (icon || I.info) + '<span>' + esc(t) + '</span>'; }
  function myTurn() {
    var g = G.game; if (!g || g.winner) return false; var p = g.players[g.turn]; if (p.bot) return false;
    if (online()) return p.uid === me.uid;
    return true;
  }
  function updateControls() {
    var g = G.game, b = $('#gRoll'), t = $('#gTurn'); if (!b || !g) return;
    var p = g.players[g.turn];
    if (g.winner) { b.disabled = true; b.textContent = 'Selesai'; t.innerHTML = ''; return; }
    t.innerHTML = 'Giliran <span style="color:' + p.color + ';filter:brightness(.85)">' + esc(p.name) + '</span>';
    var can = myTurn() && !G.busy && !G.rolling;
    b.disabled = !can;
    b.textContent = myTurn() ? 'Kocok Dadu' : (p.bot ? p.name + ' jalan…' : 'Tunggu ' + p.name + '…');
    var skip = $('#gSkip');
    var showSkip = online() && G.isHost && !p.bot && p.uid !== me.uid && !G.busy;
    if (showSkip && !skip) { var s = document.createElement('button'); s.id = 'gSkip'; s.className = 'btn small ghost'; s.style.cssText = 'height:36px;font-size:13px;color:#23304A;border-color:#E7DCC2'; s.textContent = 'Lewati'; s.onclick = function () { if (confirm('Lewati giliran ' + p.name + '?')) commit(skipTurn(G.game)); }; $('#gMsg').appendChild(s); }
    else if (!showSkip && skip) skip.remove();
  }
  function doRoll() {
    if (!myTurn() || G.busy || G.rolling) return;
    G.rolling = true; updateControls();
    commit(applyRoll(G.game, rand6()));
  }
  function commit(ng) {
    if (online()) {
      G.rolling = true;
      db('rooms/' + R.code + '/game', 'PUT', ng).catch(function (e) { G.rolling = false; updateControls(); toast('Gagal kirim: ' + e.message); });
      setTimeout(function () { if (G.rolling && G.shownSeq < ng.seq) { G.rolling = false; updateControls(); } }, 9000);
    } else {
      LS.set('local', { mode: G.mode, game: ng });
      receiveGame(ng);
    }
  }
  function receiveGame(g) {
    if (!g || current !== 'game') return;
    g = clone(g); fixGame(g);
    if (!G.game || g.started !== G.game.started) { showGame(g); return; }
    if (g.seq <= G.shownSeq) return;
    G.queue.push(g); pump();
  }
  function pump() {
    if (G.busy) return; G.busy = true; updateControls(); placeTokens();
    (function next() {
      var g = G.queue.shift();
      if (!g) { G.busy = false; G.rolling = false; renderPlayers(); placeTokens(); updateControls(); afterSettle(); return; }
      if (g.seq <= G.shownSeq) return next();
      var anim = g.move && g.move.seq === G.shownSeq + 1 ? animateMove(g) : Promise.resolve();
      anim.then(function () {
        G.game = g; G.shownSeq = g.seq; g.players.forEach(function (p) { G.disp[p.id] = p.pos; });
        if (JSON.stringify(g.theme) !== G.drawnTheme) rebuildBoard();
        if (g.move) setMsg(moveText(g, g.move), g.move.via === 'ladder' ? I.ladder : I.info);
        renderPlayers(); placeTokens();
        next();
      });
    })();
  }
  function animateMove(g) {
    var m = g.move, d = $('#gDice');
    return (async function () {
      if (m.skip || m.theme) { await sleep(200); return; }
      d.innerHTML = diceSVG(m.roll); d.classList.remove('roll'); void d.offsetWidth; d.classList.add('roll'); SFX.dice();
      await sleep(600);
      var path = [], i;
      if (m.stay) path = [];
      else if (m.bounced) { for (i = m.from + 1; i <= 100; i++) path.push(i); for (i = 99; i >= m.mid; i--) path.push(i); }
      else for (i = m.from + 1; i <= m.mid; i++) path.push(i);
      for (i = 0; i < path.length; i++) { G.disp[m.pid] = path[i]; placeTokens(); SFX.step(); await sleep(190); }
      if (m.via) {
        await sleep(220);
        G.disp[m.pid] = m.to; placeTokens(m.pid);
        if (m.via === 'ladder') SFX.ladder(); else { SFX.snake(); buzz(150); }
        await sleep(780); placeTokens();
      }
      var p = pById(g, m.pid);
      if (p) addSys(moveText(g, m));
    })();
  }
  function afterSettle() {
    var g = G.game; if (!g || current !== 'game' || G.busy) return;
    if (G.pendingTheme && !G.rolling) { applyPendingTheme(); return; }
    if (g.winner) { if (G.winShown !== g.started) { G.winShown = g.started; setTimeout(showWin, 500); } return; }
    var p = g.players[g.turn];
    if (p.bot && (!online() || G.isHost) && G.botSeq !== g.seq) {
      G.botSeq = g.seq; var seq = g.seq;
      setTimeout(function () { if (current === 'game' && G.game && G.game.seq === seq && !G.busy) commit(applyRoll(G.game, rand6())); else G.botSeq = -1; }, 900);
    }
  }

  // ---------- MENU ----------
  function showMenu() {
    var m = document.createElement('div'); m.className = 'modal';
    var canRestart = !online() || G.isHost;
    m.innerHTML = '<div class="sheet" role="dialog" aria-label="Menu"><div class="row" style="justify-content:space-between"><h2 style="font-size:24px">Menu</h2><button class="icon-btn" data-a="close" aria-label="Tutup">' + I.close + '</button></div>' +
      '<button class="btn" data-a="close">Lanjut main</button>' +
      '<button class="btn ghost" data-a="video">Putar video dari link</button>' +
      '<button class="btn ghost" data-a="settings">Pengaturan (API key Gemini)</button>' +
      '<button class="btn ghost" data-a="sound">Suara: ' + (S.sound ? 'nyala' : 'mati') + '</button>' +
      (canRestart ? '<button class="btn ghost" data-a="restart">Main ulang dari awal</button>' : '') +
      (online() ? '<button class="btn ghost" data-a="share">Salin link room</button>' : '') +
      '<button class="btn ghost" data-a="exit">' + (online() ? 'Keluar dari room' : 'Ke menu utama') + '</button></div>';
    document.body.appendChild(m);
    m.onclick = function (e) {
      var a = e.target.closest('[data-a]'); if (e.target === m) return m.remove(); if (!a) return;
      var act = a.dataset.a; m.remove();
      if (act === 'video') { var u = prompt('Tempel link YouTube / TikTok / Instagram:'); if (u) { var v = parseVideo(u); if (v) openVideo(v, me.name || 'Kamu'); else toast('Link video tidak dikenali'); } }
      else if (act === 'settings') showSettings();
      else if (act === 'sound') { S.sound = !S.sound; saveS(); toast('Suara ' + (S.sound ? 'nyala' : 'mati')); }
      else if (act === 'restart') { if (confirm('Mulai ulang permainan?')) restartGame(); }
      else if (act === 'share') copyText(shareLink());
      else if (act === 'exit') { if (online()) leaveRoom(); else { G.game = null; showHome(); } }
    };
  }
  function restartGame() {
    var g = G.game, ps = g.players.map(function (p) { return { id: p.id, uid: p.uid, name: p.name, photo: p.photo, bot: p.bot }; });
    if (online()) {
      var st = R.data.settings || {};
      var layout = st.layoutType === 'acak' ? TH.makeLayout('acak', Date.now() & 0x7fffffff) : g.layout;
      var ng = newGame(ps, g.theme, layout, g.rules);
      db('rooms/' + R.code + '/game', 'PUT', ng).catch(function (e) { toast(e.message); });
    } else {
      var lay = S.layoutType === 'acak' && g.layout ? TH.makeLayout('acak', Date.now() & 0x7fffffff) : g.layout;
      var n2 = newGame(ps, g.theme, lay, g.rules); LS.set('local', { mode: G.mode, game: n2 }); showGame(n2);
    }
  }

  // ---------- GANTI TEMA DI TENGAH PERMAINAN ----------
  function themeModal(onPick) {
    var m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = '<div class="sheet" role="dialog" aria-label="Ganti tema"><div class="row" style="justify-content:space-between"><h2 style="font-size:24px">Ganti Tema</h2><button class="icon-btn" data-x aria-label="Tutup">' + I.close + '</button></div>' +
      '<span style="font-size:13px;color:var(--muted)">Posisi pemain dan susunan ular-tangga tetap, hanya tampilannya yang berubah.</span>' +
      '<label class="sr" for="mtText">Tema</label><input class="input" id="mtText" maxlength="60" placeholder="mis. pantai, luar angkasa…" value="' + esc(S.themeText) + '">' +
      '<div class="row"><button class="btn small dark grow" id="mtFind">Cari di tema bawaan</button><button class="btn small dark grow" id="mtAI">' + I.spark + ' Pakai AI</button></div>' +
      '<div style="display:flex;gap:6px;flex-wrap:wrap"><button class="pill" data-rand style="border-color:var(--accent)">🎲 Tema acak</button>' + TH.list.map(function (t) { return '<button class="pill" data-tid="' + t.id + '">' + esc(t.name) + '</button>'; }).join('') + '</div></div>';
    document.body.appendChild(m);
    function pick(t) { m.remove(); S.theme = clone(t); saveS(); onPick(clone(t)); }
    $('[data-x]', m).onclick = function () { m.remove(); };
    m.onclick = function (e) { if (e.target === m) m.remove(); };
    $('#mtFind', m).onclick = function () { var v = $('#mtText', m).value.trim(); S.themeText = v; var r = TH.matchTheme(v); if (!r.exact) toast('Tidak ada yang persis, dipilihkan yang mirip'); pick(r.theme); };
    $('#mtText', m).onkeydown = function (e) { if (e.key === 'Enter') $('#mtFind', m).click(); };
    $('#mtAI', m).onclick = function () { var v = $('#mtText', m).value.trim(); if (!v) { toast('Tulis temanya dulu'); return; } S.themeText = v; m.style.zIndex = 39; aiTheme(v, this, pick); };
    $$('[data-tid]', m).forEach(function (b) { b.onclick = function () { var t = TH.list.filter(function (x) { return x.id === b.dataset.tid; })[0]; S.themeText = t.name; pick(t); }; });
    $('[data-rand]', m).onclick = function () { var L = TH.list.filter(function (x) { return x.name !== (G.game && G.game.theme.name); }); var t = L[Math.floor(Math.random() * L.length)]; S.themeText = t.name; pick(t); };
  }
  // tema baru masuk antrean dan dipasang begitu papan sedang diam (tidak bentrok dengan langkah bot)
  function changeThemeMidGame(t, cb) {
    G.pendingTheme = { t: t, cb: cb };
    if (!G.busy && !G.rolling) applyPendingTheme();
  }
  function applyPendingTheme() {
    var p = G.pendingTheme; G.pendingTheme = null; if (!p) return;
    setThemeNow(p.t); if (p.cb) p.cb();
  }
  function setThemeNow(t) {
    var g = G.game; if (!g) return;
    var ng = clone(g); ng.theme = TH.sanitizeTheme(t); ng.seq = (g.seq || 0) + 1;
    ng.move = { seq: ng.seq, pid: g.players[g.turn].id, theme: true, roll: 0, from: 0, mid: 0, to: 0 };
    commit(ng);
  }
  function rebuildBoard() {
    var g = G.game, b = $('#gBoard'); if (!b) return;
    applyTheme(g.theme); G.drawnTheme = JSON.stringify(g.theme);
    b.innerHTML = boardSVG(g.theme, g.layout);
    var tt = $('#gTheme .tn'); if (tt) tt.textContent = g.theme.name;
    placeTokens(); renderVideo();
  }

  // ---------- MENANG ----------
  function showWin() {
    var g = G.game, w = pById(g, g.winner); if (!w) return;
    SFX.win(); buzz([80, 60, 80, 60, 200]);
    var cf = document.createElement('div'); cf.className = 'confetti';
    for (var i = 0; i < 70; i++) { var c = document.createElement('i'); c.style.left = Math.random() * 100 + '%'; c.style.background = COLORS[i % 6]; c.style.animationDuration = (2 + Math.random() * 2.5) + 's'; c.style.animationDelay = Math.random() * 0.8 + 's'; cf.appendChild(c); }
    document.body.appendChild(cf); setTimeout(function () { cf.remove(); }, 6000);
    var rank = g.players.slice().sort(function (a, b) { return (b.id === g.winner) - (a.id === g.winner) || b.pos - a.pos; });
    var canRestart = !online() || G.isHost;
    var m = document.createElement('div'); m.className = 'modal';
    m.innerHTML = '<div class="sheet win" role="dialog" aria-label="Pemenang"><svg width="96" height="96" viewBox="0 0 120 120" aria-hidden="true"><path d="M30 18h60v28c0 20-13 34-30 34S30 66 30 46z" fill="#F7C548"/><path d="M30 26H14c0 18 8 28 20 30M90 26h16c0 18-8 28-20 30" fill="none" stroke="#F7C548" stroke-width="7" stroke-linecap="round"/><rect x="52" y="78" width="16" height="16" fill="#E0A82A"/><rect x="36" y="94" width="48" height="14" rx="4" fill="#F7C548"/><path d="M60 32l5 10 11 1.5-8 7.5 2 11-10-5.5-10 5.5 2-11-8-7.5 11-1.5z" fill="#fff"/></svg>' +
      '<span style="color:#C9D1E3;font-weight:700">Sampai kotak 100 duluan!</span><h2>' + esc(w.name) + ' Menang!</h2>' +
      '<div class="rank"><span class="label" style="color:#5A6478">Peringkat</span>' + rank.map(function (p, i) { return '<div class="prow"><span class="no">' + (i + 1) + '</span><span class="dot" style="width:22px;height:22px;background:' + p.color + '"></span><span class="grow" style="font-weight:800;text-align:left">' + esc(p.name) + '</span><span style="font-weight:700;color:#4A5468;font-size:13px">' + p.pos + '</span></div>'; }).join('') + '</div>' +
      (canRestart ? '<button class="btn" data-a="again" style="width:100%">Main Lagi</button>' : '<div style="font-weight:700;color:#C9D1E3">Menunggu tuan rumah memulai lagi…</div>') +
      '<button class="btn ghost" data-a="home" style="width:100%;color:#fff;border-color:#5A6A8C">' + (online() ? 'Lihat papan' : 'Ke Menu Utama') + '</button></div>';
    document.body.appendChild(m);
    m.onclick = function (e) {
      var a = e.target.closest('[data-a]'); if (!a) return; m.remove();
      if (a.dataset.a === 'again') restartGame();
      else if (!online()) { LS.del('local'); showHome(); }
    };
    if (!online()) LS.del('local');
    // tutup otomatis kalau game baru dimulai (online)
    var started = g.started, iv = setInterval(function () { if (!document.body.contains(m)) return clearInterval(iv); if (!G.game || G.game.started !== started) { m.remove(); clearInterval(iv); } }, 500);
  }

  // =====================================================================
  //  CHAT + VOICE NOTE
  // =====================================================================
  var GEM = { uid: 'gemini', name: 'Gemini', color: '#4285F4' };
  function chatHTML() {
    return '<section class="chat" id="chat" aria-label="Obrolan"><div class="chat-head"><h2>Obrolan</h2><button class="icon-btn chat-close" id="chatClose" aria-label="Tutup obrolan">' + I.down + '</button></div>' +
      '<div class="chat-list" id="chatList"><div class="sys">Tekan <b>✦ Gemini</b> untuk bertanya, atau <b>🎨 Tema</b> untuk ganti tema lewat chat' + (online() ? '. Bisa juga kirim voice note atau link YouTube / TikTok / Instagram.' : '.') + '</div></div>' +
      '<div class="quick"><button class="pill ai" data-ai="ask">' + I.gem + ' Gemini</button><button class="pill ai" data-ai="theme">🎨 Tema</button>' +
      ['Ayo cepet!', 'Hoki banget 😆', 'Awas ular 🐍', 'Yah 😭', 'GG 👍'].map(function (q) { return '<button class="pill" data-q="' + esc(q) + '">' + esc(q) + '</button>'; }).join('') + '</div>' +
      '<div class="chat-input" id="chatInput"></div></section>';
  }
  function bindChat() {
    $('#gChatBtn').onclick = function () { setChat(true); };
    $('#chatClose').onclick = function () { setChat(false); };
    $('#scrim').onclick = function () { setChat(false); };
    $$('[data-q]').forEach(function (b) { b.onclick = function () { sendChat({ text: b.dataset.q }); }; });
    $$('[data-ai]').forEach(function (b) { b.onclick = function () { setAIMode(G.aiMode === b.dataset.ai ? null : b.dataset.ai); }; });
    renderChatInput();
  }
  function setAIMode(mode) {
    G.aiMode = mode;
    $$('[data-ai]').forEach(function (x) { x.classList.toggle('on', x.dataset.ai === mode); });
    renderChatInput();
    var f = $('#chatField'); if (f && mode) f.focus();
  }
  function onThemeBtn() {
    if (!online() || G.isHost) { themeModal(changeThemeMidGame); return; }
    setChat(true); setAIMode('theme'); toast('Ketik tema yang kamu mau, tuan rumah yang akan menggantinya');
  }
  function wide() { return window.matchMedia('(min-width: 760px) and (min-height: 520px)').matches; }
  function setChat(open) {
    G.chatOpen = open; var c = $('#chat'), s = $('#scrim'); if (!c) return;
    c.classList.toggle('open', open); if (s) s.classList.toggle('on', open && !wide());
    if (open) { G.unread = 0; updBadge(); var l = $('#chatList'); l.scrollTop = l.scrollHeight; }
  }
  function updBadge() { var b = $('#gBadge'); if (!b) return; b.hidden = !G.unread; b.textContent = G.unread > 9 ? '9+' : G.unread; }
  function renderChatInput() {
    var el = $('#chatInput'); if (!el) return;
    if (REC) {
      el.innerHTML = '<button class="icon-btn" id="recCancel" aria-label="Batal rekam" style="border-radius:50%">' + I.close + '</button><div class="rec-bar"><span style="width:10px;height:10px;border-radius:50%;background:var(--red)"></span><span id="recTime">0:00</span><span style="font-size:12px;color:#4A5468;font-weight:700">maks ' + CFG.VOICE_MAX_SEC + ' dtk</span></div><button class="round send rec" id="recStop" aria-label="Kirim voice note">' + I.send + '</button>';
      $('#recCancel').onclick = function () { stopRec(false); }; $('#recStop').onclick = function () { stopRec(true); };
      return;
    }
    var mode = G.aiMode, canVoice = online() && !mode;
    var ph = mode === 'ask' ? 'Tanya apa ke Gemini?' : mode === 'theme' ? 'Mau tema apa? mis. pantai, kantor…' : 'Tulis pesan atau tempel link…';
    el.innerHTML = (mode ? '<button class="mode-chip" id="modeX" aria-label="Batalkan mode ' + (mode === 'ask' ? 'Gemini' : 'tema') + '">' + (mode === 'ask' ? I.gem + ' Gemini' : '🎨 Tema') + ' <span aria-hidden="true">✕</span></button>' : '') +
      '<label class="sr" for="chatField">Tulis pesan</label><input class="field" id="chatField" maxlength="300" placeholder="' + ph + '" autocomplete="off"><button class="round' + (canVoice ? '' : ' send') + '" id="chatAct" aria-label="' + (canVoice ? 'Rekam voice note' : 'Kirim') + '">' + (canVoice ? I.mic : I.send) + '</button>';
    var f = $('#chatField'), act = $('#chatAct'), mx = $('#modeX');
    if (mx) mx.onclick = function () { setAIMode(null); };
    function upd() { if (!canVoice) return; var has = f.value.trim().length > 0; act.className = 'round' + (has ? ' send' : ''); act.innerHTML = has ? I.send : I.mic; act.setAttribute('aria-label', has ? 'Kirim pesan' : 'Rekam voice note'); }
    function send() {
      var v = f.value.trim(); if (!v) { if (canVoice) startRec(); return; }
      var m = G.aiMode;
      if (m) { sendChat({ text: v, ai: m }); showTyping(true); setAIMode(null); }
      else { sendChat({ text: v }); f.value = ''; upd(); }
    }
    f.oninput = upd;
    f.onkeydown = function (e) { if (e.key === 'Enter') send(); };
    act.onclick = send;
  }
  function myColor() { var g = G.game; if (g) { var p = g.players.filter(function (x) { return x.uid === me.uid || (!online() && x.id === 'p0'); })[0]; if (p) return p.color; } return '#5A6478'; }
  function sendChat(o) {
    o.uid = me.uid; o.name = me.name || 'Pemain'; o.color = myColor();
    postChat(o);
  }
  var localN = 0;
  function postChat(o) {
    if (online()) {
      if (!R.code) return;
      o.t = TS;
      db('rooms/' + R.code + '/chat', 'POST', o).catch(function (e) { toast('Pesan gagal: ' + e.message); });
    } else {
      o.t = Date.now();
      var k = 'L' + o.t + String(localN++).padStart(4, '0');
      G.localChat = G.localChat || {}; G.localChat[k] = o; saveLocalChat();
      renderChatNew();
    }
  }
  function saveLocalChat() {
    if (online() || !G.game) return;
    var keys = Object.keys(G.localChat || {}).sort().slice(-60), c = {};
    keys.forEach(function (k) { c[k] = G.localChat[k]; });
    G.localChat = c; LS.set('localchat', { started: G.game.started, chat: c });
  }
  function geminiSay(text) { postChat({ uid: GEM.uid, name: GEM.name, color: GEM.color, text: String(text).slice(0, 700) }); }
  function showTyping(on) {
    var l = $('#chatList'); if (!l) return; var t = $('#aiTyping');
    if (on && !t) { t = document.createElement('div'); t.id = 'aiTyping'; t.className = 'sys'; t.textContent = 'Gemini sedang mengetik…'; l.appendChild(t); l.scrollTop = l.scrollHeight; clearTimeout(G.typT); G.typT = setTimeout(function () { if (!$('#aiTyping')) return; showTyping(false); addSys(online() && !G.isHost ? 'Gemini belum menjawab. Pastikan HP tuan rumah sedang membuka game ini dan API key Gemini sudah diisi di HP tuan rumah.' : 'Gemini belum menjawab. Cek koneksi internet, lalu coba lagi.'); }, 40000); }
    else if (!on && t) t.remove();
  }
  function addSys(t) { var l = $('#chatList'); if (!l) return; var d = document.createElement('div'); d.className = 'sys'; d.textContent = t; var ty = $('#aiTyping'); if (ty) l.insertBefore(d, ty); else l.appendChild(d); trimChat(l); if (G.chatOpen || wide()) l.scrollTop = l.scrollHeight; }
  function trimChat(l) { while (l.children.length > 160) l.removeChild(l.firstChild); }
  function chatSource() { return online() ? ((R.data && R.data.chat) || {}) : (G.localChat || {}); }
  function renderChatNew() {
    var l = $('#chatList'); if (!l) return;
    var ch = chatSource(), keys = Object.keys(ch).sort(), added = 0, fromOthers = 0;
    keys.forEach(function (k) {
      if (R.chatKeys[k]) return; R.chatKeys[k] = 1; added++;
      var m = ch[k]; if (!m) return;
      var isGem = m.uid === GEM.uid, mine = !isGem && m.uid === me.uid; if (!mine) fromOthers++;
      if (isGem) showTyping(false);
      var el = document.createElement('div'); el.className = 'msg' + (mine ? ' me' : '') + (isGem ? ' gem' : '');
      var body = '';
      if (m.audio) body = '<div class="voice"><button aria-label="Putar voice note">' + I.play + '</button><span class="bar"><i></i></span><span style="font-size:12px;font-weight:700;color:#4A5468">0:' + String(m.dur || 0).padStart(2, '0') + '</span></div>';
      else {
        var txt = esc(m.text || '').replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>').replace(/\n/g, '<br>');
        if (m.ai) txt = '<span class="ai-tag">' + (m.ai === 'theme' ? '🎨 minta tema' : I.gem + ' ke Gemini') + '</span> ' + txt;
        body = '<div>' + txt + '</div>';
        var v = parseVideo(m.text || '');
        if (v && !m.ai) body += '<div class="vcard"><div class="vthumb"' + (v.thumb ? ' style="background-image:url(' + esc(v.thumb) + ')"' : '') + '>' + I.play + '</div><div style="min-width:0"><div style="font-size:11px;font-weight:800;color:#4A5468">' + esc(v.platform) + '</div><div style="font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(v.open.replace(/^https?:\/\//, '')) + '</div></div></div><button class="vbtn">' + (v.embed ? 'Putar di atas papan' : 'Buka di aplikasi') + '</button>';
      }
      var dot = isGem ? '<span class="dot gemdot">' + I.gem + '</span>' : '<span class="dot" style="background:' + esc(m.color || '#5A6478') + '"></span>';
      el.innerHTML = (mine ? '' : dot) + '<div class="bub">' + (mine ? '' : '<div class="who" style="color:' + esc(m.color || '#2459AE') + ';filter:brightness(.8)">' + esc(m.name) + '</div>') + body + '</div>';
      var ty = $('#aiTyping'); if (ty && !isGem) l.insertBefore(el, ty); else l.appendChild(el);
      if (m.audio) bindVoice(el, m.audio);
      var vb = el.querySelector('.vbtn'); if (vb) { var vv = parseVideo(m.text); vb.onclick = function () { if (vv.embed) { openVideo(vv, m.name); if (!wide()) setChat(false); } else window.open(vv.open, '_blank', 'noopener'); }; }
      // permintaan ke Gemini: dijawab oleh HP ini (lawan bot / satu HP) atau HP tuan rumah (online)
      if (m.ai && !m.done && (!online() || G.isHost) && !G.aiHandled[k] && keys.indexOf(k) >= keys.length - 20) {
        G.aiHandled[k] = 1; markDone(k); handleAI(m);
      }
    });
    if (!added) { G.chatReady = true; return; }
    trimChat(l);
    if (G.chatOpen || wide()) l.scrollTop = l.scrollHeight;
    if (fromOthers && G.chatReady) { SFX.ping(); if (!G.chatOpen && !wide()) { G.unread += fromOthers; updBadge(); } }
    G.chatReady = true;
  }
  G.aiHandled = {};
  function markDone(k) {
    if (online()) db('rooms/' + R.code + '/chat/' + k, 'PATCH', { done: true }).catch(function () { });
    else if (G.localChat && G.localChat[k]) { G.localChat[k].done = true; saveLocalChat(); }
  }
  function waitIdle() {
    return new Promise(function (res) { var n = 0; (function chk() { if ((!G.busy && !G.rolling) || n++ > 75) res(); else setTimeout(chk, 200); })(); });
  }
  function handleAI(m) {
    var hasKey = !!LS.get('gemini', '');
    if (m.ai === 'theme') {
      var p = hasKey ? aiThemeRaw(m.text) : Promise.resolve(clone(TH.matchTheme(m.text).theme));
      p.then(function (t) {
        return Promise.resolve().then(function () {
          if (current !== 'game' || !G.game) return;
          S.theme = clone(t); S.themeText = m.text; saveS();
          changeThemeMidGame(t, function () { geminiSay('Siap! Tema sekarang "' + t.name + '": tangga jadi ' + t.ladderName + ', ular jadi ' + t.snakeName + '.' + (hasKey ? '' : ' (Dipilih dari tema bawaan karena API key Gemini belum diisi.)')); });
        });
      }).catch(function (e) { geminiSay('Maaf, aku gagal bikin tema itu (' + String(e.message || e).slice(0, 80) + '). Coba tema lain ya.'); });
      return;
    }
    if (!hasKey) { geminiSay('Aku belum aktif. ' + (online() ? 'Tuan rumah perlu mengisi' : 'Isi dulu') + ' API key Gemini lewat Menu → Pengaturan ya. Gratis kok, cukup akun Google.'); return; }
    geminiRequest(chatPrompt(m), false).then(function (t) { geminiSay(t || 'Hmm, aku bingung mau jawab apa 😅'); })
      .catch(function (e) { geminiSay('Maaf, aku lagi gangguan: ' + String(e.message || e).slice(0, 100)); });
  }
  function chatPrompt(m) {
    var g = G.game, cur = g.players[g.turn];
    var lines = g.players.map(function (p) { return '- ' + p.name + (p.bot ? ' (bot)' : '') + ': kotak ' + p.pos; }).join('\n');
    var ch = chatSource(), recent = Object.keys(ch).sort().slice(-12).map(function (k) { var x = ch[k]; return x.name + ': ' + (x.audio ? '[voice note]' : (x.text || '')); }).join('\n');
    return 'Kamu "Gemini", teman main ular tangga yang ramah, lucu, dan suportif. Jawab dalam bahasa Indonesia santai, singkat (maksimal 3 kalimat), boleh pakai 1 emoji. ' +
      'Jangan mengarang kejadian yang tidak ada di data. Hasil dadu itu acak, jangan janji bisa mengatur dadu.\n\n' +
      'KONDISI PERMAINAN\nTema papan: ' + g.theme.name + ' (tangga = ' + g.theme.ladderName + ', ular = ' + g.theme.snakeName + ')\n' +
      'Mode: ' + (online() ? 'online' : G.mode === 'bot' ? 'lawan bot' : 'satu HP gantian') + '\nPosisi pemain (finish di kotak 100):\n' + lines + '\n' +
      'Giliran sekarang: ' + cur.name + '\n' + (g.winner ? 'Pemenang: ' + (pById(g, g.winner) || {}).name + '\n' : '') +
      (g.move && !g.move.theme ? 'Langkah terakhir: ' + moveText(g, g.move) + '\n' : '') +
      'Tangga di: ' + g.layout.ladders.map(function (x) { return x[0] + '→' + x[1]; }).join(', ') + '\nUlar di: ' + g.layout.snakes.map(function (x) { return x[0] + '→' + x[1]; }).join(', ') + '\n\n' +
      'OBROLAN TERAKHIR\n' + recent + '\n\nPertanyaan dari ' + m.name + ': ' + m.text;
  }
  var playing = null;
  function bindVoice(el, src) {
    var btn = el.querySelector('.voice button'), bar = el.querySelector('.voice .bar i'), au = null;
    btn.onclick = function () {
      if (!au) { au = new Audio(src); au.ontimeupdate = function () { if (au.duration && isFinite(au.duration)) bar.style.width = (au.currentTime / au.duration * 100) + '%'; }; au.onended = function () { btn.innerHTML = I.play; bar.style.width = '0'; playing = null; }; au.onerror = function () { toast('Voice note tidak bisa diputar di HP ini'); }; }
      if (playing && playing !== au) { playing.pause(); }
      if (au.paused) { au.play().then(function () { btn.innerHTML = I.pause; playing = au; }).catch(function () { toast('Gagal memutar suara'); }); }
      else { au.pause(); btn.innerHTML = I.play; }
    };
  }
  var REC = null;
  function startRec() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) { toast('Browser ini belum bisa rekam suara'); return; }
    navigator.mediaDevices.getUserMedia({ audio: true }).then(function (stream) {
      var mime = ['audio/webm;codecs=opus', 'audio/mp4', 'audio/webm', 'audio/ogg;codecs=opus'].filter(function (m) { return MediaRecorder.isTypeSupported(m); })[0] || '';
      var mr; try { mr = new MediaRecorder(stream, mime ? { mimeType: mime, audioBitsPerSecond: 24000 } : undefined); } catch (e) { mr = new MediaRecorder(stream); }
      var r = { mr: mr, stream: stream, chunks: [], start: Date.now(), send: true };
      mr.ondataavailable = function (e) { if (e.data && e.data.size) r.chunks.push(e.data); };
      mr.onstop = function () {
        stream.getTracks().forEach(function (t) { t.stop(); });
        clearInterval(r.timer); REC = null; renderChatInput();
        if (!r.send) return;
        var dur = (Date.now() - r.start) / 1000; if (dur < 0.8) { toast('Terlalu pendek'); return; }
        var blob = new Blob(r.chunks, { type: mr.mimeType || mime || 'audio/webm' });
        if (blob.size > 900000) { toast('Voice note terlalu besar'); return; }
        var fr = new FileReader(); fr.onload = function () { sendChat({ audio: fr.result, dur: Math.min(CFG.VOICE_MAX_SEC, Math.round(dur)) }); }; fr.readAsDataURL(blob);
      };
      REC = r; mr.start(250); renderChatInput();
      r.timer = setInterval(function () { var s = Math.floor((Date.now() - r.start) / 1000); var t = $('#recTime'); if (t) t.textContent = '0:' + String(s).padStart(2, '0'); if (s >= CFG.VOICE_MAX_SEC) stopRec(true); }, 250);
    }).catch(function () { toast('Izin mikrofon ditolak'); });
  }
  function stopRec(send) { if (!REC) return; REC.send = send; try { REC.mr.stop(); } catch (e) { REC = null; renderChatInput(); } }

  // =====================================================================
  //  VIDEO DI ATAS PAPAN
  // =====================================================================
  function parseVideo(text) {
    var m = String(text || '').match(/https?:\/\/[^\s]+/); if (!m) return null;
    var url = m[0].replace(/[).,!?]+$/, ''), r;
    if ((r = url.match(/(?:youtube\.com\/(?:watch\?(?:[^#\s]*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/))) {
      var tall = /\/shorts\//.test(url);
      return { platform: tall ? 'YouTube Shorts' : 'YouTube', open: url, embed: 'https://www.youtube.com/embed/' + r[1] + '?autoplay=1&playsinline=1&rel=0', thumb: 'https://i.ytimg.com/vi/' + r[1] + '/mqdefault.jpg', tall: tall };
    }
    if ((r = url.match(/tiktok\.com\/(?:@[\w.-]+\/video|embed(?:\/v2)?|v)\/(\d{8,})/))) return { platform: 'TikTok', open: url, embed: 'https://www.tiktok.com/player/v1/' + r[1] + '?autoplay=1&loop=1&rel=0', tall: true, login: true };
    if (/(?:vm|vt)\.tiktok\.com\//.test(url) || /tiktok\.com\/t\//.test(url)) return { platform: 'TikTok', open: url, embed: '', tall: true };
    if ((r = url.match(/instagram\.com\/(?:[\w.]+\/)?(reel|reels|p|tv)\/([\w-]+)/))) return { platform: r[1] === 'p' ? 'Instagram' : 'Instagram Reels', open: url, embed: 'https://www.instagram.com/' + (r[1] === 'reels' ? 'reel' : r[1]) + '/' + r[2] + '/embed/', tall: true, login: true };
    return null;
  }
  function openVideo(v, from) { G.video = { v: v, from: from, mini: false }; renderVideo(); }
  function renderVideo() {
    var b = $('#gBoard'); if (!b) return;
    var old = $('#vid');
    if (!G.video) { if (old) old.remove(); return; }
    var v = G.video.v;
    if (old && old.dataset.src === v.embed) { old.classList.toggle('mini', G.video.mini); $('#vMin').innerHTML = G.video.mini ? I.max : I.min; return; }
    if (old) old.remove();
    var el = document.createElement('div'); el.id = 'vid'; el.className = 'vid' + (v.tall ? ' tall' : '') + (G.video.mini ? ' mini' : ''); el.dataset.src = v.embed;
    el.innerHTML = '<div class="vid-head"><span style="width:10px;height:10px;border-radius:50%;background:#2F6FD6;flex:none"></span><span class="grow" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Dari ' + esc(G.video.from) + ' · ' + esc(v.platform) + '</span>' +
      '<a class="icon-btn" href="' + esc(v.open) + '" target="_blank" rel="noopener" aria-label="Buka di aplikasi">' + I.ext + '</a><button class="icon-btn" id="vMin" aria-label="Kecilkan atau besarkan video">' + (G.video.mini ? I.max : I.min) + '</button><button class="icon-btn" id="vClose" aria-label="Tutup video">' + I.close + '</button></div>' +
      '<div class="vid-body"><iframe src="' + esc(v.embed) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" title="Video ' + esc(v.platform) + '"></iframe>' +
      (v.login ? '<div class="vid-note">Kalau video minta login, tekan tombol ↗ untuk buka di aplikasi ' + esc(v.platform.split(' ')[0]) + '</div>' : '') + '</div>';
    b.appendChild(el);
    $('#vMin').onclick = function () { G.video.mini = !G.video.mini; renderVideo(); };
    $('#vClose').onclick = function () { G.video = null; renderVideo(); };
    var note = el.querySelector('.vid-note'); if (note) setTimeout(function () { note.style.transition = 'opacity .6s'; note.style.opacity = '0'; }, 7000);
  }

  // ---------- mulai ----------
  window.addEventListener('resize', function () { if (current === 'game') { renderPlayers(); if (G.chatOpen) setChat(true); } });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && R.code && !R.es) listenRoom(R.code); });
  showHome();
})();
