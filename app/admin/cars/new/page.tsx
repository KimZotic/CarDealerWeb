import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { CarForm } from "@/components/admin/car-form";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createCarAction } from "../actions";

export default async function NewCarPage() {
  await requireAdmin();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-5xl px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7">
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/cars"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Link>
          </div>

          <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5 lg:p-6">
            <h1 className="text-2xl font-semibold sm:text-3xl">Add New Car</h1>

            <div className="mt-6">
              <CarForm mode="create" action={createCarAction} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}