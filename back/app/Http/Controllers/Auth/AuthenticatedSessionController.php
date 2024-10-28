<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{

    public function store(Request $request)
    {
        // Validación de credenciales
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (!Auth::attempt($request->only('email', 'password'), $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'email' => __('Las credenciales proporcionadas son incorrectas.'),
            ]);
        }

        // Regenerar sesión
        $request->session()->regenerate();

        // Responder con datos del usuario autenticado
        return response()->json([
            'message' => 'Inicio de sesión exitoso.',
            'user' => Auth::user(),
        ]);
    }

    public function destroy(Request $request)
    {
        // Cerrar sesión
        Auth::guard('web')->logout();

        // Invalidar y regenerar la sesión
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json([
            'message' => 'Cierre de sesión exitoso.',
        ]);
    }
}
