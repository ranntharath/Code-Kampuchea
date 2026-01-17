import type { GetAllCoursesResponse } from "../../../types/course";
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
  }),
})
export const { useGetAllCourseQuery } = courseApi;
