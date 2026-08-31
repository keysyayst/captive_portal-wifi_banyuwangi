<?php

namespace App\Http\Controllers;

use App\Models\Setting;
use App\Models\Slider;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

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
            'sliders' => Slider::latest()->get()
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
