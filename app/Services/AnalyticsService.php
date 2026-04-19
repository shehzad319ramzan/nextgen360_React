<?php

namespace App\Services;

use App\Repositories\Interfaces\AnalyticsRepositoryInterface;

class AnalyticsService
{
    protected AnalyticsRepositoryInterface $analyticsRepo;

    public function __construct(AnalyticsRepositoryInterface $analyticsRepo)
    {
        $this->analyticsRepo = $analyticsRepo;
    }

    public function getDashboardData(): array
    {
        return $this->analyticsRepo->dashboard();
    }
}
