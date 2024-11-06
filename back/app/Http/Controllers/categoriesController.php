<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class categoriesController extends Controller
{
    public function index() {
        return Category::all(); // Retorna totes les categories
    }
}