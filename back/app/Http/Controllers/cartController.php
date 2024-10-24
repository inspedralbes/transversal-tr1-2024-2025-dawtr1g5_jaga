<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\orderfinal;
use App\Models\Orders;

class cartController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $orderTotal = orderfinal::create([
            'user_id' => $request->input('orderTotal.user_id'),
            'amount' => $request->input('orderTotal.totalAmount'),
        ]);
        
        if(!$orderTotal){
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
                "status" => "pendiente",
            ]);
        }

        return response()->json([
            "final order" => $orderTotal,
            "status" => 200
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
    public function show(string $id)
    {
        //
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
