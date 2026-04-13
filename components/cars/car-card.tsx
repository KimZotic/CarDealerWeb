import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";
import { SpecIcon } from "@/components/cars/spec-icon";

type CarCardProps = {
  car: Car;
};

export function CarCard({ car }: CarCardProps) {
  const coverImage = car.images?.[0]?.url;

  return (
    <Link
      href={`/cars/${car.slug}`}
      className="group block overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]"
    >
      <div className="relative h-48 overflow-hidden border-b border-white/10 bg-gradient-to-br from-white/10 to-white/5">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={car.name}
            fill
            className="object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_45%)]" />
        )}

        <div className="absolute inset-x-0 top-0 flex justify-between p-4">
          {car.badgeText ? (
            <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-white backdrop-blur">
              {car.badgeText}
            </span>
          ) : (
            <span />
          )}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5">
          <div>
            <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/60">
              {car.category}
            </p>
            <h3 className="text-xl font-semibold text-white">{car.name}</h3>
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
              Monthly From
            </p>
            <div className="mt-1 flex items-end gap-1">
              <span className="text-xl font-semibold text-white">
                {car.monthlyPrice}
              </span>
              <span className="pb-0.5 text-xs text-white/55">/mo</span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] uppercase tracking-[0.25em] text-white/45">
              Cash
            </p>
            <p className="mt-1 text-xs text-white/65">{car.cashPrice}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {car.specs.slice(0, 4).map((spec) => (
            <div
              key={spec.label}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-3 py-2.5"
            >
              <div className="shrink-0 text-white/75">
                <SpecIcon label={spec.label} className="h-4 w-4" />
              </div>

              <p className="truncate text-xs font-medium text-white/85">
                {spec.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}