<?php

namespace App\Repositories\Eloquent;

use App\Models\ActionLog;
use App\Repositories\Interfaces\ActivityLogRepositoryInterface;

class EloquentActivityLogRepository implements ActivityLogRepositoryInterface
{
    public function all($resource = null)
    {
        $query = ActionLog::query();

        if ($resource) {
            $query->where('resource', $resource);
        }

        return $query->orderBy('created_at', 'desc')->get();
    }

    public function create(array $data)
    {
        return ActionLog::create($data);
    }
}
