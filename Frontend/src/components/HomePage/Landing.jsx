import React from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { motion } from "framer-motion";
import CircularLoader from "../../CircularLoader";
import TopTwo from "./TopTwo";
import { CiMobile3 } from "react-icons/ci";
import { LiaLaptopSolid } from "react-icons/lia";
import { FaTabletAlt } from "react-icons/fa";
import {
  useLatest,
  useMostPopular,
  useMostSold,
  useBudget,
  useMidrange,
  useFlagship,
  useRecommended,
} from "../../hooks/useProducts";

const truncateText = (text, wordLimit) => {
  const words = text.split(" ");
  return words.length > wordLimit
    ? words.slice(0, wordLimit).join(" ") + "..."
    : text;
};

const toSlug = (name) => name.toLowerCase().split(" ").join("-");

const popular_items = [
  {
    name: "Asus ROG Zephyrus G14",
    link: "/laptop/asus-rog-zephyrus-g14",
    image:
      "https://res.cloudinary.com/dsvlevzds/image/upload/v1728586084/dh2saozzij8dm8bhddsf.png",
  },
  {
    name: "Acer Nitro V 15",
    link: "/laptop/acer-nitro-v-15",
    image:
      "https://res.cloudinary.com/dsvlevzds/image/upload/v1727536629/vfsffx0jlxn1eh4qvxvz.jpg",
  },
  {
    name: "Huawei Mate XT",
    link: "/phone/huawei-mate-xt",
    image:
      "https://res.cloudinary.com/dsvlevzds/image/upload/v1728628332/bpo1nzdco7jnexyipug4.jpg",
  },
  {
    name: "Galaxy Tab S9 Ultra",
    link: "/tablet/galaxy-tab-s9-ultra",
    image:
      "https://res.cloudinary.com/dsvlevzds/image/upload/v1727536919/qghddgp30litpw2xrnj9.jpg",
  },
];

// ── Section label pill ───────────────────────────────────────────────────────
const SectionLabel = ({ children }) => (
  <div className="flex items-center gap-3 mb-6">
    <span className="block w-1 h-6 bg-[#FFA500] rounded-full" />
    <h2 className="text-xl md:text-2xl font-black tracking-tight text-gray-900 uppercase">
      {children}
    </h2>
  </div>
);

// ── Product card (list sections) ─────────────────────────────────────────────
const ProductCard = ({ item, accentColor, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
  >
    <Link
      to={`/${item.productType}/${toSlug(item.name)}`}
      className="group flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Accent bar */}
      <span
        className="hidden sm:block self-stretch w-1 rounded-full flex-shrink-0"
        style={{ backgroundColor: accentColor }}
      />
      <div className="flex-shrink-0 bg-gray-50 rounded-xl p-3 flex items-center justify-center w-full sm:w-48 h-44">
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain object-center"
          loading="lazy"
        />
      </div>
      <div className="flex flex-col gap-2 flex-1 text-center sm:text-left">
        <h3 className="text-lg md:text-xl font-extrabold text-gray-900 group-hover:text-[#FFA500] transition-colors duration-200">
          {item.name}
        </h3>
        <p className="text-gray-500 text-sm md:text-base leading-relaxed line-clamp-3">
          {(item.blog && truncateText(item.blog, 30)) ||
            "No description available"}
        </p>
        <span
          className="mt-2 self-center sm:self-start text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full"
          style={{ backgroundColor: `${accentColor}20`, color: accentColor }}
        >
          View Details →
        </span>
      </div>
    </Link>
  </motion.div>
);

// ── Showcase card (grid sections) ────────────────────────────────────────────
const ShowcaseCard = ({ item, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.35, delay: index * 0.06 }}
  >
    <Link
      to={`/${item.productType}/${toSlug(item.name)}`}
      className="group flex flex-col items-center gap-2 bg-white rounded-2xl p-4 border border-gray-100 hover:border-[#FFA500] hover:shadow-lg transition-all duration-300"
    >
      <div className="w-full h-32 md:h-40 flex items-center justify-center bg-gray-50 rounded-xl overflow-hidden p-2">
        <motion.img
          whileHover={{ scale: 1.07 }}
          transition={{ type: "spring", stiffness: 300 }}
          src={item.image}
          alt={item.name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <p className="text-xs md:text-sm font-semibold text-gray-800 text-center line-clamp-2 leading-tight">
        {item.name}
      </p>
      <span className="text-xs font-bold text-[#FFA500] bg-orange-50 px-2 py-0.5 rounded-full">
        {item.price}
      </span>
    </Link>
  </motion.div>
);

// ── List section ─────────────────────────────────────────────────────────────
const ListSection = ({ title, items, accentColor }) => (
  <section className="mt-16">
    <SectionLabel>{title}</SectionLabel>
    <div className="flex flex-col gap-4">
      {Array.isArray(items) &&
        items
          .slice(0, 4)
          .map((item, index) => (
            <ProductCard
              key={index}
              item={item}
              accentColor={accentColor}
              index={index}
            />
          ))}
    </div>
  </section>
);

// ── Grid showcase section ────────────────────────────────────────────────────
const ShowcaseSection = ({ title, items }) => (
  <section className="mt-16">
    <SectionLabel>{title}</SectionLabel>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
      {Array.isArray(items) &&
        items
          .slice(0, 6)
          .map((item, index) => (
            <ShowcaseCard key={index} item={item} index={index} />
          ))}
    </div>
  </section>
);

function Landing() {
  const { data: latest = [], isLoading: l1 } = useLatest();
  const { data: mostpopular = [], isLoading: l2 } = useMostPopular();
  const { data: mostsold = [], isLoading: l3 } = useMostSold();
  const { data: budget = [], isLoading: l4 } = useBudget();
  const { data: midrange = [], isLoading: l5 } = useMidrange();
  const { data: flagship = [], isLoading: l6 } = useFlagship();
  const { data: recommended = [], isLoading: l7 } = useRecommended();

  const isLoading = l1 || l2 || l3 || l4 || l5 || l6 || l7;

  return (
    <HelmetProvider>
      <div className="flex flex-col items-center w-full bg-[#F8F8F6] min-h-screen">
        <Helmet>
          <title>TechR - Latest Tech News Insights, Reviews and Price</title>
        </Helmet>

        <TopTwo />

        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-[1200px]">
            {/* ── Category nav ───────────────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400 font-semibold mb-3 text-center">
                Browse by Category
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  {
                    to: "/phone",
                    Icon: CiMobile3,
                    label: "Phones",
                    bg: "from-blue-50 to-blue-100",
                    accent: "text-blue-600",
                  },
                  {
                    to: "/laptop",
                    Icon: LiaLaptopSolid,
                    label: "Laptops",
                    bg: "from-orange-50 to-orange-100",
                    accent: "text-orange-500",
                  },
                  {
                    to: "/tablet",
                    Icon: FaTabletAlt,
                    label: "Tablets",
                    bg: "from-purple-50 to-purple-100",
                    accent: "text-purple-600",
                  },
                ].map(({ to, Icon, label, bg, accent }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`group flex flex-col items-center justify-center gap-2 p-4 md:p-6 bg-gradient-to-br ${bg} rounded-2xl border border-white hover:shadow-md transition-all duration-300 hover:-translate-y-0.5`}
                  >
                    <Icon
                      className={`text-3xl md:text-4xl ${accent} group-hover:scale-110 transition-transform duration-200`}
                    />
                    <span className={`text-xs md:text-sm font-bold ${accent}`}>
                      {label}
                    </span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* ── Top Deals ──────────────────────────────────────────────── */}
            <section className="mt-12">
              <SectionLabel>Top Deals</SectionLabel>
              <div className="grid grid-cols-2 gap-3">
                {popular_items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="relative rounded-2xl overflow-hidden bg-black group"
                  >
                    <Link to={item.link}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-[150px] md:h-[230px] lg:h-[280px] object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-3">
                        <p className="text-[#00FFA3] text-xs font-bold uppercase tracking-widest mb-0.5">
                          Featured
                        </p>
                        <p className="text-white text-sm md:text-base font-extrabold leading-tight">
                          {item.name}
                        </p>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* ── Dynamic sections ───────────────────────────────────────── */}
            {isLoading ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h-[60vh] w-full flex items-center justify-center"
              >
                <CircularLoader />
              </motion.div>
            ) : (
              <div className="pb-20">
                <ListSection
                  title="Newly Launched"
                  items={latest}
                  accentColor="#79d1ec"
                />
                <ShowcaseSection title="Budget Picks" items={budget} />
                <ListSection
                  title={`Most Sold of ${new Date().getFullYear()}`}
                  items={mostsold}
                  accentColor="#f1cb69"
                />
                <ShowcaseSection title="Premium Midrange" items={midrange} />
                <ListSection
                  title="Most Popular"
                  items={mostpopular}
                  accentColor="#77bffa"
                />
                <ShowcaseSection title="Flagship Devices" items={flagship} />
                <ListSection
                  title="Recommended for You"
                  items={recommended}
                  accentColor="#d28bee"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Landing;
