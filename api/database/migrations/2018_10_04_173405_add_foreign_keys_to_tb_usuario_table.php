<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbUsuarioTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_usuario', function(Blueprint $table)
		{
			$table->foreign('id_pessoa', 'fk_tb_usuario_tb_pessoa1')->references('id_pessoa')->on('tb_pessoa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_usuario', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_usuario_tb_pessoa1');
		});
	}

}
