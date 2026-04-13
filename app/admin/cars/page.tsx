import Link from "next/link";
import { Plus, SquarePen } from "lucide-react";
import { requireAdmin } from "@/lib/admin/require-admin";
import { getAdminCars } from "@/lib/cars";
import { toggleCarStatusAction } from "./actions";

export default async function AdminCarsPage() {
  await requireAdmin();
  const cars = await getAdminCars();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-[1450px] px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7">
        <div className="space-y-5">
          <div className="flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <div>
              <p className="text-sm text-white/45">Admin</p>
              <h1 className="mt-1 text-2xl font-semibold sm:text-3xl">
                Manage Cars
              </h1>
            </div>

            <Link
              href="/admin/cars/new"
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Add New Car
            </Link>
          </div>

          {cars.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {cars.map((car) => (
                <div
                  key={car.id}
                  className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">
                        {car.category}
                      </p>
                      <h2 className="mt-2 truncate text-xl font-semibold">
                        {car.name}
                      </h2>
                    </div>

                    <span
                      className={`inline-flex rounded-full border px-3 py-1 text-[11px] uppercase tracking-[0.18em] ${
                        car.isActive
                          ? "border-emerald-400/20 bg-emerald-500/10 text-emerald-200"
                          : "border-white/10 bg-white/10 text-white/60"
                      }`}
                    >
                      {car.isActive ? "Active" : "Inactive"}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-white/40">Monthly</p>
                      <p className="mt-1 font-medium text-white">
                        {car.monthlyPrice}/mo
                      </p>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
                      <p className="text-white/40">Cash</p>
                      <p className="mt-1 font-medium text-white">
                        {car.cashPrice}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link
                      href={`/admin/cars/${car.id}/edit`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
                    >
                      <SquarePen className="h-4 w-4" />
                      Edit
                    </Link>

                    <form action={toggleCarStatusAction}>
                      <input type="hidden" name="id" value={car.id} />
                      <input type="hidden" name="slug" value={car.slug} />
                      <input
                        type="hidden"
                        name="nextStatus"
                        value={car.isActive ? "false" : "true"}
                      />
                      <button
                        type="submit"
                        className="rounded-full border border-white/15 bg-transparent px-4 py-2 text-sm font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                      >
                        {car.isActive ? "Deactivate" : "Activate"}
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-5 text-white/55 backdrop-blur-xl">
              No cars in database yet.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}