<?php

use Illuminate\Http\Request;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\cartController;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/products', [ProductController::class,'index']);
Route::post('/products', [ProductController::class,'store']);
Route::get('/products/{id}', [ProductController::class,'show']);
Route::put('/products/{id}', [ProductController::class,'update']);
Route::delete('/products/{id}', [ProductController::class,'destroy']);

Route::get('/orders', [CartController::class, 'index']);
Route::post('/createOrder', [CartController::class, 'create']);
 
// Route::get('/checkout', function (Request $request) {
//     $stripePriceId = 'price_deluxe_album';
 
//     $quantity = 1;
 
//     return $request->user()->checkout([$stripePriceId => $quantity], [
//         'success_url' => route('checkout-success'),
//         'cancel_url' => route('checkout-cancel'),
//     ]);
// })->name('checkout');
 
// Route::view('/checkout/success', 'checkout.success')->name('checkout-success');
// Route::view('/checkout/cancel', 'checkout.cancel')->name('checkout-cancel');