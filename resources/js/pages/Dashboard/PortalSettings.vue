<script setup lang="ts">
import { ref } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

type Slider = {
    id: number;
    image_path: string;
    type: string;
};

type Announcement = {
    id: number;
    message: string;
    is_active: boolean;
    sort_order: number;
    created_at: string;
};

const props = defineProps<{
    currentMethod: string;
    sliders: Slider[];
    announcements: Announcement[];
}>();

const settingForm = useForm({
    login_method: props.currentMethod,
});

const saveSettings = () => {
    settingForm.post('/dashboard/settings', { preserveScroll: true });
};

const fileInput = ref<HTMLInputElement | null>(null);
const sliderForm = useForm({
    image: null as File | null,
    type: 'before_login',
});

const uploadImage = () => {
    if (!sliderForm.image) return;
    sliderForm.post('/dashboard/slider', {
        preserveScroll: true,
        onSuccess: () => {
            sliderForm.reset('image');
            if (fileInput.value) fileInput.value.value = '';
        },
    });
};

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        sliderForm.image = target.files[0];
    }
};

const deleteImage = (id: number) => {
    if (confirm('Yakin ingin menghapus gambar ini dari portal?')) {
        router.delete(`/dashboard/slider/${id}`, { preserveScroll: true });
    }
};

const showAnnouncementForm = ref(false);
const editingAnnouncementId = ref<number | null>(null);

const announcementForm = useForm({
    message: '',
    is_active: false,
    sort_order: null as number | null,
});

const resetAnnouncementForm = () => {
    announcementForm.reset();
    editingAnnouncementId.value = null;
    showAnnouncementForm.value = false;
};

const startEditAnnouncement = (announcement: Announcement) => {
    editingAnnouncementId.value = announcement.id;
    announcementForm.message = announcement.message;
    announcementForm.is_active = announcement.is_active;
    announcementForm.sort_order = announcement.sort_order;
    showAnnouncementForm.value = true;
};

const saveAnnouncement = () => {
    if (editingAnnouncementId.value) {
        announcementForm.patch(`/dashboard/announcements/${editingAnnouncementId.value}`, {
            preserveScroll: true,
            onSuccess: () => resetAnnouncementForm(),
        });
    } else {
        announcementForm.post('/dashboard/announcements', {
            preserveScroll: true,
            onSuccess: () => resetAnnouncementForm(),
        });
    }
};

const deleteAnnouncement = (id: number) => {
    if (confirm('Yakin ingin menghapus pengumuman ini?')) {
        router.delete(`/dashboard/announcements/${id}`, { preserveScroll: true });
    }
};

const toggleAnnouncementActive = (announcement: Announcement) => {
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
    <Head title="Pengaturan Portal" />
    <section class="anim-up">
        <div class="mb-8">
            <h2 class="text-3xl font-black font-display text-slate-800 tracking-tight">Pengaturan Portal</h2>
            <p class="text-sm text-slate-500 mt-1">Pusat kendali metode autentikasi dan aset visual halaman login WiFi.</p>
        </div>

        <!-- SEKSI 1: KONFIGURASI METODE LOGIN -->
        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <h3 class="text-lg font-bold font-display text-slate-800 mb-4">Metode Login Utama</h3>
            <form @submit.prevent="saveSettings">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <!-- Opsi Phone -->
                    <label
                        class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors"
                        :class="settingForm.login_method === 'phone' ? 'border-cyan-500 bg-cyan-50/50' : 'border-slate-200 hover:bg-slate-50'"
                    >
                        <input type="radio" v-model="settingForm.login_method" value="phone" class="mt-1 w-5 h-5 text-cyan-600 focus:ring-cyan-500 border-slate-300">
                        <div>
                            <div class="font-bold text-slate-800">Nomor Handphone</div>
                            <div class="text-sm text-slate-500 mt-0.5">Pengguna masuk menggunakan nomor HP (OTP dimatikan).</div>
                        </div>
                    </label>

                    <!-- Opsi NIK -->
                    <label
                        class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors"
                        :class="settingForm.login_method === 'nik' ? 'border-cyan-500 bg-cyan-50/50' : 'border-slate-200 hover:bg-slate-50'"
                    >
                        <input type="radio" v-model="settingForm.login_method" value="nik" class="mt-1 w-5 h-5 text-cyan-600 focus:ring-cyan-500 border-slate-300">
                        <div>
                            <div class="font-bold text-slate-800">Nomor Induk Kependudukan</div>
                            <div class="text-sm text-slate-500 mt-0.5">Pengguna masuk menggunakan NIK (SSO Smart Kampung).</div>
                        </div>
                    </label>
                </div>
                <div class="flex items-center gap-4">
                    <button type="submit" :disabled="settingForm.processing || !settingForm.isDirty" class="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-50 transition-colors">
                        {{ settingForm.processing ? 'Menyimpan...' : 'Simpan Konfigurasi' }}
                    </button>
                    <span v-if="settingForm.recentlySuccessful" class="text-sm font-semibold text-emerald-600">Tersimpan!</span>
                </div>
            </form>
        </div>

        <!-- SEKSI 2: MANAJEMEN SLIDER GAMBAR -->
        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold font-display text-slate-800 mb-1">Galeri Slider Portal</h3>
            <p class="text-sm text-slate-500 mb-6">Unggah dan kelola gambar yang akan tampil bergantian di halaman depan dan dalam.</p>

            <!-- Form Upload -->
            <form @submit.prevent="uploadImage" class="flex flex-wrap items-end gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">

                <div class="flex-1 min-w-50">
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Penempatan Gambar</label>
                    <select v-model="sliderForm.type" class="block w-full text-sm text-slate-700 rounded-lg border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 py-2.5">
                        <option value="before_login">Portal Luar (Sebelum Login)</option>
                        <option value="after_login">Portal Dalam (Setelah Login)</option>
                    </select>
                </div>

                <div class="flex-1 min-w-62.5">
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih File (Max 2MB)</label>
                    <input
                        type="file" ref="fileInput" @change="handleFileChange" accept="image/jpeg,image/png,image/webp"
                        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200 transition-colors cursor-pointer"
                    />
                </div>

                <button type="submit" :disabled="sliderForm.processing || !sliderForm.image" class="rounded-xl bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-cyan-700 disabled:opacity-50 transition-colors h-10.5">
                    {{ sliderForm.processing ? 'Mengunggah...' : 'Unggah Gambar' }}
                </button>
            </form>

            <!-- Grid Galeri -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-if="!sliders.length" class="col-span-full py-8 text-center text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                    Belum ada gambar slider. Silakan unggah gambar pertama.
                </div>

                <div v-for="slider in sliders" :key="slider.id" class="group relative aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <img :src="`/storage/${slider.image_path}`" class="w-full h-full object-cover" alt="Slider Image" />

                    <!-- Label Penempatan -->
                    <div class="absolute top-2 left-2 px-2 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider rounded shadow-sm">
                        {{ slider.type === 'before_login' ? 'Portal Luar' : 'Portal Dalam' }}
                    </div>

                    <!-- Overlay Hover (Tombol Hapus) -->
                    <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button @click="deleteImage(slider.id)" class="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-rose-600 transition-colors">
                            Hapus Gambar
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- SEKSI 3: MANAJEMEN PENGUMUMAN PORTAL -->
        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mt-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h3 class="text-lg font-bold font-display text-slate-800">Pengumuman Portal</h3>
                    <p class="text-sm text-slate-500 mt-1">Kelola pesan dan informasi yang ditampilkan di halaman portal setelah pengguna login.</p>
                </div>
                <button
                    @click="showAnnouncementForm = !showAnnouncementForm"
                    :class="showAnnouncementForm ? 'bg-slate-300' : 'bg-cyan-600 hover:bg-cyan-700'"
                    class="rounded-xl px-6 py-2.5 text-sm font-bold text-white transition-colors whitespace-nowrap"
                >
                    {{ showAnnouncementForm ? 'Tutup Form' : '+ Tambah Pengumuman' }}
                </button>
            </div>

            <!-- Form Tambah/Edit Pengumuman -->
            <transition name="fade">
                <div v-if="showAnnouncementForm" class="p-4 mb-6 bg-slate-50 rounded-xl border border-slate-200">
                    <form @submit.prevent="saveAnnouncement" class="space-y-4">
                        <!-- Kolom Message -->
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-2">Teks Pengumuman *</label>
                            <textarea
                                v-model="announcementForm.message"
                                placeholder="Contoh: Pemkab Banyuwangi mengimbau warga memanfaatkan layanan Smart Kampung untuk administrasi kependudukan."
                                maxlength="500"
                                rows="3"
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
                        </div>

                        <!-- Checkbox Aktif -->
                        <div class="flex items-center gap-3 pt-2">
                            <input
                                v-model="announcementForm.is_active"
                                type="checkbox"
                                id="is_active_form"
                                class="w-5 h-5 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
                            />
                            <label for="is_active_form" class="text-sm font-semibold text-slate-700 cursor-pointer">
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
                                {{ announcementForm.processing ? 'Menyimpan...' : editingAnnouncementId ? 'Perbarui' : 'Simpan' }}
                            </button>
                            <button
                                type="button"
                                @click="resetAnnouncementForm"
                                class="rounded-xl bg-slate-200 px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-300 transition-colors"
                            >
                                Batal
                            </button>
                            <span v-if="announcementForm.recentlySuccessful" class="text-sm font-semibold text-emerald-600">Tersimpan!</span>
                        </div>
                    </form>
                </div>
            </transition>

            <!-- Daftar Pengumuman -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <!-- Info Sidebar -->
                <div class="p-4 bg-linear-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-200">
                    <h4 class="text-sm font-bold uppercase tracking-wider text-slate-700 mb-4">📋 Statistik</h4>
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
                            <p class="text-sm text-slate-600 italic">Belum ada pengumuman. Buat yang pertama.</p>
                        </div>
                    </div>
                </div>

                <!-- Daftar Pengumuman -->
                <div class="md:col-span-2 space-y-3 max-h-96 overflow-y-auto">
                    <div v-if="announcements.length === 0" class="py-8 text-center text-sm text-slate-500">
                        Belum ada pengumuman. Tambahkan pengumuman baru.
                    </div>

                    <div v-for="announcement in announcements" :key="announcement.id" class="p-3 rounded-lg border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50/50 transition-colors group">
                        <!-- Status Badge -->
                        <div class="flex items-start gap-2 mb-2">
                            <button
                                @click="toggleAnnouncementActive(announcement)"
                                :class="announcement.is_active ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-600'"
                                class="text-xs font-bold px-2 py-1 rounded-full transition-colors hover:opacity-80"
                            >
                                {{ announcement.is_active ? '✓ Aktif' : '✕ Nonaktif' }}
                            </button>
                            <span class="text-xs text-slate-500">Urutan: {{ announcement.sort_order }}</span>
                        </div>

                        <!-- Pesan -->
                        <p class="text-sm text-slate-800 mb-2 line-clamp-2">{{ announcement.message }}</p>

                        <!-- Tombol Aksi -->
                        <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                @click="startEditAnnouncement(announcement)"
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
    </section>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

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
