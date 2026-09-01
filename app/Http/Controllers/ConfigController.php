<?php

namespace App\Http\Controllers;

use App\Models\AccessPoint;
use App\Models\PortalConfig;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ConfigController extends Controller
{
    private function getConfigByAp(Request $request): PortalConfig
    {
        $mac = $request->query('apmac') ?? $request->query('mac') ?? $request->query('ap');

        if ($mac) {
            $ap = AccessPoint::where('mac_address', $mac)->with('portalConfig')->first();
            if ($ap && $ap->portalConfig) {
                return $ap->portalConfig;
            }
        }

        return PortalConfig::where('is_default', true)->firstOrFail();
    }

    public function show(Request $request): JsonResponse
    {
        $config = $this->getConfigByAp($request);

        $loginMethod = Setting::where('key', 'login_method')
            ->first()?->value ?? 'phone';

        return response()->json([
            'organization_name' => $config->organization_name,
            'logo_url' => $config->logo_url,
            'banner_url' => $config->banner_url,
            'primary_color' => $config->primary_color,
            'secondary_color' => $config->secondary_color,
            'ssid' => 'BanyuwangiWiFi_Free',
            'login_method' => $loginMethod,
        ]);
    }

    public function terms(Request $request): JsonResponse
    {
        $config = $this->getConfigByAp($request);

        return response()->json([
            'terms' => $config->terms_text,
        ]);
    }
}
