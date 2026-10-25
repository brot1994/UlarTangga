// ======================================================================
//  KONFIGURASI ULAR TANGGA
//  FIREBASE_DB_URL : Realtime Database untuk main online (pakai agi-flipclock,
//                    data game disimpan di folder /ulartangga supaya tidak
//                    tercampur dengan FlipClock / Skor Tenis Meja).
//  FIREBASE_WEB    : isi dari Firebase Console > Project settings > Your apps
//                    (firebaseConfig) untuk mengaktifkan "Login dengan Google".
//                    Biarkan null kalau belum dipakai — game tetap jalan,
//                    pemain cukup mengetik nama.
// ======================================================================
window.UT_CONFIG = {
  FIREBASE_DB_URL: "https://agi-flipclock-default-rtdb.asia-southeast1.firebasedatabase.app",
  DB_ROOT: "ulartangga",
  FIREBASE_WEB: null,
  GEMINI_MODEL: "gemini-2.5-flash",
  VOICE_MAX_SEC: 30
};
