<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Contacto extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'tipo',
        'titulo',
        'descripcion',
        'user_id'
    ];

    /**
     * Obtener el usuario al que pertenece el contacto
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
