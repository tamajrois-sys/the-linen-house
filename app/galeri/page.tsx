import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { DATA_MASIH_CONTOH } from "@/lib/kost-data";

export const metadata: Metadata = {
  title: "Galeri | The Linen House",
  description:
    "Galeri foto kamar, area bersama, dan lingkungan The Linen House, Tembalang, Semarang.",
};

export default function GaleriPage() {
  return (
    <>
      <PageHero
  variant="galeri"
  eyebrow="Sekilas suasana"
  title="Galeri"
  text="Kost masih dalam pembangunan. Foto asli akan ditampilkan di sini setelah kamar dan area bersama selesai."
  note={
    DATA_MASIH_CONTOH
      ? "Catatan: foto bersifat ilustrasi, bukan kamar yang sebenarnya."
      : undefined
  }
/>
      <Gallery />
    </>
  );
}
