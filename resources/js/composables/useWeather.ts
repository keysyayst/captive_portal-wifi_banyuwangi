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

interface LocationWeatherResponse {
  location?: {
    name?: string;
    region?: string | null;
  };
  weather?: {
    temperature_c?: number | null;
    weather_code?: number | null;
  };
}

export function useWeather() {
  const tempC = ref<number | null>(null);
  const label = ref('Memuat cuaca...');
  const icon = ref('🌤️');
  const locationName = ref('Lokasi saat ini');
  const loading = ref(true);
  const error = ref(false);

  function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('geolocation is not supported'));

        return;
      }

      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 300000,
      });
    });
  }

  async function load(): Promise<void> {
    loading.value = true;
    error.value = false;

    try {
      const position = await getCurrentPosition();
      const params = new URLSearchParams({
        latitude: String(position.coords.latitude),
        longitude: String(position.coords.longitude),
      });
      const res = await fetch(`/api/location/weather?${params.toString()}`, {
        headers: { Accept: 'application/json' },
      });

      if (!res.ok) {
        throw new Error('weather request failed');
      }

      const data = (await res.json()) as LocationWeatherResponse;
      const code = data.weather?.weather_code ?? 0;
      const temperature = data.weather?.temperature_c;

      tempC.value = typeof temperature === 'number' ? Math.round(temperature) : null;
      locationName.value = data.location?.name ?? 'Lokasi saat ini';

      const mapped = WEATHER_CODE_MAP[code] ?? { label: 'Cuaca Tidak Diketahui', icon: '🌡️' };
      label.value = mapped.label;
      icon.value = mapped.icon;
    } catch {
      error.value = true;
      tempC.value = null;
      label.value = 'Cuaca tidak tersedia';
      locationName.value = 'Lokasi tidak tersedia';
    } finally {
      loading.value = false;
    }
  }

  onMounted(load);

  return { tempC, label, icon, locationName, loading, error, reload: load };
}
