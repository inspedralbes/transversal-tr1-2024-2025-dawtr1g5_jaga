<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;  // Necesario para manejar archivos

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
            "stock" => "required|integer",
            "fotoURL" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",
        ]);

        if ($validator->fails()) {
            return redirect()->route('products.create')
                ->withErrors($validator)
                ->withInput();
        }        
        
        $product = $request->only(['title', 'description', 'price', 'stock']);
        
        if ($request->hasFile('fotoURL')) {
            $imagePath = $request->file('fotoURL')->store('products', 'public');
            $product['fotoURL'] = $imagePath;
        }        

        Product::create($product);

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
            $products = "No existe ningún producto con ese nombre";
        }

        return response()->json($products);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        // Validación de datos
        $validator = Validator::make($request->all(), [
            "title" => "required",
            "description" => "required",
            "price" => "required|numeric",
            "stock" => "required|integer",
            "fotoURL" => "nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048",  // Validación de imagen (opcional)
        ]);

        if ($validator->fails()) {
            return redirect()->route('products.edit', $id)
                ->withErrors($validator)
                ->withInput();
        }

        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                "message" => "El producto no existe",
                "status" => 404
            ]);
        }

        if ($request->hasFile('fotoURL')) {
            if (Storage::exists('public/' . $product->fotoURL)) {
                Storage::delete('public/' . $product->fotoURL);
            }

            $imagePath = $request->file('fotoURL')->store('products', 'public');
            $product->fotoURL = $imagePath;  
        }

        // Actualizar el producto
        $product->update($request->only(['title', 'description', 'price', 'stock']));

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

        // Eliminar la imagen del almacenamiento
        if (Storage::exists('public/' . $product->fotoURL)) {
            Storage::delete('public/' . $product->fotoURL);
        }

        $product->delete();

        return redirect()->route('products.index')->with('success', 'Producto eliminado correctamente');
    }
}
