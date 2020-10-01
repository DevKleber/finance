<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Helpers;

class CartaoCreditoController extends Controller
{
    private $token;

    public function __construct() 
    {
        $this->token = JWTAuth::parseToken()->authenticate();
    }

    public function index()
    {
        $cartaoCredito = \App\CartaoCredito::where('tb_usuario_id_usuario',$this->token['id_usuario'])->where('bo_ativo',true)->get();
        if(!$cartaoCredito){
            return response(["response"=>"Cartão não encontrada"],400);
        }
        return $cartaoCredito;
    }

    public function store(Request $request)
    {
        $request['tb_usuario_id_usuario'] = $this->token['id_usuario'];
        $request['bo_ativo'] = true;
        $request['dt_primeira_fatura'] = Helpers::convertdateBr2DB($request['dt_primeira_fatura']);
        return \App\CartaoCredito::create($request->all());
    }

    public function show($id)
    {
        $cartaoCredito =  \App\CartaoCredito::find($id)->where('tb_usuario_id_usuario', $this->token['id_usuario']);
        if(!$cartaoCredito){
            return response(["response"=>"Cartão de Crédito não encontrada"],400);
        }
        return $cartaoCredito;
    }

    
    public function update(Request $request, $id)
    {
        $cartaoCredito =  \App\CartaoCredito::find($id);
        if($cartaoCredito){
            if($cartaoCredito['tb_usuario_id_usuario'] != $this->token['id_usuario']){
                return response(['error'=>"Não tem permissão para alterar esse CartaoCredito"],400);
            }
            $cartaoCredito = Helpers::removerVazio($cartaoCredito,$request->all());
            
            if(!$cartaoCredito->update()){
                return response(["response"=>"CartaoCredito não foi atualizado"],400);
            }
            return response(["response"=>"Atualizado com sucesso","value"=>$cartaoCredito]);
        }else{
            return response(['response'=>"CartaoCredito não encontrado"]);
        }
    }

    public function destroy($id)
    {
        $cartaoCredito =  \App\CartaoCredito::find($id);
        if(!$cartaoCredito){
            return response(['response'=>'CartaoCredito Não encontrado'],400);
        }
        if($cartaoCredito['tb_usuario_id_usuario'] != $this->token['id_usuario']){
            return response(['error'=>"Não tem permissão para deletar esse CartaoCredito"],400);
        }
        $cartaoCredito->bo_ativo = false;
        if(!$cartaoCredito->save()){
            return response(["response"=>"Erro ao deletar conta"],400);
        }
        return response(['response'=>'Deletado com sucesso']);
    }
    
}
