import { baseApi } from "@/redux/api/baseApi";
import type { CreatePaymentResponse } from "@/types/payment";

const paymentSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPayment: builder.mutation<CreatePaymentResponse, {course_id:string}>({
            query: (data) => ({
                url: "/payments",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Payment"],
        }),
    }),
    
});

export const { useCreatePaymentMutation } = paymentSlice;
export default paymentSlice;