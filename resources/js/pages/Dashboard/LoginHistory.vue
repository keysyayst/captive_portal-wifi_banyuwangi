<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Head } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';
defineOptions({ layout: DashboardLayout });
type LoginRecord = {
    id: number;
    phone_number: string;
    login_time: string;
    logout_time: string | null;
    duration_minutes: number | null;
    ip_address: string;
    status: string;
};
type Pagination = {
    data: LoginRecord[];
    current_page: number;
    last_page: number;
    total: number;
};
const history = ref<Pagination>({
    data: [],
    current_page: 1,
    last_page: 1,
    total: 0,
});
const loading = ref(true);
const error = ref('');
onMounted(async () => {
    try {
        const token = localStorage.getItem('portal_token');
        const response = await fetch('/api/dashboard/login-history', {
            headers: {
                Accept: 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
            },
        });
        if (!response.ok) throw new Error('Login history is unavailable.');
        history.value = await response.json();
    } catch (exception) {
        error.value =
            exception instanceof Error
                ? exception.message
                : 'Login history is unavailable.';
    } finally {
        loading.value = false;
    }
});
</script>
<template>
    <Head title="Login history" />
    <section>
        <p class="text-sm text-slate-500">Recent network activity</p>
        <h2 class="mt-1 text-3xl font-black tracking-tight">Login history</h2>
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
                Loading history...
            </div>
            <div
                v-else-if="!history.data.length"
                class="p-8 text-sm text-slate-500"
            >
                No login records yet.
            </div>
            <div v-else class="overflow-x-auto">
                <table class="w-full min-w-180 text-left text-sm">
                    <thead
                        class="border-b border-slate-100 bg-slate-50 text-xs tracking-wider text-slate-500 uppercase"
                    >
                        <tr>
                            <th class="px-6 py-4">User</th>
                            <th class="px-6 py-4">Login</th>
                            <th class="px-6 py-4">Logout</th>
                            <th class="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr v-for="record in history.data" :key="record.id">
                            <td class="px-6 py-4 font-semibold">
                                {{ record.phone_number
                                }}<span
                                    class="mt-1 block text-xs font-normal text-slate-500"
                                    >{{ record.ip_address }}</span
                                >
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ record.login_time }}
                            </td>
                            <td class="px-6 py-4 text-slate-600">
                                {{ record.logout_time ?? 'Still active' }}
                            </td>
                            <td class="px-6 py-4">
                                <span
                                    class="rounded-full px-2.5 py-1 text-xs font-semibold"
                                    :class="
                                        record.status === 'success'
                                            ? 'bg-emerald-50 text-emerald-700'
                                            : 'bg-rose-50 text-rose-700'
                                    "
                                    >{{ record.status }}</span
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </section>
</template>
