import { CompareClient } from "@/components/compare/compare-client";
import { getPublicCars } from "@/lib/cars";

export default async function ComparePage() {
  const cars = await getPublicCars();

  return (
    <div className="bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <h1 className="text-3xl font-semibold md:text-5xl">Compare Cars</h1>

        <div className="mt-10">
          <CompareClient cars={cars} />
        </div>
      </section>
    </div>
  );
}