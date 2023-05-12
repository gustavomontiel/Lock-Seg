<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Panel;
use Validator;


class PanelController extends Controller

{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $paneles = Panel::all();

        if (count($paneles) == 0) {
            return response()->json(['error' => 'true', 'message' => 'No existen paneles en el sistema.']);
        }

        return response()->json(['error' => 'false', 'data' => $paneles, 'message' => 'Paneles enviados correctamente.']);
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
            'marca' => 'required|string|max:100',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        $paneles = Panel::create($input);

        return response()->json(['error' => 'false', 'data' => $paneles, 'message' => 'Panel creado correctamente.']);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $panel = Panel::where('id', $id)->first();

        if (is_null($panel)) {
            return response()->json(['error' => 'true', 'message' => 'Panel no encontrado.']);
        }

        return response()->json(['error' => 'false', 'data' => $panel, 'message' => 'Panel enviado correctamente.']);
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
        $panel = Panel::find($id);

        if (is_null($panel)) {
            return response()->json(['error' => 'true', 'message' => 'Panel no encontrado.'], 404);
        }

        $validator = Validator::make($input, [
            'marca' => 'string|max:30',

        ]);

        if ($validator->fails()) {
            return response()->json(['error' => 'true', 'data' => $validator->errors(), 'message' => 'Error en la validación de datos.'], 400);
        }

        if (isset($input['marca'])) $panel->marca = $input['marca'];

        $panel->save();

        return response()->json(['error' => 'false', 'data' => $input, 'message' => 'Panel actualizado correctamente.']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $panel = Panel::find($id);

        if (is_null($panel)) {
            return response()->json(['error' => 'true', 'message' => 'Panel no encontrado.'], 404);
        }

        $panel->delete();

        return response()->json(['error' => 'false', 'message' => 'Panel eliminado correctamente.']);
    }


}
