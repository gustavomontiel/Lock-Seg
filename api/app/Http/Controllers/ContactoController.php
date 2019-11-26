<?php

namespace App\Http\Controllers;

use App\Contacto;
use App\User;
use Illuminate\Http\Request;
use Validator;

class ContactoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $contactos = Contacto::all();

        if (count($contactos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen contactos en el sistema.']);
        }

        $contactos->load('user');

        return response()->json(['error' => 'false', 'data' => $contactos, 'message' => 'Contactos enviados correctamente.']);
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
            'tipo' => 'string|required|max:50',
            'titulo' => 'string|max:100',
            'descripcion' => 'string|max:1000',
            'user_id' => 'numeric|required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $contacto = Contacto::create($input);

        return response()->json(['error' => 'false', 'data' => $contacto, 'message' => 'Contacto creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $contacto = Contacto::where('id', $id)->with('user')->first();

        if (is_null($contacto)) {
            return response()->json(['error' => 'true', 'message' => 'Contacto no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $contacto, 'message' => 'Contacto enviado correctamente.']);
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
        $contacto = Contacto::find($id);

        if (is_null($contacto)) {
            return response()->json(['error' => 'true', 'message' => 'Contacto no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'tipo' => 'string|required|max:50',
            'titulo' => 'string|max:100',
            'descripcion' => 'string|max:1000',
            'notificado_el' => 'date'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $contacto->tipo = $input['tipo'];
        if (isset($input['titulo'])) $contacto->titulo = $input['titulo'];
        if (isset($input['descripcion'])) $contacto->descripcion = $input['descripcion'];
        if (isset($input['notificado_el'])) $contacto->notificado_el = $input['notificado_el'];

        $contacto->save();

        return response()->json(['error' => 'false', 'data' => $contacto, 'message' => 'Contacto actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $contacto = Contacto::find($id);

        if (is_null($contacto)) {
            return response()->json(['error' => 'true', 'message' => 'Contacto no encontrado.'], 404);
        }

        $contacto->delete();

        return response()->json(['error' => 'false', 'message' => 'Contacto eliminado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function showByUser($idUser)
    {
        $usuario = User::where('id', $idUser)->with('contactos')->first();

        if (is_null($usuario)) {
            return response()->json(['error' => 'true', 'message' => 'Usuario no encontrado.']);
        }

        if (count($usuario->contactos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'El usuario no posee contactos generados.']);
        }

        return response()->json(['error' => 'false', 'data' => $usuario, 'message' => 'Contactos enviados correctamente.']);
    }

    /**
     * Display the specified resource by tipo.
     *
     * @param  string  $tipo
     * @return \Illuminate\Http\Response
     */
    public function showByTipo($tipo)
    {
        $contactos = Contacto::where('tipo', $tipo)->with('user')->get();

        if (count($contactos) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No hay contactos de ese tipo en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $contactos, 'message' => 'Contactos enviados correctamente.']);
    }
}
