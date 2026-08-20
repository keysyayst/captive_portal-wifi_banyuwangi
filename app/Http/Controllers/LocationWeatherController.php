<?php

namespace App\Http\Controllers;

use App\Http\Requests\LocationWeatherRequest;
use App\Services\LocationWeatherService;
use Illuminate\Http\JsonResponse;

class LocationWeatherController extends Controller
{
    public function show(LocationWeatherRequest $request, LocationWeatherService $service): JsonResponse
    {
        return response()->json($service->get(
            (float) $request->validated('latitude'),
            (float) $request->validated('longitude'),
        ));
    }
}
