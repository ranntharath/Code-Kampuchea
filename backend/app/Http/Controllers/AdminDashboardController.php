<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    //
    public function overview(){
        
        try {
            return response()->json([
                "total_user"=>[
                    'users'=> User::whereRole('user')->count(),
                    'admins'=> User::whereRole('admin')->count()
                ],
                "total_course"=>Course::count(),
                "total_enrollments" => Order::where('status', 'completed')->count(),
                "revenue"=>[
                    "total"=> Order::where("status", "completed")->sum('amount'),
                    "currency"=>'USD'
                ],
                'recent_activities'=>[
                    'new_users'=> User::latest()->take(5)->get(),
                    'new_courses'=> Course::latest()->take(5)->get(),
                    'new_enrollments' => Order::where('status', 'completed')->latest()->take(5)->get()
                ]
            ],200);
        } catch (\Throwable $th) {
            return response()->json([
                "status"=>false,
                "error"=> $th->getMessage()
            ],500); 
        }

    }
    function enrollmentsByYear(Request $request){
       try {
         // get year from request
        $year = $request->year ?? now()->year;
        
        // get enroll per month by order table
        $enrolls = Order::select(
            DB::raw('MONTH(created_at) as month'),
             DB::raw('COUNT(*) as total')
        )
        ->where('status', 'completed')
        ->whereYear('created_at', $year)
        ->groupBy(DB::raw('MONTH(created_at)'))
        ->orderBy('month')
        ->get();
        
        $monthlyData = array_fill(1, 12, 0);

          foreach ($enrolls as $row) {
            $monthlyData[$row->month] = $row->total;
        }
        return response()->json([
            'year' => $year,
            'labels' => ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            'data' => array_values($monthlyData),
        ]);
       } catch (\Throwable $th) {
         return response()->json([
                "status"=>false,
                "error"=> $th->getMessage()
            ],500); 
       }
    }
}
