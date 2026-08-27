<?php

namespace App\Services;

use Illuminate\Http\Client\Pool;
use Illuminate\Support\Facades\Http;

class LocationWeatherService
{
    public function get(float $latitude, float $longitude): array
    {
        $responses = Http::pool(fn (Pool $pool) => [
            $pool->as('weather')
                ->timeout(6)
                ->connectTimeout(3)
                ->get('https://api.open-meteo.com/v1/forecast', [
                    'latitude' => $latitude,
                    'longitude' => $longitude,
                    'current' => 'temperature_2m,weather_code',
                    'timezone' => 'auto',
                ]),
            $pool->as('location')
                ->timeout(6)
                ->connectTimeout(3)
                ->withHeaders([
                    'User-Agent' => config('app.name', 'Banyuwangi WiFi Portal').' location service',
                ])
                ->get('https://nominatim.openstreetmap.org/reverse', [
                    'lat' => $latitude,
                    'lon' => $longitude,
                    'format' => 'jsonv2',
                    'zoom' => 18,
                    'addressdetails' => 1,
                ]),
        ]);

        $weatherResponse = $responses['weather'];
        $weatherResponse->throw();

        $weather = $weatherResponse->json('current', []);
        $location = $responses['location']->successful()
            ? $responses['location']->json('address', [])
            : [];
        $locationName = $location['village']
            ?? $location['suburb']
            ?? $location['town']
            ?? $location['city']
            ?? $location['municipality']
            ?? 'Lokasi saat ini';

        return [
            'location' => [
                'name' => $locationName,
                'region' => $location['state'] ?? null,
                'country' => $location['country'] ?? null,
                'latitude' => $latitude,
                'longitude' => $longitude,
            ],
            'weather' => [
                'temperature_c' => $weather['temperature_2m'] ?? null,
                'weather_code' => $weather['weather_code'] ?? null,
                'observed_at' => $weather['time'] ?? null,
            ],
        ];
    }
}
