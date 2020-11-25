<?php

namespace App;

use App\Mail\CartaoVencendo;
use App\Mail\Despesa;
use App\Mail\SolicitacaoAmizade;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;

class Email extends Model
{
    public static function solicitarAmizade($request, $req)
    {
        Mail::to($request->no_email)->queue(new SolicitacaoAmizade($req->no_pessoa));

        return $request;
    }

    public static function cartaoVencendo($req)
    {
        Mail::to($req['no_email'])->queue(new CartaoVencendo($req));

        return $req;
    }

    public static function despesaCompartilhada($request)
    {
        $usuario = \App\Usuario::Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')->where('id_usuario', $request['id_usuario'])->first();

        foreach ($request['dividirPessoas'] as $key => $value) {
            $pessoa = \App\Pessoa::where('id_pessoa', $value['id_pessoa'])->first();
            if ($value['id_pessoa'] == auth()->user()->id_pessoa) {
                continue;
            }
            if (!empty($pessoa->no_email)) {
                Mail::to($pessoa->no_email)->queue(
                    new Despesa(
                        $request['ds_despesa'],
                        $usuario->no_pessoa,
                        $request['vl_despesac'],
                        $request['nu_parcela'],
                        $pessoa->no_pessoa,
                        $value['valor']
                    )
                );
            }
        }
    }
}
