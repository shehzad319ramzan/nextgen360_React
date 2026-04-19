<?php

namespace App\Repositories\Eloquent;

use App\Models\CaseStudy;
use App\Repositories\Interfaces\CaseStudyRepositoryInterface;

class EloquentCaseStudyRepository implements CaseStudyRepositoryInterface
{
    public function all($includeInactive = false, $featuredOnly = false, $industry = null)
    {
        $query = CaseStudy::query();

        if (!$includeInactive) {
            $query->where('active', true);
        }

        if ($featuredOnly) {
            $query->where('featured', true);
        }

        if ($industry) {
            $query->where('industry', $industry);
        }

        return $query->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
    }

    public function findByIdOrSlug($value)
    {
        return CaseStudy::where('id', $value)
            ->orWhere('slug', $value)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return CaseStudy::create($data);
    }

    public function update($id, array $data)
    {
        $item = CaseStudy::findOrFail($id);
        $item->update($data);

        return $item;
    }

    public function delete($id)
    {
        $item = CaseStudy::findOrFail($id);
        $item->delete();

        return $item;
    }
}
