<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Amigo extends Model
{
    protected $table = "amigos";
    protected $primaryKey   = 'id_amigos';
    protected $fillable = ['id_usuario','id_pessoa','situacao'];
}
