<?php

namespace App\Repositories\Eloquent;

use App\Models\CustomEvent;
use App\Models\PageView;
use App\Models\TrackedEvent;
use App\Repositories\Interfaces\TrackingRepositoryInterface;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;

class EloquentTrackingRepository implements TrackingRepositoryInterface
{
    public function recordPageView(array $data)
    {
        return PageView::create($data);
    }

    public function recordEvent(array $data)
    {
        return CustomEvent::create($data);
    }

    public function getActiveEvents()
    {
        return TrackedEvent::where('active', true)->get();
    }

    public function getStats($days)
    {
        $since = Carbon::now()->subDays($days);

        // Total views
        $totalViews = PageView::where('created_at', '>=', $since)->count();

        // Unique visitors (by session_id)
        $uniqueVisitors = PageView::where('created_at', '>=', $since)
            ->distinct('session_id')
            ->count('session_id');

        // Live visitors (last 5 minutes)
        $fiveMinutesAgo = Carbon::now()->subMinutes(5);
        $liveVisitors = PageView::where('created_at', '>=', $fiveMinutesAgo)
            ->distinct('session_id')
            ->count('session_id');

        // Views by day
        $viewsByDay = PageView::select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', $since)
            ->groupBy(DB::raw('DATE(created_at)'))
            ->orderBy('date')
            ->get()
            ->toArray();

        // Top pages
        $topPages = PageView::select('path', DB::raw('COUNT(*) as count'))
            ->where('created_at', '>=', $since)
            ->groupBy('path')
            ->orderByDesc('count')
            ->limit(10)
            ->get()
            ->toArray();

        // Top referrers
        $topReferrers = PageView::select('referrer', DB::raw('COUNT(*) as count'))
            ->where('created_at', '>=', $since)
            ->whereNotNull('referrer')
            ->where('referrer', '!=', '')
            ->groupBy('referrer')
            ->orderByDesc('count')
            ->limit(10)
            ->get()
            ->toArray();

        // Views by hour (SQLite-compatible)
        $hourExpr = DB::connection()->getDriverName() === 'sqlite'
            ? "strftime('%H', created_at)"
            : 'HOUR(created_at)';

        $viewsByHour = PageView::select(
                DB::raw("{$hourExpr} as hour"),
                DB::raw('COUNT(*) as count')
            )
            ->where('created_at', '>=', $since)
            ->groupBy(DB::raw($hourExpr))
            ->orderBy('hour')
            ->get()
            ->toArray();

        // Events summary
        $eventsSummary = CustomEvent::select('name', DB::raw('COUNT(*) as count'))
            ->where('created_at', '>=', $since)
            ->groupBy('name')
            ->orderByDesc('count')
            ->get()
            ->toArray();

        return [
            'totalViews' => $totalViews,
            'uniqueVisitors' => $uniqueVisitors,
            'liveVisitors' => $liveVisitors,
            'viewsByDay' => $viewsByDay,
            'topPages' => $topPages,
            'topReferrers' => $topReferrers,
            'viewsByHour' => $viewsByHour,
            'eventsSummary' => $eventsSummary,
        ];
    }

    public function getTrackedEvents()
    {
        return TrackedEvent::orderBy('created_at', 'desc')->get();
    }

    public function createTrackedEvent(array $data)
    {
        return TrackedEvent::create($data);
    }

    public function updateTrackedEvent($id, array $data)
    {
        $event = TrackedEvent::findOrFail($id);
        $event->update($data);

        return $event;
    }

    public function deleteTrackedEvent($id)
    {
        $event = TrackedEvent::findOrFail($id);
        $event->delete();

        return $event;
    }
}
