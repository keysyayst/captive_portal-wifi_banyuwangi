<?php

return [
    /*
    |--------------------------------------------------------------------------
    | RADIUS NAS Secret
    |--------------------------------------------------------------------------
    | Shared secret antara NAS (router/AP) dan FreeRADIUS server.
    | Harus sama dengan yang dikonfigurasi di clients.conf FreeRADIUS.
    */
    'nas_secret' => env('RADIUS_NAS_SECRET', 'testing123'),

    /*
    |--------------------------------------------------------------------------
    | Default Session Timeout (detik)
    |--------------------------------------------------------------------------
    | Berapa lama user boleh online sebelum harus re-authenticate.
    | Default: 3600 detik (1 jam)
    */
    'session_timeout' => (int) env('RADIUS_SESSION_TIMEOUT', 3600),

    /*
    |--------------------------------------------------------------------------
    | Default Bandwidth Limits (bps)
    |--------------------------------------------------------------------------
    | Batas kecepatan upload/download default per user.
    | 0 = tidak ada limit.
    | Untuk aktifkan, FreeRADIUS harus support WISPr atau vendor-specific attrs.
    */
    'bandwidth_down' => (int) env('RADIUS_BANDWIDTH_DOWN', 0),
    'bandwidth_up' => (int) env('RADIUS_BANDWIDTH_UP', 0),

    /*
    |--------------------------------------------------------------------------
    | Default User Group
    |--------------------------------------------------------------------------
    | Grup default untuk user yang baru login.
    */
    'default_group' => env('RADIUS_DEFAULT_GROUP', 'users'),
];
