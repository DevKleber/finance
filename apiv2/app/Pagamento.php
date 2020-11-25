<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Pagamento extends Model
{
    protected $table = 'despesa_item_pagamento';
    protected $primaryKey = 'id_despesa_item_pagamento';
    protected $fillable = ['id_despesa_item_pagamento', 'bo_paga', 'id_despesa_item', 'created_at', 'updated_at', 'comprovante', 'id_pessoa'];
}
