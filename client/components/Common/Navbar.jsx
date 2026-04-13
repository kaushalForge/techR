import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { motion } from "framer-motion";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const searchRef = useRef();

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔥 MAIN SEARCH FUNCTION
  const handleSearch = async () => {
    const value = searchRef.current?.value || search;
    console.log(search);

    console.log("🔥 SEARCH TRIGGERED:", value);

    if (!value || !value.trim()) {
      console.log("⚠️ Empty search blocked");
      return;
    }

    try {
      const url = `${API_URL}/products?q=${encodeURIComponent(value)}`;

      console.log("🚀 FETCH URL:", url);

      const res = await fetch(url);

      console.log("📡 STATUS:", res.status);

      const data = await res.json();

      console.log("📦 DATA:", data);

      if (!Array.isArray(data) || data.length === 0) {
        console.log("⚠️ No results → /search page");
        navigate(`/search?q=${encodeURIComponent(value)}`);
        return;
      }

      // 👉 SINGLE PRODUCT
      if (data.length === 1) {
        const product = data[0];

        const type = slugify(product.productType || "product");
        const name = slugify(product.name || "item");

        const route = `/${type}/${name}`;

        console.log("➡️ Single product:", route);

        navigate(route);
        return;
      }

      // 👉 MULTIPLE PRODUCTS
      console.log("📚 Multiple results → search page");

      navigate(`/search?q=${encodeURIComponent(value)}`);
    } catch (err) {
      console.error("💥 SEARCH ERROR:", err);

      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  // 🔥 ENTER KEY FIX (THIS WAS YOUR MAIN BUG)
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      console.log("⚡ ENTER PRESSED");
      handleSearch();
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // optional shortcut focus "/"
  useEffect(() => {
    const handleFocus = (e) => {
      if (e.key === "/") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleFocus);
    return () => window.removeEventListener("keydown", handleFocus);
  }, []);

  return (
    <div className="w-full fixed top-0 z-50 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-3">
        {/* LOGO */}
        <h1 className="font-bold text-xl">TechR</h1>

        {/* SEARCH */}
        <div className="flex items-center bg-gray-700 rounded px-2">
          <input
            ref={searchRef}
            value={search}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Search products..."
            className="bg-transparent outline-none px-2 py-1"
          />

          <button
            onClick={() => {
              console.log("🖱 CLICK SEARCH");
              handleSearch();
            }}
            className="p-2"
          >
            <FaSearch />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
