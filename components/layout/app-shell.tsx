"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteNavbar } from "@/components/layout/site-navbar";
import type { SiteSettings } from "@/types/site-settings";

export function AppShell({
  children,
  siteSettings,
}: {
  children: React.ReactNode;
  siteSettings: SiteSettings;
}) {
  const pathname = usePathname();
  const isAdminRoute = pathname.startsWith("/admin");

  if (isAdminRoute) {
    return <div className="min-h-screen bg-[#050816] text-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNavbar settings={siteSettings} />
      <main>{children}</main>
      <SiteFooter settings={siteSettings} />
    </div>
  );
}