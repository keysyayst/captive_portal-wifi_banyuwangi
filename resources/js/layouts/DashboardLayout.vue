<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

const navigation = [
    { label: 'Overview', href: '/dashboard' },
    { label: 'Active users', href: '/dashboard/active-users' },
    { label: 'Login history', href: '/dashboard/login-history' },
];
</script>

<template>
    <div class="min-h-screen bg-slate-100 text-slate-900">
        <aside
            class="fixed inset-y-0 left-0 hidden w-64 border-r border-slate-200 bg-white px-5 py-6 lg:block"
        >
            <Link href="/dashboard" class="flex items-center gap-3 px-3">
                <span
                    class="flex size-10 items-center justify-center rounded-xl bg-slate-900 font-black text-cyan-300"
                    >W</span
                >
                <span class="text-sm font-bold">WiFi Control</span>
            </Link>
            <nav class="mt-12 space-y-1">
                <Link
                    v-for="item in navigation"
                    :key="item.href"
                    :href="item.href"
                    class="block rounded-xl px-3 py-3 text-sm font-medium text-slate-500 transition hover:bg-cyan-50 hover:text-slate-900"
                >
                    {{ item.label }}
                </Link>
            </nav>
        </aside>

        <div class="lg:pl-64">
            <header
                class="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5 lg:px-10"
            >
                <div>
                    <p
                        class="text-xs font-semibold tracking-[0.2em] text-cyan-600 uppercase"
                    >
                        Operations
                    </p>
                    <h1 class="mt-1 text-xl font-bold">Network dashboard</h1>
                </div>
                <span
                    class="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700"
                    >System online</span
                >
            </header>
            <nav
                class="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-6 py-3 lg:hidden"
            >
                <Link
                    v-for="item in navigation"
                    :key="item.href"
                    :href="item.href"
                    class="rounded-lg px-3 py-2 text-sm whitespace-nowrap text-slate-500 hover:bg-cyan-50 hover:text-slate-900"
                >
                    {{ item.label }}
                </Link>
            </nav>
            <main class="p-6 lg:p-10"><slot /></main>
        </div>
    </div>
</template>
