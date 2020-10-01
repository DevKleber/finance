<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbContaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_conta', function(Blueprint $table)
		{
			$table->integer('id_conta', true);
			$table->decimal('vl_saldo', 10)->nullable();
			$table->integer('id_usuario')->index('fk_tb_conta_tb_usuario1_idx');
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
		Schema::drop('tb_conta');
	}

}
