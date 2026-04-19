<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RequirePermission
{
    public function handle(Request $request, Closure $next, string $module): Response
    {
        $permissions = $request->user()?->permissions;

        // No permissions set = full access (unrestricted)
        if (is_null($permissions)) {
            return $next($request);
        }

        // Check permissions array includes module
        if (is_array($permissions) && in_array($module, $permissions)) {
            return $next($request);
        }

        return response()->json(['error' => 'No permission for this module'], 403);
    }
}
