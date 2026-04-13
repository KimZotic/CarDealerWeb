import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Clock3,
  MessageSquareMore,
  Zap,
} from "lucide-react";
import { getPublicCars } from "@/lib/cars";
import { getSiteSettings } from "@/lib/site-settings";

const highlights = [
  {
    title: "24/7 Support",
    icon: Clock3,
  },
  {
    title: "Fast Response",
    icon: MessageSquareMore,
  },
  {
    title: "1000+ Happy Client",
    icon: BadgeCheck,
  },
  {
    title: "Fast Process",
    icon: Zap,
  },
];

const whyItems = [
  "Professional Proton model catalog",
  "Easy compare between car models",
  "Fast loan estimation for customers",
  "Direct inquiry for faster response",
];

export default async function HomePage() {
  const cars = await getPublicCars();
  const settings = await getSiteSettings();

  const selectedFeatured =
    settings.featuredCarSlugs.length > 0
      ? settings.featuredCarSlugs
          .map((slug) => cars.find((car) => car.slug === slug))
          .filter(Boolean)
      : cars.slice(0, 4);

  const featuredCars = selectedFeatured.slice(0, 4);

  return (
    <div className="bg-[#050816] text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.16),transparent_35%),linear-gradient(to_bottom,#0b1020,#050816)]" />

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-14 pb-10 md:px-6 md:pt-20 md:pb-12">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm uppercase tracking-[0.4em] text-white/60">
              {settings.heroBadge}
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              {settings.heroTitle}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-white/70 md:text-lg">
              {settings.heroDescription}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/cars"
                className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
              >
                View Cars
              </Link>
              <Link
                href="/loan-calculator"
                className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Loan Calculator
              </Link>
              <Link
                href="/compare"
                className="rounded-full border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Compare Models
              </Link>
            </div>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {highlights.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="premium-trust-card rounded-[24px]"
                >
                  <div className="premium-trust-card-inner rounded-[23px] px-5 py-5">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/20 text-white/85">
                        <Icon className="h-5 w-5" />
                      </div>

                      <h3 className="text-base font-semibold tracking-[0.02em] text-white md:text-lg">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Featured Models
          </p>
          <h2 className="mt-2 text-2xl font-semibold md:text-4xl">
            {settings.homepageFeaturedTitle}
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredCars.map((car) => {
            if (!car) return null;

            const coverImage = car.images?.[0]?.url;

            return (
              <Link
                key={car.id}
                href={`/cars/${car.slug}`}
                className="premium-home-card rounded-[28px]"
              >
                <div className="premium-home-card-inner rounded-[27px] p-4">
                  <div className="relative h-36 overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 ring-1 ring-white/10">
                    {car.badgeText ? (
                      <div className="absolute left-3 top-3 z-10">
                        <span className="rounded-full border border-white/15 bg-black/45 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-white backdrop-blur">
                          {car.badgeText}
                        </span>
                      </div>
                    ) : null}

                    {coverImage ? (
                      <Image
                        src={coverImage}
                        alt={car.name}
                        fill
                        className="object-cover transition duration-300 hover:scale-[1.02]"
                      />
                    ) : null}
                  </div>

                  <div className="mt-4">
                    <p className="text-[11px] uppercase tracking-[0.26em] text-white/45">
                      {car.category}
                    </p>

                    <h3 className="mt-2 text-lg font-semibold text-white">
                      {car.name}
                    </h3>

                    <p className="mt-2 text-sm text-white/55">
                      {car.monthlyPrice}/mo
                    </p>

                    <p className="mt-1 text-xs text-white/40">
                      Cash from {car.cashPrice}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 md:px-6 md:pb-16">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
          <p className="text-sm uppercase tracking-[0.3em] text-white/50">
            Why This Website
          </p>

          <h2 className="mt-2 text-2xl font-semibold md:text-4xl">
            Built to Help Customers Decide Faster
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {whyItems.map((item) => (
              <div
                key={item}
                className="rounded-2xl border border-white/10 bg-black/20 p-5 text-white/80"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}