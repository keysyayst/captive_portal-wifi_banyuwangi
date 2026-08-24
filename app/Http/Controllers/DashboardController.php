<?php

namespace App\Http\Controllers;

use App\Models\Session as UserSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $today = Carbon::today();
        $weekAgo = Carbon::now()->subDays(7);
        $monthAgo = Carbon::now()->subDays(30);

        $stats = [
            'daily_users' => User::whereDate('last_login', $today)->count(),
            'weekly_users' => User::where('last_login', '>=', $weekAgo)->count(),
            'monthly_users' => User::where('last_login', '>=', $monthAgo)->count(),
            'total_users' => User::count(),
        ];

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

        return Inertia::render('Dashboard/Index', [
            'stats' => $stats,
            'locations' => $locationStats
        ]);
    }

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

        return Inertia::render('Dashboard/ActiveUsers', [
            'activeUsers' => $activeUsers
        ]);
    }

    public function loginHistory(Request $request): Response
    {
        $perPage = $request->query('per_page', 50);

        $history = UserSession::with(['device.user'])
            ->orderBy('login_time', 'desc')
            ->paginate($perPage)
            ->through(function ($session) {
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

        return Inertia::render('Dashboard/LoginHistory', [
            'history' => $history
        ]);
    }
public function apManagement(): Response
    {
        $accessPoints = \App\Models\AccessPoint::orderBy('status', 'desc')->get();

        return Inertia::render('Dashboard/ApManagement', [
            'accessPoints' => $accessPoints
        ]);
    }
}
