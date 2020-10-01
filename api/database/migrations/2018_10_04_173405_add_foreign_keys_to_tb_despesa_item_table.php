<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class AddForeignKeysToTbDespesaItemTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::table('tb_despesa_item', function(Blueprint $table)
		{
			$table->foreign('id_despesa', 'fk_tb_despesa_item_tb_despesa1')->references('id_despesa')->on('tb_despesa')->onUpdate('NO ACTION')->onDelete('NO ACTION');
		});
	}


	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::table('tb_despesa_item', function(Blueprint $table)
		{
			$table->dropForeign('fk_tb_despesa_item_tb_despesa1');
		});
	}

}
