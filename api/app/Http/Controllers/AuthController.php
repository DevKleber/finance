<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\JWTAuth;

class AuthController extends Controller
{
    private $jwtAuth; //tipo jwtAuth

    public function __construct (JWTAuth $jwtAuth){
        $this->jwtAuth = $jwtAuth;
    }

    public function login(Request $request)
    {
        $credentials = $request->only('login', 'password');
        if (! $token = $this->jwtAuth->attempt($credentials)) {
            return response()->json(['error' => 'invalid_credentials'], 401);
        }
        $user = $this->jwtAuth->authenticate($token);
        $pessoa = new \App\Pessoa();
        $pessoa = $pessoa->getUsuarioPessoaByIdpessoa($user->id_pessoa);
        return response()->json(compact('token','user','pessoa'));
    }
    public function refresh(){
        $token = $this->jwtAuth->getToken();
        $token = $this->jwtAuth->refresh($token);
        return response()->json(compact('token'));
    }
    
    public function logout(){
        $token = $this->jwtAuth->getToken();
        $this->jwtAuth->invalidate($token);
        return response()->json(['logout'],202);
    }

    public function me(){
        if (! $user = $this->jwtAuth->parseToken()->authenticate()) {
            return response()->json(['error'=>'user_not_found'], 404);
        }
        return response()->json(compact('user'));
    }
}
