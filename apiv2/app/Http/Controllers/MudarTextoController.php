<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MudarTextoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function index()
    {
        // $texto = \App\MudarTexto::all();
        $texto = \App\MudarTexto::where('id_usuario', auth()->user()->id_usuario)->get();
        if(!$texto){
            return response(["response"=>"Atalhos não encontrado"],400);
        }
        return response()->json($texto);
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request['id_usuario'] = auth()->user()->id_usuario;
        return \App\MudarTexto::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $texto =  \App\MudarTexto::find($id)->where('id_usuario', auth()->user()->id_usuario);
        if(!$texto){
            return response(["response"=>"Atalhos não encontrado"],400);
        }
        return $texto;
        // return \App\MudarTexto::where('id_tipo_despesa','>', $id)->firstOrFail();
    }


    public function update(Request $request, $id)
    {
        $atalho =  \App\MudarTexto::find($id);
        if($atalho){
            if($atalho['id_usuario'] != auth()->user()->id_usuario){
                return response(['error'=>"Não tem permissão para alterar esse atalho"],400);
            }

            $atalho->frase = $request->frase;
            $atalho->apelido = $request->apelido;
            if(!$atalho->save()){
                return response(["response"=>"Atalho não foi atualizado"],400);
            }
            return response(["response"=>"Atualizado com sucesso","id"=>$atalho->id_mudartexto]);
        }else{
            return response(['response'=>"Atalho não encontrado"]);
        }
    }

    public function destroy($id)
    {
        // return \App\MudarTexto::destroy($id);
        // ou
        $atalho =  \App\MudarTexto::find($id);

        if(!$atalho){
            return response(['response'=>'Atalho Não encontrado'],400);
        }
        if($atalho['id_usuario'] != auth()->user()->id_usuario){
            return response(['error'=>"Não tem permissão para deletar esse atalho"],400);
        }
        $atalho->delete();
        return response(['response'=>'Deletado com sucesso']);
    }
}
