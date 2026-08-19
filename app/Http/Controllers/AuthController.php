<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    public function login(Request $request): JsonResponse
    {
        // Validasi input
        $validated = $request->validate([
            'phone_number' => 'required|string',
            'mac_address' => 'required|string',
            'device_type' => 'nullable|string',
            'ip_address' => 'required|string',
            'access_point_location' => 'nullable|string',
            'terms_agreed' => 'required|boolean',
        ]);

        if (! $validated['terms_agreed']) {
            return response()->json([
                'message' => 'Anda harus menyetujui syarat dan ketentuan',
            ], 422);
        }

        // Cari atau buat user
        $user = User::firstOrCreate(
            ['phone_number' => $validated['phone_number']],
            ['status' => 'active']
        );

        // Cari atau buat device
        $device = Device::firstOrCreate(
            ['mac_address' => $validated['mac_address']],
            [
                'user_id' => $user->id,
                'device_type' => $validated['device_type'] ?? 'unknown',
            ]
        );

        // Buat session login
        $session = $device->sessions()->create([
            'ip_address' => $validated['ip_address'],
            'access_point_location' => $validated['access_point_location'],
            'login_time' => now(),
            'authentication_status' => 'success',
        ]);

        // Generate token
        $token = $user->createToken('auth_token')->plainTextToken;

        // Update last login
        $user->update(['last_login' => now()]);

        return response()->json([
            'message' => 'Login berhasil',
            'token' => $token,
            'user' => $user,
            'redirect_url' => config('portal.redirect_url', 'https://banyuwangi.go.id'),
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
                'duration' => $duration,
            ]);
        }

        $user->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout berhasil',
            'session_duration' => $lastSession?->duration ?? 0,
        ]);
    }
}
