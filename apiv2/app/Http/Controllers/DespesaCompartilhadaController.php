<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;


class DespesaCompartilhadaController extends Controller
{
    public function index()
    {
        $pessoa = new \App\Pessoa();
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();

        $despesaCompartilhada =  \DB::table('conta_compartilhada_valor')->select('conta_compartilhada_valor.*','despesa.*')
        ->join('despesa', 'despesa.id_despesa', '=', 'conta_compartilhada_valor.id_despesa')
        ->where('conta_compartilhada_valor.id_pessoa', $usuarioPessoaLogado->id_pessoa)
        ->get();

        if(!$despesaCompartilhada){
            return response(["response"=>"DespesaCompartilhada não encontrada"],400);
        }
        return $despesaCompartilhada;
    }

    public function store(Request $request,$bo_amigos = false)
    {
    }

    public function show($id)
    {
        $despesaCompartilhada =  \App\DespesaCompartilhada::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if(!$despesaCompartilhada){
            return response(["response"=>"DespesaCompartilhada de Crédito não encontrada"],400);
        }
        return $despesaCompartilhada;
    }
}
