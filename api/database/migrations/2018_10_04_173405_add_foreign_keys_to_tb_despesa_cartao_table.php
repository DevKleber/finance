<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbDespesaCartaoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_despesa_cartao', function(Blueprint $table)
		{
			$table->foreign('id_cartao_credito', 'fk_tb_despesa_cartao_tb_cartao_credito1')->references('id_cartao_credito')->on('tb_cartao_credito')->onUpdate('NO ACTION')->onDelete('NO ACTION');
			$table->foreign('id_despesa', 'fk_tb_despesa_cartao_tb_despesa1')->references('id_despesa')->on('tb_despesa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_despesa_cartao', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_despesa_cartao_tb_cartao_credito1');
			$table->dropForeign('fk_tb_despesa_cartao_tb_despesa1');
		});
	}

}
