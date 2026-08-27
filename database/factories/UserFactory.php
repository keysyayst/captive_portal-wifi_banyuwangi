<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;




class UserFactory extends Factory
{



    protected static ?string $password;

    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'phone_number' => fake()->unique()->e164PhoneNumber(),
            'status' => 'active',
            'last_login' => null,
        ];
    }
}
