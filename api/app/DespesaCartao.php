<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DespesaCartao extends Model
{
    protected $table = "despesa_cartao";
    protected $primaryKey   = 'id_cartao_credito';
    protected $fillable = ['id_cartao_credito','id_despesa','created_at','updated_at'];
}