<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\OrderController;
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

    //Lesson
    Route::get('/lessons',[LessonController::class,"index"]);
    Route::post('/lessons',[LessonController::class,"store"]);
    Route::patch('/lessons/{id}',[LessonController::class,"update"]);
    Route::delete('/lessons/{id}',[LessonController::class,"destroy"]);

    //Order
    Route::get('/orders',[OrderController::class,'index']);
    Route::post('/orders',[OrderController::class,'createOrder']);
});

/**
 * Protect Route
 * User
 */
Route::middleware(['auth:api'])->group(function () {
    Route::get('/courses/{course_id}/lessons', [LessonController::class, 'getCourseLesson'])->middleware('course.access');
    //create order
    Route::post('/orders',[OrderController::class,'createOrder']);
});
    