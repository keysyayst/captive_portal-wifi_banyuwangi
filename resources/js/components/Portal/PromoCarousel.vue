<script setup lang="ts">
import { useBackgroundSlider } from '@/composables/useBackgroundSlider';

export interface PromoBanner {
  image: string;
  alt: string;
  href?: string;
}

const props = withDefaults(
  defineProps<{
    banners?: PromoBanner[];
  }>(),
  {
    banners: () => [],
  },
);

const { activeIndex, goTo } = useBackgroundSlider(props.banners, 5000);
</script>

<template>
  <div
    v-if="banners.length"
    class="relative w-full rounded-2xl overflow-hidden"
    style="box-shadow: 0 10px 28px rgba(15,23,42,0.14);"
  >
    <template
      v-for="(banner, index) in banners"
      :key="banner.image"
    >
      <a
        v-if="banner.href"
        :href="banner.href"
        target="_blank"
        rel="noopener noreferrer"
        class="block w-full transition-opacity duration-700"
        :class="index === activeIndex ? 'relative' : 'absolute inset-0'"
        :style="{
          opacity: index === activeIndex ? 1 : 0,
          pointerEvents: index === activeIndex ? 'auto' : 'none',
        }"
      >
        <img
          :src="banner.image"
          :alt="banner.alt"
          class="block w-full h-auto"
        />
      </a>

      <div
        v-else
        class="block w-full transition-opacity duration-700"
        :class="index === activeIndex ? 'relative' : 'absolute inset-0'"
        :style="{
          opacity: index === activeIndex ? 1 : 0,
        }"
      >
        <img
          :src="banner.image"
          :alt="banner.alt"
          class="block w-full h-auto"
        />
      </div>
    </template>

    <template v-if="banners.length > 1">
      <div
        class="absolute inset-x-0 bottom-0 h-12 pointer-events-none"
        style="
          background: linear-gradient(
            to top,
            rgba(0,0,0,0.32),
            transparent
          );
        "
      ></div>

      <div
        class="
          absolute
          bottom-2.5
          left-1/2
          -translate-x-1/2
          flex
          gap-1.5
          z-10
        "
      >
        <button
          v-for="(banner, index) in banners"
          :key="banner.image"
          type="button"
          class="rounded-full transition-all"
          :aria-label="banner.alt"
          :style="{
            width: index === activeIndex ? '18px' : '6px',
            height: '6px',
            background:
              index === activeIndex
                ? '#fff'
                : 'rgba(255,255,255,0.5)',
          }"
          @click="goTo(index)"
        ></button>
      </div>
    </template>
  </div>
</template>
