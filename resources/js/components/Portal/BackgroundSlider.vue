<script setup lang="ts">
import type { BackgroundImage } from '@/types/portal';

defineProps<{ images: BackgroundImage[]; activeIndex: number }>();
const emit = defineEmits<{ (e: 'select', index: number): void }>();
</script>

<template>
  <div class="absolute inset-0 overflow-hidden">
    <div
      v-for="(image, index) in images"
      :key="image.url"
      class="bg-slide"
      :style="{ backgroundImage: `url('${image.url}')`, opacity: index === activeIndex ? 1 : 0 }"
    />
  </div>

  <div
    class="absolute inset-0"
    style="background: linear-gradient(to right, rgba(5,12,26,0.2) 0%, rgba(5,12,26,0.25) 50%, rgba(5,12,26,0.45) 100%);"
  />

  <div class="absolute bottom-6 left-6 flex gap-1.5 z-10">
    <button
      v-for="(image, index) in images"
      :key="image.url"
      type="button"
      class="rounded-full transition-all"
      :aria-label="image.alt"
      :style="{
        width: index === activeIndex ? '20px' : '6px',
        height: '6px',
        background: index === activeIndex ? '#fff' : 'rgba(255,255,255,0.35)',
      }"
      @click="emit('select', index)"
    />
  </div>
</template>
