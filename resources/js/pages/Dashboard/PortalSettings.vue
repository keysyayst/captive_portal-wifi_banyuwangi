<script setup lang="ts">
import { computed, ref } from 'vue';
import { Head, router, useForm } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

type Slider = { id: number; image_path: string; type: string };
type PortalContent = {
    id: string;
    content_id: number;
    content_type: 'announcement' | 'ticker';
    message: string;
    display_location: 'ticker' | 'info';
    is_active: boolean;
    sort_order: number;
};

const props = defineProps<{
    currentMethod: string;
    sliders: Slider[];
    portalContents: PortalContent[];
}>();

const contentStats = computed(() => ({
    total: props.portalContents.length,
    active: props.portalContents.filter((content) => content.is_active).length,
    ticker: props.portalContents.filter((content) => content.display_location === 'ticker').length,
    info: props.portalContents.filter((content) => content.display_location === 'info').length,
}));

const settingForm = useForm({ login_method: props.currentMethod });
const saveSettings = () => settingForm.post('/dashboard/settings', { preserveScroll: true });

const fileInput = ref<HTMLInputElement | null>(null);
const sliderForm = useForm({ image: null as File | null, type: 'before_login' });
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
const handleFileChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    if (file.size > 2097152) {
        alert('Gagal! Ukuran gambar terlalu besar. Maksimal ukuran file adalah 2MB.');
        input.value = '';
        sliderForm.image = null;
        return;
    }
    sliderForm.image = file;
};
const deleteImage = (id: number) => {
    if (confirm('Yakin ingin menghapus gambar ini dari portal?')) router.delete(`/dashboard/slider/${id}`, { preserveScroll: true });
};

const showContentForm = ref(false);
const editingContent = ref<PortalContent | null>(null);
const contentForm = useForm({
    content_type: 'ticker' as 'announcement' | 'ticker',
    message: '',
    display_location: 'ticker' as 'ticker' | 'info',
    is_active: true,
    sort_order: null as number | null,
});
const resetContentForm = () => {
    contentForm.reset();
    contentForm.content_type = 'ticker';
    contentForm.display_location = 'ticker';
    editingContent.value = null;
    showContentForm.value = false;
};
const startEditContent = (content: PortalContent) => {
    editingContent.value = content;
    contentForm.content_type = content.content_type;
    contentForm.message = content.message;
    contentForm.display_location = content.display_location;
    contentForm.is_active = content.is_active;
    contentForm.sort_order = content.sort_order;
    showContentForm.value = true;
};
const saveContent = () => {
    const options = { preserveScroll: true, onSuccess: () => resetContentForm() };
    if (editingContent.value) {
        contentForm.patch(
            `/dashboard/portal-content/${editingContent.value.content_type}/${editingContent.value.content_id}`,
            options,
        );
    } else {
        contentForm.post('/dashboard/portal-content', options);
    }
};
const deleteContent = (content: PortalContent) => {
    if (confirm('Yakin ingin menghapus teks ini?')) router.delete(`/dashboard/portal-content/${content.content_type}/${content.content_id}`, { preserveScroll: true });
};
const toggleContentActive = (content: PortalContent) => {
    contentForm.content_type = content.content_type;
    contentForm.message = content.message;
    contentForm.display_location = content.display_location;
    contentForm.is_active = !content.is_active;
    contentForm.sort_order = content.sort_order;
    contentForm.patch(`/dashboard/portal-content/${content.content_type}/${content.content_id}`, { preserveScroll: true });
};
</script>

<template>
    <Head title="Pengaturan Portal" />
    <section class="anim-up">
        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <h3 class="text-lg font-bold font-display text-slate-800 mb-4">Metode Login Utama</h3>
            <form @submit.prevent="saveSettings">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <label class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer" :class="settingForm.login_method === 'phone' ? 'border-cyan-500 bg-cyan-50/50' : 'border-slate-200 hover:bg-slate-50'">
                        <input v-model="settingForm.login_method" type="radio" value="phone" class="mt-1 w-5 h-5 text-cyan-600 focus:ring-cyan-500 border-slate-300">
                        <div><div class="font-bold text-slate-800">Nomor Handphone</div><div class="text-sm text-slate-500 mt-0.5">Pengguna masuk menggunakan nomor HP.</div></div>
                    </label>
                    <label class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer" :class="settingForm.login_method === 'nik' ? 'border-cyan-500 bg-cyan-50/50' : 'border-slate-200 hover:bg-slate-50'">
                        <input v-model="settingForm.login_method" type="radio" value="nik" class="mt-1 w-5 h-5 text-cyan-600 focus:ring-cyan-500 border-slate-300">
                        <div><div class="font-bold text-slate-800">Nomor Induk Kependudukan</div><div class="text-sm text-slate-500 mt-0.5">Pengguna masuk menggunakan NIK.</div></div>
                    </label>
                </div>
                <button type="submit" :disabled="settingForm.processing || !settingForm.isDirty" class="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-50">{{ settingForm.processing ? 'Menyimpan...' : 'Simpan Konfigurasi' }}</button>
            </form>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <h3 class="text-lg font-bold font-display text-slate-800 mb-1">Galeri Slider Portal</h3>
            <p class="text-sm text-slate-500 mb-6">Unggah dan kelola gambar portal luar atau portal dalam.</p>
            <form @submit.prevent="uploadImage" class="flex flex-wrap items-end gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex-1 min-w-50"><label class="block text-sm font-semibold text-slate-700 mb-2">Penempatan Gambar</label><select v-model="sliderForm.type" class="block w-full text-sm rounded-lg border-2 border-slate-300 bg-white py-2.5 px-3"><option value="before_login">Portal Luar (Sebelum Login)</option><option value="after_login">Portal Dalam (Setelah Login)</option></select></div>
                <div class="flex-1 min-w-62.5"><label class="block text-sm font-semibold text-slate-700 mb-2">Pilih File (Max 2MB)</label><input ref="fileInput" type="file" accept="image/jpeg,image/png,image/webp" @change="handleFileChange" class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-100 file:text-cyan-700"></div>
                <button type="submit" :disabled="sliderForm.processing || !sliderForm.image" class="rounded-xl bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50">{{ sliderForm.processing ? 'Mengunggah...' : 'Unggah Gambar' }}</button>
            </form>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-if="!sliders.length" class="col-span-full py-8 text-center text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">Belum ada gambar slider.</div>
                <div v-for="slider in sliders" :key="slider.id" class="group relative aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <img :src="`/storage/${slider.image_path}`" class="w-full h-full object-cover" alt="Slider Portal">
                    <div class="absolute top-2 left-2 px-2 py-1 bg-slate-900/80 text-white text-[10px] font-bold uppercase rounded">{{ slider.type === 'before_login' ? 'Portal Luar' : 'Portal Dalam' }}</div>
                    <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><button @click="deleteImage(slider.id)" class="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-lg">Hapus Gambar</button></div>
                </div>
            </div>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <!-- Header Section -->
            <div class="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h3 class="text-lg font-bold font-display text-slate-800">Info dan Ticker Portal</h3>
                    <p class="text-sm text-slate-500 mt-1">Satu pengelola untuk teks info portal dan teks berjalan di bagian atas.</p>
                </div>
                <button @click="showContentForm = !showContentForm" :class="showContentForm ? 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200' : 'bg-cyan-600 hover:bg-cyan-700 text-white'" class="rounded-xl border px-6 py-2.5 text-sm font-bold transition-colors">
                    {{ showContentForm ? 'Tutup Form' : '+ Tambah Teks' }}
                </button>
            </div>

            <!-- Form Tambah/Edit (Tetap di atas agar mudah diakses) -->
            <div v-if="showContentForm" class="p-5 mb-8 bg-slate-50 rounded-xl border border-slate-200">
                <form @submit.prevent="saveContent" class="space-y-4">
                    <div>
                        <label class="block text-sm font-semibold text-slate-700 mb-1.5">Teks *</label>
                        <textarea
                            v-model="contentForm.message"
                            maxlength="1000"
                            rows="5"
                            class="block min-h-32 w-full resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-base leading-relaxed text-slate-800 shadow-sm placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500"
                            placeholder="Contoh: Jelajahi layanan publik Kabupaten Banyuwangi lewat menu Akses Cepat Layanan di bawah."
                        />
                        <div class="mt-1 flex justify-end text-xs text-slate-500">{{ contentForm.message.length }}/1000 karakter</div>
                        <div v-if="contentForm.errors.message" class="mt-1 text-sm text-red-600 font-medium">{{ contentForm.errors.message }}</div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Tampilkan Sebagai</label>
                            <select v-model="contentForm.display_location" class="block w-full text-sm rounded-lg border-slate-300 shadow-sm py-2.5 px-3 focus:border-cyan-500 focus:ring-cyan-500">
                                <option value="ticker">Ticker Atas Portal</option>
                                <option value="info">Info Portal</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-slate-700 mb-1.5">Urutan Tampil</label>
                            <input v-model.number="contentForm.sort_order" type="number" min="0" placeholder="Opsional (misal: 1)" class="block w-full text-sm rounded-lg border-slate-300 shadow-sm p-2.5 focus:border-cyan-500 focus:ring-cyan-500">
                        </div>
                    </div>
                    <label class="flex items-center gap-3 pt-1">
                        <input v-model="contentForm.is_active" type="checkbox" class="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500">
                        <span class="text-sm font-semibold text-slate-700 cursor-pointer select-none">Tampilkan sekarang</span>
                    </label>
                    <div class="flex items-center gap-3 pt-4 border-t border-slate-200 mt-2">
                        <button type="submit" :disabled="contentForm.processing || !contentForm.message" class="rounded-xl bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white disabled:opacity-50 hover:bg-cyan-700 transition-colors">
                            {{ contentForm.processing ? 'Menyimpan...' : editingContent ? 'Perbarui' : 'Simpan' }}
                        </button>
                        <button type="button" @click="resetContentForm" class="rounded-xl bg-white border border-slate-300 px-6 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors">
                            Batal
                        </button>
                    </div>
                </form>
            </div>

            <!-- Grid Layout: Kiri (Daftar Teks) & Kanan (Statistik) -->
            <div class="flex flex-col-reverse lg:flex-row gap-6 lg:gap-8">

                <!-- KIRI: Daftar Konten Teks -->
                <div class="flex-1">
                    <div v-if="!portalContents.length" class="py-8 text-center text-sm font-medium text-slate-500 border border-dashed border-slate-200 rounded-xl">
                        Belum ada teks info atau ticker portal.
                    </div>

                    <!-- space-y-2.5 membuat jarak antar item padat -->
                    <div v-else class="space-y-2.5">
                        <div v-for="content in portalContents" :key="content.id" class="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div>
                                <div class="flex flex-wrap items-center gap-2 mb-1.5">
                                    <button @click="toggleContentActive(content)" :class="content.is_active ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100' : 'bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100'" class="text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wide transition-colors" title="Ubah status">
                                        {{ content.is_active ? 'Aktif' : 'Nonaktif' }}
                                    </button>
                                    <span class="text-[10px] font-bold text-cyan-700 bg-cyan-50 border border-cyan-100 px-2 py-0.5 rounded uppercase tracking-wide">
                                        {{ content.display_location === 'ticker' ? 'Ticker Atas' : 'Info Portal' }}
                                    </span>
                                    <span class="text-xs text-slate-400 font-medium">Urutan: {{ content.sort_order || '-' }}</span>
                                </div>
                                <p class="text-sm text-slate-800 font-medium line-clamp-2 leading-relaxed">{{ content.message }}</p>
                            </div>

                            <div class="flex items-center gap-2 shrink-0">
                                <button @click="startEditContent(content)" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-50 transition-colors">
                                    Edit
                                </button>
                                <button @click="deleteContent(content)" class="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 text-xs font-bold rounded-lg hover:bg-rose-50 hover:text-rose-600 transition-colors">
                                    Hapus
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- KANAN: Sidebar Statistik -->
                <div class="w-full lg:w-64 xl:w-72 shrink-0">
                    <div class="grid grid-cols-2 lg:grid-cols-1 gap-3">
                        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Total Teks</span>
                            <span class="text-xl font-black text-slate-800">{{ contentStats.total }}</span>
                        </div>
                        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Sedang Aktif</span>
                            <span class="text-xl font-black text-emerald-600">{{ contentStats.active }}</span>
                        </div>
                        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Ticker Atas</span>
                            <span class="text-xl font-black text-slate-800">{{ contentStats.ticker }}</span>
                        </div>
                        <div class="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                            <span class="text-xs font-bold text-slate-500 uppercase tracking-wide">Info Portal</span>
                            <span class="text-xl font-black text-slate-800">{{ contentStats.info }}</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>
