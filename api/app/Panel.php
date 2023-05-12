<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Panel extends Model
{
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'paneles';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'marca',
    ];
}
