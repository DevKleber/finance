<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;

class DespesaCartaoController extends Controller
{
    private $token;

    public function __construct()
    {
        $this->token = JWTAuth::parseToken()->authenticate();
    }

    public function index()
    {
        $despesaCartao = \DB::table('despesa_cartao')->select('despesa_cartao.*', 'despesa.*')
            ->join('despesa', 'despesa.id_despesa', '=', 'despesa_cartao.id_despesa')
            ->where('despesa.id_usuario', \JWTAuth::parseToken()->authenticate()['id_usuario'])
            ->get()
        ;

        if (!$despesaCartao) {
            return response(['response' => 'DespesaCartao não encontrada'], 400);
        }

        return $despesaCartao;
    }

    public function store(Request $request, $bo_amigos = false)
    {
        $despesa = new \App\Despesa();
        \DB::beginTransaction();
        $ar = $despesa->insert($request, $bo_amigos);
        if ($ar) {
            $request['id_despesa'] = $ar->id_despesa;
            $despesaCartao = \App\DespesaCartao::create($request->all());
            if (!$despesaCartao) {
                return response(['resposne' => 'Erro ao salvar despesa', 400]);
            }
            \DB::roolback();
            // \DB::commit();
            return $ar;
        }

        return response(['resposne' => 'Erro ao salvar despesa', 400]);
    }

    public function show($id)
    {
        $despesaCartao = \App\DespesaCartao::find($id)->where('id_usuario', $this->token['id_usuario']);
        if (!$despesaCartao) {
            return response(['response' => 'DespesaCartao de Crédito não encontrada'], 400);
        }

        return $despesaCartao;
    }
}
