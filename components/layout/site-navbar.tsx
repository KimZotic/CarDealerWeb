"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, X } from "lucide-react";
import { useEffect, useState } from "react";
import type { SiteSettings } from "@/types/site-settings";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/compare", label: "Compare" },
  { href: "/loan-calculator", label: "Loan Calculator" },
  { href: "/contact", label: "Contact" },
];

export function SiteNavbar({ settings }: { settings: SiteSettings }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const whatsappUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
    `Hi, saya berminat untuk bertanya tentang ${settings.siteName}.`,
  )}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/45 backdrop-blur-2xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:h-[74px] md:px-6">
        <Link href="/" className="min-w-0">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-white/45">
              {settings.headerTopLabel}
            </p>
            <h1 className="truncate text-sm font-semibold text-white md:text-base">
              {settings.siteName}
            </h1>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`glass-hover rounded-full px-4 py-2 text-sm ${
                  active
                    ? "border border-white/10 bg-white/10 text-white"
                    : "border border-transparent text-white/65 hover:border-white/10 hover:bg-white/5 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="glass-hover hidden items-center gap-2 rounded-full border border-white/15 bg-[#1f8f5f] px-4 py-2 text-sm font-medium text-white lg:inline-flex"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="glass-hover inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="nav-meteor h-[1px] w-full bg-white/5" />

      {menuOpen && (
        <div className="border-t border-white/10 bg-[#060a16]/95 px-4 py-4 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid gap-2">
              {navLinks.map((item) => {
                const active = pathname === item.href;

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`rounded-2xl px-4 py-3 text-sm transition ${
                      active
                        ? "border border-white/10 bg-white/10 text-white"
                        : "border border-transparent bg-transparent text-white/70 hover:border-white/10 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-[#1f8f5f] px-4 py-3 text-sm font-semibold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}