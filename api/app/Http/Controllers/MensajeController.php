<?php

namespace App\Http\Controllers;

use App\Mensaje;
use App\User;
use Illuminate\Http\Request;
use Validator;

class MensajeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $mensajes = Mensaje::all();

        if (count($mensajes) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen mensajes en el sistema.']);
        }

        $mensajes->load('user');

        return response()->json(['error' => 'false', 'data' => $mensajes, 'message' => 'Mensajes enviados correctamente.']);
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
            'fecha_entrega' => 'date',
            'mensaje' => 'required|string|max:1000',
            'estado' => 'string|max:50',
            'user_id' => 'numeric|required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $mensaje = Mensaje::create($input);

        return response()->json(['error' => 'false', 'data' => $mensaje, 'message' => 'Mensaje creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $mensaje = Mensaje::where('id', $id)->with('user')->first();

        if (is_null($mensaje)) {
            return response()->json(['error' => 'true', 'message' => 'Mensaje no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $mensaje, 'message' => 'Mensaje enviado correctamente.']);
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
        $mensaje = Mensaje::find($id);

        if (is_null($mensaje)) {
            return response()->json(['error' => 'true', 'message' => 'Mensaje no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'fecha_entrega' => 'date',
            'mensaje' => 'required|string|max:1000',
            'estado' => 'string|max:50'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['fecha_entrega'])) $mensaje->fecha_entrega = $input['fecha_entrega'];
        $mensaje->mensaje = $input['mensaje'];
        if (isset($input['estado'])) $mensaje->estado = $input['estado'];

        $mensaje->save();

        return response()->json(['error' => 'false', 'data' => $mensaje, 'message' => 'Mensaje actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $mensaje = Mensaje::find($id);

        if (is_null($mensaje)) {
            return response()->json(['error' => 'true', 'message' => 'Mensaje no encontrado.'], 404);
        }

        $mensaje->delete();

        return response()->json(['error' => 'false', 'message' => 'Mensaje eliminado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByUser($idUser)
    {
        $usuario = User::where('id', $idUser)->with('mensajes')->first();

        if (is_null($usuario)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.']);
        }

        if (count($usuario->mensajes) == 0) {
            return response()->json(['error' => 'true', 'message' => 'El usuario no posee mensajes.']);
        }

        return response()->json(['error' => 'false', 'data' => $usuario, 'message' => 'Mensajes enviados correctamente.']);
    }
}
