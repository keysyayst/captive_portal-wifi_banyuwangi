<?php

namespace App\Http\Controllers;

use PragmaRX\Countries\Package\Countries;
use Illuminate\Http\JsonResponse;

class CountryController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $countries = Countries::all()
                ->filter(function ($country) {
                    return !empty($country->calling_codes);
                })
                ->map(function ($country) {
                    $dialCode = $country->calling_codes[0] ?? '';
                    
                    if (!empty($dialCode) && strpos($dialCode, '+') === false) {
                        $dialCode = '+' . $dialCode;
                    }
                    
                    return [
                        'code' => $country->cca2,
                        'name' => $country->name['common'] ?? $country->name,
                        'phone_code' => $dialCode,
                        'flag' => $country->extra['emoji'] ?? '',
                    ];
                })
                ->sortBy('name')
                ->values()
                ->toArray();

            return response()->json(['countries' => $countries]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching countries',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    public function show($code): JsonResponse
    {
        try {
            $country = Countries::where('cca2', strtoupper($code))->first();

            if (!$country) {
                return response()->json(['message' => 'Country not found'], 404);
            }

            $dialCode = $country->calling_codes[0] ?? '';

            if (!empty($dialCode) && strpos($dialCode, '+') === false) {
                $dialCode = '+' . $dialCode;
            }

            return response()->json([
                'country' => [
                    'code' => $country->cca2,
                    'name' => $country->name['common'] ?? $country->name,
                    'phone_code' => $dialCode,
                    'flag' => $country->extra['emoji'] ?? '',
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Error fetching country'], 500);
        }
    }
}