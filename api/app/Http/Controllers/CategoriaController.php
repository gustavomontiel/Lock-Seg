<?php

namespace App\Http\Controllers;

use App\Categoria;
use Illuminate\Http\Request;
use Validator;

class CategoriaController extends Controller
{
    public function index()
    {
        $categorias = Categoria::all();

        if (count($categorias) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen categorias en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $categorias, 'message' => 'Categorias enviadas correctamente.']);
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
            'orden' => 'string|required',
            'titulo' => 'string|required',
            'descripcion' => 'string|required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $categoria = Categoria::create($input);

        return response()->json(['error' => 'false', 'data' => $categoria, 'message' => 'Categoria creada correctamente.']);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $categoria = Categoria::where('id', $id)->first();

        if (is_null($categoria)) {
            return response()->json(['error' => 'true', 'message' => 'Categoria no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $categoria, 'message' => 'Categoria enviada correctamente.']);
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
        $categoria = Categoria::find($id);

        if (is_null($categoria)) {
            return response()->json(['error' => 'true', 'message' => 'Categoria no encontrada.'], 404);
        }

        $validator = Validator::make($input, [
            'orden' => 'string|required',
            'titulo' => 'string|required',
            'descripcion' => 'string|required',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $categoria->orden = $input['orden'];
        $categoria->titulo = $input['titulo'];
        $categoria->descripcion = $input['descripcion'];

        $categoria->save();

        return response()->json(['error' => 'false', 'data' => $categoria, 'message' => 'Categoria actualizada correctamente.']);
    }


    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $categoria = Categoria::find($id);

        if (is_null($categoria)) {
            return response()->json(['error' => 'true', 'message' => 'Categoria no encontrada.'], 404);
        }

        $categoria->delete();

        return response()->json(['error' => 'false', 'message' => 'Categoria eliminada correctamente.']);
    }
}
