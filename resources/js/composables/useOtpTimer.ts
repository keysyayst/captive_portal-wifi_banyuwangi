import { onUnmounted, ref } from 'vue';

export function useOtpTimer(seconds = 60) {
  const remaining = ref(0);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function stop() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function start() {
    stop();
    remaining.value = seconds;
    intervalId = setInterval(() => {
      remaining.value -= 1;
      if (remaining.value <= 0) {
        remaining.value = 0;
        stop();
      }
    }, 1000);
  }

  onUnmounted(stop);

  return { remaining, start, stop };
}
