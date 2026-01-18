import { useNavigate } from "react-router-dom";
import type { CourseCardProps } from "../../../types/course";

function CourseCard({
  id,
  instructor,
  title,
  description,
  thumbnail,
  level,
  price,
  final_price,
  is_free,
  is_enrolled,
}: CourseCardProps) {
  const navigate = useNavigate();
  const handleLearn = () => {
    if (is_free || is_enrolled) {
      navigate(`/course/${id}/learn`);
    } else {
      navigate(`/course/${id}`);
    }
  };

  return (
    <div
      key={id}
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
    >
      <div
        className="h-48 bg-cover bg-center"
        style={{ backgroundImage: `url(${thumbnail})` }}
      />

      <div className="p-5 flex flex-col">
        <div className="flex justify-between items-center mb-3">
          <span
            className={`
                        text-xs font-semibold px-3 py-1 rounded-full
                        ${
                          level === "Beginner"
                            ? "bg-green-100 text-green-800"
                            : level === "Intermediate"
                              ? "bg-amber-100 text-amber-800"
                              : level === "Advanced"
                                ? "bg-red-100 text-red-800"
                                : "bg-purple-100 text-purple-800"
                        }
                      `}
          >
            {level === "Beginner"
              ? "ថ្នាក់ដើម"
              : level === "Intermediate"
                ? "ថ្នាក់កណ្តាល"
                : level === "Advanced"
                  ? "ថ្នាក់ខ្ពស់"
                  : level}
          </span>

          <span
            className={`font-bold ${
              final_price === 0 ? "text-green-500" : "text-primary-color"
            }`}
          >
            {final_price === 0 ? "ឥតគិតថ្លៃ" : `$${price}`}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-text-color line-clamp-2 mb-2 group-hover:text-accent-color transition-colors">
          {title}
        </h3>

        <p className="text-sm text--discription-color mb-4 line-clamp-3">
          {description}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          ដោយ <span className="font-medium">{instructor}</span>
        </p>

        <button
          onClick={handleLearn}
          className={` cursor-pointer
            w-full py-3 rounded-xl font-medium text-white transition-colors duration-300
            ${
              is_free || is_enrolled
                ? "bg-green-500 hover:bg-green-600"
                : "bg-primary-color hover:bg-purple-600"
            }
          `}
        >
          {is_free || is_enrolled ? "ចាប់ផ្តើមរៀន" : "សូមចូលទៅកាន់វគ្គសិក្សា"}
        </button>
      </div>
    </div>
  );
}

export default CourseCard;
