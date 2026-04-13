"use client";

import { useEffect, useState } from "react";
import ProductForm from "@/components/Admin/ProductForm";

function normalizeForForm(product) {
  const flatten = (value) =>
    Array.isArray(value)
      ? value.flat().filter(Boolean)
      : value
        ? [String(value)]
        : [];

  return {
    ...product,
    processor: flatten(product.processor),
    graphic: flatten(product.graphic),
    ram: flatten(product.ram),
    storage: flatten(product.storage),
    price: flatten(product.price),
  };
}

export default function EditProductClient({ id, forcedType }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/products/${id}`, { cache: "no-store" });
        const product = await res.json();
        if (!res.ok)
          throw new Error(product?.message || "Unable to load product");
        setData(normalizeForForm(product));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <p className="text-white/70">Loading product...</p>;
  if (error) return <p className="text-red-300">{error}</p>;
  if (!data) return <p className="text-white/70">Product not found.</p>;

  return (
    <ProductForm
      mode="edit"
      initialData={{ ...data, productType: forcedType || data.productType }}
      lockType={Boolean(forcedType)}
    />
  );
}
