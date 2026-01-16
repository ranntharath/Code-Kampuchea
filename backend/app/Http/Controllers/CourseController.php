<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    //
    function index(){
        try {
            // get only id and name
            $courses = Course::with('category')->get();
            
            return response()->json([
                'success' => true,
                'message' => 'Courses fetched successfully',
                'data' => CourseResource::collection($courses)
            ],200);
        } catch (\Throwable $th) {
            return response()->json([
                "error" => $th->getMessage()
            ], 500);
        }
    }
    /**
     * get course by id
     */
    function find($id){
        try {
            $course = Course::find($id);
            return response()->json([
                "success"=>true,
                "course"=>new CourseResource($course)
            ],200);
        }catch(ModelNotFoundException $e){
            return response()->json([
                "message"=>"Course not found"
            ],404);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                "success"=>false,
                "message"=>$th->getMessage()
            ],500);
        }
    }
    /**
     * Create new Course by admin
     */
    function store(Request $request){
        try {
            $data = $request->validate([
                'title' => 'required|string|max:255',
                'category_id' => 'required|exists:categories,id',
                'description' => 'required|string',
                'thumbnail' => 'required|string',
                'is_free' => 'sometimes|boolean',
                'price' => 'numeric|min:0',
                'discount_percent'=>'numeric|min:0'
            ]);
           
            $course = Course::create($data);

            return response()->json([
                "message"=>"created course successfully",
                "course"=>new CourseResource($course)
            ],201);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                "error"=>$th->getMessage()
            ],500);
        }
    }
    /**
     * Update course by admin
     */
    function update(Request $request,$id){
        try {
            $data = $request->validate([
                'title' => 'string|max:255',
                'category_id' => 'exists:categories,id',
                'description' => 'string',
                'thumbnail' => 'string',
                'is_free' => 'sometimes|boolean',
                'price' => 'numeric|min:0',
                'discount_percent'=>'numeric|min:0'
            ]);
            // find course by id
            $course = Course::findOrFail($id);

            $update = $course->update($data);
                return response()->json([
                    "success"=>true,
                    "message"=>"update course successfully",
                    "course"=>new CourseResource($course)
                ],200);
        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'Course not found'
            ], 404);
        } catch (\Throwable $th) {
            //throw $th;
            return response()->json([
                "success"=>false,
                "error"=>$th->getMessage()
            ],500);
        }
    }

    function destroy($id){
        try {
            $course = Course::findOrFail($id);
            $course->delete();
            return response()->json(['message' => 'Course deleted successfully']);
        }catch(ModelNotFoundException $e){
            return response()->json([
                "success"=>false,
                "message"=>"course not found"
            ],404);
        } catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                "error"=>$th->getMessage()
            ]);
        }
    }

}
