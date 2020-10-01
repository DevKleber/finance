<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbCategoriaReceitaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_categoria_receita', function(Blueprint $table)
		{
			$table->integer('id_categoria_receita', true);
			$table->integer('id_categoria_receita_pai')->nullable();
			$table->text('no_categoria_receita', 65535)->nullable();
			$table->integer('id_usuario')->index('fk_tb_categoria_receita_tb_usuario1_idx');
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
		Schema::drop('tb_categoria_receita');
	}

}
