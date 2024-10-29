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

    public function login(Request $request)
    {
        Log::info('Intentando iniciar sesión con:', [
            'email' => $request->input('email'), 
            'password' => $request->input('password')
        ]);

        $credentials = $request->only('email', 'password');
        
        if (Auth::attempt($credentials)) {
            $user = Auth::user();
            Log::info('Inicio de sesión exitoso:', ['user' => $user]);
            return response()->json(['message' => 'Inicio de sesión exitoso', 'user' => $user], 200);
        }

        if (!Auth::attempt($credentials)) {
            Log::warning("Intento de login fallido. Credenciales incorrectas:", ['email' => $request->input('email')]);
            return response()->json(['message' => 'Credenciales incorrectas'], 401);
        }
        
    }

    public function logout(Request $request)
    {
        Auth::logout();
        Log::info('Usuario desconectado.');
        return response()->json(['message' => 'Usuario desconectado exitosamente'], 200);
    }
}

