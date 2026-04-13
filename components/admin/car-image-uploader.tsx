"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { CarImage } from "@/types/car";

type CarImageUploaderProps = {
  initialImages?: CarImage[];
};

type UploadedImage = {
  id: string;
  label: string;
  url?: string;
};

function fileNameToLabel(fileName: string) {
  return fileName
    .replace(/\.[^/.]+$/, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function CarImageUploader({
  initialImages = [],
}: CarImageUploaderProps) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [images, setImages] = useState<UploadedImage[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const serializedImages = useMemo(() => {
    return images
      .map((item) => `${item.label} | ${item.url ?? ""}`)
      .join("\n");
  }, [images]);

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setIsUploading(true);
    setErrorText("");

    try {
      const uploadedItems: UploadedImage[] = [];

      for (const file of Array.from(files)) {
        const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
        const safeName = file.name
          .replace(/\.[^/.]+$/, "")
          .toLowerCase()
          .replace(/[^a-z0-9-]+/g, "-")
          .replace(/-+/g, "-");

        const objectPath = `cars/${Date.now()}-${crypto.randomUUID()}-${safeName}.${ext}`;

        const { data, error } = await supabase.storage
          .from("car-images")
          .upload(objectPath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

        if (error) {
          throw new Error(error.message || "Upload failed");
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("car-images").getPublicUrl(data.path);

        uploadedItems.push({
          id: `${Date.now()}-${crypto.randomUUID()}`,
          label: fileNameToLabel(file.name) || `Image ${images.length + uploadedItems.length + 1}`,
          url: publicUrl,
        });
      }

      setImages((prev) => [...prev, ...uploadedItems]);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to upload image";
      setErrorText(message);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <textarea
        hidden
        readOnly
        name="imagesText"
        value={serializedImages}
      />

      <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">Product Images</p>
            <p className="mt-1 text-sm text-white/45">
              Upload one or more images here
            </p>
          </div>

          <label className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15">
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <ImagePlus className="h-4 w-4" />
                Upload Images
              </>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
              disabled={isUploading}
            />
          </label>
        </div>

        {errorText ? (
          <div className="mt-4 rounded-2xl border border-red-400/20 bg-red-500/10 p-3 text-sm text-red-200">
            {errorText}
          </div>
        ) : null}
      </div>

      {images.length > 0 ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl"
            >
              <div className="relative h-32 bg-black/20">
                {image.url ? (
                  <Image
                    src={image.url}
                    alt={image.label}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>

              <div className="flex items-center justify-between gap-3 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {image.label || `Image ${index + 1}`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
                  aria-label="Remove image"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white/45">
          No images uploaded yet.
        </div>
      )}
    </div>
  );
}