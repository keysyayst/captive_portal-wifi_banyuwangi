<script setup lang="ts">
import { computed } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';

defineOptions({ layout: DashboardLayout });

type Stats = {
    daily_users: number;
    weekly_users: number;
    monthly_users: number;
    total_users: number;
};

type LocationStat = {
    access_point: string;
    total_sessions: number;
    unique_users: number;
    total_duration_hours: number;
};

const props = defineProps<{
    stats: Stats;
    locations: LocationStat[];
}>();

const trendOptions: ApexOptions = {
    chart: { type: 'bar', toolbar: { show: false } },
    colors: ['#0f172a'],
    plotOptions: { bar: { borderRadius: 4, horizontal: false } },
    dataLabels: { enabled: false },
    xaxis: { categories: ['Hari Ini', '7 Hari Terakhir', '30 Hari Terakhir'] },
};

const trendSeries = computed(() => [{
    name: 'Jumlah Pengguna',
    data: [props.stats.daily_users, props.stats.weekly_users, props.stats.monthly_users]
}]);

const locationOptions = computed<ApexOptions>(() => ({
    chart: { type: 'donut' },
    labels: props.locations.map(loc => loc.access_point || 'Unknown'),
    plotOptions: { pie: { donut: { size: '65%' } } },
    dataLabels: { enabled: false },
    legend: { position: 'bottom' }
}));

const locationSeries = computed(() => props.locations.map(loc => loc.total_sessions));
</script>

<template>
    <Head title="Dashboard" />
    <section>
        <div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 mb-8">
            <div
                v-for="item in [
                    { label: 'Today', value: stats.daily_users },
                    { label: 'Last 7 days', value: stats.weekly_users },
                    { label: 'Last 30 days', value: stats.monthly_users },
                    { label: 'All users', value: stats.total_users },
                ]"
                :key="item.label"
                class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
                <p class="text-sm text-slate-500">{{ item.label }}</p>
                <p class="mt-4 text-4xl font-black">{{ item.value }}</p>
                <p class="mt-2 text-xs text-emerald-600 font-medium">Registered connections</p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">

            <div class="lg:col-span-2 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 class="font-bold text-slate-800 mb-4">Tren Login Pengguna</h3>
                <VueApexCharts type="bar" height="300" :options="trendOptions" :series="trendSeries" />
            </div>

            <div class="lg:col-span-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 class="font-bold text-slate-800 mb-4">Kepadatan Lokasi AP</h3>
                <div v-if="locations && locations.length">
                    <VueApexCharts type="donut" height="320" :options="locationOptions" :series="locationSeries" />
                </div>
                <div v-else class="text-sm text-slate-500 h-full flex items-center justify-center">
                    Belum ada data sesi AP.
                </div>
            </div>
        </div>

        <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 class="font-bold">Continue monitoring</h3>
            <div class="mt-5 flex flex-wrap gap-3">
                <Link
                    href="/dashboard/active-users"
                    class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
                    >Lihat Pengguna Aktif</Link>
                <Link
                    href="/dashboard/login-history"
                    class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold hover:bg-slate-50"
                    >Lihat Riwayat Login</Link>
            </div>
        </div>
    </section>
</template>
