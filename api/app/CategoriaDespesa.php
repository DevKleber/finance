<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoriaDespesa extends Model
{
    protected $table = 'categoria_despesa';
    protected $primaryKey = 'id_categoria_despesa';
    protected $fillable = ['id_categoria_despesa_pai', 'no_categoria_despesa', 'id_usuario', 'icon'];
}
