<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAnnouncementRequest;
use App\Http\Requests\UpdateAnnouncementRequest;
use App\Models\Announcement;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AnnouncementController extends Controller
{
    /**
     * Display active announcements (Public API for portal)
     */
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

    /**
     * Display dashboard page for managing announcements
     */
    public function dashboard(): Response
    {
        return Inertia::render('Dashboard/Announcements', [
            'announcements' => Announcement::query()
                ->orderBy('sort_order')
                ->orderBy('id')
                ->get(['id', 'message', 'is_active', 'sort_order', 'created_at']),
        ]);
    }

    /**
     * Store a newly created announcement
     */
    public function store(StoreAnnouncementRequest $request): RedirectResponse
    {
        $sortOrder = $request->input('sort_order') ?? (Announcement::max('sort_order') ?? 0) + 1;

        Announcement::create([
            'message' => $request->validated('message'),
            'is_active' => $request->boolean('is_active', false),
            'sort_order' => $sortOrder,
        ]);

        return redirect()->route('dashboard.announcements.dashboard')
            ->with('success', 'Pengumuman berhasil ditambahkan.');
    }

    /**
     * Update the specified announcement
     */
    public function update(UpdateAnnouncementRequest $request, Announcement $announcement): RedirectResponse
    {
        $announcement->update([
            'message' => $request->validated('message'),
            'is_active' => $request->boolean('is_active', false),
            'sort_order' => $request->input('sort_order', $announcement->sort_order),
        ]);

        return redirect()->route('dashboard.announcements.dashboard')
            ->with('success', 'Pengumuman berhasil diperbarui.');
    }

    /**
     * Delete the specified announcement
     */
    public function destroy(Announcement $announcement): RedirectResponse
    {
        $announcement->delete();

        return redirect()->route('dashboard.announcements.dashboard')
            ->with('success', 'Pengumuman berhasil dihapus.');
    }
}
