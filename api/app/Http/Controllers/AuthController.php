<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Requests\RecoverPasswordRequest;
use App\Http\Requests\RegisterRequest;
use App\Mail\PasswordReset;
use App\Mail\Welcome;
use App\User;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;
use Validator;
use Illuminate\Support\Facades\Hash;

/**
 * Class AuthController
 * @group Auth
 * @package App\Http\Controllers
 */
class AuthController extends Controller
{
    // protected $username = 'username';

    /**
     * Current User
     * @authenticated
     * @return JsonResponse
     */
    public function getUser()
    {
        return response()->json(['data' => Auth::user()]);
    }

    /**
     * Login
     *
     * @bodyParam email string required The email
     * @bodyParam password string required The password
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request)
    {
        $credentials = $request->only('email', 'password');

        $token = Auth::attempt($credentials);

        if (!$token) {
            return response()->json(['message' => trans('messages.login_failed')], 401);
        }

        return response()->json(['data' => ['user' => Auth::user(), 'token' => $token]]);
    }

    /**
     * Login with Email
     *
     * @bodyParam email string required The email
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function loginEmail(Request $request)
    {
        $user = User::byEmail($request->input('email'));
        //Now log in the user if exists
        if ($user == null) {
            return response()->json(['message' => trans('messages.login_failed')], 401);
        }

        $token = Auth::login($user);
        if (!$token) {
            return response()->json(['message' => trans('messages.login_failed')], 401);
        }

        return response()->json(['data' => ['user' => Auth::user(), 'token' => $token]]);
    }

    /**
     * Register
     *
     * @bodyParam nombre string optional - Nombre y apellido
     * @bodyParam username string required -  The username
     * @bodyParam email string required - The email
     * @bodyParam password string required - The password
     * @bodyParam id_cliente number required - Id de Cliente
     *
     * @param RegisterRequest $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'nombre' => 'string|required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
            'telefono' => 'string',
            'codigo_gestion' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $roles = $input['roleNames'];
        unset($input['roleNames']);
        $input['password'] = Hash::make($input['password']);
        $input['verified'] = 1;
        $user = User::create($input);

        foreach ($roles as $key => $value) {
            $rol = $value;
            $user->assignRole($rol);
        }

        return response()->json(['error' => 'false', 'data' => $user, 'message' => 'Usuario creado correctamente.']);
    }

    /**
     * Verify User
     *
     * @queryParam token required The token
     *
     * @param String $token
     * @return JsonResponse
     * @throws Exception
     */
    public function verify($token)
    {
        $user = User::verifyByToken($token);

        if (!$user) {
            return response()->json(['data' => ['message' => 'Invalid verification token']], 400);
        }

        return response()->json(['data' => ['message' => 'La cuenta ha sido activada.']]);
    }

    /**
     * Send new Password Request
     *
     * @bodyParam email string required The email
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'El correo ingresado no pertenece a ningun usuario registrado'                
            ], 422);
        }

        $user = User::byEmail($request->input('email'));

        $token = $user->createPasswordRecoveryToken();

        Mail::to($user)->send(new PasswordReset($user, $token));

        return response()->json(['message' => 'Por favor revise su email para restaurar su contraseña.']);
    }

    /**
     * Create new Password
     *
     * @bodyParam password string required The new password
     *
     * @param Request $request
     * @param $token
     * @return JsonResponse
     * @throws ValidationException
     */
    public function recoverPassword(Request $request, $token)
    {
        $this->validate($request, [
            'password' => 'required|min:8',
        ]);

        $user = User::newPasswordByResetToken($token, $request->input('password'));

        if ($user) {
            return response()->json( ['message' => 'La contraseña ha sido restaurada correctamente.']);
        } else {
            return response()->json( ['message' => 'Token de restauración de contraseña incorrecto.'], 400);
        }
    }
}
