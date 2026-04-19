<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ActivityLogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function __construct(
        private ActivityLogService $activityLogService
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $params = [
                'limit' => $request->query('limit', 50),
                'offset' => $request->query('offset', 0),
                'resource' => $request->query('resource'),
            ];

            $result = $this->activityLogService->getAll($params);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
