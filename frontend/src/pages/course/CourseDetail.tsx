import {
  useCheckPaymentMutation,
  useGetCourseByIdQuery,
} from "@/features/courses/api/courseApi";
import {
  useCratePaymentMutation,
  useCreateOrderMutation,
} from "@/features/order/api/orderSlice";
import PaymentQr from "@/features/payment/components/PaymentQr";
import type { CreatePaymentResponse } from "@/types/payment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  // get current course detail
  const { data, isLoading } = useGetCourseByIdQuery(id!);
  const [createPayment, { isLoading: isLoadingPayment }] =
    useCratePaymentMutation();
  const [checkPayment] = useCheckPaymentMutation();

  const [createOrder] = useCreateOrderMutation();

  // QR state for payment
  const [qr, setQr] = useState<CreatePaymentResponse>({
    merchant_name: "",
    qr_string: "",
    md5: "",
    amount: "",
    course_id: 0,
  });
  // show/hide QR bottom sheet
  const [showQrSheet, setShowQrSheet] = useState(false);

  // enroll handler
  async function handleEnroll() {
    if (!data?.course?.id) return;

    try {
      const payment = await createPayment({
        course_id: data.course.id,
      }).unwrap();

      setQr(payment);
      setShowQrSheet(true);
    } catch (err) {
      console.error("បរាជ័យក្នុងការបង្កើតការទូទាត់:", err);
    }
  }

  useEffect(() => {
    if (!showQrSheet) return;

    // check payment status every 5 seconds
    const checkPaymentStatus = setInterval(async () => {
      try {
        const response = await checkPayment({ md5: qr.md5 }).unwrap();
        if (response.paid) {
          await createOrder({ course_id: data!.course.id }).unwrap();
          // close QR sheet
          setShowQrSheet(false);
          
          navigate(`/course/${data!.course.id}/learn`);

          // stop checking payment status
          clearInterval(checkPaymentStatus);
        }
      } catch (err) {
        console.log(err);
      }
    }, 3000);
    // CLEANUP 
    return () => {
      clearInterval(checkPaymentStatus);
    };
  }, [showQrSheet]);

  if (isLoading) return <div className="p-10">កំពុងផ្ទុកទិន្នន័យ...</div>;

  return (
    <>
      {/* MAIN PAGE */}
      <div className="min-h-screen bg-gray-50">
        <div
          className="
            max-w-7xl mx-auto px-4 sm:px-6 py-10 lg:py-16
            grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10
          "
        >
          {/* LEFT CONTENT */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                {data?.course.title}
              </h1>
              <p className="text-gray-600 text-lg">
                {data?.course.description}
              </p>
            </div>

            <img
              src={data?.course.thumbnail}
              className="w-full rounded-2xl shadow-lg aspect-video object-cover"
              alt="រូបភាពវគ្គសិក្សា"
            />

            <div>
              <h2 className="text-2xl font-bold mb-4">អ្វីដែលអ្នកនឹងបានរៀន</h2>
              <ul className="grid sm:grid-cols-2 gap-3 text-gray-700">
                <li>✔ គម្រោងអនុវត្តជាក់ស្តែង</li>
                <li>✔ សម្រាប់អ្នកចាប់ផ្តើមដល់កម្រិតខ្ពស់</li>
                <li>✔ វិញ្ញាបនបត្របញ្ជាក់</li>
                <li>✔ ចូលរៀនបានជារយៈពេលមិនកំណត់</li>
              </ul>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="space-y-6">
            {/* ORDER SUMMARY */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">
                សេចក្តីសង្ខេបការបញ្ជាទិញ
              </h3>

              <div className="flex justify-between mb-3">
                <span>តម្លៃវគ្គសិក្សា</span>
                <span className="line-through text-gray-400">
                  ${data?.course.price}
                </span>
              </div>

              <div className="flex justify-between text-lg font-bold mb-6">
                <span>តម្លៃសរុប</span>
                <span className="text-primary-color">
                  ${data?.course.final_price}
                </span>
              </div>

              {!showQrSheet && (
                <button
                  onClick={handleEnroll}
                  className="
                    w-full bg-primary-color text-white py-4 rounded-xl
                    font-bold transition hover:scale-105
                  "
                >
                  បន្តទៅការទូទាត់
                </button>
              )}

              <p className="text-sm text-gray-500 text-center mt-3">
                ការទូទាត់មានសុវត្ថិភាព • គាំទ្រ QR
              </p>
            </div>

            {/* DESKTOP QR */}
            {showQrSheet && (
              <div className="hidden lg:block bg-white rounded-2xl p-6">
                <PaymentQr qr={qr} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE QR BOTTOM SHEET */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          showQrSheet ? "visible" : "invisible"
        }`}
      >
        {/* BACKDROP */}
        <div
          onClick={() => setShowQrSheet(false)}
          className={`absolute inset-0 bg-black/40 transition-opacity ${
            showQrSheet ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* SHEET */}
        <div
          className={`
            absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl
            p-6 transform transition-transform duration-300
            ${showQrSheet ? "translate-y-0" : "translate-y-full"}
          `}
        >
          <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">ស្កេន QR ដើម្បីទូទាត់</h3>
            <button
              onClick={() => setShowQrSheet(false)}
              className="text-gray-500 text-xl"
            >
              ✕
            </button>
          </div>

          {isLoadingPayment ? (
            <p className="text-center text-gray-400 py-10">កំពុងបង្កើត QR...</p>
          ) : (
            <PaymentQr qr={qr} />
          )}
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
