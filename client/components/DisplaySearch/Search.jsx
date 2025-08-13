"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Search = (product) => {
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/${product.productType}/${product._id}`);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden my-8 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Image */}
        <div className="md:w-1/3">
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </div>

        {/* Details */}
        <div className="md:w-2/3 p-6 flex flex-col justify-between">
          <div>
            {/* Title and category */}
            <h1 className="text-3xl font-extrabold text-gray-900">
              {product.name}
            </h1>
            <p className="text-sm text-indigo-600 font-semibold uppercase tracking-wide mt-1">
              {product.item_categorie}
            </p>

            {/* Description */}
            <p
              className="mt-4 text-gray-700 leading-relaxed line-clamp-5"
              title={product.blog}
            >
              {product.blog}
            </p>

            {/* Key specs grid */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-800">
              <div>
                <span className="font-semibold">Display:</span> {product.size}{" "}
                {product.dtype}
              </div>
              <div>
                <span className="font-semibold">Processor:</span>{" "}
                {product.processor?.[0] ||
                  product.graphics ||
                  product.graphicss}
              </div>
              <div>
                <span className="font-semibold">RAM:</span>{" "}
                {product.ram1 || product.ram?.[0]}
              </div>
              <div>
                <span className="font-semibold">Storage:</span>{" "}
                {product.storage1 || product.storage?.[0]}
              </div>
              <div>
                <span className="font-semibold">Camera:</span>{" "}
                {product.maincamera}
              </div>
              <div>
                <span className="font-semibold">OS:</span>{" "}
                {product.os?.join(", ") || "N/A"}
              </div>
            </div>
          </div>

          {/* Price and button */}
          <div className="mt-6 flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-green-600">
                {product.price1 || product.price?.[0]}
              </span>
              <span className="text-sm text-gray-500 ml-2 line-through">
                {product.price3}
              </span>
            </div>

            <button
              onClick={handleNavigate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-5 py-2 rounded-md transition"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
