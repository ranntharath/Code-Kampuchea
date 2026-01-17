import { baseApi } from "@/redux/api/baseApi";
import type { Register, RegisterResponse } from "@/types/auth";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => ({
        url: `/api/login`,
        method: "POST",
      }),
    }),
    register: builder.mutation<RegisterResponse,Register>({
      query: (body) => ({
        url: "/api/register",
        method: "POST",
        body:body
      }),
    }),
  }),
})
export const {useLoginMutation, useRegisterMutation} = authApi