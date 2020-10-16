<?php

namespace App;

use App\Mail\Despesa;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Mail;
use JWTAuth;

class Email extends Model
{
    public static function despesaCompartilhada($request)
    {
        $usuario = \App\Usuario::Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')->where('id_usuario', $request['id_usuario'])->first();
        $token = JWTAuth::parseToken()->authenticate();

        foreach ($request['dividirPessoas'] as $key => $value) {
            $pessoa = \App\Pessoa::where('id_pessoa', $value['id_pessoa'])->first();
            if ($value['id_pessoa'] == $token->id_pessoa) {
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
