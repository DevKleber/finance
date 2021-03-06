<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use JWTAuth;
use Helpers;

class PessoaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    private $token;

    public function __construct() 
    {
        // $this->token = JWTAuth::parseToken()->authenticate();
    }

    public function index()
    {
        return \App\Pessoa::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['bo_ativo'] = true;
        $request['dt_nascimento'] = date("2018-11-03");
        
        \DB::beginTransaction();
        $pessoa = \App\Pessoa::create($request->all());
        
        if(isset($pessoa)){
            $usuario = new \App\User();
            $existeLogin =  $usuario->where('login', $request['login'])->get();
            if(count($existeLogin)){
                return response(["response"=>"Login indisponivel"],400);
            }
            $userDados['login']     = $request['login'];
            $userDados['id_pessoa'] = $pessoa->id_pessoa;
            $userDados['password']  = bcrypt($request['password']);
            $ar = $usuario->create($userDados);
        }
        \DB::commit();
        return $ar;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = new \App\User();
        $usuario = $user->find($id);
        $pessoa =  \App\Pessoa::find($usuario->id_pessoa);
        if($pessoa){
            if($usuario->id_usuario != JWTAuth::parseToken()->authenticate()['id_usuario']){
                return response(['error'=>"Você tem permissão para alterar esse usuário"],400);
            }
            if(!$this->updatePessoa($request,$pessoa)){
                return response(["response"=>"Erro ao alterar pessoa"],400);
            }
            if(!$this->updateUser($request,$usuario)){
                return response(["response"=>"Erro ao alterar Usuário"],400);
            }

            return response(["response"=>"Atualizado!"],200);
        }
        return response(['response'=>"Usuário não encontrado"]);
    }
    

    public function destroy($id)
    {
        
    }
    private function updatePessoa($request,$pessoa){
        $pessoa->no_pessoa     = $request->no_pessoa;
        $pessoa->sexo          = $request->sexo;
        $pessoa->dt_nascimento = Helpers::convertdateBr2DB($request->dt_nascimento);
        $pessoa->no_email      = $request->no_email;
        $pessoa->nu_cpfcnpj    = $request->nu_cpfcnpj;
        $pessoa->bo_ativo      = true;
        $pessoa->img_perfil    = $request->img_perfil;
        \DB::beginTransaction();
        if(!$pessoa->save()){
            \DB::rollback();
            return false;
        }
        return true;
    }
    private function updateUser($request,$usuario){
        $usuario['login']     = $request['login'];
        $usuario['password']  = bcrypt($request['password']);

        if(!$usuario->save()){
            \DB::rollback();
            return false;
        }
        \DB::commit();
        return true;
    }
    
}