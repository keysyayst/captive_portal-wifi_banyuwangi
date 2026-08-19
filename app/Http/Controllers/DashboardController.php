<?php

namespace App\Http\Controllers;

use App\Models\Session as UserSession;
use App\Models\User;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function stats()
    {
        $today = Carbon::today();
        $weekAgo = Carbon::now()->subDays(7);
        $monthAgo = Carbon::now()->subDays(30);

        return response()->json([
            'daily_users' => User::whereDate('last_login', $today)->count(),
            'weekly_users' => User::where('last_login', '>=', $weekAgo)->count(),
            'monthly_users' => User::where('last_login', '>=', $monthAgo)->count(),
            'total_users' => User::count(),
        ]);
    }

    public function activeUsers()
    {
        $activeUsers = UserSession::whereNull('logout_time')
            ->with(['device.user'])
            ->orderBy('login_time', 'desc')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'phone_number' => $session->device->user->phone_number,
                    'device_type' => $session->device->device_type,
                    'ip_address' => $session->ip_address,
                    'access_point' => $session->access_point_location,
                    'login_time' => $session->login_time,
                    'duration_minutes' => $session->login_time->diffInMinutes(now()),
                ];
            });

        return response()->json($activeUsers);
    }

    public function loginHistory()
    {
        $history = UserSession::with(['device.user'])
            ->orderBy('login_time', 'desc')
            ->paginate(50)
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'phone_number' => $session->device->user->phone_number,
                    'login_time' => $session->login_time,
                    'logout_time' => $session->logout_time,
                    'duration_minutes' => $session->duration,
                    'ip_address' => $session->ip_address,
                    'status' => $session->authentication_status,
                ];
            });

        return response()->json($history);
    }

    public function locationStats()
    {
        $stats = UserSession::select('access_point_location')
            ->selectRaw('COUNT(*) as total_sessions')
            ->selectRaw('COUNT(DISTINCT device_id) as unique_users')
            ->groupBy('access_point_location')
            ->orderBy('total_sessions', 'desc')
            ->get();

        return response()->json($stats);
    }
}
