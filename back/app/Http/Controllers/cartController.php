<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\orderfinal;
use App\Models\Orders;
use App\Mail\OrderSend;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Mail;
use App\Models\orderdetails;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;

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
    public function createOrderLogged(Request $request)
    {
        $productController = new ProductController();

        $user = Auth::user();
        $orderTotal = orderfinal::create(attributes: [
            'user_id' => $user->id,
            'amount' => $request->input('orderTotal.totalAmount'),
            'fullname' => $user->name,
            'email' => $user->email,
            'phone' => $user->phone,
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
        if (!$orderTotal) {
            return response()->json([
                "message" => "Error al crear la orden",
                "status" => 404
            ]);
        }

        $orderedProducts = []; // Array para almacenar productos comprados
        foreach ($request->orders as $product) {
            $orderProduct = Orders::create([
                "order_id" => $orderTotal->id,
                "product_id" => $product['product_id'],
                "quantity" => $product['quantity'],
                "amount" => $product['amount'],
            ]);

            $productDetails = Product::find($product['product_id']);

            // Agregar producto a la lista de productos comprados
            $orderedProducts[] = [
                'product' => Product::find($product['product_id']),
                'quantity' => $product['quantity'],
                'price' => $product['amount'],
            ];

            $productController->updateStock($product);
        }


        // Precargar la relación orders.product para asegurar el acceso a los nombres de productos
        $orderTotal = OrderFinal::with('orders.product')->find($orderTotal->id);

        // Enviar el correo con el resumen de la compra
        Mail::to($orderTotal->email)->send(new OrderSend($orderTotal, $orderedProducts));


        return response()->json([
            "final order" => $orderTotal,
            "status" => 200,
        ]);
    }

    public function createOrderUnlogged(Request $request)
    {
        $productController = new ProductController();

        $orderTotal = orderfinal::create(attributes: [
            'user_id' => 1,
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
        if (!$orderTotal) {
            return response()->json([
                "message" => "Error al crear la orden",
                "status" => 404
            ]);
        }

        $orderedProducts = []; // Array para almacenar productos comprados
        foreach ($request->orders as $product) {
            $orderProduct = Orders::create([
                "order_id" => $orderTotal->id,
                "product_id" => $product['product_id'],
                "quantity" => $product['quantity'],
                "amount" => $product['amount'],
            ]);

            $productDetails = Product::find($product['product_id']);

            // Agregar producto a la lista de productos comprados
            $orderedProducts[] = [
                'product' => Product::find($product['product_id']),
                'quantity' => $product['quantity'],
                'price' => $product['amount'],
            ];

            $productController->updateStock($product);
        }


        // Precargar la relación orders.product para asegurar el acceso a los nombres de productos
        $orderTotal = OrderFinal::with('orders.product')->find($orderTotal->id);

        // Enviar el correo con el resumen de la compra
        Mail::to($orderTotal->email)->send(new OrderSend($orderTotal, $orderedProducts));


        return response()->json([
            "final order" => $orderTotal,
            "status" => 200,
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
    public function show()
    {
        $user = Auth::user();
        $orders = orderfinal::where('user_id', $user->id)->get();
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
