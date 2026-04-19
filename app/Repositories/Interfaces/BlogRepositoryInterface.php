<?php

namespace App\Repositories\Interfaces;

interface BlogRepositoryInterface
{
    public function all($authUserId = null);

    public function findBySlug($slug);

    public function slugExists(string $slug): bool;

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
