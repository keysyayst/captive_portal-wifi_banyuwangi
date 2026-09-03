<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';

const navigation = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'Active users', href: '/dashboard/active-users' },
    { label: 'Login history', href: '/dashboard/login-history' },
    { label: 'Manajemen AP', href: '/dashboard/ap-management' },
    { label: 'Pengaturan Portal', href: '/dashboard/settings' },
];
</script>

<template>
    <div class="min-h-screen bg-slate-50 text-slate-900 font-sans">
        <!-- Sidebar -->
        <aside class="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block z-10">
            <Link href="/dashboard" class="flex items-center gap-3 px-3 group mb-8">
                <div class="relative flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-cyan-500 to-blue-600 font-black text-white shadow-lg shadow-cyan-500/30 transition-transform group-hover:scale-105">
                    <span class="relative z-10">W</span>
                    <div class="absolute inset-0 rounded-xl border border-white/20"></div>
                </div>
                <div class="flex flex-col">
                    <span class="text-lg font-bold font-display tracking-tight text-slate-800 group-hover:text-cyan-700 transition-colors">WiFi Control</span>
                    <span class="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Admin Center</span>
                </div>
            </Link>

            <nav class="mt-8 space-y-1.5">
                <Link
                    v-for="item in navigation"
                    :key="item.href"
                    :href="item.href"
                    class="block rounded-lg px-4 py-3 text-sm font-medium transition-colors"
                    :class="$page.url === item.href ? 'bg-cyan-50 text-cyan-700 border-l-4 border-cyan-500' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'"
                >
                    {{ item.label }}
                </Link>
            </nav>
        </aside>

        <div class="lg:pl-64">
            <!-- Header Atas dengan Efek Glassmorphism -->
            <header class="flex items-center justify-between border-b border-slate-200 bg-white/80 backdrop-blur-md px-6 py-4 lg:px-10 sticky top-0 z-20 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
                <div class="flex items-center gap-4">
                    <div class="hidden sm:flex size-11 items-center justify-center rounded-xl bg-cyan-50 border border-cyan-100 text-cyan-600 shadow-inner">
                        <svg class="size-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                    </div>
                    <div>
                        <p class="text-[11px] font-black tracking-[0.2em] text-transparent bg-clip-text bg-linear-to-r from-cyan-600 to-blue-600 uppercase">
                            Operations
                        </p>
                        <h1 class="text-xl font-black font-display text-slate-800 tracking-tight">Network Dashboard</h1>
                    </div>
                </div>

                <span class="flex items-center gap-2.5 rounded-full bg-emerald-50 pl-2.5 pr-4 py-1.5 text-xs font-bold text-emerald-700 border border-emerald-200 shadow-sm transition-all hover:bg-emerald-100 cursor-default">
                    <span class="relative flex size-2.5">
                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                        <span class="relative inline-flex rounded-full size-2.5 bg-emerald-600"></span>
                    </span>
                    System Online
                </span>
            </header>

            <!-- Navigasi Mobile -->
            <nav class="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-6 py-3 lg:hidden">
                <Link
                    v-for="item in navigation"
                    :key="item.href"
                    :href="item.href"
                    class="rounded-lg px-3 py-2 text-sm whitespace-nowrap"
                    :class="$page.url === item.href ? 'bg-cyan-50 text-cyan-700 font-semibold' : 'text-slate-500 hover:bg-slate-50'"
                >
                    {{ item.label }}
                </Link>
            </nav>

            <!-- Konten Utama -->
            <main class="p-6 lg:p-10 anim-up">
                <slot />
            </main>
        </div>
    </div>
</template>
