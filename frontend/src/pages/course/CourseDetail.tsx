import { Button } from "@/components/ui/button";
import {
  useCheckPaymentMutation,
  useGetCourseByIdQuery,
} from "@/features/courses/api/courseApi";
import {
  useCratePaymentMutation,
  useCreateOrderMutation,
} from "@/features/order/api/orderSlice";
import PaymentModal from "@/features/payment/components/PaymentModal";
import type { CreatePaymentResponse } from "@/types/payment";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // get current course detail
  const { data, isLoading } = useGetCourseByIdQuery(id!);
  const [createPayment, { isLoading: isLoadingPayment }] =
    useCratePaymentMutation();
  const [checkPayment, { isLoading: isCheckingPayment }] =
    useCheckPaymentMutation();

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
  const [showPayment, setshowPayment] = useState(false);

  // enroll handler
  async function handleEnroll() {
    if (!data?.course?.id) return;
    if(data.course.is_free || data.course.is_enrolled){
      navigate(`/course/${id}/learn`)
      return
    }
    // open modal
    setshowPayment(true);
    try {
      const payment = await createPayment({
        course_id: data.course.id,
      }).unwrap();

      setQr(payment);
    } catch (err) {
      console.error("បរាជ័យក្នុងការបង្កើតការទូទាត់:", err);
    }
  }

  const checkPaymentStatus = async () => {
    try {
      const response = await checkPayment({ md5: qr.md5 }).unwrap();
      if (response.paid) {
        await createOrder({ course_id: data!.course.id }).unwrap();
        // close QR sheet
        setshowPayment(false);

        navigate(`/course/${data!.course.id}/learn`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <div className="p-10">កំពុងផ្ទុកទិន្នន័យ...</div>;

  return (
    <>
      <PaymentModal
        onClose={() => setshowPayment(false)}
        isOpen={showPayment}
        course={data!.course}
        isCreatePayment={isLoadingPayment}
        qr={qr}
        onCheckPayment={checkPaymentStatus}
        isCheckingPayment={isCheckingPayment}
      />
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
              className="w-full rounded-sm shadow-lg aspect-video object-cover"
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
            <div className="bg-white rounded-sm shadow-xl p-6">
              <h3 className="text-xl font-bold mb-4">ចុះឈ្មោះវគ្គសិក្សា</h3>

              <div className=" mb-3">
                <p className="font-semibold">តម្លៃវគ្គសិក្សា</p>
                <span className=" text-primary-color font-bold text-2xl">
                  ${data?.course.final_price}
                </span>
              </div>

              <div className="">
                <p className="font-semibold mb-4">អ្វីដែលអ្នកនឹងទទួលបាន</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>ចូលរៀនបានមិនកំណត់</li>
                  <li>គម្រោងអនុវត្តជាក់ស្តែង</li>
                  <li>វិដេអូបង្រៀនមានគុណភាព</li>
                </ul>
              </div>

{!showPayment && (
  <Button
    onClick={handleEnroll}
    className={`
      w-full
      py-5
      rounded-sm
      font-bold
      transition-all
      duration-200
      mt-6
      cursor-pointer

      ${
        data?.course.is_enrolled
          ? "bg-green-600 hover:bg-green-700 text-white"
          : data?.course.is_free
          ? "bg-blue-600 hover:bg-blue-700 text-white"
          : "bg-primary-color/95 hover:bg-primary-color text-white"
      }

      hover:scale-[1.01]
      active:scale-[0.98]
    `}
  >
    {data?.course.is_enrolled || data?.course.is_free
      ? "បន្តទៅវគ្គសិក្សា"
      : "បន្តទៅការទូទាត់"}
  </Button>
)}

              <p className="text-sm text-gray-500 text-center mt-3">
                ការទូទាត់មានសុវត្ថិភាព • គាំទ្រ QR
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
