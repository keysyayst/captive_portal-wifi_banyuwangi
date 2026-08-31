<script setup lang="ts">
import { ref } from 'vue';
import { Head, useForm, router } from '@inertiajs/vue3';
import DashboardLayout from '@/layouts/DashboardLayout.vue';

defineOptions({ layout: DashboardLayout });

type Slider = {
    id: number;
    image_path: string;
};

defineProps<{
    sliders: Slider[];
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const form = useForm({
    image: null as File | null,
});

const uploadImage = () => {
    if (!form.image) return;
    form.post('/dashboard/slider', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset('image');
            if (fileInput.value) fileInput.value.value = '';
        },
    });
};

const handleFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        form.image = target.files[0];
    }
};

const deleteImage = (id: number) => {
    if (confirm('Yakin ingin menghapus gambar ini dari portal?')) {
        router.delete(`/dashboard/slider/${id}`, { preserveScroll: true });
    }
};
</script>

<template>
    <Head title="Manajemen Slider" />
    <section class="anim-up">
        <div class="mb-8">
            <h2 class="text-3xl font-black font-display text-slate-800 tracking-tight">Manajemen Slider Portal</h2>
            <p class="text-sm text-slate-500 mt-1">Unggah dan kelola gambar yang akan tampil bergantian di halaman login.</p>
        </div>

        <!-- Form Upload -->
        <div class="mb-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <form @submit.prevent="uploadImage" class="flex items-end gap-4">
                <div class="flex-1">
                    <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Gambar Baru (Max 2MB)</label>
                    <input
                        type="file"
                        ref="fileInput"
                        @change="handleFileChange"
                        accept="image/jpeg,image/png,image/webp"
                        class="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-cyan-50 file:text-cyan-700 hover:file:bg-cyan-100 transition-colors cursor-pointer"
                    />
                </div>
                <button
                    type="submit"
                    :disabled="form.processing || !form.image"
                    class="rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white hover:bg-slate-700 disabled:opacity-50 transition-colors"
                >
                    {{ form.processing ? 'Mengunggah...' : 'Unggah Gambar' }}
                </button>
            </form>
            <div v-if="form.errors.image" class="mt-2 text-sm text-rose-500">{{ form.errors.image }}</div>
        </div>

        <!-- Galeri Gambar -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            <div v-if="!sliders.length" class="col-span-full p-8 text-center text-sm text-slate-500 bg-white rounded-2xl border border-slate-200">
                Belum ada gambar slider. Silakan unggah gambar pertama.
            </div>

            <div
                v-for="slider in sliders"
                :key="slider.id"
                class="group relative aspect-video bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden shadow-sm"
            >
                <img :src="`/storage/${slider.image_path}`" class="w-full h-full object-cover" alt="Slider Image" />

                <!-- Overlay Hover (Tombol Hapus) -->
                <div class="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                        @click="deleteImage(slider.id)"
                        class="px-4 py-2 bg-rose-500 text-white text-xs font-bold rounded-lg shadow-sm hover:bg-rose-600 transition-colors"
                    >
                        Hapus Gambar
                    </button>
                </div>
            </div>
        </div>
    </section>
</template>
