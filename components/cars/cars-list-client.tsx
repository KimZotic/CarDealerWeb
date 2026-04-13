"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { CarCard } from "@/components/cars/car-card";
import { PremiumSelect } from "@/components/ui/premium-select";
import type { Car } from "@/types/car";

type CarsListClientProps = {
  cars: Car[];
};

function parseMoney(value: string) {
  return Number(value.replace(/[^0-9.]/g, "").replace(/,/g, ""));
}

export function CarsListClient({ cars }: CarsListClientProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  const categoryOptions = [
    { label: "All Categories", value: "all" },
    ...Array.from(new Set(cars.map((car) => car.category))).map((item) => ({
      label: item,
      value: item,
    })),
  ];

  const sortOptions = [
    { label: "Default", value: "default" },
    { label: "Lowest Monthly", value: "monthly-low" },
    { label: "Highest Monthly", value: "monthly-high" },
    { label: "Lowest Cash Price", value: "cash-low" },
    { label: "Highest Cash Price", value: "cash-high" },
    { label: "Name A-Z", value: "name-asc" },
  ];

  const filteredCars = useMemo(() => {
    let result = [...cars];

    if (search.trim()) {
      const keyword = search.toLowerCase();
      result = result.filter(
        (car) =>
          car.name.toLowerCase().includes(keyword) ||
          car.category.toLowerCase().includes(keyword) ||
          car.tagline.toLowerCase().includes(keyword),
      );
    }

    if (category !== "all") {
      result = result.filter((car) => car.category === category);
    }

    switch (sort) {
      case "monthly-low":
        result.sort(
          (a, b) => parseMoney(a.monthlyPrice) - parseMoney(b.monthlyPrice),
        );
        break;
      case "monthly-high":
        result.sort(
          (a, b) => parseMoney(b.monthlyPrice) - parseMoney(a.monthlyPrice),
        );
        break;
      case "cash-low":
        result.sort(
          (a, b) => parseMoney(a.cashPrice) - parseMoney(b.cashPrice),
        );
        break;
      case "cash-high":
        result.sort(
          (a, b) => parseMoney(b.cashPrice) - parseMoney(a.cashPrice),
        );
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return result;
  }, [cars, search, category, sort]);

  return (
    <div className="space-y-8">
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
            Search
          </p>

          <div className="flex h-12 items-center gap-3 rounded-2xl border border-white/10 bg-black/30 px-4">
            <Search className="h-4 w-4 text-white/45" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Proton model"
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/30"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
            Filter
          </p>
          <PremiumSelect
            value={category}
            onChange={setCategory}
            options={categoryOptions}
            placeholder="Select category"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
            Sort
          </p>
          <PremiumSelect
            value={sort}
            onChange={setSort}
            options={sortOptions}
            placeholder="Sort cars"
          />
        </div>
      </div>

      {filteredCars.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filteredCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/60">
          No cars found for your current filter.
        </div>
      )}
    </div>
  );
}