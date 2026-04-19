<?php

namespace App\Services;

use App\Repositories\Interfaces\CaseStudyRepositoryInterface;
use Exception;

class CaseStudyService
{
    protected CaseStudyRepositoryInterface $repo;

    public function __construct(CaseStudyRepositoryInterface $repo)
    {
        $this->repo = $repo;
    }

    public function getAll(bool $includeInactive = false, bool $featuredOnly = false, ?string $industry = null): mixed
    {
        return $this->repo->all($includeInactive, $featuredOnly, $industry);
    }

    public function findByIdOrSlug(string $value): mixed
    {
        $item = $this->repo->findByIdOrSlug($value);

        if (!$item) {
            throw new Exception('Not found', 404);
        }

        return $item;
    }

    public function create(array $data): mixed
    {
        $data['active'] = $data['active'] ?? true;
        $data['featured'] = $data['featured'] ?? false;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $this->repo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->repo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->repo->delete($id);
    }
}
