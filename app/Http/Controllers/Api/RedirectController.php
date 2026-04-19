<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreRedirectRequest;
use App\Services\RedirectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RedirectController extends Controller
{
    public function __construct(
        private RedirectService $redirectService
    ) {}

    public function index(): JsonResponse
    {
        try {
            $redirects = $this->redirectService->all();
            return response()->json($redirects);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(StoreRedirectRequest $request): JsonResponse
    {
        try {
            $result = $this->redirectService->create($request->validated());
            return response()->json($result, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 409);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->redirectService->update($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->redirectService->delete($id);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
