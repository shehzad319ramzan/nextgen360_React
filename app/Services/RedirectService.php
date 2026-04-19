<?php

namespace App\Services;

use App\Repositories\Interfaces\RedirectRepositoryInterface;

class RedirectService
{
    protected RedirectRepositoryInterface $redirectRepo;

    public function __construct(RedirectRepositoryInterface $redirectRepo)
    {
        $this->redirectRepo = $redirectRepo;
    }

    public function all(): mixed
    {
        return $this->redirectRepo->all();
    }

    public function create(array $data): mixed
    {
        if (!str_starts_with($data['from_path'], '/')) {
            $data['from_path'] = '/' . $data['from_path'];
        }

        $data['type'] = (int) ($data['type'] ?? 301);

        return $this->redirectRepo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->redirectRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->redirectRepo->delete($id);
    }

    public function resolve(string $path): ?array
    {
        $redirect = $this->redirectRepo->findActiveByPath($path);

        if (!$redirect) {
            return ['found' => false];
        }

        $this->redirectRepo->incrementHits($redirect->id);

        return [
            'found' => true,
            'to' => $redirect->to_path,
            'type' => $redirect->type,
        ];
    }
}
