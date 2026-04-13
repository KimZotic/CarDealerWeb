import { createClient } from "@/lib/supabase/server";
import type { SiteSettings } from "@/types/site-settings";

const defaultSiteSettings: SiteSettings = {
  headerTopLabel: "Proton",
  siteName: "Car Dealer",
  footerTopLabel: "Proton",
  footerName: "Car Dealer",
  footerSubtitle: "Premium Proton catalog website",
  heroBadge: "Proton Car Sales Catalog",
  heroTitle: "Premium Car Dealer Website for Modern Proton Sales",
  heroDescription:
    "A professional catalog platform to showcase Proton models, prices, specifications, comparisons, and loan estimates with a premium and convincing presentation.",
  marqueeText: "CAR DEALER",
  homepageFeaturedTitle: "Trending & Most Wanted Models",
  featuredCarSlugs: [],
  logoUrl: "",
  whatsappNumber: "60123456789",
  contactEmail: "sales@cardealer.com",
  contactLocation: "Proton Sales Gallery, Malaysia",
  defaultInterestRate: 3.2,
};

type DbSettingsRow = {
  header_top_label: string;
  site_name: string;
  footer_top_label: string;
  footer_name: string;
  footer_subtitle: string;
  hero_badge: string;
  hero_title: string;
  hero_description: string;
  marquee_text: string;
  homepage_featured_title: string;
  featured_car_slugs: string[] | null;
  logo_url: string;
  whatsapp_number: string;
  contact_email: string;
  contact_location: string;
  default_interest_rate: number | string;
};

function mapSettings(row: DbSettingsRow): SiteSettings {
  return {
    headerTopLabel: row.header_top_label,
    siteName: row.site_name,
    footerTopLabel: row.footer_top_label,
    footerName: row.footer_name,
    footerSubtitle: row.footer_subtitle,
    heroBadge: row.hero_badge,
    heroTitle: row.hero_title,
    heroDescription: row.hero_description,
    marqueeText: row.marquee_text,
    homepageFeaturedTitle: row.homepage_featured_title,
    featuredCarSlugs: row.featured_car_slugs ?? [],
    logoUrl: row.logo_url ?? "",
    whatsappNumber: row.whatsapp_number,
    contactEmail: row.contact_email,
    contactLocation: row.contact_location,
    defaultInterestRate: Number(row.default_interest_rate ?? 3.2),
  };
}

export async function getSiteSettings() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", "main")
    .maybeSingle();

  if (error || !data) {
    return defaultSiteSettings;
  }

  return mapSettings(data as DbSettingsRow);
}