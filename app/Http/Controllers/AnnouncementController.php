<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\TickerItem;
use Illuminate\Http\JsonResponse;

class AnnouncementController extends Controller
{
    /**
     * Display active announcements (Public API for portal)
     */
    public function index(): JsonResponse
    {
        $announcements = Announcement::query()
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'message']);

        $infoTickers = TickerItem::query()
            ->where('display_location', 'info')
            ->where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get(['id', 'message'])
            ->map(fn (TickerItem $tickerItem): array => [
                'id' => 'ticker-'.$tickerItem->id,
                'message' => $tickerItem->message,
            ]);

        return response()->json([
            'announcements' => $announcements->concat($infoTickers)->values(),
        ]);
    }
}
