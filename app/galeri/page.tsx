import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import { DATA_MASIH_CONTOH } from "@/lib/kost-data";

export const metadata: Metadata = {
  title: "Galeri | The Linen House",
  description:
    "Galeri foto kamar, area bersama, dan lingkungan The Linen House, Tembalang, Semarang.",
};

export default function GaleriPage() {
  return (
    <>
      <section className="linen">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="text-4xl text-foreground md:text-5xl">Galeri</h1>
            <p className="mt-4 max-w-xl text-muted">
              Kost masih dalam pembangunan. Foto asli akan ditampilkan di sini
              setelah kamar dan area bersama selesai.
            </p>
            {DATA_MASIH_CONTOH && (
              <p className="mt-3 text-sm font-medium text-foreground">
                Catatan: kotak di bawah masih placeholder, belum foto asli.
              </p>
            )}
          </Reveal>
        </div>
      </section>
      <Gallery />
    </>
  );
}
