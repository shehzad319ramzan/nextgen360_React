<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Handle OPTIONS preflight
        if ($request->isMethod('OPTIONS')) {
            $response = response('', 200);
        } else {
            $response = $next($request);
        }

        $allowedOrigin = config('cors.allowed_origins', ['*']);
        $origin = $request->header('Origin');

        if (is_array($allowedOrigin) && in_array('*', $allowedOrigin)) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
        } elseif (is_array($allowedOrigin) && $origin && in_array($origin, $allowedOrigin)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
        } elseif (is_string($allowedOrigin)) {
            $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
        }

        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
