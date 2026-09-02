<script setup lang="ts">
import { ref } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

// --- DEFINISI TIPE DATA ---
type Announcement = {
    id: number;
    message: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
};

const props = defineProps<{
    announcements: Announcement[];
}>();

// --- STATE UNTUK FORM ---
const showForm = ref(false);
const editingId = ref<number | null>(null);

// --- LOGIKA FORM PENGUMUMAN ---
const announcementForm = useForm({
    message: '',
    is_active: false,
    sort_order: null as number | null,
});

const resetForm = () => {
    announcementForm.reset();
    editingId.value = null;
    showForm.value = false;
};

const startEdit = (announcement: Announcement) => {
    editingId.value = announcement.id;
    announcementForm.message = announcement.message;
    announcementForm.is_active = announcement.is_active;
    announcementForm.sort_order = announcement.sort_order;
    showForm.value = true;
};

const saveAnnouncement = () => {
    if (editingId.value) {
        announcementForm.patch(`/dashboard/announcements/${editingId.value}`, {
            preserveScroll: true,
            onSuccess: () => resetForm(),
        });
    } else {
        announcementForm.post('/dashboard/announcements', {
            preserveScroll: true,
            onSuccess: () => resetForm(),
        });
    }
};

const deleteAnnouncement = (id: number) => {
    if (confirm('Yakin ingin menghapus pengumuman ini?')) {
        router.delete(`/dashboard/announcements/${id}`, { preserveScroll: true });
    }
};

const toggleActive = (announcement: Announcement) => {
    router.patch(
        `/dashboard/announcements/${announcement.id}`,
        {
            message: announcement.message,
            is_active: !announcement.is_active,
            sort_order: announcement.sort_order,
        },
        { preserveScroll: true }
    );
};
</script>

<template>
    <Head title="Kelola Pengumuman Portal" />
    <section class="anim-up">
        <div class="mb-8 flex items-center justify-between">
            <div>
                <h2 class="text-3xl font-black font-display text-slate-800 tracking-tight">Kelola Pengumuman Portal</h2>
                <p class="text-sm text-slate-500 mt-1">Tambahkan, edit, atau hapus pengumuman yang ditampilkan di portal setelah pengguna login.</p>
            </div>
            <button
                @click="showForm = !showForm"
                :class="showForm ? 'bg-slate-300' : 'bg-cyan-600 hover:bg-cyan-700'"
                class="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-colors whitespace-nowrap"
            >
                {{ showForm ? 'Tutup Form' : '+ Tambah Pengumuman' }}
            </button>
        </div>

        <!-- FORM TAMBAH/EDIT PENGUMUMAN -->
        <transition name="fade">
            <div v-if="showForm" class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
                <h3 class="text-lg font-bold font-display text-slate-800 mb-6">
                    {{ editingId ? 'Edit Pengumuman' : 'Tambah Pengumuman Baru' }}
                </h3>

                <form @submit.prevent="saveAnnouncement" class="space-y-6">
                    <!-- Kolom Message -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Teks Pengumuman *</label>
                        <textarea
                            v-model="announcementForm.message"
                            placeholder="Contoh: Pemkab Banyuwangi mengimbau warga memanfaatkan layanan Smart Kampung untuk administrasi kependudukan."
                            maxlength="500"
                            rows="4"
                            class="block w-full text-sm text-slate-700 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 p-3"
                        />
                        <div class="mt-1 text-xs text-slate-500">{{ announcementForm.message.length }}/500 karakter</div>
                        <div v-if="announcementForm.errors.message" class="mt-2 text-sm text-red-600">{{ announcementForm.errors.message }}</div>
                    </div>

                    <!-- Kolom Sort Order -->
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-2">Urutan Tampil</label>
                        <input
                            v-model.number="announcementForm.sort_order"
                            type="number"
                            min="0"
                            placeholder="Otomatis (opsional)"
                            class="block w-full text-sm text-slate-700 rounded-lg border border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 p-3"
                        />
                        <div class="mt-1 text-xs text-slate-500">Angka lebih kecil tampil lebih dulu. Kosongkan untuk otomatis.</div>
                        <div v-if="announcementForm.errors.sort_order" class="mt-2 text-sm text-red-600">{{ announcementForm.errors.sort_order }}</div>
                    </div>

                    <!-- Checkbox Aktif -->
                    <div class="flex items-center gap-3">
                        <input
                            v-model="announcementForm.is_active"
                            type="checkbox"
                            id="is_active"
                            class="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                        />
                        <label for="is_active" class="text-sm font-semibold text-slate-700 cursor-pointer">
                            Tampilkan di Portal
                        </label>
                    </div>

                    <!-- Tombol Aksi -->
                    <div class="flex items-center gap-4 pt-4 border-t border-slate-200">
                        <button
                            type="submit"
                            :disabled="announcementForm.processing || !announcementForm.message"
                            class="rounded-xl bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-cyan-700 disabled:opacity-50 transition-colors"
                        >
                            {{ announcementForm.processing ? 'Menyimpan...' : editingId ? 'Perbarui' : 'Simpan' }}
                        </button>
                        <button
                            type="button"
                            @click="resetForm"
                            class="rounded-xl bg-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-300 transition-colors"
                        >
                            Batal
                        </button>
                        <span v-if="announcementForm.recentlySuccessful" class="text-sm font-semibold text-emerald-600">Tersimpan!</span>
                    </div>
                </form>
            </div>
        </transition>

        <!-- DAFTAR PENGUMUMAN -->
        <div class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div class="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-200">
                <!-- Info Sidebar -->
                <div class="p-6 md:p-8 bg-linear-to-br from-cyan-50 to-blue-50">
                    <h4 class="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">📋 Statistik Pengumuman</h4>
                    <div class="space-y-3">
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-slate-600">Total Pengumuman:</span>
                            <span class="text-lg font-bold text-slate-800">{{ announcements.length }}</span>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-sm text-slate-600">Sedang Aktif:</span>
                            <span class="text-lg font-bold text-cyan-600">{{ announcements.filter(a => a.is_active).length }}</span>
                        </div>
                        <div v-if="announcements.length === 0" class="pt-2 border-t border-cyan-200">
                            <p class="text-sm text-slate-600 italic">Belum ada pengumuman. Buat yang pertama untuk ditampilkan di portal.</p>
                        </div>
                    </div>
                </div>

                <!-- Daftar Pengumuman -->
                <div class="p-6 md:p-8">
                    <div v-if="announcements.length === 0" class="py-12 text-center text-sm text-slate-500">
                        Belum ada pengumuman. Tambahkan pengumuman pertama Anda.
                    </div>

                    <div v-else class="space-y-4 max-h-96 overflow-y-auto">
                        <div v-for="announcement in announcements" :key="announcement.id" class="p-4 rounded-lg border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-colors group">
                            <!-- Status Badge -->
                            <div class="flex items-start gap-3 mb-2">
                                <button
                                    @click="toggleActive(announcement)"
                                    :class="announcement.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'"
                                    class="text-xs font-bold px-2 py-1 rounded-full transition-colors hover:opacity-80"
                                >
                                    {{ announcement.is_active ? '✓ Aktif' : '✕ Nonaktif' }}
                                </button>
                                <span class="text-xs text-slate-500">Urutan: {{ announcement.sort_order }}</span>
                            </div>

                            <!-- Pesan -->
                            <p class="text-sm text-slate-800 mb-3 line-clamp-2">{{ announcement.message }}</p>

                            <!-- Tombol Aksi -->
                            <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    @click="startEdit(announcement)"
                                    class="text-xs font-semibold text-blue-600 hover:text-blue-700 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    @click="deleteAnnouncement(announcement.id)"
                                    class="text-xs font-semibold text-red-600 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                                >
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
s
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}s

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
