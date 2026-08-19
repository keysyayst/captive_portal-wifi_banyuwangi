import { ref } from 'vue';

const FALLBACK_LOCATION = 'Banyuwangi, Jawa Timur';

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
      if (loading.value) resolve(FALLBACK_LOCATION);
    }, 5000);

    if (!navigator.geolocation) {
      clearTimeout(fallbackTimer);
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
          const name = addr.village || addr.suburb || addr.town || addr.city || addr.county || 'Banyuwangi';
          const district = addr.county || addr.city_district || '';
          resolve(district ? `${name}, ${district}` : name);
        } catch {
          resolve(FALLBACK_LOCATION);
        }
      },
      () => {
        clearTimeout(fallbackTimer);
        resolve(FALLBACK_LOCATION);
      },
      { timeout: 4000, enableHighAccuracy: false },
    );
  }

  return { location, loading, detect };
}
