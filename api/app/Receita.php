<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Receita extends Model
{
    protected $table = "receita";
    protected $primaryKey   = 'id_receita';
    protected $fillable = ["ds_receita","vl_receita","dt_receita","dt_fim_intervalo","dt_vencimento_pagamento","dt_cancelado","bo_repetir","id_categoria_receita","id_usuario"];
}
