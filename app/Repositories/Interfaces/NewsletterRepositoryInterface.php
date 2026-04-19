<?php

namespace App\Repositories\Interfaces;

interface NewsletterRepositoryInterface
{
    public function all();

    public function subscribe(array $data);

    public function update($id, array $data);

    public function delete($id);

    public function export();

    public function activeSubscribers();
}
