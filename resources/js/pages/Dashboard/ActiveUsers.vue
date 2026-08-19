<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
defineOptions({ layout: DashboardLayout });
type ActiveUser = {
    id: number;
    phone_number: string;
    device_type: string;
    ip_address: string;
    access_point: string | null;
    login_time: string;
    duration_minutes: number;
};
const users = ref<ActiveUser[]>([]);
const loading = ref(true);
const error = ref('');
onMounted(async () => {
    try {
        const response = await fetch('/api/dashboard/active-users', {
            headers: { Accept: 'application/json' },
        });
        if (!response.ok) throw new Error('Active users are unavailable.');
        users.value = await response.json();
    } catch (exception) {
        error.value =
            exception instanceof Error
                ? exception.message
                : 'Active users are unavailable.';
    } finally {
        loading.value = false;
    }
});
</script>
<template>
    <Head title="Active users" />
    <section>
        <p class="text-sm text-slate-500">Live connections</p>
        <h2 class="mt-1 text-3xl font-black tracking-tight">Active users</h2>
        <div
            v-if="error"
            class="mt-6 rounded-xl bg-amber-50 p-4 text-sm text-amber-800"
        >
            {{ error }}
        </div>
        <div
            class="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white"
        >
            <div v-if="loading" class="p-8 text-sm text-slate-500">
                Loading connections...
            </div>
            <div v-else-if="!users.length" class="p-8 text-sm text-slate-500">
                No active connections right now.
            </div>
            <div v-else class="overflow-x-auto">
                <table class="w-full min-w-[680px] text-left text-sm">
                    <thead
                        class="border-b border-slate-100 bg-slate-50 text-xs tracking-wider text-slate-500 uppercase"
                    >
                        <tr>
                            <th class="px-6 py-4">User</th>
                            <th class="px-6 py-4">Device</th>
                            <th class="px-6 py-4">Location</th>
                            <th class="px-6 py-4">Duration</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="user in users" :key="user.id">
                            <td class="px-6 py-4 font-semibold">
                                {{ user.phone_number
                                }}<span
                                    class="mt-1 block text-xs font-normal text-slate-500"
                                    >{{ user.ip_address }}</span
                                >
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ user.device_type }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ user.access_point ?? 'Unknown' }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ user.duration_minutes }} min
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
