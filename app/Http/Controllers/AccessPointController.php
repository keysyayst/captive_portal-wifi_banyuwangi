<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAccessPointRequest;
use App\Http\Requests\UpdateAccessPointRequest;
use App\Models\AccessPoint;
use Illuminate\Http\RedirectResponse;

class AccessPointController extends Controller
{
    public function store(StoreAccessPointRequest $request): RedirectResponse
    {
        AccessPoint::query()->create($request->validated());

        return redirect()->route('dashboard.ap-management');
    }

    public function update(
        UpdateAccessPointRequest $request,
        AccessPoint $accessPoint,
    ): RedirectResponse {
        $accessPoint->update($request->validated());

        return redirect()->route('dashboard.ap-management');
    }

    public function destroy(AccessPoint $accessPoint): RedirectResponse
    {
        $accessPoint->delete();

        return redirect()->route('dashboard.ap-management');
    }
}