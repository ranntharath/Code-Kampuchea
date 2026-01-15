import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (header) => {
      const token = localStorage.getItem("token");
      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }
      return header;
    },
  }),
  endpoints: (builder) => ({
    getAllCourse: builder.query({
      query: () => ({
        url: "/api/courses",
        method: "GET",
      }),
    }),
  }),
});
export const { useGetAllCourseQuery } = courseApi;
