<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Authentication Guard
    |--------------------------------------------------------------------------
    |
    | This option controls the default authentication guard that will be used
    | by your application. You can change it to 'api' if you're using tokens
    | for API authentication. For now, we will keep it 'web' for session-based.
    |
    */

    'defaults' => [
        'guard' => 'web',  // Aquí definimos 'web' como el guard predeterminado para la autenticación de sesión
        'passwords' => 'users',  // Configuración para los resets de contraseñas
    ],

    /*
    |--------------------------------------------------------------------------
    | Authentication Guards
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the authentication guards for your application.
    | We have set the 'web' guard for session-based authentication and an
    | 'api' guard for token-based authentication.
    |
    */

    'guards' => [
        'web' => [
            'driver' => 'session',  // 'session' es el driver para mantener la sesión en el navegador
            'provider' => 'users',  // Este es el provider que se usa para cargar los usuarios
        ],

        'api' => [
            'driver' => 'sanctum',  // Si utilizas Sanctum para tokens API
            'provider' => 'users',
            'hash' => false,
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | User Providers
    |--------------------------------------------------------------------------
    |
    | All authentication drivers have a user provider. This defines how the
    | users are retrieved from your database or other storage mechanisms.
    |
    */

    'providers' => [
        'users' => [
            'driver' => 'eloquent',  // Eloquent es el driver predeterminado que usamos para obtener los usuarios
            'model' => App\Models\User::class,  // Aquí se indica cuál es el modelo de usuario
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Password Reset Settings
    |--------------------------------------------------------------------------
    |
    | You may specify the settings for your password resets here. These
    | options control the expiration times and the name of the password reset
    | notification that will be sent to users.
    |
    */

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_resets',
            'expire' => 60,  // Tiempo en minutos para que el enlace de reset expire
            'throttle' => 60,  // Controla la cantidad de intentos para el envío de email de recuperación
        ],
    ],

    /*
    |--------------------------------------------------------------------------
    | Encryption Settings
    |--------------------------------------------------------------------------
    |
    | Here you may specify the encryption settings for your application. 
    | Laravel uses OpenSSL to encrypt strings and cookies.
    |
    */

    'encryption' => [
        'cipher' => 'AES-256-CBC',  // Algoritmo de cifrado utilizado para proteger las sesiones y cookies
    ],
];
