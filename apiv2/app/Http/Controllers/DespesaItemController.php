<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DespesaItemController extends Controller
{


    public function index()
    {
        $despesaItem = \App\DespesaItem::where('id_usuario', auth()->user()->id_usuario)->get();
        if(!$despesaItem){
            return response(["response"=>"DespesaItem não encontrada"],400);
        }
        return $despesaItem;
    }

    public function store(Request $request)
    {
        // ['dt_vencimento','vl_despesa','nu_parcela','id_despesa']
        $nu_parcela =0;
        for ($i=0; $i < $request['qtd_parcelas'] ; $i++) {
            $nu_parcela++;
            $request['vl_despesa'] = $request['vl_despesa']/$request['qtd_parcelas'];
            $request['dt_vencimento'] = Helpers::convertdateBr2DB($request['dt_vencimento']);
            $request['nu_parcela'] = Helpers::convertdateBr2DB($nu_parcela);
            $item []= \App\DespesaItem::create($request->all());
        }
        return $item;

    }

    public function show($id)
    {
        $despesaItem =  \App\DespesaItem::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if(!$despesaItem){
            return response(["response"=>"DespesaItem de Crédito não encontrada"],400);
        }
        return $despesaItem;
    }


    public function update(Request $request, $id)
    {
        $despesaItem =  \App\DespesaItem::find($id);
        if($despesaItem){
            if($despesaItem['id_usuario'] != auth()->user()->id_usuario){
                return response(['error'=>"Não tem permissão para alterar esse DespesaItem"],400);
            }
            $despesaItem = Helpers::processar($despesaItem,$request->all());
            $despesaItem->bo_repetir = ($despesaItem->bo_repetir == null)?false:true;
            if(!$despesaItem->update()){
                return response(["response"=>"DespesaItem não foi atualizado"],400);
            }
            return response(["response"=>"Atualizado com sucesso","value"=>$despesaItem]);
        }else{
            return response(['response'=>"DespesaItem não encontrado"]);
        }
    }

    public function destroy($id)
    {
        $despesaItem =  \App\DespesaItem::find($id);
        if(!$despesaItem){
            return response(['response'=>'DespesaItem Não encontrado'],400);
        }
        if($despesaItem['id_usuario'] != auth()->user()->id_usuario){
            return response(['error'=>"Não tem permissão para deletar esse DespesaItem"],400);
        }
        $despesaItem->dt_cancelado = date("Y-m-d");
        if(!$despesaItem->save()){
            return response(["response"=>"Erro ao deletar conta"],400);
        }
        return response(['response'=>'Deletado com sucesso']);
    }
    public function changeBoRepetir(Request $request, $id){
        $despesaItem =  \App\DespesaItem::find($id);
        if($despesaItem){
            if($despesaItem['id_usuario'] != auth()->user()->id_usuario){
                return response(['error'=>"Não tem permissão para alterar esse DespesaItem"],400);
            }
            $despesaItem->bo_repetir = ($request->bo_repetir==='true')?true:false;

            $despesaItem->dt_fim_intervalo = Helpers::convertdateBr2DB($request['dt_fim_intervalo']);
            if(!$despesaItem->update()){
                return response(["response"=>"DespesaItem não foi atualizado"],400);
            }
            return response(["response"=>"Atualizado com sucesso","value"=>$despesaItem]);
        }else{
            return response(['response'=>"DespesaItem não encontrado"]);
        }
    }

}
