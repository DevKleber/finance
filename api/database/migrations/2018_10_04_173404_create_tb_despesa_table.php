<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbDespesaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_despesa', function(Blueprint $table)
		{
			$table->integer('id_despesa', true);
			$table->decimal('vl_despesac', 10)->nullable();
			$table->date('dt_despesa')->nullable();
			$table->text('ds_despesa', 65535)->nullable();
			$table->boolean('bo_dividir_amigos')->nullable()->comment('');
			$table->integer('id_tipo_despesa')->index('fk_tb_despesa_tb_tipo_despesa1_idx');
			$table->integer('id_categoria_despesa')->index('fk_tb_despesa_tb_categoria_despesa1_idx');
			$table->integer('id_usuario')->index('fk_tb_despesa_tb_usuario1_idx');
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
		Schema::drop('tb_despesa');
	}

}
