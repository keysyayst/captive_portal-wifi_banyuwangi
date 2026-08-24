<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PortalConfig extends Model
{
    protected $fillable = [
        'name',
        'organization_name',
        'logo_url',
        'banner_url',
        'primary_color',
        'secondary_color',
        'terms_text',
        'is_default',
    ];

    protected $casts = [
        'is_default' => 'boolean',
    ];

    public function accessPoints()
    {
        return $this->hasMany(AccessPoint::class);
    }
}
