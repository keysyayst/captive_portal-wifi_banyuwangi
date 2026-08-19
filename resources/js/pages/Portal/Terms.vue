<script setup lang="ts">
defineProps<{ open: boolean }>();
const emit = defineEmits<{ (e: 'close'): void }>();
</script>

<template>
  <Teleport to="body">
    <Transition name="terms-fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <div class="absolute inset-0 bg-black/70 backdrop-blur-md" @click="emit('close')" />

        <div class="relative bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[90vh] anim-up" style="overflow: hidden;">
          <div class="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div>
              <p class="font-bold text-sm font-display text-gray-800">Syarat &amp; Ketentuan Penggunaan</p>
              <p class="text-xs text-gray-400 mt-0.5">WiFi Gratis Banyuwangi</p>
            </div>
            <button
              type="button"
              class="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-400 transition-colors shrink-0"
              @click="emit('close')"
            >
              <div class="w-4 h-4">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </div>
            </button>
          </div>

          <div class="overflow-y-auto px-6 py-5 flex-1">
            <div class="terms-body">
              <h4>1. Ketentuan Umum</h4>
              <p>
                Layanan WiFi Gratis Banyuwangi diselenggarakan oleh Dinas Komunikasi dan Informatika (Diskominfo)
                Kabupaten Banyuwangi sebagai fasilitas publik dalam rangka mendukung percepatan transformasi digital
                masyarakat.
              </p>

              <h4>2. Penggunaan yang Diizinkan</h4>
              <ul>
                <li>Akses informasi, pendidikan, dan penelitian</li>
                <li>Layanan pemerintahan digital (e-Government, Smart Kampung, B-One ID)</li>
                <li>Komunikasi dan media sosial yang sesuai norma</li>
                <li>Kegiatan usaha dan UMKM digital yang produktif</li>
              </ul>

              <h4>3. Larangan Penggunaan</h4>
              <ul>
                <li>Mengakses konten pornografi, SARA, kekerasan, atau perjudian</li>
                <li>Aktivitas hacking, phishing, atau kejahatan siber lainnya</li>
                <li>Mengunduh atau mendistribusikan konten bajakan</li>
                <li>Kegiatan yang melanggar hukum dan peraturan yang berlaku</li>
              </ul>

              <h4>4. Pencatatan Data Pengguna</h4>
              <p>
                Dengan menggunakan layanan ini, Anda menyetujui bahwa sistem secara otomatis mencatat nomor
                handphone, MAC address perangkat, IP address, lokasi access point, waktu login, dan durasi akses.
                Seluruh data dikelola sesuai ketentuan Undang-Undang Perlindungan Data Pribadi (UU PDP).
              </p>

              <h4>5. Tanggung Jawab Pengguna</h4>
              <p>
                Pengguna bertanggung jawab penuh atas seluruh aktivitas yang dilakukan selama menggunakan layanan
                ini. Pelanggaran dapat mengakibatkan pemutusan akses dan/atau pelaporan kepada pihak berwajib.
              </p>

              <h4>6. Keamanan Jaringan</h4>
              <p>
                Kami tidak bertanggung jawab atas kehilangan data atau kerugian yang timbul akibat penggunaan
                jaringan publik. Disarankan menggunakan koneksi HTTPS dan VPN untuk aktivitas yang bersifat sensitif.
              </p>

              <h4>7. Perubahan Ketentuan</h4>
              <p>
                Diskominfo Kabupaten Banyuwangi berhak mengubah syarat dan ketentuan ini sewaktu-waktu. Penggunaan
                layanan secara berkelanjutan dianggap sebagai persetujuan atas perubahan tersebut.
              </p>
            </div>
          </div>

          <div class="px-6 py-4 border-t border-gray-100">
            <button
              type="button"
              class="w-full py-3 rounded-xl text-white font-semibold text-sm font-display transition-all"
              style="background: linear-gradient(135deg, #0e6a7f, #0891b2);"
              @click="emit('close')"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.terms-fade-enter-active,
.terms-fade-leave-active { transition: opacity 0.2s ease; }
.terms-fade-enter-from,
.terms-fade-leave-to { opacity: 0; }
</style>
