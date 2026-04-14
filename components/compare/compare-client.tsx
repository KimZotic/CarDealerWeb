"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Check, GitCompareArrows } from "lucide-react";
import { PremiumSelect } from "@/components/ui/premium-select";
import type { Car } from "@/types/car";

const compareRows = [
  "Engine",
  "Transmission",
  "Seats",
  "Power",
  "Torque",
  "Fuel Type",
];

function getSpecValue(
  specs: { label: string; value: string }[],
  label: string,
): string {
  return specs.find((item) => item.label === label)?.value ?? "-";
}

type CompareClientProps = {
  cars: Car[];
};

export function CompareClient({ cars }: CompareClientProps) {
  const [leftCarSlug, setLeftCarSlug] = useState(cars[0]?.slug ?? "");
  const [rightCarSlug, setRightCarSlug] = useState(cars[1]?.slug ?? "");
  const [thirdCarSlug, setThirdCarSlug] = useState("none");

  const leftCar = useMemo(
    () => cars.find((car) => car.slug === leftCarSlug),
    [leftCarSlug, cars],
  );

  const rightCar = useMemo(
    () => cars.find((car) => car.slug === rightCarSlug),
    [rightCarSlug, cars],
  );

  const thirdCar = useMemo(
    () => cars.find((car) => car.slug === thirdCarSlug),
    [thirdCarSlug, cars],
  );

  const selectedCars = [leftCar, rightCar, thirdCar].filter(Boolean) as Car[];

  const carOptions = cars.map((car) => ({
    label: car.name,
    value: car.slug,
  }));

  return (
    <div className="space-y-8 overflow-visible">
      <div className="relative z-40 grid gap-4 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
            Select Car 1
          </p>
          <PremiumSelect
            value={leftCarSlug}
            onChange={setLeftCarSlug}
            options={carOptions}
            placeholder="Select car"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
            Select Car 2
          </p>
          <PremiumSelect
            value={rightCarSlug}
            onChange={setRightCarSlug}
            options={carOptions}
            placeholder="Select car"
          />
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/45">
            Select Car 3 (Optional)
          </p>
          <PremiumSelect
            value={thirdCarSlug}
            onChange={setThirdCarSlug}
            options={[{ label: "No Third Car", value: "none" }, ...carOptions]}
            placeholder="Optional third car"
          />
        </div>
      </div>

      {selectedCars.length > 0 && (
        <div
          className="relative z-10 grid gap-6"
          style={{
            gridTemplateColumns: `repeat(${selectedCars.length}, minmax(0, 1fr))`,
          }}
        >
          {selectedCars.map((car, index) => {
            const coverImage = car.images?.[0]?.url;

            return (
              <div
                key={`${car.id}-${index}`}
                className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
              >
                <div className="relative h-52 border-b border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                  {coverImage ? (
                    <Image
                      src={coverImage}
                      alt={car.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />
                  )}

                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent p-5">
                    <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
                      {car.category}
                    </p>
                    <h2 className="text-2xl font-semibold text-white">
                      {car.name}
                    </h2>
                  </div>
                </div>

                <div className="p-5">
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
                    Monthly From
                  </p>
                  <div className="mt-1 flex items-end gap-1">
                    <span className="text-2xl font-semibold text-white">
                      {car.monthlyPrice}
                    </span>
                    <span className="pb-1 text-xs text-white/55">/mo</span>
                  </div>

                  <div className="mt-2 text-sm text-white/60">
                    Cash from {car.cashPrice}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="border-b border-white/10 px-5 py-4 md:px-6">
          <div className="flex items-center gap-2 text-white">
            <GitCompareArrows className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Comparison Table</h3>
          </div>
        </div>

        <div className="hidden md:block">
          <div
            className="grid border-b border-white/10 bg-black/20 px-6 py-4 text-sm"
            style={{
              gridTemplateColumns: `minmax(150px, 1fr) repeat(${selectedCars.length}, minmax(0, 1fr))`,
            }}
          >
            <div className="text-white/50">Specification</div>
            {selectedCars.map((car, index) => (
              <div key={`${car.id}-header-${index}`} className="font-medium text-white">
                {car.name}
              </div>
            ))}
          </div>

          {compareRows.map((row) => (
            <div
              key={row}
              className="grid border-b border-white/10 px-6 py-4 text-sm last:border-b-0"
              style={{
                gridTemplateColumns: `minmax(150px, 1fr) repeat(${selectedCars.length}, minmax(0, 1fr))`,
              }}
            >
              <div className="text-white/55">{row}</div>
              {selectedCars.map((car, index) => (
                <div key={`${car.id}-${row}-${index}`} className="text-white/85">
                  {getSpecValue(car.specs, row)}
                </div>
              ))}
            </div>
          ))}

          <div
            className="grid border-t border-white/10 bg-black/20 px-6 py-4 text-sm"
            style={{
              gridTemplateColumns: `minmax(150px, 1fr) repeat(${selectedCars.length}, minmax(0, 1fr))`,
            }}
          >
            <div className="text-white/55">Highlights</div>
            {selectedCars.map((car, index) => (
              <div key={`${car.id}-highlights-${index}`} className="space-y-2">
                {car.features.slice(0, 3).map((item, featureIndex) => (
                  <div
                    key={`${car.id}-feature-${featureIndex}-${index}`}
                    className="flex items-start gap-2 text-white/85"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-white/60" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4 p-4 md:hidden">
          {compareRows.map((row) => (
            <div
              key={row}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                {row}
              </p>

              <div className="mt-3 grid gap-3">
                {selectedCars.map((car, index) => (
                  <div
                    key={`${car.id}-${row}-mobile-${index}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <p className="text-xs text-white/45">{car.name}</p>
                    <p className="mt-1 text-sm text-white/85">
                      {getSpecValue(car.specs, row)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}