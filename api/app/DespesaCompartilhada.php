<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DespesaCompartilhada extends Model
{
    protected $table = "conta_compartilhada_valor";
    protected $primaryKey   = 'id_conta_compartilhada';
    protected $fillable = ['vl_conta_compartilhada_porcentagem','id_despesa','id_pessoa','created_at','updated_at'];
}