<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Helpers;

class AmigoController extends Controller
{
    private $token;

    public function __construct() 
    {
        $this->token = JWTAuth::parseToken()->authenticate();
    }

    public function index()
    {
        $amigo = \App\Amigo::where('id_usuario', $this->token['id_usuario'])->get();
        if(!$amigo){
            return response(["response"=>"Amigo não encontrada"],400);
        }
        return $amigo;
    }

    public function store(Request $request)
    {
        /*
        * a = amigo
        * c = cancelado
        * p = pendente
        */
        $fomosAmigos = false;
        $pessoa = new \App\Pessoa();
        
        $request['id_usuario'] = $this->token['id_usuario']; // requisitante
        $request['situacao'] = 'p';
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();

        $amigoSolicitadoByMe =  \App\Amigo::where([
                ['id_usuario', '=', $usuarioPessoaLogado->id_usuario],
                ['id_pessoa', '=', $request['id_pessoa']]
            ])
            ->first();

        $amigo = null;
        if(count($amigoSolicitadoByMe)>0){
            //verificando se eu já mandei solicitação de amizade para essa pessoa
            $fomosAmigos = true;
            $amigo = $amigoSolicitadoByMe;
        }else{
            $pessoaSolicitada = $pessoa->getUsuarioPessoaByIdpessoa($request['id_pessoa']);
            //verificando se a pessoa já mandou solicitação de amizade para mim
            $solicitacoesPeloAmigo =  \App\Amigo::where([ ['id_usuario', '=', $pessoaSolicitada->id_usuario], ['id_pessoa', '=', $usuarioPessoaLogado->id_pessoa] ])->first();
            
            if(count($solicitacoesPeloAmigo) > 0){
                $fomosAmigos = true;
                $amigo = $solicitacoesPeloAmigo;
            }
        }
        if($fomosAmigos){
            $amigo->situacao = 'p';
            if(!$amigo->save()){
                return response(["response"=>"Erro ao fazer amizade"],400);
            }
            return response(['response'=>'Amizade feita com sucesso']);


        }        
        return \App\Amigo::create($request->all());
    }

    public function show($id)
    {
        $amigo =  \App\Amigo::find($id)->where('id_usuario','=', $this->token['id_usuario']);
        if(!$amigo){
            return response(["response"=>"Amigo não encontrada"],400);
        }
        return $amigo;
    }

    
    public function update(Request $request, $id)
    {
        return response(['response'=>"Modulo não alterável"]);
    }

    public function destroy($id)
    {
        $pessoa = new \App\Pessoa();
        $amigo =  \App\Amigo::find($id);
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();
        if(!$amigo){
            return response(['response'=>'Amigo Não encontrado'],400);
        }
        if(($usuarioPessoaLogado->id_usuario == $amigo->id_usuario) || ($usuarioPessoaLogado->id_pessoa == $amigo->id_pessoa)){
            $amigo->situacao = 'c';
            if(!$amigo->save()){
                return response(["response"=>"Erro ao deletar conta"],400);
            }
            return response(['response'=>'Deletado com sucesso']);
        }else{
            return response(['error'=>"Não tem permissão para deletar esse Amigo"],400);
        }

    }
    public function getSolicitacoesAmizadePendente(){
        $pessoa = new \App\Pessoa();
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();

        return \App\Amigo::where([
                ['id_pessoa', '=', $usuarioPessoaLogado->id_pessoa],
                ['situacao', '=', 'p']
            ])->get();
    }
    public function aceitarSolicitacoesAmizadePendente($id){
        $pessoa = new \App\Pessoa();
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();

        $amigo =  \App\Amigo::find($id);
        if($usuarioPessoaLogado->id_pessoa!=$amigo->id_pessoa){
            return response(['error'=>"você não tem permissao para aceitar essa solicitacao de amaizade"]);
        }
        $amigo->situacao = 'a';
        if(!$amigo->save()){
            return response(["response"=>"Erro ao aceitar"],400);
        }
        return response(['response'=>'Amizade feita']);
    }
    
}
