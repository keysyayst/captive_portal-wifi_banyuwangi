<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class User extends Model
{
    use HasApiTokens, HasFactory;

    protected $fillable = [
        'phone_number',
        'name',
        'status',
        'last_login',
    ];

    // Relationship
    public function devices()
    {
        return $this->hasMany(Device::class);
    }

    public function sessions()
    {
        return $this->hasManyThrough(Session::class, Device::class);
    }
}
