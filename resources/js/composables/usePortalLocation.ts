import { ref } from 'vue';

const FALLBACK_LOCATION = 'Banyuwangi, Jawa Timur';
export const PORTAL_LOCATION_STORAGE_KEY = 'portal_location';

export interface PortalLocationData {
  name: string;
  latitude?: number;
  longitude?: number;
}

function storeLocation(data: PortalLocationData): void {
  sessionStorage.setItem(PORTAL_LOCATION_STORAGE_KEY, JSON.stringify(data));
}

export function usePortalLocation() {
  const location = ref('');
  const loading = ref(true);

  function resolve(value: string) {
    location.value = value;
    loading.value = false;
  }

  function detect() {
    loading.value = true;

    const fallbackTimer = setTimeout(() => {
      if (loading.value) {
        storeLocation({ name: FALLBACK_LOCATION });
        resolve(FALLBACK_LOCATION);
      }
    }, 5000);

    if (!navigator.geolocation) {
      clearTimeout(fallbackTimer);
      storeLocation({ name: FALLBACK_LOCATION });
      resolve(FALLBACK_LOCATION);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(fallbackTimer);
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=id`,
          );
          const data = await res.json();
          const addr = data.address ?? {};
          const name = addr.village || addr.suburb || addr.town || addr.city || addr.municipality || 'Banyuwangi';
          storeLocation({ name, latitude, longitude });
          resolve(name);
        } catch {
          storeLocation({ name: FALLBACK_LOCATION });
          resolve(FALLBACK_LOCATION);
        }
      },
      () => {
        clearTimeout(fallbackTimer);
        storeLocation({ name: FALLBACK_LOCATION });
        resolve(FALLBACK_LOCATION);
      },
      { timeout: 4000, enableHighAccuracy: false },
    );
  }

  return { location, loading, detect };
}
