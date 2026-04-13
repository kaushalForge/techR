import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const slugify = (text = "") => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

const Search = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchTerm) => {
    console.log("🔥 handleSearch CALLED with:", searchTerm);

    const trimmed = searchTerm.trim();

    if (!trimmed) {
      console.log("⚠️ Empty search blocked");
      return;
    }

    try {
      setLoading(true);

      const API_URL = import.meta.env.VITE_API_URL;

      console.log("🌐 API URL from env:", API_URL);

      const fullURL = `${API_URL}/products?q=${encodeURIComponent(trimmed)}`;

      console.log("🚀 Fetching URL:", fullURL);

      const res = await fetch(fullURL);

      console.log("📡 Response status:", res.status);

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      console.log("📦 API response data:", data);

      if (!Array.isArray(data)) {
        console.log("❌ Response is NOT array");
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        return;
      }

      if (data.length === 0) {
        console.log("⚠️ No products found");
        navigate(`/search?q=${encodeURIComponent(trimmed)}`);
        return;
      }

      // SINGLE PRODUCT
      if (data.length === 1) {
        const product = data[0];

        console.log("🎯 Single product found:", product);

        const type = slugify(product.productType || "product");
        const name = slugify(product.name || "item");

        const route = `/${type}/${name}`;

        console.log("➡️ Redirecting to product page:", route);

        navigate(route);
        return;
      }

      // MULTIPLE PRODUCTS
      console.log("📚 Multiple products found:", data.length);

      const route = `/search?q=${encodeURIComponent(trimmed)}`;

      console.log("➡️ Redirecting to search page:", route);

      navigate(route);
    } catch (error) {
      console.error("💥 Search ERROR:", error);

      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
    } finally {
      setLoading(false);
      console.log("✅ Search finished");
    }
  };

  const handleKeyDown = (e) => {
    console.log("⌨️ Key pressed:", e.key);

    if (e.key === "Enter") {
      console.log("⚡ Enter detected");
      handleSearch(query);
    }
  };

  const handleChange = (e) => {
    console.log("✍️ Input changed:", e.target.value);
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("📩 Form submit triggered");
    handleSearch(query);
  };

  return (
    <div className="max-w-xl mx-auto my-6">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          placeholder={loading ? "Searching..." : "Search products..."}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-60"
        />

        <button
          type="submit"
          className="mt-3 w-full bg-indigo-600 text-white py-2 rounded"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
