<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
    protected $table = 'pessoa';
    protected $primaryKey = 'id_pessoa';
    protected $fillable = ['no_pessoa', 'sexo', 'dt_nascimento', 'no_email', 'nu_cpfcnpj', 'bo_ativo', 'img_perfil', 'id_usuario_meuamigoforasistema'];

    public function getUsuarioPessoa()
    {
        return  \DB::table('usuario')->select('id_usuario', 'login', 'pessoa.*')
            ->join('pessoa', 'usuario.id_pessoa', '=', 'pessoa.id_pessoa')
            ->where('usuario.id_usuario', auth()->user()->id_usuario)
            ->get()
            ->first()
        ;
    }

    public function getUsuarioPessoaByIdpessoa($id_pessoa)
    {
        return  \DB::table('usuario')->select('id_usuario', 'login', 'pessoa.*')
            ->join('pessoa', 'usuario.id_pessoa', '=', 'pessoa.id_pessoa')
            ->where('usuario.id_pessoa', $id_pessoa)
            ->get()
            ->first()
        ;
    }
}
