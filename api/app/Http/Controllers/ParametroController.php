<?php

namespace App\Http\Controllers;

use App\Parametro;
use Illuminate\Http\Request;
use Validator;

class ParametroController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $parametros = Parametro::all();

        if (count($parametros) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen parametros en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $parametros, 'message' => 'Parametros enviados correctamente.']);
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
            'descripcion' => 'required|string|max:255',
            'valor' => 'required|string|max:255',
            'mostrar_en' => 'required|string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $parametro = Parametro::create($input);

        return response()->json(['error' => 'false', 'data' => $parametro, 'message' => 'Parametro creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $parametro = Parametro::where('id', $id)->first();

        if (is_null($parametro)) {
            return response()->json(['error' => 'true', 'message' => 'Parametro no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $parametro, 'message' => 'Parametro enviado correctamente.']);
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
        $parametro = Parametro::find($id);

        if (is_null($parametro)) {
            return response()->json(['error' => 'true', 'message' => 'Parametro no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'descripcion' => 'string|max:255',
            'valor' => 'string|max:255',
            'mostrar_en' => 'string|max:255'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['descripcion'])) $parametro->descripcion = $input['descripcion'];
        if (isset($input['valor'])) $parametro->valor = $input['valor'];
        if (isset($input['mostrar_en'])) $parametro->mostrar_en = $input['mostrar_en'];

        $parametro->save();

        return response()->json(['error' => 'false', 'data' => $parametro, 'message' => 'Parametro actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $parametro = Parametro::find($id);

        if (is_null($parametro)) {
            return response()->json(['error' => 'true', 'message' => 'Parametro no encontrado.'], 404);
        }

        $parametro->delete();

        return response()->json(['error' => 'false', 'message' => 'Parametro eliminado correctamente.']);
    }

    /**
     * Display the specified resource by description.
     *
     * @param  string  $descripcion
     * @return \Illuminate\Http\Response
     */
    public function showByDescripcion($descripcion)
    {
        $parametro = Parametro::where('descripcion', $descripcion)->first();

        if (is_null($parametro)) {
            return response()->json(['error' => 'true', 'message' => 'Parametro no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $parametro, 'message' => 'Parametro enviado correctamente.']);
    }
}
