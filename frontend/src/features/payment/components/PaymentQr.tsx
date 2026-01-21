import type { CreatePaymentResponse } from "@/types/payment";
import { QRCodeCanvas } from "qrcode.react";

export default function PaymentQr({ qr }: { qr: CreatePaymentResponse }) {
  

  return (
    <div className=" flex items-center justify-center  p-4">
      <div className="w-[320px] rounded-2xl bg-white shadow-lg overflow-hidden ">
        {/* Header */}
        <div className="bg-red-600 text-white font-semibold text-center py-3 text-lg">
          KHQR
        </div>

        {/* Body */}
        <div className="px-5 py-4 text-start ">
          <p className="text-gray-700 font-medium ml-4">
            {qr.merchant_name.toUpperCase()}
          </p>
          <p className="text-2xl font-bold mt-1 ml-4">
            {"$"}
            {qr.amount}
          </p>
          <hr />

          <div className="mt-4 flex justify-center">
            <div className="bg-white p-2 rounded-xl">
              <QRCodeCanvas value={qr.qr_string} size={240} level="H" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
