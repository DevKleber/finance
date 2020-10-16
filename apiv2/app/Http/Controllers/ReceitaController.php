<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;

class ReceitaController extends Controller
{


    public function index()
    {
        $receita = \App\Receita::where('id_usuario', auth()->user()->id_usuario)->get();
        if (!$receita) {
            return response(['response' => 'Receita não encontrada'], 400);
        }

        return $receita;
    }

    public function store(Request $request)
    {
        // "ds_receita","vl_receita","dt_receita","dt_fim_intervalo","dt_vencimento_pagamento","dt_cancelado","bo_repetir","id_categoria_receita","id_usuario"
        $request['id_usuario'] = auth()->user()->id_usuario;
        $request['dt_receita'] = date('Y-m-d');
        $request['dt_fim_intervalo'] = Helpers::convertdateBr2DB($request['dt_fim_intervalo']);
        $request['dt_vencimento_pagamento'] = Helpers::convertdateBr2DB($request['dt_vencimento_pagamento']);

        return \App\Receita::create($request->all());
    }

    public function show($id)
    {
        $receita = \App\Receita::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if (!$receita) {
            return response(['response' => 'Receita de Crédito não encontrada'], 400);
        }

        return $receita;
    }

    public function update(Request $request, $id)
    {
        $receita = \App\Receita::find($id);
        if ($receita) {
            if ($receita['id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse Receita'], 400);
            }
            $receita = Helpers::processar($receita, $request->all());
            $receita->bo_repetir = (null == $receita->bo_repetir) ? false : true;
            if (!$receita->update()) {
                return response(['response' => 'Receita não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'value' => $receita]);
        }

        return response(['response' => 'Receita não encontrado']);
    }

    public function destroy($id)
    {
        $receita = \App\Receita::find($id);
        if (!$receita) {
            return response(['response' => 'Receita Não encontrado'], 400);
        }
        if ($receita['id_usuario'] != auth()->user()->id_usuario) {
            return response(['error' => 'Não tem permissão para deletar esse Receita'], 400);
        }
        $receita->dt_cancelado = date('Y-m-d');
        if (!$receita->save()) {
            return response(['response' => 'Erro ao deletar conta'], 400);
        }

        return response(['response' => 'Deletado com sucesso']);
    }

    public function changeBoRepetir(Request $request, $id)
    {
        $receita = \App\Receita::find($id);
        if ($receita) {
            if ($receita['id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse Receita'], 400);
            }
            $receita->bo_repetir = ('true' === $request->bo_repetir) ? true : false;

            $receita->dt_fim_intervalo = Helpers::convertdateBr2DB($request['dt_fim_intervalo']);
            if (!$receita->update()) {
                return response(['response' => 'Receita não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'value' => $receita]);
        }

        return response(['response' => 'Receita não encontrado']);
    }
}
