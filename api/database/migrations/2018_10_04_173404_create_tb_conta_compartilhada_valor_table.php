<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbContaCompartilhadaValorTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_conta_compartilhada_valor', function(Blueprint $table)
		{
			$table->integer('id_conta_compartilhada', true);
			$table->decimal('vl_conta_compartilhada_valor', 10)->nullable();
			$table->integer('id_despesa')->index('fk_tb_conta_compartilhada_valor_tb_despesa_idx');
			$table->integer('id_pessoa')->index('fk_tb_conta_compartilhada_valor_tb_pessoa1_idx');
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
		Schema::drop('tb_conta_compartilhada_valor');
	}

}
