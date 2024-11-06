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
            "stock" => "required|integer|min:0|max:100000000"
        ]);

        if ($validator->fails()) {
            return redirect()->route('products.store')
                ->withErrors($validator)
                ->withInput();
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

    public function search(Request $request)
    {
        $query = $request->input('query');

        if ($query) {
            $products = Product::where('title', 'LIKE', "%{$query}%")->get();
        } else {
            $products = "No existeix cap producte amb aquest nom";
        }

        return response()->json($products);
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
            "stock" => "required|integer|min:0|max:100000000"
        ]);

        if ($validator->fails()) {
            return redirect()->route('products.edit', $id)
                ->withErrors($validator)
                ->withInput();
        }

        $product = Product::find($id);
        if (!$product) {
            return redirect()->route('products.index')->with('error', 'El producto no existe');
        }

        // Actualiza el producto
        $product->update($request->all());

        return redirect()->route('products.index')->with('success', 'Producto actualizado correctamente');
    }

    public function updateStock($product)
    {
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
