import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { DATA_MASIH_CONTOH, contact, kost, landmarks } from "@/lib/kost-data";

export const metadata: Metadata = {
  title: "Lokasi | The Linen House",
  description:
    "Lokasi The Linen House di kawasan Tembalang, Semarang, beserta patokan terdekat.",
};

const areaQuery = encodeURIComponent(`${kost.area}, ${kost.city}`);
const mapEmbedUrl = `https://www.google.com/maps?q=${areaQuery}&output=embed`;
const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${areaQuery}`;

const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  `Halo ${kost.name}, mohon info alamat lengkap dan titik lokasi kost.`
)}`;

export default function LokasiPage() {
  return (
    <>
<PageHero
  variant="lokasi"
  eyebrow="Temukan kami"
  title="Lokasi"
  text={`${kost.name} berada di kawasan ${kost.area}, ${kost.city}.`}
  note={
    DATA_MASIH_CONTOH
      ? `Catatan: peta di bawah hanya menunjukkan area ${kost.area}, bukan titik kost yang sebenarnya. Patokan dan jarak juga masih contoh.`
      : undefined
  }
/>

      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <Reveal>
          <div className="overflow-hidden rounded-2xl shadow-sm">
            <iframe
              title={`Peta area ${kost.area}, ${kost.city}`}
              src={mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[320px] w-full border-0 md:h-[440px]"
            />
          </div>
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary btn-shimmer mt-6"
          >
            Buka petunjuk arah di Google Maps
          </a>
        </Reveal>
      </section>

      <section className="linen">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 className="text-3xl text-foreground md:text-4xl">
              Patokan terdekat
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {landmarks.map((l, i) => (
              <Reveal key={l.name} delay={i * 120}>
                <div className="card p-6">
                  <p className="text-lg text-foreground">{l.name}</p>
                  <p className="mt-1 text-sm text-muted">{l.distance}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-14 text-center md:py-20">
        <Reveal>
          <h2 className="text-3xl text-foreground md:text-4xl">
            Cara menuju lokasi
          </h2>
          <p className="mt-4 text-muted">
            Alamat lengkap dan titik lokasi akan diberikan setelah kost siap
            dibuka. Untuk sementara, tanyakan langsung lewat WhatsApp.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline mt-8"
          >
            Tanya alamat via WhatsApp
          </a>
        </Reveal>
      </section>
    </>
  );
}