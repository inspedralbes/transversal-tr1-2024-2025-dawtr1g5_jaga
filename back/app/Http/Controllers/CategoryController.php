<?php

// app/Http/Controllers/CategoryController.php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        return view('categories', compact('categories'));
    }

    public function show($id)
    {
        $category = Category::findOrFail($id);
        $products = $category->products;  // Productos ya asociados a esta categoría
        $allProducts = Product::all();  // Todos los productos disponibles
        return view('categprod', compact('category', 'products', 'allProducts'));
    }

    public function store(Request $request)
    {
        // Validación de los datos
        $request->validate([
            'category' => 'required|string|max:255',
            'fotoURL' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $imagePath = $request->file('fotoURL')->store('categories', 'public'); 

        $category = new Category();
        $category->category = $request->category;
        $category->fotoURL = $imagePath;  
        $category->save();

        return redirect()->route('categories')->with('success', 'Categoría añadida con éxito.');
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        if (Storage::exists('public/' . $category->fotoURL)) {
            Storage::delete('public/' . $category->fotoURL);
        }
        $category->delete();

        return redirect()->route('categories')->with('success', 'Categoría eliminada con éxito.');
    }

    public function addProduct(Request $request, $categoryId)
    {
        $request->validate([
            'product_id' => 'required|exists:products,id',  // Asegurarse de que el producto existe
        ]);

        $category = Category::findOrFail($categoryId);
        $product = Product::findOrFail($request->product_id);

        // Asociar el producto a la categoría
        $category->products()->attach($product->id);

        return redirect()->route('categprod', $categoryId)->with('success', 'Producto añadido a la categoría.');
    }

    public function removeProduct($categoryId, $productId)
    {
        $category = Category::findOrFail($categoryId);
        $product = Product::findOrFail($productId);

        // Desasociar el producto de la categoría
        $category->products()->detach($product->id);

        return redirect()->route('categprod', $categoryId)->with('success', 'Producto eliminado de la categoría.');
    }
}
