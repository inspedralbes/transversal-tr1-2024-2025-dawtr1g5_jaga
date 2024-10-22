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
        return response()->json($products);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "title" => "required",
            "description" => "required",
            "price" => "required",
            "stock" => "required"
        ]);

        if ($validator -> fails()){
            return response()->json(["message"=>"Error en la validación de los datos"]);
        }else{
            $product = Product::create([
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'stock' => $request->stock,
            ]);

            if(!$product){
                return response()->json([
                    "message" => "Error al crear el producto",
                    "status" => 404
                ]);
            }

            return response()->json([
                "product" => $product,
                "status" => 200
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $product = Product::find($id);
        if(!empty($product)){
            return response()->json([
                "product" => $product,
                "status" => 200
            ]);
        }else{
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
        $product = Product::find($id);
        if(!$product){
            return response() -> json([
                "message" => "El producto no existe",
                "status" => 404
            ]);
        }
        $validator = Validator::make($request->all(),[
            "title" => "required",
            "description" => "required",
            "price" => "required",
            "stock" => "required"
        ]);

        if($validator->fails()){
            return response() -> json([
                "message" => "Los datos no son válidos",
                "status" => 404
            ]);
        }

        $product->title = $request->title;
        $product->description = $request->description;
        $product->price = $request->price;
        $product->stock = $request->stock;
        $product->save();

        return response()->json([
            "product" => $product,
            "status" => 200
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        if(!$product){
            return response()->json([
                "message" => "El producto con id: $id no existe",
                "status" => 404
            ]);
        }
        $product->delete();

        return response()->json([
            "message" => "Registro eliminado correctamente",
            "status" => 200
        ]);
    }
}
