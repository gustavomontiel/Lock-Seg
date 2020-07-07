<?php

/** @var Router $router */

use Laravel\Lumen\Routing\Router;

/* Public Routes */

$router->get('/', function () {
    return response()->json(['message' => 'Bienvenidos a la API del sistema de GUAZÚ Seguridad.']);
});

/* Promociones Routes */
$router->get('/promociones', [
    'as' => 'promociones.index',
    'uses' => 'PromocionController@index'
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

$router->get('/parametros/descripcion/{descripcion}', [
    'as' => 'parametros.showByDescripcion',
    'uses' => 'ParametroController@showByDescripcion'
]);

/* Contactos Routes */
$router->post('/contactos', [
    'as' => 'contactos.store',
    'uses' => 'ContactoController@store'
]);

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

    $router->put('/actualizar-password/{id}', [
        'as' => 'users.passwordById',
        'uses' => 'UserController@actualizarPasswordById'
    ]);

    /* Contactos Routes */
    $router->get('/contactos', [
        'as' => 'contactos.index',
        'uses' => 'ContactoController@index'
    ]);

    $router->get('/contactos/{id}', [
        'as' => 'contactos.show',
        'uses' => 'ContactoController@show'
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

    /* Promociones Routes */
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

    /* Admin Routes */
    $router->group(['middleware' => 'role:administrador'], function (Router $router) {

        $router->get('/admin', function () {
            return response()->json(['message' => 'Usted posee los privilegios de administrador.']);
        });

        $router->post('/importarclientes', [
            'as' => 'users.importarclientes',
            'uses' => 'UserController@importarclientes'
        ]);

        /* Parametros Routes */

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
    });
});
