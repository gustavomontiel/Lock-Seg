<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Cuenta extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'account',
        'identificador',
        'descripcion',
        'user_id',
        'marca',
        'zonas_cableadas',
        'zonas_inhalambricas',
        'particiones_disponibles'
    ];

    /**
     * Obtener el usuario al que pertenece el contacto
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
