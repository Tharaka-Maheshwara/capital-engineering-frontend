"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/common/navbar";
import Footer from "@/components/common/footer";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAuthRoute = pathname?.startsWith("/auth");
  const isRateUsRoute = pathname?.startsWith("/rate-us");

  if (isAdminRoute || isAuthRoute || isRateUsRoute) {
    return <>{children}</>;
  }

  return (
    <div className="pt-42.5 sm:pt-40 lg:pt-38.5">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
