<?php

namespace App\Repositories\Interfaces;

interface ActivityLogRepositoryInterface
{
    public function all($resource = null);

    public function create(array $data);
}
