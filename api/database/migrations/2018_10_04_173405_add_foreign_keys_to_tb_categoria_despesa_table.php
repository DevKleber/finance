<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbCategoriaDespesaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_categoria_despesa', function(Blueprint $table)
		{
			$table->foreign('id_usuario', 'fk_tb_categoria_despesa_tb_usuario1')->references('id_usuario')->on('tb_usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_categoria_despesa', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_categoria_despesa_tb_usuario1');
		});
	}

}
