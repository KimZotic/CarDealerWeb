import { CarsListClient } from "@/components/cars/cars-list-client";
import { getPublicCars } from "@/lib/cars";

export default async function CarsPage() {
  const cars = await getPublicCars();

  return (
    <div className="bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <div className="max-w-3xl">
          <h1 className="text-3xl font-semibold md:text-5xl">
            Explore Available Proton Models
          </h1>
        </div>

        <div className="mt-10">
          <CarsListClient cars={cars} />
        </div>
      </section>
    </div>
  );
}