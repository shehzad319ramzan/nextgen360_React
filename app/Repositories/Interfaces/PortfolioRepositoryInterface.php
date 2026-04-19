<?php

namespace App\Repositories\Interfaces;

interface PortfolioRepositoryInterface
{
    public function all($includeInactive = false, $category = null);

    public function findByIdOrSlug($value);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
