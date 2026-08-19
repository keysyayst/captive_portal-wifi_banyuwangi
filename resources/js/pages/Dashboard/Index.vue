<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Head, Link } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });
type Stats = {
    daily_users: number;
    weekly_users: number;
    monthly_users: number;
    total_users: number;
};
const stats = ref<Stats>({
    daily_users: 0,
    weekly_users: 0,
    monthly_users: 0,
    total_users: 0,
});
const error = ref('');
onMounted(async () => {
    try {
        const response = await fetch('/api/dashboard/stats', {
            headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error('Dashboard data is unavailable.');
        stats.value = await response.json();
    } catch (exception) {
        error.value =
            exception instanceof Error
                ? exception.message
                : 'Dashboard data is unavailable.';
    }
});
</script>

<template>
    <Head title="Dashboard" />
    <section>
        <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
                <p class="text-sm text-slate-500">
                    A quick view of the network
                </p>
                <h2 class="mt-1 text-3xl font-black tracking-tight">
                    Overview
                </h2>
            </div>
            <span class="text-sm text-slate-500">Updated just now</span>
        </div>
        <div
            v-if="error"
            class="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800"
        >
            {{ error }} Make sure an admin token is available.
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
                <p class="mt-2 text-xs text-emerald-600">
                    Registered connections
                </p>
            </div>
        </div>
        <div class="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <h3 class="font-bold">Continue monitoring</h3>
            <div class="mt-5 flex flex-wrap gap-3">
                <Link
                    href="/dashboard/active-users"
                    class="rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-700"
                    >See active users</Link
                ><Link
                    href="/dashboard/login-history"
                    class="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold hover:bg-slate-50"
                    >View login history</Link
                >
            </div>
        </div>
    </section>
</template>
