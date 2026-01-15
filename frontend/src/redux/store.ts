
import { authApi } from "@/features/auth/api/authApi";
import { courseApi } from "@/features/courses/api/courseApi";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer:{
        [authApi.reducerPath]:authApi.reducer,
        [courseApi.reducerPath]:courseApi.reducer
    },
    middleware:(getDefaultMiddleware)=>(
        getDefaultMiddleware().concat(
            authApi.middleware,
            courseApi.middleware
        )
    )
})