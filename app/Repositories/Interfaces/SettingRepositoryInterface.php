<?php

namespace App\Repositories\Interfaces;

interface SettingRepositoryInterface
{
    public function all();

    public function get($key);

    public function set($key, $value);

    public function setMany(array $data, array $allowed);

    public function getPublicSite();
}
