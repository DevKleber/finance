<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DespesaCompartilhada extends Model
{
    protected $table = 'conta_compartilhada_valor';
    protected $primaryKey = 'id_conta_compartilhada';
    protected $fillable = ['vl_conta_compartilhada_porcentagem', 'id_despesa', 'id_pessoa', 'created_at', 'updated_at'];

    public static function salvar($request)
    {
        $pessoa = new \App\Pessoa();
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();
        $minhaPorcentagem = (100 - $request['vl_conta_compartilhada_porcentagem']);

        $arPessoas[] = ['id_pessoa' => $usuarioPessoaLogado->id_pessoa, 'vl_conta_compartilhada_porcentagem' => $minhaPorcentagem];
        $arPessoas[] = ['id_pessoa' => $request['id_pessoa'], 'vl_conta_compartilhada_porcentagem' => $request['vl_conta_compartilhada_porcentagem']];

        $errors = 0;
        foreach ($arPessoas as $key => $value) {
            $request['id_pessoa'] = $value['id_pessoa'];
            $request['vl_conta_compartilhada_porcentagem'] = $value['vl_conta_compartilhada_porcentagem'];
            $despesaCompartilhada = \App\DespesaCompartilhada::create($request->all());
            if (!$despesaCompartilhada) {
                ++$errors;
            }
        }
        if (0 == $errors) {
            \DB::commit();

            return true;
        }
        \DB::roolback();

        return false;
    }
}
