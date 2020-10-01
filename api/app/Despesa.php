<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Despesa extends Model
{
    protected $table = "despesa";
    protected $primaryKey   = 'id_despesa';
    protected $fillable = ['vl_despesac','dt_despesa','ds_despesa','bo_dividir_amigos','id_tipo_despesa','id_categoria_despesa','id_usuario','created_at','updated_at'];

    public function insert(Request $request,$bo_amigos = false){
        $request['id_usuario'] = \JWTAuth::parseToken()->authenticate()['id_usuario'];
        $request['dt_despesa'] = date("Y-m-d");
        $request['bo_dividir_amigos'] = $bo_amigos;
        
        
        $despesa =  \App\Despesa::create($request->all());
        if(!$despesa){
            return response(["error"=>"erro ao criar despesa, tente novamente mais tarde"]);
        }
        $despesaItem = new \App\DespesaItem();
        $itens = $despesaItem->insert($request,$despesa);
        if(!$itens){
            return response(['error'=>"erro ao criar itens da despesa"]);
        }
        return $despesa;
    }
}
