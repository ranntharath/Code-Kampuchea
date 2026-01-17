<?php

namespace App\Http\Controllers;

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
                'order_id' => 'required|exists:orders,id',
            ]);

            $order = Order::find($request->order_id);
            $amount = $order->amount;

            $token   = env('BAKONG_TOKEN');
            $account = env('BAKONG_ACCOUNT');
        

            $khqr = new BakongKHQR($token);

            $merchantInfo = new MerchantInfo(
                bakongAccountID: $account,
                merchantName: 'Code Kampuchea',
                merchantCity: 'Phnom Penh',
                merchantID: $order->id,
                currency:840, // 840 for USD
                acquiringBank: 'ABA Bank',
                amount: (float)$order->amount,
                billNumber: (string)$order->id,
                storeLabel: 'Code Kamchea'
            );


            $result = $khqr->generateMerchant($merchantInfo);

            $qrString = $result->data['qr'] ?? null;
            $md5Hash  = $result->data['md5'] ?? null;

            $data['amount'] = $order->amount;
            Payment::create($data);
            return response()->json([
                'qr_string' => $qrString,
                'md5'       => $md5Hash,
                'amount'    => $amount,
                'order_id'  => $order->id,
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

    public function checkPaymentStatus(Request $request){

        $order = Order::find($request->order_id);
        $token = env('BAKONG_TOKEN');

        $response = Http::withHeaders(['Authorization' => 'Bearer ' . $token])
            ->post(config('bakong.base_url', 'https://api-bakong.nbc.gov.kh/v1') . '/check_transaction_by_md5', [
                'hash' => $order->bakong_md5,
            ]);
            
        $data = $response->json();

        if ($response->successful() && ($data['status'] ?? '') === 'SUCCESS') {
            $order->update(['status' => 'paid']);
            return response()->json(['paid' => true]);
        }

        return response()->json(['paid' => false]);
    }

}
