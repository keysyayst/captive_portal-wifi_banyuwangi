<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConfigController;
use App\Http\Controllers\DashboardController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);

Route::get('/config', [ConfigController::class, 'show']);
Route::get('/terms', [ConfigController::class, 'terms']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
    Route::get('/dashboard/active-users', [DashboardController::class, 'activeUsers']);
    Route::get('/dashboard/login-history', [DashboardController::class, 'loginHistory']);
    Route::get('/dashboard/location-stats', [DashboardController::class, 'locationStats']);
});
