<?php

namespace App\Http\Controllers;

use App\Http\Requests\PortalContentRequest;
use App\Models\Announcement;
use App\Models\TickerItem;
use Illuminate\Http\RedirectResponse;

class PortalContentController extends Controller
{
    public function store(PortalContentRequest $request): RedirectResponse
    {
        $validated = $request->validated();
        $modelClass = $validated['content_type'] === 'ticker' ? TickerItem::class : Announcement::class;

        $modelClass::query()->create([
            'message' => $validated['message'],
            'is_active' => $request->boolean('is_active'),
            'sort_order' => $validated['sort_order'] ?? 0,
            ...($validated['content_type'] === 'ticker' ? ['display_location' => $validated['display_location']] : []),
        ]);

        return redirect()->route('dashboard.settings.index')
            ->with('success', 'Teks portal berhasil ditambahkan.');
    }

    public function update(PortalContentRequest $request, string $contentType, int $content): RedirectResponse
    {
        $contentModel = $this->findContent($contentType, $content);
        $validated = $request->validated();

        $contentModel->update([
            'message' => $validated['message'] ?? $contentModel->message,
            'is_active' => $request->has('is_active') ? $request->boolean('is_active') : $contentModel->is_active,
            'sort_order' => $validated['sort_order'] ?? $contentModel->sort_order,
            ...($contentModel instanceof TickerItem && isset($validated['display_location']) ? ['display_location' => $validated['display_location']] : []),
        ]);

        return redirect()->route('dashboard.settings.index')
            ->with('success', 'Teks portal berhasil diperbarui.');
    }

    public function destroy(string $contentType, int $content): RedirectResponse
    {
        $this->findContent($contentType, $content)->delete();

        return redirect()->route('dashboard.settings.index')
            ->with('success', 'Teks portal berhasil dihapus.');
    }

    private function findContent(string $contentType, int $content): Announcement|TickerItem
    {
        return match ($contentType) {
            'announcement' => Announcement::query()->findOrFail($content),
            'ticker' => TickerItem::query()->findOrFail($content),
            default => abort(404),
        };
    }
}
