"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/add-product", label: "Add Product" },
  { href: "/admin/products", label: "All Products" },
  { href: "/admin/laptops", label: "Laptops" },
  { href: "/admin/tablets", label: "Tablets" },
  { href: "/admin/phones", label: "Phones" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-full md:w-64 md:min-h-screen bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-4">
      <h2 className="text-white text-xl font-bold mb-4">Admin Panel</h2>
      <nav className="space-y-2">
        {links.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-3 py-2 rounded-xl text-sm transition ${
                active
                  ? "bg-white text-zinc-900 font-semibold"
                  : "text-white/90 hover:bg-white/20"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
