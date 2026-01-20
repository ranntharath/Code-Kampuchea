import { baseApi } from "@/redux/api/baseApi";
import type {  OrdersResponse } from "@/types/order";
import type { CreatePaymentResponse } from "@/types/payment";
const orderSlice = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query<any, void>({
      query: () => ({
        url: "/api/orders",
        method: "GET",
      }),
      providesTags: ["Orders"],
    }),
    createOrder: builder.mutation<OrdersResponse, { course_id: number }>({
      query: (data) => ({
        url: "/api/orders",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Orders"],
    }),

    cratePayment: builder.mutation<CreatePaymentResponse, { course_id: number }>({
      query: (data) => ({
        url: "/api/payments",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useCreateOrderMutation, useGetOrdersQuery , useCratePaymentMutation} = orderSlice;
export default orderSlice;
