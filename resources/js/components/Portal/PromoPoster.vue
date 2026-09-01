<script setup lang="ts">
import { useBackgroundSlider } from '@/composables/useBackgroundSlider';

interface PosterSlide {
  image: string;
  alt: string;
  href?: string;
}
const slides: PosterSlide[] = [
  { image: '/images/promo/poster1.jpg', alt: 'Banyuwangi Festival', href: 'https://banyuwangifestival.com/' },
  { image: '/images/promo/poster2.png', alt: 'Smart Kampung', href: 'https://smartkampung.id/' },
  { image: '/images/promo/poster3.png', alt: 'Program Pemerintah Terbaru' },
];

const { activeIndex, goTo } = useBackgroundSlider(slides, 5000);
</script>

<template>
  <div class="relative w-full rounded-lg overflow-hidden" style="aspect-ratio: 3 / 4; box-shadow: 0 8px 20px rgba(15,23,42,0.15);">
    <template v-for="(slide, index) in slides" :key="slide.image">
      <a
        v-if="slide.href"
        :href="slide.href"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute inset-0 transition-opacity duration-700"
        :style="{ opacity: index === activeIndex ? 1 : 0, pointerEvents: index === activeIndex ? 'auto' : 'none' }"
      >
        <img :src="slide.image" :alt="slide.alt" class="w-full h-full object-cover" />
      </a>
      <div
        v-else
        class="absolute inset-0 transition-opacity duration-700"
        :style="{ opacity: index === activeIndex ? 1 : 0 }"
      >
        <img :src="slide.image" :alt="slide.alt" class="w-full h-full object-cover" />
      </div>
    </template>

    <div class="absolute inset-x-0 bottom-0 h-14 pointer-events-none" style="background: linear-gradient(to top, rgba(0,0,0,0.4), transparent);" />

    <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
      <button
        v-for="(slide, index) in slides"
        :key="slide.image"
        type="button"
        class="rounded-full transition-all"
        :aria-label="slide.alt"
        :style="{ width: index === activeIndex ? '16px' : '6px', height: '6px', background: index === activeIndex ? '#fff' : 'rgba(255,255,255,0.5)' }"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>
