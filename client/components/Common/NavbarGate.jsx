"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Common/Navbar";

export default function NavbarGate() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return <Navbar />;
}
