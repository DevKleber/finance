<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbMudartextoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_mudartexto', function(Blueprint $table)
		{
			$table->integer('id_mudartexto', true);
			$table->text('frase', 65535)->nullable();
			$table->text('apelido', 65535)->nullable();
			$table->integer('id_usuario')->index('fk_tb_mudartexto_tb_usuario1_idx');
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
		Schema::drop('tb_mudartexto');
	}

}
