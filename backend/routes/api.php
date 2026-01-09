<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// 

/**
 * auth route
 */
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

/**
 * PUBLIC ROUTE
 */
Route::get('/categories',[CategoryController::class,"index"]);

//course
Route::get('/courses', [CourseController::class, 'index']);
Route::get('/courses/{id}',[CourseController::class,"find"]);


/**
 * Protect route
 * Admin only
 */
Route::middleware(['auth:api', 'role:admin'])->group(function() {
    /**
     * User Route 
     */
    Route::get('/users', [UserController::class, 'index']);

    // Category
    Route::post('/categories',[CategoryController::class,"store"]);
    Route::patch('/categories/{id}',[CategoryController::class, "update"]);
    Route::delete('/categories/{id}',[CategoryController::class, "destroy"]);
    
    // Course
    Route::post('/courses',[CourseController::class,"store"]);
    Route::patch('/courses/{id}',[CourseController::class,"update"]);
    Route::delete('/courses/{id}',[CourseController::class,"destroy"]);

});
