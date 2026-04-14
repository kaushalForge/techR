import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const q = query.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_SEARCH_URL;

  useEffect(() => {
    if (!q || q.trim() === "") return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${backendURL}/?q=${encodeURIComponent(q.trim())}`,
          { timeout: 10000 },
        );
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    // Debounce search for better performance
    const timeoutId = setTimeout(() => {
      fetchData();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [q, backendURL]);

  const handleClick = (product) => {
    const type = slugify(product.productType);
    const name = slugify(product.name);
    navigate(`/${type}/${name}`);
  };

  // Format price display
  const formatPrice = (price) => {
    if (!price) return "Price unavailable";
    if (Array.isArray(price) && price.length > 0) {
      const firstPrice = price[0];
      if (Array.isArray(firstPrice) && firstPrice.length > 0) {
        return `${firstPrice[0]}`;
      }
      if (typeof firstPrice === "string") return `${firstPrice}`;
    }
    if (typeof price === "string") return `${price}`;
    if (typeof price === "number") return `${price}`;
    return "Price unavailable";
  };

  // Get category badge color
  const getCategoryColor = (category) => {
    switch (category?.toLowerCase()) {
      case "flagship":
        return "bg-purple-100 text-purple-700";
      case "midrange":
        return "bg-blue-100 text-blue-700";
      case "budget":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full"></div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Search Results
            </h1>
          </div>
          {q && (
            <p className="text-gray-500 text-sm sm:text-base ml-4">
              Showing results for{" "}
              <span className="font-semibold text-gray-900 bg-gray-100 px-2 py-1 rounded-md">
                "{q}"
              </span>
            </p>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 animate-pulse"
              >
                <div className="flex gap-4">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-xl"></div>
                  <div className="flex-1 space-y-3">
                    <div className="h-5 bg-gray-200 rounded-lg w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Grid */}
        {!loading && results.length > 0 && (
          <div className="space-y-4">
            {results.map((product, index) => (
              <div
                key={product._id}
                onClick={() => handleClick(product)}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200 transition-all duration-300 cursor-pointer overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
                  {/* Image Container */}
                  <div className="relative flex-shrink-0">
                    <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-100">
                      <img
                        src={
                          product.image ||
                          "https://placehold.co/400x400?text=No+Image"
                        }
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/400x400?text=No+Image";
                        }}
                      />
                    </div>
                    {/* Quick view badge */}
                    <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        className="w-4 h-4 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0">
                    {/* Title and Price Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                      <h2 className="text-lg sm:text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h2>
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-blue-600">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-3">
                      {product.productType && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-blue-50 text-blue-600">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {product.productType}
                        </span>
                      )}
                      {product.item_categorie && (
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(product.item_categorie)}`}
                        >
                          {product.item_categorie}
                        </span>
                      )}
                      {product.latest === "true" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-green-50 text-green-600">
                          🔥 New
                        </span>
                      )}
                      {product.mostsold === "true" && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium bg-orange-50 text-orange-600">
                          🏆 Best Seller
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
                      {product.blog ||
                        product.description ||
                        "No description available."}
                    </p>

                    {/* Specs Preview */}
                    {product.processor && (
                      <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-gray-100">
                        {product.processor && (
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 3v2m6-2v2M9 19v2m6-2v2M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z"
                              />
                            </svg>
                            {Array.isArray(product.processor)
                              ? product.processor[0]
                              : product.processor}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && results.length === 0 && q && (
          <div className="text-center py-16 sm:py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No results found
            </h3>
            <p className="text-gray-500 text-sm">
              We couldn't find any products matching "{q}"
            </p>
            <button
              onClick={() => navigate(-1)}
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back
            </button>
          </div>
        )}

        {/* Initial State - No Search Query */}
        {!q && (
          <div className="text-center py-16 sm:py-24">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
              <svg
                className="w-10 h-10 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              Enter a search term
            </h3>
            <p className="text-gray-500 text-sm">
              Use the search bar to find products
            </p>
          </div>
        )}
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .group {
          animation: fadeInUp 0.4s ease-out backwards;
        }
      `}</style>
    </div>
  );
}
