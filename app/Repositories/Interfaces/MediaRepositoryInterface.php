<?php

namespace App\Repositories\Interfaces;

interface MediaRepositoryInterface
{
    public function upload($file);

    public function all();

    public function delete($filename);
}
