<?php

namespace App\Http\Controllers;

use App\Models\Session;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Reference only — not wired up yet. This is the backend counterpart of
 * process_login.php / success.php, adapted for Inertia. Wire it into your
 * routes once the Vue side above looks right:
 *
 *   Route::get('/', [PortalLoginController::class, 'show']);
 *   Route::post('/portal/login', [PortalLoginController::class, 'store']);
 *   Route::get('/portal/welcome', [PortalLoginController::class, 'welcome']);
 */
class PortalLoginController extends Controller
{
    public function show(Request $request): Response
    {
        return Inertia::render('Portal/Login', [
            'error' => $request->query('error'),
            'mac'   => $request->query('mac'),
            'ap'    => $request->query('ap'),
            'nik'   => $request->query('nik'),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'phone'        => ['required', 'digits_between:9,15'],
            'otp'          => ['required', 'digits:6'],
            'method'       => ['required', 'in:whatsapp,sms'],
            'nik'          => ['nullable', 'string'],
            'mac_address'  => ['nullable', 'string'],
            'ap_location'  => ['nullable', 'string'],
        ]);

        // TODO: actually verify $validated['otp'] against whatever you sent out
        // in the /portal/otp/send step before trusting this as a real login.

        // NOTE: adjust these keys to match your actual Session migration/fillable.
        Session::create([
            'phone'            => $validated['phone'],
            'nik'              => $validated['nik'] ?? null,
            'mac_address'      => $validated['mac_address'] ?? null,
            'ip_address'       => $request->ip(),
            'ap_location'      => $validated['ap_location'] ?? 'Unknown',
            'duration_minutes' => 60,
            'auth_status'      => 'success',
        ]);

        return redirect()->route('portal.welcome', [
            'phone' => $validated['phone'],
            'ap'    => $validated['ap_location'] ?? 'Unknown',
        ]);
    }

    public function welcome(Request $request): Response
    {
        return Inertia::render('Portal/Welcome', [
            'phone' => $request->query('phone'),
            'ap'    => $request->query('ap'),
        ]);
    }
}
