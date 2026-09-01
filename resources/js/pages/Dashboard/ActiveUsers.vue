<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { ref } from 'vue';

defineOptions({ layout: DashboardLayout });

type ActiveUser = {
    id: number;
    phone_number: string;
    device_type: string;
    ip_address: string;
    access_point: string | null;
    login_time: string;
    duration_minutes: number;
    mac_address: string;
};

defineProps<{
    activeUsers: ActiveUser[];
    search?: string;
}>();

const search = ref<string>('');

const searchNow = () => {
    const params: any = {};
    if (search.value) params.search = search.value;

    router.get('/dashboard/active-users', params, {
        preserveScroll: true,
        preserveState: false,
    });
};

const resetFilter = () => {
    search.value = '';
    router.get('/dashboard/active-users', {}, {
        preserveScroll: true,
        preserveState: false,
    });
};
</script>

<template>
    <Head title="Active users" />
    <section>
        <p class="text-sm text-slate-500">Live connections</p>
        <h2 class="mt-1 text-3xl font-black tracking-tight">Active users</h2>

        <!-- Search Filter -->
        <div class="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div class="flex gap-3">
                <div class="flex-1">
                    <label class="mb-2 block text-sm font-medium text-slate-700">Search</label>
                    <input
                        v-model="search"
                        type="text"
                        placeholder="Cari berdasarkan nomor HP, MAC address, atau lokasi AP"
                        class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm placeholder-slate-400 transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
                        @keyup.enter="searchNow"
                    />
                </div>
                <div class="flex items-end gap-2">
                    <button
                        @click="searchNow"
                        class="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-4 py-2.5 font-medium text-white transition-all hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                    >
                        <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        Cari
                    </button>
                    <button
                        @click="resetFilter"
                        class="rounded-lg border border-slate-300 px-4 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>

        <!-- Table Section -->
        <div class="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div v-if="!activeUsers.length" class="p-8 text-sm text-slate-500">
                No active connections right now.
            </div>

            <div v-else class="overflow-x-auto">
                <table class="w-full min-w-170 text-left text-sm">
                    <thead class="border-b border-slate-100 bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                        <tr>
                            <th class="px-6 py-4">User</th>
                            <th class="px-6 py-4">Device</th>
                            <th class="px-6 py-4">MAC Address</th>
                            <th class="px-6 py-4">Location</th>
                            <th class="px-6 py-4">Login Time</th>
                            <th class="px-6 py-4">Duration</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="user in activeUsers" :key="user.id" class="hover:bg-slate-50 transition-colors">
                            <td class="px-6 py-4 font-semibold">
                                {{ user.phone_number }}
                                <span class="mt-1 block text-xs font-normal text-slate-500">
                                    {{ user.ip_address }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                <span class="inline-block rounded-md bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 border border-blue-100">
                                    {{ user.device_type }}
                                </span>
                            </td>
                            <td class="px-6 py-4 font-mono text-xs text-slate-600">
                                {{ user.mac_address }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                <span class="inline-block rounded-md bg-purple-50 px-2.5 py-1 text-xs font-medium text-purple-700 border border-purple-100">
                                    {{ user.access_point ?? 'Unknown' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ user.login_time }}
                            </td>
                            <td class="px-6 py-4">
                                <span class="inline-block rounded-md bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 border border-emerald-100">
                                    {{ user.duration_minutes }} min
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
