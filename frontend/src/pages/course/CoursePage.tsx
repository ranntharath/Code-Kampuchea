// CoursePage.tsx
import { useGetAllCourseQuery } from '@/features/courses/api/courseApi';
import { useState } from 'react';

// interface Course {
//   id: string;
//   title: string;
//   description: string;
//   instructor: string;
//   level: 'Beginner' | 'Intermediate' | 'Advanced' | 'គ្រប់កម្រិត';
//   duration: string;
//   price: number | 'ឥតគិតថ្លៃ';
//   imageUrl?: string;
//   enrolled?: number;
// }

// const mockCourses: Course[] = [
//   {
//     id: '1',
//     title: 'React & TypeScript - មេរៀនជាក់ស្តែង',
//     description: 'រៀន React ទំនើបជាមួយ Hooks, Context, បង្កើនប្រសិទ្ធភាព និង TypeScript ពីថ្នាក់ដើមដល់ថ្នាក់ខ្ពស់។',
//     instructor: 'សារ៉ា ឆេន',
//     level: 'Intermediate',
//     duration: '១៨ ម៉ោង',
//     price: 89,
//     imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800',
//     enrolled: 12430,
//   },
//   {
//     id: '2',
//     title: 'Full-Stack Next.js & Prisma ២០២៥',
//     description: 'បង្កើតកម្មវិធី Full-Stack ត្រៀមដាក់ផ្សាយជាមួយ Next.js 14, App Router, Server Actions, Prisma និង PostgreSQL។',
//     instructor: 'អាឡិច រីវេរ៉ា',
//     level: 'Advanced',
//     duration: '២៤ ម៉ោង',
//     price: 129,
//     imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
//     enrolled: 8740,
//   },
//   {
//     id: '3',
//     title: 'Python សម្រាប់ Data Science & Machine Learning',
//     description: 'ពីគ្មានចំណេះដឹង ទៅជាអ្នកជំនាញ — រៀន Python ពេញលេញ ផ្តោតលើការវិភាគទិន្នន័យ ការបង្ហាញ និងការណែនាំ Machine Learning។',
//     instructor: 'ដុកទ័រ ម៉ាយ៉ា ប៉ាតែល',
//     level: 'Beginner',
//     duration: '៣២ ម៉ោង',
//     price: 'ឥតគិតថ្លៃ',
//     imageUrl: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800',
//     enrolled: 45210,
//   },
//   {
//     id: '4',
//     title: 'UI/UX Design Masterclass ២០២៥',
//     description: 'រៀន Figma, ប្រព័ន្ធរចនា, ការស្រាវជ្រាវអ្នកប្រើ, គំរូដើម, ភាពងាយស្រួលប្រើ និងគោលការណ៍ UX ទំនើប។',
//     instructor: 'អេម៉ា ឌុយប៊ីស',
//     level: 'គ្រប់កម្រិត',
//     duration: '១៤ ម៉ោង',
//     price: 69,
//     imageUrl: 'https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?w=800',
//     enrolled: 9820,
//   },
// ];

export default function CoursePage() {
  const { data: courses, isLoading } = useGetAllCourseQuery();
  const [filterLevel, setFilterLevel] = useState<string>('ទាំងអស់');

  const levels = ['ទាំងអស់', 'Beginner', 'Intermediate', 'Advanced', 'គ្រប់កម្រិត'];

  const filteredCourses = courses?.data.filter((course) =>
    filterLevel === 'ទាំងអស់' ? true : course?.level === filterLevel
  ) || [];

  if(isLoading){
    return <div>កំពុងផ្ទុកវគ្គសិក្សា...</div>
  }
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 ">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="hero-background absolute inset-0 -z-10" />

        <div className="mx-auto max-w-5xl text-center">
          <h1 className="text-4xl p-1.5 md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-color to-accent-color">
            ស្វែងរកវគ្គសិក្សារបស់យើង
          </h1>

          

          <p className="mt-6 text-lg md:text-xl text-discription-color">
            រៀនជំនាញដែលទីផ្សារត្រូវការ ពីអ្នកជំនាញខាងវិស័យ
          </p>
        </div>
        </div>
        

        

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {levels.map((level) => (
            <button
              key={level}
              onClick={() => setFilterLevel(level)}
              className={`
                px-6 py-2.5 rounded-full text-sm font-medium transition-all
                ${
                  filterLevel === level
                    ? 'bg-primary-color text-white shadow-lg shadow-primary-color/30'
                    : 'bg-white text-color-text-color border border-gray-300 hover:border-accent-color hover:text-accent-color'
                }
              `}
            >
              {level === 'Beginner'
                ? 'ថ្នាក់ដើម'
                : level === 'Intermediate'
                ? 'ថ្នាក់កណ្តាល'
                : level === 'Advanced'
                ? 'ថ្នាក់ខ្ពស់'
                : level}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${course.thumbnail})` }}
                />

                <div className="p-5 flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`
                        text-xs font-semibold px-3 py-1 rounded-full
                        ${
                          course.level === 'Beginner'
                            ? 'bg-green-100 text-green-800'
                            : course.level === 'Intermediate'
                            ? 'bg-amber-100 text-amber-800'
                            : course.level === 'Advanced'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-purple-100 text-purple-800'
                        }
                      `}
                    >
                      {course.level === 'Beginner'
                        ? 'ថ្នាក់ដើម'
                        : course.level === 'Intermediate'
                        ? 'ថ្នាក់កណ្តាល'
                        : course.level === 'Advanced'
                        ? 'ថ្នាក់ខ្ពស់'
                        : course.level}
                    </span>

                    <span className="font-bold text-primary-color">
                      {course.final_price === 0 ? 'ឥតគិតថ្លៃ' : `$${course.price}`}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-text-color line-clamp-2 mb-2 group-hover:text-accent-color transition-colors">
                    {course.title}
                  </h3>

                  <p className="text-sm text--discription-color mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  <p className="text-sm text-gray-500 mb-4">
                    ដោយ <span className="font-medium">{course.instructor}</span>
                  </p>


                  <button
                    className={`
                      w-full py-3 rounded-xl font-medium text-white
                      bg-primary-color hover:bg-accend-purple
                      transition-colors duration-300
                    `}
                  >
                    ចុះឈ្មោះឥឡូវ
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-text-color mb-3">
              មិនមានវគ្គសិក្សា
            </h3>
            <p className="text--discription-color">
              សូមសាកល្បងផ្លាស់ប្តូរតម្រង
            </p>
          </div>
        )}
      </div>
    </div>
  );
}