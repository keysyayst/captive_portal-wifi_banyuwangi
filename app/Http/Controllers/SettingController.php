<?php

namespace App\Http\Controllers;

use App\Models\Announcement;
use App\Models\Setting;
use App\Models\Slider;
use App\Models\TickerItem;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingController extends Controller
{
    public function index(): Response
    {
        $loginMethod = Setting::firstOrCreate(
            ['key' => 'login_method'],
            ['value' => 'phone']
        );

        return Inertia::render('Dashboard/PortalSettings', [
            'currentMethod' => $loginMethod->value,
            'sliders' => Slider::latest()->get(),
            'portalContents' => Announcement::query()
                ->get(['id', 'message', 'is_active', 'sort_order'])
                ->map(fn (Announcement $item): array => [
                    'id' => 'announcement-'.$item->id,
                    'content_id' => $item->id,
                    'content_type' => 'announcement',
                    'message' => $item->message,
                    'display_location' => 'info',
                    'is_active' => $item->is_active,
                    'sort_order' => $item->sort_order,
                ])
                ->concat(TickerItem::query()->get(['id', 'message', 'display_location', 'is_active', 'sort_order'])
                    ->map(fn (TickerItem $item): array => [
                        'id' => 'ticker-'.$item->id,
                        'content_id' => $item->id,
                        'content_type' => 'ticker',
                        'message' => $item->message,
                        'display_location' => $item->display_location,
                        'is_active' => $item->is_active,
                        'sort_order' => $item->sort_order,
                    ]))
                ->sortBy(['sort_order', 'content_id'])
                ->values(),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $request->validate([
            'login_method' => 'required|in:phone,nik',
        ]);

        Setting::updateOrCreate(
            ['key' => 'login_method'],
            ['value' => $request->login_method]
        );

        return redirect()->back();
    }
}
