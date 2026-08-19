<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConfigController extends Controller
{
    public function show()
    {
        return response()->json([
            'organization_name' => 'Pemerintah Kota Banyuwangi',
            'logo_url' => asset('images/logo.png'),
            'banner_url' => asset('images/banner.jpg'),
            'primary_color' => '#003366',
            'secondary_color' => '#FF6B35',
            'ssid' => 'BanyuwangiWiFi_Free',
        ]);
    }

    public function terms()
    {
        return response()->json([
            'terms' => '
                <h2>Syarat dan Ketentuan</h2>
                <p>Dengan login, Anda menyetujui:</p>
                <ul>
                    <li>Penggunaan WiFi publik sesuai peraturan</li>
                    <li>Tidak melakukan aktivitas ilegal</li>
                    <li>Data Anda akan dicatat untuk keperluan administrasi</li>
                </ul>
            ',
        ]);
    }
}