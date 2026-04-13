import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet, HelmetProvider } from "react-helmet-async";

const OPTIONS = {
  phone: {
    processor: [
      "Qualcomm Snapdragon",
      "Qualcomm Snapdragon 8 Gen 3",
      "MediaTek Dimensity",
      "Apple A18 Pro",
      "Apple A17 Pro",
      "Apple A16 Bionic",
      "Apple A15 Bionic",
      "Apple A14 Bionic",
      "Apple A13 Bionic",
      "Samsung Exynos",
      "Huawei Kirin",
    ],
    ram: ["4GB", "6GB", "8GB", "12GB", "16GB", "32GB"],
    graphics: [
      "Adreno",
      "Apple integrated",
      "Mali",
      "PowerVR",
      "Qualcomm Adreno",
      "Samsung Exynos GPU",
      "Ray Tracing GPU",
    ],
    battery: [
      "1000–2000 mAh",
      "2000–3000 mAh",
      "3000–4000 mAh",
      "4000–5000 mAh",
      "5000–6000 mAh",
      "6000–7000 mAh",
    ],
    price: [
      "< $100",
      "$100–$199",
      "$200–$299",
      "$300–$399",
      "$400–$499",
      "$500–$699",
      "$700–$899",
      "$900–$1,099",
      "$1,100–$1,299",
      "$1,300–$1,500",
      "$1,500–$1,700",
      "$1,700–$2,000",
    ],
  },
  laptop: {
    processor: [
      "Intel Core i3",
      "Intel Core i5",
      "Intel Core i7",
      "Intel Core i9",
      "Intel Celeron",
      "Intel Pentium",
      "AMD Ryzen 3",
      "AMD Ryzen 5",
      "AMD Ryzen 7",
      "AMD Ryzen 9",
      "AMD Athlon",
      "Apple M1",
      "Apple M1 Pro",
      "Apple M1 Max",
      "Apple M2",
      "Apple M2 Pro",
      "Apple M2 Max",
      "Qualcomm Snapdragon 8cx",
    ],
    ram: ["4GB", "8GB", "16GB", "32GB", "64GB"],
    graphics: [
      "Intel Iris Xe",
      "Intel Iris Plus",
      "AMD Radeon Graphics",
      "AMD Radeon RX 6000",
      "NVIDIA GTX 1650",
      "NVIDIA GTX 1660 Ti",
      "NVIDIA RTX 3050",
      "NVIDIA RTX 3060",
      "NVIDIA RTX 3070",
      "NVIDIA RTX 3080",
      "NVIDIA RTX 4050",
      "NVIDIA RTX 4060",
      "NVIDIA RTX 4070",
      "NVIDIA RTX 4090",
      "Apple M1",
      "Apple M2 Integrated",
    ],
    battery: ["30–50 Wh", "50–70 Wh", "70–90 Wh", "90–110 Wh"],
    price: [
      "< $100",
      "$100–$199",
      "$200–$299",
      "$300–$399",
      "$400–$499",
      "$500–$699",
      "$700–$899",
      "$900–$1,099",
      "$1,100–$1,299",
      "$1,300–$1,500",
      "$1,500–$1,700",
      "$1,700–$2,000",
    ],
  },
  tablet: {
    processor: [
      "Qualcomm Snapdragon",
      "Apple A-series",
      "MediaTek Dimensity",
      "MediaTek Helio",
      "Exynos",
      "NVIDIA Tegra",
      "Intel Atom",
      "Huawei Kirin",
      "Rockchip",
      "Allwinner",
    ],
    ram: ["2GB", "4GB", "6GB", "8GB", "12GB"],
    graphics: ["Apple GPU", "Adreno", "Mali", "PowerVR"],
    battery: [
      "1000–2000 mAh",
      "2000–3000 mAh",
      "3000–4000 mAh",
      "4000–5000 mAh",
      "5000–6000 mAh",
      "6000–7000 mAh",
    ],
    price: [
      "< $100",
      "$100–$199",
      "$200–$299",
      "$300–$399",
      "$400–$499",
      "$500–$699",
      "$700–$899",
      "$900–$1,099",
      "$1,100–$1,299",
      "$1,300–$1,500",
      "$1,500–$1,700",
      "$1,700–$2,000",
    ],
  },
};

const FILTER_LABELS = {
  processor: "Processor",
  ram: "RAM",
  graphics: "Graphics",
  battery: "Battery",
  price: "Price Range",
};

const DEVICE_ICONS = { phone: "📱", laptop: "💻", tablet: "📲" };

function ChipSelector({ options, value, onChange, disabled }) {
  return (
    <div className="flex flex-wrap gap-2 mt-1">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          disabled={disabled}
          onClick={() => onChange(value === opt ? "" : opt)}
          className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-150
            ${
              disabled
                ? "opacity-30 cursor-not-allowed border-gray-300 text-gray-400"
                : value === opt
                  ? "bg-orange-500 border-orange-500 text-white shadow-sm"
                  : "bg-white border-gray-300 text-gray-700 hover:border-orange-400 hover:text-orange-600 cursor-pointer"
            }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function FilterSection({ label, options, value, onChange, disabled }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        {value && (
          <span className="bg-orange-100 text-orange-700 text-xs px-2 py-0.5 rounded-full font-medium">
            {value}
          </span>
        )}
      </div>
      <ChipSelector
        options={options}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  );
}

function ActiveFilters({ filters, onRemove }) {
  const active = Object.entries(filters).filter(([, v]) => v);
  if (!active.length) return null;
  return (
    <div className="flex flex-wrap gap-2 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-200">
      <span className="text-xs text-gray-500 font-medium self-center">
        Active:
      </span>
      {active.map(([key, val]) => (
        <span
          key={key}
          className="flex items-center gap-1 bg-orange-500 text-white text-xs px-2.5 py-1 rounded-full font-medium"
        >
          <span className="opacity-75 text-[10px]">{FILTER_LABELS[key]}:</span>{" "}
          {val}
          <button
            type="button"
            onClick={() => onRemove(key)}
            className="ml-1 hover:opacity-70 leading-none"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}

const EMPTY = { processor: "", ram: "", graphics: "", battery: "", price: "" };

function Filter() {
  const navigate = useNavigate();
  const [deviceType, setDeviceType] = useState("");
  const [filters, setFilters] = useState(EMPTY);
  const [loading, setLoading] = useState(false);

  const filterProductURL = import.meta.env.VITE_FILTERPRODUCT_URL;

  const setFilter = (key, val) =>
    setFilters((prev) => ({ ...prev, [key]: val }));
  const removeFilter = (key) => setFilter(key, "");

  const handleDeviceChange = (type) => {
    setDeviceType(type);
    setFilters(EMPTY);
  };

  const handleClear = () => {
    setDeviceType("");
    setFilters(EMPTY);
  };

  const handleSearch = async () => {
    if (!deviceType) {
      toast.warn("Please select a device type first", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(filterProductURL, {
        deviceType,
        ...filters,
      });
      if (response.data.message === "No such device found") {
        toast.error("No products found matching your filters", {
          position: "top-center",
          autoClose: 4000,
        });
      }
      if (response.data.productType && response.data.name) {
        toast.success("Found a match!", {
          position: "top-center",
          autoClose: 2000,
        });
        navigate(`/${response.data.productType}/${response.data.name}`);
      }
    } catch (error) {
      console.error("Error", error.message);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const currentOptions = OPTIONS[deviceType] || {};
  const activeCount = Object.values(filters).filter(Boolean).length;

  return (
    <HelmetProvider>
      <Helmet>
        <title>TechR: Filter Smartphones, Laptops & Tablets</title>
        <meta
          name="description"
          content="Filter smartphones, laptops, and tablets by specs and price to find your perfect device."
        />
      </Helmet>

      <div className="min-h-screen w-full flex flex-col items-center px-4 py-8 bg-gray-50">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Find your device
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Select specs that matter to you — leave others blank
            </p>
          </div>

          {/* Device Type Picker */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-sm">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              Device type
            </p>
            <div className="grid grid-cols-3 gap-3">
              {["phone", "laptop", "tablet"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleDeviceChange(type)}
                  className={`flex flex-col items-center justify-center gap-1.5 py-4 rounded-xl border-2 transition-all duration-150 font-medium text-sm
                    ${
                      deviceType === type
                        ? "border-orange-500 bg-orange-50 text-orange-600"
                        : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50/40"
                    }`}
                >
                  <span className="text-2xl">{DEVICE_ICONS[type]}</span>
                  <span className="capitalize">{type}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters Panel */}
          <div
            className={`bg-white rounded-2xl border border-gray-200 p-5 mb-4 shadow-sm transition-opacity duration-200 ${!deviceType ? "opacity-50" : ""}`}
          >
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-gray-700">
                Specifications
                {activeCount > 0 && (
                  <span className="ml-2 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {activeCount}
                  </span>
                )}
              </p>
              {activeCount > 0 && (
                <button
                  type="button"
                  onClick={() => setFilters(EMPTY)}
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Clear filters
                </button>
              )}
            </div>

            <ActiveFilters filters={filters} onRemove={removeFilter} />

            {Object.keys(FILTER_LABELS).map((key) => (
              <FilterSection
                key={key}
                label={FILTER_LABELS[key]}
                options={currentOptions[key] || []}
                value={filters[key]}
                onChange={(val) => setFilter(key, val)}
                disabled={!deviceType}
              />
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClear}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold text-sm hover:border-gray-300 hover:bg-gray-50 transition-all"
            >
              Reset all
            </button>
            <button
              type="button"
              onClick={handleSearch}
              disabled={loading || !deviceType}
              className={`flex-2 w-full py-3 rounded-xl font-semibold text-sm text-white transition-all
                ${
                  loading || !deviceType
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 active:scale-[0.98] shadow-sm"
                }`}
              style={{ flex: 2 }}
            >
              {loading
                ? "Searching…"
                : `Search${activeCount > 0 ? ` (${activeCount} filter${activeCount > 1 ? "s" : ""})` : ""}`}
            </button>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
}

export default Filter;
