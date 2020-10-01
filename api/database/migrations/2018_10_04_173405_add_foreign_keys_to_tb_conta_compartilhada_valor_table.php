<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbContaCompartilhadaValorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_conta_compartilhada_valor', function(Blueprint $table)
		{
			$table->foreign('id_despesa', 'fk_tb_conta_compartilhada_valor_tb_despesa')->references('id_despesa')->on('tb_despesa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('id_pessoa', 'fk_tb_conta_compartilhada_valor_tb_pessoa1')->references('id_pessoa')->on('tb_pessoa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_conta_compartilhada_valor', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_conta_compartilhada_valor_tb_despesa');
			$table->dropForeign('fk_tb_conta_compartilhada_valor_tb_pessoa1');
		});
	}

}
