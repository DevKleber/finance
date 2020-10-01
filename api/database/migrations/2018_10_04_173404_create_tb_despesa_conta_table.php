<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbDespesaContaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_despesa_conta', function(Blueprint $table)
		{
			$table->integer('id_despesa_conta', true);
			$table->integer('id_conta')->index('fk_tb_despesa_conta_tb_conta1_idx');
			$table->integer('id_despesa')->index('fk_tb_despesa_conta_tb_despesa1_idx');
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
		Schema::drop('tb_despesa_conta');
	}

}
