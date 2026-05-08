<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PollController;
use App\Http\Controllers\PublicPollController;

Route::post('/register', [AuthController::class, 'register'])->middleware('throttle:register');
Route::post('/login', [AuthController::class, 'login'])->middleware('throttle:login');

Route::get('/public/polls', [PublicPollController::class, 'index']);
Route::get('/public/polls/{poll}', [PublicPollController::class, 'show']);
Route::post('/public/polls/{poll}/respond', [PublicPollController::class, 'respond']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/update', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'updatePassword']);
    Route::delete('/user/delete', [AuthController::class, 'deleteAccount']);
    Route::get('/user', function (Request $request)
    {
        return $request->user();
    });

    Route::middleware('admin')->group(function () {
        Route::get('/admin/stats',           [AdminController::class, 'stats']);
        Route::get('/admin/users',           [AdminController::class, 'users']);
        Route::get('/admin/polls',           [AdminController::class, 'polls']);
        Route::delete('/admin/users/{user}', [AdminController::class, 'destroyUser']);
        Route::delete('/admin/polls/{poll}', [AdminController::class, 'destroyPoll']);
    });

    Route::patch('polls/{poll}/close', [PollController::class, 'close']);
    Route::patch('polls/{poll}/pause', [PollController::class, 'pause']);
    Route::patch('polls/{poll}/open', [PollController::class, 'open']);
    Route::get('polls/{poll}/export', [PollController::class, 'export']);
    Route::apiResource('polls', PollController::class);
});
