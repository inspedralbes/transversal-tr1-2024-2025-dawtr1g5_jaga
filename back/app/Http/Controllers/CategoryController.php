<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() {
        return Category::all(); // Retorna totes les categories
    }

    public function show($id) {
        // Obtiene la categoría con sus productos relacionados
        $category = Category::with('products')->find($id);

        if (!$category) {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }

        return response()->json($category->products); // Devuelve solo los productos
    }

}
