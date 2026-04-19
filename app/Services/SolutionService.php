<?php

namespace App\Services;

use App\Repositories\Interfaces\SolutionRepositoryInterface;

class SolutionService
{
    public function __construct(
        private SolutionRepositoryInterface $solutionRepo
    ) {}

    public function getAll(bool $includeInactive = false)
    {
        return $this->solutionRepo->all($includeInactive);
    }

    public function findByIdOrSlug(string $value)
    {
        return $this->solutionRepo->findByIdOrSlug($value);
    }

    public function create(array $data)
    {
        $data['active'] = $data['active'] ?? true;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $this->solutionRepo->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->solutionRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->solutionRepo->delete($id);
    }
}
