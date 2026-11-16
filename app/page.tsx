import Link from "next/link";
import Reveal from "@/components/Reveal";
import {
  DATA_MASIH_CONTOH,
  contact,
  kost,
  packages,
} from "@/lib/kost-data";

const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  `Halo ${kost.name}, saya ingin tahu kapan kost dibuka dan info paketnya.`
)}`;

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const highlights = [
  {
    title: "Paket yang jelas",
    text: "Harga, isi paket, dan biaya tercantum terang, tanpa kejutan di belakang.",
  },
  {
    title: "Lokasi di Tembalang",
    text: "Berada di kawasan kampus dan permukiman yang hidup di Semarang.",
  },
  {
    title: "Pesan lewat WhatsApp",
    text: "Tanya, survei, dan pesan kamar cukup lewat satu percakapan.",
  },
];

export default function Home() {
  return (
    <>
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, #E2E8F0 0%, #F8FAFC 60%, #F8FAFC 100%)",
        }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-25 md:h-96 md:w-96"
          style={{ background: "#C9A27E" }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-24 pt-16 md:pb-32 md:pt-28">
          <Reveal>
            <p className="inline-flex min-h-[32px] items-center rounded-full border border-sand px-4 text-sm font-medium text-foreground">
              {kost.status} &middot; {kost.area}, {kost.city}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="mt-6 max-w-3xl text-4xl text-foreground md:text-6xl">
              Pulang ke tempat yang terasa seperti rumah sendiri
            </h1>
          </Reveal>

          <Reveal delay={240}>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {kost.name} adalah hunian kost yang tenang, rapi, dan hangat di
              kawasan {kost.area}. Pilih paket yang pas, lalu hubungi kami lewat
              WhatsApp.
            </p>
          </Reveal>

          <Reveal delay={360}>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link href="/paket" className="btn btn-primary btn-shimmer">
                Lihat Paket
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Chat WhatsApp
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="mx-auto max-w-6xl px-5 py-16 md:py-24">
        <Reveal>
          <h2 className="text-3xl text-foreground md:text-4xl">
            Mengapa memilih {kost.name}
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 120}>
              <div className="card card-lift h-full p-7">
                <span
                  aria-hidden="true"
                  className="block h-1 w-10 rounded-full bg-sand"
                />
                <h3 className="mt-5 text-xl text-foreground">{item.title}</h3>
                <p className="mt-3 text-muted">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Paket unggulan */}
      <section className="linen">
        <div className="mx-auto max-w-6xl px-5 py-16 md:py-24">
          <Reveal>
            <h2 className="text-3xl text-foreground md:text-4xl">
              Pilihan paket
            </h2>
            {DATA_MASIH_CONTOH && (
              <p className="mt-3 text-sm text-muted">
                Harga dan isi paket masih contoh, belum final.
              </p>
            )}
          </Reveal>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {packages.map((p, i) => (
              <Reveal key={p.id} delay={i * 120}>
                <div className="card card-lift flex h-full flex-col p-7">
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
                  <p className="mt-5 text-3xl text-foreground">
                    Rp{rupiah(p.pricePerMonth)}
                    <span className="text-base text-muted"> / bulan</span>
                  </p>
                  <ul className="mt-5 flex flex-1 flex-col gap-2 text-sm text-muted">
                    {p.includes.map((inc) => (
                      <li key={inc}>&bull; {inc}</li>
                    ))}
                  </ul>
                  <Link
                    href="/paket"
                    className="btn btn-outline mt-7 w-full"
                  >
                    Lihat detail
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}