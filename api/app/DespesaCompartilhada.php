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
        // $pessoa = new \App\Pessoa();
        // $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();
        // $minhaPorcentagem = (100 - $request['vl_conta_compartilhada_porcentagem']);

        // $arPessoas[] = ['id_pessoa' => $usuarioPessoaLogado->id_pessoa, 'vl_conta_compartilhada_porcentagem' => $minhaPorcentagem];
        // $arPessoas[] = ['id_pessoa' => $request['id_pessoa'], 'vl_conta_compartilhada_porcentagem' => $request['vl_conta_compartilhada_porcentagem']];

        $errors = 0;
        foreach ($request['dividirPessoas'] as $key => $value) {
            $valorDaCompra = $request['vl_despesac'];
            $porcentagem = (($value['valor'] * 100) / $valorDaCompra);

            $request['id_pessoa'] = $value['id_pessoa'];
            $request['vl_conta_compartilhada_porcentagem'] = $porcentagem;
            $despesaCompartilhada = \App\DespesaCompartilhada::create($request);
            if (!$despesaCompartilhada) {
                ++$errors;
            }
        }
        if (0 == $errors) {
            return true;
        }

        return false;
    }
}
