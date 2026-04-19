<?php

namespace App\Services;

use App\Repositories\Interfaces\JobApplicationRepositoryInterface;
use Exception;

class JobApplicationService
{
    protected JobApplicationRepositoryInterface $applicationRepo;

    public function __construct(JobApplicationRepositoryInterface $applicationRepo)
    {
        $this->applicationRepo = $applicationRepo;
    }

    public function getAll(array $filters = []): mixed
    {
        return $this->applicationRepo->all($filters);
    }

    public function find(int $id): mixed
    {
        $application = $this->applicationRepo->findById($id);

        if (!$application) {
            throw new Exception('Not found', 404);
        }

        return $application;
    }

    public function create(array $data): mixed
    {
        $data['status'] = $data['status'] ?? 'new';

        return $this->applicationRepo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->applicationRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $application = $this->applicationRepo->findById($id);

        if ($application && $application->resume_url) {
            $filePath = public_path($application->resume_url);
            if (file_exists($filePath)) {
                unlink($filePath);
            }
        }

        $this->applicationRepo->delete($id);
    }
}
