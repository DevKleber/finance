<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbDespesaCartaoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_despesa_cartao', function(Blueprint $table)
		{
			$table->integer('id_despesa_cartao', true);
			$table->integer('id_cartao_credito')->index('fk_tb_despesa_cartao_tb_cartao_credito1_idx');
			$table->integer('id_despesa')->index('fk_tb_despesa_cartao_tb_despesa1_idx');
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
		Schema::drop('tb_despesa_cartao');
	}

}
