import type { Car } from "@/types/car";
import { CarImageUploader } from "@/components/admin/car-image-uploader";

type CarFormProps = {
  mode: "create" | "edit";
  action: (formData: FormData) => Promise<void>;
  initialData?: Car | null;
};

function specsToText(specs: Car["specs"] = []) {
  return specs.map((item) => `${item.label}: ${item.value}`).join("\n");
}

export function CarForm({ mode, action, initialData }: CarFormProps) {
  return (
    <form action={action} className="space-y-5">
      {mode === "edit" && initialData ? (
        <>
          <input type="hidden" name="id" value={initialData.id} />
          <input type="hidden" name="oldSlug" value={initialData.slug} />
        </>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/65">Car Name</label>
          <input
            name="name"
            defaultValue={initialData?.name ?? ""}
            placeholder="Proton X70"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">Slug</label>
          <input
            name="slug"
            defaultValue={initialData?.slug ?? ""}
            placeholder="proton-x70"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div>
          <label className="mb-2 block text-sm text-white/65">Category</label>
          <input
            name="category"
            defaultValue={initialData?.category ?? ""}
            placeholder="SUV"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">
            Monthly Price
          </label>
          <input
            name="monthlyPrice"
            defaultValue={initialData?.monthlyPrice ?? ""}
            placeholder="RM 1,020"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">
            Cash Price
          </label>
          <input
            name="cashPrice"
            defaultValue={initialData?.cashPrice ?? ""}
            placeholder="RM 98,800"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/65">
            Short Description
          </label>
          <input
            name="tagline"
            defaultValue={initialData?.tagline ?? ""}
            placeholder="Premium SUV with confidence and comfort."
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">
            Badge Text
          </label>
          <input
            name="badgeText"
            defaultValue={initialData?.badgeText ?? ""}
            placeholder="Trending / Hot / Best Seller / New"
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/65">Overview</label>
        <textarea
          name="overview"
          defaultValue={initialData?.overview ?? ""}
          rows={5}
          placeholder="Detailed description for the product page"
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
        />
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-white/65">
            Colors
          </label>
          <textarea
            name="colorsText"
            defaultValue={(initialData?.colors ?? []).join("\n")}
            rows={5}
            placeholder={`Snow White\nJet Grey\nOcean Blue`}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-white/65">
            Features
          </label>
          <textarea
            name="featuresText"
            defaultValue={(initialData?.features ?? []).join("\n")}
            rows={5}
            placeholder={`Premium LED lighting\nAdvanced safety assistance\nLarge infotainment display`}
            className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-white/65">
          Specifications
        </label>
        <textarea
          name="specsText"
          defaultValue={specsToText(initialData?.specs)}
          rows={6}
          placeholder={`Engine: 1.5L TGDI\nTransmission: 7DCT\nSeats: 5 Seats\nPower: 177 PS`}
          className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-white/25"
        />
      </div>

      <CarImageUploader initialImages={initialData?.images ?? []} />

      <label className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/80">
        <input
          type="checkbox"
          name="isActive"
          defaultChecked={initialData?.isActive ?? true}
          className="h-4 w-4"
        />
        Active Product
      </label>

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
        >
          {mode === "create" ? "Create Car" : "Save Changes"}
        </button>
      </div>
    </form>
  );
}