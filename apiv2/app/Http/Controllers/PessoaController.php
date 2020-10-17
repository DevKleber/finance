<?php

namespace App\Http\Controllers;

use Helpers;
use Illuminate\Http\Request;
use Storage;

class PessoaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
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
    }

    public function criarCategoriaParaUsuario()
    {
        // $this->categoriaDespesas(17);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (null == $request['password']) {
            return response(['response' => 'Campo SENHA é obrigatório'], 400);
        }
        if (null == $request['no_pessoa']) {
            return response(['response' => 'Campo NOME é obrigatório'], 400);
        }
        if (null == $request['no_email']) {
            return response(['response' => 'Campo E-MAIL é obrigatório'], 400);
        }
        if (is_array($request['sexo'])) {
            return response(['response' => 'Campo SEXO é obrigatório'], 400);
        }

        $request['bo_ativo'] = true;
        $request['dt_nascimento'] = null;
        $request['img_perfil'] = 'storage/profile/'.rand(1, 16).'.png';

        \DB::beginTransaction();
        $pessoa = \App\Pessoa::create($request->all());

        if (isset($pessoa)) {
            $usuario = new \App\User();
            $existeLogin = $usuario->where('login', $request['no_email'])->first();
            if ($existeLogin) {
                return response(['response' => 'Login indisponível'], 400);
            }
            $userDados['login'] = $request['no_email'];
            $userDados['id_pessoa'] = $pessoa->id_pessoa;
            $userDados['password'] = bcrypt($request['password']);
            $ar = $usuario->create($userDados);
        }
        $categoriaDespesa = $this->categoriaDespesas($ar->id_usuario);
        if (!$categoriaDespesa) {
            \DB::rollback();

            return response(['response' => 'Erro ao criar categorias para despesas. Entre em contato'], 400);
        }
        \DB::commit();

        return $ar;
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = new \App\User();
        $usuario = $user->find($id);
        $pessoa = \App\Pessoa::find($usuario->id_pessoa);
        if ($pessoa) {
            if ($usuario->id_usuario != auth()->user()->id_usuario) {
                return response(['error' => 'Você tem permissão para alterar esse usuário'], 400);
            }
            if (!$this->updatePessoa($request, $pessoa)) {
                return response(['response' => 'Erro ao alterar pessoa'], 400);
            }
            if (!$this->updateUser($request, $usuario)) {
                return response(['response' => 'Erro ao alterar Usuário'], 400);
            }

            return response(['response' => 'Atualizado!'], 200);
        }

        return response(['response' => 'Usuário não encontrado']);
    }

    public function destroy($id)
    {
    }

    private function categoriaDespesas($id_usuario)
    {
        $json = Storage::disk('local')->get('/json/categoriaDespesas.json');
        $json = json_decode($json, true);

        foreach ($json['dados']['pais'] as $key => $value) {
            $request['no_categoria_despesa'] = $value['no_categoria'];
            $request['id_categoria_despesa_pai'] = null;
            $request['bo_ativo'] = true;
            $request['id_usuario'] = $id_usuario;
            $request['icon'] = $value['icon'];
            $categoriaDespesa = \App\CategoriaDespesa::create($request);
            if (!$categoriaDespesa) {
                return false;
            }

            foreach ($value['filhas'] as $key => $filhas) {
                $request['no_categoria_despesa'] = $filhas['no_categoria'];
                $request['id_categoria_despesa_pai'] = $categoriaDespesa->id_categoria_despesa;
                $request['bo_ativo'] = true;
                $request['id_usuario'] = $id_usuario;
                $request['icon'] = $filhas['icon'];
                $categoriaDespesaFilhas = \App\CategoriaDespesa::create($request);
                if (!$categoriaDespesaFilhas) {
                    return false;
                }
            }
        }

        return true;
    }

    private function updatePessoa($request, $pessoa)
    {
        $pessoa->no_pessoa = $request->no_pessoa;
        $pessoa->sexo = $request->sexo;
        $pessoa->dt_nascimento = Helpers::convertdateBr2DB($request->dt_nascimento);
        $pessoa->no_email = $request->no_email;
        $pessoa->nu_cpfcnpj = $request->nu_cpfcnpj;
        $pessoa->bo_ativo = true;
        $pessoa->img_perfil = $request->img_perfil;
        \DB::beginTransaction();
        if (!$pessoa->save()) {
            \DB::rollback();

            return false;
        }

        return true;
    }

    private function updateUser($request, $usuario)
    {
        $usuario['login'] = $request['login'];
        $usuario['password'] = bcrypt($request['password']);

        if (!$usuario->save()) {
            \DB::rollback();

            return false;
        }
        \DB::commit();

        return true;
    }
}
