<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

//Ruta al crud
Route::get('/back', function () {
    return view('crud');
});

Route::get('/cart', function () {
    
    return view('cart');
});
