<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DespesaConta extends Model
{
    protected $table = "despesa_conta";
    protected $primaryKey   = 'id_despesa_conta';
    protected $fillable = ['id_conta','id_despesa','created_at','updated_at'];
}
