<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Device;
use App\Models\Session;
use Illuminate\Database\Seeder;

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
                    'mac_address' => sprintf('02:00:00:%02X:%02X:%02X', random_int(0, 255), random_int(0, 255), random_int(0, 255)),
                    'device_type' => ['iPhone', 'Android', 'Laptop', 'Tablet'][array_rand(['iPhone', 'Android', 'Laptop', 'Tablet'])],
                ]);

                // Create 2-5 sessions per device
                for ($k = 1; $k <= rand(2, 5); $k++) {
                    $isActive = $i <= 3 && $j === 1 && $k === 1;
                    $loginTime = $isActive
                        ? now()->subMinutes(rand(5, 45))
                        : now()->subDays(rand(0, 29))->subHours(rand(0, 23));
                    $logoutTime = $isActive ? null : $loginTime->clone()->addMinutes(rand(5, 120));

                    Session::create([
                        'device_id' => $device->id,
                        'ip_address' => sprintf('192.168.%d.%d', random_int(0, 255), random_int(1, 254)),
                        'access_point_location' => ['Gedung A', 'Gedung B', 'Gedung C', 'Taman Kota'][array_rand(['Gedung A', 'Gedung B', 'Gedung C', 'Taman Kota'])],
                        'login_time' => $loginTime,
                        'logout_time' => $logoutTime,
                        'duration' => $isActive ? null : $loginTime->diffInMinutes($logoutTime),
                        'authentication_status' => 'success',
                    ]);
                }
            }
        }
    }
}