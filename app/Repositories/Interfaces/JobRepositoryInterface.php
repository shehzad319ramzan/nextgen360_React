<?php

namespace App\Repositories\Interfaces;

interface JobRepositoryInterface
{
    public function all($includeInactive = false);

    public function findById($id);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
