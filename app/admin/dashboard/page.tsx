import { redirect } from "next/navigation";
import { Inbox, MessageSquareDot, Sparkles, UserRoundCheck } from "lucide-react";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-MY", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function getStatusClasses(status: string) {
  const key = status.toLowerCase();

  if (key === "new") {
    return "border-emerald-400/20 bg-emerald-500/10 text-emerald-200";
  }

  if (key === "contacted") {
    return "border-sky-400/20 bg-sky-500/10 text-sky-200";
  }

  if (key === "closed") {
    return "border-white/10 bg-white/10 text-white/70";
  }

  return "border-white/10 bg-white/10 text-white/70";
}

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login?error=login_required");
  }

  const { data: adminProfile } = await supabase
    .from("admins")
    .select("email, role, is_active")
    .eq("id", user.id)
    .maybeSingle();

  if (!adminProfile?.is_active) {
    redirect("/admin/login?error=unauthorized");
  }

  const [
    { count: totalInquiries },
    { count: newInquiries },
    { count: contactedInquiries },
    recentResult,
  ] = await Promise.all([
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "contacted"),
    supabase
      .from("inquiries")
      .select("id, name, phone, model, status, created_at")
      .order("created_at", { ascending: false })
      .limit(6),
  ]);

  const recentInquiries = recentResult.data ?? [];

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-[1450px] px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7">
        <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-6">
          <div className="xl:sticky xl:top-6 xl:self-start">
            <AdminSidebar />
          </div>

          <div className="min-w-0 space-y-4 lg:space-y-5">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-white/45">Welcome back</p>
                  <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                    Admin Dashboard
                  </h1>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/60">
                    <span className="block truncate">{adminProfile.email}</span>
                  </div>
                  <AdminLogoutButton />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <div className="min-w-0 rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  <Inbox className="h-5 w-5 text-white/75" />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Total
                </p>
                <h2 className="mt-2 truncate text-2xl font-semibold sm:text-3xl">
                  {totalInquiries ?? 0}
                </h2>
              </div>

              <div className="min-w-0 rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  <Sparkles className="h-5 w-5 text-white/75" />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/40">
                  New
                </p>
                <h2 className="mt-2 truncate text-2xl font-semibold sm:text-3xl">
                  {newInquiries ?? 0}
                </h2>
              </div>

              <div className="min-w-0 rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  <MessageSquareDot className="h-5 w-5 text-white/75" />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Contacted
                </p>
                <h2 className="mt-2 truncate text-2xl font-semibold sm:text-3xl">
                  {contactedInquiries ?? 0}
                </h2>
              </div>

              <div className="min-w-0 rounded-[22px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
                  <UserRoundCheck className="h-5 w-5 text-white/75" />
                </div>
                <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-white/40">
                  Role
                </p>
                <h2 className="mt-2 truncate text-2xl font-semibold capitalize sm:text-3xl">
                  {adminProfile.role}
                </h2>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
               <h2 className="text-lg font-semibold sm:text-xl">
                 Recent Inquiries
               </h2>

                <Link
                  href="/admin/inquiries"
                   className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
  >
                   View All
                   </Link>
                    </div>

              {recentInquiries.length > 0 ? (
                <div className="space-y-3">
                  {recentInquiries.map((item) => (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="max-w-full break-words text-base font-medium text-white">
                            {item.name}
                          </p>
                          <span
                            className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${getStatusClasses(
                              item.status,
                            )}`}
                          >
                            {item.status}
                          </span>
                        </div>

                        <div className="grid gap-2 text-sm text-white/55 sm:grid-cols-2">
                          <p className="break-words">Model: {item.model}</p>
                          <p className="break-words">Phone: {item.phone}</p>
                        </div>

                        <div className="text-sm text-white/40">
                          {formatDate(item.created_at)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-3xl border border-white/10 bg-black/20 p-5 text-white/55">
                  No inquiries yet.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}