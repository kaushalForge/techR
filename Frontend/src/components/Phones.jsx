import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import CircularLoader from "../CircularLoader";
import ProductSection from "./shared/ProductSection";
import { useProducts } from "../hooks/useProducts";

const PHONE_SECTIONS = [
  {
    key: "gaming",
    title: "Gaming Phones",
    borderColor: "border-indigo-600",
    shadowColor: "shadow-indigo-600",
  },
  {
    key: "professional",
    title: "Professional Phones",
    borderColor: "border-purple-600",
    shadowColor: "shadow-purple-600",
  },
  {
    key: "students",
    title: "Student Phones",
    borderColor: "border-orange-600",
    shadowColor: "shadow-orange-600",
  },
  {
    key: "normalusage",
    title: "Normal Usage Phones",
    borderColor: "border-sky-600",
    shadowColor: "shadow-sky-600",
  },
];

function Phones() {
  const queries = PHONE_SECTIONS.map(({ key }) => ({
    key,
    query: useProducts(key),
  }));

  const isLoading = queries.some(({ query }) => query.isLoading);

  return (
    <HelmetProvider>
      <div className="min-h-screen flex flex-col justify-between">
        <Helmet>
          <title>
            Best Phones of 2024 — Gaming, Professional, Students & More
          </title>
        </Helmet>
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="h-screen w-full"
          >
            <CircularLoader />
          </motion.div>
        ) : (
          <div className="min-h-screen h-auto w-full mt-12">
            <div className="container mx-auto px-4 flex flex-col gap-6 md:gap-8 mb-12">
              <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800">
                Find Your Perfect Phone Companion!
              </h1>
              {PHONE_SECTIONS.map(({ key, title, borderColor }) => {
                const { data = [] } = queries.find((q) => q.key === key).query;
                return (
                  <ProductSection
                    key={key}
                    title={title}
                    data={data}
                    borderColor={borderColor}
                    filterType="phone"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </HelmetProvider>
  );
}

export default Phones;
