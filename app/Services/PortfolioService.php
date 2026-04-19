<?php

namespace App\Services;

use App\Repositories\Interfaces\PortfolioRepositoryInterface;
use Exception;

class PortfolioService
{
    protected PortfolioRepositoryInterface $portfolioRepo;

    public function __construct(PortfolioRepositoryInterface $portfolioRepo)
    {
        $this->portfolioRepo = $portfolioRepo;
    }

    public function getAll(bool $includeInactive = false, ?string $category = null): mixed
    {
        return $this->portfolioRepo->all($includeInactive, $category);
    }

    public function findByIdOrSlug(string $value): mixed
    {
        $item = $this->portfolioRepo->findByIdOrSlug($value);

        if (!$item) {
            throw new Exception('Not found', 404);
        }

        return $item;
    }

    public function create(array $data): mixed
    {
        $data['active'] = $data['active'] ?? true;
        $data['sort_order'] = $data['sort_order'] ?? 0;

        return $this->portfolioRepo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->portfolioRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->portfolioRepo->delete($id);
    }
}
