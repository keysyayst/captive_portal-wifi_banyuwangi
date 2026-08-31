<?php

namespace App\Services;

use App\Models\Device;
use App\Models\User;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class RadiusService
{
    /**
     * Authorize user di FreeRADIUS dengan menulis ke tabel radcheck, radreply,
     * dan radusergroup. Dipanggil setelah user berhasil login di captive portal.
     *
     * @param  User  $user  User yang login
     * @param  Device  $device  Device yang digunakan
     * @param  int  $sessionTimeout  Durasi session dalam detik (0 = pakai default config)
     */
    public function authorizeUser(User $user, Device $device, int $sessionTimeout = 0): void
    {
        $username = $this->buildUsername($user);
        $timeout = $sessionTimeout > 0 ? $sessionTimeout : config('radius.session_timeout', 3600);

        try {
            // Hapus entry lama jika ada (idempotent)
            $this->removeUserEntries($username);

            // radcheck: autentikasi via Cleartext-Password
            // Username adalah nomor HP, password adalah MAC address device
            DB::table('radcheck')->insert([
                'username' => $username,
                'attribute' => 'Cleartext-Password',
                'op' => ':=',
                'value' => $device->mac_address,
            ]);

            // radreply: kirim Session-Timeout ke NAS
            DB::table('radreply')->insert([
                [
                    'username' => $username,
                    'attribute' => 'Session-Timeout',
                    'op' => ':=',
                    'value' => (string) $timeout,
                ],
                [
                    'username' => $username,
                    'attribute' => 'Idle-Timeout',
                    'op' => ':=',
                    'value' => '600',
                ],
            ]);

            // radusergroup: masukkan ke group "users"
            DB::table('radusergroup')->insert([
                'username' => $username,
                'groupname' => config('radius.default_group', 'users'),
                'priority' => 1,
            ]);

            Log::info('RADIUS: User authorized', [
                'username' => $username,
                'mac' => $device->mac_address,
                'timeout' => $timeout,
            ]);
        } catch (\Throwable $e) {
            // Jangan gagalkan login jika RADIUS bermasalah, tapi log errornya
            Log::error('RADIUS: Failed to authorize user', [
                'username' => $username,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Deauthorize user dari FreeRADIUS dengan menghapus semua entry di
     * radcheck, radreply, dan radusergroup. Dipanggil saat user logout.
     */
    public function deauthorizeUser(User $user): void
    {
        $username = $this->buildUsername($user);

        try {
            $this->removeUserEntries($username);

            Log::info('RADIUS: User deauthorized', ['username' => $username]);
        } catch (\Throwable $e) {
            Log::error('RADIUS: Failed to deauthorize user', [
                'username' => $username,
                'error' => $e->getMessage(),
            ]);
        }
    }

    /**
     * Set session timeout untuk user tertentu (update radreply).
     */
    public function setSessionTimeout(User $user, int $seconds): void
    {
        $username = $this->buildUsername($user);

        DB::table('radreply')
            ->where('username', $username)
            ->where('attribute', 'Session-Timeout')
            ->update(['value' => (string) $seconds]);
    }

    /**
     * Ambil active accounting sessions dari radacct.
     * Digunakan oleh DashboardController untuk menampilkan user aktif dari sisi RADIUS.
     */
    public function getActiveAccounting(): Collection
    {
        return DB::table('radacct')
            ->whereNull('acctstoptime')
            ->orderByDesc('acctstarttime')
            ->get();
    }

    /**
     * Cek apakah user sudah terdaftar di RADIUS.
     */
    public function isAuthorized(User $user): bool
    {
        $username = $this->buildUsername($user);

        return DB::table('radcheck')
            ->where('username', $username)
            ->exists();
    }

    /**
     * Bangun username RADIUS dari nomor HP user.
     * Format: nomor HP apa adanya (contoh: "081234567890").
     */
    private function buildUsername(User $user): string
    {
        return $user->phone_number;
    }

    /**
     * Hapus semua entry RADIUS untuk username tertentu.
     */
    private function removeUserEntries(string $username): void
    {
        DB::table('radcheck')->where('username', $username)->delete();
        DB::table('radreply')->where('username', $username)->delete();
        DB::table('radusergroup')->where('username', $username)->delete();
    }
}
