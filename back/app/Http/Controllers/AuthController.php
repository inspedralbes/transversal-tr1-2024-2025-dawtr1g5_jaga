<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    // Registro de usuario
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $user = User::create([
            'name' => $request->input('name'),
            'email' => $request->email,
            'password' => Hash::make($request->password), 
        ]);

        return response()->json(['message' => 'Usuario registrado exitosamente', 'user' => $user], 201);
    }

    // Inicio de sesión
    public function login(Request $request)
    {
        Log::info('Email recibido:', ['email' => $request->input('email')]);
        Log::info('Password recibido:', ['password' => $request->input('password')]);

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            return response()->json(['message' => 'Inicio de sesión exitoso', 'user' => $user], 200);
        }

        return response()->json([
            'message' => 'Credenciales incorrectas'
        ], 401);
    }

    // Cierre de sesión
    public function logout(Request $request)
    {
        Auth::logout();
        return response()->json(['message' => 'Usuario desconectado exitosamente'], 200);
    }
}
