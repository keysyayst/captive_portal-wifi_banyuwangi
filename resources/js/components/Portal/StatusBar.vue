<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useAnnouncements } from '@/composables/useAnnouncements';
import { useWeather } from '@/composables/useWeather';

const { announcements, loading: announcementsLoading, error: announcementsError } = useAnnouncements();
const { tempC, label, icon, locationName, loading: weatherLoading } = useWeather();

const activeAnnouncement = ref(0);
let timer: ReturnType<typeof setInterval> | null = null;

onMounted(() => {
  timer = setInterval(() => {
    if (announcements.value.length > 0) {
      activeAnnouncement.value = (activeAnnouncement.value + 1) % announcements.value.length;
    }
  }, 6000);
});
onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
  }
});

const today = computed(() =>
  new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' }),
);
</script>

<template>
  <div
    class="rounded-2xl p-4 sm:p-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6"
    style="background: rgba(255,255,255,0.94); backdrop-filter: blur(20px); border: 1px solid rgba(148,163,184,0.25); border-top: 3px solid #f59e0b; box-shadow: 0 10px 28px rgba(15,23,42,0.14);"
  >

    <div class="flex-1 min-w-0">
      <div class="flex items-center gap-2 mb-1">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-cyan-600 shrink-0">
          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
        </svg>
        <span class="text-xs font-semibold tracking-widest uppercase text-cyan-700">Anda Terhubung</span>
      </div>
      <h2 class="text-slate-800 text-lg sm:text-xl font-bold font-display leading-tight">Selamat Menikmati Internet</h2>
      <p class="text-xs mt-1 text-slate-600">Gunakan internet dengan bijak, aman, dan bertanggung jawab.</p>
    </div>

    <div class="block lg:hidden h-px w-full bg-slate-200" />
    <div class="hidden lg:block w-px self-stretch bg-slate-200" />


    <div class="flex flex-col sm:flex-row sm:items-center gap-3 lg:flex-1 lg:min-w-0">
      <div class="flex items-center gap-3 shrink-0">
        <span class="text-3xl leading-none">{{ icon }}</span>
        <div>
          <p class="text-[11px] text-slate-400 leading-tight">{{ today }} &bull; {{ locationName }}</p>
          <p class="text-base font-bold font-display text-slate-800 leading-tight">
            <span v-if="weatherLoading">--&deg;</span>
            <span v-else>{{ tempC }}&deg;C</span>
            <span class="text-[11px] font-medium text-slate-500 ml-1">{{ label }}</span>
          </p>
        </div>
      </div>

      <div class="flex items-center gap-2 min-w-0 sm:flex-1 sm:border-l sm:border-slate-200 sm:pl-3">
        <span class="text-[10px] font-bold uppercase tracking-widest shrink-0 px-2 py-1 rounded-md" style="background: #e2e8f0; color: #475569;">
          Info
        </span>
        <Transition name="announcement-fade" mode="out-in">
          <p :key="activeAnnouncement" class="text-xs text-slate-600 leading-snug break-words">
            {{ announcements[activeAnnouncement]?.message ?? (announcementsLoading ? 'Memuat pengumuman...' : announcementsError ? 'Pengumuman tidak tersedia.' : 'Belum ada pengumuman.') }}
          </p>
        </Transition>
      </div>
    </div>
  </div>
</template>

<style scoped>
.announcement-fade-enter-active,
.announcement-fade-leave-active { transition: opacity 0.35s ease; }
.announcement-fade-enter-from,
.announcement-fade-leave-to { opacity: 0; }
</style>
