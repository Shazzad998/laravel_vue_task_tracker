<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TaskResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'category_id' => $this->category->id,
            'category_name' => $this->category->name,
            'description' => $this->description,
            'deadline' => $this->deadline? date('Y-m-d\TH:i', strtotime($this->deadline)) : null,
            'deadline_formatted' => $this->deadline? $this->deadline->toFormattedDateString() : null,
            'priority' => $this->priority,
            'completed' => $this->completed? true : false,
            'created_at' => $this->created_at->toFormattedDateString()
        ];
    }
}
