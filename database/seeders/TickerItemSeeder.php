<?php

namespace Database\Seeders;

use App\Models\TickerItem;
use Illuminate\Database\Seeder;

class TickerItemSeeder extends Seeder
{
    public function run(): void
    {
        TickerItem::query()->upsert([
            [
                'message' => 'Dapatkan kemudahan administrasi kependudukan dalam satu genggaman. Unduh Smart Kampung sekarang!',
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'message' => 'WiFi Gratis Banyuwangi - gunakan internet dengan bijak, aman, dan bertanggung jawab.',
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'message' => 'Jelajahi layanan publik Kabupaten Banyuwangi lewat menu Akses Cepat Layanan di bawah.',
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['message'], ['is_active', 'sort_order', 'updated_at']);
    }
}
