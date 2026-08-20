<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    /**
     * Render halaman login captive portal (Portal/Login.vue).
     * Router hotspot (Mikrotik/OpenWRT/pfSense) biasanya redirect ke sini
     * dengan query ?mac=...&ap=... — dibaca lalu diteruskan sebagai props.
     */
    public function show(Request $request): Response
    {
        return Inertia::render('Portal/Login', [
            'error' => $request->query('error'),
            'mac'   => $request->query('mac'),
            'ap'    => $request->query('ap'),
            'nik'   => $request->query('nik'),
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'phone_number'          => 'required|string',
            'otp'                   => 'required|digits:6',
            'mac_address'           => 'nullable|string',
            'device_type'           => 'nullable|string',
            'access_point_location' => 'nullable|string',
            'terms_agreed'          => 'required|boolean',
        ]);

        if (! $validated['terms_agreed']) {
            return response()->json([
                'message' => 'Anda harus menyetujui syarat dan ketentuan',
            ], 422);
        }

        // TODO: verifikasi $validated['otp'] terhadap kode yang benar-benar
        // dikirim lewat endpoint /otp/send, sebelum mempercayai ini sebagai
        // login yang sah. Saat ini OTP belum benar-benar dicek di sini.

        // Ambil IP asli client di belakang proxy/router hotspot kalau ada.
        $ipAddress = $request->header('X-Forwarded-For', $request->ip());

        // Kalau tidak diakses lewat redirect router hotspot asli, mac_address
        // bisa kosong (browser tidak boleh baca MAC address perangkat). Fallback
        // biar tetap bisa dites, tapi ganti jadi wajib lagi begitu sudah live.
        $macAddress = $validated['mac_address'] ?? 'unknown-' . $ipAddress;

        // Cari atau buat user
        $user = User::firstOrCreate(
            ['phone_number' => $validated['phone_number']],
            ['status' => 'active']
        );

        // Cari atau buat device
        $device = Device::firstOrCreate(
            ['mac_address' => $macAddress],
            [
                'user_id'     => $user->id,
                'device_type' => $validated['device_type'] ?? 'unknown',
            ]
        );

        // Buat session login
        $session = $device->sessions()->create([
            'ip_address'             => $ipAddress,
            'access_point_location'  => $validated['access_point_location'],
            'login_time'             => now(),
            'authentication_status'  => 'success',
        ]);

        // Generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Update last login
        $user->update(['last_login' => now()]);

        return response()->json([
            'message' => 'Login berhasil',
            'token'   => $token,
            'user'    => $user,
            // Kalau kamu pakai dashboard internal (Portal/Welcome.vue), arahkan
            // ke situ. Kalau mau langsung ke situs luar, isi config('portal.redirect_url').
            'redirect_url' => config('portal.redirect_url') ?? route('portal.welcome', [
                'phone' => $user->phone_number,
                'ap'    => $session->access_point_location,
            ]),
        ]);
    }

    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        $lastSession = $user->sessions()
            ->whereNull('logout_time')
            ->latest('login_time')
            ->first();

        if ($lastSession) {
            $duration = $lastSession->login_time->diffInMinutes(now());

            $lastSession->update([
                'logout_time' => now(),
                'duration'    => $duration,
            ]);
        }

        $user->currentAccessToken()->delete();

        return response()->json([
            'message'          => 'Logout berhasil',
            'session_duration' => $lastSession?->duration ?? 0,
        ]);
    }

    /**
     * Render halaman "connected" (Portal/Welcome.vue) setelah login sukses —
     * dipakai kalau redirect_url mengarah ke dashboard internal, bukan situs luar.
     */
    public function welcome(Request $request): Response
    {
        return Inertia::render('Portal/Welcome', [
            'phone' => $request->query('phone'),
            'ap'    => $request->query('ap'),
        ]);
    }
}
