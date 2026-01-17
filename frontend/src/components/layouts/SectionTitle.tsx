type SectionProps = {
  title: string;
  description: string;
  width: number;
};

function SectionTitle({ title, description, width }: SectionProps) {
  return (
    <div className="mb-12 relative">
      <div
        className="absolute left-1/2 -top-4 h-1 -translate-x-1/2 rounded bg-linear-to-r from-blue-500 to-purple-500"
        style={{ width: `${width}px` }}
      />

      <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-500">
        {title}
      </h2>

      <p className="mt-3 text-lg text-gray-600">
        {description}
      </p>
    </div>
  );
}

export default SectionTitle;
