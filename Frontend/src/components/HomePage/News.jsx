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
  let news = newsItems.join(" • ");
  return (
    <div className="w-full fixed py-2.5 bg-gradient-to-r from-zinc-950 via-black to-zinc-950 border-y border-white/5 backdrop-blur-sm z-[99]">
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-purple-500/5" />

      <div className="w-full overflow-hidden whitespace-nowrap flex text-[14px] text-zinc-400 font-medium relative">
        {/* Live indicator */}
        <div className="fixed left-4 top-1/2 -translate-y-1/2 z-10 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full border border-red-500/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
          </span>
          <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">
            Tech News
          </span>
        </div>

        <motion.h1
          initial={{ x: 0 }}
          animate={{ x: "-100%" }}
          transition={{
            duration: 70,
            repeat: Infinity,
            ease: "linear",
          }}
          className="marquee_text pl-28"
        >
          {news}
        </motion.h1>
      </div>
    </div>
  );
};

export default News;
