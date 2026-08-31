<script setup lang="ts">
import { ref } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

type Slider = {
    id: number;
    image_path: string;
};

const props = defineProps<{
    currentMethod: string;
    sliders: Slider[];
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
</script>

<template>
    <Head title="Pengaturan Portal" />
    <section class="anim-up">
        <div class="mb-8">
            <h2 class="text-3xl font-black font-display text-slate-800 tracking-tight">Pengaturan Portal</h2>
            <p class="text-sm text-slate-500 mt-1">Pusat kendali metode autentikasi dan aset visual halaman login WiFi.</p>
        </div>

        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm mb-8">
            <h3 class="text-lg font-bold font-display text-slate-800 mb-4">Metode Login Utama</h3>
            <form @submit.prevent="saveSettings">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <label
                        class="flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors"
                        :class="settingForm.login_method === 'phone' ? 'border-cyan-500 bg-cyan-50/50' : 'border-slate-200 hover:bg-slate-50'"
                    >
                        <input type="radio" v-model="settingForm.login_method" value="phone" class="mt-1 w-5 h-5 text-cyan-600 focus:ring-cyan-500 border-slate-300">
                        <div>
                            <div class="font-bold text-slate-800">Nomor Handphone (OTP)</div>
                            <div class="text-sm text-slate-500 mt-0.5">Pengguna masuk menggunakan validasi nomor WhatsApp atau SMS.</div>
                        </div>
                    </label>

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

        <div class="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm">
            <h3 class="text-lg font-bold font-display text-slate-800 mb-1">Galeri Slider Portal</h3>
            <p class="text-sm text-slate-500 mb-6">Unggah dan kelola gambar yang akan tampil bergantian di halaman depan.</p>

            <form @submit.prevent="uploadImage" class="flex flex-wrap items-end gap-4 mb-8 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div class="flex-1 min-w-62.5">
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Gambar Baru (Max 2MB)</label>
                    <input
                        type="file" ref="fileInput" @change="handleFileChange" accept="image/jpeg,image/png,image/webp"
                        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-100 file:text-cyan-700 hover:file:bg-cyan-200 transition-colors cursor-pointer"
                    />
                </div>
                <button type="submit" :disabled="sliderForm.processing || !sliderForm.image" class="rounded-xl bg-cyan-600 px-6 py-2.5 text-sm font-bold text-white hover:bg-cyan-700 disabled:opacity-50 transition-colors">
                    {{ sliderForm.processing ? 'Mengunggah...' : 'Unggah Gambar' }}
                </button>
            </form>

            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                <div v-if="!sliders.length" class="col-span-full py-8 text-center text-sm text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
                    Belum ada gambar slider.
                </div>

                <div v-for="slider in sliders" :key="slider.id" class="group relative aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                    <img :src="`/storage/${slider.image_path}`" class="w-full h-full object-cover" alt="Slider Image" />
                    <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button @click="deleteImage(slider.id)" class="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-rose-600 transition-colors">
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
