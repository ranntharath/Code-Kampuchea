import { Link } from "react-router-dom"; // or use <a> if no router
import type { CourseCardProps } from "../../../types/course";

function CourseCard({
  title,
  description,
  thumbnail,
  duration,
  level,
  price,
  link,
}: CourseCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-xl ">
      {/* Thumbnail */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-5 font-sans">
        {/* Badges */}
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {level}
          </span>
          <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800 dark:bg-gray-700 dark:text-gray-300">
            {duration}
          </span>
          {price && (
            <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900/30 dark:text-green-300">
              {price}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold leading-tight text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>

        {/* Instructor + CTA */}
        <div className="flex items-center justify-between">
          <Link
            to={link}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Enroll Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CourseCard;
