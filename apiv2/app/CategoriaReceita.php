<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CategoriaReceita extends Model
{
    protected $table = 'categoria_receita';
    protected $primaryKey = 'id_categoria_receita';
    protected $fillable = ['id_categoria_receita_pai', 'no_categoria_receita', 'id_usuario', 'bo_ativo', 'icon'];
}
