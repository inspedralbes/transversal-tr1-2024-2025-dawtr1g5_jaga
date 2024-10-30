<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\orderfinal;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;


// app/Http/Controllers/ComandaController.php

use App\Models\Orders;

class comandaController extends Controller
{
    public function index()
    {
        $orders = Orders::with('product')->get();
        return view('index', compact('orders'));
    }

    public function show($id)
    {
        $order = orderfinal::findOrFail($id);
        $products = $order->orders;

        return view('comandes', compact('products'));
    }

}

