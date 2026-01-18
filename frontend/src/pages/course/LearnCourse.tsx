import { useParams } from "react-router-dom";
import { useState } from "react";
import { useGetCourseLessonesQuery } from "@/features/lesson/api/lessonApi";

function LearnCourse() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, error } = useGetCourseLessonesQuery(id || "");

  const [activeLessonId, setActiveLessonId] = useState<number | null>(null);

  if (!id)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Invalid course ID
      </div>
    );
  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading course...
      </div>
    );
  if (error || !data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Course not found
      </div>
    );

  const course = data?.course;
  const lessons = course.lessons || [];

  if (lessons.length > 0 && activeLessonId === null) {
    setActiveLessonId(lessons[0].id);
  }

  const activeLesson =
    lessons.find((l) => l.id === activeLessonId) || lessons[0];

  return (
    <div className="min-h-screen bg-gray-50/60">
      {/* Header / Course Info Bar */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-text-color line-clamp-1">
              {course.title}
            </h1>
            <p className="text-sm text-discription-color mt-1">
              {course.instructor} • {course.level}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            {course.is_free ? (
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
                Free
              </span>
            ) : (
              <>
                <span className="text-accend-purple font-bold text-lg">
                  ${course.discount_percent > 0 ? course.price : course.price}
                </span>
                {course.discount_percent > 0 && (
                  <span className="text-gray-400 line-through">
                    ${course.price}
                  </span>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        <div className="grid lg:grid-cols-12 gap-6 xl:gap-8">
          {/* LEFT: Video Player - takes most space */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl aspect-video">
              {activeLesson?.video_url ? (
                <video
                  src={activeLesson.video_url}
                  controls
                  className="w-full h-full"
                  poster={course.thumbnail}
                >
                  <track kind="captions" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white text-xl">
                  No video available for this lesson
                </div>
              )}
            </div>

            {/* Current Lesson Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <h2 className="text-2xl font-bold text-text-color mb-3">
                {activeLesson?.title || "Select a lesson"}
              </h2>
              <p className="text-discription-color leading-relaxed">
                {activeLesson?.description ||
                  "No description available for this lesson."}
              </p>
            </div>
          </div>

          {/* RIGHT: Lessons List + Content */}
          <div className="lg:col-span-4 xl:col-span-3">
            <div className="bg-white rounded-xl shadow-md border overflow-hidden sticky top-20">
              <div className="p-5 border-b bg-gray-50">
                <h3 className="text-lg font-semibold text-text-color">
                  Course Content ({lessons.length} lessons)
                </h3>
              </div>

              <div className="max-h-[70vh] overflow-y-auto divide-y">
                {lessons.length === 0 ? (
                  <div className="p-6 text-center text-gray-500">
                    No lessons available yet
                  </div>
                ) : (
                  lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLessonId(lesson.id)}
                      className={`w-full text-left p-5 hover:bg-gray-50 transition flex items-start gap-4 ${
                        activeLessonId === lesson.id
                          ? "bg-primary-color/5 border-l-4 border-primary-color"
                          : ""
                      }`}
                    >
                      <div className="shrink-0 mt-1">
                        <span
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            activeLessonId === lesson.id
                              ? "bg-primary-color text-white"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {lesson.order || "?"}
                        </span>
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium ${
                            activeLessonId === lesson.id
                              ? "text-primary-color"
                              : "text-text-color"
                          } line-clamp-2`}
                        >
                          {lesson.title}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LearnCourse;
