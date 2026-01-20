import ConfirmDialog from "@/components/layouts/ConfirmDialog";
import { useGetCourseByIdQuery } from "@/features/courses/api/courseApi";
import {
  useCratePaymentMutation,
  useCreateOrderMutation,
} from "@/features/order/api/orderSlice";
import PaymentQr from "@/features/payment/components/PaymentQr";
import type { CreatePaymentResponse } from "@/types/payment";
import { useState } from "react";
import { useParams } from "react-router-dom";

function CourseDetail() {
  const [createOrder] = useCreateOrderMutation();
  const [createPayment] = useCratePaymentMutation();
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCourseByIdQuery(id!);
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [qr, setQr] = useState<CreatePaymentResponse>({} as CreatePaymentResponse);
  const [qrString, setQrString] = useState<string>("");

  async function handleEnroll() {
    if (!data?.course?.id || !id) return;

    try {
      const payment = await createPayment({
        course_id: data.course.id,
      }).unwrap();
      setQr(payment);
      setQrString(payment.qr_string);
      // const order = await createOrder({
      //   course_id: data.course.id,
      // }).unwrap();
    } catch (error) {
      console.error("Enrollment failed:", error);
    }
  }

  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <div className="min-h-screen bg-white ">
        {/* Hero Section */}
        <section className="relative bg-linear-to-br from-primary-color to-accend-purple text-white py-24 px-6 md:px-12 lg:px-24 overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            {/* Optional subtle pattern or decoration */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                {data?.course.title}
              </h1>
              <p className="text-xl md:text-2xl opacity-90 mb-8 max-w-2xl">
                {data?.course.description}
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setIsEnrolled(true)}
                  className="bg-white text-primary-color font-bold text-lg px-10 py-5 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  ចុះឈ្មោះឥឡូវនេះ
                </button>
                <button className="border-2 border-white text-white font-bold text-lg px-10 py-5 rounded-xl hover:bg-white/20 transition-all">
                  មើលវីដេអូសាកល្បង
                </button>
              </div>

              {/* <div className="mt-10 flex flex-wrap gap-8 text-sm md:text-base">
              <div>១២ មេរៀន</div>
              <div>៤៨ ម៉ោង វីដេអូ</div>
              <div>គាំទ្រ ជាប់មួយជីវិត</div>
              <div>វិញ្ញាបនបត្រ បញ្ចប់វគ្គ</div>
            </div> */}
            </div>

            <div className="relative hidden md:block">
              {/* You can replace with real course preview image or video */}
              <div className="bg-black/30 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
                <div className="aspect-video bg-gray-900 rounded-xl mb-4 flex items-center justify-center text-white/70">
                  <img src={data?.course.thumbnail} alt="course thumbnail" />
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold">
                    ${data?.course.final_price}
                  </div>
                  <div className="text-sm line-through opacity-70">
                    ${data?.course.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-text-color text-center mb-16">
              អ្នកនឹងរៀនអ្វីខ្លះ?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                "បង្កើត Project ពេញលេញជាមួយ React + TypeScript",
                "គ្រប់គ្រងស្ថានភាពដ៏ស្មុគស្មាញជាមួយ Zustand & Context",
                "ប្រើ Tailwind CSS និង Shadcn/UI ឲ្យបានល្អបំផុត",
                "សរសេរ Code ស្អាត និងងាយស្រួលថែទាំ",
                "ធ្វើការ Authentication & Authorization",
                "Deploy ទៅ Vercel / Netlify ដោយសុវត្ថិភាព",
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border border-gray-100 flex items-start gap-4"
                >
                  <div className="text-3xl text-accent-color">✓</div>
                  <p className="text-discription-color text-lg leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* For Whom */}
        <section className="py-20 px-6 md:px-12 lg:px-24 bg-white">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-text-color mb-10">
              វគ្គសិក្សានេះសម្រាប់
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-10 bg-linear-to-br from-purple-50 to-pink-50 rounded-3xl">
                <h3 className="text-2xl font-bold text-accend-purple mb-4">
                  អ្នកចាប់ផ្តើម
                </h3>
                <p className="text-discription-color">
                  មិនដែលធ្លាប់ប្រើ React ឬ TypeScript ពីមុន
                </p>
              </div>
              <div className="p-10 bg-linear-to-br from-blue-50 to-indigo-50 rounded-3xl">
                <h3 className="text-2xl font-bold text-primary-color mb-4">
                  អ្នកមានបទពិសោធន៍តិចតួច
                </h3>
                <p className="text-discription-color">
                  ចង់ធ្វើឲ្យកូដរបស់ខ្លួនមានគុណភាព និងអាចរក្សាបានយូរ
                </p>
              </div>
              <div className="p-10 bg-linear-to-br from-pink-50 to-rose-50 rounded-3xl">
                <h3 className="text-2xl font-bold text-accent-color mb-4">
                  អ្នកចង់ប្តូរការងារ
                </h3>
                <p className="text-discription-color">
                  ចង់បង្កើត Portfolio ដ៏រឹងមាំសម្រាប់ការងារ Frontend
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-24 px-6 bg-accend-purple text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              ចាប់ផ្តើមរៀនឥឡូវនេះ មុនពេលតម្លៃឡើង
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-90">
              បញ្ចុះតម្លៃពិសេសសម្រាប់ ៥០ នាក់ដំបូង!
            </p>

            <button className="bg-white text-accend-purple font-bold text-xl md:text-2xl px-16 py-6 rounded-full shadow-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              ចុះឈ្មោះ និងទទួលបានជូនដំណឹងភ្លាមៗ
            </button>
          </div>
        </section>
      </div>

      <ConfirmDialog
        title="ចុះឈ្មោះ"
        message="តើអ្នកប្រាកដថា ចុះឈ្មោះសម្រាប់វគ្គសិក្សានេះ?"
        onCancel={() => setIsEnrolled(false)}
        onConfirm={() => {
          setIsEnrolled(false);
          handleEnroll();
        }}
        isOpen={isEnrolled}
      />
      {qrString && (
        <PaymentQr qr={qr} />
      )}
    </>
  );
}

export default CourseDetail;
