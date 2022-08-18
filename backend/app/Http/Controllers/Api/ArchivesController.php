<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ArchivesResource;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ArchivesController extends Controller
{
    public function index()
    {
        $tasks = Task::where('created_at', '<', today())->orderBy('created_at')->get()->groupBy(function($item) {
            return $item->created_at->toFormattedDateString();
       });

       return ArchivesResource::collection($tasks);
    }

    public function day_task($date)
    {
        if($date === '0'){
            $date = today();
        }
        $dateFormat = Carbon::create($date)->format("Y-m-d");
        $tasks = Task::where('created_at','LIKE', "$dateFormat%" )->paginate(5);

        return TaskResource::collection($tasks);
    }
}
