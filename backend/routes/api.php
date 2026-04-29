<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PollController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/update', [AuthController::class, 'updateProfile']);
    Route::put('/user/password', [AuthController::class, 'updatePassword']);
    Route::delete('/user/delete', [AuthController::class, 'deleteAccount']);
    Route::get('/user', function (Request $request)
    {
        return $request->user();
    });

    Route::patch('polls/{poll}/close', [PollController::class, 'close']);
    Route::patch('polls/{poll}/pause', [PollController::class, 'pause']);
    Route::patch('polls/{poll}/open', [PollController::class, 'open']);
    Route::apiResource('polls', PollController::class);
});
