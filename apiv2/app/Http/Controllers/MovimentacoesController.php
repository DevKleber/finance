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
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true);
            $pagoTotal = $pago->count();
            $pagamento = $pago->first();

            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['produto'] = $value->produto;
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
            $tudo[$i]['pago'] = $pagoTotal > 0 ? true : false;
            $tudo[$i]['pagamento'] = $pagamento ?? '';
            $resumo['minhasDespesasComCartao'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosMeuCartao as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true);
            $pagoTotal = $pago->count();
            $pagamento = $pago->first();
            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['produto'] = $value->produto;
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
            $tudo[$i]['pago'] = $pagoTotal > 0 ? true : false;
            $tudo[$i]['pagamento'] = $pagamento ?? '';
            $resumo['despesasCompartilhadasComAmigosMeuCartao'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosCartaoDoAmigo as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true);
            $pagoTotal = $pago->count();
            $pagamento = $pago->first();

            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['produto'] = $value->produto;
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
            $tudo[$i]['pago'] = $pagoTotal > 0 ? true : false;
            $tudo[$i]['pagamento'] = $pagamento ?? '';
            $resumo['despesasCompartilhadasComAmigosCartaoDoAmigo'] += $tudo[$i]['vl_despesa'];

            $amigosPagar[$tudo[$i]['responsavel']][$i]['responsavel'] = $tudo[$i]['responsavel'];
            $amigosPagar[$tudo[$i]['responsavel']][$i]['vl_despesa'] = $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($minhasDespesasEmConta as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true);
            $pagoTotal = $pago->count();
            $pagamento = $pago->first();

            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['produto'] = $value->produto;
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
            $tudo[$i]['pago'] = $pagoTotal > 0 ? true : false;
            $tudo[$i]['pagamento'] = $pagamento ?? '';
            $resumo['minhasDespesasEmConta'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosNaMinhaConta as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true);
            $pagoTotal = $pago->count();
            $pagamento = $pago->first();

            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['produto'] = $value->produto;
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
            $tudo[$i]['pago'] = $pagoTotal > 0 ? true : false;
            $tudo[$i]['pagamento'] = $pagamento ?? '';
            $resumo['despesasCompartilhadasComAmigosNaMinhaConta'] += $tudo[$i]['vl_despesa'];

            ++$i;
        }
        foreach ($despesasCompartilhadasComAmigosNaContaDoAmigo as $key => $value) {
            $pago = \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->where('id_pessoa', $usuarioLogado->id_pessoa)->where('bo_paga', true);
            $pagoTotal = $pago->count();
            $pagamento = $pago->first();

            $tudo[$i]['id_despesa'] = $value->id_despesa;
            $tudo[$i]['no_categoria_despesa'] = $value->no_categoria_despesa;
            $tudo[$i]['icon'] = $value->icon;
            $tudo[$i]['vl_despesac'] = $value->vl_despesac;
            $tudo[$i]['dt_despesa'] = $value->dt_despesa;
            $tudo[$i]['ds_despesa'] = $value->ds_despesa;
            $tudo[$i]['produto'] = $value->produto;
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
            $tudo[$i]['pago'] = $pagoTotal > 0 ? true : false;
            $tudo[$i]['pagamento'] = $pagamento ?? '';
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
    public function deletarDespesa($id){
        \DB::beginTransaction();
        $despesasItens = \App\DespesaItem::where('id_despesa', $id)->get();
        foreach ($despesasItens as $value) {
            \App\Pagamento::where('id_despesa_item', $value->id_despesa_item)->delete();
        }
        \App\DespesaCompartilhada::where('id_despesa', $id)->delete();
        \App\DespesaItem::where('id_despesa', $id)->delete();
        \App\DespesaConta::where('id_despesa', $id)->delete();
        \App\DespesaCartao::where('id_despesa', $id)->delete();
        \App\Despesa::find($id)->delete();
        \DB::commit();

        return response(['response' => 'Despesa deletada com sucesso!']);

    }
    public function alterarDespesa(Request $request)
    {
        $despesa['id_despesa'] = $request['despesa']['id_despesa'];
        $despesa['vl_despesac'] = $request['despesa']['vl_despesac'];
        $despesa['dt_despesa'] = $request['despesa']['dt_despesa'];
        $despesa['ds_despesa'] = $request['despesa']['ds_despesa'];

        \DB::beginTransaction();
        \App\Despesa::where('id_despesa', $despesa['id_despesa'])->update($despesa);

        foreach ($request['despesaItem'] as $despesaItem) {
            $vencimento = $despesaItem['vencimento'];

            if(strlen($vencimento) == 8){
                $dia = substr($vencimento, 0, 2);
                $mes = substr($vencimento, 2, 2);
                $ano = substr($vencimento, 4, 4);
                $despesaItem['dt_vencimento'] = date("Y-m-d", strtotime($ano.'-'.$mes.'-'.$dia));
            }

            $despesaItem['vl_despesa'] = $despesa['vl_despesac'] / $despesaItem['nu_parcela'];
            unset($despesaItem['vencimento']);
            unset($despesaItem['created_at']);
            unset($despesaItem['updated_at']);

            \App\DespesaItem::where('id_despesa_item', $despesaItem['id_despesa_item'])->update($despesaItem);

        }
        $arCompartilhadaSalvar = [];
        foreach ($request['despesaCompartilhada'] as $compartilhada) {
            $valorDespesaItem = $request['despesaItem'][0]['vl_despesa'];

            $arCompartilhadaSalvar['id_conta_compartilhada'] = $compartilhada['id_conta_compartilhada'];
            $arCompartilhadaSalvar['vl_conta_compartilhada_porcentagem'] = $compartilhada['valor_cada'] * 100 / $valorDespesaItem;

            \App\DespesaCompartilhada::where('id_conta_compartilhada', $compartilhada['id_conta_compartilhada'])->update($arCompartilhadaSalvar);
        }
        \DB::commit();
        $despesaItem = $request['despesa'];
        return $this->detalhar($despesa['id_despesa']);
    }

    public function detalhar($id)
    {
        $despesaConta = null;
        $despesa = \App\Despesa::find($id);

        if ($despesa->id_usuario != auth()->user()->id_usuario) {
            return response(['response' => "Sem permissão para alterar a despesa. Apenas quem lançou pode alterar"], 400);
        }

        $despesaCartao = \App\DespesaCartao::where('id_despesa', $id)
            ->join('cartao_credito', 'cartao_credito.id_cartao_credito', '=', 'despesa_cartao.id_cartao_credito')
            ->first()
        ;
        if (!$despesaCartao) {
            $despesaConta = \App\DespesaConta::where('id_despesa', $id)->first();
        }

        $despesaItem = \App\DespesaItem::where('id_despesa', $id)
            ->selectRaw("DATE_FORMAT(dt_vencimento , '%d/%m/%Y') AS vencimento, tb_despesa_item.*")
            ->get()->toArray();
        ;

        $despesaCompartilhada = \App\DespesaCompartilhada::where('id_despesa', $id)
            ->join('pessoa', 'pessoa.id_pessoa', '=', 'conta_compartilhada_valor.id_pessoa')
            ->get()
        ;
        $arDespesaCompartilhada = [];
        foreach ($despesaCompartilhada as $key => $value) {
            $vl_despesac = $despesaItem[0]['vl_despesa'];
            $arDespesaCompartilhada[$key]['valor_cada'] = (float) $value->vl_conta_compartilhada_porcentagem * $vl_despesac / 100;
            $arDespesaCompartilhada[$key]['id_conta_compartilhada'] = $value->id_conta_compartilhada;
            $arDespesaCompartilhada[$key]['vl_conta_compartilhada_porcentagem'] = $value->vl_conta_compartilhada_porcentagem;
            $arDespesaCompartilhada[$key]['id_despesa'] = $value->id_despesa;
            $arDespesaCompartilhada[$key]['id_pessoa'] = $value->id_pessoa;
            $arDespesaCompartilhada[$key]['no_pessoa'] = $value->no_pessoa;
            $arDespesaCompartilhada[$key]['sexo'] = $value->sexo;
            $arDespesaCompartilhada[$key]['no_email'] = $value->no_email;
            $arDespesaCompartilhada[$key]['bo_ativo'] = $value->bo_ativo;
            $arDespesaCompartilhada[$key]['img_perfil'] = $value->img_perfil;

            # code...
        }
        return [
            "despesa" => $despesa,
            "despesaItem" => $despesaItem,
            "despesaCartao" => $despesaCartao,
            "despesaConta" => $despesaConta,
            "despesaCompartilhada" => $arDespesaCompartilhada,
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
