import { onMounted, ref } from 'vue';

const WEATHER_CODE_MAP: Record<number, { label: string; icon: string }> = {
  0: { label: 'Cerah', icon: '☀️' },
  1: { label: 'Cerah Berawan', icon: '🌤️' },
  2: { label: 'Berawan Sebagian', icon: '⛅' },
  3: { label: 'Mendung', icon: '☁️' },
  45: { label: 'Berkabut', icon: '🌫️' },
  48: { label: 'Berkabut', icon: '🌫️' },
  51: { label: 'Gerimis Ringan', icon: '🌦️' },
  53: { label: 'Gerimis', icon: '🌦️' },
  55: { label: 'Gerimis Lebat', icon: '🌧️' },
  61: { label: 'Hujan Ringan', icon: '🌧️' },
  63: { label: 'Hujan', icon: '🌧️' },
  65: { label: 'Hujan Lebat', icon: '🌧️' },
  80: { label: 'Hujan Lokal', icon: '🌦️' },
  81: { label: 'Hujan Lokal Lebat', icon: '🌧️' },
  82: { label: 'Hujan Deras', icon: '⛈️' },
  95: { label: 'Badai Petir', icon: '⛈️' },
};

// Koordinat pusat Kabupaten Banyuwangi
const LAT = -8.2192;
const LON = 114.3691;

export function useWeather() {
  const tempC = ref<number | null>(null);
  const label = ref('Memuat cuaca...');
  const icon = ref('🌤️');
  const loading = ref(true);
  const error = ref(false);

  async function load() {
    loading.value = true;
    error.value = false;
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,weather_code&timezone=Asia%2FJakarta`;
      const res = await fetch(url);
      if (!res.ok) throw new Error('weather request failed');
      const data = await res.json();
      const code = data?.current?.weather_code ?? 0;
      tempC.value = Math.round(data?.current?.temperature_2m ?? 0);
      const mapped = WEATHER_CODE_MAP[code] ?? { label: 'Cuaca Tidak Diketahui', icon: '🌡️' };
      label.value = mapped.label;
      icon.value = mapped.icon;
    } catch {
      error.value = true;
      label.value = 'Cuaca tidak tersedia';
    } finally {
      loading.value = false;
    }
  }

  onMounted(load);

  return { tempC, label, icon, loading, error, reload: load };
}
