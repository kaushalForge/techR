"use client";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const truncateText = (text, maxWords) => {
  if (!text) return "";
  const words = text.split(" ");
  return words.length <= maxWords
    ? text
    : words.slice(0, maxWords).join(" ") + "...";
};

const Category_Card = ({ heading, items = [] }) => {
  if (!items.length) {
    return (
      <p className="text-center text-gray-500 text-lg mt-10 font-medium select-none">
        No articles found.
      </p>
    );
  }

  return (
    <section className="mt-16">
      <h2 className="text-center text-4xl font-extrabold mb-14 text-gray-900 tracking-tight drop-shadow-sm">
        {heading || "Latest Stories"}
      </h2>

      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {items.slice(0, 10).map((item) => (
          <Link
            key={item._id}
            href={`/${item.productType.toLowerCase()}/${item._id}`}
            className="group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500 bg-white border border-gray-100 hover:border-gray-200"
          >
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.03, ease: "easeInOut" }}
              className="relative w-full overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                loading="lazy"
                className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>

            {/* Text Section */}
            <div className="p-6 flex flex-col min-h-[200px]">
              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-snug transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-4">
                {truncateText(item.blog, 28) || "No description available."}
              </p>

              <span className="mt-auto inline-flex items-center text-blue-600 font-medium text-sm">
                Read More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Category_Card;
