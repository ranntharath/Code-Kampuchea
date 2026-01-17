import SectionTitle from "@/components/layouts/SectionTitle";
import { useGetAllCourseQuery } from "@/features/courses/api/courseApi";
import CourseCard from "@/features/courses/components/CourseCard";


function HomePage() {
const { data:course} = useGetAllCourseQuery();
  
  
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
          {course?.data?.map((course, idx) => (
            <CourseCard key={idx} {...course} />
          ))}
        </div>
      </section>
    </>
  );
}

export default HomePage;
