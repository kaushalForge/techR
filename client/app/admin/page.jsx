"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function AdminPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/products", { cache: "no-store" });
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    })();
  }, []);

  const stats = useMemo(() => {
    const phone = products.filter((p) => p.productType === "phone").length;
    const laptop = products.filter((p) => p.productType === "laptop").length;
    const tablet = products.filter((p) => p.productType === "tablet").length;
    const blogs = products.filter((p) => p.blog && p.blog.trim()).length;
    return { total: products.length, phone, laptop, tablet, blogs };
  }, [products]);

  const cards = [
    { label: "Total Products", value: stats.total, href: "/admin/products" },
    { label: "Phones", value: stats.phone, href: "/admin/phones" },
    { label: "Laptops", value: stats.laptop, href: "/admin/laptops" },
    { label: "Tablets", value: stats.tablet, href: "/admin/tablets" },
    { label: "Blogged Products", value: stats.blogs, href: "/admin/products" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-white/75 mt-1">
          Overview only. Manage entries from dedicated pages.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {cards.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="rounded-2xl border border-white/20 bg-black/25 p-5 hover:bg-black/35 transition"
          >
            <p className="text-sm text-white/80">{item.label}</p>
            <p className="text-3xl font-bold mt-2">{item.value}</p>
          </Link>
        ))}
      </div>

      <div className="rounded-2xl border border-white/20 bg-black/20 p-5">
        <h2 className="text-xl font-semibold mb-2">Quick Navigation</h2>
        <div className="flex flex-wrap gap-2">
          <Link className="px-3 py-2 rounded-xl bg-indigo-500" href="/admin/add-product">
            Add Product
          </Link>
          <Link className="px-3 py-2 rounded-xl bg-white/20" href="/admin/products">
            View All Products
          </Link>
          <Link className="px-3 py-2 rounded-xl bg-white/20" href="/admin/phones">
            Phones
          </Link>
          <Link className="px-3 py-2 rounded-xl bg-white/20" href="/admin/laptops">
            Laptops
          </Link>
          <Link className="px-3 py-2 rounded-xl bg-white/20" href="/admin/tablets">
            Tablets
          </Link>
        </div>
      </div>
    </div>
  );
}
