<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Order;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;

class OrderController extends Controller
{
    //
    /**
     * get all orders
     * admin
     */
    public function index(){
        try {
            
            $orders = Order::all();
            return response()->json([
                "success"=>true,
                "orders"=>$orders
            ]);

        }catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                "error"=>$th->getMessage()
            ],500);
        }
    }

   public function createOrder(Request $request){
    try {
        $user = JWTAuth::parseToken()->authenticate();

        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'status'    => 'string'
        ]);

        $course = Course::findOrFail($data['course_id']);

        $data['user_id'] = $user->id;
        $data['amount']  = $course->price;
        $data['status'] = "pending";

        $insert = Order::create($data);
        return response()->json([
            'success' => true,
            'order'    => $insert
        ]);

    } catch (\Throwable $th) {
        return response()->json([
            'success' => false,
            'message' => $th->getMessage()
        ], 500);
    }
}

}
