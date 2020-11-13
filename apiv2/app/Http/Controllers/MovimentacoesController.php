<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MovimentacoesController extends Controller
{
    public function index(Request $request)
    {
        $pessoa = new \App\Pessoa();
        $usuarioLogado = $pessoa->getUsuarioPessoa();

        $minhasDespesasComCartao = $this->minhasDespesasComCartao($usuarioLogado, $request);
        $despesasCompartilhadasComAmigosMeuCartao = $this->despesasCompartilhadasComAmigosMeuCartao($usuarioLogado, $request);
        $despesasCompartilhadasComAmigosCartaoDoAmigo = $this->despesasCompartilhadasComAmigosCartaoDoAmigo($usuarioLogado, $request);
        $minhasDespesasEmConta = $this->minhasDespesasEmConta($usuarioLogado, $request);
        $despesasCompartilhadasComAmigosNaMinhaConta = $this->despesasCompartilhadasComAmigosNaMinhaConta($usuarioLogado, $request);
        $despesasCompartilhadasComAmigosNaContaDoAmigo = $this->despesasCompartilhadasComAmigosNaContaDoAmigo($usuarioLogado, $request);

        $tudo = [];
        $amigosPagar = [];
        $resumo = [
            'minhasDespesasComCartao' => 0,
            'despesasCompartilhadasComAmigosMeuCartao' => 0,
            'despesasCompartilhadasComAmigosCartaoDoAmigo' => 0,
            'minhasDespesasEmConta' => 0,
            'despesasCompartilhadasComAmigosNaMinhaConta' => 0,
            'despesasCompartilhadasComAmigosNaContaDoAmigo' => 0,
        ];
        $i = 0;
        foreach ($minhasDespesasComCartao as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true)->count();
            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['id_categoria_despesa'] = $value->id_categoria_despesa;
            $tudo[$i]['responsavel'] = $value->no_pessoa ?? null;
            $tudo[$i]['titular'] = $value->no_cartao_credito;
            $tudo[$i]['id_despesa_item'] = $value->id_despesa_item;
            $tudo[$i]['dt_vencimento'] = $value->dt_vencimento;
            $tudo[$i]['vl_despesa'] = $value->vl_despesa;
            $tudo[$i]['nu_parcela_atual'] = $value->nu_parcela_atual;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['bo_paga'] = $value->bo_paga;
            $tudo[$i]['msg'] = '';
            $tudo[$i]['bo_amigo'] = false;
            $tudo[$i]['bo_cartao'] = true;
            $tudo[$i]['parcelas'] = $value->nu_parcela_atual.'/'.$value->nu_parcela;
            $tudo[$i]['vl_total_minha_parte'] = $tudo[$i]['vl_despesa'] * $value->nu_parcela;
            $tudo[$i]['pago'] = $pago > 0 ? true : false;
            $resumo['minhasDespesasComCartao'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosMeuCartao as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true)->count();
            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['id_categoria_despesa'] = $value->id_categoria_despesa;
            $tudo[$i]['responsavel'] = $value->no_pessoa ?? null;
            $tudo[$i]['titular'] = $value->no_cartao_credito;
            $tudo[$i]['id_despesa_item'] = $value->id_despesa_item;
            $tudo[$i]['dt_vencimento'] = $value->dt_vencimento;
            $tudo[$i]['vl_despesa'] = $value->vl_despesa * $value->vl_conta_compartilhada_porcentagem / 100;
            $tudo[$i]['nu_parcela_atual'] = $value->nu_parcela_atual;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['bo_paga'] = $value->bo_paga;
            $tudo[$i]['msg'] = '';
            $tudo[$i]['bo_amigo'] = true;
            $tudo[$i]['bo_cartao'] = true;
            $tudo[$i]['parcelas'] = $value->nu_parcela_atual.'/'.$value->nu_parcela;
            $tudo[$i]['vl_total_minha_parte'] = $tudo[$i]['vl_despesa'] * $value->nu_parcela;
            $tudo[$i]['pago'] = $pago > 0 ? true : false;
            $resumo['despesasCompartilhadasComAmigosMeuCartao'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosCartaoDoAmigo as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true)->count();
            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['id_categoria_despesa'] = $value->id_categoria_despesa;
            $tudo[$i]['responsavel'] = $value->no_pessoa ?? null;
            $tudo[$i]['titular'] = $value->no_cartao_credito;
            $tudo[$i]['id_despesa_item'] = $value->id_despesa_item;
            $tudo[$i]['dt_vencimento'] = $value->dt_vencimento;
            $tudo[$i]['vl_despesa'] = $value->vl_despesa * $value->vl_conta_compartilhada_porcentagem / 100;
            $tudo[$i]['nu_parcela_atual'] = $value->nu_parcela_atual;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['bo_paga'] = $value->bo_paga;
            $tudo[$i]['msg'] = 'Amigo';
            $tudo[$i]['bo_amigo'] = true;
            $tudo[$i]['bo_cartao'] = true;
            $tudo[$i]['parcelas'] = $value->nu_parcela_atual.'/'.$value->nu_parcela;
            $tudo[$i]['vl_total_minha_parte'] = $tudo[$i]['vl_despesa'] * $value->nu_parcela;
            $tudo[$i]['pago'] = $pago > 0 ? true : false;
            $resumo['despesasCompartilhadasComAmigosCartaoDoAmigo'] += $tudo[$i]['vl_despesa'];

            $amigosPagar[$tudo[$i]['responsavel']][$i]['responsavel'] = $tudo[$i]['responsavel'];
            $amigosPagar[$tudo[$i]['responsavel']][$i]['vl_despesa'] = $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($minhasDespesasEmConta as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true)->count();
            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['id_categoria_despesa'] = $value->id_categoria_despesa;
            $tudo[$i]['responsavel'] = $value->no_pessoa ?? null ?? null;
            $tudo[$i]['titular'] = $value->no_cartao_credito ?? null;
            $tudo[$i]['id_despesa_item'] = $value->id_despesa_item;
            $tudo[$i]['dt_vencimento'] = $value->dt_vencimento;
            $tudo[$i]['vl_despesa'] = $value->vl_despesa;
            $tudo[$i]['nu_parcela_atual'] = $value->nu_parcela_atual;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['bo_paga'] = $value->bo_paga;
            $tudo[$i]['msg'] = '';
            $tudo[$i]['bo_cartao'] = false;
            $tudo[$i]['parcelas'] = $value->nu_parcela_atual.'/'.$value->nu_parcela;
            $tudo[$i]['vl_total_minha_parte'] = $tudo[$i]['vl_despesa'] * $value->nu_parcela;
            $tudo[$i]['pago'] = $pago > 0 ? true : false;
            $resumo['minhasDespesasEmConta'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosNaMinhaConta as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true)->count();
            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['id_categoria_despesa'] = $value->id_categoria_despesa;
            $tudo[$i]['responsavel'] = $value->no_pessoa ?? null ?? null;
            $tudo[$i]['titular'] = $value->no_cartao_credito ?? null;
            $tudo[$i]['id_despesa_item'] = $value->id_despesa_item;
            $tudo[$i]['dt_vencimento'] = $value->dt_vencimento;
            $tudo[$i]['vl_despesa'] = $value->vl_despesa * $value->vl_conta_compartilhada_porcentagem / 100;
            $tudo[$i]['nu_parcela_atual'] = $value->nu_parcela_atual;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['bo_paga'] = $value->bo_paga;
            $tudo[$i]['msg'] = 'Amigo';
            $tudo[$i]['bo_amigo'] = true;
            $tudo[$i]['bo_cartao'] = false;
            $tudo[$i]['parcelas'] = $value->nu_parcela_atual.'/'.$value->nu_parcela;
            $tudo[$i]['vl_total_minha_parte'] = $tudo[$i]['vl_despesa'] * $value->nu_parcela;
            $tudo[$i]['pago'] = $pago > 0 ? true : false;
            $resumo['despesasCompartilhadasComAmigosNaMinhaConta'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosNaContaDoAmigo as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true)->count();
            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['id_categoria_despesa'] = $value->id_categoria_despesa;
            $tudo[$i]['responsavel'] = $value->no_pessoa ?? null ?? null;
            $tudo[$i]['titular'] = $value->no_cartao_credito ?? null;
            $tudo[$i]['id_despesa_item'] = $value->id_despesa_item;
            $tudo[$i]['dt_vencimento'] = $value->dt_vencimento;
            $tudo[$i]['vl_despesa'] = $value->vl_despesa * $value->vl_conta_compartilhada_porcentagem / 100;
            $tudo[$i]['nu_parcela_atual'] = $value->nu_parcela_atual;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['nu_parcela'] = $value->nu_parcela;
            $tudo[$i]['bo_paga'] = $value->bo_paga;
            $tudo[$i]['msg'] = 'Amigo';
            $tudo[$i]['bo_amigo'] = true;
            $tudo[$i]['bo_cartao'] = false;
            $tudo[$i]['parcelas'] = $value->nu_parcela_atual.'/'.$value->nu_parcela;
            $tudo[$i]['vl_total_minha_parte'] = $tudo[$i]['vl_despesa'] * $value->nu_parcela;
            $tudo[$i]['pago'] = $pago > 0 ? true : false;
            $resumo['despesasCompartilhadasComAmigosNaContaDoAmigo'] += $tudo[$i]['vl_despesa'];

            $amigosPagar[$tudo[$i]['responsavel']][$i]['responsavel'] = $tudo[$i]['responsavel'];
            $amigosPagar[$tudo[$i]['responsavel']][$i]['vl_despesa'] = $tudo[$i]['vl_despesa'];

            ++$i;
        }
        $amigosPagarArray = [];
        foreach ($amigosPagar as $key => $value) {
            $amigosPagarArray[$key] = 0;
            foreach ($value as  $item) {
                $amigosPagarArray[$key] += $item['vl_despesa'];
            }
        }

        return [
            'minhasDespesasComCartao' => $minhasDespesasComCartao,
            'despesasCompartilhadasComAmigosMeuCartao' => $despesasCompartilhadasComAmigosMeuCartao,
            'despesasCompartilhadasComAmigosCartaoDoAmigo' => $despesasCompartilhadasComAmigosCartaoDoAmigo,
            'minhasDespesasEmConta' => $minhasDespesasEmConta,
            'despesasCompartilhadasComAmigosNaMinhaConta' => $despesasCompartilhadasComAmigosNaMinhaConta,
            'despesasCompartilhadasComAmigosNaContaDoAmigo' => $despesasCompartilhadasComAmigosNaContaDoAmigo,
            'tudo' => $tudo,
            'resumo' => $resumo,
            'amigosPagar' => $amigosPagarArray,
        ];
    }

    public function minhasDespesasComCartao($usuarioLogado, $data)
    {
        return \App\DespesaCartao::Join('despesa', 'despesa.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->join('usuario', 'usuario.id_usuario', '=', 'despesa.id_usuario')
            ->join('categoria_despesa', 'categoria_despesa.id_categoria_despesa', '=', 'despesa.id_categoria_despesa')
            ->Join('cartao_credito', 'cartao_credito.id_cartao_credito', '=', 'despesa_cartao.id_cartao_credito')
            ->Join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'].' and bo_dividir_amigos = false and tb_despesa.id_usuario = '.$usuarioLogado->id_usuario)
            ->get()
        ;
    }

    public function despesasCompartilhadasComAmigosMeuCartao($usuarioLogado, $data)
    {
        return \App\DespesaCartao::Join('despesa', 'despesa.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->join('categoria_despesa', 'categoria_despesa.id_categoria_despesa', '=', 'despesa.id_categoria_despesa')
            ->Join('cartao_credito', 'cartao_credito.id_cartao_credito', '=', 'despesa_cartao.id_cartao_credito')
            ->Join('conta_compartilhada_valor', 'conta_compartilhada_valor.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->Join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_cartao.id_despesa')

            ->Join('usuario', 'usuario.id_usuario', '=', 'despesa.id_usuario')
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'].' and bo_dividir_amigos = true and tb_conta_compartilhada_valor.bo_aprovado = true and tb_conta_compartilhada_valor.id_pessoa = '.$usuarioLogado->id_pessoa.' and tb_cartao_credito.tb_usuario_id_usuario = '.$usuarioLogado->id_usuario)
            ->get()
        ;
    }

    public function despesasCompartilhadasComAmigosCartaoDoAmigo($usuarioLogado, $data)
    {
        return \App\DespesaCartao::Join('despesa', 'despesa.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->join('categoria_despesa', 'categoria_despesa.id_categoria_despesa', '=', 'despesa.id_categoria_despesa')
            ->Join('cartao_credito', 'cartao_credito.id_cartao_credito', '=', 'despesa_cartao.id_cartao_credito')
            ->Join('conta_compartilhada_valor', 'conta_compartilhada_valor.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->Join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->Join('usuario', 'usuario.id_usuario', '=', 'despesa.id_usuario')
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'].' and bo_dividir_amigos = true and tb_conta_compartilhada_valor.bo_aprovado = true and tb_conta_compartilhada_valor.id_pessoa = '.$usuarioLogado->id_pessoa.' and tb_cartao_credito.tb_usuario_id_usuario <> '.$usuarioLogado->id_usuario)
            ->get()
        ;
    }

    public function minhasDespesasEmConta($usuarioLogado, $data)
    {
        return \App\DespesaConta::Join('despesa', 'despesa.id_despesa', '=', 'despesa_conta.id_despesa')
            ->join('usuario', 'usuario.id_usuario', '=', 'despesa.id_usuario')
            ->join('categoria_despesa', 'categoria_despesa.id_categoria_despesa', '=', 'despesa.id_categoria_despesa')
            ->Join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_conta.id_despesa')
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'].' and bo_dividir_amigos = false and tb_despesa.id_usuario = '.$usuarioLogado->id_usuario)
            ->get()
        ;
    }

    public function despesasCompartilhadasComAmigosNaMinhaConta($usuarioLogado, $data)
    {
        // where  and id_pessoa = 45 and td.id_usuario =12;
        return \App\DespesaConta::Join('despesa', 'despesa.id_despesa', '=', 'despesa_conta.id_despesa')
            ->join('categoria_despesa', 'categoria_despesa.id_categoria_despesa', '=', 'despesa.id_categoria_despesa')
            ->Join('conta_compartilhada_valor', 'conta_compartilhada_valor.id_despesa', '=', 'despesa_conta.id_despesa')
            ->Join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_conta.id_despesa')
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'].' and bo_dividir_amigos = true and tb_conta_compartilhada_valor.bo_aprovado = true and id_pessoa = '.$usuarioLogado->id_pessoa.' and tb_despesa.id_usuario = '.$usuarioLogado->id_usuario)
            ->get()
        ;
    }

    public function despesasCompartilhadasComAmigosNaContaDoAmigo($usuarioLogado, $data)
    {
        return \App\DespesaConta::Join('despesa', 'despesa.id_despesa', '=', 'despesa_conta.id_despesa')
            ->join('categoria_despesa', 'categoria_despesa.id_categoria_despesa', '=', 'despesa.id_categoria_despesa')
            ->Join('conta_compartilhada_valor', 'conta_compartilhada_valor.id_despesa', '=', 'despesa_conta.id_despesa')
            ->Join('despesa_item', 'despesa_item.id_despesa', '=', 'despesa_conta.id_despesa')
            ->Join('usuario', 'usuario.id_usuario', '=', 'despesa.id_usuario')
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->whereRaw('YEAR(dt_vencimento)='.$data['ano'].' AND MONTH(dt_vencimento) = '.$data['mes'].' and bo_dividir_amigos = true and tb_conta_compartilhada_valor.bo_aprovado = true and tb_conta_compartilhada_valor.id_pessoa = '.$usuarioLogado->id_pessoa.' and tb_despesa.id_usuario <> '.$usuarioLogado->id_usuario)
            ->get()
        ;
    }
}
