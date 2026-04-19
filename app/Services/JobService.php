<?php

namespace App\Services;

use App\Repositories\Interfaces\JobRepositoryInterface;
use Exception;

class JobService
{
    protected JobRepositoryInterface $jobRepo;

    public function __construct(JobRepositoryInterface $jobRepo)
    {
        $this->jobRepo = $jobRepo;
    }

    public function getAll(bool $includeInactive = false): mixed
    {
        return $this->jobRepo->all($includeInactive);
    }

    public function find(int $id): mixed
    {
        $job = $this->jobRepo->findById($id);

        if (!$job) {
            throw new Exception('Not found', 404);
        }

        return $job;
    }

    public function create(array $data): mixed
    {
        $data['type'] = $data['type'] ?? 'Full-time';
        $data['location'] = $data['location'] ?? 'Nottingham, UK';
        $data['active'] = $data['active'] ?? true;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $this->jobRepo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->jobRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->jobRepo->delete($id);
    }
}
