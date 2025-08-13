"use client";
import Link from "next/link";

export default function TabletsCategory({ tablets, title }) {
  const truncateText = (text, maxWords = 15) => {
    if (!text) return "No description available";
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-900">
        {title}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {tablets.map((tablet) => (
          <div
            key={tablet._id}
            className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-xl border border-gray-200 shadow-md hover:shadow-xl flex flex-col overflow-hidden"
          >
            <div className="p-4 flex justify-center">
              <img
                src={tablet.image}
                alt={tablet.name}
                className="w-48 h-48 object-contain rounded-md"
                loading="lazy"
              />
            </div>
            <div className="px-6 pb-6 flex flex-col flex-grow">
              <h2 className="text-xl text-center font-semibold text-gray-900 mb-2 truncate">
                {tablet.name}
              </h2>

              <div className="text-gray-600 text-sm mb-4 space-y-1">
                <p>
                  <span className="font-medium text-gray-800">Price:</span>{" "}
                  {tablet.price?.[0]?.[0] ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Battery:</span>{" "}
                  {tablet.battery ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Display:</span>{" "}
                  {tablet.display ?? "N/A"}
                </p>
                <p>
                  <span className="font-medium text-gray-800">Camera:</span>{" "}
                  {tablet.camera ?? "N/A"}
                </p>
              </div>

              <p className="text-gray-700 text-sm mb-6">
                {truncateText(tablet.blog, 15)}
              </p>

              <Link
                href={`/${tablet.productType}/${tablet._id
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
}
