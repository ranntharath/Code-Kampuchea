<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    //
    function index(){
        try {
            $categories = Category::select('id', 'name', 'status')->get();
            return response()->json([
                "categories"=>$categories
            ],200);
        } catch (\Throwable $th) {
            return response()->json([
                'error'=> $th->getMessage()
            ],500);
        }
    }
    function store(Request $request){
        try {
            $request->validate([
                "name"=>"string|required"
            ]);
            $cat = new Category();
            $cat->name = $request->name;
            $insert = $cat->save();
            return response()->json([
                "message"=>"Created Category successfully",
                "category"=>$cat
            ],201);
        } catch (\Throwable $th) {
            
            return response()->json([
                'error'=> $th->getMessage()
            ],500);
        }
    }
    public function update(Request $request, $id){
        try {
            // Find category
            $category = Category::findOrFail($id);

            // Validate input
            $data = $request->validate([
                'name'   => 'sometimes|string|max:255',
                'status' => 'sometimes|in:active,inactive'
            ]);

            // Update category
            $category->update($data);

            //Return response
            return response()->json([
                'message'  => 'Category updated successfully',
                'category' => $category
            ], 200);

        } catch (ModelNotFoundException $e) {
            return response()->json([
                'message' => 'Category not found'
            ], 404);

        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Something went wrong',
                'error'   => $th->getMessage()
            ], 500);
        }
    }
    function destroy($id){
        try {
            $category = Category::findOrFail($id);

            $category->delete();
        return response()->json([
            "message"=>"delete successfully"
        ],200);

        }catch(ModelNotFoundException $e){
            return response()->json([
                'message' => 'Category not found'
            ], 404);

        } catch (\Throwable $th) {
            //throw $th;
        }
    }


}
