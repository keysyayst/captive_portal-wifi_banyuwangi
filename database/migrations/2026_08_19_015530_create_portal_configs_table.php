<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{



    public function up(): void
    {
        Schema::create('portal_configs', function (Blueprint $table) {
            $table->id();
            $table->string('name')->default('Default Config');
            $table->string('organization_name')->default('Pemerintah Kabupaten Banyuwangi');
            $table->string('logo_url')->nullable();
            $table->string('banner_url')->nullable();
            $table->string('primary_color')->default('#003366');
            $table->string('secondary_color')->default('#FF6B35');
            $table->longText('terms_text')->nullable();
            $table->boolean('is_default')->default(false);
            $table->timestamps();
        });

        Schema::table('access_points', function (Blueprint $table) {
            $table->foreignId('portal_config_id')->nullable()->constrained('portal_configs')->nullOnDelete();
        });
    }




    public function down(): void
    {
        Schema::dropIfExists('portal_configs');
    }
};
