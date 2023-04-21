<?php

namespace App\Http\Controllers;

use App\Cuenta;
use App\User;
use Illuminate\Http\Request;
use Validator;

class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $cuentas = Cuenta::all();

        if (count($cuentas) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen cuentas en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $cuentas, 'message' => 'Cuentas enviadas correctamente.']);
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
            'account' => 'string|required',
            'descripcion' => 'string|required',
            'user_id' => 'numeric|required',
            'marca' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $cuenta = Cuenta::create($input);

        return response()->json(['error' => 'false', 'data' => $cuenta, 'message' => 'Cuenta creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $cuenta = Cuenta::where('id', $id)->with('user')->first();

        if (is_null($cuenta)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $cuenta, 'message' => 'Cuenta enviada correctamente.']);
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
        $cuenta = Cuenta::find($id);

        if (is_null($cuenta)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta no encontrada.'], 404);
        }

        $validator = Validator::make($input, [
            'account' => 'string|required',
            'descripcion' => 'string|required',
            'user_id' => 'numeric|required',
            'marca' => 'numeric'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $cuenta->account = $input['account'];
        $cuenta->descripcion = $input['descripcion'];
        $cuenta->user_id = $input['user_id'];
        if (isset($input['marca'])) $cuenta->marca = $input['marca'];

        $cuenta->save();

        return response()->json(['error' => 'false', 'data' => $cuenta, 'message' => 'Cuenta actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $cuenta = Cuenta::find($id);

        if (is_null($cuenta)) {
            return response()->json(['error' => 'true', 'message' => 'Cuenta no encontrada.'], 404);
        }

        $cuenta->delete();

        return response()->json(['error' => 'false', 'message' => 'Cuenta eliminada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByUser($idUser)
    {
        $usuario = User::where('id', $idUser)->with('cuentas')->first();

        if (is_null($usuario)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.']);
        }

        if (count($usuario->cuentas) == 0) {
            return response()->json(['error' => 'true', 'message' => 'El usuario no posee cuentas generadas.']);
        }

        return response()->json(['error' => 'false', 'data' => $usuario, 'message' => 'Cuentas enviadas correctamente.']);
    }
}
