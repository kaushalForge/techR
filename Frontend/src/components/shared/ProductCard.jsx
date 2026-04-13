import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const toSlug = (name) => name.toLowerCase().split(" ").join("-"); // ← only change
const truncateText = (text, limit) => {
  const words = text.split(" ");
  return words.length > limit ? words.slice(0, limit).join(" ") + "..." : text;
};

function ProductCard({ item, borderColor }) {
  return (
    <div
      className={`border-2 ${borderColor} shadow-lg rounded-xl overflow-hidden p-2 md:flex flex-row w-full items-center justify-center`}
      style={{
        boxShadow: `0 10px 15px -3px ${borderColor.replace("border-", "").replace("-600", "")}`,
      }}
    >
      <Link
        to={`/${item.productType}/${toSlug(item.name)}`}
        className="outline-none w-full"
      >
        <div className="md:flex items-center justify-center gap-2">
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: -2 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="flex items-center justify-center"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={item.image}
              alt={item.name}
              className="w-full h-52 md:w-72 md:h-72 object-contain object-center rounded-md"
              loading="lazy"
            />
          </motion.div>
          <div className="p-4 md:w-1/2 gap-4 flex items-center justify-center flex-col">
            <h2 className="text-lg md:text-xl lg:text-2xl text-black text-center font-extrabold break-words">
              {item.name}
            </h2>
            <p className="text-stone-600 border-2 border-stone-600/30 p-2 rounded-xl text-xs md:text-sm lg:text-lg break-words text-center">
              {(item.blog && truncateText(item.blog, 30)) ||
                "No description available"}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
