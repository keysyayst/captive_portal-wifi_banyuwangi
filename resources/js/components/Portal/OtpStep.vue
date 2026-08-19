<script setup lang="ts">
import OtpInput from './OtpInput.vue';
import OtpTimerRing from './OtpTimerRing.vue';
import type { OtpMethod } from '@/types/portal';

defineProps<{
  otp: string[];
  method: OtpMethod;
  maskedPhone: string;
  remaining: number;
  error?: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:otp', value: string[]): void;
  (e: 'back'): void;
  (e: 'verify'): void;
  (e: 'resend'): void;
}>();
</script>

<template>
  <div class="px-6 pb-6 pt-4 space-y-5 anim-up">
    <button type="button" class="flex items-center gap-1.5 text-xs font-semibold text-teal-600 hover:text-teal-700 transition-colors" @click="emit('back')">
      <span class="w-4 h-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </span>
      Kembali
    </button>

    <div class="text-center space-y-1">
      <p class="text-xl font-bold font-display" style="color: #0c1730;">Masukkan Kode OTP</p>
      <p class="text-xs text-slate-400">
        Kode dikirim via <span class="font-medium text-slate-600">{{ method === 'whatsapp' ? 'WhatsApp' : 'SMS' }}</span>
        ke <span class="text-slate-600 font-medium">{{ maskedPhone }}</span>
      </p>
    </div>

    <div v-if="error" class="rounded-xl px-4 py-3 text-xs font-medium" style="background: #fef2f2; border: 1px solid #fecaca; color: #b91c1c;">
      {{ error }}
    </div>

    <OtpInput :model-value="otp" @update:model-value="emit('update:otp', $event)" @complete="emit('verify')" />

    <OtpTimerRing :remaining="remaining" @resend="emit('resend')" />

    <button
      type="button"
      class="w-full py-3.5 rounded-xl font-bold text-sm font-display transition-all"
      :disabled="otp.some((d) => !d)"
      :style="
        otp.every((d) => d)
          ? { background: 'linear-gradient(135deg, #0e6a7f, #0891b2, #06b6d4)', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 20px rgba(8,145,178,0.3)' }
          : { background: '#f1f5f9', color: '#94a3b8', cursor: 'not-allowed', boxShadow: 'none' }
      "
      @click="emit('verify')"
    >
      Verifikasi &amp; Sambungkan
    </button>
  </div>
</template>
