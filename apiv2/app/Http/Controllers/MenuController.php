<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MenuController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        return \App\Menu::Join('sistema_rotina', 'sistema_modulo.cd_sistema_modulo', '=', 'sistema_rotina.cd_sistema_modulo')
            ->select('sistema_rotina.*', 'sistema_modulo.*')
            ->where('sistema_modulo.bo_ativo', 1)
            ->orderBy('ordem')
            ->get()
        ;
        // $menu = \App\Menu::leftJoin('sistema_rotina', 'sistema_modulo.cd_sistema_modulo', '=', 'sistema_rotina.cd_sistema_modulo')
        // ->select('sistema_rotina.*','sistema_modulo.*')
        // ->where('sistema_modulo.bo_ativo',1)
        // ->get();
        // return [$this->buildTree($menu->toArray())];
    }

    public function getMenus()
    {
    }

    public function processarMenu($ar)
    {
        $array = [];
        $cont = 0;
        foreach ($ar as $key => $value) {
            $array[$value['no_modulo'].'_'.$value['cd_sistema_modulo']][] = [
                'cd_sistema_rotina' => $value['cd_sistema_rotina'],
                'ds_rotina' => $value['ds_rotina'],
                'no_rotina' => $value['no_rotina'],
                'icone' => $value['icone'],
                'ds_url' => $value['ds_url'],
            ];
            ++$cont;
        }

        return json_decode(json_encode($array), true);
    }

    public function buildTree($items)
    {
        $childs = [];

        foreach ($items as $item) {
            $childs[$item['cd_sistema_modulo']][] = $item;
        }

        foreach ($items as $item) {
            if (isset($childs[$item['cd_sistema_rotina']])) {
                $item['childs'] = $childs[$item['cd_sistema_rotina']];
            }
        }

        return (array) $childs;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
    }
}
