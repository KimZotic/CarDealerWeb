import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function requireAdmin() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?error=login_required");
  }

  const { data: adminProfile } = await supabase
    .from("admins")
    .select("id, email, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminProfile?.is_active) {
    redirect("/admin/login?error=unauthorized");
  }

  return { supabase, user, adminProfile };
}