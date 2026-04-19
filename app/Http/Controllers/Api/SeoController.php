<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\SeoService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SeoController extends Controller
{
    public function __construct(
        private SeoService $seoService
    ) {}

    public function index(): JsonResponse
    {
        try {
            $pages = $this->seoService->all();
            return response()->json($pages);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function show($page): JsonResponse
    {
        try {
            $seo = $this->seoService->findByPage($page);
            if (!$seo) {
                return response()->json(['error' => 'Page not found'], 404);
            }
            return response()->json($seo);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $page): JsonResponse
    {
        try {
            $this->seoService->updatePage($page, $request->all());
            return response()->json(['message' => 'SEO updated']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function health(): JsonResponse
    {
        try {
            $report = $this->seoService->healthCheck();
            return response()->json($report);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getRobots(): JsonResponse
    {
        try {
            $content = $this->seoService->getRobotsContent();
            return response()->json(['content' => $content]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function saveRobots(Request $request): JsonResponse
    {
        try {
            $this->seoService->saveRobotsContent($request->input('content'));
            return response()->json(['message' => 'robots.txt saved']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getHtaccess(): JsonResponse
    {
        try {
            $content = $this->seoService->getHtaccessContent();
            return response()->json(['content' => $content]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function saveHtaccess(Request $request): JsonResponse
    {
        try {
            $this->seoService->saveHtaccessContent($request->input('content'));
            return response()->json(['message' => '.htaccess saved']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function getCustomCode(): JsonResponse
    {
        try {
            return response()->json($this->seoService->getCustomCode());
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function saveCustomCode(Request $request): JsonResponse
    {
        try {
            $this->seoService->saveCustomCode($request->only([
                'custom_head_scripts',
                'custom_footer_scripts',
            ]));

            return response()->json(['message' => 'Custom code saved']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
