import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const baseApi = createApi({
    reducerPath: "baseAPi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_BACKEND_URL,
        prepareHeaders:(header)=>{
            const token = localStorage.getItem('token')
            if(token){
                header.set("Authorization", `Bearer ${token}`)
            }
            return header
        }
        
    }),
    tagTypes: ["Course","Lesson", "Orders","Payment"],
    endpoints:()=>({})

})