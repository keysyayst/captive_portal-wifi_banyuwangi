<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SliderController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/portal')->name('home');
Route::get('/portal', [AuthController::class, 'show'])->name('portal.login');
Route::get('/portal/welcome', [AuthController::class, 'welcome'])->name('portal.welcome');
Route::get('/portal/terms', fn () => Inertia::render('Portal/Terms'))->name('portal.terms');
Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('/dashboard/active-users', [DashboardController::class, 'activeUsers'])->name('dashboard.active-users');
Route::get('/dashboard/login-history', [DashboardController::class, 'loginHistory'])->name('dashboard.login-history');
Route::get('/dashboard/login-history/export', [DashboardController::class, 'exportLoginHistory'])->name('dashboard.login-history.export');
Route::get('/dashboard/ap-management', [DashboardController::class, 'apManagement'])->name('dashboard.ap-management');
Route::post('/dashboard/slider', [SliderController::class, 'store'])->name('dashboard.slider.store');
Route::delete('/dashboard/slider/{slider}', [SliderController::class, 'destroy'])->name('dashboard.slider.destroy');
Route::get('/dashboard/settings', [SettingController::class, 'index'])->name('dashboard.settings.index');
Route::post('/dashboard/settings', [SettingController::class, 'update'])->name('dashboard.settings.update');
