<?php

namespace App\Http\Controllers;


use App\Models\orderfinal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail; 


class comandaController extends Controller
{
    public function index()
    {
        $orders = orderfinal::with('orders')->get();
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

    // Verificar si el campo 'email' es un array o una cadena
    if (is_array($order->email)) {
        // Si 'email' es un array, toma el primer valor
        $email = $order->email[0]; 
    } else {
        // Si 'email' es una cadena, simplemente lo asignamos
        $email = $order->email; 
    }

    // Enviar correo al cliente con el nuevo estado de la orden
    try {
        \Mail::to($email)->send(new \App\Mail\OrderStatusUpdate($order));

    } catch (\Exception $e) {
        // Si ocurre un error, se puede loguear o manejar de alguna forma
        \Log::error('Error al enviar el correo de estado de la orden: ' . $e->getMessage());
    }

    // Redirigir con un mensaje de éxito
    return redirect()->route('index')->with('success', 'Estat de la comanda actualitzat correctament.');
}

}
