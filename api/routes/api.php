<?php

/** @var Router $router */

use Laravel\Lumen\Routing\Router;

/* Public Routes */

$router->get('/', function () {
    return response()->json(['message' => 'Bienvenidos a la API del sistema de Lock Seguridad.']);
});

/* Auth Routes */
$router->group(['prefix' => 'auth', 'as' => 'auth'], function (Router $router) {

    /* Defaults */
    $router->post('/register', [
        'as' => 'register',
        'uses' => 'AuthController@register',
    ]);
    $router->post('/login', [
        'as' => 'login',
        'uses' => 'AuthController@login',
    ]);
    $router->get('/verify/{token}', [
        'as' => 'verify',
        'uses' => 'AuthController@verify'
    ]);

    /* Password Reset */
    $router->post('/password/forgot', [
        'as' => 'password.forgot',
        'uses' => 'AuthController@forgotPassword'
    ]);
    $router->post('/password/recover/{token}', [
        'as' => 'password.recover',
        'uses' => 'AuthController@recoverPassword'
    ]);

    /* Protected User Endpoint */
    $router->get('/user', [
        'uses' => 'AuthController@getUser',
        'as' => 'user',
        'middleware' => 'auth'
    ]);
});

/* Protected Routes */
$router->group(['middleware' => 'auth'], function (Router $router) {

    /* Contactos Routes */
    $router->get('/contactos', [
        'as' => 'contactos.index',
        'uses' => 'ContactoController@index'
    ]);

    $router->get('/contactos/{id}', [
        'as' => 'contactos.show',
        'uses' => 'ContactoController@show'
    ]);

    $router->post('/contactos', [
        'as' => 'contactos.store',
        'uses' => 'ContactoController@store'
    ]);

    $router->put('/contactos/{id}', [
        'as' => 'contactos.update',
        'uses' => 'ContactoController@update'
    ]);

    $router->delete('/contactos/{id}', [
        'as' => 'contactos.destroy',
        'uses' => 'ContactoController@destroy'
    ]);

    $router->get('/contactos/user/{id_user}', [
        'as' => 'contactos.showByUser',
        'uses' => 'ContactoController@showByUser'
    ]);

    $router->get('/contactos/tipo/{tipo}', [
        'as' => 'contactos.showByTipo',
        'uses' => 'ContactoController@showByTipo'
    ]);

    $router->put('/contacto/silenciar/{id}', [
        'as' => 'contactos.silenciarContacto',
        'uses' => 'ContactoController@silenciarContacto'
    ]);

    /* Mensajes Routes */
    $router->get('/mensajes', [
        'as' => 'mensajes.index',
        'uses' => 'MensajeController@index'
    ]);

    $router->get('/mensajes/{id}', [
        'as' => 'mensajes.show',
        'uses' => 'MensajeController@show'
    ]);

    $router->post('/mensajes', [
        'as' => 'mensajes.store',
        'uses' => 'MensajeController@store'
    ]);

    $router->put('/mensajes/{id}', [
        'as' => 'mensajes.update',
        'uses' => 'MensajeController@update'
    ]);

    $router->delete('/mensajes/{id}', [
        'as' => 'mensajes.destroy',
        'uses' => 'MensajeController@destroy'
    ]);

    $router->get('/mensajes/user/{id_user}', [
        'as' => 'mensajes.showByUser',
        'uses' => 'MensajeController@showByUser'
    ]);

    /* Parametros Routes */
    $router->get('/parametros/descripcion/{descripcion}', [
        'as' => 'parametros.showByDescripcion',
        'uses' => 'ParametroController@showByDescripcion'
    ]);

    /* Admin Routes */
    $router->group(['middleware' => 'role:administrador'], function (Router $router) {

        $router->get('/admin', function () {
            return response()->json(['message' => 'Usted posee los privilegios de administrador.']);
        });

        /* Users Routes */
        $router->get('/users', [
            'as' => 'users.index',
            'uses' => 'UserController@index'
        ]);

        $router->get('/users/{id}', [
            'as' => 'users.show',
            'uses' => 'UserController@show'
        ]);

        $router->post('/users', [
            'as' => 'users.store',
            'uses' => 'UserController@store'
        ]);

        $router->put('/users/{id}', [
            'as' => 'users.update',
            'uses' => 'UserController@update'
        ]);

        $router->delete('/users/{id}', [
            'as' => 'users.destroy',
            'uses' => 'UserController@destroy'
        ]);

        $router->put('/actualizar-password', [
            'as' => 'users.password',
            'uses' => 'UserController@actualizarPassword'
        ]);

        $router->post('/importarclientes', [
            'as' => 'users.importarclientes',
            'uses' => 'UserController@importarclientes'
        ]);

        /* Parametros Routes */
        $router->get('/parametros', [
            'as' => 'parametros.index',
            'uses' => 'ParametroController@index'
        ]);

        $router->get('/parametros/{id}', [
            'as' => 'parametros.show',
            'uses' => 'ParametroController@show'
        ]);

        $router->post('/parametros', [
            'as' => 'parametros.store',
            'uses' => 'ParametroController@store'
        ]);

        $router->put('/parametros/{id}', [
            'as' => 'parametros.update',
            'uses' => 'ParametroController@update'
        ]);

        $router->delete('/parametros/{id}', [
            'as' => 'parametros.destroy',
            'uses' => 'ParametroController@destroy'
        ]);

        /* Promociones Routes */
        $router->get('/promociones', [
            'as' => 'promociones.index',
            'uses' => 'PromocionController@index'
        ]);

        $router->get('/promociones/{id}', [
            'as' => 'promociones.show',
            'uses' => 'PromocionController@show'
        ]);

        $router->post('/promociones', [
            'as' => 'promociones.store',
            'uses' => 'PromocionController@store'
        ]);

        $router->put('/promociones/{id}', [
            'as' => 'promociones.update',
            'uses' => 'PromocionController@update'
        ]);

        $router->delete('/promociones/{id}', [
            'as' => 'promociones.destroy',
            'uses' => 'PromocionController@destroy'
        ]);
    });
});
