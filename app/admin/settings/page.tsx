import { AdminLogoutButton } from "@/components/admin/admin-logout-button";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { requireAdmin } from "@/lib/admin/require-admin";
import { getAdminCars } from "@/lib/cars";
import { getSiteSettings } from "@/lib/site-settings";
import { updateSiteSettingsAction } from "./actions";

export default async function AdminSettingsPage() {
  const { adminProfile } = await requireAdmin();
  const settings = await getSiteSettings();
  const cars = await getAdminCars();

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <section className="mx-auto w-full max-w-[1450px] px-3 py-4 sm:px-4 sm:py-5 lg:px-6 lg:py-7">
        <div className="grid gap-4 xl:grid-cols-[260px_minmax(0,1fr)] xl:gap-6">
          <div className="xl:sticky xl:top-6 xl:self-start">
            <AdminSidebar />
          </div>

          <div className="min-w-0 space-y-4 lg:space-y-5">
            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="min-w-0">
                  <p className="text-sm text-white/45">Admin</p>
                  <h1 className="mt-1 truncate text-2xl font-semibold tracking-tight sm:text-3xl">
                    Website Settings
                  </h1>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white/60">
                    <span className="block truncate">{adminProfile.email}</span>
                  </div>
                  <AdminLogoutButton />
                </div>
              </div>
            </div>

            <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl sm:p-5 lg:p-6">
              <form action={updateSiteSettingsAction} className="space-y-6">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Header Top Label
                    </label>
                    <input
                      name="headerTopLabel"
                      defaultValue={settings.headerTopLabel}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Site Name
                    </label>
                    <input
                      name="siteName"
                      defaultValue={settings.siteName}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Footer Top Label
                    </label>
                    <input
                      name="footerTopLabel"
                      defaultValue={settings.footerTopLabel}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Footer Name
                    </label>
                    <input
                      name="footerName"
                      defaultValue={settings.footerName}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm text-white/65">
                    Footer Subtitle
                  </label>
                  <input
                    name="footerSubtitle"
                    defaultValue={settings.footerSubtitle}
                    className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                  />
                </div>

                <div className="grid gap-5">
                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Hero Badge
                    </label>
                    <input
                      name="heroBadge"
                      defaultValue={settings.heroBadge}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Hero Title
                    </label>
                    <input
                      name="heroTitle"
                      defaultValue={settings.heroTitle}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Hero Description
                    </label>
                    <textarea
                      name="heroDescription"
                      defaultValue={settings.heroDescription}
                      rows={4}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Marquee Text
                    </label>
                    <input
                      name="marqueeText"
                      defaultValue={settings.marqueeText}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Homepage Featured Title
                    </label>
                    <input
                      name="homepageFeaturedTitle"
                      defaultValue={settings.homepageFeaturedTitle}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      WhatsApp Number
                    </label>
                    <input
                      name="whatsappNumber"
                      defaultValue={settings.whatsappNumber}
                      placeholder="60123456789"
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Default Interest Rate
                    </label>
                    <input
                      name="defaultInterestRate"
                      type="number"
                      step="0.1"
                      defaultValue={settings.defaultInterestRate}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Contact Email
                    </label>
                    <input
                      name="contactEmail"
                      defaultValue={settings.contactEmail}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm text-white/65">
                      Contact Location
                    </label>
                    <input
                      name="contactLocation"
                      defaultValue={settings.contactLocation}
                      className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-3xl border border-white/10 bg-black/20 p-4">
                  <p className="text-sm font-medium text-white">
                    Homepage Featured Cars
                  </p>
                  <p className="mt-1 text-sm text-white/45">
                    Tick kereta yang anda mahu paparkan di homepage
                  </p>

                  <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                    {cars.map((car) => (
                      <label
                        key={car.id}
                        className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/80"
                      >
                        <input
                          type="checkbox"
                          name="featuredCarSlugs"
                          value={car.slug}
                          defaultChecked={settings.featuredCarSlugs.includes(car.slug)}
                          className="h-4 w-4"
                        />
                        <span className="truncate">{car.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    type="submit"
                    className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:opacity-90"
                  >
                    Save Settings
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}