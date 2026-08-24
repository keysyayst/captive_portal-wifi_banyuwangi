<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

type AccessPoint = {
    id: number;
    name: string;
    ip_address: string;
    mac_address: string;
    location: string;
    status: string;
};

defineProps<{
    accessPoints: AccessPoint[];
}>();
</script>

<template>
    <Head title="Manajemen AP" />
    <section>
        <div class="mb-6">
            <h2 class="text-3xl font-black tracking-tight">Manajemen Access Point (AP)</h2>
            <p class="mt-1 text-sm text-slate-500">Monitoring kondisi perangkat pemancar WiFi secara keseluruhan.</p>
        </div>

        <div v-if="!accessPoints.length" class="rounded-2xl border border-slate-200 bg-white p-8 text-sm text-slate-500">
            Belum ada data perangkat Access Point.
        </div>

        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <div
                v-for="ap in accessPoints"
                :key="ap.id"
                class="rounded-2xl border bg-white p-6"
                :class="ap.status === 'Online' ? 'border-t-4 border-t-emerald-500' : 'border-t-4 border-t-rose-500'"
            >
                <div class="flex items-start justify-between">
                    <div>
                        <h3 class="font-bold text-slate-800">{{ ap.name }}</h3>
                        <p class="mt-1 font-mono text-xs text-slate-500">IP: {{ ap.ip_address ?? '-' }}</p>
                    </div>
                    <span
                        class="rounded-lg border px-2.5 py-1 text-xs font-semibold"
                        :class="ap.status === 'Online' ? 'border-emerald-200 bg-emerald-50 text-emerald-700' : 'border-rose-200 bg-rose-50 text-rose-700'"
                    >
                        {{ ap.status }}
                    </span>
                </div>
                <div class="mt-5 flex flex-col gap-1 border-t border-slate-100 pt-4">
                    <span class="text-xs text-slate-500">MAC: <span class="font-mono text-slate-700">{{ ap.mac_address ?? '-' }}</span></span>
                    <span class="text-xs text-slate-500">Lokasi: <span class="font-medium text-slate-700">{{ ap.location ?? 'Unknown' }}</span></span>
                </div>
            </div>
        </div>
    </section>
</template>
