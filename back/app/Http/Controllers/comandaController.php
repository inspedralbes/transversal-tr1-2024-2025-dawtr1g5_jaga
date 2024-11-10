<?php

namespace App\Http\Controllers;



use App\Models\Product;
use App\Models\orderfinal;
use Illuminate\Http\Request;
// app/Http/Controllers/ComandaController.php
use Illuminate\Support\Facades\Validator;
use App\Models\Orders;
use Illuminate\Support\Facades\Mail; 


class comandaController extends Controller
{
    public function index()
    {
        $orders = Orders::with('product')->get();
        return view('index', compact('orders'));
    }

    public function show($id)
    {
        $order = orderfinal::findOrFail($id);
        $products = $order->orders;

        return view('comandes', compact('products'));
    }

    public function updateStatus(Request $request, $id)
    {
        // Validación del estado
        $request->validate([
            'status' => 'required|string|in:pendent,preparat,rebutjat,entregat',
        ]);
    
        // Buscar la orden por ID
        $order = orderfinal::findOrFail($id);
    
        // Actualizar el estado de la orden
        $order->status = $request->input('status');
        $order->save();
    
        // Verificar y asegurar que $email es una cadena
        $email = is_array($order->email) ? $order->email[0] : $order->email;
    
        // Log detallado para verificar el valor y tipo de $email antes de enviar
        \Log::info('Verificación del email antes de enviar correo:', [
            'email' => $email,
            'tipo' => ($email)
        ]);
    
        // Asegurarnos de que $email es una cadena
        if (!is_string($email)) {
            \Log::error('El campo email no es una cadena. Valor de $email: ' . json_encode($email));
            return redirect()->route('index')->with('error', 'No se pudo enviar el correo porque el email no es válido.');
        }
    
        // Enviar correo al cliente con el nuevo estado de la orden
        try {
            \Mail::to($email)->send(new \App\Mail\OrderStatusUpdate($order));
        } catch (\Exception $e) {
           
            \Log::error('Error al enviar el correo de estado de la orden: ' . $e->getMessage());
        }
    
        // Redirigir con un mensaje de éxito
        return redirect()->route('index')->with('success', 'Estat de la comanda actualitzat correctament.');
    }
    

}
