export  interface CourseCardProps {
  title: string;
  description: string;
  instructor: string;
  thumbnail: string; // URL to course image
  duration: string; // e.g. "12 hours""
  level: string
  price?: string; // optional, e.g. "$49" or "Free"
  link: string; // to course page
}

export interface Course extends CourseCardProps{
  id:number
  discount_percent:number,
  final_price:number,
  is_free: boolean,
  category: string,
  created_at: string,
  updated_at: string
}

export interface GetAllCoursesResponse {
  success:boolean,
  message:string,
  data: Course[]
}