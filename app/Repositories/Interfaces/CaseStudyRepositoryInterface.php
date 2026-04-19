<?php

namespace App\Repositories\Interfaces;

interface CaseStudyRepositoryInterface
{
    public function all($includeInactive = false, $featuredOnly = false, $industry = null);

    public function findByIdOrSlug($value);

    public function create(array $data);

    public function update($id, array $data);

    public function delete($id);
}
