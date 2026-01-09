<?php

namespace App\Http\Resources;


use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray($request): array
    {
        $price = (float) ($this->price ?? 0);
        $discount = (float) ($this->discount_percent ?? 0);

        $finalPrice = $this->is_free
            ? 0
            : round($price - ($price * $discount / 100), 2);
        return  [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'thumbnail' => $this->thumbnail,
            'price' => $this->price,
            'discount_percent' => $this->discount_percent,
            "final_price" => $finalPrice,
            'is_free' => (bool)  $this->is_free,
            'category' => $this->category?->name,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
