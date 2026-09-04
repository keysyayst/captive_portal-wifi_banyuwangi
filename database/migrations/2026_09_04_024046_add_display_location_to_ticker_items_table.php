<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('ticker_items', function (Blueprint $table) {
            $table->string('display_location')->default('ticker')->after('message');
            $table->index(['display_location', 'is_active', 'sort_order']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('ticker_items', function (Blueprint $table) {
            $table->dropIndex(['display_location', 'is_active', 'sort_order']);
            $table->dropColumn('display_location');
        });
    }
};
