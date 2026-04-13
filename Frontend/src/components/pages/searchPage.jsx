import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchPage() {
  const navigate = useNavigate();
  const query = useQuery();
  const q = query.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const backendURL = import.meta.env.VITE_SEARCH_URL;

  useEffect(() => {
    if (!q) return;
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${backendURL}/?q=${encodeURIComponent(q)}`,
        );
        setResults(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setResults([]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [q, backendURL]);

  const handleClick = (product) => {
    const type = slugify(product.productType);
    const name = slugify(product.name);
    navigate(`/${type}/${name}`);
  };

  return (
    <div className="container mx-auto px-6 py-12 antialiased">
      <div className="border-b border-gray-100 pb-8 mb-8">
        <h1 className="text-xl font-medium text-gray-500">
          Search results for <span className="text-gray-900">"{q}"</span>
        </h1>
      </div>

      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-50 animate-pulse rounded-xl" />
          ))}
        </div>
      )}

      <div className="flex flex-col gap-4">
        {results.map((product) => (
          <div
            key={product._id}
            onClick={() => handleClick(product)}
            className="group cursor-pointer flex items-center gap-6 p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
          >
            {/* SMALLER, CONSTRAINED IMAGE */}
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 overflow-hidden rounded-xl bg-gray-100 border border-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            {/* CONTENT AREA */}
            <div className="flex-grow min-w-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1 mb-1">
                <h2 className="text-lg font-semibold text-gray-900 truncate">
                  {product.name}
                </h2>
              </div>

              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                {product.item_categorie}
              </p>

              <p className="text-sm text-gray-500 line-clamp-1 md:line-clamp-2 leading-snug">
                {product.blog ||
                  product.description ||
                  "No description provided."}
              </p>
            </div>
          </div>
        ))}
      </div>

      {!loading && results.length === 0 && (
        <p className="text-center text-gray-400 mt-10">No matches found.</p>
      )}
    </div>
  );
}
