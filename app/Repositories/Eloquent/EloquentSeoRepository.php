<?php

namespace App\Repositories\Eloquent;

use App\Models\Seo;
use App\Repositories\Interfaces\SeoRepositoryInterface;

class EloquentSeoRepository implements SeoRepositoryInterface
{
    /**
     * The SEO fields that count toward the health score.
     */
    private const SCORED_FIELDS = [
        'title',
        'description',
        'keywords',
        'og_title',
        'og_description',
        'og_image',
        'twitter_title',
        'twitter_description',
        'twitter_image',
        'canonical',
        'schema_json',
    ];

    public function all()
    {
        return Seo::orderBy('page')->get();
    }

    public function findByPage($page)
    {
        return Seo::where('page', $page)->first();
    }

    public function createOrUpdate($page, array $data)
    {
        return Seo::updateOrCreate(
            ['page' => $page],
            $data
        );
    }

    public function healthCheck()
    {
        $pages = Seo::all();
        $results = [];

        foreach ($pages as $page) {
            $filled = 0;
            $missing = [];

            foreach (self::SCORED_FIELDS as $field) {
                if (!empty($page->{$field})) {
                    $filled++;
                } else {
                    $missing[] = $field;
                }
            }

            $results[] = [
                'page' => $page->page,
                'score' => round($filled / count(self::SCORED_FIELDS) * 100),
                'missing' => $missing,
            ];
        }

        return $results;
    }
}
