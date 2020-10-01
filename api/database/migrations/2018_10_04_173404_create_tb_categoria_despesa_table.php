<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbCategoriaDespesaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_categoria_despesa', function(Blueprint $table)
		{
			$table->integer('id_categoria_despesa', true);
			$table->integer('id_categoria_despesa_pai')->nullable();
			$table->text('no_categoria_despesa', 65535)->nullable();
			$table->integer('id_usuario')->index('fk_tb_categoria_despesa_tb_usuario1_idx');
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
		Schema::drop('tb_categoria_despesa');
	}

}
