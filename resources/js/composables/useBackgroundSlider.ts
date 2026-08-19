import { onMounted, onUnmounted, ref } from 'vue';
import type { BackgroundImage } from '@/types/portal';

export function useBackgroundSlider(images: BackgroundImage[], intervalMs = 6500) {
  const activeIndex = ref(0);
  let timer: ReturnType<typeof setInterval> | null = null;

  function goTo(index: number) {
    activeIndex.value = index;
  }

  onMounted(() => {
    if (images.length <= 1) return;
    timer = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % images.length;
    }, intervalMs);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return { activeIndex, goTo };
}
