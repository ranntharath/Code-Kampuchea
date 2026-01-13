<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Lesson;
use App\Models\Order;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class LessonController extends Controller
{
    //get all lessons
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
    // add new lesson to course
    public function store(Request $request){
        try {
            $data = $request->validate([
               'course_id'=>['exists:courses,id'],
               'title'=>["string","required"],
               "description"=>['string',"required"],
               "video_url"=>["string","required"],
               "order"=>["numeric","required"]
            ]);

            $insert = Lesson::create($data);
            return response()->json([
                "success"=>true,
                "message"=>"create lesson Successfully",
                "lesson"=>$insert
            ],201);
        } catch (\Throwable $th) {
            
            return response()->json([
                "success"=>false,
                "error"=>$th->getMessage()
            ],500);
        }
    }
    // get course and lesson in that course
    public function getCourseLesson($id){
         try {
        $course = Course::with('lessons')->findOrFail($id);

        return response()->json([
            'success' => true,
            'message' => 'get course successfully',
            'course' => $course
        ], 200);

    } catch (\Throwable $th) {
        return response()->json([
            'success' => false,
            'error' => $th->getMessage()
        ], 500);
    }
    }
    // update lesson by id
    public function update(Request $request,$id){
        try {
            $lesson = Lesson::findOrFail($id);

            $data = $data = $request->validate([
               'course_id'=>['exists:courses,id'],
               'title'=>["string"],
               "description"=>['string'],
               "video_url"=>["string"],
               "order"=>["numeric"]
            ]);

            $lesson->update($data);
            return response()->json([
                "success"=>true,
                "message"=>"update lesson successfully",
                "lesson"=>$lesson
            ],200);

        }catch(ModelNotFoundException $e){
            return response()->json([
                "message"=>"Lesson not found"
            ],404);
        } catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                "error"=>$th->getMessage()
            ],500);
        }
    }
    // delete lesson by id
    public function destroy($id){
        try {
            $lesson = Lesson::findOrFail($id);
            $lesson->destroy($id);
            return response()->json([
                "success"=>true,
                "message"=>"delete lesson successfully"
            ],200);
        } catch(ModelNotFoundException $e){
            return response()->json([
                "success"=>false,
                "message"=>"lesson not found"
            ],404);
        }catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                "message"=>$th->getMessage()
            ],500);
        }
    }
}
