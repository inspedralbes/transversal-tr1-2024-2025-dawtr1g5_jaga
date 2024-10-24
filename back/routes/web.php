<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/adminer', function () {
    return view('app');
});

Route::get('/crud', function () {
    return view('crud');
})->name('crud');

Route::get('/comandes', function () {
    return view('comandes.index');
})->name('comandes.index');

Route::get('/crud', [ProductController::class, 'index'])->name('crud');

Route::get('/products', [ProductController::class,'index'])->name('products.index');
Route::post('/products', [ProductController::class,'store'])->name('products.store');
Route::get('/products/{id}', [ProductController::class,'show'])->name('products.show');
Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::put('/products/{id}', [ProductController::class,'update'])->name('products.update');
Route::delete('/products/{id}', [ProductController::class,'destroy'])->name('products.destroy');
