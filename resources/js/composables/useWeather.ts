import { onMounted, ref } from 'vue';
import LocationWeatherController from '@/actions/App/Http/Controllers/LocationWeatherController';

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

interface IpLocationResponse {
  latitude?: number;
  longitude?: number;
}

const tempC = ref<number | null>(null);
const label = ref('Memuat cuaca...');
const icon = ref('🌤️');
const locationName = ref('Lokasi saat ini');
const loading = ref(true);
const error = ref(false);
let loadPromise: Promise<void> | null = null;

export function useWeather() {
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

  async function getIpPosition(): Promise<{ latitude: number; longitude: number }> {
    const res = await fetch('https://ipapi.co/json/', {
      headers: { Accept: 'application/json' },
    });

    if (!res.ok) {
      throw new Error('ip location request failed');
    }

    const data = (await res.json()) as IpLocationResponse;
    const latitude = data.latitude;
    const longitude = data.longitude;

    if (
      typeof latitude !== 'number' ||
      typeof longitude !== 'number' ||
      !Number.isFinite(latitude) ||
      !Number.isFinite(longitude)
    ) {
      throw new Error('ip location is invalid');
    }

    return { latitude, longitude };
  }

  async function load(): Promise<void> {
    if (loadPromise) {
      return loadPromise;
    }

    loading.value = true;
    error.value = false;

    loadPromise = (async () => {
      try {
        let latitude: number;
        let longitude: number;

        try {
          const position = await getCurrentPosition();
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        } catch {
          ({ latitude, longitude } = await getIpPosition());
        }

        const res = await fetch(LocationWeatherController.show.url({
          query: { latitude, longitude },
        }), {
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
        loadPromise = null;
      }
    })();

    return loadPromise;
  }

  onMounted(load);

  return { tempC, label, icon, locationName, loading, error, reload: load };
}
