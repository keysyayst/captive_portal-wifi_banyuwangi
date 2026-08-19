<script setup lang="ts">
import { computed } from 'vue';
import type { PortalLoginState } from '@/types/portal';

const COUNTRY_CODES = ['+62', '+65', '+60', '+61', '+1', '+44', '+81', '+82', '+86', '+91', '+971', '+966'];

const props = defineProps<{
  form: Pick<PortalLoginState, 'countryCode' | 'phone' | 'agreed'>;
  locationText: string;
  locationLoading: boolean;
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:phone', value: string): void;
  (e: 'update:countryCode', value: string): void;
  (e: 'toggle-agree'): void;
  (e: 'show-terms'): void;
  (e: 'connect'): void;
}>();

function formatPhone(value: string) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 3) return digits;
  if (digits.length <= 7) return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
}

function onPhoneInput(event: Event) {
  emit('update:phone', formatPhone((event.target as HTMLInputElement).value));
}

const rawPhoneLength = computed(() => props.form.phone.replace(/\s/g, '').length);
const isValid = computed(() => rawPhoneLength.value >= 8 && props.form.agreed);
</script>

<template>
  <div class="px-6 pb-6 pt-4 space-y-5 anim-up">
    <div v-if="error" class="rounded-xl px-4 py-3 text-xs font-medium" style="background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;">
      {{ error }}
    </div>

    <div class="text-center space-y-1">
      <p class="text-2xl font-bold font-display leading-tight tracking-tight" style="color: #0c1730;">Selamat Datang</p>
      <p class="text-xs text-slate-400">Masukkan nomor HP dan verifikasi untuk mulai browsing</p>

      <div class="flex items-center justify-center gap-1.5 py-1">
        <span v-if="locationLoading" class="flex items-center gap-2 text-xs text-slate-400">
          <span class="w-3.5 h-3.5 text-teal-500 opacity-60">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinning">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            </svg>
          </span>
          Mendeteksi lokasi...
        </span>
        <span v-else class="flex items-center gap-1.5 text-xs text-teal-600 font-medium truncate max-w-[240px]">
          <span class="w-3.5 h-3.5 text-teal-500">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span>{{ locationText }}</span>
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot shrink-0" />
        </span>
      </div>
    </div>

    <div>
      <label class="block text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Nomor Telepon / HP</label>
      <div class="flex gap-2">
        <select
          class="card-select shrink-0"
          style="min-width: 68px;"
          :value="form.countryCode"
          @change="emit('update:countryCode', ($event.target as HTMLSelectElement).value)"
        >
          <option v-for="code in COUNTRY_CODES" :key="code" :value="code">{{ code }}</option>
        </select>
        <div class="relative flex-1">
          <input
            type="tel"
            placeholder="812 3456 7890"
            class="card-input"
            style="letter-spacing: normal;"
            maxlength="13"
            :value="form.phone"
            @input="onPhoneInput"
          />
          <div v-if="rawPhoneLength >= 8" class="absolute right-3 top-1/2 -translate-y-1/2 text-teal-500 w-4 h-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>

    <label class="flex items-start gap-3 cursor-pointer" @click="emit('toggle-agree')">
      <div
        class="mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all"
        :style="form.agreed ? { borderColor: '#0891b2', background: '#0891b2' } : { borderColor: '#cbd5e1', background: 'transparent' }"
      >
        <svg
          v-if="form.agreed"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-3 h-3 text-white"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p class="text-xs leading-relaxed select-none text-slate-500">
        Saya telah membaca dan menyetujui
        <button
          type="button"
          class="font-semibold underline underline-offset-2 text-teal-600 hover:text-teal-700 transition-colors"
          @click.stop="emit('show-terms')"
        >
          Syarat &amp; Ketentuan Penggunaan
        </button>
        layanan WiFi Gratis Banyuwangi.
      </p>
    </label>

    <button
      type="button"
      class="w-full py-3.5 rounded-xl font-bold text-sm font-display tracking-wide transition-all"
      :disabled="!isValid"
      :style="
        isValid
          ? { background: 'linear-gradient(135deg, #0e6a7f 0%, #0891b2 60%, #06b6d4 100%)', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 20px rgba(8,145,178,0.3)' }
          : { background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none' }
      "
      @click="emit('connect')"
    >
      Hubungkan
    </button>
  </div>
</template>
