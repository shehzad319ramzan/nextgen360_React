<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBlogRequest;
use App\Services\BlogService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function __construct(
        private BlogService $blogService
    ) {}

    public function index(Request $request): JsonResponse
    {
        try {
            $isAuth = $request->bearerToken() !== null;
            $blogs = $this->blogService->getAll($isAuth);
            return response()->json($blogs);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($slug): JsonResponse
    {
        try {
            $blog = $this->blogService->findBySlug($slug);
            if (!$blog) {
                return response()->json(['error' => 'Blog not found'], 404);
            }
            return response()->json($blog);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function store(StoreBlogRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();
            $data['author_id'] = $request->user()->id;

            $blog = $this->blogService->create($data);

            return response()->json($blog, 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $result = $this->blogService->update($id, $request->all());
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $this->blogService->delete($id);
            return response()->json(['message' => 'Blog deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
