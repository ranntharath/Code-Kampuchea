export  interface CourseCardProps {
  id:number
  title: string;
  description: string;
  instructor: string;
  thumbnail: string; // URL to course image
  duration: string; // e.g. "12 hours""
  level: string
  final_price:number
  is_free:boolean
  price?: string; // optional, e.g. "$49" or "Free"
}

export interface Course extends CourseCardProps{
  discount_percent:number,
  category: string,
  created_at: string,
  updated_at: string
}

export  interface CourseDetailResponse extends Course {
  succuess:boolean,
  course: Course
}
export interface GetAllCoursesResponse {
  success:boolean,
  message:string,
  data: Course[]
}

export interface Lesson {
  id: number;
  course_id: number;
  title: string;
  description: string;
  video_url: string;
  order: number;
  created_at: string;
  updated_at: string;
}
export interface CourseWithLessons extends Course {
  success:boolean,
  message:string,
  course: Course & { lessons: Lesson[] };
  
}