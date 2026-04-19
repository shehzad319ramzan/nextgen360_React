<?php

namespace App\Repositories\Interfaces;

interface TestimonialRepositoryInterface
{
    public function all($includeInactive = false);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
