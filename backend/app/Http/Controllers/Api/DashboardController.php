<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource;
use App\Http\Resources\TaskResource;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function stats()
    {
        $categories = Category::with('tasks')->get();
        return DashboardResource::collection($categories);
    }

    public function pendingTasks()
    {
        $pending_tasks = Task::where('created_at', '<', today())
                                ->where('completed', 0)
                                ->with('category')
                                ->get();

        return TaskResource::collection($pending_tasks);
    }

}
