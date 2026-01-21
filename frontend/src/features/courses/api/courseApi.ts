import type { PaymentConfirmationResponse } from "@/types/payment";
import type { CourseDetailResponse, GetAllCoursesResponse } from "../../../types/course";
import { baseApi } from "@/redux/api/baseApi";


export const courseApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
    getAllCourse: builder.query<GetAllCoursesResponse, void>({
      query: () => ({
        url: "/api/courses",
        method: "GET",
      }),
      providesTags: ['Course']
    }),
    getCourseById: builder.query<CourseDetailResponse, string>({
      query: (id: string) => ({
        url: `/api/courses/${id}`,
        method: "GET",
      }),
      providesTags: ['Course']
    }),
    checkPayment: builder.mutation<PaymentConfirmationResponse, { md5: string }>({
      query: ({ md5 }) => ({
        url: `/api/payments/status`,  
        method: "POST",
        body: { md5 }
      }),
      invalidatesTags: ['Course']
    })
  }),
})
export const { useGetAllCourseQuery, useGetCourseByIdQuery, useCheckPaymentMutation } = courseApi;