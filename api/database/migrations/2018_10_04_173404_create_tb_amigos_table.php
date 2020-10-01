<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbAmigosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_amigos', function(Blueprint $table)
		{
			$table->integer('id_amigos', true);
			$table->integer('id_usuario')->index('fk_tb_amigos_tb_usuario1_idx');
			$table->integer('id_pessoa')->index('fk_tb_amigos_tb_pessoa1_idx');
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
		Schema::drop('tb_amigos');
	}

}
