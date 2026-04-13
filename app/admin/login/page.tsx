import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { createClient } from "@/lib/supabase/server";

export default async function AdminLoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: adminProfile } = await supabase
      .from("admins")
      .select("id, is_active")
      .eq("id", user.id)
      .maybeSingle();

    if (adminProfile?.is_active) {
      redirect("/admin/dashboard");
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-[#050816] px-4 py-16">
      <AdminLoginForm />
    </div>
  );
}