<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\comandaController;
use App\Http\Controllers\CategoryController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/adminer', function () {
    return view('app');
});

Route::get('/crud', [ProductController::class, 'index'])->name('crud');
Route::get('/comandes', [cartController::class, 'index'])->name('index');
Route::get('/comandes/{id}', [ComandaController::class, 'show'])->name('comandes');

Route::get('/categories', [CategoryController::class, 'index'])->name('categories');
Route::get('/categories/{id}', [CategoryController::class, 'show'])->name('categprod');
Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');
Route::post('/categories/{id}/add-product', [CategoryController::class, 'addProduct'])->name('categories.product.add');
Route::delete('/categories/{id}', [CategoryController::class, 'destroy'])->name('categories.destroy');Route::delete('/categories/{categoryId}/products/{productId}', [CategoryController::class, 'removeProduct'])->name('categories.product.remove');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::post('/products', [ProductController::class, 'store'])->name('products.store');
Route::get('/products/{id}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/{id}/edit', [ProductController::class, 'edit'])->name('products.edit');
Route::put('/products/{id}', [ProductController::class,'update'])->name('products.update');
Route::delete('/products/{id}', [ProductController::class,'destroy'])->name('products.destroy');

Route::post('/register', [RegisteredUserController::class, 'store']);
Route::post('/login', [AuthenticatedSessionController::class, 'store']);
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);



Route::get('/comandes/{id}', [comandaController::class, 'show'])->name('comandes.show');
Route::post('comandes/{id}/update-status', [comandaController::class, 'updateStatus'])->name('comandes.updateStatus');