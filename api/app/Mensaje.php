<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mensaje extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'fecha_entrega',
        'mensaje',
        'estado',
    ];

    /**
     * Obtener el usuario al que pertenece el mensaje
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
