"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CarFront,
  LayoutDashboard,
  Mailbox,
  Settings,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
    enabled: true,
  },
  {
    label: "Manage Cars",
    href: "/admin/cars",
    icon: CarFront,
    enabled: true,
  },
  {
    label: "Inquiries",
    href: "/admin/inquiries",
    icon: Mailbox,
    enabled: true,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
    enabled: true,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="rounded-[24px] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-xl sm:p-4">
      <div className="mb-3 flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
          <ShieldCheck className="h-5 w-5 text-white/75" />
        </div>

        <div className="min-w-0">
          <p className="text-[11px] uppercase tracking-[0.28em] text-white/40">
            Admin
          </p>
          <h2 className="truncate text-base font-semibold text-white">
            Car Dealer
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 lg:grid-cols-1">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.enabled &&
            (pathname === item.href ||
              (item.href !== "/admin/dashboard" && pathname.startsWith(item.href)));

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex min-h-[52px] items-center gap-3 rounded-2xl px-4 py-3 text-sm transition ${
                isActive
                  ? "border border-white/10 bg-white/10 text-white"
                  : "border border-transparent bg-transparent text-white/65 hover:border-white/10 hover:bg-white/5 hover:text-white"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}