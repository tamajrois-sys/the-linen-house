// =====================================================================
// DATA KOST: SEMUA ISI DI SINI MASIH [CONTOH] SAMPAI DIGANTI DATA ASLI.
// Ubah data di file ini saja, halaman website akan ikut berubah.
// Sebelum website dipublikasikan, ganti semua bagian bertanda [CONTOH]
// lalu ubah DATA_MASIH_CONTOH menjadi false.
// =====================================================================

export const DATA_MASIH_CONTOH = true;

export type Availability = "tersedia" | "sedikit" | "penuh" | "segera";

export const kost = {
  name: "The Linen House", // nama sementara
  tagline: "Hunian kost yang hangat dan nyaman di Tembalang", // [CONTOH]
  city: "Semarang",
  area: "Tembalang",
  status: "Segera dibuka", // kost masih dalam pembangunan
};

export const contact = {
  whatsappNumber: "6281200000000", // [CONTOH] format 62..., tanpa + dan tanpa spasi
  whatsappDisplay: "0812-0000-0000", // [CONTOH]
  email: "halo@contoh-linenhouse.id", // [CONTOH]
};

export const navLinks = [
  { label: "Beranda", href: "/" },
  { label: "Paket", href: "/paket" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "Lokasi", href: "/lokasi" },
  { label: "Kontak", href: "/kontak" },
];

// [CONTOH] semua paket, ukuran, harga, dan isinya
export const packages = [
  {
    id: "classic",
    name: "Classic",
    rooms: 8,
    size: "3 x 4 m",
    pricePerMonth: 1800000,
    minStayMonths: 3,
    popular: false,
    availability: "segera" as Availability,
    suitableFor: "Mahasiswa",
    includes: ["Air", "Wifi", "Listrik token sendiri"],
    roomFeatures: [
      "Kasur dan lemari",
      "Meja belajar dan kursi",
      "Kipas angin",
      "Kamar mandi dalam",
    ],
  },
  {
    id: "deluxe",
    name: "Deluxe",
    rooms: 6,
    size: "4 x 4 m",
    pricePerMonth: 2500000,
    minStayMonths: 1,
    popular: true, // [CONTOH] label "Paling Populer"
    availability: "segera" as Availability,
    suitableFor: "Karyawan",
    includes: [
      "Air",
      "Wifi",
      "Listrik (batas 150 kWh per bulan)",
      "Laundry 4 kg per minggu",
      "Pembersihan kamar 1x per minggu",
    ],
    roomFeatures: [
      "Kasur dan lemari",
      "Meja belajar dan kursi",
      "AC",
      "Kamar mandi dalam",
      "Air panas",
    ],
  },
  {
    id: "premier",
    name: "Premier",
    rooms: 4,
    size: "4 x 5 m",
    pricePerMonth: 3500000,
    minStayMonths: 1,
    popular: false,
    availability: "segera" as Availability,
    suitableFor: "Ekspatriat dan karyawan senior",
    includes: [
      "Air",
      "Wifi",
      "Listrik",
      "Laundry 8 kg per minggu",
      "Pembersihan kamar 2x per minggu",
    ],
    roomFeatures: [
      "Kasur dan lemari",
      "Meja belajar dan kursi",
      "AC",
      "Kamar mandi dalam",
      "Air panas",
      "TV",
      "Kulkas mini",
    ],
  },
];

// [CONTOH] fasilitas area bersama, keamanan, dan layanan
export const facilityGroups = [
  {
    title: "Area bersama",
    items: [
      "Dapur bersama",
      "Ruang santai dan area kerja",
      "Taman kecil atau teras",
      "Parkir motor dan mobil",
      "Mesin cuci dan area jemur",
    ],
  },
  {
    title: "Keamanan dan layanan",
    items: [
      "CCTV 24 jam",
      "Akses pintu dengan kartu atau kunci khusus",
      "Penjaga malam",
      "Layanan kebersihan area bersama",
    ],
  },
];

// [CONTOH] aturan dan biaya
export const rules = {
  depositRupiah: 1000000,
  depositNote: "Dikembalikan saat keluar jika tidak ada kerusakan",
  guests: "Tamu boleh di ruang santai pukul 08.00 sampai 21.00, tidak boleh menginap",
  pets: "Tidak diperbolehkan",
  curfew: "Gerbang ditutup pukul 23.00, penghuni masuk dengan akses kartu",
  occupancy: "Satu orang per kamar",
};

// [CONTOH] patokan dan jarak, WAJIB dicek ulang lewat Google Maps
export const landmarks = [
  { name: "Kampus Undip Tembalang", distance: "5 menit jalan kaki" },
  { name: "Jalan Banjarsari", distance: "Jalan utama sekitar" },
];

// [CONTOH] pertanyaan umum, jawabannya harus disesuaikan dengan aturan asli
export const faqs = [
  {
    q: "Kapan kost mulai dibuka?",
    a: "Kost masih dalam pembangunan. Hubungi kami lewat WhatsApp untuk info terbaru dan daftar tunggu.",
  },
  {
    q: "Apakah ada deposit?",
    a: "Ada. Besarnya dan syarat pengembaliannya tercantum di bagian aturan dan biaya.",
  },
  {
    q: "Boleh membawa tamu?",
    a: "Tamu boleh bertamu di ruang santai pada jam tertentu dan tidak boleh menginap.",
  },
  {
    q: "Apakah boleh membawa hewan peliharaan?",
    a: "Saat ini tidak diperbolehkan.",
  },
  {
    q: "Berapa minimal sewa?",
    a: "Tergantung paket. Rinciannya ada di halaman Paket.",
  },
];

// [CONTOH] pilihan durasi dan potongan harga, WAJIB diganti dengan kebijakan asli
export const durations = [
  { months: 1, label: "Bulanan", discountPercent: 0 },
  { months: 3, label: "3 bulan", discountPercent: 5 },
  { months: 6, label: "6 bulan", discountPercent: 10 },
  { months: 12, label: "12 bulan", discountPercent: 15 },
];

// [CONTOH] galeri. Kalau foto asli sudah ada, taruh file di folder public/galeri
// lalu isi src, misalnya "/galeri/kamar-classic.jpg". Selama src null, tampil placeholder.
export type GalleryItem = {
  id: string;
  category: string;
  caption: string;
  src: string | null;
};

export const galleryCategories = ["Kamar", "Area bersama", "Lingkungan"];

export const gallery: GalleryItem[] = [
   { id: "g1", category: "Kamar", caption: "Kamar Classic (ilustrasi)", src: "/galeri/kamar-classic.jpg" },
  { id: "g2", category: "Kamar", caption: "Kamar Deluxe (ilustrasi)", src: "/galeri/kamar-deluxe.jpg" },
  { id: "g3", category: "Kamar", caption: "Kamar Premier (ilustrasi)", src: "/galeri/kamar-premier.jpg" },
  { id: "g4", category: "Area bersama", caption: "Ruang santai", src: null },
  { id: "g5", category: "Area bersama", caption: "Dapur bersama", src: null },
  { id: "g6", category: "Area bersama", caption: "Teras dan taman", src: null },
  { id: "g7", category: "Lingkungan", caption: "Jalan menuju kost", src: null },
  { id: "g8", category: "Lingkungan", caption: "Sekitar kampus", src: null },
];

// Alamat website. Ganti dengan domain sendiri setelah dibeli.
export const siteUrl = "https://the-linen-house-theta.vercel.app";