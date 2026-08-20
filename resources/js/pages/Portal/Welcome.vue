<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { router } from '@inertiajs/vue3';
import PromoCarousel from '@/components/Portal/PromoCarousel.vue';
import StatusBar from '@/components/Portal/StatusBar.vue';
import TickerBar from '@/components/Portal/TickerBar.vue';

const props = defineProps<{
  phone?: string | null;
  ap?: string | null;
}>();

const maskedPhone = computed(() => {
  const phone = props.phone ?? '';
  if (!phone) return '';
  return phone.slice(0, 4) + '*'.repeat(Math.max(0, phone.length - 7)) + phone.slice(-3);
});

const services = [
  {
    label: 'Portal Layanan',
    sub: 'Layanan Publik Daerah',
    color: '#0891b2',
    href: 'https://sipp.banyuwangikab.go.id/',
    logo: '/images/services/portal-layanan.png',
  },
  {
    label: 'Smart Kampung',
    sub: 'Digitalisasi Desa',
    color: '#15803d',
    href: 'https://smartkampung.id/',
    logo: '/images/services/smart-kampung.png',
  },
  {
    label: 'B-One ID',
    sub: 'Identitas Digital Tunggal',
    color: '#7c3aed',
    href: 'https://bsid.banyuwangikab.go.id/',
    logo: '/images/services/b-one-id.png',
  },
  {
    label: 'PPID Banyuwangi',
    sub: 'Informasi Publik',
    color: '#b45309',
    href: 'https://ppid.banyuwangikab.go.id/',
    logo: '/images/services/ppid.png',
  },
  {
    label: 'Lapor BWI',
    sub: 'Pengaduan Masyarakat',
    color: '#dc2626',
    href: 'https://www.lapor.go.id/instansi/pemerintah-kabupaten-banyuwangi',
    logo: '/images/services/lapor-bwi.png',
  },
  {
    label: 'Siaran Daerah',
    sub: 'Info & Siaran Lokal',
    color: '#0891b2',
    href: 'https://infobanyuwangi.co.id/',
    logo: '/images/services/siaran-daerah.png',
  },
];

// Kalau file logo belum ada / salah nama di public/images/services/, jangan
// biarkan kotaknya kosong — fallback ke inisial huruf.
const logoFailed = ref<Record<string, boolean>>({});
function onLogoError(label: string) {
  logoFailed.value[label] = true;
}

let statusTimer: ReturnType<typeof setInterval> | null = null;

async function checkStatus() {
  try {
    const url = new URL(`${window.location.protocol}//${window.location.hostname}:8080/api/status.php`);
    url.searchParams.set('phone', props.phone ?? '');
    const res = await fetch(url.toString());
    const data = await res.json();
    if (data.success && data.is_active === false) {
      router.visit('/');
    }
  } catch (err) {
    console.error('Gagal mengecek status sesi', err);
  }
}

async function logout() {
  try {
    const backendUrl = `${window.location.protocol}//${window.location.hostname}:8080/api/logout.php`;
    await fetch(backendUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: props.phone ?? '' }),
    });
  } catch (err) {
    console.error(err);
  }
  router.visit('/');
}

onMounted(() => {
  // Poll every 30s in case an admin kills the session or it expires server-side.
  statusTimer = setInterval(checkStatus, 30000);
});

onUnmounted(() => {
  if (statusTimer) clearInterval(statusTimer);
});
</script>

<template>
  <div class="min-h-screen text-slate-800" style="background: #0c1730;">
    <div class="min-h-screen flex flex-col relative">
      <TickerBar />

      <!-- Background: foto budaya + overlay gelap tipis + blur halus, biar semua card di atasnya kontras -->
      <img
        src="/images/background-welcome.jpg"
        alt=""
        class="fixed inset-0 w-full h-full object-cover pointer-events-none"
        style="filter: saturate(1.05) contrast(1.05) brightness(0.85) blur(1.5px); transform: scale(1.02);"
        @error="() => console.error('[Welcome] Gagal memuat /images/background-welcome.jpg — cek nama file & folder public/images/')"
      />
      <div class="fixed inset-0" style="background: linear-gradient(180deg, rgba(6,20,35,0.55) 0%, rgba(6,20,35,0.4) 40%, rgba(6,20,35,0.62) 100%);" />

      <!-- Baris 1: Header — logo kiri, judul+status tengah, keluar kanan -->
      <header class="relative z-10 border-b border-white/10" style="background: rgba(255,255,255,0.9); backdrop-filter: blur(20px);">
        <div class="max-w-screen-xl mx-auto px-4 py-3 grid grid-cols-3 items-center gap-2">
          <div class="flex items-center gap-3 justify-self-start">
            <img src="/images/logo_bwi.png" alt="Pemkab Banyuwangi" class="h-7 sm:h-8 object-contain" />
          </div>

          <div class="flex flex-col items-center justify-self-center text-center">
            <p class="text-slate-800 font-bold text-xs sm:text-sm font-display leading-none">WiFi Gratis Banyuwangi</p>
            <div class="flex items-center gap-1.5 mt-1">
              <div class="w-1.5 h-1.5 rounded-full bg-emerald-500 live-dot shrink-0" />
              <span class="text-[10px] sm:text-xs font-medium text-emerald-700 whitespace-nowrap">
                Terhubung<template v-if="maskedPhone"> &middot; {{ maskedPhone }}</template>
                <span class="hidden sm:inline"> &middot; {{ ap ?? 'Banyuwangi' }}</span>
              </span>
            </div>
          </div>

          <div class="justify-self-end">
            <button
              type="button"
              class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              style="color: #475569; background: #f8fafc; border: 1px solid #e2e8f0;"
              @click="logout"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              <span class="hidden sm:block">Keluar</span>
            </button>
          </div>
        </div>
      </header>

      <main class="relative z-10 flex-1 max-w-screen-xl mx-auto w-full px-4 py-6 space-y-4">
        <!-- Banner promosi menjadi konten utama di bagian atas -->
        <PromoCarousel />

        <!-- Status terhubung + cuaca/info berada tepat di bawah banner -->
        <StatusBar />

        <!-- Grid akses cepat layanan -->
        <div>
          <p class="text-xs font-semibold uppercase tracking-widest mb-3 text-white/85" style="text-shadow: 0 1px 3px rgba(0,0,0,0.35);">
            Akses Cepat Layanan
          </p>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
            <a
              v-for="s in services"
              :key="s.label"
              :href="s.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group rounded-2xl p-4 flex flex-col items-center gap-3 text-center transition-all hover:scale-[1.02]"
              style="background: rgba(255,255,255,0.92); backdrop-filter: blur(16px); border: 1px solid rgba(148,163,184,0.25); box-shadow: 0 8px 20px rgba(15,23,42,0.12);"
            >
              <div class="w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden" :style="{ background: s.color + '14' }">
                <img
                  v-if="!logoFailed[s.label]"
                  :src="s.logo"
                  :alt="s.label"
                  class="w-full h-full object-contain p-1"
                  @error="onLogoError(s.label)"
                />
                <span v-else class="font-bold font-display" :style="{ color: s.color }">{{ s.label.charAt(0) }}</span>
              </div>
              <div>
                <p class="text-slate-800 text-sm font-bold font-display leading-tight">{{ s.label }}</p>
                <p class="text-xs mt-0.5 text-slate-600">{{ s.sub }}</p>
              </div>
            </a>
          </div>
        </div>
      </main>

      <footer class="relative z-10 py-4 border-t border-white/10" style="background: rgba(255,255,255,0.85); backdrop-filter: blur(12px);">
        <div class="max-w-screen-xl mx-auto px-4 text-center space-y-0.5">
          <p class="text-xs font-medium text-slate-600">Dipersembahkan oleh Dinas Komunikasi dan Informatika Kabupaten Banyuwangi</p>
          <p class="text-xs text-slate-400">Satya Bhakti Praja Mukti &bull; 2026</p>
        </div>
      </footer>
    </div>
  </div>
</template>
