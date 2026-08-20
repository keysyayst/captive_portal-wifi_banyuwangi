<script setup lang="ts">
import { useBackgroundSlider } from '@/composables/useBackgroundSlider';

interface PromoBanner {
  image: string;
  alt: string;
  href?: string;
}

// TODO: ganti gambar & link sesuai materi promosi terbaru.
// Taruh filenya di public/images/promo/.
const banners: PromoBanner[] = [
  { image: '/images/promo/banyuwangi-festival.jpg', alt: 'Banyuwangi Festival', href: 'https://banyuwangifestival.com/' },
  { image: '/images/promo/smart-kampung.jpg', alt: 'Smart Kampung', href: 'https://smartkampung.id/' },
  { image: '/images/promo/program-pemerintah.jpg', alt: 'Program Pemerintah Terbaru' },
];

const { activeIndex, goTo } = useBackgroundSlider(banners, 5000);
</script>

<template>
  <div
    class="relative w-full rounded-2xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] max-h-[190px] sm:max-h-[230px]"
    style="box-shadow: 0 10px 28px rgba(15,23,42,0.14);"
  >
    <template v-for="(banner, index) in banners" :key="banner.image">
      <a
        v-if="banner.href"
        :href="banner.href"
        target="_blank"
        rel="noopener noreferrer"
        class="absolute inset-0 transition-opacity duration-700"
        :style="{ opacity: index === activeIndex ? 1 : 0, pointerEvents: index === activeIndex ? 'auto' : 'none' }"
      >
        <img :src="banner.image" :alt="banner.alt" class="w-full h-full object-cover" />
      </a>
      <div
        v-else
        class="absolute inset-0 transition-opacity duration-700"
        :style="{ opacity: index === activeIndex ? 1 : 0 }"
      >
        <img :src="banner.image" :alt="banner.alt" class="w-full h-full object-cover" />
      </div>
    </template>

    <!-- Gradient tipis biar dot indicator tetap kebaca di atas gambar apa pun -->
    <div class="absolute inset-x-0 bottom-0 h-12 pointer-events-none" style="background: linear-gradient(to top, rgba(0,0,0,0.32), transparent);" />

    <div class="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
      <button
        v-for="(banner, index) in banners"
        :key="banner.image"
        type="button"
        class="rounded-full transition-all"
        :aria-label="banner.alt"
        :style="{ width: index === activeIndex ? '18px' : '6px', height: '6px', background: index === activeIndex ? '#fff' : 'rgba(255,255,255,0.5)' }"
        @click="goTo(index)"
      />
    </div>
  </div>
</template>
