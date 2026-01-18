import { baseApi } from "@/redux/api/baseApi";
import type { CourseWithLessons } from "@/types/course";

export const lessonApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourseLessones: builder.query<CourseWithLessons, string>({
            query: (courseId: string) => ({
                url: `/api/courses/${courseId}/lessons`,
                method: "GET",
            }),
            providesTags: ['Lesson']
        })
    })
});

export const { useGetCourseLessonesQuery } = lessonApi;