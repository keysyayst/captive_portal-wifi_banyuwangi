<script setup lang="ts">
import { ref } from 'vue';
import type { BackgroundImage } from '@/types/portal';

defineProps<{ images: BackgroundImage[]; activeIndex: number }>();
const emit = defineEmits<{ (e: 'select', index: number): void }>();

// Tracks which slides failed to load so we don't silently show a black
// screen — check the browser console for the exact path that 404'd.
const failed = ref<Record<number, boolean>>({});

function onImageError(index: number, image: BackgroundImage) {
  failed.value[index] = true;
  console.error(`[BackgroundSlider] Gagal memuat gambar (cek path/nama file): ${image.url}`);
}
</script>

<template>
  <div class="absolute inset-0 overflow-hidden" style="background: #050c1a;">
    <img
      v-for="(image, index) in images"
      :key="image.url"
      :src="image.url"
      :alt="image.alt"
      class="bg-slide"
      :style="{ opacity: index === activeIndex && !failed[index] ? 1 : 0 }"
      @error="onImageError(index, image)"
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
