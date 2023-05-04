<?php

namespace App\Http\Controllers;

use App\Promocion;
use Illuminate\Http\Request;
use Validator;
use GrahamCampbell\Flysystem\Facades\Flysystem;

class PromocionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $promociones = Promocion::all();

        if (count($promociones) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen promociones en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $promociones, 'message' => 'Promociones enviadas correctamente.']);
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
            'titulo' => 'required|string|max:100',
            'categoria' => 'required|string|max:100',
            'orden' => 'required|string',
            'descripcion' => 'required|string|max:1000',
            'fecha_desde' => 'required|date',
            'fecha_hasta' => 'required|date'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $promocion = Promocion::create($input);

        $this->uploadImages($promocion, $request);

        return response()->json(['error' => 'false', 'data' => $promocion, 'message' => 'Promoción creada correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $promocion = Promocion::where('id', $id)->first();

        if (is_null($promocion)) {
            return response()->json(['error' => 'true', 'message' => 'Promoción no encontrada.']);
        }

        return response()->json(['error' => 'false', 'data' => $promocion, 'message' => 'Promoción enviada correctamente.']);
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
        $promocion = Promocion::find($id);

        if (is_null($promocion)) {
            return response()->json(['error' => 'true', 'message' => 'Promoción no encontrada.'], 404);
        }

        $validator = Validator::make($input, [
            'titulo' => 'string|max:100',
            'categoria' => 'string|max:100',
            'orden' => 'string',
            'descripcion' => 'string|max:1000',
            'fecha_desde' => 'date',
            'fecha_hasta' => 'date'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['titulo']))        $promocion->titulo = $input['titulo'];
        if (isset($input['categoria']))     $promocion->categoria = $input['categoria'];
        if (isset($input['orden']))         $promocion->orden = $input['orden'];
        if (isset($input['descripcion']))   $promocion->descripcion = $input['descripcion'];
        if (isset($input['fecha_desde']))   $promocion->fecha_desde = $input['fecha_desde'];
        if (isset($input['fecha_hasta']))   $promocion->fecha_hasta = $input['fecha_hasta'];

        $promocion->save();

        $this->uploadImages($promocion, $request);

        return response()->json(['error' => 'false', 'data' => $input, 'message' => 'Promoción actualizada correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $promocion = Promocion::find($id);

        if (is_null($promocion)) {
            return response()->json(['error' => 'true', 'message' => 'Promoción no encontrada.'], 404);
        }

        $promocion->delete();

        return response()->json(['error' => 'false', 'message' => 'Promoción eliminada correctamente.']);
    }

    /**
     * Guardar las imagenes de la oferta en el servidor.
     *
     * @param  Promocion  $promocion
     * @param  Request  $request
     * @return Response
     */
    public function uploadImages(Promocion $promocion, Request $request)
    {
        // IMAGEN PRINCIPAL
        $file = $request->file('imagen');
        if ($file) {
            $stream = fopen($file->getRealPath(), 'r+');
            Flysystem::putStream(
                'uploads/promociones/' . $promocion->id . '/imagen.' . $file->clientExtension(),
                $stream
            );
            fclose($stream);
            $promocion['imagen'] = 'uploads/promociones/' . $promocion->id . '/imagen.' . $file->clientExtension();
        }

        $promocion->save();

        return response()->json(['error' => 'false', 'message' => 'Imagen guardada correctamente']);
    }
}
