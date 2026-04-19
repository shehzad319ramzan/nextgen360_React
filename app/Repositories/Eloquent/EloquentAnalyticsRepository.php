<?php

namespace App\Repositories\Eloquent;

use App\Models\Blog;
use App\Models\Inquiry;
use App\Models\JobPosting;
use App\Models\NewsletterSubscriber;
use App\Repositories\Interfaces\AnalyticsRepositoryInterface;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class EloquentAnalyticsRepository implements AnalyticsRepositoryInterface
{
    public function dashboard()
    {
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        // Inquiries by day (last 30 days)
        $inquiriesByDay = Inquiry::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', $thirtyDaysAgo)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->toArray();

        // Inquiries by category
        $byCategory = Inquiry::select('category', DB::raw('COUNT(*) as count'))
            ->groupBy('category')
            ->get()
            ->toArray();

        // Inquiries by status
        $byStatus = Inquiry::select('status', DB::raw('COUNT(*) as count'))
            ->groupBy('status')
            ->get()
            ->toArray();

        // Totals
        $totals = [
            'inquiries' => Inquiry::count(),
            'new_inquiries' => Inquiry::where('status', 'new')->count(),
            'blogs_published' => Blog::where('status', 'published')->count(),
            'subscribers' => NewsletterSubscriber::where('active', true)->count(),
            'jobs_active' => JobPosting::where('active', true)->count(),
        ];

        return [
            'inquiriesByDay' => $inquiriesByDay,
            'byCategory' => $byCategory,
            'byStatus' => $byStatus,
            'totals' => $totals,
        ];
    }
}
