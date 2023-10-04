<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddZonasToCuentasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cuentas', function (Blueprint $table) {
            $table->string('zonas_cableadas')->default("0");;
            $table->string('zonas_inhalambricas')->default("0");;
            $table->string('particiones_disponibles')->default("0");;
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cuentas', function (Blueprint $table) {
            $table->string('zonas_cableadas');
            $table->string('zonas_inhalambricas');
            $table->string('particiones_disponibles');
        });
    }
}
