<script setup lang="ts">
const props = withDefaults(defineProps<{ remaining: number; total?: number }>(), {
  total: 60,
});
const emit = defineEmits<{ (e: 'resend'): void }>();

const circumference = 113;

function dashOffset() {
  return Math.max(0, Math.min(circumference, circumference - (circumference * props.remaining) / props.total));
}

function format(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(1, '0')}:${String(s).padStart(2, '0')}`;
}
</script>

<template>
  <div class="flex justify-center">
    <div v-if="remaining > 0" class="flex flex-col items-center gap-2">
      <div class="relative w-14 h-14 flex items-center justify-center">
        <svg class="absolute inset-0 -rotate-90" viewBox="0 0 44 44">
          <circle cx="22" cy="22" r="18" fill="none" stroke="#e2e8f0" stroke-width="2.5" />
          <circle
            cx="22"
            cy="22"
            r="18"
            fill="none"
            stroke="#22d3ee"
            stroke-width="2.5"
            stroke-dasharray="113"
            :stroke-dashoffset="dashOffset()"
            stroke-linecap="round"
            style="transition: stroke-dashoffset 1s linear;"
          />
        </svg>
        <span class="font-bold text-sm font-display z-10" style="color: #0891b2;">{{ format(remaining) }}</span>
      </div>
      <p class="text-xs text-slate-400">Kirim ulang tersedia setelah timer habis</p>
    </div>
    <button v-else type="button" class="text-sm font-semibold transition-colors" style="color: #22d3ee;" @click="emit('resend')">
      Kirim Ulang Kode
    </button>
  </div>
</template>
