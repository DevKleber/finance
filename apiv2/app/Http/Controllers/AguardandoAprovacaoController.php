<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AguardandoAprovacaoController extends Controller
{
    public function index()
    {
        $pessoa = auth()->user()->id_pessoa;

        $despesa = \App\DespesaCompartilhada::where('bo_aprovado', null)
            ->join('despesa', 'despesa.id_despesa', '=', 'conta_compartilhada_valor.id_despesa')
            ->join('usuario', 'usuario.id_usuario', '=', 'despesa.id_usuario')
            ->join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->where('conta_compartilhada_valor.id_pessoa', $pessoa)
            ->select('conta_compartilhada_valor.*', 'despesa.*', 'pessoa.*')
            ->get()
        ;
        $arDespesa = [];
        foreach ($despesa as $key => $value) {
            $arDespesa[$key] = $value;
            $arDespesa[$key]['itens'] = \App\DespesaItem::where('id_despesa', $value->id_despesa)->get();
        }

        return response($arDespesa);
    }

    public function despesasAguardandoAprovacao(Request $request)
    {
        $compartilhada = \App\DespesaCompartilhada::where('id_conta_compartilhada', $request['id_conta_compartilhada'])->where('id_pessoa', auth()->user()->id_pessoa)->first();
        if ($compartilhada) {
            $compartilhada->bo_aprovado = $request->bo_aprovado;
            if (!$compartilhada->save()) {
                return response(['response' => 'Conta não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'id' => $compartilhada->id_conta]);
        }

        return response(['response' => 'Conta não encontrado']);
    }
}
