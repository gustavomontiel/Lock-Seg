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
    });
});
