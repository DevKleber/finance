<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::post('auth/login', 'AuthController@login');
Route::post('new/user', 'PessoaController@store');
Route::get('auth/logout', 'AuthController@logout');
Route::post('auth/refresh', 'AuthController@refresh');

Route::get('testando', 'CategoriaDespesaController@montandoarray');

Route::group(['middleware' => 'jwt.auth'], function () {
    Route::resource('tipoDespesa', 'TipoDespesaController');
    Route::resource('mudarTexto', 'MudarTextoController');
    Route::resource('user', 'PessoaController');
    Route::resource('conta', 'ContaController');
    Route::resource('categoria-despesa', 'CategoriaDespesaController');
    Route::get('categoria-despesaSelect', 'CategoriaDespesaController@getCategoriasAtivas');
    Route::resource('categoria-receita', 'CategoriaReceitaController');
    Route::resource('cartao-credito', 'CartaoCreditoController');
    Route::post('cartao-credito/fatura', 'CartaoCreditoController@getFaturas');
    Route::resource('amigo', 'AmigoController');

    Route::get('amigo-fora', 'AmigoController@getAmigosForaSistema');
    Route::post('amigo-fora', 'AmigoController@salvarAmigoForaSistema');
    Route::resource('receita', 'ReceitaController');

    Route::resource('despesa_conta', 'DespesaContaController');
    Route::resource('despesa_cartao', 'DespesaCartaoController');
    Route::resource('despesa_compartilhada', 'DespesaCompartilhadaController');

    Route::put('despesaItem/{id}', 'DespesaController@updateItem');
    Route::put('pagarItem/{id}', 'DespesaController@pagarDespesa');

    Route::resource('menu', 'MenuController');

    Route::resource('despesa', 'DespesaController');
    Route::put('despesaItem/{id}', 'DespesaController@updateItem');
    Route::put('pagarItem/{id}', 'DespesaController@pagarDespesa');

    Route::put('repetir-receita/{id}', 'ReceitaController@changeBoRepetir');
    Route::get('solicitacao-amizade', 'AmigoController@getSolicitacoesAmizadePendente');
    Route::put('aceitar-solicitacao/{id}/{s}', 'AmigoController@aceitarOuRecusarSolicitacoesAmizadePendente');

    Route::get('pessoa/{nome}', 'AmigoController@procurarPessoas');

    Route::post('amigo/novo', 'AmigoController@semUsuario');
    Route::put('conta/ativar/{id}', 'ContaController@ativar');
    Route::get('auth/me', 'AuthController@me');

    Route::post('movimentacoes', 'MovimentacoesController@index');
});
