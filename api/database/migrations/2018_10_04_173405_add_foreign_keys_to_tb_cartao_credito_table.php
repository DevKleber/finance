<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbCartaoCreditoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_cartao_credito', function(Blueprint $table)
		{
			$table->foreign('tb_usuario_id_usuario', 'fk_tb_cartao_credito_tb_usuario1')->references('id_usuario')->on('tb_usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_cartao_credito', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_cartao_credito_tb_usuario1');
		});
	}

}
