<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/productes', function () {
    $json = File::get(storage_path('../database/data/products.json'));

    $productes = json_decode($json, true);

    return view('productes', ['productes' => $productes]);
});




