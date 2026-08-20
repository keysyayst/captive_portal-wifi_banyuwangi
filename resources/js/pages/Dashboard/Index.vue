<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

type Stats = {
    daily_users: number;
    weekly_users: number;
    monthly_users: number;
    total_users: number;
};

// Menambahkan tipe data untuk statistik lokasi (karena dikirim oleh controller)
type LocationStat = {
    access_point: string;
    total_sessions: number;
    unique_users: number;
    total_duration_hours: number;
};

// MENERIMA DATA DARI LARAVEL (Inertia Props)
defineProps<{
    stats: Stats;
    locations: LocationStat[];
}>();
</script>

<template>
    <Head title="Dashboard" />
    <section>
        <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
                <p class="text-sm text-slate-500">A quick view of the network</p>
                <h2 class="mt-1 text-3xl font-black tracking-tight">Overview</h2>
            </div>
            <span class="text-sm text-slate-500">Updated just now</span>
        </div>

        <div class="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div
                v-for="item in [
                    { label: 'Today', value: stats.daily_users },
                    { label: 'Last 7 days', value: stats.weekly_users },
                    { label: 'Last 30 days', value: stats.monthly_users },
                    { label: 'All users', value: stats.total_users },
                ]"
                :key="item.label"
                class="rounded-2xl border border-slate-200 bg-white p-5"
            >
                <p class="text-sm text-slate-500">{{ item.label }}</p>
                <p class="mt-4 text-4xl font-black">{{ item.value }}</p>
                <p class="mt-2 text-xs text-emerald-600">Registered connections</p>
            </div>
        </div>

        <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6" v-if="locations && locations.length">
            <h3 class="font-bold mb-4">Kepadatan per Lokasi Access Point</h3>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm">
                    <thead class="border-b bg-slate-50 text-xs text-slate-500 uppercase">
                        <tr>
                            <th class="py-2 px-4">Lokasi AP</th>
                            <th class="py-2 px-4">Total Sesi</th>
                            <th class="py-2 px-4">User Unik</th>
                            <th class="py-2 px-4">Total Jam</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y">
                        <tr v-for="loc in locations" :key="loc.access_point">
                            <td class="py-2 px-4 font-medium">{{ loc.access_point }}</td>
                            <td class="py-2 px-4">{{ loc.total_sessions }}</td>
                            <td class="py-2 px-4">{{ loc.unique_users }}</td>
                            <td class="py-2 px-4">{{ loc.total_duration_hours }} Jam</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 class="font-bold">Continue monitoring</h3>
            <div class="mt-5 flex flex-wrap gap-3">
                <Link
                    href="/dashboard/active-users"
                    class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
                    >See active users</Link>
                <Link
                    href="/dashboard/login-history"
                    class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold hover:bg-slate-50"
                    >View login history</Link>
            </div>
        </div>
    </section>
</template>
