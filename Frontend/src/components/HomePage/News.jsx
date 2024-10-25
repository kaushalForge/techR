import React from "react";
import { motion } from "framer-motion";
const newsItems = [
  "Honor Magic V3 becomes the first ever tri-folding phone with amazing thin form factor",
  "Lava Agni 3 Announces its first ever made in India Phone with great specs in affordable price",
  "iPhone 16 lineup, launched a week ago with a new camera button, seemed to be a failure from Apple",
  "Samsung Galaxy S25 Ultra renders tease exciting design improvements",
  "The Google Pixel 9 Pro has launched with a stunning 6.3-inch AMOLED display, improved AI-powered camera features, and enhanced battery efficiency",
  "PS5 Pro is officially revealed, promising enhanced PSVR 2 gaming experiences",
  "AirPods Pro 2 gets a hearing test feature in a new software update",
  "Qualcomm's next-gen gaming engine redefines mobile gaming experiences",
];
const News = () => {
  let news = newsItems.join(" | ");
  return (
    <div className="w-full fixed mt-[88px] py-2 bg-[#000]">
      <div className="w-full overflow-hidden whitespace-nowrap flex text-[16px] text-gray-400 tracking-wide">
        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 80,
            repeat: Infinity,
            ease: "linear",
          }}
          className="marquee_text pl-4"
        >
          {news}
        </motion.h1>
      </div>
    </div>
  );
};

export default News;
