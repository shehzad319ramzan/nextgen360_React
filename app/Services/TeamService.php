<?php

namespace App\Services;

use App\Repositories\Interfaces\TeamRepositoryInterface;

class TeamService
{
    protected TeamRepositoryInterface $teamRepo;

    public function __construct(TeamRepositoryInterface $teamRepo)
    {
        $this->teamRepo = $teamRepo;
    }

    public function getAll(bool $includeInactive = false): mixed
    {
        return $this->teamRepo->all($includeInactive);
    }

    public function create(array $data): mixed
    {
        $data['sort_order'] = $data['sort_order'] ?? 0;
        $data['active'] = $data['active'] ?? true;

        return $this->teamRepo->create($data);
    }

    public function update(int $id, array $data): mixed
    {
        return $this->teamRepo->update($id, $data);
    }

    public function delete(int $id): void
    {
        $this->teamRepo->delete($id);
    }
}
