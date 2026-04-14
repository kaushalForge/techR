import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaHome, FaTimes } from "react-icons/fa";
import { CiMobile1 } from "react-icons/ci";
import { AiOutlineLaptop } from "react-icons/ai";
import { FaTabletScreenButton } from "react-icons/fa6";
import { IoMenu, IoInformationCircle } from "react-icons/io5";
import { LuSlidersHorizontal } from "react-icons/lu";
import { FiTrendingUp } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, Link, useLocation } from "react-router-dom";
import News from "./News";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setInputValue] = useState("");
  const [show, setShow] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);

  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const backendURL = import.meta.env.VITE_SEARCH_URL;

  const popularSearches = [
    "iPhone 15",
    "MacBook Pro",
    "Samsung Galaxy",
    "iPad Pro",
    "Gaming Laptop",
  ];

  // 🔥 SEARCH FUNCTION (FIXED)
  const handleSearch = async (query) => {
    const q = query?.trim().toLowerCase();
    if (!q) return;

    try {
      const res = await axios.get(`${backendURL}/?q=${encodeURIComponent(q)}`);
      const results = res.data;

      if (!Array.isArray(results) || results.length === 0) {
        navigate(`/search?q=${q}`);
        return;
      }

      if (results.length === 1) {
        const item = results[0];
        const slug = item.name.toLowerCase().replace(/\s+/g, "");
        navigate(`/${item.productType}/${slug}`);
        return;
      }

      navigate(`/search?q=${q}`);
    } catch {
      navigate(`/search?q=${q}`);
    }

    setInputValue("");
    setIsSearchFocused(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch(inputValue);
  };

  // 🔥 "/" KEY FIX
  useEffect(() => {
    const handleSlash = (e) => {
      if (e.key === "/" && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleSlash);
    return () => window.removeEventListener("keydown", handleSlash);
  }, []);

  useEffect(() => {
    setShow(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (inputValue.length > 1) {
      setSearchSuggestions(
        popularSearches.filter((item) =>
          item.toLowerCase().includes(inputValue.toLowerCase()),
        ),
      );
    } else {
      setSearchSuggestions([]);
    }
  }, [inputValue]);

  const navItems = [
    { name: "Home", path: "/", icon: FaHome },
    { name: "Phone", path: "/phone", icon: CiMobile1 },
    { name: "Laptop", path: "/laptop", icon: AiOutlineLaptop },
    { name: "Tablet", path: "/tablet", icon: FaTabletScreenButton },
    { name: "Filter", path: "/filter", icon: LuSlidersHorizontal },
    { name: "About", path: "/about", icon: IoInformationCircle },
  ];

  function TechRLogo({ size = 32 }) {
    return (
      <svg width={size} height={size} viewBox="0 0 40 40">
        <polygon
          points="20,2 36,11 36,29 20,38 4,29 4,11"
          fill="#0f0f0f"
          stroke="#3b82f6"
          strokeWidth="1.5"
        />
        <text x="20" y="26" textAnchor="middle" fontSize="16" fill="white">
          T
        </text>
      </svg>
    );
  }

  return (
    <div>
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-[100] h-16 flex items-center justify-center border-b border-white/20 backdrop-blur-xl">
        {/* 🔥 Gradient */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-white/80 via-blue-50/70 to-white/80" />

        {/* 🔥 Gloss */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-white/60 via-transparent to-transparent opacity-70" />

        {/* Shine line */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" />

        <div className="w-full max-w-7xl px-4 md:px-8 flex items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <button onClick={() => setShow(!show)} className="lg:hidden p-2">
              {show ? <FaTimes /> : <IoMenu />}
            </button>

            <Link to="/" className="flex items-center gap-2">
              <TechRLogo />
              <span className="font-bold text-lg">
                Tech<span className="text-blue-600">R</span>
              </span>
            </Link>
          </div>

          {/* NAV ITEMS */}
          <div className="hidden lg:flex gap-2">
            {navItems.map((item, i) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={i}
                  to={item.path}
                  className={`px-3 py-2 rounded-lg text-sm flex items-center gap-2 transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon size={14} />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* SEARCH */}
          <div ref={searchRef} className="relative">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

            <input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search..."
              className="pl-10 pr-10 py-2 w-56 md:w-72 bg-gray-100 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />

            {/* Suggestions */}
            <AnimatePresence>
              {isSearchFocused && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-50"
                >
                  {searchSuggestions.map((s, i) => (
                    <button
                      key={i}
                      onClick={() => handleSearch(s)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 flex gap-2 items-center"
                    >
                      <FiTrendingUp className="text-blue-500" />
                      {s}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 🔥 NEWS BAR BACK */}
        <div className="absolute bottom-[-0.5px] left-0 right-0">
          <News />
        </div>
      </nav>

      <div className="h-16" />
    </div>
  );
}

export default Navbar;
