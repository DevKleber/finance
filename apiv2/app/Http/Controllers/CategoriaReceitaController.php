<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;


class CategoriaReceitaController extends Controller
{

    public function index()
    {
        $categoria = \App\CategoriaReceita::where('id_usuario', auth()->user()->id_usuario)->where('bo_ativo', true)->get();
        if (!$categoria) {
            return response(['response' => 'Categoria não encontrada'], 400);
        }

        $tree = $this->buildTree($categoria);

        return response($tree);
    }

    public function buildTree($elements, $parentId = 0)
    {
        $branch = [];
        foreach ($elements as $key => $element) {
            if ($element->id_categoria_receita_pai == $parentId) {
                $children = $this->buildTree($elements, $element->id_categoria_receita);
                if ($children) {
                    $element['children'] = $children;
                }
                $branch[] = $element;
            }
        }

        return $branch;
    }

    public function store(Request $request)
    {
        $request['id_usuario'] = auth()->user()->id_usuario;

        return \App\CategoriaReceita::create($request->all());
    }

    public function show($id)
    {
        $categoria = \App\CategoriaReceita::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if (!$categoria) {
            return response(['response' => 'Categoria não encontrada'], 400);
        }

        return $categoria;
    }

    public function update(Request $request, $id)
    {
        $categoria = \App\CategoriaReceita::find($id);
        if ($categoria) {
            if ($categoria['id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse CategoriaReceita'], 400);
            }
            if (!empty($request->id_categoria_receita_pai)) {
            }
            $categoria->id_categoria_receita_pai = $request->id_categoria_receita_pai;
            $categoria->no_categoria_receita = $request->no_categoria_receita;

            if (!$categoria->save()) {
                return response(['response' => 'CategoriaReceita não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'id' => $categoria->id_categoria_receita]);
        }

        return response(['response' => 'CategoriaReceita não encontrado']);
    }

    public function destroy($id)
    {
        $categoria = \App\CategoriaReceita::find($id);
        if (!$categoria) {
            return response(['response' => 'CategoriaReceita Não encontrado'], 400);
        }
        if ($categoria['id_usuario'] != auth()->user()->id_usuario) {
            return response(['error' => 'Não tem permissão para deletar esse CategoriaReceita'], 400);
        }
        $categoria->bo_ativo = false;
        if (!$categoria->save()) {
            return response(['response' => 'Erro ao deletar conta'], 400);
        }

        return response(['response' => 'Deletado com sucesso']);
    }
}
