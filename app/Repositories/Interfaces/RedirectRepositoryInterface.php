<?php

namespace App\Repositories\Interfaces;

interface RedirectRepositoryInterface
{
    public function all();

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);

    public function resolve($path);
}
