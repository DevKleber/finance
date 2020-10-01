<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbMudartextoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_mudartexto', function(Blueprint $table)
		{
			$table->foreign('id_usuario', 'fk_tb_mudartexto_tb_usuario1')->references('id_usuario')->on('tb_usuario')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_mudartexto', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_mudartexto_tb_usuario1');
		});
	}

}
