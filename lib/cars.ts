import { createClient } from "@/lib/supabase/server";
import type { Car, CarImage, CarSpec } from "@/types/car";

type DbCarRow = {
  id: string;
  slug: string;
  name: string;
  category: string;
  monthly_price: string;
  cash_price: string;
  tagline: string;
  overview: string;
  colors: string[] | null;
  features: string[] | null;
  specs: CarSpec[] | null;
  images: CarImage[] | null;
  is_active: boolean;
  badge_text: string;
};

function normalizeSpecs(value: unknown): CarSpec[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "label" in item &&
        "value" in item
      ) {
        return {
          label: String(item.label),
          value: String(item.value),
        };
      }
      return null;
    })
    .filter(Boolean) as CarSpec[];
}

function normalizeImages(value: unknown): CarImage[] {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => {
      if (
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "label" in item
      ) {
        return {
          id: String(item.id),
          label: String(item.label),
          url: "url" in item && item.url ? String(item.url) : undefined,
        };
      }
      return null;
    })
    .filter(Boolean) as CarImage[];
}

function mapDbCar(row: DbCarRow): Car {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    tagline: row.tagline,
    monthlyPrice: row.monthly_price,
    cashPrice: row.cash_price,
    category: row.category,
    overview: row.overview,
    colors: row.colors ?? [],
    features: row.features ?? [],
    specs: normalizeSpecs(row.specs),
    images: normalizeImages(row.images),
    isActive: row.is_active,
    badgeText: row.badge_text ?? "",
  };
}

export async function getPublicCars() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as DbCarRow[]).map(mapDbCar);
}

export async function getAdminCars() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return (data as DbCarRow[]).map(mapDbCar);
}

export async function getPublicCarBySlug(slug: string) {
  const supabase = await createClient();

  const { data } = await supabase
    .from("cars")
    .select("*")
    .eq("slug", slug)
    .eq("is_active", true)
    .maybeSingle();

  if (!data) {
    return null;
  }

  return mapDbCar(data as DbCarRow);
}

export async function getAdminCarById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cars")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapDbCar(data as DbCarRow);
}