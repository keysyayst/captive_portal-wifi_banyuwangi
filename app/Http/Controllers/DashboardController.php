<?php

namespace App\Http\Controllers;

use App\Models\Session as UserSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response; // Ganti JsonResponse dengan Response dari Inertia

class DashboardController extends Controller
{
    // 1. Halaman Utama Dashboard (Gabungan stats & locationStats)
    public function index(): Response
    {
        $today = Carbon::today();
        $weekAgo = Carbon::now()->subDays(7);
        $monthAgo = Carbon::now()->subDays(30);

        // Ambil statistik user
        $stats = [
            'daily_users' => User::whereDate('last_login', $today)->count(),
            'weekly_users' => User::where('last_login', '>=', $weekAgo)->count(),
            'monthly_users' => User::where('last_login', '>=', $monthAgo)->count(),
            'total_users' => User::count(),
        ];

        // Ambil statistik lokasi AP
        $locationStats = UserSession::select('access_point_location')
            ->selectRaw('COUNT(*) as total_sessions')
            ->selectRaw('COUNT(DISTINCT device_id) as unique_users')
            ->selectRaw('SUM(duration) as total_minutes')
            ->whereNotNull('access_point_location')
            ->groupBy('access_point_location')
            ->orderBy('total_sessions', 'desc')
            ->get()
            ->map(function ($stat) {
                return [
                    'access_point' => $stat->access_point_location,
                    'total_sessions' => $stat->total_sessions,
                    'unique_users' => $stat->unique_users,
                    'total_duration_hours' => round($stat->total_minutes / 60, 2),
                ];
            });

        // Lempar data ke halaman Dashboard/Index.vue
        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'locations' => $locationStats
        ]);
    }

    // 2. Halaman User Aktif
    public function activeUsers(): Response
    {
        $activeUsers = UserSession::whereNull('logout_time')
            ->with(['device.user'])
            ->orderBy('login_time', 'desc')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'phone_number' => $session->device->user->phone_number ?? '-',
                    'device_type' => $session->device->device_type ?? 'Unknown',
                    'ip_address' => $session->ip_address,
                    'access_point' => $session->access_point_location,
                    'login_time' => $session->login_time->format('Y-m-d H:i:s'),
                    'duration_minutes' => $session->login_time->diffInMinutes(now()),
                ];
            });

        // Lempar data ke halaman Dashboard/ActiveUsers.vue
        return Inertia::render('Dashboard/ActiveUsers', [
            'activeUsers' => $activeUsers
        ]);
    }

    // 3. Halaman Riwayat Login (Dengan Pagination)
    public function loginHistory(Request $request): Response
    {
        $perPage = $request->query('per_page', 50);

        $history = UserSession::with(['device.user'])
            ->orderBy('login_time', 'desc')
            ->paginate($perPage)
            ->through(function ($session) { // gunakan through() untuk memetakan data pagination di Laravel
                return [
                    'id' => $session->id,
                    'phone_number' => $session->device->user->phone_number ?? '-',
                    'device_type' => $session->device->device_type ?? 'Unknown',
                    'mac_address' => $session->device->mac_address ?? '-',
                    'ip_address' => $session->ip_address,
                    'access_point' => $session->access_point_location,
                    'login_time' => $session->login_time->format('Y-m-d H:i:s'),
                    'logout_time' => $session->logout_time?->format('Y-m-d H:i:s'),
                    'duration_minutes' => $session->duration ?? 0,
                    'status' => $session->authentication_status,
                ];
            });

        // Lempar data ke halaman Dashboard/LoginHistory.vue
        return Inertia::render('Dashboard/LoginHistory', [
            'history' => $history
        ]);
    }
}
