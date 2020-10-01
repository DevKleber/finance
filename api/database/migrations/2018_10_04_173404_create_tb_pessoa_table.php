<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreateTbPessoaTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('tb_pessoa', function(Blueprint $table)
		{
			$table->integer('id_pessoa', true);
			$table->text('no_pessoa', 65535)->nullable();
			$table->string('sexo', 1)->nullable();
			$table->date('dt_nascimento')->nullable();
			$table->text('no_email', 65535)->nullable();
			$table->dateTime('ts_cadastro')->nullable();
			$table->text('nu_cpfcnpj', 65535)->nullable();
			$table->boolean('bo_ativo')->nullable();
			$table->text('img_perfil', 65535)->nullable();
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
		Schema::drop('tb_pessoa');
	}

}
