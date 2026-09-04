<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { router } from '@inertiajs/vue3';

import PromoCarousel, {
  type PromoBanner,
} from '@/components/Portal/PromoCarousel.vue';

import StatusBar from '@/components/Portal/StatusBar.vue';
import TickerBar from '@/components/Portal/TickerBar.vue';

interface Slider {
  id: number;
  image_path: string;
  type: string;
}

const props = defineProps<{
  phone?: string | null;
  ap?: string | null;
  sliders?: Slider[];
}>();

const promoBanners = computed<PromoBanner[]>(() =>
  (props.sliders ?? [])
    .filter((s) => s.type === 'after_login')
    .map((s) => ({
      image: `/storage/${s.image_path}`,
      alt: 'Promo WiFi Gratis Banyuwangi',
    })),
);

const maskedPhone = computed(() => {
  const phone = props.phone ?? '';

  if (!phone) return '';

  return (
    phone.slice(0, 4) +
    '*'.repeat(Math.max(0, phone.length - 7)) +
    phone.slice(-3)
  );
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

const logoFailed = ref<Record<string, boolean>>({});

function onLogoError(label: string) {
  logoFailed.value[label] = true;
}

let statusTimer: ReturnType<typeof setInterval> | null = null;

async function checkStatus() {
  try {
    const url = new URL(
      `${window.location.protocol}//${window.location.hostname}:8080/api/status.php`,
    );

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

onMounted(() => {
  statusTimer = setInterval(checkStatus, 30000);
});

onUnmounted(() => {
  if (statusTimer) {
    clearInterval(statusTimer);
  }
});
</script>

<template>
  <div
    class="portal-page min-h-screen text-slate-800"
    style="background: #0c1730;"
  >
    <div class="min-h-screen flex flex-col relative">

      <!-- Ticker -->
      <TickerBar />

      <!-- Background -->
      <img
        src="/images/background-welcome.jpg"
        alt=""
        class="
          fixed
          inset-0
          w-full
          h-full
          object-cover
          pointer-events-none
        "
        style="
          filter:
            saturate(1.05)
            contrast(1.05)
            brightness(0.85)
            blur(1.5px);

          transform: scale(1.02);
        "
        @error="
          () =>
            console.error(
              '[Welcome] Gagal memuat /images/background-welcome.jpg — cek nama file & folder public/images/',
            )
        "
      />

      <!-- Overlay -->
      <div
        class="fixed inset-0"
        style="
          background:
            linear-gradient(
              180deg,
              rgba(6,20,35,0.55) 0%,
              rgba(6,20,35,0.4) 40%,
              rgba(6,20,35,0.62) 100%
            );
        "
      ></div>

      <!-- Header -->
      <header
        class="
          relative
          z-10
          border-b
          border-white/10
        "
        style="
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        "
      >
        <div
          class="
            max-w-7xl
            mx-auto

            px-3
            sm:px-4

            py-3

            flex
            items-center
            justify-between
            gap-3
          "
        >
          <!-- KIRI: PEMERINTAH KABUPATEN -->
          <div
            class="
              flex
              items-center
              gap-2
              sm:gap-2.5

              min-w-0
              shrink-0
            "
          >
            <img
              src="/images/logo_bwi.png"
              alt="Pemkab Banyuwangi"
              class="
                h-8
                w-8

                sm:h-10
                sm:w-10

                object-contain
                shrink-0
              "
            />

            <div class="leading-tight">
              <p
                class="
                  font-display
                  font-bold

                  text-[10px]
                  sm:text-xs

                  text-slate-800
                  whitespace-nowrap
                "
              >
                Pemerintah Kabupaten
              </p>

              <p
                class="
                  font-display
                  font-bold

                  text-[10px]
                  sm:text-xs

                  text-slate-800
                  whitespace-nowrap
                "
              >
                Banyuwangi
              </p>
            </div>
          </div>

          <!-- KANAN: WIFI + STATUS -->
          <div
            class="
              flex
              flex-col
              items-end
              text-right

              min-w-0
            "
          >
            <p
              class="
                text-slate-800
                font-bold
                font-display

                text-[10px]
                sm:text-sm

                leading-tight

                whitespace-nowrap
              "
            >
              WiFi Gratis Banyuwangi
            </p>

            <div
              class="
                flex
                items-center
                justify-end

                gap-1
                sm:gap-1.5

                mt-1

                min-w-0
              "
            >
              <div
                class="
                  w-1.5
                  h-1.5

                  rounded-full
                  bg-emerald-500

                  live-dot

                  shrink-0
                "
              ></div>

              <span
                class="
                  text-[9px]
                  sm:text-xs

                  font-medium
                  text-emerald-700

                  whitespace-nowrap

                  overflow-hidden
                  text-ellipsis
                "
              >
                Terhubung

                <template v-if="maskedPhone">
                  &middot; {{ maskedPhone }}
                </template>

                <span class="hidden sm:inline">
                  &middot; {{ ap ?? 'Banyuwangi' }}
                </span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <!-- Content -->
      <main
        class="
          relative
          z-10

          flex-1

          max-w-7xl
          mx-auto

          w-full

          px-4
          py-6

          space-y-4
        "
      >
        <!-- Status -->
        <StatusBar />

        <!-- Promo -->
        <PromoCarousel
          :banners="promoBanners"
        />

        <!-- Akses Cepat -->
        <div>
          <p
            class="
              text-xs
              font-semibold
              uppercase
              tracking-widest

              mb-3

              text-white/85
            "
            style="
              text-shadow:
                0 1px 3px rgba(0,0,0,0.35);
            "
          >
            Akses Cepat Layanan
          </p>

          <div
            class="
              grid
              grid-cols-2
              sm:grid-cols-3

              gap-3
            "
          >
            <a
              v-for="s in services"
              :key="s.label"

              :href="s.href"

              target="_blank"
              rel="noopener noreferrer"

              class="
                group

                rounded-2xl

                p-4

                flex
                flex-col
                gap-3

                transition-all

                hover:scale-[1.02]
              "

              style="
                background: rgba(255,255,255,0.92);

                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);

                border:
                  1px solid rgba(148,163,184,0.25);

                box-shadow:
                  0 8px 20px rgba(15,23,42,0.12);
              "
            >
              <!-- Logo layanan -->
              <div
                class="
                  w-9
                  h-9

                  rounded-xl

                  flex
                  items-center
                  justify-center

                  overflow-hidden
                "
                :style="{
                  background: s.color + '14',
                }"
              >
                <img
                  v-if="!logoFailed[s.label]"

                  :src="s.logo"
                  :alt="s.label"

                  class="
                    w-full
                    h-full

                    object-contain

                    p-1
                  "

                  @error="onLogoError(s.label)"
                />

                <span
                  v-else

                  class="
                    font-bold
                    font-display
                  "

                  :style="{
                    color: s.color,
                  }"
                >
                  {{ s.label.charAt(0) }}
                </span>
              </div>

              <!-- Text layanan -->
              <div>
                <p
                  class="
                    text-slate-800
                    text-sm
                    font-bold
                    font-display
                    leading-tight
                  "
                >
                  {{ s.label }}
                </p>

                <p
                  class="
                    text-xs
                    mt-0.5
                    text-slate-600
                  "
                >
                  {{ s.sub }}
                </p>
              </div>
            </a>
          </div>
        </div>
      </main>

      <!-- Footer -->
      <footer
        class="
          relative
          z-10

          py-4

          border-t
          border-white/10
        "
        style="
          background: rgba(255,255,255,0.85);

          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        "
      >
        <div
          class="
            max-w-7xl
            mx-auto

            px-4

            text-center
            space-y-0.5
          "
        >
          <p
            class="
              text-xs
              font-medium
              text-slate-600
            "
          >
            Dipersembahkan oleh Dinas Komunikasi dan Informatika Kabupaten Banyuwangi
          </p>

          <p
            class="
              text-xs
              text-slate-400
            "
          >
            Satya Bhakti Praja Mukti &bull; 2026
          </p>
        </div>
      </footer>

    </div>
  </div>
</template>
