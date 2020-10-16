<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class DespesaContaController extends Controller
{

    public function index()
    {
        $despesaConta = \DB::table('despesa_conta')->select('despesa_conta.*', 'despesa.*')
            ->join('despesa', 'despesa.id_despesa', '=', 'despesa_conta.id_despesa')
            ->where('despesa.id_usuario', auth()->user()->id_usuario)
            ->get()
        ;

        if (!$despesaConta) {
            return response(['response' => 'DespesaConta não encontrada'], 400);
        }

        return $despesaConta;
    }

    public function store(Request $request, $bo_amigos = false)
    {
        $despesa = new \App\Despesa();
        \DB::beginTransaction();
        $ar = $despesa->insert($request, $bo_amigos);
        if ($ar) {
            $request['id_despesa'] = $ar->id_despesa;
            $despesaConta = \App\DespesaConta::create($request->all());
            if (!$despesaConta) {
                return response(['resposne' => 'Erro ao salvar despesa', 400]);
            }
            if ($request['bo_dividir_amigos']) {
                $foiSalva = \App\DespesaCompartilhada::salvar($request->all());
                if (!$foiSalva) {
                    // \DB::rollback();
                    return response(['resposne' => 'Erro ao salvar despesa', 400]);
                }
            }
            \DB::commit();

            return $ar;
        }

        return response(['resposne' => 'Erro ao salvar despesa', 400]);
    }

    public function show($id)
    {
        $despesaConta = \App\DespesaConta::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if (!$despesaConta) {
            return response(['response' => 'DespesaConta de Crédito não encontrada'], 400);
        }

        return $despesaConta;
    }
}
