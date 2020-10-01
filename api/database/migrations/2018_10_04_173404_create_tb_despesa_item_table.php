<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbDespesaItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_despesa_item', function(Blueprint $table)
		{
			$table->integer('id_despesa_item', true);
			$table->integer('dt_vencimento')->nullable();
			$table->decimal('vl_despesa', 10)->nullable();
			$table->text('nu_parcela', 65535)->nullable();
			$table->integer('id_despesa')->index('fk_tb_despesa_item_tb_despesa1_idx');
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
		Schema::drop('tb_despesa_item');
	}

}
