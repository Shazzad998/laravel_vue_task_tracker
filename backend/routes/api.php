<?php

use App\Http\Controllers\Api\ArchivesController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\AuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function(Request $request) {
        return $request->user();
    });

    Route::post('/logout', [AuthController::class, 'logout']);
    Route::apiResource('/categories', CategoryController::class);
    Route::put('tasks/status/{task}', [TaskController::class, 'updateStatus']);

    Route::get('/dashboard-pending-tasks', [DashboardController::class , 'pendingTasks']);
    Route::get('/archives' , [ArchivesController::class, 'index']);
    Route::get('/pending-tasks' , [TaskController::class, 'pendingTasks']);


});


Route::get('/stats', [DashboardController::class , 'stats']);
Route::apiResource('/tasks', TaskController::class)->except('index');

Route::get('/tasks/tasks_by_date/{date}' , [TaskController::class, 'tasks_by_date']);



Route::post('/register', [AuthController::class , 'register'])->name('register');
Route::post('/login', [AuthController::class , 'login'])->name('login');
