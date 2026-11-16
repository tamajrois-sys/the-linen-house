import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { DATA_MASIH_CONTOH, facilityGroups, packages } from "@/lib/kost-data";

export const metadata: Metadata = {
  title: "Fasilitas | The Linen House",
  description:
    "Fasilitas kamar, area bersama, keamanan, dan layanan di The Linen House, Tembalang, Semarang.",
};

// Gabungan semua fasilitas kamar dari semua paket (tanpa duplikat)
const roomItems = Array.from(new Set(packages.flatMap((p) => p.roomFeatures)));

function packagesWith(item: string) {
  const names = packages
    .filter((p) => p.roomFeatures.includes(item))
    .map((p) => p.name);
  return names.length === packages.length ? "Semua paket" : names.join(", ");
}

function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="mt-0.5 shrink-0 text-accent"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12.5l2.7 2.7L16 9.8" />
    </svg>
  );
}

export default function FasilitasPage() {
  return (
    <>
      <section className="linen">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="text-4xl text-foreground md:text-5xl">Fasilitas</h1>
            <p className="mt-4 max-w-xl text-muted">
              Dari isi kamar sampai keamanan, semua tercantum jelas supaya Anda
              tahu apa yang didapat.
            </p>
            {DATA_MASIH_CONTOH && (
              <p className="mt-3 text-sm font-medium text-foreground">
                Catatan: daftar fasilitas di halaman ini masih contoh, belum
                final.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <Reveal>
          <h2 className="text-3xl text-foreground md:text-4xl">
            Di dalam kamar
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {roomItems.map((item, i) => (
            <Reveal key={item} delay={(i % 4) * 80}>
              <div className="card flex items-start gap-3 p-5">
                <CheckIcon />
                <div>
                  <p className="text-foreground">{item}</p>
                  <p className="text-sm text-muted">{packagesWith(item)}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {facilityGroups.map((group, g) => (
        <section key={group.title} className={g % 2 === 0 ? "linen" : ""}>
          <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
            <Reveal>
              <h2 className="text-3xl text-foreground md:text-4xl">
                {group.title}
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {group.items.map((item, i) => (
                <Reveal key={item} delay={(i % 4) * 80}>
                  <div className="card flex items-start gap-3 p-5">
                    <CheckIcon />
                    <p className="text-foreground">{item}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  );
}