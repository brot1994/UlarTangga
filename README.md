# Ular Tangga

Game ular tangga untuk 1–6 pemain: satu HP gantian, lawan bot, atau online dari HP masing-masing (Android, iPhone, tablet, fold).

**Main:** https://brot1994.github.io/UlarTangga/

## Fitur
- Mode Satu HP, Lawan Bot, dan Online (kode room 4 angka, bisa dibagikan ke WA)
- 17 tema bawaan + tema dari teks bebas pakai AI (Gemini, API key diisi di Pengaturan)
- Susunan Klasik / Santai / Tegang / Acak (tetap adil)
- Chat, voice note (maks 30 detik), dan video YouTube / TikTok / Instagram melayang di atas papan
- Tampilan melebar otomatis di tablet / fold / landscape

## Data online
Memakai Firebase Realtime Database **agi-flipclock**, di folder `/ulartangga` (terpisah dari FlipClock dan Skor Tenis Meja). Room yang lebih dari 36 jam dibersihkan otomatis saat ada room baru dibuat.

## Login Google (opsional)
Isi `FIREBASE_WEB` di `config.js` dengan `firebaseConfig` dari Firebase Console, aktifkan provider Google di Authentication, dan tambahkan `brot1994.github.io` ke Authorized domains.
