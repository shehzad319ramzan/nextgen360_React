<?php

namespace App\Services;

use App\Repositories\Interfaces\BlogRepositoryInterface;
use Illuminate\Support\Str;

class BlogService
{
    protected BlogRepositoryInterface $blogRepo;

    public function __construct(BlogRepositoryInterface $blogRepo)
    {
        $this->blogRepo = $blogRepo;
    }

    public function getAll(bool $isAuthenticated = false): mixed
    {
        return $this->blogRepo->all($isAuthenticated);
    }

    public function findBySlug(string $slug): mixed
    {
        return $this->blogRepo->findBySlug($slug);
    }

    public function create(array $data): mixed
    {
        $slug = Str::slug($data['title']);

        if ($this->blogRepo->slugExists($slug)) {
            $slug = $slug . '-' . time();
        }

        $data['slug'] = $slug;
        $data['status'] = $data['status'] ?? 'draft';

        return $this->blogRepo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->blogRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->blogRepo->delete($id);
    }
}
