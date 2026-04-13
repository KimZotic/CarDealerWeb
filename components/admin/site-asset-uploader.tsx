"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export function SiteAssetUploader({
  initialUrl = "",
}: {
  initialUrl?: string;
}) {
  const supabase = createClient();
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [logoUrl, setLogoUrl] = useState(initialUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleUpload = async (file: File | null) => {
    if (!file) return;

    setIsUploading(true);
    setErrorText("");

    try {
      const ext = file.name.split(".").pop()?.toLowerCase() || "png";
      const objectPath = `branding/${Date.now()}-${crypto.randomUUID()}.${ext}`;

      const { data, error } = await supabase.storage
        .from("site-assets")
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
      } = supabase.storage.from("site-assets").getPublicUrl(data.path);

      setLogoUrl(publicUrl);

      if (inputRef.current) {
        inputRef.current.value = "";
      }
    } catch (error) {
      setErrorText(
        error instanceof Error ? error.message : "Unable to upload logo",
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name="logoUrl" value={logoUrl} />

      <div className="rounded-3xl border border-dashed border-white/10 bg-black/20 p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-white">Website Logo</p>
            <p className="mt-1 text-sm text-white/45">
              Upload logo for header and footer
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
                Upload Logo
              </>
            )}

            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files?.[0] ?? null)}
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

      {logoUrl ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-black/20">
                <Image
                  src={logoUrl}
                  alt="Website logo"
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-sm text-white/60">Logo uploaded successfully</p>
            </div>

            <button
              type="button"
              onClick={() => setLogoUrl("")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              aria-label="Remove logo"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}