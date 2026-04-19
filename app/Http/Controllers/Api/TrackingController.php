<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\TrackPageViewRequest;
use App\Http\Requests\TrackEventRequest;
use App\Http\Requests\StoreTrackedEventRequest;
use App\Services\TrackingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class TrackingController extends Controller
{
    public function __construct(
        private TrackingService $trackingService
    ) {}

    public function pageview(TrackPageViewRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['ip'] = $request->header('X-Forwarded-For')
                ? explode(',', $request->header('X-Forwarded-For'))[0]
                : $request->ip();
            $data['user_agent'] = $request->userAgent() ?? '';

            $this->trackingService->recordPageView($data);

            return response()->json(['ok' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function event(TrackEventRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['ip'] = $request->header('X-Forwarded-For')
                ? explode(',', $request->header('X-Forwarded-For'))[0]
                : $request->ip();

            $this->trackingService->recordEvent($data);

            return response()->json(['ok' => true]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function events(): JsonResponse
    {
        try {
            $events = $this->trackingService->getActiveEventDefinitions();
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function stats(Request $request): JsonResponse
    {
        try {
            $days = (int) $request->query('days', 30);
            $data = $this->trackingService->getStats($days);
            return response()->json($data);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function trackedEvents(): JsonResponse
    {
        try {
            $events = $this->trackingService->getAllTrackedEvents();
            return response()->json($events);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function storeTrackedEvent(StoreTrackedEventRequest $request): JsonResponse
    {
        try {
            $result = $this->trackingService->createTrackedEvent($request->validated());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function updateTrackedEvent(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->trackingService->updateTrackedEvent($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroyTrackedEvent($id): JsonResponse
    {
        try {
            $this->trackingService->deleteTrackedEvent($id);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
