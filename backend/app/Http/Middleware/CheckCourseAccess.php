<?php

namespace App\Http\Middleware;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Order;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckCourseAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $courseId = $request->route('course_id');
        // find course
        $course = Course::findOrFail($courseId);

        // Free course → allow
        if ($course->is_free) {
            return $next($request);
        }

        // Paid course → check order
        $hasAccess = Order::where('user_id', auth('api')->id())
            ->where('course_id', $course->id)
            ->where('status', 'completed')
            ->exists();

        if (!$hasAccess) {
            return response()->json([
                'success' => false,
                'message' => 'You must enroll'
            ], 403);
        }

        return $next($request);
    }
}
