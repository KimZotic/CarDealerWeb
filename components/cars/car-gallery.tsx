"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import type { CarImage } from "@/types/car";

type CarGalleryProps = {
  carName: string;
  images: CarImage[];
};

export function CarGallery({ carName, images }: CarGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const hasImages = images.length > 0;
  const activeImage = hasImages ? images[activeIndex] : null;

  const goPrev = () => {
    if (!hasImages) return;
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goNext = () => {
    if (!hasImages) return;
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
        <div className="relative h-[320px] md:h-[420px]">
          {activeImage?.url ? (
            <Image
              src={activeImage.url}
              alt={`${carName} ${activeImage.label}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.14),transparent_40%),linear-gradient(to_bottom_right,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]">
              <div className="flex h-16 w-16 items-center justify-center">
                <ImageIcon className="h-8 w-8 text-white/70" />
              </div>
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <button
                type="button"
                onClick={goNext}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur transition hover:bg-black/60"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {images.map((image, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`overflow-hidden rounded-2xl border transition ${
                  isActive
                    ? "border-white/30 bg-white/10"
                    : "border-white/10 bg-white/5 hover:bg-white/[0.07]"
                }`}
              >
                <div className="flex h-20 items-center justify-center bg-black/20">
                  {image.url ? (
                    <div className="relative h-full w-full">
                      <Image
                        src={image.url}
                        alt={`${carName} ${image.label}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <ImageIcon className="h-5 w-5 text-white/60" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}