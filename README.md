# Captive Portal WiFi Banyuwangi

Sistem captive portal WiFi berbasis Laravel + Vue + Inertia yang digunakan untuk autentikasi pengguna, manajemen akses jaringan, serta monitoring penggunaan koneksi internet. Aplikasi ini didesain untuk kebutuhan portal login WiFi yang memudahkan pengguna masuk dengan metode login berdasarkan nomor HP atau NIK, sambil terintegrasi dengan FreeRADIUS untuk otorisasi akses jaringan.

## Ringkasan Proyek

Proyek ini menggabungkan beberapa komponen berikut:

- Portal login publik untuk pengguna WiFi
- Autentikasi pengguna dengan opsi login via nomor HP atau NIK
- Integrasi dengan FreeRADIUS untuk authorization/deauthorization user
- Dashboard admin untuk melihat pengguna aktif, riwayat login, dan statistik lokasi
- Manajemen Access Point, slider, dan konten portal
- Konfigurasi portal dan mode autentikasi yang bisa diatur dari admin
- Dukungan Docker untuk MySQL dan FreeRADIUS

## Teknologi yang Digunakan

- Laravel 13
- PHP 8.3+
- Vue 3
- Inertia.js
- Tailwind CSS
- MySQL
- FreeRADIUS
- Docker Compose
- Pest untuk testing

## Fitur Utama

### 1. Portal Login
- Halaman portal untuk user login ke jaringan WiFi
- Dukungan login berdasarkan nomor HP atau NIK
- Persetujuan syarat dan ketentuan sebelum login
- Integrasi dengan metadata perangkat seperti MAC address, tipe perangkat, dan lokasi access point

### 2. Manajemen Akses RADIUS
- User yang berhasil login akan diproses untuk otorisasi ke RADIUS
- User logout akan dihapus dari akses RADIUS
- Mendukung mode `mock` dan konfigurasi RADIUS sesuai lingkungan

### 3. Dashboard Admin
- Statistik pengguna harian, mingguan, bulanan
- Ringkasan user aktif
- Riwayat login dengan pencarian dan filter tanggal
- Ekspor data login ke CSV
- Manajemen access point

### 4. Pengaturan Portal
- Pilihan metode login (`phone` atau `nik`)
- Slider sebelum dan sesudah login
- Teks pengumuman dan ticker portal
- Pengaturan portal yang bisa dikontrol dari dashboard

### 5. Integrasi Docker
- Container untuk aplikasi Laravel
- Container MySQL
- Container FreeRADIUS
- Konfigurasi jaringan internal dan volume database yang aman

## Struktur Folder Utama

```bash
.
├── app/
│   ├── Console/
│   ├── Http/
│   ├── Models/
│   ├── Providers/
│   └── Services/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   └── seeders/
├── docker/
│   └── freeradius/
├── public/
├── resources/
│   ├── css/
│   ├── js/
│   └── views/
├── routes/
├── storage/
├── tests/
├── .env.example
├── composer.json
├── package.json
├── docker-compose.yml
├── vite.config.ts
├── artisan
├── phpunit.xml
├── README.md
└── ...
```

## Persyaratan Sistem

Sebelum menjalankan aplikasi, pastikan perangkat Anda sudah memiliki:

- PHP 8.3+
- Composer
- Node.js dan npm
- MySQL
- Docker dan Docker Compose (opsional, untuk menjalankan stack lengkap)

## Setup Local

### 1. Clone repository

```bash
git clone <repository-url>
cd captive_portal-wifi_banyuwangi
```

### 2. Install dependency PHP

```bash
composer install
```

### 3. Install dependency frontend

```bash
npm install
```

### 4. Salin file environment

```bash
cp .env.example .env
```

Lalu sesuaikan konfigurasi database dan aplikasi di file `.env`.

### 5. Generate application key

```bash
php artisan key:generate
```

### 6. Jalankan migrasi database

```bash
php artisan migrate
```

### 7. Build frontend assets

```bash
npm run build
```

### 8. Jalankan aplikasi

Mode pengembangan:

```bash
php artisan serve
```

Atau gunakan stack Laravel + Vite sekaligus:

```bash
composer run dev
```

## Setup dengan Docker

Project ini sudah mencakup konfigurasi Docker Compose untuk menjalankan:

- aplikasi Laravel
- database MySQL
- FreeRADIUS

Jalankan perintah berikut:

```bash
docker compose up --build -d
```

Untuk melihat log:

```bash
docker compose logs -f
```

Pastikan variabel environment yang dibutuhkan sudah diisi pada `.env` atau environment shell Anda, terutama:

```bash
MYSQL_DATABASE=your_database_name
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_secure_password
MYSQL_ROOT_PASSWORD=your_root_password
RADIUS_MODE=mock
RADIUS_NAS_SECRET=your_shared_secret
```

## Environment Variables Penting

Beberapa variabel yang umum digunakan:

```bash
APP_NAME=YourAppName
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=your_database_name
DB_USERNAME=your_db_user
DB_PASSWORD=your_db_password

RADIUS_MODE=mock
RADIUS_NAS_SECRET=your_shared_secret
RADIUS_SESSION_TIMEOUT=3600
RADIUS_DEFAULT_GROUP=users
```

## Perintah Umum

### Jalankan test

```bash
php artisan test
```

### Jalankan formatter PHP

```bash
./vendor/bin/pint
```

### Jalankan pengecekan TypeScript/ESLint

```bash
npm run lint:check
npm run types:check
```

## Catatan Arsitektur

Aplikasi ini menggunakan pola Laravel modern dengan:

- Controller berbasis route
- Model Eloquent untuk data pengguna, session, dan AP
- Inertia untuk rendering halaman SPA yang tetap berbasis server-side routing
- Vue untuk komponen frontend interaktif
- FreeRADIUS integration untuk kontrol akses layer network

## Lisensi

Proyek ini menggunakan lisensi MIT. Silakan sesuaikan lisensi jika akan dipublikasikan secara komersial atau internal organisasi.

## Kontributor

Jika Anda ingin mengembangkan lebih lanjut, proyek ini terbuka untuk dikembangkan dan disesuaikan kebutuhan organisasi atau instansi WiFi publik.

---

Untuk kebutuhan publikasi GitHub, README ini bisa dipakai sebagai dokumentasi utama untuk menjelaskan tujuan project, stack teknologi, installasi, dan cara menjalankan aplikasi dengan cepat.
