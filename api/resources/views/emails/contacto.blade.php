<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="UTF-8">
    <title>Nuevo contacto creado</title>
</head>
<body>
    <p>Hola,</p>

    <p>Se ha creado un nuevo contacto en la aplicación Guazú Seguridad con los siguientes datos:</p>

    <ul>
        <li><strong>Tipo:</strong> {{ $datos['tipo'] }}</li>
        <li><strong>Título:</strong> {{ $datos['titulo'] ?? '-' }}</li>
        <li><strong>Descripción:</strong> {{ $datos['descripcion'] ?? '-' }}</li>
        <li><strong>ID de Usuario:</strong> {{ $datos['user_id'] }}</li>
    </ul>

    <p>Gracias,<br>El equipo de Guazú Seguridad</p>
</body>
</html>