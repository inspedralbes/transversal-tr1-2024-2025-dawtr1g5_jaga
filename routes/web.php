<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

<<<<<<< HEAD
Route::get('/productes', function () {
    $json = File::get(storage_path('../database/data/products.json'));

    $productes = json_decode($json, true);

    return view('productes', ['productes' => $productes]);
});




=======
//Ruta al crud
Route::get('/back', function () {
    return view('crud');
});

Route::get('/cart', function () {
    
    return view('cart');
});
>>>>>>> 6cd2f8d105a290ac2427f6ada3a47c00ddf71c26
