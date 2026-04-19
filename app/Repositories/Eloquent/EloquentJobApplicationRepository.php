<?php

namespace App\Repositories\Eloquent;

use App\Models\JobApplication;
use App\Repositories\Interfaces\JobApplicationRepositoryInterface;

class EloquentJobApplicationRepository implements JobApplicationRepositoryInterface
{
    public function all($filters = [])
    {
        $query = JobApplication::with('job:id,title');

        if (!empty($filters['status'])) {
            $query->where('status', $filters['status']);
        }

        if (!empty($filters['job_id'])) {
            $query->where('job_id', $filters['job_id']);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function findById($id)
    {
        return JobApplication::with('job:id,title')->findOrFail($id);
    }

    public function create(array $data)
    {
        return JobApplication::create($data);
    }

    public function update($id, array $data)
    {
        $application = JobApplication::findOrFail($id);
        $application->update($data);

        return $application;
    }

    public function delete($id)
    {
        $application = JobApplication::findOrFail($id);
        $application->delete();

        return $application;
    }
}
