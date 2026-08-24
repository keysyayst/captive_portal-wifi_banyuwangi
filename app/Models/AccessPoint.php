<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AccessPoint extends Model
{
    protected $fillable = [
        'name',
        'ip_address',
        'mac_address',
        'location',
        'status',
        'portal_config_id',
    ];

    public function portalConfig()
    {
        return $this->belongsTo(PortalConfig::class);
    }
}
