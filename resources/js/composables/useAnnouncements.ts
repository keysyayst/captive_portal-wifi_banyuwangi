import { onMounted, ref } from 'vue';

export interface Announcement {
  id: number;
  message: string;
}

interface AnnouncementsResponse {
  announcements?: Announcement[];
}

export function useAnnouncements() {
  const announcements = ref<Announcement[]>([]);
  const loading = ref(true);
  const error = ref(false);

  async function load(): Promise<void> {
    loading.value = true;
    error.value = false;

    try {
      const response = await fetch('/api/announcements', {
        headers: { Accept: 'application/json' },
      });

      if (!response.ok) {
        throw new Error('announcements request failed');
      }

      const data = (await response.json()) as AnnouncementsResponse;
      const remoteAnnouncements = data.announcements?.filter(
        (announcement) => announcement.message.trim().length > 0,
      ) ?? [];

      announcements.value = remoteAnnouncements;
    } catch {
      error.value = true;
    } finally {
      loading.value = false;
    }
  }

  onMounted(load);

  return { announcements, loading, error, reload: load };
}
