<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Order;
use App\Models\Payment;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use KHQR\BakongKHQR;
use KHQR\Models\MerchantInfo;

class PaymentController extends Controller
{
    public function getAllPaymetns(){
        try {
            $payments = Payment::all();

            return response()->json([
                "success"=>true,
                "message"=>"Get payments success",
                "payments"=>$payments
            ],200);
        } catch (\Throwable $th) {
            return response()->json([
                "success"=>false,
                "error"=>$th->getMessage()
            ],200);
        }
    }

    public function createPayment(Request $request){
        try {
            $data = $request->validate([
                'course_id' => 'required|exists:courses,id',
            ]);

            $course = Course::find($data['course_id']);

            if($course->is_free){
                return response()->json([
                    'payment' => 'This course is free. No payment required.',
                ],400);
            }

            $price = (float) ($course->price ?? 0);
            $discount = (float) ($course->discount_percent ?? 0);

            $finalPrice = $course->is_free
                ? 0
                : round($price - ($price * $discount / 100), 2);
            $amount = $finalPrice;

            $token   = env('BAKONG_TOKEN');
            $account = env('BAKONG_ACCOUNT');
        

            $khqr = new BakongKHQR($token);

            $merchantInfo = new MerchantInfo(
                bakongAccountID: $account,
                merchantName: 'Code Kampuchea',
                merchantCity: 'Phnom Penh',
                merchantID: $course->id,
                currency:840, // 840 for USD
                acquiringBank: 'ABA Bank',
                amount: (float)$finalPrice,
                billNumber: (string)$course->id,
                storeLabel: 'Code Kamchea'
            );


            $result = $khqr->generateMerchant($merchantInfo);

            $qrString = $result->data['qr'] ?? null;
            $md5Hash  = $result->data['md5'] ?? null;

            $data['amount'] = $course->final_price;
            
            return response()->json([
                'merchant_name' => 'Code Kampuchea',
                'qr_string' => $qrString,
                'md5'       => $md5Hash,
                'amount'    => $amount,
                'course_id'  => $course->id,
            ]);
        
        }catch(ModelNotFoundException $e){
            return response()->json([
                "success"=>false,
                "error" =>$e->getMessage()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'payment' => 'Cannot generate QR. Try again.',
                "error"=>  $e->getMessage()
            ],500);
        }
    }       

public function checkPaymentStatus(Request $request)
{
    try {
        $validated = $request->validate([
            "md5"       => "required|string|size:32",
        ]);

        $token = env('BAKONG_TOKEN');
        $bakongQr = new BakongKHQR($token);

        // Call the API
        $apiResponse = $bakongQr->checkTransactionByMd5($request->md5);


        // Check Bakong's responseCode
        if (isset($apiResponse['responseCode']) && $apiResponse['responseCode'] === 0) {
           
            

            return response()->json([
                'success' => true,
                'paid'    => true,
                'message' => 'Payment confirmed',
                'amount'  => $apiResponse['data']['amount'] ?? null,
                'currency'=> $apiResponse['data']['currency'] ?? null,
            ]);
        }

        // Not found or failed
        return response()->json([
            'success' => true, // still "ok" HTTP, just not paid yet
            'paid'    => false,
            'message' => $apiResponse['responseMessage'] ?? 'Transaction not found or not paid yet',
            'bakong_response' => $apiResponse // for debugging
        ]);

    } catch (ModelNotFoundException $e) {
        return response()->json([
            'success' => false,
            'error'   => 'Course or order not found: ' . $e->getMessage()
        ], 404);
    } catch (\Exception $e) {
        return response()->json([
            'success' => false,
            'error'   => 'Error checking payment: ' . $e->getMessage()
        ], 500);
    }
}

}
