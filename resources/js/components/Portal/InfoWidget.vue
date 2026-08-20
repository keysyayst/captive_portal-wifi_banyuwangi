<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useWeather } from '@/composables/useWeather';

// TODO: ganti dengan data asli dari backend (mis. endpoint /api/announcements)
// begitu tersedia — ini masih statis.
const announcements = [
  'Pemkab Banyuwangi mengimbau warga memanfaatkan layanan Smart Kampung untuk administrasi kependudukan.',
  'Pendaftaran Banyuwangi Festival 2026 sudah dibuka — cek jadwal lengkap di Portal Layanan.',
  'Gunakan internet dengan bijak, aman, dan bertanggung jawab.',
];

const { tempC, label, icon, loading: weatherLoading } = useWeather();

const activeAnnouncement = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    activeAnnouncement.value = (activeAnnouncement.value + 1) % announcements.length;
  }, 6000);
});
onUnmounted(() => {
  if (timer) clearInterval(timer);
});

const today = computed(() =>
  new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }),
);
</script>

<template>
  <div
    class="rounded-2xl p-4 flex flex-col sm:flex-row items-stretch gap-4"
    style="background: rgba(255,255,255,0.9); backdrop-filter: blur(20px); border: 1px solid rgba(148,163,184,0.2); box-shadow: 0 8px 22px rgba(15,23,42,0.06);"
  >
    <!-- Cuaca -->
    <div class="flex items-center gap-3 sm:pr-4 sm:border-r sm:border-slate-200 shrink-0">
      <span class="text-3xl leading-none">{{ icon }}</span>
      <div>
        <p class="text-xs text-slate-400">{{ today }} &bull; Banyuwangi</p>
        <p class="text-lg font-bold font-display text-slate-800 leading-tight">
          <span v-if="weatherLoading">--&deg;</span>
          <span v-else>{{ tempC }}&deg;C</span>
          <span class="text-xs font-medium text-slate-500 ml-1">{{ label }}</span>
        </p>
      </div>
    </div>

    <!-- Pengumuman berjalan -->
    <div class="flex-1 min-w-0 flex items-center gap-2">
      <span class="text-xs font-bold uppercase tracking-widest shrink-0 px-2 py-1 rounded-md" style="background: #fef3c7; color: #92400e;">
        Info
      </span>
      <Transition name="announcement-fade" mode="out-in">
        <p :key="activeAnnouncement" class="text-xs text-slate-600 leading-snug truncate">
          {{ announcements[activeAnnouncement] }}
        </p>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.announcement-fade-enter-active,
.announcement-fade-leave-active { transition: opacity 0.35s ease; }
.announcement-fade-enter-from,
.announcement-fade-leave-to { opacity: 0; }
</style>
