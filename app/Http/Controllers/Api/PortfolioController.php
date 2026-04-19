<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePortfolioRequest;
use App\Services\PortfolioService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function __construct(
        private PortfolioService $portfolioService
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $all = $request->query('all');
            $category = $request->query('category');
            $items = $this->portfolioService->getAll($all !== null, $category);
            return response()->json($items);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($idOrSlug): JsonResponse
    {
        try {
            $item = $this->portfolioService->findByIdOrSlug($idOrSlug);
            if (!$item) {
                return response()->json(['error' => 'Not found'], 404);
            }
            return response()->json($item);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(StorePortfolioRequest $request): JsonResponse
    {
        try {
            $result = $this->portfolioService->create($request->validated());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->portfolioService->update($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->portfolioService->delete($id);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
