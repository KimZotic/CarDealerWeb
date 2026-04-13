import { ContactForm } from "@/components/contact/contact-form";
import { getPublicCars } from "@/lib/cars";

export default async function ContactPage() {
  const cars = await getPublicCars();

  return (
    <div className="bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-7xl px-4 py-16 md:px-6">
        <h1 className="text-3xl font-semibold md:text-5xl">
          Contact & Inquiry
        </h1>

        <div className="mt-10">
          <ContactForm cars={cars} />
        </div>
      </section>
    </div>
  );
}