export default interface CourseCardProps {
  title: string;
  description: string;
  instructor: string;
  thumbnail: string; // URL to course image
  duration: string; // e.g. "12 hours""
  level: string
  price?: string; // optional, e.g. "$49" or "Free"
  link: string; // to course page
}