<?php

namespace App\Repositories\Eloquent;

use App\Models\JobPosting;
use App\Repositories\Interfaces\JobRepositoryInterface;

class EloquentJobRepository implements JobRepositoryInterface
{
    public function all($includeInactive = false)
    {
        $query = JobPosting::query();

        if (!$includeInactive) {
            $query->where('active', true);
        }

        return $query->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
    }

    public function findById($id)
    {
        return JobPosting::findOrFail($id);
    }

    public function create(array $data)
    {
        return JobPosting::create($data);
    }

    public function update($id, array $data)
    {
        $job = JobPosting::findOrFail($id);
        $job->update($data);

        return $job;
    }

    public function delete($id)
    {
        $job = JobPosting::findOrFail($id);
        $job->delete();

        return $job;
    }
}
