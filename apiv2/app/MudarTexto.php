<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MudarTexto extends Model
{
    protected $table = "mudartexto";
    protected $primaryKey   = 'id_mudartexto';
    protected $fillable = ['frase','apelido','id_usuario'];
}
