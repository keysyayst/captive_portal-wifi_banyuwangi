import { onMounted, onUnmounted, ref } from 'vue';

export function useBackgroundSlider<T>(items: T[], intervalMs = 6500) {
  const activeIndex = ref(0);
  let timer: ReturnType<typeof setInterval> | null = null;

  function goTo(index: number) {
    activeIndex.value = index;
  }

  onMounted(() => {
    if (items.length <= 1) return;
    timer = setInterval(() => {
      activeIndex.value = (activeIndex.value + 1) % items.length;
    }, intervalMs);
  });

  onUnmounted(() => {
    if (timer) clearInterval(timer);
  });

  return { activeIndex, goTo };
}
