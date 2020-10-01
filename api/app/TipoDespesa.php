<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TipoDespesa extends Model
{
    protected $table = "tipo_despesa";
    protected $primaryKey   = 'id_tipo_despesa';
    protected $fillable = ['no_tipo_despesa'];

}
