<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // radcheck: kredensial user. FreeRADIUS membaca ini untuk verifikasi identity.
        Schema::create('radcheck', function (Blueprint $table) {
            $table->id();
            $table->string('username', 64)->default('')->index();
            $table->string('attribute', 64)->default('');
            $table->string('op', 2)->default('==');
            $table->string('value', 253)->default('');
        });

        // radreply: atribut yang dikirim ke NAS setelah auth berhasil (Session-Timeout, dll).
        Schema::create('radreply', function (Blueprint $table) {
            $table->id();
            $table->string('username', 64)->default('')->index();
            $table->string('attribute', 64)->default('');
            $table->string('op', 2)->default('=');
            $table->string('value', 253)->default('');
        });

        // radusergroup: mapping user ke group RADIUS.
        Schema::create('radusergroup', function (Blueprint $table) {
            $table->string('username', 64)->default('')->index();
            $table->string('groupname', 64)->default('');
            $table->integer('priority')->default(1);
        });

        // radgroupcheck: policy check per group.
        Schema::create('radgroupcheck', function (Blueprint $table) {
            $table->id();
            $table->string('groupname', 64)->default('')->index();
            $table->string('attribute', 64)->default('');
            $table->string('op', 2)->default('==');
            $table->string('value', 253)->default('');
        });

        // radgroupreply: atribut reply per group.
        Schema::create('radgroupreply', function (Blueprint $table) {
            $table->id();
            $table->string('groupname', 64)->default('')->index();
            $table->string('attribute', 64)->default('');
            $table->string('op', 2)->default('=');
            $table->string('value', 253)->default('');
        });

        // radacct: accounting records dari FreeRADIUS (start/stop/update session).
        Schema::create('radacct', function (Blueprint $table) {
            $table->bigIncrements('radacctid');
            $table->string('acctsessionid', 64)->default('')->index();
            $table->string('acctuniqueid', 32)->default('')->unique();
            $table->string('username', 64)->default('')->index();
            $table->string('realm', 64)->nullable()->default('');
            $table->string('nasipaddress', 15)->default('')->index();
            $table->string('nasportid', 32)->nullable();
            $table->string('nasporttype', 32)->nullable();
            $table->dateTime('acctstarttime')->nullable()->index();
            $table->dateTime('acctupdatetime')->nullable();
            $table->dateTime('acctstoptime')->nullable()->index();
            $table->mediumInteger('acctinterval')->nullable();
            $table->integer('acctsessiontime')->unsigned()->nullable();
            $table->string('acctauthentic', 32)->nullable();
            $table->string('connectinfo_start', 50)->nullable();
            $table->string('connectinfo_stop', 50)->nullable();
            $table->bigInteger('acctinputoctets')->nullable();
            $table->bigInteger('acctoutputoctets')->nullable();
            $table->string('calledstationid', 50)->default('');
            $table->string('callingstationid', 50)->default('')->index();
            $table->string('acctterminatecause', 32)->default('');
            $table->string('servicetype', 32)->nullable();
            $table->string('framedprotocol', 32)->nullable();
            $table->string('framedipaddress', 15)->default('')->index();
        });

        // radpostauth: log semua percobaan autentikasi (sukses & gagal).
        Schema::create('radpostauth', function (Blueprint $table) {
            $table->id();
            $table->string('username', 64)->default('')->index();
            $table->string('pass', 64)->default('');
            $table->string('reply', 32)->default('');
            $table->string('calledstationid', 50)->nullable();
            $table->string('callingstationid', 50)->nullable();
            $table->dateTime('authdate')->useCurrent()->index();
            $table->string('class', 64)->nullable();
        });

        // nas: daftar NAS (router/AP) terdaftar. FreeRADIUS bisa baca dari DB via rlm_sql.
        Schema::create('nas', function (Blueprint $table) {
            $table->id();
            $table->string('nasname', 128)->index();
            $table->string('shortname', 32)->nullable();
            $table->string('type', 30)->default('other');
            $table->integer('ports')->nullable();
            $table->string('secret', 60)->default('secret');
            $table->string('server', 64)->nullable();
            $table->string('community', 50)->nullable();
            $table->string('description', 200)->nullable()->default('RADIUS Client');
            $table->timestamps();
        });

        // Seed group default "users" dengan Session-Timeout dan Idle-Timeout.
        DB::table('radgroupreply')->insert([
            [
                'groupname' => 'users',
                'attribute' => 'Session-Timeout',
                'op' => ':=',
                'value' => (string) config('radius.session_timeout', 3600),
            ],
            [
                'groupname' => 'users',
                'attribute' => 'Idle-Timeout',
                'op' => ':=',
                'value' => '600',
            ],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nas');
        Schema::dropIfExists('radpostauth');
        Schema::dropIfExists('radacct');
        Schema::dropIfExists('radgroupreply');
        Schema::dropIfExists('radgroupcheck');
        Schema::dropIfExists('radusergroup');
        Schema::dropIfExists('radreply');
        Schema::dropIfExists('radcheck');
    }
};
