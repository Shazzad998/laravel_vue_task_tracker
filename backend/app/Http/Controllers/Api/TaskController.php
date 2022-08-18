<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\tasks\TaskStoreRequest;
use App\Http\Requests\tasks\TaskUpdateRequest;
use App\Http\Resources\TaskResource;
use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function tasks_by_date($date)
    {
        if($date == 'today'){
            $date = today();
        }
        $dateFormat = Carbon::create($date)->format("Y-m-d");
        $tasks = Task::where('created_at','LIKE', "$dateFormat%" )->orWhere('deadline', '>', today())->paginate(5);

        return TaskResource::collection($tasks);
    }


    public function pendingTasks()
    {
        $pendingTasks = Task::where('completed', 0)->where('created_at', '<', today())->orderBy('created_at')->get();
        return TaskResource::collection($pendingTasks);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( TaskStoreRequest $request)
    {
        $task = Task::create($request->validated());
        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show(Task $task)
    {
        return new TaskResource($task);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(TaskUpdateRequest $request, Task $task)
    {
        $task->update($request->validated());
        return new TaskResource($task);
    }

    public function updateStatus(Request $request, Task $task)
    {
        $task->update([
            'completed' => $request->completed
        ]);
        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy(Task $task)
    {
        $task->delete();
        return response()->noContent();
    }
}
