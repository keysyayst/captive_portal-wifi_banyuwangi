<?php

namespace Database\Seeders;

use App\Models\Announcement;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        Announcement::query()->upsert([
            [
                'message' => 'Pemkab Banyuwangi mengimbau warga memanfaatkan layanan Smart Kampung untuk administrasi kependudukan.',
                'is_active' => true,
                'sort_order' => 1,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'message' => 'Pendaftaran Banyuwangi Festival 2026 sudah dibuka — cek jadwal lengkap di Portal Layanan.',
                'is_active' => true,
                'sort_order' => 2,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'message' => 'Gunakan internet dengan bijak, aman, dan bertanggung jawab.',
                'is_active' => true,
                'sort_order' => 3,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ], ['message'], ['is_active', 'sort_order', 'updated_at']);

        User::firstOrCreate(
            ['phone_number' => '+6281234567890'],
            ['name' => 'Test User']
        );
    }
}
