<script setup lang="ts">
import BackgroundSlider from '@/components/Portal/BackgroundSlider.vue';
import PromoPoster from '@/components/Portal/PromoPoster.vue';
import { useBackgroundSlider } from '@/composables/useBackgroundSlider';
import type { BackgroundImage } from '@/types/portal';

const images: BackgroundImage[] = [
  { url: '/images/Kawah-Ijen-Indonesia.jpg', alt: 'Kawah Ijen' },
  { url: '/images/pantai-merah-banyuwangi.jpg', alt: 'Pantai Banyuwangi' },
  { url: '/images/gunung-raung.jpg', alt: 'Gunung Raung' },
];

const { activeIndex, goTo } = useBackgroundSlider(images);
</script>

<template>
  <div class="min-h-screen overflow-hidden text-slate-900" style="background: #050c1a;">
    <div class="min-h-screen relative flex items-center justify-center">
      <BackgroundSlider :images="images" :active-index="activeIndex" @select="goTo" />

      <div class="absolute top-4 left-4 sm:top-6 sm:left-6 z-30 flex items-center gap-2.5">
        <img
          src="/images/logo_bwi.png"
          alt="Pemkab Banyuwangi"
          class="h-9 w-9 sm:h-10 sm:w-10 object-contain shrink-0"
          style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.55));"
        />
        <div class="leading-tight">
          <p class="font-display font-bold text-[11px] sm:text-xs text-white" style="text-shadow: 0 1px 4px rgba(0,0,0,0.6); letter-spacing: 0.01em;">
            Pemerintah Kabupaten
          </p>
          <p class="font-display font-bold text-[11px] sm:text-xs text-white" style="text-shadow: 0 1px 4px rgba(0,0,0,0.6); letter-spacing: 0.01em;">
            Banyuwangi
          </p>
        </div>
      </div>

      <div class="relative z-10 w-full flex flex-col items-center justify-center gap-6 sm:gap-8 px-4 py-24 sm:py-20">
        <div class="text-center max-w-2xl">
          <p class="text-xs font-semibold tracking-widest uppercase mb-2 sm:mb-3" style="color: rgba(255,255,255,0.6);">
            Gratis &bull; Aman &bull; Terpercaya
          </p>
          <h1 class="font-display font-extrabold" style="font-size: clamp(1.75rem, 4vw, 3rem); line-height: 1.1;">
            <span style="color: #fff;">WiFi Gratis</span>
            <br />
            <span style="color: #f59e0b; font-size: 1.3em; display: block; margin-top: -0.2em;">Banyuwangi</span>
          </h1>
          <p class="text-sm mt-3 max-w-md mx-auto" style="color: rgba(255,255,255,0.75);">
            Layanan internet publik dari Pemkab Banyuwangi untuk seluruh warga dan pengunjung daerah.
          </p>
        </div>

        <div class="w-full max-w-sm lg:max-w-4xl xl:max-w-5xl">
          <div
            class="relative w-full flex flex-col lg:flex-row overflow-hidden"
            style="background: rgba(255,255,255,0.97); backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px); border: 1px solid rgba(8,145,178,0.12); border-top: 3px solid #0891b2; border-radius: 20px; box-shadow: 0 24px 60px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.15);"
          >
            <div class="p-5 sm:p-6 lg:w-[320px] xl:w-[380px] shrink-0 border-b lg:border-b-0 lg:border-r border-slate-200/70 flex items-center justify-center">
              <PromoPoster />
            </div>

            <div class="flex-1 min-w-0">
              <slot />
            </div>
          </div>

          <p class="text-center text-xs mt-4 px-4 leading-relaxed" style="color: rgba(255,255,255,0.35);">
            Dipersembahkan oleh Dinas Komunikasi dan Informatika Kabupaten Banyuwangi<br />
            <span style="color: rgba(255,255,255,0.25);">Satya Bhakti Praja Mukti &bull; 2026</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
