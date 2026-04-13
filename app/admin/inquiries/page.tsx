import Link from "next/link";
import { requireAdmin } from "@/lib/admin/require-admin";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { updateInquiryStatusAction } from "./actions";

type InquiriesPageProps = {
  searchParams: Promise<{
    status?: string;
    q?: string;
  }>;
};

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

function statusChipClass(active: boolean) {
  return active
    ? "border border-white/10 bg-white/10 text-white"
    : "border border-transparent bg-transparent text-white/60 hover:border-white/10 hover:bg-white/5 hover:text-white";
}

export default async function AdminInquiriesPage({
  searchParams,
}: InquiriesPageProps) {
  const { supabase, adminProfile } = await requireAdmin();
  const params = await searchParams;

  const status = params.status ?? "all";
  const q = params.q?.trim() ?? "";

  let query = supabase
    .from("inquiries")
    .select("id, name, phone, email, model, message, status, created_at")
    .order("created_at", { ascending: false });

  if (status !== "all" && ["new", "contacted", "closed"].includes(status)) {
    query = query.eq("status", status);
  }

  if (q) {
    query = query.or(
      `name.ilike.%${q}%,phone.ilike.%${q}%,model.ilike.%${q}%,email.ilike.%${q}%`,
    );
  }

  const { data: inquiries } = await query;

  const items = inquiries ?? [];

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
                  <p className="text-sm text-white/45">Admin</p>
                  <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                    Inquiries
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

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
              <form className="grid gap-3 lg:grid-cols-[1fr_auto]">
                <input
                  type="text"
                  name="q"
                  defaultValue={q}
                  placeholder="Search name, phone, model, email"
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/25"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                >
                  Search
                </button>
              </form>

              <div className="mt-4 flex flex-wrap gap-2">
                <Link
                  href="/admin/inquiries"
                  className={`rounded-full px-4 py-2 text-sm transition ${statusChipClass(
                    status === "all",
                  )}`}
                >
                  All
                </Link>
                <Link
                  href="/admin/inquiries?status=new"
                  className={`rounded-full px-4 py-2 text-sm transition ${statusChipClass(
                    status === "new",
                  )}`}
                >
                  New
                </Link>
                <Link
                  href="/admin/inquiries?status=contacted"
                  className={`rounded-full px-4 py-2 text-sm transition ${statusChipClass(
                    status === "contacted",
                  )}`}
                >
                  Contacted
                </Link>
                <Link
                  href="/admin/inquiries?status=closed"
                  className={`rounded-full px-4 py-2 text-sm transition ${statusChipClass(
                    status === "closed",
                  )}`}
                >
                  Closed
                </Link>
              </div>
            </div>

            <div className="space-y-3">
              {items.length > 0 ? (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
                  >
                    <div className="flex flex-col gap-4">
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

                      <div className="grid gap-2 text-sm text-white/55 sm:grid-cols-2 xl:grid-cols-4">
                        <p className="break-words">Model: {item.model}</p>
                        <p className="break-words">Phone: {item.phone}</p>
                        <p className="break-words">
                          Email: {item.email || "-"}
                        </p>
                        <p className="break-words">{formatDate(item.created_at)}</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm leading-7 text-white/75">
                        {item.message}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <form action={updateInquiryStatusAction}>
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="status" value="new" />
                          <button
                            type="submit"
                            className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                          >
                            Mark New
                          </button>
                        </form>

                        <form action={updateInquiryStatusAction}>
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="status" value="contacted" />
                          <button
                            type="submit"
                            className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                          >
                            Mark Contacted
                          </button>
                        </form>

                        <form action={updateInquiryStatusAction}>
                          <input type="hidden" name="id" value={item.id} />
                          <input type="hidden" name="status" value="closed" />
                          <button
                            type="submit"
                            className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                          >
                            Mark Closed
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-white/55 backdrop-blur-xl">
                  No inquiries found.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}