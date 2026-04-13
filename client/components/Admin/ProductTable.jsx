"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function removeSpaces(value) {
  return normalizeText(value).replace(/\s+/g, "");
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (!m) return n;
  if (!n) return m;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i += 1) dp[i][0] = i;
  for (let j = 0; j <= n; j += 1) dp[0][j] = j;
  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[m][n];
}

function similarity(a, b) {
  const x = removeSpaces(a);
  const y = removeSpaces(b);
  if (!x || !y) return 0;
  const dist = levenshtein(x, y);
  return 1 - dist / Math.max(x.length, y.length);
}

function getDescriptionText(item) {
  if (!Array.isArray(item?.descriptions)) return "";
  return item.descriptions
    .map((entry) => `${entry?.heading || ""} ${entry?.detail || ""}`)
    .join(" ");
}

function queryMatchesItem(query, item) {
  if (!query) return true;
  const normalizedQuery = normalizeText(query);
  const compactQuery = removeSpaces(query);
  const target = `${item?.name || ""} ${item?.blog || ""} ${getDescriptionText(item)}`;
  const normalizedTarget = normalizeText(target);
  const compactTarget = removeSpaces(target);

  const regexPattern = normalizedQuery
    .split(" ")
    .filter(Boolean)
    .map((token) => escapeRegex(token))
    .join("\\s*");
  const regex = new RegExp(regexPattern, "i");
  const regexMatch = regex.test(normalizedTarget);
  if (regexMatch) return true;

  if (compactTarget.includes(compactQuery)) return true;

  const candidateChunks = [
    item?.name || "",
    item?.blog || "",
    ...((item?.descriptions || []).flatMap((entry) => [entry?.heading || "", entry?.detail || ""])),
  ];
  return candidateChunks.some((chunk) => similarity(compactQuery, chunk) >= 0.72);
}

export default function ProductTable({ products = [], type = "all", onDelete }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    const q = query.trim();
    return products.filter((item) => {
      const typeOk = type === "all" ? true : item.productType === type;
      const categoryOk =
        category === "all" ? true : item.item_categorie === category;
      const queryOk = queryMatchesItem(q, item);
      return typeOk && categoryOk && queryOk;
    });
  }, [products, query, type, category]);

  const getEditPath = (item) => {
    if (item.productType === "phone") return `/admin/phone/edit/${item._id}`;
    if (item.productType === "laptop") return `/admin/laptop/edit/${item._id}`;
    if (item.productType === "tablet") return `/admin/tablet/edit/${item._id}`;
    return `/admin/products/edit/${item._id}`;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
        <h1 className="text-xl md:text-2xl font-bold">Products</h1>
        <div className="flex flex-wrap gap-2">
          <input
            className="px-3 py-2 rounded-xl border border-white/20 bg-black/20 text-white placeholder:text-white/60"
            placeholder="Search name/description (regex + typo tolerant)"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            className="px-3 py-2 rounded-xl border border-white/20 bg-black/20 text-white"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="budget">Budget</option>
            <option value="midrange">Midrange</option>
            <option value="flagship">Flagship</option>
          </select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <article
            key={item._id}
            className="rounded-2xl border border-white/20 bg-black/25 overflow-hidden"
          >
            <img
              src={item.images?.[0] || ""}
              alt={item.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-xs text-white/80">
                {item.productType} • {item.item_categorie || "n/a"}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <span className="rounded bg-white/10 px-2 py-1">
                  latest: {item.latest === "true" ? "yes" : "no"}
                </span>
                <span className="rounded bg-white/10 px-2 py-1">
                  sold: {item.mostsold === "true" ? "yes" : "no"}
                </span>
              </div>
              <div className="flex gap-2 pt-1">
                <Link
                  href={getEditPath(item)}
                  className="px-3 py-2 rounded-lg text-sm bg-blue-500 hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(item._id)}
                  className="px-3 py-2 rounded-lg text-sm bg-red-500 hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
        {!filtered.length && (
          <div className="text-sm text-white/70">No products found.</div>
        )}
      </div>
    </div>
  );
}
