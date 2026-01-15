import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const authApi = createApi({
  reducerPath: "authApi",
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
    login: builder.mutation({
      query: () => ({
        url: `/api/login`,
        method: "POST",
      }),
    }),
    register: builder.mutation({
      query: () => ({
        url: "/api/register",
        method: "POST",
      }),
    }),
  }),
});
export const {useLoginMutation, useRegisterMutation} = authApi