<?php

use App\Services\LocationWeatherService;
use Illuminate\Http\Client\Request;
use Illuminate\Support\Facades\Http;

test('combines current weather and reverse geocoded location', function () {
    Http::preventStrayRequests();
    Http::fake([
        'api.open-meteo.com/*' => Http::response([
            'current' => [
                'temperature_2m' => 28.4,
                'weather_code' => 2,
                'time' => '2026-08-20T10:00',
            ],
        ]),
        'nominatim.openstreetmap.org/*' => Http::response([
            'address' => [
                'city' => 'Banyuwangi',
                'state' => 'Jawa Timur',
                'country' => 'Indonesia',
            ],
        ]),
    ]);

    $result = app(LocationWeatherService::class)->get(-8.2192, 114.3691);

    expect($result)->toMatchArray([
        'location' => [
            'name' => 'Banyuwangi',
            'region' => 'Jawa Timur',
            'country' => 'Indonesia',
            'latitude' => -8.2192,
            'longitude' => 114.3691,
        ],
        'weather' => [
            'temperature_c' => 28.4,
            'weather_code' => 2,
            'observed_at' => '2026-08-20T10:00',
        ],
    ]);

    Http::assertSent(fn (Request $request): bool => str_contains($request->url(), 'api.open-meteo.com'));
    Http::assertSent(fn (Request $request): bool => str_contains($request->url(), 'nominatim.openstreetmap.org'));
});
