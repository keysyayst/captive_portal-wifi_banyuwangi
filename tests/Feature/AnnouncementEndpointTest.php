<?php

use App\Models\Announcement;

test('returns active announcements ordered by sort order', function () {
    Announcement::query()->create([
        'message' => 'Pengumuman kedua',
        'is_active' => true,
        'sort_order' => 2,
    ]);
    Announcement::query()->create([
        'message' => 'Pengumuman tidak aktif',
        'is_active' => false,
        'sort_order' => 1,
    ]);
    Announcement::query()->create([
        'message' => 'Pengumuman pertama',
        'is_active' => true,
        'sort_order' => 1,
    ]);

    $this->getJson('/api/announcements')
        ->assertSuccessful()
        ->assertJsonPath('announcements.0.message', 'Pengumuman pertama')
        ->assertJsonPath('announcements.1.message', 'Pengumuman kedua')
        ->assertJsonMissing(['message' => 'Pengumuman tidak aktif']);
});
