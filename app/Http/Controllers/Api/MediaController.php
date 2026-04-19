<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UploadMediaRequest;
use App\Services\MediaService;
use Illuminate\Http\JsonResponse;

class MediaController extends Controller
{
    public function __construct(
        private MediaService $mediaService
    ) {}

    public function upload(UploadMediaRequest $request): JsonResponse
    {
        try {
            $result = $this->mediaService->upload($request->file('file'));
            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function index(): JsonResponse
    {
        try {
            $files = $this->mediaService->listFiles();
            return response()->json($files);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($filename): JsonResponse
    {
        try {
            $this->mediaService->delete($filename);
            return response()->json(['message' => 'Deleted']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 404);
        }
    }
}
