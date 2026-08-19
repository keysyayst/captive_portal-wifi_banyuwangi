<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::redirect('/', '/portal')->name('home');
Route::get('/portal', fn () => Inertia::render('Portal/Login'))->name('portal.login');
Route::get('/portal/welcome', [AuthController::class, 'welcome'])->name('portal.welcome');
Route::get('/portal/terms', fn () => Inertia::render('Portal/Terms'))->name('portal.terms');
Route::get('/dashboard', fn () => Inertia::render('Dashboard/Index'))->name('dashboard');
Route::get('/dashboard/active-users', fn () => Inertia::render('Dashboard/ActiveUsers'))->name('dashboard.active-users');
Route::get('/dashboard/login-history', fn () => Inertia::render('Dashboard/LoginHistory'))->name('dashboard.login-history');
