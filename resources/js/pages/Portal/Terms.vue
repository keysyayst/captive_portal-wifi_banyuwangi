<script setup lang="ts">
import { ref, onMounted } from 'vue';

defineProps<{ open: boolean }>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const termsContent = ref<string>('');
const loading = ref(true);
const error = ref<string | null>(null);

onMounted(async () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const queryString = params.toString() ? `?${params.toString()}` : '';
    
    const response = await fetch(`/api/terms${queryString}`);

    if (!response.ok) {
      throw new Error('Failed to fetch terms');
    }

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
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
      >
        <div
          class="absolute inset-0 bg-black/70 backdrop-blur-md"
          @click="emit('close')"
        />
        <div
          class="relative flex max-h-[90vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:max-w-lg sm:rounded-2xl"
        >
          <div
            class="flex items-center justify-between border-b border-gray-100 px-6 py-4"
          >
            <div class="min-w-0 pr-4">
              <p
                class="font-display text-sm font-bold text-gray-800"
              >
                Syarat &amp; Ketentuan Penggunaan
              </p>

              <p class="mt-0.5 text-xs text-gray-400">
                WiFi Gratis Banyuwangi
              </p>
            </div>

            <button
              type="button"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-400 transition-colors hover:bg-gray-200"
              aria-label="Tutup"
              @click="emit('close')"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-4 w-4"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
          <div class="flex-1 overflow-y-auto px-6 py-5">
            <div
              v-if="loading"
              class="py-8 text-center"
            >
              <div class="mb-3 flex justify-center">
                <div
                  class="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-teal-600"
                />
              </div>

              <p class="text-sm text-slate-400">
                Memuat syarat dan ketentuan...
              </p>
            </div>


            <!-- ERROR -->
            <div
              v-else-if="error"
              class="py-8 text-center"
            >
              <div
                class="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-red-50 text-red-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="h-5 w-5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>

              <p class="text-sm text-red-500">
                {{ error }}
              </p>
            </div>

            <div
              v-else
              class="terms-body"
              v-html="termsContent"
            />

          </div>
          <div
            class="border-t border-gray-100 bg-white px-6 py-4"
          >
            <button
              type="button"
              class="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all hover:opacity-95 active:scale-[0.98]"
              style="
                background: linear-gradient(
                  135deg,
                  #0e6a7f,
                  #0891b2
                );
              "
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
.terms-fade-leave-active {
  transition: opacity 0.2s ease;
}

.terms-fade-enter-from,
.terms-fade-leave-to {
  opacity: 0;
}


.terms-body {
  font-size: 0.75rem;
  line-height: 1.5rem;
  color: rgb(71 85 105);
}

.terms-body h1 {
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: rgb(15 23 42);
}

.terms-body h2 {
  margin-top: 1rem;
  margin-bottom: 0.75rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: rgb(15 23 42);
}

.terms-body h3 {
  margin-top: 0.875rem;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 700;
  color: rgb(15 23 42);
}

.terms-body h4 {
  margin-top: 0.75rem;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 600;
  color: rgb(30 41 59);
}

.terms-body p {
  margin-bottom: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
  color: rgb(71 85 105);
}

.terms-body ul,
.terms-body ol {
  margin-left: 1rem;
  margin-bottom: 0.75rem;
  padding-left: 1rem;
  font-size: 0.75rem;
  line-height: 1.5rem;
  color: rgb(71 85 105);
}

.terms-body ul {
  list-style-type: disc;
}

.terms-body ol {
  list-style-type: decimal;
}

.terms-body li {
  margin-bottom: 0.25rem;
}

.terms-body a {
  color: rgb(13 148 136);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.terms-body a:hover {
  color: rgb(15 118 110);
}

.terms-body strong,
.terms-body b {
  font-weight: 600;
  color: rgb(30 41 59);
}

.terms-body table {
  width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
  font-size: 0.75rem;
}

.terms-body th,
.terms-body td {
  border: 1px solid rgb(226 232 240);
  padding: 0.5rem;
  text-align: left;
}

.terms-body th {
  background: rgb(248 250 252);
  font-weight: 600;
  color: rgb(30 41 59);
}

.terms-body blockquote {
  margin: 0.75rem 0;
  border-left: 3px solid rgb(13 148 136);
  padding-left: 0.75rem;
  color: rgb(100 116 139);
}

@media (max-width: 380px) {
  .terms-body {
    font-size: 0.7rem;
    line-height: 1.4rem;
  }

  .terms-body p,
  .terms-body ul,
  .terms-body ol {
    font-size: 0.7rem;
    line-height: 1.4rem;
  }
}
</style>