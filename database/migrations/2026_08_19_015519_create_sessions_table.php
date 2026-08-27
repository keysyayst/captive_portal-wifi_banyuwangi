<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{



    public function up(): void
    {
        Schema::create('sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('device_id')->constrained()->onDelete('cascade');
            $table->string('ip_address');
            $table->string('access_point_location')->nullable();
            $table->timestamp('login_time');
            $table->timestamp('logout_time')->nullable();
            $table->integer('duration')->nullable();
            $table->enum('authentication_status', ['success', 'failed'])->default('success');
            $table->timestamps();

            $table->index('login_time');
        });
    }




    public function down(): void
    {
        Schema::dropIfExists('sessions');
    }
};
