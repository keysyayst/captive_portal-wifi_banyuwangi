<script setup lang="ts">
// TODO: ganti dengan data promosi/pengumuman asli, atau ambil dari backend.
const items = [
  'Dapatkan kemudahan administrasi kependudukan dalam satu genggaman. Unduh Smart Kampung sekarang!',
  'WiFi Gratis Banyuwangi — gunakan internet dengan bijak, aman, dan bertanggung jawab.',
  'Jelajahi layanan publik Kabupaten Banyuwangi lewat menu Akses Cepat Layanan di bawah.',
];
</script>

<template>
  <div class="relative z-20 overflow-hidden text-white" style="background: linear-gradient(90deg, #0e6a7f, #0891b2);">
    <div class="ticker-track flex items-center gap-16 py-1.5 whitespace-nowrap">
      <span v-for="n in 2" :key="n" class="flex items-center gap-16">
        <span v-for="(item, index) in items" :key="`${n}-${index}`" class="text-xs font-medium px-4">
          {{ item }}
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
