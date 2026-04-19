<?php

namespace App\Repositories\Eloquent;

use App\Models\Portfolio;
use App\Repositories\Interfaces\PortfolioRepositoryInterface;

class EloquentPortfolioRepository implements PortfolioRepositoryInterface
{
    public function all($includeInactive = false, $category = null)
    {
        $query = Portfolio::query();

        if (!$includeInactive) {
            $query->where('active', true);
        }

        if ($category) {
            $query->where('category', $category);
        }

        return $query->orderBy('sort_order')->orderBy('created_at', 'desc')->get();
    }

    public function findByIdOrSlug($value)
    {
        return Portfolio::where('id', $value)
            ->orWhere('slug', $value)
            ->firstOrFail();
    }

    public function create(array $data)
    {
        return Portfolio::create($data);
    }

    public function update($id, array $data)
    {
        $portfolio = Portfolio::findOrFail($id);
        $portfolio->update($data);

        return $portfolio;
    }

    public function delete($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        $portfolio->delete();

        return $portfolio;
    }
}
