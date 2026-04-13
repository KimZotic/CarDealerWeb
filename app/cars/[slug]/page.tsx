import Link from "next/link";
import { CheckCircle2, Palette, WalletCards } from "lucide-react";
import { notFound } from "next/navigation";
import { CarGallery } from "@/components/cars/car-gallery";
import { SpecIcon } from "@/components/cars/spec-icon";
import { WhatsAppCarButton } from "@/components/cars/whatsapp-car-button";
import { getPublicCarBySlug } from "@/lib/cars";

type CarDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CarDetailPage({ params }: CarDetailPageProps) {
  const { slug } = await params;
  const car = await getPublicCarBySlug(slug);

  if (!car) {
    notFound();
  }

  return (
    <div className="bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <CarGallery carName={car.name} images={car.images} />

          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-white/50">
              {car.category}
            </p>

            <h1 className="mt-3 text-4xl font-semibold md:text-5xl">
              {car.name}
            </h1>

            <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/45">
                Estimated Monthly Installment
              </p>

              <div className="mt-2 flex items-end gap-2">
                <span className="text-5xl font-semibold text-white">
                  {car.monthlyPrice}
                </span>
                <span className="mb-1 text-sm text-white/55">/mo</span>
              </div>

              <div className="mt-3 inline-flex items-center gap-2 text-sm text-white/60">
                <WalletCards className="h-4 w-4" />
                Cash from {car.cashPrice}
              </div>

              <p className="mt-4 leading-8 text-white/70">{car.overview}</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <WhatsAppCarButton carName={car.name} />

              <Link
                href="/loan-calculator"
                className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
              >
                Calculate Loan
              </Link>

              <Link
                href="/compare"
                className="rounded-full border border-white/15 bg-transparent px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Compare Model
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Specifications
            </p>

            <div className="mt-6 space-y-3">
              {car.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div className="flex items-center gap-3 text-white/70">
                    <div className="text-white/75">
                      <SpecIcon label={spec.label} className="h-5 w-5" />
                    </div>
                    <span>{spec.label}</span>
                  </div>

                  <span className="font-medium text-white">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm uppercase tracking-[0.3em] text-white/50">
              Highlights
            </p>

            <div className="mt-6 grid gap-3">
              {car.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/80"
                >
                  <CheckCircle2 className="h-5 w-5 text-white/70" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/50">
                <Palette className="h-4 w-4" />
                Available Colors
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {car.colors.map((color) => (
                  <span
                    key={color}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/75"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}