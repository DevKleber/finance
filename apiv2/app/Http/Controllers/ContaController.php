<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class ContaController extends Controller
{

    public function index()
    {
        $conta = \App\Conta::where('id_usuario', auth()->user()->id_usuario)->get();
        if(!$conta){
            return response(["response"=>"Contas não encontradas"],400);
        }
        return $conta;
    }


    public function store(Request $request)
    {
        $request['id_usuario'] = auth()->user()->id_usuario;
        return \App\Conta::create($request->all());
    }

    public function show($id)
    {
        $conta =  \App\Conta::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if(!$conta){
            return response(["response"=>"Contas não encontrado"],400);
        }
        return $conta;
    }


    public function update(Request $request, $id)
    {
        $conta =  \App\Conta::find($id);
        if($conta){
            if($conta['id_usuario'] != auth()->user()->id_usuario){
                return response(['error'=>"Não tem permissão para alterar esse Conta"],400);
            }

            $conta->no_conta = $request->no_conta;
            $conta->vl_saldo = $request->vl_saldo;
            if(!$conta->save()){
                return response(["response"=>"Conta não foi atualizado"],400);
            }
            return response(["response"=>"Atualizado com sucesso","id"=>$conta->id_conta]);
        }else{
            return response(['response'=>"Conta não encontrado"]);
        }
    }

    public function destroy($id)
    {
        $conta =  \App\Conta::find($id);
        if(!$conta){
            return response(['response'=>'Conta Não encontrado'],400);
        }
        if($conta['id_usuario'] != auth()->user()->id_usuario){
            return response(['error'=>"Não tem permissão para deletar esse Conta"],400);
        }
        $conta->bo_ativo = false;
        if(!$conta->save()){
            return response(["response"=>"Erro ao deletar conta"],400);
        }
        return response(['response'=>'Deletado com sucesso']);
    }
    public function ativar($id)
    {
        $conta =  \App\Conta::find($id);
        if(!$conta){
            return response(['response'=>'Conta Não encontrado'],400);
        }
        if($conta->bo_ativo ==true){
            return response(['response'=>"Essa conta não está inativa"],400);
        }
        if($conta['id_usuario'] != auth()->user()->id_usuario){
            return response(['error'=>"Não tem permissão para ativar esse Conta"],400);
        }
        $conta->bo_ativo = true;
        if(!$conta->save()){
            return response(["response"=>"Erro ao ativar conta"],400);
        }
        return response(['response'=>'Ativado com sucesso']);
    }
}
