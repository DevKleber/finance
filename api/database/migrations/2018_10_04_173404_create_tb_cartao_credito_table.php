<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbCartaoCreditoTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_cartao_credito', function(Blueprint $table)
		{
			$table->integer('id_cartao_credito', true);
			$table->text('no_cartao_credito', 65535)->nullable();
			$table->decimal('vl_limite', 10)->nullable();
			$table->integer('dia_vencimento')->nullable();
			$table->date('dt_primeira_fatura')->nullable();
			$table->integer('dia_fechamento_fatura')->nullable();
			$table->text('no_titular', 65535)->nullable();
			$table->integer('tb_usuario_id_usuario')->index('fk_tb_cartao_credito_tb_usuario1_idx');
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
		Schema::drop('tb_cartao_credito');
	}

}
