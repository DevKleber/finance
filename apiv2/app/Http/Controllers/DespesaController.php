<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;


class DespesaController extends Controller
{
    public function index()
    {
        $despesa = \App\Despesa::where('id_usuario', auth()->user()->id_usuario)->get();
        if (!$despesa) {
            return response(['response' => 'Despesa não encontrada'], 400);
        }

        return $despesa;
    }

    public function uploadFileDespesa(Request $request, $id)
    {
        $nameBancoLowerCase = strtolower($id);
        if (str_contains($nameBancoLowerCase, 'nubank')) {
            return $this->uploadNubank($request);
        }else if (str_contains($nameBancoLowerCase, 'inter')) {
            return $this->uploadBancoInter($request);
        }else if (str_contains($nameBancoLowerCase, 'itau') or str_contains($nameBancoLowerCase, 'itaú')) {
            return $this->uploadItau($request);
        }


    }

    public function uploadItau($request) {
        if ($file = $request->file('recibo')) {
            try {
                $arExtrato = Helpers::readCSVExtrato($file, ['delimiter' => ';']);
                $ar = [];
                $i = 0;
                foreach ($arExtrato as $key => $value) {
                    if(count($value) < 5) {
                        unset($arExtrato[$key]);
                        continue;
                    }
                    if($value[0] == '' or $value[3] == '') {
                        unset($arExtrato[$key]);
                        continue;
                    }
                    if(count(explode('/', $value[0])) < 3) {
                        unset($arExtrato[$key]);
                        continue;
                    }

                    $ar[$i][0] = Helpers::convertdateBr2DB($value[0]);
                    $ar[$i][1] = $value[2];
                    $ar[$i][2] = Helpers::removerMaisDeDoisEspacos(mb_convert_encoding($value[1], 'UTF-8', 'UTF-8'));
                    $ar[$i][3] = Helpers::removerCaracteresMoeda($value[3]);
                    $ar[$i][4] = "";

                    $referenciaExtrato = $ar[$i][2] . $ar[$i][1] . $ar[$i][0] . $ar[$i][3];
                    $idUsuario = auth()->user()->id_usuario;
                    $despesa = \App\Despesa::whereNotNull('referencia_extrato')
                        ->where('referencia_extrato', $referenciaExtrato)
                        ->where('id_usuario', $idUsuario)
                        ->first()
                    ;
                    if($despesa) {
                        $ar[$i][4] = 'Existe';
                    }
                    $i++;
                }
                return $ar;
            } catch (\Throwable $th) {
                return response(['response' => $th->getMessage(), 400]);
            }
        }
    }
    public function uploadNubank($request) {
        if ($file = $request->file('recibo')) {
            try {
                $arExtrato = Helpers::readCSVExtrato($file, ['delimiter' => ',']);
                foreach ($arExtrato as $key => $item) {
                    $referenciaExtrato = $item[2] . $item[1] . $item[0] . $item[3];
                    $idUsuario = auth()->user()->id_usuario;
                    $despesa = \App\Despesa::whereNotNull('referencia_extrato')
                        ->where('referencia_extrato', $referenciaExtrato)
                        ->where('id_usuario', $idUsuario)
                        ->first()
                    ;
                    if($despesa) {
                        $lastIndice = count($item) - 1;
                        $arExtrato[$key][$lastIndice] = 'Existe';
                    }
                }
                // unset($arExtrato[0]);
                return $arExtrato;
            } catch (\Throwable $th) {
                return response(['response' => $th->getMessage(), 400]);
            }
        }
    }
    public function uploadBancoInter($request) {
        if ($file = $request->file('recibo')) {
            try {
                $arExtrato = Helpers::readCSVExtrato($file, ['delimiter' => ';']);
                $ar = [];
                $i = 0;
                foreach ($arExtrato as $key => $item) {
                    if(count($item) < 5){
                        unset($arExtrato[$key]);
                        continue;
                    }

                    $arTipoCompra = explode('Parcela ', $item[2]);
                    $descricao = $item[1];
                    if(count($arTipoCompra) > 1){
                        $descricao = "{$descricao} {$arTipoCompra[1]}";
                    }
                    $ar[$i][0] = Helpers::convertdateBr2DB($item[0]);
                    $ar[$i][1] = mb_convert_encoding($item[2], 'UTF-8', 'UTF-8');
                    $ar[$i][2] = Helpers::removerMaisDeDoisEspacos($descricao);
                    $ar[$i][3] = Helpers::justCurrency($item[3]);
                    $ar[$i][4] = '';


                    $referenciaExtrato = $ar[$i][2] . $ar[$i][1] . $ar[$i][0] . $ar[$i][3];
                    $idUsuario = auth()->user()->id_usuario;
                    $despesa = \App\Despesa::whereNotNull('referencia_extrato')
                        ->where('referencia_extrato', $referenciaExtrato)
                        ->where('id_usuario', $idUsuario)
                        ->first()
                    ;



                    if($despesa) {
                        $ar[$i][4] = 'Existe';
                    }
                    $i++;
                }
                // unset($arExtrato[0]);
                return $ar;
            } catch (\Throwable $th) {
                return response(['response' => $th->getMessage(), 400]);
            }
        }
    }

    public function store(Request $request, $bo_amigos = false)
    {
    }

    public function getAjuda()
    {
        return \App\Despesa::where('id_usuario', auth()->user()->id_usuario)
            ->groupByRaw('ds_despesa,id_categoria_despesa')
            ->select('ds_despesa', 'id_categoria_despesa')
            ->get()
        ;
    }

    public function show($id)
    {
        $despesa = \App\Despesa::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if (!$despesa) {
            return response(['response' => 'Despesa de Crédito não encontrada'], 400);
        }

        return $despesa;
    }

    public function update(Request $request, $id)
    {
        //para alterar o valor da despesa compartilhada vou ter que alterar apenas o valor na coluna vl_conta_compartilhada_porcentagem da tabela tb_conta_compartilhada_valor
        return \App\Despesa::find($id);
        $despesa = null;
        if ($despesa) {
            if ($despesa['id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse Despesa'], 400);
            }
            $despesa = Helpers::processar($despesa, $request->all());
            if (!$despesa->update()) {
                return response(['response' => 'Despesa não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'value' => $despesa]);
        }

        return response(['response' => 'Despesa não encontrado']);
    }

    public function updateItem(Request $request, $id)
    {
        $despesa = $this->updateDespesa($request, $id);
        if ($despesa['naoexiste']) {
            return response(['resposne' => 'Despesa não encontrado']);
        }

        if ($despesa) {
            $despesaItem = new \App\DespesaItem();
            $itens = $despesaItem->updateItem($request, $id);

            if ($itens) {
                return response([$despesa]);
            }

            return response(['response' => 'error'], 400);
        }
    }

    public function updateDespesa(Request $request, $id)
    {
        $despesaItem = \App\DespesaItem::find($id);
        if (!$despesaItem) {
            return ['naoexiste' => true];
        }
        $despesa = \App\Despesa::find($despesaItem->id_despesa);
        $despesa = Helpers::processar($despesa, $request->all());

        unset($despesa['dt_vencimento'], $despesa['qtd_parcelas'], $despesa['bo_alterartodasFuturas'], $despesa['bo_compartilhada']);

        if (!$despesa->save()) {
            return false;
        }

        return $despesa;
    }

    public function pagarDespesa(Request $request, $id)
    {
        $despesaItem = new \App\DespesaItem();
        if (!empty($request['id_despesa_item'])) {
            return response(['response' => 'Vamos alterar pelo formulario id_despesa_item podendo passar mais de um item']);
        }
        $update = $despesaItem->pagarDespesa($request, $id);
        if ($update) {
            return response([$update]);
        }

        return response(['reponse' => 'erro'], 400);
    }

    public function destroy($id)
    {
        $despesa = \App\Despesa::find($id);
        if (!$despesa) {
            return response(['response' => 'Despesa Não encontrado'], 400);
        }
        if ($despesa['id_usuario'] != auth()->user()->id_usuario) {
            return response(['error' => 'Não tem permissão para deletar esse Despesa'], 400);
        }
        $despesa->dt_cancelado = date('Y-m-d');
        if (!$despesa->save()) {
            return response(['response' => 'Erro ao deletar conta'], 400);
        }

        return response(['response' => 'Deletado com sucesso']);
    }

    public function changeBoRepetir(Request $request, $id)
    {
        $despesa = \App\Despesa::find($id);
        if ($despesa) {
            if ($despesa['id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse Despesa'], 400);
            }
            $despesa->bo_repetir = ('true' === $request->bo_repetir) ? true : false;

            $despesa->dt_fim_intervalo = Helpers::convertdateBr2DB($request['dt_fim_intervalo']);
            if (!$despesa->update()) {
                return response(['response' => 'Despesa não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'value' => $despesa]);
        }

        return response(['response' => 'Despesa não encontrado']);
    }
}
