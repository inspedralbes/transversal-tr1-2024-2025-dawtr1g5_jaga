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
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
            'phone' => 'nullable|regex:/^[0-9]{9}$/',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422); 
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
        ]);

        $token = $user->createToken('token_name')->plainTextToken;

        return response()->json([
            'user' => $user,
            'token' => $token
        ], 201); 
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


    public function logout(Request $request)
    {
        $user = Auth::user();
        $user->tokens()->delete(); // Revocar todos los tokens
        Log::info('Usuario desconectado.');
        return response()->json(['message' => 'Usuario desconectado exitosamente'], 200);
    }
}