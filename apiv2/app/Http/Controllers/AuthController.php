<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;

class AuthController extends Controller
{
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'login' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only(['login', 'password']);
        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->respondWithToken($token);
    }

    // @webipe@

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return  \App\Funcionario::getEmployee(auth('api')->user()->id);
    }

    public function changePassword(Request $request)
    {
        $id = auth('api')->user()->id;
        $dados = $request->only(['currentPassword', 'newPassword', 'confirmPassword']);
        $employee = \App\Funcionario::getEmployee($id);
        $nomeEmployee = strtolower(current(explode(' ', $employee['employee']->no_pessoa)));

        if (!$id) {
            return response(['error' => 'Unauthorized'], 401);
        }

        if ($dados['newPassword'] != $dados['confirmPassword']) {
            return response(['response' => 'As senhas não conferem'], 400);
        }

        if (in_array($dados['newPassword'], \App\User::getWorstPassword())) {
            return response(['response' => 'A senha informada é muito fraca'], 400);
        }

        if ($nomeEmployee == $dados['newPassword']) {
            return response(['response' => 'Senha tem que ser diferente do nome'], 400);
        }

        return  \App\User::changePassword($dados, $id);
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth('api')->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth('api')->refresh());
    }

    public function recoverPassword(Request $request)
    {
        return \App\User::recoverPassword($request->all());
    }

    /**
     * Get the token array structure.
     *
     * @param string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        // $me = $this->me();

        $user = auth()->user();
        $pessoa = new \App\Pessoa();
        $pessoa = $pessoa->getUsuarioPessoaByIdpessoa($user->id_pessoa);

        return response()->json([
            'token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => $user,
            'pessoa' => $pessoa,
        ]);
    }
}
