import { IoBookOutline } from "react-icons/io5";
import PaymentQr from "./PaymentQr";
import { Button } from "@/components/ui/button";
import type { Course } from "@/types/course";
import type { CreatePaymentResponse } from "@/types/payment";
import { Spinner } from "@/components/ui/spinner";
type PaymentModalProps = {
  onClose: () => void;
  isOpen: boolean;
  course: Course;
  isCreatePayment: boolean;
  qr: CreatePaymentResponse;
  onCheckPayment: () => void;
  isCheckingPayment: boolean;
};
function PaymentModal({
  onClose,
  isOpen,
  course,
  isCreatePayment,
  isCheckingPayment,
  qr,
  onCheckPayment,
}: PaymentModalProps) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-40" />

      {isCreatePayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/4">
          <div className="bg-white rounded-lg shadow-lg p-8 w-80 flex flex-col items-center gap-4">
            <Spinner fontSize="lg" />
            <p className="text-gray-700 text-center font-medium">
              កំពុងបង្កើត QR ការទូទាត់...
            </p>
          </div>
        </div>
      )}

      {!isCreatePayment && (
        <div
          className="bg-white relative rounded-sm p-6 z-50
            max-h-[90vh] w-full m-10 max-w-4xl
            overflow-y-auto no-scrollbar"
        >
          {/* header */}

          <div>
            <div className="flex  justify-between items-center  px-5 py-2 shadow-sm bg-primary-color/4 rounded-sm ">
              <div className="space-y-2  rounded-lg">
                <p className="text-xl font-bold ">បញ្ចប់ការទូទាត់</p>
                <p>ទូទាត់ជាមួយ Bakong KHQR ដោយមានសុវត្ថិភាព</p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-500 text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>
            {/* body */}
            <div className="flex flex-col md:flex-row justify-center items-start gap-5 mt-4">
              {/* right  */}
              <div className="w-full ">
                <div className=" w-full  space-y-2 bg-yellow-100/50 rounded-sm p-4 flex flex-col  shadow-sm ">
                  <div className="flex items-center gap-4">
                    <IoBookOutline className="text-primary-color" />
                    <div>
                      <p className="font-semibold ">ព័ត៌មានការទូទាត់</p>
                      <p>ការបញ្ជាទិញ</p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <p>មេរៀន</p>
                      <p>មេរៀន HTML</p>
                    </div>
                    <div className="flex justify-between">
                      <p>តម្លៃវគ្គសិក្សា</p>
                      <p className="font-bold text-2xl">
                        ${course.final_price}
                      </p>
                    </div>
                  </div>
                </div>
                {/* នែនាំ */}
                {/* Instructions */}
                <div className="mt-4 bg-gray-50 rounded-xl shadow-sm p-4 space-y-3">
                  <p className="font-semibold text-gray-800">
                    ការណែនាំក្នុងការទូទាត់
                  </p>

                  <ul className="space-y-3 text-sm text-gray-700">
                    {[
                      "ជ្រើសរើសមុខងារ “Scan QR”",
                      "ស្កេន KHQR ដែលបង្ហាញនៅលើអេក្រង់",
                      "ពិនិត្យព័ត៌មាន និងបញ្ជាក់ការទូទាត់",
                      "ចុចប៊ូតុង ផ្ទៀងផ្ទាត់ការទូទាត់",
                    ].map((text, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span
                          className="flex h-6 w-6 items-center justify-center rounded-full
                      bg-linear-to-br from-primary-color to-accent-color
                      text-white text-xs font-bold shadow"
                        >
                          {index + 1}
                        </span>
                        <p>{text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <Button
                  onClick={onCheckPayment}
                  disabled={isCheckingPayment}
                  className="w-full mt-4 bg-transparent border border-text-color text-text-color
             cursor-pointer transition-all duration-200
             hover:bg-text-color hover:text-white
             active:scale-95"
                >
                  {isCheckingPayment ? (
                    <>
                      {" "}
                      កំពុងធ្វើការផ្ទៀងផ្ទាត់
                      <Spinner />{" "}
                    </>
                  ) : (
                    "ផ្ទៀងផ្ទាត់ការទូទាត់"
                  )}
                </Button>
              </div>

              {/* left */}
              {/* qr */}
              <div className="w-full">
                <PaymentQr qr={qr} />
                <p className="text-sm text-gray-500 text-center mt-3">
                  ការទូទាត់មានសុវត្ថិភាព • គាំទ្រ QR
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentModal;
