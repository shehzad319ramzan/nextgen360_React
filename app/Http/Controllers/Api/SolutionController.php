<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSolutionRequest;
use App\Services\SolutionService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SolutionController extends Controller
{
    public function __construct(
        private SolutionService $solutionService
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $all = $request->query('all');
            $items = $this->solutionService->getAll($all !== null);
            return response()->json($items);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($idOrSlug): JsonResponse
    {
        try {
            $item = $this->solutionService->findByIdOrSlug($idOrSlug);
            if (!$item) {
                return response()->json(['error' => 'Not found'], 404);
            }
            return response()->json($item);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(StoreSolutionRequest $request): JsonResponse
    {
        try {
            $result = $this->solutionService->create($request->validated());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->solutionService->update($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->solutionService->delete($id);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
