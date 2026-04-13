import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/app-shell";
import { getSiteSettings } from "@/lib/site-settings";

export const metadata: Metadata = {
  title: "Car Dealer",
  description: "Premium Proton car dealer catalog website",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en">
      <body>
        <AppShell siteSettings={siteSettings}>{children}</AppShell>
      </body>
    </html>
  );
}