<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AmigoController extends Controller
{
    public function getAmigosForaSistema()
    {
        return \App\Pessoa::where('id_usuario_meuamigoforasistema', auth()->user()->id_usuario)
            ->where('bo_ativo', true)
            ->get()
        ;
    }

    public function salvarAmigoForaSistema(Request $request)
    {
        $request['bo_ativo'] = true;
        $request['id_usuario_meuamigoforasistema'] = auth()->user()->id_usuario;

        return \App\Pessoa::create($request->all());
    }

    public function index()
    {
        $euSouAmigo = \App\Amigo::where('id_usuario', auth()->user()->id_usuario)->where('amigos.situacao', '<>', 'r')
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'amigos.id_pessoa')
            ->select(
                'pessoa.no_pessoa',
                'pessoa.sexo',
                'pessoa.dt_nascimento',
                'pessoa.no_email',
                'pessoa.nu_cpfcnpj',
                'pessoa.bo_ativo',
                'pessoa.img_perfil',
                'amigos.*',
                'amigos.id_pessoa as id_pessoa_amigo'
            )
            ->get()
        ;
        if (!$euSouAmigo) {
            return response(['response' => 'Amigo não encontrada'], 400);
        }

        $meusAmigos = \App\Amigo::where('amigos.id_pessoa', auth()->user()->id_pessoa)->where('amigos.situacao', '<>', 'r')
            ->Join('usuario', 'usuario.id_usuario', '=', 'amigos.id_usuario')
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->select(
                'pessoa.no_pessoa',
                'pessoa.sexo',
                'pessoa.dt_nascimento',
                'pessoa.no_email',
                'pessoa.nu_cpfcnpj',
                'pessoa.bo_ativo',
                'pessoa.img_perfil',
                'amigos.*',
                'pessoa.id_pessoa as id_pessoa_amigo'
            )
            ->get()
        ;
        if (!$meusAmigos) {
            return response(['response' => 'Amigo não encontrada'], 400);
        }

        return ['euSouAmigo' => $euSouAmigo, 'meusAmigos' => $meusAmigos, 'tudo' => $euSouAmigo->merge($meusAmigos)];
    }

    public function procurarPessoas($search)
    {
        $amigoSolicitadoPorMim = \App\Amigo::where('amigos.id_usuario', auth()->user()->id_usuario)
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'amigos.id_pessoa')
            ->select(
                'pessoa.no_pessoa',
                'pessoa.sexo',
                'pessoa.dt_nascimento',
                'pessoa.no_email',
                'pessoa.nu_cpfcnpj',
                'pessoa.bo_ativo',
                'pessoa.img_perfil',
                'amigos.*'
            )
            ->get()
        ;

        $amigoSolicitadoPeloAmigo = \App\Amigo::where('amigos.id_pessoa', '=', auth()->user()->id_pessoa)
            ->Join('usuario', 'usuario.id_usuario', '=', 'amigos.id_usuario')
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->select(
                'pessoa.id_pessoa',
                'pessoa.no_pessoa',
                'pessoa.sexo',
                'pessoa.dt_nascimento',
                'pessoa.no_email',
                'pessoa.nu_cpfcnpj',
                'pessoa.bo_ativo',
                'pessoa.img_perfil'
            )->get();
        $amigos = $amigoSolicitadoPorMim->merge($amigoSolicitadoPeloAmigo);
        $idAmigos = [];
        foreach ($amigos as $key => $value) {
            $idAmigos[] = $value->id_pessoa;
        }

        return \App\Pessoa::where('bo_ativo', true)
            ->where('no_pessoa', 'like', '%'.strtolower($search).'%')
            ->whereNotIn('id_pessoa', $idAmigos)
            ->whereNull('id_usuario_meuamigoforasistema')
            ->get()
        ;
    }

    public function store(Request $request)
    {
        \DB::beginTransaction();
        /*
        * a = amigo
        * c = cancelado
        * p = pendente
        */
        $eramosAmigos = false;
        $pessoa = new \App\Pessoa();

        $request['id_usuario'] = auth()->user()->id_usuario; // requisitante
        $request['situacao'] = 'p';
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();

        $amigoSolicitadoByMe = \App\Amigo::where([
            ['id_usuario', '=', $usuarioPessoaLogado->id_usuario],
            ['id_pessoa', '=', $request['id_pessoa']],
        ])
            ->first()
        ;

        $amigo = null;
        if (null != $amigoSolicitadoByMe) {
            //verificando se eu já mandei solicitação de amizade para essa pessoa
            $eramosAmigos = true;
            $amigo = $amigoSolicitadoByMe;
        } else {
            $pessoaSolicitada = $pessoa->getUsuarioPessoaByIdpessoa($request['id_pessoa']);
            //verificando se a pessoa já mandou solicitação de amizade para mim
            $solicitacoesPeloAmigo = \App\Amigo::where([['id_usuario', '=', $pessoaSolicitada->id_usuario], ['id_pessoa', '=', $usuarioPessoaLogado->id_pessoa]])->first();

            if (null != $solicitacoesPeloAmigo) {
                $eramosAmigos = true;
                $amigo = $solicitacoesPeloAmigo;
            }
        }
        if ($eramosAmigos) {
            $amigo->situacao = 'p';
            if (!$amigo->save()) {
                // \DB::rollback();
                return response(['response' => 'Erro ao fazer amizade'], 400);
            }

            return response(['response' => 'Amizade feita com sucesso', 'dados' => $amigo]);
        }
        $novoAmigo = \App\Amigo::create($request->all());

        $amigo = \App\Amigo::where('id_amigos', $novoAmigo->id_amigos)
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'amigos.id_pessoa')
            ->select(
                'pessoa.no_pessoa',
                'pessoa.sexo',
                'pessoa.dt_nascimento',
                'pessoa.no_email',
                'pessoa.nu_cpfcnpj',
                'pessoa.bo_ativo',
                'pessoa.img_perfil',
                'amigos.*'
            )
            ->first()
        ;
        \DB::commit();
        \App\Email::solicitarAmizade($amigo,$usuarioPessoaLogado);

        return ['dados' => $amigo];
    }

    public function show($id)
    {
        $amigo = \App\Amigo::find($id)->where('id_usuario', '=', auth()->user()->id_usuario);
        if (!$amigo) {
            return response(['response' => 'Amigo não encontrada'], 400);
        }

        return $amigo;
    }

    public function update(Request $request, $id)
    {
        return response(['response' => 'Modulo não alterável']);
    }

    public function destroy($id)
    {
        $pessoa = new \App\Pessoa();
        $amigo = \App\Amigo::find($id);
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();
        if (!$amigo) {
            return response(['response' => 'Amigo Não encontrado'], 400);
        }
        if (($usuarioPessoaLogado->id_usuario == $amigo->id_usuario) || ($usuarioPessoaLogado->id_pessoa == $amigo->id_pessoa)) {
            $amigo->situacao = 'c';
            if (!$amigo->save()) {
                return response(['response' => 'Erro ao deletar conta'], 400);
            }

            return response(['response' => 'Deletado com sucesso']);
        }

        return response(['error' => 'Não tem permissão para deletar esse Amigo'], 400);
    }

    public function getSolicitacoesAmizadePendente()
    {
        $pessoa = new \App\Pessoa();
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();

        return \App\Amigo::where([
            ['amigos.id_pessoa', '=', $usuarioPessoaLogado->id_pessoa],
            ['situacao', '=', 'p'],
        ])
            ->Join('usuario', 'usuario.id_usuario', '=', 'amigos.id_usuario')
            ->Join('pessoa', 'pessoa.id_pessoa', '=', 'usuario.id_pessoa')
            ->select(
                'pessoa.no_pessoa',
                'pessoa.sexo',
                'pessoa.dt_nascimento',
                'pessoa.no_email',
                'pessoa.nu_cpfcnpj',
                'pessoa.bo_ativo',
                'pessoa.img_perfil',
                'amigos.*'
            )
            ->get()
        ;
    }

    public function aceitarOuRecusarSolicitacoesAmizadePendente($id, $situacao)
    {
        $pessoa = new \App\Pessoa();
        $usuarioPessoaLogado = $pessoa->getUsuarioPessoa();

        $amigo = \App\Amigo::find($id);
        if ($usuarioPessoaLogado->id_pessoa != $amigo->id_pessoa) {
            return response(['response' => 'você não tem permissao para aceitar essa solicitacao de amaizade'], 400);
        }
        $amigo->situacao = $situacao;
        if (!$amigo->save()) {
            return response(['response' => 'Erro ao aceitar'], 400);
        }

        return response(['response' => 'Amizade feita']);
    }
}
