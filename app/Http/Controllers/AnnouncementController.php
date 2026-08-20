<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use Illuminate\Http\JsonResponse;

class AnnouncementController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json([
            'announcements' => Announcement::query()
                ->where('is_active', true)
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(['id', 'message']),
        ]);
    }
}
