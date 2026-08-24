<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\PortalConfig;
use App\Models\AccessPoint;

class PortalConfigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $defaultConfig = PortalConfig::create([
            'name' => 'Default Config',
            'organization_name' => 'Pemerintah Kabupaten Banyuwangi',
            'logo_url' => asset('images/logo.png'), // Asumsi gambar logo ada di public/images
            'banner_url' => asset('images/banner.jpg'),
            'primary_color' => '#003366',
            'secondary_color' => '#FF6B35',
            'terms_text' => '
                <h2>Syarat dan Ketentuan Penggunaan Layanan WiFi Publik</h2>
                <p>Selamat datang di layanan WiFi Publik Pemerintah Kabupaten Banyuwangi. Dengan mengakses dan menggunakan layanan ini, Anda menyatakan setuju untuk tunduk pada seluruh syarat dan ketentuan berikut:</p>
                
                <h3>1. Penggunaan Layanan</h3>
                <ul>
                    <li>Layanan ini disediakan gratis untuk keperluan akses informasi, pendidikan, dan komunikasi yang positif.</li>
                    <li>Kualitas, kecepatan, dan ketersediaan koneksi dapat bervariasi bergantung pada lokasi, jumlah pengguna, dan kondisi teknis jaringan.</li>
                </ul>

                <h3>2. Kewajiban Pengguna</h3>
                <p>Pengguna dilarang keras menggunakan jaringan ini untuk:</p>
                <ul>
                    <li>Mengakses, mengunduh, atau menyebarkan konten yang melanggar hukum, asusila, atau terkait perjudian.</li>
                    <li>Melakukan peretasan (hacking), penyebaran malware/virus, spamming, atau tindakan siber berbahaya lainnya.</li>
                    <li>Melakukan tindakan yang dapat membebani, merusak, atau mengganggu infrastruktur jaringan.</li>
                </ul>

                <h3>3. Privasi dan Pencatatan Data</h3>
                <ul>
                    <li>Untuk keperluan keamanan dan administrasi, sistem kami mencatat data teknis Anda seperti Nomor HP, Alamat IP, MAC Address, lokasi akses, serta waktu dan durasi penggunaan.</li>
                    <li>Data ini bersifat rahasia dan hanya digunakan untuk evaluasi layanan atau keperluan penegakan hukum bila diperlukan.</li>
                </ul>

                <h3>4. Pembatasan Tanggung Jawab</h3>
                <ul>
                    <li>Pemerintah Kabupaten Banyuwangi tidak bertanggung jawab atas kehilangan, kerusakan data, pencurian identitas, atau kerugian finansial yang diakibatkan oleh penggunaan jaringan ini (misal: saat bertransaksi perbankan tanpa perlindungan VPN/enkripsi yang memadai).</li>
                    <li>Pengguna bertanggung jawab penuh atas segala aktivitas dan transaksi yang dilakukan melalui layanan WiFi ini.</li>
                </ul>

                <h3>5. Sanksi Pelanggaran</h3>
                <p>Penyedia layanan berhak memutus koneksi dan memblokir akses pengguna secara permanen tanpa pemberitahuan sebelumnya apabila ditemukan adanya pelanggaran terhadap syarat dan ketentuan ini.</p>
                
                <p><strong>Dengan melanjutkan proses login, Anda mengonfirmasi bahwa Anda telah membaca, memahami, dan menyetujui seluruh ketentuan di atas.</strong></p>
            ',
            'is_default' => true,
        ]);

        $kantorPelayananConfig = PortalConfig::create([
            'name' => 'Kantor Pelayanan Publik Banyuwangi',
            'organization_name' => 'Kantor Pelayanan Publik Kabupaten Banyuwangi',
            'logo_url' => asset('images/logo.png'),
            'banner_url' => asset('images/banner.jpg'),
            'primary_color' => '#10B981', // Emerald green
            'secondary_color' => '#3B82F6', // Blue
            'terms_text' => '
                <h2>Syarat dan Ketentuan WiFi Kantor Pelayanan Publik</h2>
                <p>Selamat datang di layanan WiFi Kantor Pelayanan Publik. Dengan mengakses layanan ini, Anda setuju:</p>
                <ul>
                    <li>Digunakan untuk keperluan layanan administrasi dan akses informasi publik.</li>
                    <li>Menjaga keamanan akun serta tidak menyalahgunakan akses jaringan.</li>
                </ul>
            ',
            'is_default' => false,
        ]);

        // Buat dummy access point untuk kantor pelayanan publik
        AccessPoint::create([
            'name' => 'Ruang Layanan Publik',
            'mac_address' => 'AA:BB:CC:DD:EE:FF',
            'location' => 'Lantai 1 Kantor Pelayanan Publik',
            'status' => 'Online',
            'portal_config_id' => $kantorPelayananConfig->id,
        ]);
    }
}
