<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ArchivesResource extends JsonResource
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

            'total_task' => $this->count(),
            'total_completed' => $this->where('completed', 1)->count(),
            'total_pending' => $this->where('completed', 0)->count()
        ];
    }
}
