import React from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

// ── Stagger container variants ───────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 0.99,
    y: 0,
    transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Thin animated divider ────────────────────────────────────────────────────
const Divider = ({ color }) => (
  <motion.span
    initial={{ scaleX: 0 }}
    whileInView={{ scaleX: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="block h-[3px] w-16 rounded-full origin-left"
    style={{ backgroundColor: color }}
  />
);

// ── Count badge ──────────────────────────────────────────────────────────────
const CountBadge = ({ count, color }) => (
  <span
    className="text-xs font-black tracking-widest uppercase px-3 py-1 rounded-full"
    style={{ backgroundColor: `${color}18`, color }}
  >
    {count} {count === 1 ? "item" : "items"}
  </span>
);

function ProductSection({ title, data, borderColor, filterType }) {
  const filtered = Array.isArray(data)
    ? filterType
      ? data.filter((item) => item.productType === filterType)
      : data
    : [];

  if (filtered.length === 0) return null;

  // derive a clean accent hex from the borderColor class e.g. "border-[#79d1ec]"
  const accentMatch = borderColor?.match(/#[0-9a-fA-F]{3,6}/);
  const accent = accentMatch ? accentMatch[0] : "#FFA500";

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-10">
      <div className="container mx-auto max-w-[1200px]">
        {/* ── Section header ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-3 mb-10"
        >
          <Divider color={accent} />

          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900 leading-none">
              {title}
            </h2>
            <CountBadge count={filtered.length} color={accent} />
          </div>

          {/* Subtitle rule line */}
          <div className="flex items-center gap-3 mt-1">
            <span className="flex-1 h-px bg-gray-200" />
          </div>
        </motion.div>

        {/* ── Product grid ─────────────────────────────────────────────── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 gap-5"
        >
          {filtered.map((item, index) => (
            <motion.div key={item._id || index} variants={itemVariants}>
              {/* 
                Wrap ProductCard in a styled shell so the section controls
                the card frame while ProductCard handles its own internals.
              */}
              <div
                className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
                style={{
                  boxShadow: `0 1px 3px 0 rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)`,
                }}
              >
                {/* Left accent stripe that expands on hover */}
                <span
                  className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl transition-all duration-300 group-hover:w-1.5"
                  style={{ backgroundColor: accent }}
                />

                {/* Card number badge */}
                <span
                  className="absolute top-4 right-4 z-10 text-[10px] font-black tracking-widest opacity-30 select-none"
                  style={{ color: accent }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <div className="pl-3">
                  <ProductCard item={item} borderColor="border-transparent" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Bottom rule ──────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-12 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"
        />
      </div>
    </section>
  );
}

export default ProductSection;
