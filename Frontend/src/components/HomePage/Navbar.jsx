import React, { useState, useEffect } from "react";
import { FaSearch, FaHome } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaTabletScreenButton } from "react-icons/fa6";
import { IoMenu, IoInformationCircle } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { LuSlidersHorizontal } from "react-icons/lu";
import axios from "axios";
import { easeInOut, motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import News from "./News";

function Navbar() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const backendURL = import.meta.env.VITE_SEARCH_URL;

  const handleSearch = async (event) => {
    if (event.key !== "Enter") return;
    const query = inputValue.trim().toLowerCase();
    if (!query) return;

    try {
      const res = await axios.get(
        `${backendURL}/?q=${encodeURIComponent(query)}`,
      );
      const results = res.data;
      if (!Array.isArray(results) || results.length === 0) {
        navigate(`/search?q=${query}`);
        return;
      }
      if (results.length === 1) {
        const item = results[0];
        const slug = item.name.toLowerCase().split(" ").join("");
        navigate(`/${item.productType}/${slug}`);
        return;
      }
      navigate(`/search?q=${query}`);
    } catch (err) {
      navigate(`/search?q=${query}`);
    }
  };

  useEffect(() => {
    const handleFocus = (event) => {
      if (event.key === "/") {
        event.preventDefault();
        document.querySelector("#searchedText")?.focus();
      }
    };
    window.addEventListener("keydown", handleFocus);
    return () => window.removeEventListener("keydown", handleFocus);
  }, []);

  return (
    <div className="relative">
      {/* MAIN NAV CONTAINER */}
      <nav className="fixed top-0 w-full z-[100] h-14 bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 flex items-center justify-center">
        <div className="w-full max-w-7xl px-6 flex items-center justify-between gap-4">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShow(!show)}
              className="lap:hidden p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              {show ? (
                <RxCross2 className="text-white text-2xl" />
              ) : (
                <IoMenu className="text-white text-2xl" />
              )}
            </button>

            <Link to="/" className="flex items-center outline-none group">
              {["T", "e", "c", "h", "R"].map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, ease: easeInOut }}
                  className={`text-white text-2xl font-black tracking-tighter ${char === "R" ? "text-indigo-500" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </Link>
          </div>

          {/* DESKTOP LINKS */}
          <div className="hidden lap:flex items-center gap-1">
            {["Home", "Phone", "Laptop", "Tablet", "Filter", "About"].map(
              (item, index) => (
                <Link
                  key={index}
                  to={
                    index === 0
                      ? "/"
                      : `/${item.toLowerCase().replace(/\s+/g, "")}`
                  }
                  className="px-4 py-2 text-zinc-400 hover:text-white font-medium text-sm flex items-center gap-2 transition-all duration-300 hover:bg-white/5 rounded-full"
                >
                  <span className="opacity-70">
                    {index === 0 && <FaHome size={16} />}
                    {index === 1 && <CiMobile1 size={18} />}
                    {index === 2 && <AiOutlineLaptop size={18} />}
                    {index === 3 && <FaTabletScreenButton size={16} />}
                    {index === 4 && <LuSlidersHorizontal size={16} />}
                    {index === 5 && <IoInformationCircle size={18} />}
                  </span>
                  {item}
                </Link>
              ),
            )}
          </div>

          {/* SEARCH BAR */}
          <div className="flex relative items-center group">
            <div className="absolute left-3 text-zinc-400 group-focus-within:text-white transition-colors">
              <FaSearch size={14} />
            </div>
            <input
              id="searchedText"
              type="text"
              placeholder="Search..."
              className="bg-zinc-800/50 border border-white/10 text-white pl-10 pr-12 py-2 rounded-full text-sm w-48 lg:w-64 focus:w-80 outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-zinc-500"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleSearch}
            />
            <div className="absolute right-3 hidden lg:block">
              <kbd className="bg-zinc-700 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded border border-white/10 uppercase font-sans">
                /
              </kbd>
            </div>
          </div>
        </div>

        {/* NEWS COMPONENT INTEGRATION */}
        <div className="absolute bottom-[-0.5px] w-full">
          <News />
        </div>
      </nav>
      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[90] bg-zinc-950 pt-24 px-6 lap:hidden"
          >
            <div className="flex flex-col gap-2">
              {["Home", "Phone", "Laptop", "Tablet", "Filter", "About"].map(
                (item, index) => (
                  <Link
                    key={index}
                    to={
                      index === 0
                        ? "/"
                        : `/${item.toLowerCase().replace(/\s+/g, "")}`
                    }
                    onClick={() => setShow(false)}
                    className="flex items-center justify-between p-4 bg-zinc-900 rounded-2xl border border-white/5 text-xl font-semibold text-white active:scale-95 transition-transform"
                  >
                    <span className="flex items-center gap-4">
                      {index === 0 && <FaHome className="text-indigo-400" />}
                      {index === 1 && <CiMobile1 className="text-indigo-400" />}
                      {index === 2 && (
                        <AiOutlineLaptop className="text-indigo-400" />
                      )}
                      {index === 3 && (
                        <FaTabletScreenButton className="text-indigo-400" />
                      )}
                      {index === 4 && (
                        <LuSlidersHorizontal className="text-indigo-400" />
                      )}
                      {index === 5 && (
                        <IoInformationCircle className="text-indigo-400" />
                      )}
                      {item}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-500">
                      →
                    </div>
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="h-16"></div> {/* Spacer for fixed nav */}
    </div>
  );
}

export default Navbar;
