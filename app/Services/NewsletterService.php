<?php

namespace App\Services;

use App\Repositories\Interfaces\NewsletterRepositoryInterface;

class NewsletterService
{
    protected NewsletterRepositoryInterface $newsletterRepo;

    public function __construct(NewsletterRepositoryInterface $newsletterRepo)
    {
        $this->newsletterRepo = $newsletterRepo;
    }

    public function getAll(array $params = []): mixed
    {
        return $this->newsletterRepo->all();
    }

    public function subscribe(array $data): mixed
    {
        $data['source'] = $data['source'] ?? 'website';

        return $this->newsletterRepo->subscribe($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->newsletterRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->newsletterRepo->delete($id);
    }

    public function exportCsv(): string
    {
        $subscribers = $this->newsletterRepo->activeSubscribers();

        $lines = ['email,name,source,subscribed_at'];

        foreach ($subscribers as $sub) {
            $name = str_replace(',', ' ', $sub->name ?? '');
            $lines[] = "{$sub->email},{$name},{$sub->source},{$sub->created_at}";
        }

        return implode("\n", $lines);
    }
}
