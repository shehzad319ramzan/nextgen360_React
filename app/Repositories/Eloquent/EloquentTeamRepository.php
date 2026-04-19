<?php

namespace App\Repositories\Eloquent;

use App\Models\TeamMember;
use App\Repositories\Interfaces\TeamRepositoryInterface;

class EloquentTeamRepository implements TeamRepositoryInterface
{
    public function all($includeInactive = false)
    {
        $query = TeamMember::query();

        if (!$includeInactive) {
            $query->where('active', true);
        }

        return $query->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
    }

    public function create(array $data)
    {
        return TeamMember::create($data);
    }

    public function update($id, array $data)
    {
        $member = TeamMember::findOrFail($id);
        $member->update($data);

        return $member;
    }

    public function delete($id)
    {
        $member = TeamMember::findOrFail($id);
        $member->delete();

        return $member;
    }
}
