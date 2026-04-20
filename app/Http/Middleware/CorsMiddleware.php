<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Log CORS request details
        Log::channel('daily')->info('CORS Request', [
            'method' => $request->method(),
            'url' => $request->fullUrl(),
            'origin' => $request->header('Origin'),
            'ip' => $request->ip(),
            'user_agent' => $request->header('User-Agent'),
        ]);

        // Handle OPTIONS preflight
        if ($request->isMethod('OPTIONS')) {
            Log::channel('daily')->info('CORS Preflight (OPTIONS) handled', [
                'origin' => $request->header('Origin'),
            ]);
            $response = response('', 200);
        } else {
            $response = $next($request);
        }

        $allowedOrigin = config('cors.allowed_origins', ['*']);
        $origin = $request->header('Origin');

        Log::channel('daily')->info('CORS Config', [
            'allowed_origins' => $allowedOrigin,
            'request_origin' => $origin,
        ]);

        if (is_array($allowedOrigin) && in_array('*', $allowedOrigin)) {
            $response->headers->set('Access-Control-Allow-Origin', '*');
        } elseif (is_array($allowedOrigin) && $origin && in_array($origin, $allowedOrigin)) {
            $response->headers->set('Access-Control-Allow-Origin', $origin);
        } elseif (is_string($allowedOrigin)) {
            $response->headers->set('Access-Control-Allow-Origin', $allowedOrigin);
        } else {
            Log::channel('daily')->warning('CORS: Origin not allowed', [
                'origin' => $origin,
                'allowed' => $allowedOrigin,
            ]);
        }

        $response->headers->set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
        $response->headers->set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept, Origin');
        $response->headers->set('Access-Control-Allow-Credentials', 'true');

        return $response;
    }
}
