<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Promocion extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'promociones';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'titulo',
        'descripcion',
        'imagen',
        'fecha_desde',
        'fecha_hasta'
    ];
}
