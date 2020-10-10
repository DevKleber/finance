<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CartaoCredito extends Model
{
    protected $table = 'cartao_credito';
    protected $primaryKey = 'id_cartao_credito';
    protected $fillable = ['no_cartao_credito', 'vl_limite', 'dia_vencimento', 'dt_primeira_fatura', 'dia_fechamento_fatura', 'no_titular', 'tb_usuario_id_usuario', 'numero', 'bandeira'];

    public static function getVencimentoByCartao($id_cartao)
    {
        return self::where('id_cartao_credito', $id_cartao)->first();
    }
}
