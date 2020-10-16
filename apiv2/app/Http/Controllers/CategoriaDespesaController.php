<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CategoriaDespesaController extends Controller
{

    public function index()
    {
        $categoria = \App\CategoriaDespesa::where('id_usuario', auth()->user()->id_usuario)->where('bo_ativo', true)->get();
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
            if ($element->id_categoria_despesa_pai == $parentId) {
                $children = $this->buildTree($elements, $element->id_categoria_despesa);
                if ($children) {
                    $element['children'] = $children;
                }
                $branch[] = $element;
            }
        }

        return $branch;
    }

    public function getCategoriasAtivas()
    {
        $categoriaDespesas = \App\CategoriaDespesa::Join(
            'categoria_despesa as tcd2',
            'categoria_despesa.id_categoria_despesa',
            '=',
            'tcd2.id_categoria_despesa_pai'
        )
            ->where('categoria_despesa.id_usuario', auth()->user()->id_usuario)
            ->where('categoria_despesa.bo_ativo', true)
            ->select(
                'tcd2.*',
                'categoria_despesa.no_categoria_despesa as pai'
            )
            ->get()
        ;

        if (!$categoriaDespesas) {
            return response(['response' => 'Não existe Categoria Despesas Ativas'], 400);
        }

        return response($categoriaDespesas);
    }

    public function store(Request $request)
    {
        $request['id_usuario'] = auth()->user()->id_usuario;

        return \App\CategoriaDespesa::create($request->all());
    }

    public function show($id)
    {
        $categoria = \App\CategoriaDespesa::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if (!$categoria) {
            return response(['response' => 'Categoria não encontrada'], 400);
        }

        return $categoria;
    }

    public function update(Request $request, $id)
    {
        $categoria = \App\CategoriaDespesa::find($id);
        if ($categoria) {
            if ($categoria['id_usuario'] != auth()->user()->id_usuario) {
                return response(['error' => 'Não tem permissão para alterar esse CategoriaDespesa'], 400);
            }
            if (!empty($request->id_categoria_despesa_pai)) {
            }
            $categoria->id_categoria_despesa_pai = $request->id_categoria_despesa_pai;
            $categoria->no_categoria_despesa = $request->no_categoria_despesa;

            if (!$categoria->save()) {
                return response(['response' => 'CategoriaDespesa não foi atualizado'], 400);
            }

            return response(['response' => 'Atualizado com sucesso', 'id' => $categoria->id_categoria_despesa]);
        }

        return response(['response' => 'CategoriaDespesa não encontrado']);
    }

    public function destroy($id)
    {
        $categoria = \App\CategoriaDespesa::find($id);
        if (!$categoria) {
            return response(['response' => 'CategoriaDespesa Não encontrado'], 400);
        }
        if ($categoria['id_usuario'] != auth()->user()->id_usuario) {
            return response(['error' => 'Não tem permissão para deletar esse CategoriaDespesa'], 400);
        }
        $categoria->bo_ativo = false;
        if (!$categoria->save()) {
            return response(['response' => 'Erro ao deletar conta'], 400);
        }

        return response(['response' => 'Deletado com sucesso']);
    }
}
