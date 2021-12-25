<?php

namespace App;

use Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class Despesa extends Model
{
    protected $table = 'despesa';
    protected $primaryKey = 'id_despesa';
    protected $fillable = ['vl_despesac', 'dt_despesa', 'ds_despesa', 'bo_dividir_amigos', 'id_tipo_despesa', 'id_categoria_despesa', 'id_usuario', 'created_at', 'updated_at','produto', 'referencia_extrato'];

    public function insert(Request $request, $bo_amigos = false)
    {
        $explodeData = explode('/', $request['dt_despesa']);
        if (is_array($explodeData)) {
            if (3 == count($explodeData)) {
                $request['dt_despesa'] = Helpers::convertdateBr2DB($request['dt_despesa']);
            }
        }

        $request['id_usuario'] = auth()->user()->id_usuario;

        $despesa = \App\Despesa::create($request->all());
        if (!$despesa) {
            return response(['error' => 'erro ao criar despesa, tente novamente mais tarde']);
        }
        $despesaItem = new \App\DespesaItem();
        $itens = $despesaItem->insert($request, $despesa);
        if (!$itens) {
            return response(['error' => 'erro ao criar itens da despesa']);
        }

        return $despesa;
    }
}
