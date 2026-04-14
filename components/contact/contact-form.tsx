"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { PremiumSelect } from "@/components/ui/premium-select";
import type { Car } from "@/types/car";

type ContactFormProps = {
  cars: Car[];
  whatsappNumber: string;
  contactEmail: string;
  contactLocation: string;
};

export function ContactForm({
  cars,
  whatsappNumber,
  contactEmail,
  contactLocation,
}: ContactFormProps) {
  const [selectedModel, setSelectedModel] = useState(cars[0]?.name ?? "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(
    "Hi, I’m interested in this Proton model. Please contact me with more details.",
  );
  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cleanWhatsAppNumber = whatsappNumber.replace(/\D/g, "");
  const displayWhatsAppNumber = cleanWhatsAppNumber
    ? `+${cleanWhatsAppNumber}`
    : whatsappNumber;

  const resetForm = () => {
    setName("");
    setPhone("");
    setEmail("");
    setSelectedModel(cars[0]?.name ?? "");
    setMessage(
      "Hi, I’m interested in this Proton model. Please contact me with more details.",
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(false);
    setErrorText("");
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          model: selectedModel,
          message,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setErrorText(data.message || "Failed to submit inquiry");
        return;
      }

      setSubmitted(true);
      resetForm();
    } catch {
      setErrorText("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="space-y-4">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
              <Phone className="h-5 w-5 text-white/75" />
            </div>
            <div>
              <p className="text-sm text-white/45">Phone</p>
              <p className="mt-1 font-medium text-white">{displayWhatsAppNumber}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
              <Mail className="h-5 w-5 text-white/75" />
            </div>
            <div>
              <p className="text-sm text-white/45">Email</p>
              <p className="mt-1 font-medium text-white">{contactEmail}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
              <MapPin className="h-5 w-5 text-white/75" />
            </div>
            <div>
              <p className="text-sm text-white/45">Location</p>
              <p className="mt-1 font-medium text-white">{contactLocation}</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
              <MessageCircle className="h-5 w-5 text-white/75" />
            </div>
            <div>
              <p className="text-sm text-white/45">Response</p>
              <p className="mt-1 font-medium text-white">
                Fast response for inquiry and quotation request
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/65">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/65">Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your WhatsApp number"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
              />
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-white/65">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Optional email"
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/65">Model</label>
              <PremiumSelect
                value={selectedModel}
                onChange={setSelectedModel}
                options={cars.map((car) => ({
                  label: car.name,
                  value: car.name,
                }))}
                placeholder="Select model"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/65">Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
              className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Inquiry"
              )}
            </button>

            <a
              href={`https://wa.me/${cleanWhatsAppNumber}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
            >
              WhatsApp Now
            </a>
          </div>

          {submitted && (
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-white/70" />
              <div>Inquiry submitted successfully.</div>
            </div>
          )}

          {errorText && (
            <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-sm text-red-200">
              {errorText}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}