<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| All routes are prefixed with /api by the RouteServiceProvider.
| Controllers live in App\Http\Controllers\Api.
|
*/

// ─── Health Check ────────────────────────────────────────────────────────────
Route::get('/health', function () {
    return response()->json(['status' => 'ok', 'timestamp' => now()->toISOString()]);
});

// ─── Sitemap & Robots (Moved to web.php for root access)

// ─── Auth Routes ─────────────────────────────────────────────────────────────
Route::prefix('auth')->group(function () {
    // Public
    Route::post('/login', [\App\Http\Controllers\Api\AuthController::class, 'login'])->name('login');

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::get('/me', [\App\Http\Controllers\Api\AuthController::class, 'me']);
        Route::put('/password', [\App\Http\Controllers\Api\AuthController::class, 'changePassword']);

        // Admin only
        Route::middleware('admin')->group(function () {
            Route::get('/modules', [\App\Http\Controllers\Api\AuthController::class, 'modules']);
            Route::get('/users', [\App\Http\Controllers\Api\AuthController::class, 'listUsers']);
            Route::post('/users', [\App\Http\Controllers\Api\AuthController::class, 'createUser']);
            Route::put('/users/{id}', [\App\Http\Controllers\Api\AuthController::class, 'updateUser']);
            Route::delete('/users/{id}', [\App\Http\Controllers\Api\AuthController::class, 'deleteUser']);
        });
    });
});

// ─── SEO Routes ──────────────────────────────────────────────────────────────
Route::prefix('seo')->group(function () {
    // Authenticated (underscore routes BEFORE the wildcard)
    Route::middleware('auth:api')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\SeoController::class, 'index']);
        Route::get('/_health', [\App\Http\Controllers\Api\SeoController::class, 'health']);
        Route::get('/_robots', [\App\Http\Controllers\Api\SeoController::class, 'getRobots']);
        Route::put('/_robots', [\App\Http\Controllers\Api\SeoController::class, 'saveRobots']);
        Route::get('/_htaccess', [\App\Http\Controllers\Api\SeoController::class, 'getHtaccess']);
        Route::put('/_htaccess', [\App\Http\Controllers\Api\SeoController::class, 'saveHtaccess']);
        Route::get('/_custom-code', [\App\Http\Controllers\Api\SeoController::class, 'getCustomCode']);
        Route::put('/_custom-code', [\App\Http\Controllers\Api\SeoController::class, 'saveCustomCode']);
        Route::put('/{page}', [\App\Http\Controllers\Api\SeoController::class, 'update']);
    });

    // Public
    Route::get('/{page}', [\App\Http\Controllers\Api\SeoController::class, 'show']);
});

// ─── Blog Routes ─────────────────────────────────────────────────────────────
Route::prefix('blogs')->group(function () {
    // Public
    Route::get('/', [\App\Http\Controllers\Api\BlogController::class, 'index']);
    Route::get('/{slug}', [\App\Http\Controllers\Api\BlogController::class, 'show']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\BlogController::class, 'store']);
        Route::put('/{id}', [\App\Http\Controllers\Api\BlogController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\BlogController::class, 'destroy']);
    });
});

// ─── Contact Us / Inquiries Routes ──────────────────────────────────────────
Route::prefix('contact-us')->group(function () {
    // Public
    Route::post('/', [\App\Http\Controllers\Api\ContactController::class, 'submit']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\ContactController::class, 'index']);
        Route::put('/{id}', [\App\Http\Controllers\Api\ContactController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\ContactController::class, 'destroy']);
    });
});

// ─── Redirects Routes ────────────────────────────────────────────────────────
Route::prefix('redirects')->middleware('auth:api')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\RedirectController::class, 'index']);
    Route::post('/', [\App\Http\Controllers\Api\RedirectController::class, 'store']);
    Route::put('/{id}', [\App\Http\Controllers\Api\RedirectController::class, 'update']);
    Route::delete('/{id}', [\App\Http\Controllers\Api\RedirectController::class, 'destroy']);
});

// ─── Settings Routes ────────────────────────────────────────────────────────
Route::prefix('settings')->group(function () {
    // Public
    Route::get('/site', [\App\Http\Controllers\Api\SettingController::class, 'site']);

    // Admin only
    Route::middleware(['auth:api', 'admin'])->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\SettingController::class, 'index']);
        Route::put('/', [\App\Http\Controllers\Api\SettingController::class, 'update']);
        Route::post('/test-email', [\App\Http\Controllers\Api\SettingController::class, 'testEmail']);
        Route::get('/backup', [\App\Http\Controllers\Api\SettingController::class, 'backup']);
    });
});

// ─── Jobs Routes ─────────────────────────────────────────────────────────────
Route::prefix('jobs')->group(function () {
    // Public
    Route::get('/', [\App\Http\Controllers\Api\JobController::class, 'index']);
    Route::get('/{id}', [\App\Http\Controllers\Api\JobController::class, 'show']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\JobController::class, 'store']);
        Route::put('/{id}', [\App\Http\Controllers\Api\JobController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\JobController::class, 'destroy']);
    });
});

// ─── Job Applications Routes ─────────────────────────────────────────────────
Route::prefix('job-applications')->group(function () {
    // Public (with file upload)
    Route::post('/', [\App\Http\Controllers\Api\JobApplicationController::class, 'submit']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\JobApplicationController::class, 'index']);
        Route::get('/{id}', [\App\Http\Controllers\Api\JobApplicationController::class, 'show']);
        Route::put('/{id}', [\App\Http\Controllers\Api\JobApplicationController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\JobApplicationController::class, 'destroy']);
    });
});

// ─── Testimonials Routes ─────────────────────────────────────────────────────
Route::prefix('testimonials')->group(function () {
    // Public
    Route::get('/', [\App\Http\Controllers\Api\TestimonialController::class, 'index']);
    Route::post('/submit', [\App\Http\Controllers\Api\TestimonialController::class, 'submit']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\TestimonialController::class, 'store']);
        Route::put('/{id}', [\App\Http\Controllers\Api\TestimonialController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\TestimonialController::class, 'destroy']);
    });
});

// ─── Media Routes ────────────────────────────────────────────────────────────
Route::prefix('media')->middleware('auth:api')->group(function () {
    Route::post('/upload', [\App\Http\Controllers\Api\MediaController::class, 'upload']);
    Route::get('/', [\App\Http\Controllers\Api\MediaController::class, 'index']);
    Route::delete('/{filename}', [\App\Http\Controllers\Api\MediaController::class, 'destroy']);
});

// ─── Team Routes ─────────────────────────────────────────────────────────────
Route::prefix('team')->group(function () {
    // Public
    Route::get('/', [\App\Http\Controllers\Api\TeamController::class, 'index']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\TeamController::class, 'store']);
        Route::put('/{id}', [\App\Http\Controllers\Api\TeamController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\TeamController::class, 'destroy']);
    });
});

// ─── Portfolio Routes ────────────────────────────────────────────────────────
Route::prefix('portfolio')->group(function () {
    // Public
    Route::get('/', [\App\Http\Controllers\Api\PortfolioController::class, 'index']);
    Route::get('/{idOrSlug}', [\App\Http\Controllers\Api\PortfolioController::class, 'show']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\PortfolioController::class, 'store']);
        Route::put('/{id}', [\App\Http\Controllers\Api\PortfolioController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\PortfolioController::class, 'destroy']);
    });
});

// ─── Case Studies Routes ────────────────────────────────────────────────────
Route::prefix('case-studies')->group(function () {
    // Public
    Route::get('/', [\App\Http\Controllers\Api\CaseStudyController::class, 'index']);
    Route::get('/{idOrSlug}', [\App\Http\Controllers\Api\CaseStudyController::class, 'show']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\CaseStudyController::class, 'store']);
        Route::put('/{id}', [\App\Http\Controllers\Api\CaseStudyController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\CaseStudyController::class, 'destroy']);
    });
});

// ─── Solutions Routes ───────────────────────────────────────────────────────
Route::prefix('solutions')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\SolutionController::class, 'index']);
    Route::get('/{idOrSlug}', [\App\Http\Controllers\Api\SolutionController::class, 'show']);

    Route::middleware('auth:api')->group(function () {
        Route::post('/', [\App\Http\Controllers\Api\SolutionController::class, 'store']);
        Route::put('/{id}', [\App\Http\Controllers\Api\SolutionController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\SolutionController::class, 'destroy']);
    });
});

// ─── Google Reviews (public, cached) ────────────────────────────────────────
Route::get('/google-reviews', [\App\Http\Controllers\Api\GoogleReviewsController::class, 'index']);

// ─── Newsletter Routes ──────────────────────────────────────────────────────
Route::prefix('newsletter')->group(function () {
    // Public
    Route::post('/subscribe', [\App\Http\Controllers\Api\NewsletterController::class, 'subscribe']);
    Route::get('/export', [\App\Http\Controllers\Api\NewsletterController::class, 'export']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::get('/', [\App\Http\Controllers\Api\NewsletterController::class, 'index']);
        Route::put('/{id}', [\App\Http\Controllers\Api\NewsletterController::class, 'update']);
        Route::delete('/{id}', [\App\Http\Controllers\Api\NewsletterController::class, 'destroy']);
    });
});

// ─── Activity Log Routes ────────────────────────────────────────────────────
Route::prefix('activity-log')->middleware(['auth:api', 'admin'])->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\ActivityLogController::class, 'index']);
});

// ─── Analytics Routes ────────────────────────────────────────────────────────
Route::prefix('analytics')->middleware('auth:api')->group(function () {
    Route::get('/', [\App\Http\Controllers\Api\AnalyticsController::class, 'dashboard']);
});

// ─── Tracking Routes ────────────────────────────────────────────────────────
Route::prefix('tracking')->group(function () {
    // Public
    Route::post('/pageview', [\App\Http\Controllers\Api\TrackingController::class, 'pageview']);
    Route::post('/event', [\App\Http\Controllers\Api\TrackingController::class, 'event']);
    Route::get('/events', [\App\Http\Controllers\Api\TrackingController::class, 'events']);

    // Authenticated
    Route::middleware('auth:api')->group(function () {
        Route::get('/stats', [\App\Http\Controllers\Api\TrackingController::class, 'stats']);
        Route::get('/tracked-events', [\App\Http\Controllers\Api\TrackingController::class, 'trackedEvents']);
        Route::post('/tracked-events', [\App\Http\Controllers\Api\TrackingController::class, 'storeTrackedEvent']);
        Route::put('/tracked-events/{id}', [\App\Http\Controllers\Api\TrackingController::class, 'updateTrackedEvent']);
        Route::delete('/tracked-events/{id}', [\App\Http\Controllers\Api\TrackingController::class, 'destroyTrackedEvent']);
    });
});
