import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import Hero from "@/components/Hero";
import Reveal from "@/components/Reveal";
import Tilt from "@/components/Tilt";
import Wave from "@/components/Wave";

import {
  DATA_MASIH_CONTOH,
  contact,
  faqs,
  facilityGroups,
  gallery,
  kost,
  landmarks,
  packages,
} from "@/lib/kost-data";

const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  `Halo ${kost.name}, saya ingin tahu kapan kost dibuka dan info paketnya.`
)}`;

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const highlights = [
  {
    no: "01",
    title: "Paket yang jelas",
    text: "Harga, isi paket, dan biaya tercantum terang, tanpa kejutan di belakang.",
  },
  {
    no: "02",
    title: "Lokasi di Tembalang",
    text: "Berada di kawasan kampus dan permukiman yang hidup di Semarang.",
  },
  {
    no: "03",
    title: "Pesan lewat WhatsApp",
    text: "Tanya, survei, dan pesan kamar cukup lewat satu percakapan.",
  },
];

const photos = gallery.flatMap((g) =>
  g.src ? [{ id: g.id, caption: g.caption, src: g.src }] : []
);

function SectionTitle({
  eyebrow,
  children,
}: {
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="emboss mt-2 text-3xl text-foreground md:text-5xl">
        {children}
      </h2>
      <span className="orn" aria-hidden="true" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      {/* Keunggulan */}
      <section className="paper paper-cream">
        <div className="relative z-[1] mx-auto max-w-6xl px-5 py-20 md:py-28">
          <Reveal>
            <SectionTitle eyebrow="Keunggulan">
              Mengapa memilih {kost.name}
            </SectionTitle>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {highlights.map((item, i) => (
              <Reveal
                key={item.title}
                delay={i * 120}
                variant={i === 0 ? "left" : i === 2 ? "right" : "zoom"}
              >
                <Tilt className="h-full">
                  <div className="card-cozy h-full p-8">
                    <p className="font-serif text-5xl text-sand">{item.no}</p>
                    <h3 className="mt-4 text-2xl text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-muted">{item.text}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Paket */}
      <section className="paper paper-mist">
        <Wave color="#F4EBDD" />
        <div className="relative z-[1] mx-auto max-w-6xl px-5 pb-20 pt-28 md:pb-28 md:pt-36">
          <Reveal>
            <SectionTitle eyebrow="Paket kamar">Pilihan paket</SectionTitle>
            {DATA_MASIH_CONTOH && (
              <p className="mt-4 text-sm text-muted">
                Harga dan isi paket masih contoh, belum final.
              </p>
            )}
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 120}
                variant={i === 0 ? "left" : i === 2 ? "right" : "zoom"}
              >
                <Tilt className="h-full">
                  <div
                    className={`card-cozy flex h-full flex-col p-8 ${
                      p.popular ? "ring-2 ring-sand md:-translate-y-2" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-2xl text-foreground">{p.name}</h3>
                      {p.popular && (
                        <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-foreground">
                          Paling Populer
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {p.size} &middot; {p.suitableFor}
                    </p>
                    <p className="mt-5 font-serif text-4xl text-foreground">
                      Rp{rupiah(p.pricePerMonth)}
                      <span className="font-sans text-base text-muted">
                        {" "}
                        / bulan
                      </span>
                    </p>
                    <ul className="mt-5 flex flex-1 flex-col gap-2 text-sm text-muted">
                      {p.includes.map((inc) => (
                        <li key={inc}>&bull; {inc}</li>
                      ))}
                    </ul>
                    <Link href="/paket" className="btn btn-outline mt-7 w-full">
                      Lihat detail
                    </Link>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cuplikan galeri (muncul kalau sudah ada foto) */}
      {photos.length > 0 && (
        <section className="paper paper-cream">
          <Wave color="#DCE4ED" />
          <div className="relative z-[1] mx-auto max-w-6xl px-5 pb-20 pt-28 md:pb-28 md:pt-36">
            <Reveal>
              <SectionTitle eyebrow="Galeri">Sekilas suasananya</SectionTitle>
              <p className="mt-4 text-sm text-muted">
                Foto bersifat ilustrasi, bukan kamar yang sebenarnya.
              </p>
            </Reveal>
            <div className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-1 pb-8 pt-4">
              {photos.map((ph) => (
                <figure
                  key={ph.id}
                  className="photo-frame w-[78%] shrink-0 snap-center md:w-[32%]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={ph.src}
                      alt={ph.caption}
                      fill
                      sizes="(min-width: 768px) 32vw, 78vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption className="mt-3 text-center font-serif text-lg text-foreground">
                    {ph.caption}
                  </figcaption>
                </figure>
              ))}
            </div>
            <Link href="/galeri" className="btn btn-outline mt-4">
              Lihat semua foto
            </Link>
          </div>
        </section>
      )}

      {/* Fasilitas */}
      <section className="paper paper-mist">
        <Wave color="#F4EBDD" />
        <div className="relative z-[1] mx-auto max-w-6xl px-5 pb-20 pt-28 md:pb-28 md:pt-36">
          <Reveal>
            <SectionTitle eyebrow="Fasilitas">Fasilitas utama</SectionTitle>
            {DATA_MASIH_CONTOH && (
              <p className="mt-4 text-sm text-muted">
                Daftar fasilitas masih contoh, belum final.
              </p>
            )}
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {facilityGroups.map((group, i) => (
              <Reveal
                key={group.title}
                delay={i * 120}
                variant={i === 0 ? "left" : "right"}
              >
                <Tilt className="h-full">
                  <div className="card-cozy h-full p-8">
                    <h3 className="text-2xl text-foreground">{group.title}</h3>
                    <ul className="mt-4 flex flex-col gap-2 text-muted">
                      {group.items.map((item) => (
                        <li key={item}>&bull; {item}</li>
                      ))}
                    </ul>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/fasilitas" className="btn btn-outline mt-10">
              Lihat semua fasilitas
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Lokasi */}
      <section className="paper paper-cream">
        <Wave color="#DCE4ED" />
        <div className="relative z-[1] mx-auto max-w-6xl px-5 pb-20 pt-28 md:pb-28 md:pt-36">
          <Reveal>
            <SectionTitle eyebrow="Lokasi">Di {kost.area}, {kost.city}</SectionTitle>
            <p className="mt-4 max-w-xl text-muted">
              {kost.name} berada di {kost.area}, {kost.city}.
              {DATA_MASIH_CONTOH
                ? " Patokan dan jarak di bawah masih contoh dan akan dicek ulang lewat Google Maps."
                : ""}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {landmarks.map((l, i) => (
              <Reveal key={l.name} delay={i * 120} variant="zoom">
                <Tilt>
                  <div className="card-cozy p-6">
                    <p className="font-serif text-xl text-foreground">
                      {l.name}
                    </p>
                    <p className="mt-1 text-sm text-muted">{l.distance}</p>
                  </div>
                </Tilt>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <Link href="/lokasi" className="btn btn-outline mt-10">
              Lihat lokasi
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="paper paper-mist">
        <Wave color="#F4EBDD" />
        <div className="relative z-[1] mx-auto max-w-3xl px-5 pb-20 pt-28 md:pb-28 md:pt-36">
          <Reveal>
            <SectionTitle eyebrow="FAQ">
              Pertanyaan yang sering ditanyakan
            </SectionTitle>
          </Reveal>
          <div className="mt-10 flex flex-col gap-4">
            {faqs.map((f, i) => (
              <Reveal key={f.q} delay={i * 80}>
                <details className="card-cozy p-5">
                  <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 font-serif text-lg text-foreground">
                    {f.q}
                    <span aria-hidden="true" className="text-xl text-accent-dark">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-muted">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Ajakan bertindak */}
      <section className="paper bg-accent-dark">
        <Wave color="#DCE4ED" />
        <div className="relative z-[1] mx-auto max-w-3xl px-5 pb-24 pt-32 text-center md:pb-32 md:pt-40">
          <Reveal variant="zoom">
            <h2 className="text-3xl text-white md:text-5xl">
              Tertarik? Masuk daftar tunggu sekarang
            </h2>
            <p className="mt-4 text-white/85">
              Kost sedang dalam pembangunan. Kabari kami lewat WhatsApp untuk
              info terbaru dan pilihan paket.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-shimmer btn-raised mt-8 bg-white text-foreground"
            >
              Chat WhatsApp
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}