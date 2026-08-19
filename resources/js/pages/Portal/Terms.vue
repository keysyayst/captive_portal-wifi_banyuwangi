<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();

const termsContent = ref<string>('');
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const response = await fetch('/api/terms');
    if (!response.ok) throw new Error('Failed to fetch terms');
    
    const data = await response.json();
    termsContent.value = data.terms || '';
  } catch (err) {
    console.error('Error fetching terms:', err);
    error.value = 'Gagal memuat syarat dan ketentuan';
  } finally {
    loading.value = false;
  }
});

</script>

<template>
  <Teleport to="body">
    <Transition name="terms-fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="emit('close')" />

        <div class="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] anim-up" style="overflow: hidden;">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <p class="font-bold text-sm font-display text-gray-800">Syarat &amp; Ketentuan Penggunaan</p>
              <p class="text-xs text-gray-400 mt-0.5">WiFi Gratis Banyuwangi</p>
            </div>
            <button
              type="button"
              class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors shrink-0"
              @click="emit('close')"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <div class="overflow-y-auto px-6 py-5 flex-1">
            <!-- Loading State -->
            <div v-if="loading" class="text-center py-8">
              <p class="text-slate-400 text-sm">Memuat syarat dan ketentuan...</p>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-center py-8">
              <p class="text-red-500 text-sm">{{ error }}</p>
            </div>

            <!-- Content from API -->
            <div v-else class="terms-body prose prose-sm max-w-none" v-html="termsContent" />
          </div>

          <div class="px-6 py-4 border-t border-gray-100">
            <button
              type="button"
              class="w-full py-3 rounded-xl text-white font-semibold text-sm font-display transition-all"
              style="background: linear-gradient(135deg, #0e6a7f, #0891b2);"
              @click="emit('close')"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.terms-fade-enter-active,
.terms-fade-leave-active { transition: opacity 0.2s ease; }
.terms-fade-enter-from,
.terms-fade-leave-to { opacity: 0; }

.terms-body h2 { @apply text-lg font-bold mb-3 mt-4; }
.terms-body h4 { @apply text-sm font-semibold mb-2 mt-3; }
.terms-body p { @apply text-xs text-slate-600 mb-3; }
.terms-body ul, .terms-body ol { @apply text-xs text-slate-600 ml-4 mb-3; }
.terms-body li { @apply mb-1; }
</style>