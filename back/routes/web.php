<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\cartController;
use App\Http\Controllers\comandaController;

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
    return view('index');
})->name('index');

Route::get('/crud', [ProductController::class, 'index'])->name('crud');
Route::get('/orders', [cartController::class, 'index'])->name('index');
Route::get('/comandes/{id}', [ComandaController::class, 'show'])->name('comandes');

Route::get('/products', [ProductController::class,'index'])->name('products.index');
Route::post('/products', [ProductController::class,'store'])->name('products.store');
Route::get('/products/{id}', [ProductController::class,'show'])->name('products.show');
Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::put('/products/{id}', [ProductController::class,'update'])->name('products.update');
Route::delete('/products/{id}', [ProductController::class,'destroy'])->name('products.destroy');

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);


