<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validar el request...

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Generar un token
        $token = $user->createToken('token_name')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 201);
    }


    public function login(Request $request)
    {
        try {
            Log::info('Intentando iniciar sesión con:', [
                'email' => $request->input('email'),
                'password' => $request->input('password')
            ]);

            $credentials = $request->only('email', 'password');

            if (Auth::attempt($credentials)) {
                $user = Auth::user();
                $token = $user->createToken('auth_token')->plainTextToken;
                Log::info('Inicio de sesión exitoso:', ['user' => $user]);
                return response()->json(['message' => 'Inicio de sesión exitoso', 'token' => $token], 200);
            }

            Log::warning("Intento de login fallido. Credenciales incorrectas:", ['email' => $request->input('email')]);
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        } catch (\Exception $e) {
            Log::error('Error durante el inicio de sesión: ' . $e->getMessage());
            return response()->json(['message' => 'Error en el servidor'], 500);
        }
    }

    public function adminLogin(Request $request)
    {
        // Solo el admin puede acceder con estas credenciales
        if ($request->email === 'admin@example.com' && $request->password === 'adminpassword') {
            $user = User::where('email', 'admin@example.com')->first();
            $token = $user->createToken('admin_token')->plainTextToken;

            Log::info('Login exitoso como admin', ['user' => $user]);
            return response()->json(['message' => 'Login exitoso como admin', 'token' => $token], 200);
        }

        return response()->json(['message' => 'Credenciales incorrectas para administrador'], 401);
    }

    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete(); // Revocar todos los tokens
        Log::info('Usuario desconectado.');
        return response()->json(['message' => 'Usuario desconectado exitosamente'], 200);
    }
}
