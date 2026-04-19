<?php

namespace App\Repositories\Eloquent;

use App\Models\Testimonial;
use App\Repositories\Interfaces\TestimonialRepositoryInterface;

class EloquentTestimonialRepository implements TestimonialRepositoryInterface
{
    public function all($includeInactive = false)
    {
        $query = Testimonial::query();

        if (!$includeInactive) {
            $query->where('active', true);
        }

        return $query->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
    }

    public function create(array $data)
    {
        return Testimonial::create($data);
    }

    public function update($id, array $data)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->update($data);

        return $testimonial;
    }

    public function delete($id)
    {
        $testimonial = Testimonial::findOrFail($id);
        $testimonial->delete();

        return $testimonial;
    }
}
