<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\FavoriteController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\POSController;

// Public routes
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);

// Product routes (public)
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/products/bestsellers/list', [ProductController::class, 'bestsellers']);

// Rating routes (public read)
Route::get('/products/{productId}/ratings', [RatingController::class, 'byProduct']);

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->group(function () {
    // Auth routes
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/user', [AuthController::class, 'user']);
    Route::get('/auth/profile', [AuthController::class, 'profile']);

    // Cart routes
    Route::get('/cart', [CartController::class, 'index']);
    Route::post('/cart', [CartController::class, 'store']);
    Route::put('/cart/{id}', [CartController::class, 'update']);
    Route::delete('/cart/{id}', [CartController::class, 'destroy']);
    Route::post('/cart/clear', [CartController::class, 'clear']);

    // Order routes
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    Route::get('/orders/{id}', [OrderController::class, 'show']);
    Route::post('/orders/{id}/cancel', [OrderController::class, 'cancel']);
    Route::post('/orders/{id}/tracking', [OrderController::class, 'addTracking']);

    // Wishlist/Favorite routes
    Route::get('/wishlist', [FavoriteController::class, 'index']);
    Route::post('/wishlist/toggle', [FavoriteController::class, 'toggle']);
    Route::get('/wishlist/check/{productId}', [FavoriteController::class, 'isInWishlist']);

    // Rating routes
    Route::post('/ratings', [RatingController::class, 'store']);
    Route::get('/ratings/user/my-ratings', [RatingController::class, 'userRatings']);
    Route::delete('/ratings/{id}', [RatingController::class, 'destroy']);
});

// Admin routes
Route::middleware(['auth:sanctum', 'is_admin'])->group(function () {
    // Product management
    Route::post('/products', [ProductController::class, 'store']);
    Route::put('/products/{id}', [ProductController::class, 'update']);
    Route::delete('/products/{id}', [ProductController::class, 'destroy']);

    // Order management
    Route::put('/orders/{id}/status', [OrderController::class, 'updateStatus']);
    Route::post('/orders/{id}/delivered', [OrderController::class, 'delivered']);
});

// POS routes (can be public or protected as needed)
Route::prefix('pos')->group(function () {
    Route::post('/transactions', [POSController::class, 'store']);
    Route::get('/transactions', [POSController::class, 'index']);
    Route::get('/transactions/{id}', [POSController::class, 'show']);
    Route::get('/transactions/{id}/receipt', [POSController::class, 'receipt']);
    Route::get('/daily-report', [POSController::class, 'dailyReport']);
});

// Health check
Route::get('/health', function () {
    return response()->json(['status' => 'ok'], 200);
});
