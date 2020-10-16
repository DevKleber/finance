<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;

class DespesaController extends Controller
{

    public function index()
    {
        $despesa = \App\Despesa::where('id_usuario', auth()->user()->id_usuario)->get();
        if(!$despesa){
            return response(["response"=>"Despesa não encontrada"],400);
        }
        return $despesa;
    }

    public function store(Request $request,$bo_amigos = false)
    {


    }

    public function show($id)
    {
        $despesa =  \App\Despesa::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if(!$despesa){
            return response(["response"=>"Despesa de Crédito não encontrada"],400);
        }
        return $despesa;
    }


    public function update(Request $request, $id)
    {
        //para alterar o valor da despesa compartilhada vou ter que alterar apenas o valor na coluna vl_conta_compartilhada_porcentagem da tabela tb_conta_compartilhada_valor
        $despesa =  \App\Despesa::find($id);
        return $despesa;
        if($despesa){
            if($despesa['id_usuario'] != auth()->user()->id_usuario){
                return response(['error'=>"Não tem permissão para alterar esse Despesa"],400);
            }
            $despesa = Helpers::processar($despesa,$request->all());
            if(!$despesa->update()){
                return response(["response"=>"Despesa não foi atualizado"],400);
            }
            return response(["response"=>"Atualizado com sucesso","value"=>$despesa]);
        }else{
            return response(['response'=>"Despesa não encontrado"]);
        }
    }
    public function updateItem(Request $request,$id){

        $despesa = $this->updateDespesa($request,$id);
        if($despesa['naoexiste']){
            return response(['resposne'=>'Despesa não encontrado']);
        }

        if($despesa){
            $despesaItem = new \App\DespesaItem();
            $itens = $despesaItem->updateItem($request,$id);

            if($itens){
                return response([$despesa]);
            }
            return response(["response"=>"error"],400);
        }
    }

    public function updateDespesa(Request $request,$id){
        $despesaItem =  \App\DespesaItem::find($id);
        if(!$despesaItem){
            return ["naoexiste"=>true];
        }
        $despesa =  \App\Despesa::find($despesaItem->id_despesa);
        $despesa = Helpers::processar($despesa,$request->all());

        unset($despesa['dt_vencimento']);
        unset($despesa['qtd_parcelas']);
        unset($despesa['bo_alterartodasFuturas']);
        unset($despesa['bo_compartilhada']);


        if(!$despesa->save()){
            return false;
        }
        return $despesa;
    }
    public function pagarDespesa(Request $request,$id){
        $despesaItem = new \App\DespesaItem();
        if(!empty($request['id_despesa_item'])){
            return response(['response'=>"Vamos alterar pelo formulario id_despesa_item podendo passar mais de um item"]);
        }else{
            $update = $despesaItem->pagarDespesa($request,$id);
            if($update){
                return response([$update]);
            }
            return response(["reponse"=>"erro"],400);
        }

    }

    public function destroy($id)
    {
        $despesa =  \App\Despesa::find($id);
        if(!$despesa){
            return response(['response'=>'Despesa Não encontrado'],400);
        }
        if($despesa['id_usuario'] != auth()->user()->id_usuario){
            return response(['error'=>"Não tem permissão para deletar esse Despesa"],400);
        }
        $despesa->dt_cancelado = date("Y-m-d");
        if(!$despesa->save()){
            return response(["response"=>"Erro ao deletar conta"],400);
        }
        return response(['response'=>'Deletado com sucesso']);
    }

    public function changeBoRepetir(Request $request, $id){
        $despesa =  \App\Despesa::find($id);
        if($despesa){
            if($despesa['id_usuario'] != auth()->user()->id_usuario){
                return response(['error'=>"Não tem permissão para alterar esse Despesa"],400);
            }
            $despesa->bo_repetir = ($request->bo_repetir==='true')?true:false;

            $despesa->dt_fim_intervalo = Helpers::convertdateBr2DB($request['dt_fim_intervalo']);
            if(!$despesa->update()){
                return response(["response"=>"Despesa não foi atualizado"],400);
            }
            return response(["response"=>"Atualizado com sucesso","value"=>$despesa]);
        }else{
            return response(['response'=>"Despesa não encontrado"]);
        }
    }

}
