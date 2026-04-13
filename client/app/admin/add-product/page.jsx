"use client";

import { useState } from "react";
import ProductForm from "@/components/Admin/ProductForm";

export default function AddProductPage() {
  const [selectedType, setSelectedType] = useState("");

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold">Add Product</h1>
      {!selectedType ? (
        <div className="rounded-2xl border border-white/20 bg-black/20 p-5">
          <p className="text-white/80 mb-4">
            Select a product category before continuing.
          </p>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3">
            {["phone", "laptop", "tablet", "other"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className="px-4 py-3 rounded-xl bg-white/15 hover:bg-white/25 capitalize"
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => setSelectedType("")}
            className="px-3 py-2 rounded-lg bg-white/20 text-sm"
          >
            Change Category
          </button>
          <ProductForm mode="create" initialType={selectedType} lockType />
        </div>
      )}
    </div>
  );
}
