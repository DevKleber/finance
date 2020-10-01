<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbAmigosTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_amigos', function(Blueprint $table)
		{
			$table->foreign('id_pessoa', 'fk_tb_amigos_tb_pessoa1')->references('id_pessoa')->on('tb_pessoa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('id_usuario', 'fk_tb_amigos_tb_usuario1')->references('id_usuario')->on('tb_usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_amigos', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_amigos_tb_pessoa1');
			$table->dropForeign('fk_tb_amigos_tb_usuario1');
		});
	}

}
