<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbUsuarioTable extends Migration {

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
			$table->text('login', 65535)->nullable();
			$table->text('password', 65535)->nullable();
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
		Schema::drop('tb_usuario');
	}

}
