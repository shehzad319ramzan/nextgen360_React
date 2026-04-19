<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCaseStudyRequest;
use App\Services\CaseStudyService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CaseStudyController extends Controller
{
    public function __construct(
        private CaseStudyService $service
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $all = $request->query('all');
            $featured = $request->query('featured');
            $industry = $request->query('industry');
            $items = $this->service->getAll(
                $all !== null,
                $featured !== null,
                $industry
            );
            return response()->json($items);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($idOrSlug): JsonResponse
    {
        try {
            $item = $this->service->findByIdOrSlug($idOrSlug);
            if (!$item) {
                return response()->json(['error' => 'Not found'], 404);
            }
            return response()->json($item);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function store(StoreCaseStudyRequest $request): JsonResponse
    {
        try {
            $result = $this->service->create($request->validated());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->service->update($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->service->delete($id);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
