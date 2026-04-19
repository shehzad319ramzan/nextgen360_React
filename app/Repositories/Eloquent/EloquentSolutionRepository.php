<?php

namespace App\Repositories\Eloquent;

use App\Models\Solution;
use App\Repositories\Interfaces\SolutionRepositoryInterface;

class EloquentSolutionRepository implements SolutionRepositoryInterface
{
    public function all($includeInactive = false)
    {
        $query = Solution::query();

        if (!$includeInactive) {
            $query->where('active', true);
        }

        return $query->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
    }

    public function findByIdOrSlug($value)
    {
        return Solution::where('id', $value)
            ->orWhere('slug', $value)
            ->first();
    }

    public function create(array $data)
    {
        return Solution::create($data);
    }

    public function update($id, array $data)
    {
        $solution = Solution::findOrFail($id);
        $solution->update($data);

        return $solution;
    }

    public function delete($id)
    {
        $solution = Solution::findOrFail($id);
        $solution->delete();

        return $solution;
    }
}
