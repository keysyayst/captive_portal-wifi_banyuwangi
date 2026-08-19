<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use PragmaRX\Countries\Package\Countries;
use Illuminate\Http\JsonResponse;

class CountryController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $countries = Countries::all()
                ->map(function ($country) {
                    // Ambil dari calling_codes (array), bukan idd
                    $dialCode = '';
                    
                    if (!empty($country->calling_codes) && is_array($country->calling_codes)) {
                        $dialCode = $country->calling_codes[0] ?? ''; // Ambil elemen pertama
                    }
                    
                    // Fallback ke idd kalau calling_codes kosong
                    if (empty($dialCode) && !empty($country->idd)) {
                        $root = $country->idd['root'] ?? '';
                        $suffix = !empty($country->idd['suffixes']) ? $country->idd['suffixes'][0] : '';
                        $dialCode = $root . $suffix;
                    }
                    
                    return [
                        'id' => $country->cca2,
                        'name' => $country->name['common'] ?? $country->admin ?? '',
                        'code' => $country->cca2,
                        'phone_code' => $dialCode,
                        'flag' => $country->extra['emoji'] ?? '🌍',
                        'display' => ($country->extra['emoji'] ?? '🌍') . ' ' . ($country->name['common'] ?? $country->admin ?? '') . ' (' . $dialCode . ')',
                    ];
                })
                ->filter(function ($country) {
                    return !empty($country['phone_code']);
                })
                ->sortBy('name')
                ->values()
                ->toArray();

            return response()->json([
                'countries' => $countries,
            ]);
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
                return response()->json([
                    'message' => 'Country not found',
                ], 404);
            }

            // Ambil dari calling_codes (array), bukan idd
            $dialCode = '';
            
            if (!empty($country->calling_codes) && is_array($country->calling_codes)) {
                $dialCode = $country->calling_codes[0] ?? '';
            }
            
            // Fallback ke idd kalau calling_codes kosong
            if (empty($dialCode) && !empty($country->idd)) {
                $root = $country->idd['root'] ?? '';
                $suffix = !empty($country->idd['suffixes']) ? $country->idd['suffixes'][0] : '';
                $dialCode = $root . $suffix;
            }

            return response()->json([
                'country' => [
                    'id' => $country->cca2,
                    'name' => $country->name['common'] ?? $country->admin ?? '',
                    'code' => $country->cca2,
                    'phone_code' => $dialCode,
                    'flag' => $country->extra['emoji'] ?? '🌍',
                ],
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error fetching country',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}