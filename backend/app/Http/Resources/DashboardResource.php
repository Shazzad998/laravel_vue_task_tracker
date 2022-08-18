<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class DashboardResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $total_task = $this->tasks()->count();
        $total_completed = $this->tasks->where('completed', 1)->count();
        $total_pending =$this->tasks->where('completed', 0)->count();
        $completion_rate = ($total_task !== 0) ? round(($total_completed*100)/$total_task) : 0;


        return [
            'id' => $this->id,
            'name'=> $this->name,
            'total_task' =>$total_task,
            'total_completed' => $total_completed,
            'total_pending' => $total_pending,
            'completion_rate' =>$completion_rate



        ];
    }
}
