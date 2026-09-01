<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('phone_number')->nullable()->unique();
            $table->string('nik')->nullable()->unique();
            $table->string('name')->nullable();
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->timestamp('last_login')->nullable();
            $table->timestamps();

            $table->index('phone_number');
            $table->index('nik');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
