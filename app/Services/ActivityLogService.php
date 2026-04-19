<?php

namespace App\Services;

use App\Repositories\Interfaces\ActivityLogRepositoryInterface;

class ActivityLogService
{
    protected ActivityLogRepositoryInterface $logRepo;

    public function __construct(ActivityLogRepositoryInterface $logRepo)
    {
        $this->logRepo = $logRepo;
    }

    public function getAll(array $params = []): mixed
    {
        $resource = $params['resource'] ?? null;

        return $this->logRepo->all($resource);
    }

    public function log(array $data): mixed
    {
        return $this->logRepo->create($data);
    }
}
