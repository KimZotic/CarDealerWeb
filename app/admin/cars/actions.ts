"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdmin } from "@/lib/admin/require-admin";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parseLines(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseSpecs(value: string) {
  return parseLines(value)
    .map((line) => {
      const [label, ...rest] = line.split(":");
      const finalLabel = label?.trim();
      const finalValue = rest.join(":").trim();

      if (!finalLabel || !finalValue) return null;

      return {
        label: finalLabel,
        value: finalValue,
      };
    })
    .filter(Boolean);
}

function parseImages(value: string, fallbackName: string, slug: string) {
  return parseLines(value).map((line, index) => {
    const [labelPart, urlPart] = line.split("|").map((item) => item.trim());

    return {
      id: `${slug || slugify(fallbackName)}-${index + 1}`,
      label: labelPart || `Image ${index + 1}`,
      url: urlPart || "",
    };
  });
}

function revalidateCars(slug?: string) {
  revalidatePath("/");
  revalidatePath("/cars");
  revalidatePath("/compare");
  revalidatePath("/loan-calculator");
  revalidatePath("/contact");
  revalidatePath("/admin/cars");
  revalidatePath("/admin/dashboard");

  if (slug) {
    revalidatePath(`/cars/${slug}`);
  }
}

export async function createCarAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const monthlyPrice = String(formData.get("monthlyPrice") || "").trim();
  const cashPrice = String(formData.get("cashPrice") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const badgeText = String(formData.get("badgeText") || "").trim();
  const overview = String(formData.get("overview") || "").trim();
  const colorsText = String(formData.get("colorsText") || "");
  const featuresText = String(formData.get("featuresText") || "");
  const specsText = String(formData.get("specsText") || "");
  const imagesText = String(formData.get("imagesText") || "");
  const isActive = formData.get("isActive") === "on";

  const finalSlug = slugify(slugInput || name);

  await supabase.from("cars").insert({
    slug: finalSlug,
    name,
    category,
    monthly_price: monthlyPrice,
    cash_price: cashPrice,
    tagline,
    badge_text: badgeText,
    overview,
    colors: parseLines(colorsText),
    features: parseLines(featuresText),
    specs: parseSpecs(specsText),
    images: parseImages(imagesText, name, finalSlug),
    is_active: isActive,
  });

  revalidateCars(finalSlug);
  redirect("/admin/cars");
}

export async function updateCarAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") || "");
  const oldSlug = String(formData.get("oldSlug") || "");
  const name = String(formData.get("name") || "").trim();
  const slugInput = String(formData.get("slug") || "").trim();
  const category = String(formData.get("category") || "").trim();
  const monthlyPrice = String(formData.get("monthlyPrice") || "").trim();
  const cashPrice = String(formData.get("cashPrice") || "").trim();
  const tagline = String(formData.get("tagline") || "").trim();
  const badgeText = String(formData.get("badgeText") || "").trim();
  const overview = String(formData.get("overview") || "").trim();
  const colorsText = String(formData.get("colorsText") || "");
  const featuresText = String(formData.get("featuresText") || "");
  const specsText = String(formData.get("specsText") || "");
  const imagesText = String(formData.get("imagesText") || "");
  const isActive = formData.get("isActive") === "on";

  const finalSlug = slugify(slugInput || name);

  await supabase
    .from("cars")
    .update({
      slug: finalSlug,
      name,
      category,
      monthly_price: monthlyPrice,
      cash_price: cashPrice,
      tagline,
      badge_text: badgeText,
      overview,
      colors: parseLines(colorsText),
      features: parseLines(featuresText),
      specs: parseSpecs(specsText),
      images: parseImages(imagesText, name, finalSlug),
      is_active: isActive,
    })
    .eq("id", id);

  revalidateCars(oldSlug);
  revalidateCars(finalSlug);
  redirect("/admin/cars");
}

export async function toggleCarStatusAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") || "");
  const slug = String(formData.get("slug") || "");
  const nextStatus = String(formData.get("nextStatus") || "") === "true";

  await supabase
    .from("cars")
    .update({
      is_active: nextStatus,
    })
    .eq("id", id);

  revalidateCars(slug);
}