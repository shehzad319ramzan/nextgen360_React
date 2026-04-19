<?php

namespace App\Repositories\Interfaces;

interface SeoRepositoryInterface
{
    public function all();

    public function findByPage($page);

    public function createOrUpdate($page, array $data);

    public function healthCheck();
}
