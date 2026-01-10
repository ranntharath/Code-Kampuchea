<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    //
    public function index(){
        try {
            $lesson = Lesson::with("course")->get();

            return response()->json([
                'success'=>true,
                "messsage"=>"get lesson successfully",
                "lessons"=>$lesson
            ],200);
        } catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                "error"=>$th->getMessage()
            ],500);
        }
    }
}
