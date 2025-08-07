<!doctype html>
<html lang="{{ config('app.locale') }}">
<head>
    <meta charset="UTF-8">
    <title>Recuperación de Contraseña</title>
</head>
<body>
    <p>Hola,</p>

    <p>Recibimos una solicitud para restablecer tu contraseña de la app de Guazú Seguridad.</p>

    <p><strong>Tu código de recuperación es:</strong></p>
    <h2 style="font-size: 28px;">{{ $token }}</h2>

    <p>Ingresá este código en la app para poder establecer una nueva contraseña.</p>

    <p>Si no realizaste esta solicitud, podés ignorar este mensaje.</p>

    <br>
    <p>Gracias,<br>El equipo de Guazú Seguridad</p>
</body>
</html>