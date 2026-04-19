<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return response()->json(['message' => 'API is running.']);
});

Route::get('/sitemap.xml', [\App\Http\Controllers\Api\SitemapController::class, 'sitemap']);
Route::get('/robots.txt', [\App\Http\Controllers\Api\SitemapController::class, 'robots']);
