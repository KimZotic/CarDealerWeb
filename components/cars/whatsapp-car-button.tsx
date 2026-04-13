"use client";

import { MessageCircle } from "lucide-react";

type WhatsAppCarButtonProps = {
  carName: string;
};

export function WhatsAppCarButton({ carName }: WhatsAppCarButtonProps) {
  const handleClick = () => {
    const currentUrl = window.location.href;
    const phoneNumber = "60123456789";

    const message = `Hi, saya berminat dengan kereta ${carName}.

Link kereta:
${currentUrl}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="rounded-full border border-white/15 bg-[#1f8f5f] px-5 py-3 text-sm font-semibold text-white transition hover:opacity-90"
    >
      <span className="inline-flex items-center gap-2">
        <MessageCircle className="h-4 w-4" />
        WhatsApp
      </span>
    </button>
  );
}