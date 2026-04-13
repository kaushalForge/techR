"use client";

import { useEffect, useState } from "react";
import ProductTable from "@/components/Admin/ProductTable";

export default function AdminProductsClient({ type = "all", title = "Products" }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    try {
      setLoading(true);
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function onDelete(id) {
    const ok = window.confirm("Delete this product?");
    if (!ok) return;

    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      setMessage("Deleted successfully.");
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        {message ? <p className="text-sm text-emerald-300">{message}</p> : null}
      </div>
      {loading ? (
        <p className="text-white/70">Loading...</p>
      ) : (
        <ProductTable products={products} type={type} onDelete={onDelete} />
      )}
    </div>
  );
}
