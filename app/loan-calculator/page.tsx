import { LoanCalculatorForm } from "@/components/calculator/loan-calculator-form";
import { getPublicCars } from "@/lib/cars";
import { getSiteSettings } from "@/lib/site-settings";

export default async function LoanCalculatorPage() {
  const cars = await getPublicCars();
  const settings = await getSiteSettings();

  return (
    <div className="bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Loan Calculator
        </h1>

        <div className="mt-10">
          <LoanCalculatorForm
            cars={cars}
            defaultInterestRate={settings.defaultInterestRate}
          />
        </div>
      </section>
    </div>
  );
}