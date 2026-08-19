<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Session extends Model
{
    use HasFactory;

    protected $fillable = [
        'device_id',
        'ip_address',
        'access_point_location',
        'login_time',
        'logout_time',
        'duration',
        'authentication_status',
    ];

    protected $casts = [
        'login_time' => 'datetime',
        'logout_time' => 'datetime',
    ];

    public function device()
    {
        return $this->belongsTo(Device::class);
    }
}