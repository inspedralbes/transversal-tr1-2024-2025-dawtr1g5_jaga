<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\cartController;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class,'index']);
Route::post('/products', [ProductController::class,'store']);
Route::get('/products/{id}', [ProductController::class,'show']);
Route::put('/products/{id}', [ProductController::class,'update']);
Route::delete('/products/{id}', [ProductController::class,'destroy']);
Route::put('/updateStock/{id}',[ProductController::class,'updateStock']);
Route::get('/productsearch',[ProductController::class, 'search']);

Route::get('/orders', [CartController::class, 'index']);
Route::post('/createOrderLogged', [CartController::class, 'createOrderLogged'])->middleware('auth:sanctum');
Route::post('/createOrderUnlogged', [CartController::class, 'createOrderUnlogged']);
Route::get('/myOrders', [CartController::class, 'show'])->middleware('auth:sanctum');

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// Categories
Route::get('/categories', [CategoryController::class,'index']);
Route::get('/productsCateg/{id}', [CategoryController::class,'show']);