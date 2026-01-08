<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    //
    public function register(Request $request)
{
    try {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);

        $data['password'] = Hash::make($data['password']);
        $data['role'] = 'user';
        $user = User::create($data);

        $user->email_verified_at = now();
        $user->save();
        $token = auth('api')->login($user); // get jwt token

        return response()->json([
            'message' => 'Register successfully',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
            'token_type' => 'bearer',
        ], 201);
    } catch (\Throwable $th) {
        //throw $th;
        return response()->json([
            'error'=> $th->getMessage()
        ],500);
    }
    
}

    public function login(Request $request){
        $credentials = $request->validate([
            'email'=>'required|email',
            'password'=>'required|string'
        ]);

        // attemt login
        $token = auth('api')->attempt($credentials);
        if(!$token){
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        //  Return user + token

        $user = auth('api')->user();
        return response()->json([
            'message' => 'Login successful',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role,
            ],
            'token' => $token,
            'token_type' => 'bearer',
        ], 200);
    }
}
