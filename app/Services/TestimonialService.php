<?php

namespace App\Services;

use App\Repositories\Interfaces\TestimonialRepositoryInterface;

class TestimonialService
{
    protected TestimonialRepositoryInterface $testimonialRepo;

    public function __construct(TestimonialRepositoryInterface $testimonialRepo)
    {
        $this->testimonialRepo = $testimonialRepo;
    }

    public function getAll(bool $includeInactive = false): mixed
    {
        return $this->testimonialRepo->all($includeInactive);
    }

    public function publicSubmit(array $data): mixed
    {
        $data['active'] = false;
        $data['sort_order'] = 0;
        $data['rating'] = $data['rating'] ?? 5;

        return $this->testimonialRepo->create($data);
    }

    public function create(array $data): mixed
    {
        $data['active'] = $data['active'] ?? true;
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['rating'] = $data['rating'] ?? 5;

        return $this->testimonialRepo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->testimonialRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->testimonialRepo->delete($id);
    }
}
