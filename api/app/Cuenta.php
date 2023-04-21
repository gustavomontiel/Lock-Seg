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
        'descripcion',
        'user_id',
        'marca'
    ];

    /**
     * Obtener el usuario al que pertenece el contacto
     */
    public function user()
    {
        return $this->belongsTo('App\User');
    }
}
