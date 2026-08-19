<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Device;
use App\Models\Session;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Create 10 test users
        for ($i = 1; $i <= 10; $i++) {
            $user = User::create([
                'phone_number' => '0812345678' . str_pad($i, 2, '0', STR_PAD_LEFT),
                'name' => "User $i",
                'status' => 'active',
                'last_login' => now()->subHours(rand(1, 48)),
            ]);

            // Create 1-3 devices per user
            for ($j = 1; $j <= rand(1, 3); $j++) {
                $device = Device::create([
                    'user_id' => $user->id,
                    'mac_address' => strtoupper(fake()->macAddress()),
                    'device_type' => fake()->randomElement(['iPhone', 'Android', 'Laptop', 'Tablet']),
                ]);

                // Create 2-5 sessions per device
                for ($k = 1; $k <= rand(2, 5); $k++) {
                    $loginTime = now()->subDays(rand(0, 29))->subHours(rand(0, 23));
                    $logoutTime = $loginTime->clone()->addMinutes(rand(5, 120));

                    Session::create([
                        'device_id' => $device->id,
                        'ip_address' => fake()->ipv4(),
                        'access_point_location' => fake()->randomElement(['Gedung A', 'Gedung B', 'Gedung C', 'Taman Kota']),
                        'login_time' => $loginTime,
                        'logout_time' => $logoutTime,
                        'duration' => $loginTime->diffInMinutes($logoutTime),
                        'authentication_status' => 'success',
                    ]);
                }
            }
        }
    }
}