<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * index per mostrar tots els productes
     * create per inserir un nou producte
     * update per actulitzar producte
     * destroy per eliminar un producte
    */

    //veure tots els productes
    public function index()
    {
        $products = Product::all(); 
        return view('index', compact('products')); 
    }


}
