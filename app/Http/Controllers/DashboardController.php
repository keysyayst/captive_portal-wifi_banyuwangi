<?php

namespace App\Http\Controllers;

use App\Models\AccessPoint;
use App\Models\Session as UserSession;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response as ResponseFacade;
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
            'locations' => $locationStats,
        ]);
    }

    public function activeUsers(Request $request): Response
    {
        $search = $request->query('search', '');
        $query = UserSession::whereNull('logout_time')->with(['device.user']);

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('device.user', function ($userQuery) use ($search) {
                    $userQuery->where(function ($identityQuery) use ($search) {
                        $identityQuery->where('phone_number', 'like', "%{$search}%")
                            ->orWhere('nik', 'like', "%{$search}%");
                    });
                })
                    ->orWhereHas('device', function ($deviceQuery) use ($search) {
                        $deviceQuery->where('mac_address', 'like', "%{$search}%");
                    })
                    ->orWhere('access_point_location', 'like', "%{$search}%");
            });
        }

        $activeUsers = $query->orderBy('login_time', 'desc')
            ->get()
            ->map(function ($session) {
                return [
                    'id' => $session->id,
                    'phone_number' => $session->device->user->phone_number ?? $session->device->user->nik ?? '-',
                    'device_type' => $session->device->device_type ?? 'Unknown',
                    'mac_address' => $session->device->mac_address ?? '-',
                    'ip_address' => $session->ip_address,
                    'access_point' => $session->access_point_location,
                    'login_time' => $session->login_time->format('Y-m-d H:i:s'),
                    'duration_minutes' => $session->login_time->diffInMinutes(now()),
                ];
            });

        return Inertia::render('Dashboard/ActiveUsers', [
            'activeUsers' => $activeUsers,
            'search' => $search,
        ]);
    }

    public function loginHistory(Request $request): Response
    {
        $perPage = $request->query('per_page', 50);
        $search = $request->query('search', '');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = UserSession::with(['device.user']);

        // Apply search filter
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('device.user', function ($userQuery) use ($search) {
                    $userQuery->where(function ($identityQuery) use ($search) {
                        $identityQuery->where('phone_number', 'like', "%{$search}%")
                            ->orWhere('nik', 'like', "%{$search}%");
                    });
                })
                    ->orWhereHas('device', function ($deviceQuery) use ($search) {
                        $deviceQuery->where('mac_address', 'like', "%{$search}%");
                    })
                    ->orWhere('access_point_location', 'like', "%{$search}%");
            });
        }

        // Apply date range filter
        if ($startDate) {
            $query->whereDate('login_time', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('login_time', '<=', $endDate);
        }

        $history = $query->orderBy('login_time', 'desc')
            ->paginate($perPage)
            ->through(function ($session) {
                return [
                    'id' => $session->id,
                    'phone_number' => $session->device->user->phone_number ?? $session->device->user->nik ?? '-',
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
            'history' => $history,
            'search' => $search,
            'startDate' => $startDate,
            'endDate' => $endDate,
        ]);
    }

    public function exportLoginHistory(Request $request): mixed
    {
        $search = $request->query('search', '');
        $startDate = $request->query('start_date');
        $endDate = $request->query('end_date');

        $query = UserSession::with(['device.user']);

        // Apply same filters as loginHistory
        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->whereHas('device.user', function ($userQuery) use ($search) {
                    $userQuery->where(function ($identityQuery) use ($search) {
                        $identityQuery->where('phone_number', 'like', "%{$search}%")
                            ->orWhere('nik', 'like', "%{$search}%");
                    });
                })
                    ->orWhereHas('device', function ($deviceQuery) use ($search) {
                        $deviceQuery->where('mac_address', 'like', "%{$search}%");
                    })
                    ->orWhere('access_point_location', 'like', "%{$search}%");
            });
        }

        if ($startDate) {
            $query->whereDate('login_time', '>=', $startDate);
        }
        if ($endDate) {
            $query->whereDate('login_time', '<=', $endDate);
        }

        $records = $query->orderBy('login_time', 'desc')->get();

        // Generate CSV
        $filename = 'login_history_'.date('Y-m-d_H-i-s').'.csv';
        $headers = [
            'Content-Type' => 'text/csv; charset=utf-8',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        $callback = function () use ($records) {
            $file = fopen('php://output', 'w');
            fputcsv($file, [
                'Phone Number',
                'Device Type',
                'MAC Address',
                'IP Address',
                'Access Point',
                'Login Time',
                'Logout Time',
                'Duration (Minutes)',
                'Status',
            ]);

            foreach ($records as $session) {
                fputcsv($file, [
                    $session->device->user->phone_number ?? $session->device->user->nik ?? '-',
                    $session->device->device_type ?? 'Unknown',
                    $session->device->mac_address ?? '-',
                    $session->ip_address,
                    $session->access_point_location,
                    $session->login_time->format('Y-m-d H:i:s'),
                    $session->logout_time?->format('Y-m-d H:i:s') ?? '-',
                    $session->duration ?? 0,
                    $session->authentication_status,
                ]);
            }

            fclose($file);
        };

        return ResponseFacade::stream($callback, 200, $headers);
    }

    public function apManagement(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();

        $accessPoints = AccessPoint::query()
            ->select([
                'id',
                'name',
                'ip_address',
                'mac_address',
                'location',
                'status',
            ])
            ->when($search !== '', function ($query) use ($search) {
                $query->where(function ($searchQuery) use ($search) {
                    $searchQuery
                        ->where('name', 'like', "%{$search}%")
                        ->orWhere('ip_address', 'like', "%{$search}%")
                        ->orWhere('mac_address', 'like', "%{$search}%")
                        ->orWhere('location', 'like', "%{$search}%");
                });
            })
            ->orderBy('status', 'desc')
            ->orderBy('name')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Dashboard/ApManagement', [
            'accessPoints' => $accessPoints,
            'search' => $search,
        ]);
    }
}
