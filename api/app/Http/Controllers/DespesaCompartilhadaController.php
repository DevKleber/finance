<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Helpers;


class DespesaCompartilhadaController extends Controller
{
    private $token;

    public function __construct() 
    {
        $this->token = JWTAuth::parseToken()->authenticate();
    }

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
        $despesa = new \App\Despesa();
        \DB::beginTransaction();
        $ar = $despesa->insert($request,$bo_amigos=true);
        if($ar){
            
            $pessoa = new \App\Pessoa();
            $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();
            $minhaPorcentagem = (100 - $request['vl_conta_compartilhada_porcentagem']);

            $arPessoas []= ["id_pessoa" => $usuarioPessoaLogado->id_pessoa,"vl_conta_compartilhada_porcentagem"=>$minhaPorcentagem];
            $arPessoas []= ["id_pessoa" => $request['id_pessoa'],"vl_conta_compartilhada_porcentagem"=>$request['vl_conta_compartilhada_porcentagem']];
            // return $arPessoas;
            $errors=0;
            foreach ($arPessoas as $key => $value) {
                $request['id_pessoa'] = $value['id_pessoa'];
                $request['vl_conta_compartilhada_porcentagem'] = $value['vl_conta_compartilhada_porcentagem'];
                $despesaCompartilhada =  \App\DespesaCompartilhada::create($request->all());
                if(!$despesaCompartilhada){
                    $errors++;
                }
            }
            if($errors==0){
                \DB::commit();
                return $ar;
            }
            return response(["resposne"=>"Erro ao salvar despesa",400]);
        }
        return response(["resposne"=>"Erro ao salvar despesa",400]);
        
    }

    public function show($id)
    {
        $despesaCompartilhada =  \App\DespesaCompartilhada::find($id)->where('id_usuario', $this->token['id_usuario']);
        if(!$despesaCompartilhada){
            return response(["response"=>"DespesaCompartilhada de Crédito não encontrada"],400);
        }
        return $despesaCompartilhada;
    }
}
