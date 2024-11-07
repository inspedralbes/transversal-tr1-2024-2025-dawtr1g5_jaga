<?php

namespace App\Http\Controllers;

use App\Models\orderfinal;
use Illuminate\Http\Request;

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
        $request->validate([
            'status' => 'required|string|in:pendent,preparat,rebutjat,entregat',
        ]);

        $order = orderfinal::findOrFail($id);
        $order->status = $request->input('status');
        $order->save();

        return redirect()->route('index')->with('success', 'Estado de la comanda actualizado correctament.');
    }
}
