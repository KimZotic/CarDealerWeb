import Image from "next/image";
import type { SiteSettings } from "@/types/site-settings";

const socialLinks = [
  {
    name: "WhatsApp",
    href: "https://wa.me/60123456789",
    icon: "/icons/social/whatsapp.png",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/yourusername",
    icon: "/icons/social/instagram.png",
  },
  {
    name: "Facebook",
    href: "https://facebook.com/yourusername",
    icon: "/icons/social/facebook.png",
  },
  {
    name: "TikTok",
    href: "https://tiktok.com/@yourusername",
    icon: "/icons/social/tiktok.png",
  },
];

export function SiteFooter({ settings }: { settings: SiteSettings }) {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-6 md:py-10">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row">
          <div className="text-center md:text-left">
            <p className="text-[11px] uppercase tracking-[0.32em] text-white/40">
              {settings.footerTopLabel}
            </p>
            <h2 className="mt-1 text-lg font-semibold text-white">
              {settings.footerName}
            </h2>
            <p className="mt-2 text-sm text-white/45">
              {settings.footerSubtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href={
                  item.name === "WhatsApp"
                    ? `https://wa.me/${settings.whatsappNumber}`
                    : item.href
                }
                target="_blank"
                rel="noreferrer"
                aria-label={item.name}
                className="glass-hover inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/75 hover:border-white/15 hover:bg-white/10 hover:text-white"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={20}
                  height={20}
                  className="h-5 w-5 object-contain"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-4 text-center text-sm text-white/40 md:text-left">
          © 2026 {settings.footerName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}