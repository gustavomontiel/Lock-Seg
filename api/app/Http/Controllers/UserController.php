<?php

namespace App\Http\Controllers;

use App\Http\Requests\CsvImportRequest;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::all();
        return response()->json(['error' => 'false', 'data' => $users, 'message' => 'Usuarios enviados correctamente.']);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
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
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $user = User::where('id', $id)->first();

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $user, 'message' => 'Usuario enviado correctamente.']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $input = $request->all();
        $user = User::find($id);

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'nombre' => 'string',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'telefono' => 'string',
            'codigo_gestion' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $user->nombre = $input['nombre'];
        $user->email = $input['email'];
        $user->telefono = $input['telefono'];
        $user->codigo_gestion = $input['codigo_gestion'];

        $user->save();

        $roles = $input['roleNames'];
        $user->syncRoles($roles);

        return response()->json(['error' => 'false', 'data' => $user, 'message' => 'Usuario actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id);

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.'], 404);
        }

        $user->delete();

        return response()->json(['error' => 'false', 'message' => 'Usuario eliminado correctamente.']);
    }

    /**
     * Actualizar el password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function actualizarPassword(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'password' => 'required',
            'password_nuevo' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (!(Hash::check($input['password'], Auth::user()->password))) {
            return response()->json(['error' => 'true', 'message' => 'La contraseña es incorrecta.']);
        }

        $user = Auth::user();
        $user->password = Hash::make($input['password_nuevo']);
        $user->save();

        return response()->json(['error' => 'false', 'message' => 'Contraseña actualizada correctamente.']);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function actualizarPasswordById(Request $request, $id)
    {
        $input = $request->all();
        $user = User::find($id);

        if (is_null($user)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'password_nuevo' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $user->password = Hash::make($input['password_nuevo']);
        $user->save();

        return response()->json(['error' => 'false', 'message' => 'Contraseña actualizada correctamente.']);
    }

    /**
     * Importar clientes de un csv exportado desde el ERP de la empresa.
     *
     * @param  CsvImportRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function importarclientes(CsvImportRequest $request)
    {
        $path = $request->file('csv_file')->getRealPath();
        $data = array_map(function ($v) {
            return str_getcsv($v, ";");
        }, file($path));
        $cabecera = $data[0];
        $datos = array_slice($data, 1);
        User::truncate();
        User::createFromValues('Administrador', 'admin@admin.com', 'password')->assignRole('administrador');
        foreach ($datos as $row) {
            $user = new User();
            for ($i = 0; $i < count($cabecera); $i++) {
                if ($cabecera[$i] != 'rol') $user->{trim($cabecera[$i])} = utf8_encode(trim($row[$i]));
            }
            $user->password = Hash::make('123456');
            $user->save();
            $user->verify();
            $user->assignRole($row[3]);
        }
        return response()->json(['error' => 'false', 'message' => 'Usuarios importados correctamente.']);
    }
}
