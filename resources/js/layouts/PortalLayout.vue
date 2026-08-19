<script setup lang="ts">
import BackgroundSlider from '@/components/Portal/BackgroundSlider.vue';
import { useBackgroundSlider } from '@/composables/useBackgroundSlider';
import type { BackgroundImage } from '@/types/portal';

// Swap these for photos of your own service area / kabupaten.
const images: BackgroundImage[] = [
  { url: '/images/Kawah-Ijen-Indonesia.jpg', alt: 'Kawah Ijen' },
  { url: '/images/pantai-merah-banyuwangi.jpg', alt: 'Pantai Banyuwangi' },
  { url: '/images/gunung-raung.jpg', alt: 'Gunung Raung' },
];

const { activeIndex, goTo } = useBackgroundSlider(images);
</script>

<template>
  <div class="min-h-screen overflow-hidden text-slate-900" style="background: #050c1a;">
    <div class="min-h-screen relative flex items-center justify-center lg:justify-end">
      <BackgroundSlider :images="images" :active-index="activeIndex" @select="goTo" />

      <!-- Hero copy over the photo, hidden on small screens (no room next to the card there) -->
      <div class="hidden lg:flex flex-col justify-end absolute inset-y-0 left-0 z-10 px-12 xl:px-16 py-16 max-w-xl pointer-events-none">
        <p class="text-xs font-semibold tracking-widest uppercase mb-3" style="color: rgba(255,255,255,0.55);">
          Gratis &bull; Aman &bull; Terpercaya
        </p>
        <h1 class="font-display font-extrabold leading-none" style="font-size: 3.25rem; color: #fff;">WiFi Gratis</h1>
        <h1 class="font-display font-extrabold leading-none mb-4" style="font-size: 3.25rem; color: #f59e0b;">Banyuwangi</h1>
        <p class="text-sm leading-relaxed max-w-md" style="color: rgba(255,255,255,0.7);">
          Layanan internet publik dari Pemkab Banyuwangi untuk seluruh warga dan pengunjung daerah.
        </p>
      </div>

      <div class="relative z-10 w-full max-w-sm mx-4 lg:mr-16 xl:mr-24 my-8">
        <div
          class="relative w-full"
          style="background: rgba(255,255,255,0.97); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(8,145,178,0.12); border-top: 3px solid #0891b2; border-radius: 20px; box-shadow: 0 24px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15);"
        >
          <slot />
        </div>

        <p class="text-center text-xs mt-4 px-4 leading-relaxed" style="color: rgba(255,255,255,0.3);">
          Dipersembahkan oleh Dinas Komunikasi dan Informatika Kabupaten Banyuwangi<br />
          <span style="color: rgba(255,255,255,0.2);">Satya Bhakti Praja Mukti &bull; 2026</span>
        </p>
      </div>
    </div>
  </div>
</template>
