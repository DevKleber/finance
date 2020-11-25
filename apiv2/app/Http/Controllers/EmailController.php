<?php

namespace App\Http\Controllers;

class EmailController extends Controller
{
    public function contasVencendo()
    {
        $euSouAmigo = null;
        if (!$euSouAmigo) {
            return response(['response' => 'Amigo não encontrada'], 400);
        }

        return [];
    }

    public function cartaoCreditoVencendo()
    {
        $cartaoVenceHoje = \App\DespesaCartao::join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->join('cartao_credito', 'cartao_credito.id_cartao_credito', '=', 'despesa_cartao.id_cartao_credito')
            ->join('usuario', 'usuario.id_usuario', '=', 'cartao_credito.tb_usuario_id_usuario')
            ->join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->whereRaw(' MONTH(now()) = MONTH(tb_despesa_item.dt_vencimento) and YEAR(now()) = YEAR(tb_despesa_item.dt_vencimento) and DAY(now()) = DAY(tb_despesa_item.dt_vencimento) ')
            ->select('cartao_credito.id_cartao_credito', 'cartao_credito.no_cartao_credito', 'cartao_credito.dia_vencimento', 'pessoa.no_pessoa', 'pessoa.no_email')
            ->groupByRaw(' tb_cartao_credito.id_cartao_credito, tb_cartao_credito.no_cartao_credito, tb_cartao_credito.dia_vencimento, tb_pessoa.no_pessoa, tb_pessoa.no_email')
            ->get()
        ;
        if (!$cartaoVenceHoje) {
            return response(['response' => 'Amigo não encontrada'], 400);
        }

        $ar = [];
        foreach ($cartaoVenceHoje as $key => $value) {
            $item = [];

            $item['id_cartao_credito'] = $value->id_cartao_credito;
            $item['no_cartao_credito'] = $value->no_cartao_credito;
            $item['dia_vencimento'] = $value->dia_vencimento;
            $item['no_pessoa'] = $value->no_pessoa;
            $item['no_email'] = $value->no_email;

            $resumo = \App\DespesaCartao::join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_cartao.id_despesa')
                ->join('despesa', 'despesa.id_despesa', '=', 'despesa_item.id_despesa')
                ->whereRaw('tb_despesa_cartao.id_cartao_credito = '.$value->id_cartao_credito.' and MONTH(now()) = MONTH(tb_despesa_item.dt_vencimento) and YEAR(now()) = YEAR(tb_despesa_item.dt_vencimento)')
                ->selectRaw('count(*) as quantidade, sum(tb_despesa_item.vl_despesa) as valor')
                ->get()->toArray()
            ;
            $item['resumo'] = current($resumo);

            $ar[] = $item;
            \App\Email::cartaoVencendo($item);
        }

        return response($ar);
    }
}
