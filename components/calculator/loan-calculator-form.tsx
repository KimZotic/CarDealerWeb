"use client";

import { useMemo, useState } from "react";
import { Calculator, WalletCards } from "lucide-react";
import { PremiumSelect } from "@/components/ui/premium-select";
import type { Car } from "@/types/car";

type LoanCalculatorFormProps = {
  cars: Car[];
  defaultInterestRate: number;
};

function parseMoney(value: string) {
  return Number(value.replace(/[^0-9.]/g, "").replace(/,/g, ""));
}

export function LoanCalculatorForm({
  cars,
  defaultInterestRate,
}: LoanCalculatorFormProps) {
  const [selectedSlug, setSelectedSlug] = useState(cars[0]?.slug ?? "");
  const [downPayment, setDownPayment] = useState(10000);
  const [loanYears, setLoanYears] = useState(9);

  const selectedCar = useMemo(
    () => cars.find((car) => car.slug === selectedSlug),
    [selectedSlug, cars],
  );

  const carPrice = selectedCar ? parseMoney(selectedCar.cashPrice) : 0;
  const loanAmount = Math.max(carPrice - downPayment, 0);
  const monthlyRate = defaultInterestRate / 100 / 12;
  const totalMonths = loanYears * 12;

  const monthlyInstallment =
    monthlyRate > 0 && totalMonths > 0
      ? (loanAmount * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -totalMonths))
      : loanAmount / Math.max(totalMonths, 1);

  const totalRepayment = monthlyInstallment * totalMonths;
  const totalInterest = totalRepayment - loanAmount;

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      maximumFractionDigits: 0,
    }).format(Number.isFinite(value) ? value : 0);

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-2 text-white">
          <Calculator className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Loan Inputs</h2>
        </div>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm text-white/65">
              Select Model
            </label>
            <PremiumSelect
              value={selectedSlug}
              onChange={setSelectedSlug}
              options={cars.map((car) => ({
                label: car.name,
                value: car.slug,
              }))}
              placeholder="Select model"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/65">
              Car Price
            </label>
            <input
              value={formatCurrency(carPrice)}
              readOnly
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/80 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/65">
              Down Payment (RM)
            </label>
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition focus:border-white/25"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/65">
              Loan Period (Years)
            </label>
            <input
              type="number"
              value={loanYears}
              onChange={(e) => setLoanYears(Number(e.target.value))}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition focus:border-white/25"
            />
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Interest Rate
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {defaultInterestRate}% p.a.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <div className="mb-6 flex items-center gap-2 text-white">
          <WalletCards className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Estimated Result</h2>
        </div>

        <div className="rounded-3xl border border-white/10 bg-black/20 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-white/45">
            Estimated Monthly Installment
          </p>
          <div className="mt-2 flex items-end gap-2">
            <span className="text-4xl font-semibold text-white">
              {formatCurrency(monthlyInstallment)}
            </span>
            <span className="pb-1 text-sm text-white/55">/mo</span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Loan Amount
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {formatCurrency(loanAmount)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Total Interest
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {formatCurrency(totalInterest)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Total Repayment
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {formatCurrency(totalRepayment)}
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/45">
              Loan Period
            </p>
            <p className="mt-2 text-xl font-semibold text-white">
              {loanYears} Years
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}