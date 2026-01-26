import { baseApi } from "@/redux/api/baseApi";
import type { Login, Register, RegisterResponse } from "@/types/auth";
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<RegisterResponse,Login>({
      query: (body) => ({
        url: `/api/login`,
        method: "POST",
        body:body
      }),
    }),
    register: builder.mutation<RegisterResponse,Register>({
      query: (body) => ({
        url: "/api/register",
        method: "POST",
        body:body
      }),
    }),
    veritfyOtp: builder.mutation<RegisterResponse, {email:string, otp:string}>({
      query: (body)=>({
        url: '/api/verify-otp',
        method: "POST",
        body: body
      })
    })
  }),
})
export const {useLoginMutation, useRegisterMutation, useVeritfyOtpMutation} = authApi