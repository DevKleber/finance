<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;
use JWTAuth;

class CartaoCreditoController extends Controller
{
    private $token;

    public function __construct()
    {
        $this->token = JWTAuth::parseToken()->authenticate();
    }

    public function index()
    {
        $cartaoCredito = \App\CartaoCredito::where('tb_usuario_id_usuario', $this->token['id_usuario'])->where('bo_ativo', true)->get();
        if (!$cartaoCredito) {
            return response(['response' => 'Cartão não encontrada'], 400);
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

    public function getFaturas(Request $request)
    {
        $cartaoCredito = \App\CartaoCredito::where('id_cartao_credito', $request['id'])->where('tb_usuario_id_usuario', $this->token['id_usuario'])->first();
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
            $faturas[$key]['pessoas'] = \App\DespesaCompartilhada::where('id_despesa', $value->id_despesa)->join('pessoa', 'pessoa.id_pessoa', '=', 'conta_compartilhada_valor.id_pessoa')->where('bo_aprovado', true)->get();
            $resumo['totalAPagarCartao'] += $value->vl_despesa;
            if ($faturas[$key]['pessoas']->count() > 0) {
                foreach ($faturas[$key]['pessoas'] as $keyAmigo => $valueAmigo) {
                    $valorDoAmigo = $value->vl_despesa * $valueAmigo->vl_conta_compartilhada_porcentagem / 100;
                    $dividaAmigos[$valueAmigo->id_pessoa]['nome'] = $valueAmigo->no_pessoa;
                    $dividaAmigos[$valueAmigo->id_pessoa]['valor'] = isset($dividaAmigos[$valueAmigo->id_pessoa]['valor']) ? $dividaAmigos[$valueAmigo->id_pessoa]['valor'] + $valorDoAmigo : $valorDoAmigo;
                }
            } else {
                $dividaAmigos[$usuarioLogado->id_pessoa]['valor'] =
                    isset($dividaAmigos[$usuarioLogado->id_pessoa]['valor']) ?
                        $dividaAmigos[$usuarioLogado->id_pessoa]['valor'] + $value->vl_despesa :
                        $value->vl_despesa;
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
            ->join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->Join('cartao_credito', 'cartao_credito.id_cartao_credito', '=', 'despesa_cartao.id_cartao_credito')
            ->where('despesa_cartao.id_cartao_credito', $id_cartao_credito)
            ->where('cartao_credito.tb_usuario_id_usuario', $usuarioLogado->id_usuario)
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'])
            ->get()
        ;
    }

    public function show($id)
    {
        $cartaoCredito = \App\CartaoCredito::find($id)->where('tb_usuario_id_usuario', $this->token['id_usuario'])->get();
        if (!$cartaoCredito) {
            return response(['response' => 'Cartão de Crédito não encontrada'], 400);
        }

        return $cartaoCredito;
    }

    public function update(Request $request, $id)
    {
        $cartaoCredito = \App\CartaoCredito::find($id);
        if ($cartaoCredito) {
            if ($cartaoCredito['tb_usuario_id_usuario'] != $this->token['id_usuario']) {
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
        if ($cartaoCredito['tb_usuario_id_usuario'] != $this->token['id_usuario']) {
            return response(['error' => 'Não tem permissão para deletar esse CartaoCredito'], 400);
        }
        $cartaoCredito->bo_ativo = false;
        if (!$cartaoCredito->save()) {
            return response(['response' => 'Erro ao deletar conta'], 400);
        }

        return response(['response' => 'Deletado com sucesso']);
    }
}
