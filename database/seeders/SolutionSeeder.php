<?php

namespace Database\Seeders;

use App\Models\Solution;
use Illuminate\Database\Seeder;

class SolutionSeeder extends Seeder
{
    public function run(): void
    {
        $solutions = [
            [
                'title' => 'Bello',
                'slug' => 'bello',
                'tagline' => 'Order Smart. Eat Fresh.',
                'sort_order' => 1,
            ],
            [
                'title' => 'WorkzenPro',
                'slug' => 'workzenpro',
                'tagline' => 'Plan Better. Work Smarter.',
                'sort_order' => 2,
            ],
            [
                'title' => 'EchoCRM',
                'slug' => 'echocrm',
                'tagline' => 'Where Sales Meet Strategy.',
                'sort_order' => 3,
            ],
            [
                'title' => 'NowSafar',
                'slug' => 'nowsafar',
                'tagline' => 'Unify. Optimize. Grow.',
                'sort_order' => 4,
            ],
            [
                'title' => 'Plannza',
                'slug' => 'plannza',
                'tagline' => 'Unify. Optimize. Grow.',
                'sort_order' => 5,
            ],
            [
                'title' => 'Yaranty',
                'slug' => 'yaranty',
                'tagline' => 'Warranty & Claim Management',
                'sort_order' => 6,
            ],
        ];

        foreach ($solutions as $s) {
            Solution::firstOrCreate(['slug' => $s['slug']], $s);
        }
    }
}
