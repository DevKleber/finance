<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbDespesaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_despesa', function(Blueprint $table)
		{
			$table->foreign('id_categoria_despesa', 'fk_tb_despesa_tb_categoria_despesa1')->references('id_categoria_despesa')->on('tb_categoria_despesa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('id_tipo_despesa', 'fk_tb_despesa_tb_tipo_despesa1')->references('id_tipo_despesa')->on('tb_tipo_despesa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('id_usuario', 'fk_tb_despesa_tb_usuario1')->references('id_usuario')->on('tb_usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_despesa', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_despesa_tb_categoria_despesa1');
			$table->dropForeign('fk_tb_despesa_tb_tipo_despesa1');
			$table->dropForeign('fk_tb_despesa_tb_usuario1');
		});
	}

}
