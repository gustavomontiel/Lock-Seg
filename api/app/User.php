<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Lumen\Auth\Authorizable;
use Spatie\Permission\Traits\HasRoles;
use Carbon\Carbon;
use App\Notifications\CustomResetPasswordNotification;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'nombre',
        'email',
        'password',
        'telefono',
        'codigo_gestion',
        'verified',
        'activo'
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'verification_token',
        'roles'
    ];
    
    /**
     * The attributes appended to the model's JSON form.
     *
     * @var array
     */
    protected $appends = ['roleNames'];

    /**
     * Get the roles of the user
     *
     * @return Array
     */
    public function getRoleNamesAttribute()
    {
        return $this->roles->pluck('name');
    }

    /**
     * Obtener las cuentas de un usuario
     *
     * @return Array
     */
    public function cuentas()
    {
        return $this->hasMany('App\Cuenta');
    }

    /**
     * Obtener los contactos de un usuario
     *
     * @return Array
     */
    public function contactos()
    {
        return $this->hasMany('App\Contacto');
    }

    /**
     * Obtener los mensajes de un usuario
     *
     * @return Array
     */
    public function mensajes()
    {
        return $this->hasMany('App\Mensaje');
    }

    /**
     * Create a user
     *
     * @param $name
     * @param $email
     * @param $password
     * @return User|bool
     */
    public static function createFromValues($nombre, $email, $password, $telefono)
    {
        $user = new static;

        $user->nombre = $nombre;
        $user->telefono = $telefono;
        $user->email = $email;
        $user->password = Hash::make($password);
        $user->verification_token = Str::random(64);
        $user->verify();

        return $user->save() ? $user : false;
    }

    /**
     * Get user by email
     *
     * @param $email
     * @return User
     */
    public static function byEmail($email)
    {
        return (new static)->where(compact('email'))->first();
    }

    /**
     * Verify by token
     *
     * @param $token
     * @return false|User
     */
    public static function verifyByToken($token)
    {
        $user = (new static)->where(['verification_token' => $token, 'verified' => 0])->first();

        if (!$user) {
            return false;
        }

        $user->verify();

        return $user;
    }

    /**
     * Verifiy a user
     *
     * @return bool
     */
    public function verify()
    {
        $this->verification_token = null;
        $this->verified = 1;

        return $this->save();
    }

    /**
     * Create password recovery token
     */
    
    public function createPasswordRecoveryToken()
    {
        $code = str_pad(random_int(0, 999999), 6, '0', STR_PAD_LEFT);

        DB::table('password_resets')->updateOrInsert(
            ['email' => $this->email],
            [
                'email' => $this->email,
                'token' => $code,
                'created_at' => Carbon::now() // usa Carbon::now()
            ]
        );

        return $code;
    }


    /**
     * Restore password by token
     *
     * @param $token
     * @param $password
     * @return false|User
     */
    
    public static function newPasswordByResetToken($code, $password)
    {
        $record = DB::table('password_resets')->where('token', $code)->first();

        if (!$record) {
            return false;
        }

        // Validar expiración del token
        $expiresAt = Carbon::parse($record->created_at)->addMinutes(15);
        if (Carbon::now()->greaterThan($expiresAt)) {
            DB::table('password_resets')->where('token', $code)->delete();
            return false;
        }

        // Obtener usuario asociado
        $user = self::byEmail($record->email);
        if (!$user) {
            DB::table('password_resets')->where('token', $code)->delete();
            return false;
        }

        // Eliminar token usado
        DB::table('password_resets')->where('token', $code)->delete();

        // Actualizar contraseña
        return $user->setPassword($password) ? $user : false;
    }


    /**
     * Persist a new password for the user
     *
     * @param $password
     * @return bool
     */
   public function setPassword($password)
    {
        $this->password = Hash::make($password);
        return $this->save();
    }


}
