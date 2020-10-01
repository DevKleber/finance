<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tb_usuario', function(Blueprint $table)
		{
			$table->integer('id_usuario', true);
			$table->text('login')->unique();
			$table->text('password')->unique();
			$table->integer('id_pessoa')->index('fk_tb_usuario_tb_pessoa1_idx');
			$table->timestamps();
		});
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tb_usuario');
    }
}
