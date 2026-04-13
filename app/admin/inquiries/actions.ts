"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin/require-admin";

export async function updateInquiryStatusAction(formData: FormData) {
  const { supabase } = await requireAdmin();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "");

  if (!id || !["new", "contacted", "closed"].includes(status)) {
    return;
  }

  await supabase
    .from("inquiries")
    .update({ status })
    .eq("id", id);

  revalidatePath("/admin/dashboard");
  revalidatePath("/admin/inquiries");
}