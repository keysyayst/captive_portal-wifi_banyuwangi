<?php

namespace App\Http\Controllers;

use App\Models\Session as UserSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats(): JsonResponse
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

    public function activeUsers(): JsonResponse
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

    public function loginHistory(Request $request): JsonResponse
    {
        $perPage = $request->query('per_page', 50);
        
        $history = UserSession::with(['device.user'])
            ->orderBy('login_time', 'desc')
            ->paginate($perPage);

        return response()->json([
            'data' => $history->map(function ($session) {
                return [
                    'id' => $session->id,
                    'phone_number' => $session->device->user->phone_number,
                    'device_type' => $session->device->device_type,
                    'mac_address' => $session->device->mac_address,
                    'ip_address' => $session->ip_address,
                    'access_point' => $session->access_point_location,
                    'login_time' => $session->login_time->format('Y-m-d H:i:s'),
                    'logout_time' => $session->logout_time?->format('Y-m-d H:i:s'),
                    'duration_minutes' => $session->duration ?? 0,
                    'status' => $session->authentication_status,
                ];
            }),
            'pagination' => [
                'current_page' => $history->currentPage(),
                'total' => $history->total(),
                'per_page' => $history->perPage(),
                'last_page' => $history->lastPage(),
            ],
        ]);
    }

    public function locationStats(): JsonResponse
    {
        $stats = UserSession::select('access_point_location')
            ->selectRaw('COUNT(*) as total_sessions')
            ->selectRaw('COUNT(DISTINCT device_id) as unique_users')
            ->selectRaw('SUM(duration) as total_minutes')
            ->whereNotNull('access_point_location')
            ->groupBy('access_point_location')
            ->orderBy('total_sessions', 'desc')
            ->get();

        return response()->json([
            'locations' => $stats->map(function ($stat) {
                return [
                    'access_point' => $stat->access_point_location,
                    'total_sessions' => $stat->total_sessions,
                    'unique_users' => $stat->unique_users,
                    'total_duration_hours' => round($stat->total_minutes / 60, 2),
                ];
            }),
            'summary' => [
                'total_locations' => $stats->count(),
                'total_sessions' => $stats->sum('total_sessions'),
                'total_unique_users' => $stats->sum('unique_users'),
            ],
        ]);
    }
}
