<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/productes', function () {
    $json = File::get(storage_path('../database/data/products.json'));

    // Decodificar el JSON en un array PHP
    $productes = json_decode($json, true);

    // Pasar los productos a la vista
    return view('productes', ['productes' => $productes]);
});




