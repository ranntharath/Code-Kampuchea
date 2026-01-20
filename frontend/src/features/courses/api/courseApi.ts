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
    })
  }),
})
export const { useGetAllCourseQuery, useGetCourseByIdQuery } = courseApi;