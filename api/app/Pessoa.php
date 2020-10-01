<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pessoa extends Model
{
    protected $table = "pessoa";
    protected $primaryKey   = 'id_pessoa';
    protected $fillable = ['no_pessoa','sexo','dt_nascimento','no_email','nu_cpfcnpj','bo_ativo','img_perfil'];    

    public function getUsuarioPessoa(){
        return  \DB::table('usuario')->select('id_usuario', 'login','pessoa.*')
        ->join('pessoa', 'usuario.id_pessoa', '=', 'pessoa.id_pessoa')
        ->where('usuario.id_usuario', \JWTAuth::parseToken()->authenticate()['id_usuario'])
        ->get()
        ->first();
    }
    public function getUsuarioPessoaByIdpessoa($id_pessoa){
        return  \DB::table('usuario')->select('id_usuario', 'login','pessoa.*')
        ->join('pessoa', 'usuario.id_pessoa', '=', 'pessoa.id_pessoa')
        ->where('usuario.id_pessoa', $id_pessoa)
        ->get()
        ->first();
    }
}
