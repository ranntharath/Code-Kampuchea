<?php

namespace App\Http\Controllers;

use App\Mail\SendOtpMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

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

            // get random otp and send mail

            $otp = rand(100000, 999999);
            Mail::to($user->email)->send(new SendOtpMail($otp));
            
            //create otp record
            $user->otps()->create([
                'otp' => $otp,
                'expires_at' => now()->addMinutes(1),
            ]);


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
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);
        // login
        $token = auth('api')->attempt($credentials);
        if (!$token) {
            return response()->json([
                'message' => 'Invalid credentials'
            ], 401);
        }
        //get user login
        $user = auth('api')->user();

        if($user && !$user->isverified){
            auth('api')->logout(); // logout user
            return response()->json([
                'message' => 'Please verify your email before logging in.'
            ], 403);
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

    public function verifyOtp(Request $request)
    {
        try {
            $data = $request->validate([
            'email' => 'required|email',
            'otp' => 'required|string',
        ]);

        $user = User::where('email', $data['email'])->first();
        if (!$user) {
            return response()->json([
                'message' => 'User not found'
            ], 404);
        }

        $otpRecord = $user->otps()->where('otp', $data['otp'])
            ->where('expires_at', '>', now())
            ->first();

        if (!$otpRecord) {
            return response()->json([
                'message' => 'Invalid or expired OTP'
            ], 400);
        }

        // Mark user as verified
        $user->isverified = true;
        $user->save();

        // Delete used OTP
        $otpRecord->delete();

        return response()->json([
            'message' => 'OTP verified successfully'
        ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }
    public function resendOtp(Request $request)
    {
        try {
            $data = $request->validate([
                'email' => 'required|email',
            ]);

            $user = User::where('email', $data['email'])->first();
            if (!$user) {
                return response()->json([
                    'message' => 'User not found'
                ], 404);
            }
            $user->otps()->where('expires_at', '>', now())->delete();

            // Generate new OTP
            $otp = rand(100000, 999999);
            Mail::to($user->email)->send(new SendOtpMail($otp));

            // Create new OTP record
            $user->otps()->create([
                'otp' => $otp,
                'expires_at' => now()->addMinutes(1),
            ]);

            return response()->json([
                'message' => 'OTP resent successfully'
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }
}
