<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

type AccessPointStatus = 'Online' | 'Offline';

type AccessPoint = {
    id: number;
    name: string;
    ip_address: string | null;
    mac_address: string | null;
    location: string | null;
    status: AccessPointStatus;
};

type AccessPointPagination = {
    data: AccessPoint[];
    current_page: number;
    last_page: number;
    from: number | null;
    to: number | null;
    total: number;
    prev_page_url: string | null;
    next_page_url: string | null;
};

const props = defineProps<{
    accessPoints: AccessPointPagination;
    search?: string;
}>();

const searchTerm = ref(props.search ?? '');
const isFormVisible = ref(false);
const editingAccessPoint = ref<AccessPoint | null>(null);

const form = useForm({
    name: '',
    ip_address: '',
    mac_address: '',
    location: '',
    status: 'Offline' as AccessPointStatus,
});

const openCreateForm = () => {
    editingAccessPoint.value = null;
    form.reset();
    form.clearErrors();
    isFormVisible.value = true;

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

const openEditForm = (accessPoint: AccessPoint) => {
    editingAccessPoint.value = accessPoint;

    form.clearErrors();
    form.name = accessPoint.name;
    form.ip_address = accessPoint.ip_address ?? '';
    form.mac_address = accessPoint.mac_address ?? '';
    form.location = accessPoint.location ?? '';
    form.status = accessPoint.status;

    isFormVisible.value = true;

    window.scrollTo({
        top: 0,
        behavior: 'smooth',
    });
};

const closeForm = () => {
    isFormVisible.value = false;
    editingAccessPoint.value = null;
    form.reset();
    form.clearErrors();
};

const saveAccessPoint = () => {
    const options = {
        preserveScroll: true,
        onSuccess: () => closeForm(),
    };

    if (editingAccessPoint.value) {
        form.patch(
            `/dashboard/ap-management/${editingAccessPoint.value.id}`,
            options,
        );

        return;
    }

    form.post('/dashboard/ap-management', options);
};

const searchAccessPoints = () => {
    const keyword = searchTerm.value.trim();

    router.get(
        '/dashboard/ap-management',
        keyword ? { search: keyword } : {},
        {
            preserveScroll: true,
        },
    );
};

const resetSearch = () => {
    searchTerm.value = '';

    router.get(
        '/dashboard/ap-management',
        {},
        {
            preserveScroll: true,
        },
    );
};

const deleteAccessPoint = (accessPoint: AccessPoint) => {
    const confirmed = confirm(
        `Hapus ${accessPoint.name}? Data AP yang dihapus tidak dapat dikembalikan.`,
    );

    if (!confirmed) {
        return;
    }

    router.delete(`/dashboard/ap-management/${accessPoint.id}`, {
        preserveScroll: true,
    });
};

const visitPage = (url: string | null) => {
    if (!url) {
        return;
    }

    router.get(
        url,
        {},
        {
            preserveScroll: true,
            preserveState: true,
        },
    );
};

const inputClasses = (hasError: boolean) => [
    'block w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:ring-2',
    hasError
        ? 'border-rose-400 focus:border-rose-500 focus:ring-rose-100'
        : 'border-slate-300 focus:border-cyan-500 focus:ring-cyan-100',
];
</script>

<template>
    <Head title="Manajemen AP" />

    <section class="flex flex-col gap-6">
        <!-- Header dan pencarian -->
        <div
            class="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:p-6"
        >
            <div
                class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
            >
                <div>
                    <h2 class="text-lg font-bold text-slate-800">
                        Daftar Access Point
                    </h2>

                    <p class="mt-1 text-sm text-slate-500">
                        Kelola perangkat, lokasi, alamat jaringan, dan status AP.
                    </p>
                </div>

                <button
                    type="button"
                    class="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700 focus:ring-2 focus:ring-cyan-200 focus:outline-none"
                    @click="openCreateForm"
                >
                    <svg
                        class="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 4v16m8-8H4"
                        />
                    </svg>

                    Tambah AP
                </button>
            </div>

            <form
                class="mt-5 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row"
                @submit.prevent="searchAccessPoints"
            >
                <div class="relative flex-1">
                    <svg
                        class="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m21 21-4.35-4.35m2.35-5.65a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                        />
                    </svg>

                    <input
                        v-model="searchTerm"
                        type="search"
                        placeholder="Cari nama, IP, MAC, atau lokasi AP"
                        class="w-full rounded-xl border border-slate-300 py-2.5 pr-4 pl-10 text-sm outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-200"
                    />
                </div>

                <div class="flex gap-2">
                    <button
                        type="submit"
                        class="flex-1 rounded-xl bg-slate-800 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-slate-700 sm:flex-none"
                    >
                        Cari
                    </button>

                    <button
                        v-if="search"
                        type="button"
                        class="flex-1 rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 sm:flex-none"
                        @click="resetSearch"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>

        <!-- Form tambah/edit -->
        <div
            v-if="isFormVisible"
            class="rounded-2xl border border-cyan-200 bg-white p-5 shadow-sm md:p-6"
        >
            <div class="mb-5 flex items-start justify-between gap-4">
                <div>
                    <h3 class="text-lg font-bold text-slate-800">
                        {{
                            editingAccessPoint
                                ? 'Edit Access Point'
                                : 'Tambah Access Point'
                        }}
                    </h3>

                    <p class="mt-1 text-sm text-slate-500">
                        Kolom bertanda * wajib diisi.
                    </p>
                </div>

                <button
                    type="button"
                    class="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Tutup form"
                    @click="closeForm"
                >
                    <svg
                        class="size-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>

            <form
                class="flex flex-col gap-5"
                @submit.prevent="saveAccessPoint"
            >
                <div class="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div>
                        <label
                            for="ap-name"
                            class="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                            Nama AP *
                        </label>

                        <input
                            id="ap-name"
                            v-model="form.name"
                            type="text"
                            maxlength="255"
                            placeholder="Contoh: AP Ruang Pelayanan"
                            :class="inputClasses(Boolean(form.errors.name))"
                        />

                        <p
                            v-if="form.errors.name"
                            class="mt-1.5 text-xs font-medium text-rose-600"
                        >
                            {{ form.errors.name }}
                        </p>
                    </div>

                    <div>
                        <label
                            for="ap-location"
                            class="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                            Lokasi
                        </label>

                        <input
                            id="ap-location"
                            v-model="form.location"
                            type="text"
                            maxlength="255"
                            placeholder="Contoh: Lantai 1 Gedung Utama"
                            :class="inputClasses(Boolean(form.errors.location))"
                        />

                        <p
                            v-if="form.errors.location"
                            class="mt-1.5 text-xs font-medium text-rose-600"
                        >
                            {{ form.errors.location }}
                        </p>
                    </div>

                    <div>
                        <label
                            for="ap-ip-address"
                            class="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                            Alamat IP
                        </label>

                        <input
                            id="ap-ip-address"
                            v-model="form.ip_address"
                            type="text"
                            maxlength="45"
                            placeholder="Contoh: 192.168.10.2"
                            :class="
                                inputClasses(Boolean(form.errors.ip_address))
                            "
                        />

                        <p
                            v-if="form.errors.ip_address"
                            class="mt-1.5 text-xs font-medium text-rose-600"
                        >
                            {{ form.errors.ip_address }}
                        </p>
                    </div>

                    <div>
                        <label
                            for="ap-mac-address"
                            class="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                            Alamat MAC *
                        </label>

                        <input
                            id="ap-mac-address"
                            v-model="form.mac_address"
                            type="text"
                            maxlength="17"
                            placeholder="AA:BB:CC:DD:EE:FF"
                            :class="[
                                ...inputClasses(
                                    Boolean(form.errors.mac_address),
                                ),
                                'font-mono uppercase',
                            ]"
                        />

                        <p
                            v-if="form.errors.mac_address"
                            class="mt-1.5 text-xs font-medium text-rose-600"
                        >
                            {{ form.errors.mac_address }}
                        </p>
                    </div>

                    <div>
                        <label
                            for="ap-status"
                            class="mb-1.5 block text-sm font-semibold text-slate-700"
                        >
                            Status *
                        </label>

                        <select
                            id="ap-status"
                            v-model="form.status"
                            :class="inputClasses(Boolean(form.errors.status))"
                        >
                            <option value="Online">Online</option>
                            <option value="Offline">Offline</option>
                        </select>

                        <p
                            v-if="form.errors.status"
                            class="mt-1.5 text-xs font-medium text-rose-600"
                        >
                            {{ form.errors.status }}
                        </p>
                    </div>
                </div>

                <div
                    class="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end"
                >
                    <button
                        type="button"
                        class="rounded-xl border border-slate-300 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                        @click="closeForm"
                    >
                        Batal
                    </button>

                    <button
                        type="submit"
                        :disabled="form.processing"
                        class="rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {{
                            form.processing
                                ? 'Menyimpan...'
                                : editingAccessPoint
                                  ? 'Simpan Perubahan'
                                  : 'Tambah AP'
                        }}
                    </button>
                </div>
            </form>
        </div>

        <!-- Daftar AP -->
        <div
            v-if="accessPoints.data.length"
            class="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
            <article
                v-for="accessPoint in accessPoints.data"
                :key="accessPoint.id"
                class="flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                :class="
                    accessPoint.status === 'Online'
                        ? 'border-t-4 border-t-emerald-500'
                        : 'border-t-4 border-t-rose-500'
                "
            >
                <div class="flex items-start justify-between gap-4">
                    <div class="min-w-0">
                        <h3 class="truncate font-bold text-slate-800">
                            {{ accessPoint.name }}
                        </h3>

                        <p class="mt-1 font-mono text-xs text-slate-500">
                            IP: {{ accessPoint.ip_address ?? '-' }}
                        </p>
                    </div>

                    <span
                        class="shrink-0 rounded-lg border px-2.5 py-1 text-xs font-semibold"
                        :class="
                            accessPoint.status === 'Online'
                                ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                                : 'border-rose-200 bg-rose-50 text-rose-700'
                        "
                    >
                        {{ accessPoint.status }}
                    </span>
                </div>

                <dl
                    class="mt-5 flex flex-1 flex-col gap-2 border-t border-slate-100 pt-4 text-xs"
                >
                    <div class="flex gap-2">
                        <dt class="w-14 shrink-0 text-slate-500">MAC</dt>
                        <dd class="break-all font-mono text-slate-700">
                            {{ accessPoint.mac_address ?? '-' }}
                        </dd>
                    </div>

                    <div class="flex gap-2">
                        <dt class="w-14 shrink-0 text-slate-500">Lokasi</dt>
                        <dd class="font-medium text-slate-700">
                            {{ accessPoint.location ?? 'Belum diatur' }}
                        </dd>
                    </div>
                </dl>

                <div
                    class="mt-5 flex gap-2 border-t border-slate-100 pt-4"
                >
                    <button
                        type="button"
                        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700"
                        @click="openEditForm(accessPoint)"
                    >
                        Edit
                    </button>

                    <button
                        type="button"
                        class="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-xs font-bold text-slate-700 transition hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700"
                        @click="deleteAccessPoint(accessPoint)"
                    >
                        Hapus
                    </button>
                </div>
            </article>
        </div>

        <!-- Empty state -->
        <div
            v-else
            class="rounded-2xl border-2 border-dashed border-slate-200 bg-white p-10 text-center"
        >
            <div
                class="mx-auto flex size-12 items-center justify-center rounded-full bg-slate-100 text-slate-500"
            >
                <svg
                    class="size-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1.8"
                        d="M8.5 12.5a5 5 0 0 1 7 0M5 9a10 10 0 0 1 14 0M12 17h.01M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
                    />
                </svg>
            </div>

            <h3 class="mt-4 font-bold text-slate-800">
                {{
                    search
                        ? 'Access Point tidak ditemukan'
                        : 'Belum ada Access Point'
                }}
            </h3>

            <p class="mt-1 text-sm text-slate-500">
                {{
                    search
                        ? 'Coba gunakan kata pencarian lain.'
                        : 'Tambahkan AP pertama untuk mulai mengelola jaringan.'
                }}
            </p>

            <button
                v-if="!search"
                type="button"
                class="mt-5 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cyan-700"
                @click="openCreateForm"
            >
                Tambah AP Pertama
            </button>
        </div>

        <!-- Pagination -->
        <div
            v-if="accessPoints.total"
            class="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm sm:flex-row sm:items-center sm:justify-between"
        >
            <p class="text-slate-500">
                Menampilkan
                <span class="font-semibold text-slate-700">
                    {{ accessPoints.from }}–{{ accessPoints.to }}
                </span>
                dari
                <span class="font-semibold text-slate-700">
                    {{ accessPoints.total }}
                </span>
                AP
            </p>

            <div
                v-if="accessPoints.last_page > 1"
                class="flex items-center gap-2"
            >
                <button
                    type="button"
                    :disabled="!accessPoints.prev_page_url"
                    class="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    @click="visitPage(accessPoints.prev_page_url)"
                >
                    Sebelumnya
                </button>

                <span class="px-2 text-xs font-semibold text-slate-500">
                    Halaman {{ accessPoints.current_page }} /
                    {{ accessPoints.last_page }}
                </span>

                <button
                    type="button"
                    :disabled="!accessPoints.next_page_url"
                    class="rounded-lg border border-slate-300 px-3 py-1.5 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    @click="visitPage(accessPoints.next_page_url)"
                >
                    Berikutnya
                </button>
            </div>
        </div>
    </section>
</template>