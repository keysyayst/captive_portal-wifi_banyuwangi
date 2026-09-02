<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
import { ref } from 'vue';

defineOptions({ layout: DashboardLayout });

type LoginRecord = {
    id: number;
    phone_number: string;
    login_time: string;
    logout_time: string | null;
    duration_minutes: number | null;
    ip_address: string;
    status: string;
    device_type: string;
    mac_address: string;
    access_point: string | null;
};

type Pagination = {
    data: LoginRecord[];
    current_page: number;
    last_page: number;
    total: number;
};

defineProps<{
    history: Pagination;
    search?: string;
    startDate?: string;
    endDate?: string;
}>();

const search = ref<string>('');
const startDate = ref<string>('');
const endDate = ref<string>('');

// Type for pagination data
type HistoryData = Pagination;

// Apply filters only when search button is clicked
const searchNow = () => {
    const params: any = {};
    if (search.value) params.search = search.value;
    if (startDate.value) params.start_date = startDate.value;
    if (endDate.value) params.end_date = endDate.value;

    router.get('/dashboard/login-history', params, {
        preserveScroll: true,
        preserveState: false,
    });
};

const exportCSV = () => {
    const params = new URLSearchParams();
    if (search.value) params.append('search', search.value);
    if (startDate.value) params.append('start_date', startDate.value);
    if (endDate.value) params.append('end_date', endDate.value);

    window.location.href = `/dashboard/login-history/export?${params.toString()}`;
};

const resetFilters = () => {
    search.value = '';
    startDate.value = '';
    endDate.value = '';
};

const goToPreviousPage = () => {
    const params: any = { page: (history as any).current_page - 1 };
    if (search.value) params.search = search.value;
    if (startDate.value) params.start_date = startDate.value;
    if (endDate.value) params.end_date = endDate.value;
    router.get('/dashboard/login-history', params, { preserveScroll: true });
};

const goToNextPage = () => {
    const params: any = { page: (history as any).current_page + 1 };
    if (search.value) params.search = search.value;
    if (startDate.value) params.start_date = startDate.value;
    if (endDate.value) params.end_date = endDate.value;
    router.get('/dashboard/login-history', params, { preserveScroll: true });
};
</script>

<template>
    <Head title="Login history" />
    <section>
        <p class="text-sm text-slate-500">Recent network activity</p>
        <h2 class="mt-1 text-3xl font-black tracking-tight">Login history</h2>

        <!-- Filters Section -->
        <div class="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <!-- Form Inputs -->
            <div class="grid gap-4 md:grid-cols-3 mb-5">
                <!-- Search Input -->
                <div>
                    <label class="mb-2 block text-sm font-medium text-slate-700">Pencarian</label>
                    <div class="relative">
                        <svg class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        <input
                            v-model="search"
                            type="text"
                            placeholder="Nomor HP, MAC, atau Lokasi"
                            class="w-full rounded-lg border border-slate-300 pl-10 pr-4 py-2.5 text-sm placeholder-slate-400 transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
                            @keyup.enter="searchNow"
                        />
                    </div>
                </div>

                <!-- Start Date -->
                <div>
                    <label class="mb-2 block text-sm font-medium text-slate-700">Tanggal Mulai</label>
                    <input
                        v-model="startDate"
                        type="date"
                        class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
                    />
                </div>

                <!-- End Date -->
                <div>
                    <label class="mb-2 block text-sm font-medium text-slate-700">Tanggal Akhir</label>
                    <input
                        v-model="endDate"
                        type="date"
                        class="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 focus:outline-none"
                    />
                </div>
            </div>

            <!-- Actions -->
            <div class="flex flex-wrap items-center justify-end gap-3 pt-5 border-t border-slate-100">
                <button
                    @click="resetFilters"
                    class="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 focus:ring-2 focus:ring-slate-200 focus:outline-none"
                >
                    Reset
                </button>
                <button
                    @click="exportCSV"
                    class="flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-all hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-200 focus:outline-none"
                >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 16v-4m0 0V8m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Export CSV
                </button>
                <button
                    @click="searchNow"
                    class="flex items-center justify-center gap-2 rounded-lg bg-cyan-600 px-6 py-2.5 text-sm font-medium text-white transition-all hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                >
                    <svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Terapkan Filter
                </button>
            </div>
        </div>

        <!-- Table Section -->
        <div class="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div v-if="!history.data || history.data.length === 0" class="p-8 text-sm text-slate-500">
                No login records yet.
            </div>

            <div v-else class="overflow-x-auto">
                <table class="w-full min-w-180 text-left text-sm">
                    <thead class="border-b border-slate-100 bg-slate-50 text-xs tracking-wider text-slate-500 uppercase">
                        <tr>
                            <th class="px-6 py-4">User</th>
                            <th class="px-6 py-4">Device</th>
                            <th class="px-6 py-4">MAC Address</th>
                            <th class="px-6 py-4">Access Point</th>
                            <th class="px-6 py-4">Login</th>
                            <th class="px-6 py-4">Logout</th>
                            <th class="px-6 py-4">Duration</th>
                            <th class="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="record in history.data" :key="record.id" class="hover:bg-slate-50 transition-colors">
                            <td class="px-6 py-4 font-semibold">
                                {{ record.phone_number }}
                                <span class="mt-1 block text-xs font-normal text-slate-500">
                                    {{ record.ip_address }}
                                </span>
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ record.device_type }}
                            </td>
                            <td class="px-6 py-4 font-mono text-xs text-slate-600">
                                {{ record.mac_address }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ record.access_point ?? '-' }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ record.login_time }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ record.logout_time ?? 'Still active' }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ record.duration_minutes ? record.duration_minutes + ' min' : '-' }}
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="rounded-full px-2.5 py-1 text-xs font-semibold"
                                    :class="
                                        record.status === 'success'
                                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                                            : 'bg-rose-50 text-rose-700 border border-rose-100'
                                    "
                                >
                                    {{ record.status }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <!-- Pagination -->
            <div v-if="history.data && history.data.length > 0" class="border-t border-slate-100 bg-slate-50 px-6 py-4">
                <div class="flex items-center justify-between text-sm text-slate-600">
                    <span>Page {{ history.current_page }} of {{ history.last_page }} ({{ history.total }} total)</span>
                    <div class="flex gap-2">
                        <a
                            v-if="history.current_page > 1"
                            href="#"
                            @click.prevent="goToPreviousPage"
                            class="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-white transition-colors"
                        >
                            Previous
                        </a>
                        <a
                            v-if="history.current_page < history.last_page"
                            href="#"
                            @click.prevent="goToNextPage"
                            class="rounded-lg border border-slate-200 px-3 py-1.5 hover:bg-white transition-colors"
                        >
                            Next
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
