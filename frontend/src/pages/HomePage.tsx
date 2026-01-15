import SectionTitle from "@/components/layouts/SectionTitle";
import { useGetAllCourseQuery } from "@/features/courses/api/courseApi";
import CourseCard from "@/features/courses/components/CourseCard";

const courses = [
  {
    title: "React & TypeScript Masterclass",
    description:
      "Build modern web applications using React, TypeScript, hooks, and best practices.",
    instructor: "Jane Doe",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122542-727a01e17d59?w=800&auto=format&fit=crop",
    duration: "18 hours",
    level: "Intermediate",
    price: "$79",
    link: "/courses/react-ts",
  },
  {
    title: "React Fundamentals",
    description:
      "Learn the core concepts of React from scratch with practical examples.",
    instructor: "Jane Doe",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122542-727a01e17d59?w=800&auto=format&fit=crop",
    duration: "12 hours",
    level: "Beginner",
    price: "Free",
    link: "/courses/react-basic",
  },
  {
    title: "JavaScript Essentials",
    description:
      "Understand JavaScript deeply and build a strong foundation for web development.",
    instructor: "Jane Doe",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122542-727a01e17d59?w=800&auto=format&fit=crop",
    duration: "10 hours",
    level: "Beginner",
    price: "$39",
    link: "/courses/js",
  },
  {
    title: "HTML & CSS Mastery",
    description:
      "Design beautiful and responsive websites using modern HTML & CSS.",
    instructor: "Jane Doe",
    thumbnail:
      "https://images.unsplash.com/photo-1633356122542-727a01e17d59?w=800&auto=format&fit=crop",
    duration: "8 hours",
    level: "Beginner",
    price: "$29",
    link: "/courses/html-css",
  },
];

function HomePage() {
const { data} = useGetAllCourseQuery(undefined);  
  console.log(data)
return (
    <>
      {/* Hero Section */}
      <section className="relative px-6 py-24 text-center">
        <div className="hero-background absolute inset-0 -z-10" />

        <div className="mx-auto max-w-5xl">
          <h1 className="text-4xl p-1.5 md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-color to-accent-color">
            សិក្សាកូដជាភាសាខ្មែរ
          </h1>

          <p className=" p-1.5 text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-primary-color to-accent-color">
            ជាមួយ CodeKampuchea
          </p>

          <p className="mt-6 text-lg md:text-xl text-discription-color">
            CodeKampuchea គឺជាវេទិកាសិក្សាកម្មវិធីកុំព្យូទ័រ និងបច្ចេកវិទ្យា IT
            ជាភាសាខ្មែរ សម្រាប់អ្នកចាប់ផ្តើមពីសូន្យ ដោយមានមេរៀនងាយយល់ កូដឧទាហរណ៍
            និង Project អនុវត្តបានពិតប្រាកដ។
          </p>
        </div>
      </section>

      {/* Courses Section */}
      <section className="relative px-6 py-20 md:px-20 lg:px-32 text-center">
        {/* header section */}
        <SectionTitle
          title="ថ្នាក់ដែលយើងមាន"
          description="ជ្រើសរើសថ្នាក់ដែលអ្នកចាប់អារម្មណ៍
            ហើយចាប់ផ្តើមរៀនភ្លាមៗជាមួយ CodeKampuchea"
          width={200}
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
