<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;

class GoogleReviewsController extends Controller
{
    public function index(): JsonResponse
    {
        $apiKey  = env('GOOGLE_PLACES_API_KEY');
        $placeId = env('GOOGLE_PLACE_ID');

        if (!$apiKey || !$placeId) {
            return response()->json([
                'rating'  => null,
                'total'   => 0,
                'url'     => null,
                'name'    => null,
                'reviews' => [],
                'error'   => 'Google Places API not configured',
            ], 200);
        }

        $cacheKey = 'google_reviews_' . md5($placeId);

        $data = Cache::remember($cacheKey, now()->addHours(6), function () use ($apiKey, $placeId) {
            try {
                $res = Http::timeout(8)->get('https://maps.googleapis.com/maps/api/place/details/json', [
                    'place_id' => $placeId,
                    'fields'   => 'name,rating,user_ratings_total,reviews,url',
                    'key'      => $apiKey,
                    'reviews_sort'    => 'newest',
                    'reviews_no_translations' => 'true',
                ]);

                if (!$res->ok()) {
                    return null;
                }

                $body = $res->json();

                if (($body['status'] ?? '') !== 'OK') {
                    return null;
                }

                return $body['result'] ?? null;
            } catch (\Throwable $e) {
                return null;
            }
        });

        if (!$data) {
            return response()->json([
                'rating'  => null,
                'total'   => 0,
                'url'     => null,
                'name'    => null,
                'reviews' => [],
            ], 200);
        }

        return response()->json([
            'name'    => $data['name'] ?? null,
            'rating'  => $data['rating'] ?? null,
            'total'   => $data['user_ratings_total'] ?? 0,
            'url'     => $data['url'] ?? null,
            'reviews' => array_map(function ($r) {
                return [
                    'author_name'              => $r['author_name'] ?? '',
                    'author_url'               => $r['author_url'] ?? '#',
                    'profile_photo_url'        => $r['profile_photo_url'] ?? '',
                    'rating'                   => $r['rating'] ?? 5,
                    'text'                     => $r['text'] ?? '',
                    'time'                     => $r['time'] ?? null,
                    'relative_time_description' => $r['relative_time_description'] ?? '',
                ];
            }, $data['reviews'] ?? []),
        ]);
    }
}
