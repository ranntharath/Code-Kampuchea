<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    protected function redirectTo(Request $request): ?string
    {
        return null; // Prevent redirect for API-like behavior
    }

    /**
     * Handle an unauthenticated user.
     */
    protected function unauthenticated($request, array $guards)
    {
        abort(response()->json(['message' => 'Unauthorized'], 401));
        // OR simply return the response:
        // return response()->json(['message' => 'Unauthorized'], 401);
    }
}