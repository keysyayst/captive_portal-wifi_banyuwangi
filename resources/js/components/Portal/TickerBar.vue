<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface TickerItem {
  id: number;
  message: string;
}

interface TickerItemsResponse {
  ticker_items?: TickerItem[];
}

const items = ref<TickerItem[]>([]);

onMounted(async () => {
  try {
    const response = await fetch('/api/ticker-items', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      throw new Error('ticker items request failed');
    }

    const data = (await response.json()) as TickerItemsResponse;
    items.value = data.ticker_items?.filter((item) => item.message.trim().length > 0) ?? [];
  } catch {
    items.value = [];
  }
});
</script>

<template>
  <div class="relative z-20 overflow-hidden text-white" style="background: linear-gradient(90deg, #0e6a7f, #0891b2);">
    <div class="ticker-track flex items-center gap-16 py-1.5 whitespace-nowrap">
      <span v-for="n in 2" :key="n" class="flex items-center gap-16">
        <span v-for="item in items" :key="`${n}-${item.id}`" class="text-xs font-medium px-4">
          {{ item.message }}
        </span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.ticker-track {
  width: max-content;
  animation: ticker-scroll 28s linear infinite;
}
@keyframes ticker-scroll {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}
@media (prefers-reduced-motion: reduce) {
  .ticker-track { animation: none; }
}
</style>
