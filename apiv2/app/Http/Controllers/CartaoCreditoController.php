<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;

class CartaoCreditoController extends Controller
{
    public function index()
    {
        $cartaoCredito = \App\CartaoCredito::where('tb_usuario_id_usuario', auth()->user()->id_usuario)->where('bo_ativo', true)->get();
        if (!$cartaoCredito) {
            return response(['response' => 'Cartão não encontrada'], 400);
        }

        return $cartaoCredito;
    }

    public function store(Request $request)
    {
        $request['tb_usuario_id_usuario'] = auth()->user()->id_usuario;
        $request['bo_ativo'] = true;
        $request['dt_primeira_fatura'] = Helpers::convertdateBr2DB($request['dt_primeira_fatura']);

        return \App\CartaoCredito::create($request->all());
    }

    public function getFaturas(Request $request)
    {
        $cartaoCredito = \App\CartaoCredito::where('id_cartao_credito', $request['id'])->where('tb_usuario_id_usuario', auth()->user()->id_usuario)->first();
        if (!$cartaoCredito) {
            return response(['response' => 'Cartão de Crédito não encontrada'], 400);
        }

        $pessoa = new \App\Pessoa();
        $usuarioLogado = $pessoa->getUsuarioPessoa();

        $getFaturasCartao = $this->getFaturasCartao($usuarioLogado, $request['id'], $request->all());

        $resumo = [
            'totalAPagarCartao' => 0,
            'despesasCompartilhadasComAmigosMeuCartao' => 0,
            'despesasCompartilhadasComAmigosCartaoDoAmigo' => 0,
            'minhasDespesasEmConta' => 0,
            'despesasCompartilhadasComAmigosNaMinhaConta' => 0,
            'despesasCompartilhadasComAmigosNaContaDoAmigo' => 0,
        ];
        $faturas = [];
        $totalAPagarCartao = 0;
        $dividaAmigos = [];
        foreach ($getFaturasCartao as $key => $value) {
            $faturas[$key] = $value;
            // ->where('bo_aprovado', true)
            $pessoas = \App\DespesaCompartilhada::join('pessoa', 'pessoa.id_pessoa', '=', 'conta_compartilhada_valor.id_pessoa')
                ->where('conta_compartilhada_valor.id_despesa', $value->id_despesa)
                ->get()
            ;
            $faturas[$key]['pessoas'] = $pessoas;

            $resumo['totalAPagarCartao'] += $value->vl_despesa;

            if ($faturas[$key]['pessoas']->count() > 0) {
                foreach ($faturas[$key]['pessoas'] as $keyAmigo => $valueAmigo) {
                    $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $valueAmigo->id_pessoa)->where('bo_paga', true);
                    $pagoTotal = $pago->count();
                    $pagamento = $pago->first();

                    $faturas[$key]['pessoas'][$keyAmigo]['pago'] = $pagoTotal > 0 ? true : false;
                    $faturas[$key]['pessoas'][$keyAmigo]['pagamento'] = $pagamento ?? false;

                    $valorDoAmigo = $value->vl_despesa * $valueAmigo->vl_conta_compartilhada_porcentagem / 100;

                    $dividaAmigos[$valueAmigo->id_pessoa]['nome'] = $valueAmigo->no_pessoa;
                    $dividaAmigos[$valueAmigo->id_pessoa]['valor'] =
                        isset($dividaAmigos[$valueAmigo->id_pessoa]['valor']) ?
                            $dividaAmigos[$valueAmigo->id_pessoa]['valor'] + $valorDoAmigo :
                                $valorDoAmigo;

                    $dividaAmigos[$valueAmigo->id_pessoa]['categoria'][$value->catpai_id_categoria_despesa][] = [
                        'name' => $value->catpai_no_categoria_despesa,
                        'value' => $valorDoAmigo,
                    ]
                        ;
                }
            } else {
                $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $value->id_pessoa)->where('bo_paga', true);
                $pagoTotal = $pago->count();
                $pagamento = $pago->first();

                $faturas[$key]['pago'] = $pagoTotal > 0 ? true : false;
                $faturas[$key]['pagamento'] = $pagamento ?? false;

                $dividaAmigos[$usuarioLogado->id_pessoa]['valor'] =
                    isset($dividaAmigos[$usuarioLogado->id_pessoa]['valor']) ?
                        $dividaAmigos[$usuarioLogado->id_pessoa]['valor'] + $value->vl_despesa :
                        $value->vl_despesa;
                $dividaAmigos[$usuarioLogado->id_pessoa]['categoria'][$value->catpai_id_categoria_despesa][] = [
                    'name' => $value->catpai_no_categoria_despesa,
                    'value' => $value->vl_despesa,
                ]
                            ;
            }
        }

        // montando array para grafico

        foreach ($dividaAmigos as $key => $value) {
            foreach ($value['categoria'] as $keyCat => $cat) {
                $categoriaCalculo = [
                    'name' => null,
                    'value' => 0,
                ];
                $categoriaCalculo['name'] = $cat[0]['name'];
                foreach ($cat as $keyItem => $item) {
                    $categoriaCalculo['value'] += $item['value'];
                }
                $dividaAmigos[$key]['grafico'][] = $categoriaCalculo;
            }
        }

        return [
            'faturasCartao' => $faturas,
            'cartao' => $cartaoCredito,
            'resumo' => $resumo,
            'dividaAmigos' => $dividaAmigos,
            // 'minhasDespesasComCartao' => $minhasDespesasComCartao,
            // 'despesasCompartilhadasComAmigosMeuCartao' => $despesasCompartilhadasComAmigosMeuCartao,
            // 'amigosPagar' => $amigosPagarArray,
        ];
    }

    public function getFaturasCartao($usuarioLogado, $id_cartao_credito, $data)
    {
        return \App\DespesaCartao:: join('despesa', 'despesa.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->join('usuario', 'usuario.id_usuario', '=', 'despesa.id_usuario')
            ->join('categoria_despesa', 'categoria_despesa.id_categoria_despesa', '=', 'despesa.id_categoria_despesa')
            ->leftjoin('categoria_despesa as cdp', 'cdp.id_categoria_despesa', '=', 'categoria_despesa.id_categoria_despesa_pai')
            ->join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->Join('cartao_credito', 'cartao_credito.id_cartao_credito', '=', 'despesa_cartao.id_cartao_credito')
            ->where('despesa_cartao.id_cartao_credito', $id_cartao_credito)
            ->where('cartao_credito.tb_usuario_id_usuario', $usuarioLogado->id_usuario)
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'])
            ->select(
                'despesa_cartao.*',
                'usuario.*',
                'categoria_despesa.*',
                'categoria_despesa.*',
                'despesa_item.*',
                'cartao_credito.*',
                'despesa.*',
                'cdp.id_categoria_despesa as catpai_id_categoria_despesa',
                'cdp.no_categoria_despesa as catpai_no_categoria_despesa'
            )
            ->get()
        ;
    }

    public function show($id)
    {
        $cartaoCredito = \App\CartaoCredito::find($id)->where('tb_usuario_id_usuario', auth()->user()->id_usuario)->get();
        if (!$cartaoCredito) {
            return response(['response' => 'Cartão de Crédito não encontrada'], 400);
        }

        return $cartaoCredito;
    }

    public function update(Request $request, $id)
    {
        $cartaoCredito = \App\CartaoCredito::find($id);
        if ($cartaoCredito) {
            if ($cartaoCredito['tb_usuario_id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse CartaoCredito'], 400);
            }
            $cartaoCredito = Helpers::removerVazio($cartaoCredito, $request->all());

            if (!$cartaoCredito->update()) {
                return response(['response' => 'CartaoCredito não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'value' => $cartaoCredito]);
        }

        return response(['response' => 'CartaoCredito não encontrado']);
    }

    public function destroy($id)
    {
        $cartaoCredito = \App\CartaoCredito::find($id);
        if (!$cartaoCredito) {
            return response(['response' => 'CartaoCredito Não encontrado'], 400);
        }
        if ($cartaoCredito['tb_usuario_id_usuario'] != auth()->user()->id_usuario) {
            return response(['error' => 'Não tem permissão para deletar esse CartaoCredito'], 400);
        }
        $cartaoCredito->bo_ativo = false;
        if (!$cartaoCredito->save()) {
            return response(['response' => 'Erro ao deletar conta'], 400);
        }

        return response(['response' => 'Deletado com sucesso']);
    }
}
