<script setup lang="ts">
import { nextTick, ref } from 'vue';

const props = withDefaults(defineProps<{ modelValue: string[]; length?: number }>(), {
  length: 6,
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string[]): void;
  (e: 'complete', value: string): void;
}>();

const inputs = ref<(HTMLInputElement | null)[]>([]);

function setDigit(index: number, raw: string) {
  const digit = raw.replace(/\D/g, '').slice(-1);
  const next = [...props.modelValue];
  next[index] = digit;
  emit('update:modelValue', next);

  if (digit && index < props.length - 1) {
    nextTick(() => inputs.value[index + 1]?.focus());
  }
  if (next.every((d) => d !== '')) emit('complete', next.join(''));
}

function onKeydown(index: number, event: KeyboardEvent) {
  if (event.key === 'Backspace' && !props.modelValue[index] && index > 0) {
    inputs.value[index - 1]?.focus();
  }
}

function onPaste(event: ClipboardEvent) {
  event.preventDefault();
  const pasted = (event.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, props.length);
  const next = Array.from({ length: props.length }, (_, i) => pasted[i] ?? '');
  emit('update:modelValue', next);
  nextTick(() => inputs.value[Math.min(pasted.length, props.length - 1)]?.focus());
  if (next.every((d) => d !== '')) emit('complete', next.join(''));
}
</script>

<template>
  <div class="flex justify-center gap-2">
    <input
      v-for="(digit, index) in modelValue"
      :key="index"
      :ref="(el) => (inputs[index] = el as HTMLInputElement)"
      type="text"
      inputmode="numeric"
      maxlength="1"
      autocomplete="one-time-code"
      class="otp-box"
      :class="{ 'has-val': Boolean(digit) }"
      :value="digit"
      @input="setDigit(index, ($event.target as HTMLInputElement).value)"
      @keydown="onKeydown(index, $event)"
      @paste="onPaste"
    />
  </div>
</template>
