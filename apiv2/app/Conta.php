<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Conta extends Model
{
    protected $table = "conta";
    protected $primaryKey   = 'id_conta';
    protected $fillable = ['no_conta','vl_saldo','id_usuario'];
}
