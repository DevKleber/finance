<?php

use Illuminate\Support\Facades\Route;

Route::post('auth/login', 'AuthController@login');
Route::post('new/user', 'PessoaController@store');
Route::get('auth/logout', 'AuthController@logout');
Route::post('auth/refresh', 'AuthController@refresh');

Route::get('testando', 'CategoriaDespesaController@montandoarray');
Route::get('categoriaparausuario', 'PessoaController@criarCategoriaParaUsuario');
Route::get('email/cartao', 'EmailController@cartaoCreditoVencendo');

Route::group(['middleware' => 'apiJwt'], function () {
    Route::post('dashboard', 'DashboardController@getDashboard');

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
    Route::post('uploadeFileDespesa/{id}', 'DespesaController@uploadFileDespesa');
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
    Route::get('movimentacoes-datalhar/{id}', 'MovimentacoesController@detalhar');
    Route::post('alterarDespesa', 'MovimentacoesController@alterarDespesa');
    Route::delete('deletarDespesa/{id}', 'MovimentacoesController@deletarDespesa');

    Route::get('ajuda/despesa', 'DespesaController@getAjuda');

    Route::get('despesas_aguardando', 'AguardandoAprovacaoController@index');
    Route::post('despesas_aguardando', 'AguardandoAprovacaoController@despesasAguardandoAprovacao');

    Route::resource('pagamento', 'PagamentoController');
    Route::post('pagarDespesa/{id}', 'PagamentoController@pagarDespesaItem');
});
