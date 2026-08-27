<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{



    public function up(): void
    {
        Schema::create('devices', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('mac_address')->unique();
            $table->string('device_type')->nullable();
            $table->timestamps();

            $table->index('mac_address');
        });
    }




    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
