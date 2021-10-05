<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getDashboard(Request $request)
    {
        $pessoa = new \App\Pessoa();
        $usuarioLogado = $pessoa->getUsuarioPessoa();


        return [
            'despesasDoMesCategoria' => $this->despesasDoMesCategoria(),

        ];
    }

    public function despesasDoMesCategoria()
    {
        $despesasDividias = \DB::select("
        SELECT tcd.id_categoria_despesa,tcd.icon,
            tcd.no_categoria_despesa,
            sum((tccv.vl_conta_compartilhada_porcentagem / 100 * di.vl_despesa)) AS vl_despesa
        FROM tb_despesa_item di
        JOIN tb_despesa td ON td.id_despesa = di.id_despesa
        JOIN tb_categoria_despesa tcd ON tcd.id_categoria_despesa = td.id_categoria_despesa
        JOIN tb_categoria_despesa cp ON cp.id_categoria_despesa = tcd.id_categoria_despesa_pai
        JOIN tb_conta_compartilhada_valor tccv ON tccv.id_despesa = td.id_despesa
        WHERE tccv.id_pessoa = 45
        AND MONTH(dt_vencimento) = '10'
        AND YEAR(dt_vencimento) = '2021'
        AND tccv.vl_conta_compartilhada_porcentagem > 0
        GROUP BY tcd.id_categoria_despesa
        UNION ALL
        SELECT tcd.id_categoria_despesa,tcd.icon,
            tcd.no_categoria_despesa,
            sum(di.vl_despesa) AS vl_despesa
        FROM tb_despesa_item di
        JOIN tb_despesa td ON td.id_despesa = di.id_despesa
        JOIN tb_categoria_despesa tcd ON tcd.id_categoria_despesa = td.id_categoria_despesa
        JOIN tb_categoria_despesa cp ON cp.id_categoria_despesa = tcd.id_categoria_despesa_pai
        WHERE td.id_usuario = 12
        AND td.bo_dividir_amigos = FALSE
        AND MONTH(dt_vencimento) = '10'
        AND YEAR(dt_vencimento) = '2021'
        GROUP BY tcd.id_categoria_despesa
        ORDER BY vl_despesa DESC
        ;
        ");

        $ar = [];
        $total = 0;
        foreach ($despesasDividias as $key => $value) {
            $valorExistente = isset($ar[$value->id_categoria_despesa]) ? $ar[$value->id_categoria_despesa]->vl_despesa : 0;
            $ar[$value->id_categoria_despesa] = $value;
            $valor = ((float) $value->vl_despesa + $valorExistente);
            $ar[$value->id_categoria_despesa]->vl_despesa = $valor;
            $total += $valor;
        }
        //forçando o retorno que o angular entenda.
        $arReturn = [];
        foreach ($ar as $value) {
            $arReturn[] = $value;
        }
        return ['data' => $arReturn, 'total' => $total];
    }
}
