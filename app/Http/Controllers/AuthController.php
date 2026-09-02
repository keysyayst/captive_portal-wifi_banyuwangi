<?php

namespace App\Http\Controllers;

use App\Models\Device;
use App\Models\Slider;
use App\Models\User;
use App\Services\RadiusService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthController extends Controller
{
    public function __construct(private readonly RadiusService $radiusService) {}

    public function show(Request $request): Response
    {
        return Inertia::render('Portal/Login', [
            'error' => $request->query('error'),
            'mac' => $request->query('mac') ?? $request->query('usermac'),
            'ap' => $request->query('ap') ?? $request->query('apmac'),
            'nik' => $request->query('nik'),
            'sliders' => Slider::where('type', 'before_login')->latest()->get(['id', 'image_path', 'type']),
        ]);
    }

    public function login(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'phone_number' => 'nullable|string',
                'nik' => 'nullable|string|digits:16',
                'otp' => 'nullable|string',
                'mac_address' => 'nullable|string',
                'device_type' => 'nullable|string',
                'access_point_location' => 'nullable|string',
                'terms_agreed' => 'required|boolean',
            ]);

            // Ensure at least phone_number or nik is provided
            if (empty($validated['phone_number']) && empty($validated['nik'])) {
                return response()->json([
                    'message' => 'Nomor HP atau NIK harus diisi',
                ], 422);
            }

            if (! $validated['terms_agreed']) {
                return response()->json([
                    'message' => 'Anda harus menyetujui syarat dan ketentuan',
                ], 422);
            }

            $ipAddress = $request->header('X-Forwarded-For', $request->ip());

            // Create/find user based on login method
            if (! empty($validated['nik'])) {
                $user = User::firstOrCreate(
                    ['nik' => $validated['nik']],
                    ['status' => 'active']
                );
            } else {
                $user = User::firstOrCreate(
                    ['phone_number' => $validated['phone_number']],
                    ['status' => 'active']
                );
            }

            $macAddress = $validated['mac_address'] ?? null;
            if (empty($macAddress) || $macAddress === '00:00:00:00:00:00') {
                $macAddress = 'portal-'.$user->id.'-'.$ipAddress;
            }

            $device = Device::firstOrCreate(
                ['mac_address' => $macAddress],
                [
                    'user_id' => $user->id,
                    'device_type' => $validated['device_type'] ?? 'unknown',
                ]
            );

            if (! $this->radiusService->authorizeUser($user, $device)) {
                return response()->json([
                    'message' => 'Login gagal: provisioning RADIUS tidak berhasil',
                ], 503);
            }

            $session = $device->sessions()->create([
                'ip_address' => $ipAddress,
                'access_point_location' => $validated['access_point_location'],
                'login_time' => now(),
                'authentication_status' => 'success',
            ]);

            $token = $user->createToken('auth_token')->plainTextToken;

            $user->update(['last_login' => now()]);

            return response()->json([
                'message' => 'Login berhasil',
                'token' => $token,
                'user' => $user,

                'redirect_url' => config('portal.redirect_url') ?? route('portal.welcome', [
                    'phone' => $user->phone_number ?? $user->nik,
                    'ap' => $session->access_point_location,
                ]),
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validasi gagal: '.implode(', ', $e->errors()['nik'] ?? $e->errors()['phone_number'] ?? $e->errors()['terms_agreed'] ?? []),
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Login gagal: '.$e->getMessage(),
            ], 500);
        }
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

        // Deauthorize user dari FreeRADIUS (hapus dari radcheck/radreply/radusergroup).
        $this->radiusService->deauthorizeUser($user);

        return response()->json([
            'message' => 'Logout berhasil',
            'session_duration' => $lastSession?->duration ?? 0,
        ]);
    }

    public function welcome(Request $request): Response
    {
        return Inertia::render('Portal/Welcome', [
            'phone' => $request->query('phone'),
            'ap' => $request->query('ap'),
            'sliders' => Slider::where('type', 'after_login')->latest()->get(['id', 'image_path', 'type']),
        ]);
    }
}
