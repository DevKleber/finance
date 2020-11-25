<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;

class PagamentoController extends Controller
{
    public function index()
    {
        // auth()->user()->id_usuario;
        $pagamento = \App\Pagamento::all();
        if (!$pagamento) {
            return response(['response' => 'Não existe Pagamento'], 400);
        }

        return response(['dados' => $pagamento]);
    }

    public function store(Request $request)
    {
        $pagamento = \App\Pagamento::create($request->all());
        if (!$pagamento) {
            return  response(['response' => 'Erro ao salvar Pagamento'], 400);
        }

        return response(['response' => 'Salvo com sucesso', 'dados' => $pagamento]);
    }

    public function pagarDespesaItem(Request $request, $id)
    {
        $req['bo_paga'] = true;
        $req['id_despesa_item'] = $id;
        $req['id_pessoa'] = auth()->user()->id_pessoa;

        $recibo['caminho'] = '';

        if ($request->file('recibo')) {
            try {
                $recibo = \App\Arquivo::saveFileQuality($request->file('recibo'), 'recibo', 10);
            } catch (\Throwable $th) {
                return response(['response' => $th->getMessage(), 400]);
            }
        }

        $req['comprovante'] = $recibo['caminho'];
        $pagamento = \App\Pagamento::create($req);
        if (!$pagamento) {
            return  response(['response' => 'Erro ao salvar Pagamento'], 400);
        }

        return response($recibo);
    }

    public function show($id)
    {
        $pagamento = \App\Pagamento::find($id);
        if (!$pagamento) {
            return response(['response' => 'Não existe Pagamento'], 400);
        }

        return response($pagamento);
    }

    public function update(Request $request, $id)
    {
        $pagamento = \App\Pagamento::find($id);

        if (!$pagamento) {
            return response(['response' => 'Pagamento Não encontrado'], 400);
        }
        $pagamento = Helpers::processarColunasUpdate($pagamento, $request->all());

        if (!$pagamento->update()) {
            return response(['response' => 'Erro ao alterar'], 400);
        }

        return response(['response' => 'Atualizado com sucesso']);
    }

    public function destroy($id)
    {
        $pagamento = \App\Pagamento::find($id);

        if (!$pagamento) {
            return response(['response' => 'Pagamento Não encontrado'], 400);
        }
        $pagamento->bo_ativo = false;
        if (!$pagamento->save()) {
            return response(['response' => 'Erro ao deletar Pagamento'], 400);
        }

        return response(['response' => 'Pagamento Inativado com sucesso']);
    }
}
