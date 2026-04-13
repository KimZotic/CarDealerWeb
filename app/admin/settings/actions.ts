"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";

export async function updateSiteSettingsAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const featuredCarSlugs = formData
    .getAll("featuredCarSlugs")
    .map((item) => String(item))
    .filter(Boolean);

  await supabase.from("site_settings").upsert({
    id: "main",
    header_top_label: String(formData.get("headerTopLabel") || "").trim(),
    site_name: String(formData.get("siteName") || "").trim(),
    footer_top_label: String(formData.get("footerTopLabel") || "").trim(),
    footer_name: String(formData.get("footerName") || "").trim(),
    footer_subtitle: String(formData.get("footerSubtitle") || "").trim(),
    hero_badge: String(formData.get("heroBadge") || "").trim(),
    hero_title: String(formData.get("heroTitle") || "").trim(),
    hero_description: String(formData.get("heroDescription") || "").trim(),
    marquee_text: String(formData.get("marqueeText") || "").trim(),
    homepage_featured_title: String(
      formData.get("homepageFeaturedTitle") || "",
    ).trim(),
    featured_car_slugs: featuredCarSlugs,
    logo_url: "",
    whatsapp_number: String(formData.get("whatsappNumber") || "").trim(),
    contact_email: String(formData.get("contactEmail") || "").trim(),
    contact_location: String(formData.get("contactLocation") || "").trim(),
    default_interest_rate: Number(formData.get("defaultInterestRate") || 3.2),
  });

  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/compare");
  revalidatePath("/loan-calculator");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}