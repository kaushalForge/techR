import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const slugify = (text = "") =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ─── SVG Logo ────────────────────────────────────────────────────────────────
function TechRLogo({ size = 32 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="TechR logo"
    >
      {/* Outer hexagon */}
      <polygon
        points="20,2 36,11 36,29 20,38 4,29 4,11"
        fill="#0f0f0f"
        stroke="#3b82f6"
        strokeWidth="1.5"
      />
      {/* Inner accent ring */}
      <polygon
        points="20,6 32,13 32,27 20,34 8,27 8,13"
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="0.5"
        opacity="0.5"
      />
      {/* Circuit dot — top-left */}
      <circle cx="11" cy="16" r="1.2" fill="#3b82f6" opacity="0.7" />
      {/* Circuit dot — bottom-right */}
      <circle cx="29" cy="24" r="1.2" fill="#3b82f6" opacity="0.7" />
      {/* Horizontal trace */}
      <line x1="12.2" y1="16" x2="15" y2="16" stroke="#3b82f6" strokeWidth="0.8" opacity="0.5" />
      <line x1="25" y1="24" x2="27.8" y2="24" stroke="#3b82f6" strokeWidth="0.8" opacity="0.5" />
      {/* "T" letter mark */}
      <text
        x="20"
        y="26"
        textAnchor="middle"
        fontFamily="'DM Mono', 'Courier New', monospace"
        fontSize="16"
        fontWeight="700"
        fill="white"
        letterSpacing="-1"
      >
        T
      </text>
      {/* Blue accent dot on T crossbar */}
      <circle cx="26" cy="17" r="1.5" fill="#3b82f6" />
    </svg>
  );
}

// ─── Search Icon ─────────────────────────────────────────────────────────────
function SearchIcon({ size = 16, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const searchRef = useRef(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // ── Scroll shadow ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── "/" shortcut — only fires when input is NOT already focused ────────────
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if (
        e.key === "/" &&
        document.activeElement !== searchRef.current &&
        document.activeElement?.tagName !== "INPUT" &&
        document.activeElement?.tagName !== "TEXTAREA"
      ) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  // ── Search logic ───────────────────────────────────────────────────────────
  const handleSearch = async () => {
    const value = search.trim();
    if (!value) return;

    try {
      const url = `${API_URL}/products?q=${encodeURIComponent(value)}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!Array.isArray(data) || data.length === 0) {
        navigate(`/search?q=${encodeURIComponent(value)}`);
        return;
      }

      if (data.length === 1) {
        const product = data[0];
        const type = slugify(product.productType || "product");
        const name = slugify(product.name || "item");
        navigate(`/${type}/${name}`);
        return;
      }

      navigate(`/search?q=${encodeURIComponent(value)}`);
    } catch {
      navigate(`/search?q=${encodeURIComponent(value)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
    if (e.key === "Escape") {
      searchRef.current?.blur();
      setIsFocused(false);
    }
  };

  return (
    <>
      {/* ── Inline font import ──────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .techr-nav {
          font-family: 'Space Grotesk', sans-serif;
        }

        /* Search ring glow on focus */
        .search-ring:focus-within {
          box-shadow: 0 0 0 1px rgba(59,130,246,0.6), 0 0 16px rgba(59,130,246,0.15);
          border-color: rgba(59,130,246,0.7) !important;
        }

        /* Shortcut badge */
        .shortcut-key {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          line-height: 1;
          padding: 2px 6px;
          border-radius: 4px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(255,255,255,0.35);
          pointer-events: none;
          user-select: none;
          white-space: nowrap;
        }

        .nav-link {
          position: relative;
          font-size: 14px;
          font-weight: 500;
          color: rgba(255,255,255,0.55);
          text-decoration: none;
          transition: color 0.2s;
          letter-spacing: 0.01em;
        }

        .nav-link:hover {
          color: rgba(255,255,255,0.9);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: #3b82f6;
          transition: width 0.25s ease;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Mobile search slide */
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .mobile-search-bar {
          animation: slideDown 0.18s ease forwards;
        }
      `}</style>

      {/* ── Main Navbar ─────────────────────────────────────────────────── */}
      <nav
        className="techr-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: scrolled
            ? "rgba(6,6,10,0.92)"
            : "rgba(6,6,10,0.85)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderBottom: scrolled
            ? "1px solid rgba(59,130,246,0.18)"
            : "1px solid rgba(255,255,255,0.06)",
          transition: "border-color 0.3s, background 0.3s",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 1.25rem",
            height: "58px",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {/* ── Logo ─────────────────────────────────────────────────── */}
          <button
            onClick={() => navigate("/")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              flexShrink: 0,
            }}
          >
            <TechRLogo size={32} />
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: "17px",
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1,
              }}
            >
              Tech
              <span style={{ color: "#3b82f6" }}>R</span>
            </span>
          </button>

          {/* ── Nav Links (desktop) ───────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.5rem",
              marginLeft: "1.5rem",
              flexShrink: 0,
            }}
            className="hidden-mobile"
          >
            <a href="/products" className="nav-link">Products</a>
            <a href="/deals" className="nav-link">Deals</a>
            <a href="/about" className="nav-link">About</a>
          </div>

          {/* ── Spacer ───────────────────────────────────────────────── */}
          <div style={{ flex: 1 }} />

          {/* ── Search Bar (desktop) ─────────────────────────────────── */}
          <div
            className="search-ring hidden-mobile"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "0 12px",
              height: "38px",
              width: isFocused ? "280px" : "220px",
              transition: "width 0.3s ease, border-color 0.2s, box-shadow 0.2s",
              cursor: "text",
            }}
            onClick={() => searchRef.current?.focus()}
          >
            <SearchIcon
              size={14}
              className=""
              style={{ color: isFocused ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)" }}
            />
            <input
              ref={searchRef}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search products…"
              style={{
                flex: 1,
                background: "transparent",
                border: "none",
                outline: "none",
                fontSize: "14px",
                color: "rgba(255,255,255,0.85)",
                fontFamily: "'Space Grotesk', sans-serif",
                letterSpacing: "0.01em",
                minWidth: 0,
              }}
            />
            {/* "/" shortcut badge — hides when focused */}
            <AnimatePresence>
              {!isFocused && (
                <motion.span
                  className="shortcut-key"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.15 }}
                >
                  /
                </motion.span>
              )}
            </AnimatePresence>
            {/* Search trigger button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSearch();
              }}
              style={{
                background: search.trim()
                  ? "rgba(59,130,246,0.85)"
                  : "transparent",
                border: "none",
                borderRadius: "6px",
                width: "26px",
                height: "26px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: search.trim() ? "pointer" : "default",
                transition: "background 0.2s",
                flexShrink: 0,
                color: search.trim() ? "#fff" : "rgba(255,255,255,0.25)",
              }}
              tabIndex={-1}
              aria-label="Search"
            >
              <SearchIcon size={12} />
            </button>
          </div>

          {/* ── Mobile search toggle ─────────────────────────────────── */}
          <button
            className="show-mobile"
            onClick={() => {
              setMobileSearchOpen((v) => !v);
              setTimeout(() => searchRef.current?.focus(), 100);
            }}
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "8px",
              width: "36px",
              height: "36px",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "rgba(255,255,255,0.6)",
            }}
            aria-label="Open search"
          >
            <SearchIcon size={15} />
          </button>
        </div>

        {/* ── Mobile Search Bar ─────────────────────────────────────── */}
        {mobileSearchOpen && (
          <div
            className="mobile-search-bar"
            style={{
              padding: "0 1.25rem 0.75rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div
              className="search-ring"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "10px",
                padding: "0 12px",
                height: "42px",
              }}
            >
              <SearchIcon size={14} style={{ color: "rgba(255,255,255,0.4)" }} />
              <input
                ref={searchRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search products…"
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  fontSize: "15px",
                  color: "rgba(255,255,255,0.85)",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              />
              <button
                onClick={handleSearch}
                style={{
                  background: "rgba(59,130,246,0.85)",
                  border: "none",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#fff",
                  cursor: "pointer",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Go
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* ── Responsive visibility styles ─────────────────────────────────── */}
      <style>{`
        @media (max-width: 640px) {
          .hidden-mobile { display: none !important; }
          .show-mobile   { display: flex !important; }
        }
        @media (min-width: 641px) {
          .hidden-mobile { display: flex !important; }
          .show-mobile   { display: none !important; }
        }
      `}</style>

      {/* ── Navbar height offset so page content isn't hidden ────────────── */}
      <div style={{ height: "58px" }} />
    </>
  );
}

export default Navbar;