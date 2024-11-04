<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\orderfinal;
use App\Models\Orders;
use App\Mail\OrderSend;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Mail;

class cartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = orderfinal::all();

        if (request()->is('api/*')) {
            return response()->json($orders);
        }

        return view('index', compact('orders'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $productController = new ProductController();

        $orderTotal = orderfinal::create([
            'user_id' => $request->input('orderTotal.user_id'),
            'amount' => $request->input('orderTotal.totalAmount'),
            'fullname' => $request->input('orderTotal.fullname'),
            'email' => $request->input('orderTotal.email'),
            'phone' => $request->input('orderTotal.phone'),
            'gift' => $request->input('orderTotal.gift'),
            'uuid' => $request->input('orderTotal.uuid'),
            'status' => "pendiente",
        ]);

        if (!$orderTotal) {
            return response()->json([
                "message" => "Error al crear la orden",
                "status" => 404
            ]);
        }

        foreach ($request->orders as $product) {
            Orders::create([
                "order_id" => $orderTotal->id,
                "product_id" => $product['product_id'],
                "quantity" => $product['quantity'],
                "amount" => $product['amount'],
            ]);

            $productController -> updateStock($product);
        }

        Mail::to($orderTotal->email)->send(new OrderSend($orderTotal));
        //CAMBIAR ESTA LINEA PARA QUE EL TO: SEA EL USUARIO AUTENTICADO

        return response()->json([
            "final order" => $orderTotal,
            "status" => 200,
            // "stockNuevo" => $response
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request)
    {
        $user_id = $request->query('id');
        $orders = orderfinal::where('user_id', $user_id)->get();
        return $orders;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
