<?php

namespace App\Repositories\Interfaces;

interface SolutionRepositoryInterface
{
    public function all($includeInactive = false);
    public function findByIdOrSlug($value);
    public function create(array $data);
    public function update($id, array $data);
    public function delete($id);
}
