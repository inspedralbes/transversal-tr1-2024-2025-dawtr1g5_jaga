<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = Product::all();

        if (request()->is('api/*')) {
            return response()->json($products);
        }

        return view('crud', compact('products'));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "title" => "required",
            "description" => "required",
            "price" => "required|numeric",
            "stock" => "required|integer"
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => "Error en la validación de los datos"], 422);
        }

        Product::create($request->all());

        return redirect()->route('products.index')->with('success', 'Producto agregado correctamente');
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);
        if ($product) {
            return response()->json([
                "product" => $product,
                "status" => 200
            ]);
        } else {
            return response()->json([
                "message" => "El producto no se encuentra",
                "status" => 404
            ]);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Primero, valida los datos
        $validator = Validator::make($request->all(), [
            "title" => "required",
            "description" => "required",
            "price" => "required|numeric",
            "stock" => "required|integer"
        ]);

        if ($validator->fails()) {
            return response()->json([
                "message" => "Los datos no son válidos",
                "status" => 422 // Cambiado a 422 para indicar error de validación
            ]);
        }

        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                "message" => "El producto no existe",
                "status" => 404
            ]);
        }

        // Actualiza el producto
        $product->update($request->all());

        // return response()->json([
        //     "product" => $product,
        //     "status" => 200
        // ]);

        return redirect()->route('products.index')->with('success', 'Producto actualizado correctamente');

    }

    public function updateStock($product){
        $productBBDD = Product::find($product['product_id']);
        if (!$productBBDD) {
            return response()->json([
                "message" => "El producto no existe",
                "status" => 404
            ]);
        }

        $stockAnterior = $productBBDD->stock;
        $stockNuevo = $stockAnterior - $product['quantity'];
        $productBBDD->update(['stock' => $stockNuevo]);
        // return $productBBDD->stock;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        $product = Product::findOrFail($id);
        return view('products.edit', compact('product'));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                "message" => "El producto con id: $id no existe",
                "status" => 404
            ]);
        }
        $product->delete();

        // return response()->json([
        //     "message" => "Registro eliminado correctamente",
        //     "status" => 200
        // ]);
        return redirect()->route('products.index')->with('success', 'Producto eliminado correctamente');

    }
}
