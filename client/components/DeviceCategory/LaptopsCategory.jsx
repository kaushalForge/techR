"use client";
import Link from "next/link";

const LaptopsCategory = ({ laptops, title }) => {
  const truncateText = (text, maxWords = 15) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  // Helper to pick first spec from arrays of arrays
  const firstOrNA = (arr) => {
    if (!arr || !Array.isArray(arr)) return "N/A";
    if (Array.isArray(arr[0])) {
      return arr[0][0] ?? "N/A";
    }
    return arr[0] ?? "N/A";
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        {title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {laptops.map((laptop) => (
          <div
            key={laptop._id}
            className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-md hover:shadow-xl flex flex-col overflow-hidden"
          >
            <div className="p-4 flex justify-center">
              <img
                src={laptop.image}
                alt={laptop.name}
                className="w-48 h-48 object-contain rounded-md"
                loading="lazy"
              />
            </div>
            <div className="px-6 pb-6 flex flex-col flex-grow">
              <h2 className="text-xl text-center font-semibold text-gray-900 mb-2 truncate">
                {laptop.name}
              </h2>

              <div className="text-gray-600 text-sm mb-4 space-y-1">
                <p>
                  <span className="font-medium text-gray-800">Price:</span>{" "}
                  {firstOrNA(laptop.price)}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Processor:</span>{" "}
                  {firstOrNA(laptop.processor)}
                </p>
                <p>
                  <span className="font-medium text-gray-800">RAM:</span>{" "}
                  {firstOrNA(laptop.ram)}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Storage:</span>{" "}
                  {firstOrNA(laptop.storage)}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Battery:</span>{" "}
                  {laptop.battery ?? "N/A"}
                </p>
              </div>

              <p className="text-gray-700 text-sm mb-6">
                {truncateText(laptop.blog, 15)}
              </p>

              <Link
                href={`/${laptop.productType}/${laptop._id
                  .toLowerCase()
                  .split(" ")
                  .join("")}`}
                className="mt-auto inline-block bg-gradient-to-r from-sky-500 to-blue-700 text-white font-semibold py-2 rounded-lg text-center hover:from-orange-700 hover:to-yellow-500 transition"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaptopsCategory;
