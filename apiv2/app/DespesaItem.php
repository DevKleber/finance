<?php

namespace App;

use Helpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\Request;

class DespesaItem extends Model
{
    protected $table = 'despesa_item';
    protected $primaryKey = 'id_despesa_item';
    protected $fillable = ['id_despesa_item', 'dt_vencimento', 'vl_despesa', 'nu_parcela_atual', 'nu_parcela', 'bo_paga', 'id_despesa', 'created_at', 'updated_at'];

    public function insert($request, $despesa)
    {
        $dataDaCompra = $request['dt_despesa']; // data atual
        $timestamp_dataDaCompra = strtotime($dataDaCompra); // converte para timestamp Unix

        $errors = 0;
        $qtParcelas = $request['qtd_parcelas'] ?? 1;
        if (null != $request['id_cartao_credito']) {
            $cartaoCredito = \App\CartaoCredito::getVencimentoByCartao($request['id_cartao_credito']);
            $cartaoCredito->dia_fechamento_fatura = str_pad($cartaoCredito->dia_fechamento_fatura, 2, '0', STR_PAD_LEFT);
            $dtVencimentoCartao = date("Y-m-{$cartaoCredito->dia_vencimento}");

            $diaAtual = date('Y-m-d');
            $dtFechamento = date("Y-m-{$cartaoCredito->dia_fechamento_fatura}");
            $timestamp_dt_expira = strtotime($dtFechamento); // converte para timestamp Unix

            $dtVencimento = $dtVencimentoCartao;
            if ($timestamp_dataDaCompra >= $timestamp_dt_expira) { // true
                $dtVencimento = date('Y-m-d', strtotime('+1 month', strtotime($dtVencimentoCartao)));
                // if (date('d') >= $cartaoCredito->dia_fechamento_fatura) {
                // }
            }
        } else {
            $request['dt_vencimento'] = Helpers::convertDateWithoutSeparatorToDatabase($request['dt_vencimento']);
            $dtVencimento = Helpers::convertdateBr2DB(date($request['dt_vencimento']));
        }

        // Hoje 09
        // dia_fechamento_fatura:25
        // dia_vencimento:9

        for ($i = 0; $i < $qtParcelas; ++$i) {
            $nu_parcela = ($i + 1);
            $request['vl_despesa'] = ($request['vl_despesac'] / $qtParcelas);
            $request['dt_vencimento'] = ($i > 0) ? date('Y-m-d', strtotime("+{$i} month", strtotime($dtVencimento))) : $dtVencimento;
            $request['nu_parcela_atual'] = $nu_parcela;
            $request['nu_parcela'] = $qtParcelas;
            $request['id_despesa'] = $despesa['id_despesa'];
            $item = \App\DespesaItem::create($request->all());
            if (!$item) {
                ++$errors;
            }
        }
        if ($errors > 0) {
            return response([false]);
        }

        return response([true]);
    }

    public function updateItem(Request $request, $id)
    {
        $despesaItem = \App\DespesaItem::find($id);
        $despesa = \App\Despesa::find($despesaItem->id_despesa);
        $id_despesa = $despesaItem->id_despesa;
        $item = $despesaItem;
        $dtVencimento = Helpers::convertdateBr2DB(date($request['dt_vencimento']));
        if ($despesaItem) {
            if ($despesa['id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse Despesa'], 400);
            }
            if ($dtVencimento == $despesaItem->dt_vencimento) {
                unset($request['dt_vencimento']);
            }
            if (!$request['bo_compartilhada']) {
                $request['vl_despesa'] = $request['vl_despesac'];
            } else {
                // esse parte do código está com a lógica errada, tenho que refazer.
                unset($request['vl_despesa']);
                $pessoa = new \App\Pessoa();
                $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();
                $despesaCompartilhada = \App\DespesaCompartilhada::where([['id_despesa', '=', $id_despesa], ['id_pessoa', '=', $usuarioPessoaLogado->id_pessoa]])->first();

                $dpitem = ($despesaItem->vl_despesa * $despesaCompartilhada->vl_conta_compartilhada_porcentagem / 100) * $despesaItem->nu_parcela;
                $diferenca = $despesaItem->vl_despesa - $request['vl_despesac'];
                $vlDescontoFinal = $dpitem - $diferenca;

                $porcentagem = ($vlDescontoFinal * 100 / 1000);
                // $porcentagem = ($request['vl_despesac']*100/1000);

                $despesaCompartilhada->vl_conta_compartilhada_porcentagem = $porcentagem;
                if (!$despesaCompartilhada->update()) {
                    return false;
                }
                //fim esse parte do código está com a lógica errada, tenho que refazer.
            }

            $despesaItem = Helpers::processarColunas($this->fillable, $request->all());

            if ('false' == $request['bo_alterartodasFuturas']) {
                return $this->updateJustItem($despesaItem, $item);
            }

            unset($despesaItem['dt_vencimento']); //romovendo o mes para inserir apenas na hora de salvar.
            $despesaItens = \App\DespesaItem::where([['id_despesa', '=', $id_despesa], ['bo_paga', '=', '0']])->get();
            $erros = 0;
            foreach ($despesaItens as $key => $di) {
                foreach ($despesaItem as $keyRequest => $itemRequest) {
                    $di[$keyRequest] = $itemRequest;
                }
                if (isset($request['dt_vencimento'])) {
                    $diaVencimento = explode('/', $request['dt_vencimento']);
                    $diaVencimentoOld = explode('-', $di->dt_vencimento);
                    $di->dt_vencimento = date("{$diaVencimentoOld[0]}-{$diaVencimentoOld[1]}-{$diaVencimento[0]}");
                }
                if (!$di->update()) {
                    ++$erros;
                }
            }

            if ($erros > 0) {
                return false;
            }

            return true;
        }

        return response(['response' => 'Despesa não encontrado']);
    }

    public function pagarDespesa($request, $id_item)
    {
        $despesaItem = \App\DespesaItem::find($id_item);
        $despesa = \App\Despesa::find($despesaItem->id_despesa);
        if ($despesa['id_usuario'] != auth()->user()->id_usuario) {
            return response(['error' => 'Não tem permissão para alterar esse Despesa'], 400);
        }
        $despesaItem->bo_paga = true;
        if ($despesaItem->update()) {
            return $despesaItem;
        }

        return false;
    }

    private function updateJustItem($despesaItem, $item)
    {
        foreach ($despesaItem as $keyRequest => $itemRequest) {
            $item[$keyRequest] = $itemRequest;
        }
        if (!$item->update()) {
            return false;
        }

        return true;
    }
}
