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


        <aside class="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block z-10">
            <Link href="/dashboard" class="flex items-center gap-3 px-3">
                <span class="flex size-10 items-center justify-center rounded-xl bg-cyan-600 font-black text-white shadow-sm">
                    W
                </span>
                <span class="text-lg font-bold font-display tracking-tight text-slate-800">WiFi Control</span>
            </Link>

            <nav class="mt-12 space-y-1.5">
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

            <header class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 lg:px-10 sticky top-0 z-10">
                <div>
                    <p class="text-xs font-semibold tracking-[0.2em] text-cyan-600 uppercase">
                        Operations
                    </p>
                    <h1 class="mt-1 text-xl font-bold font-display text-slate-800">Network Dashboard</h1>
                </div>
                <span class="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 border border-emerald-100 shadow-sm">
                    System online
                </span>
            </header>


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


            <main class="p-6 lg:p-10 anim-up">
                <slot />
            </main>
        </div>
    </div>
</template>
