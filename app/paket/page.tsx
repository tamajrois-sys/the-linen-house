import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import DurationPicker from "@/components/DurationPicker";
import PackageQuiz from "@/components/PackageQuiz";
import CompareTable from "@/components/CompareTable";

import {
  DATA_MASIH_CONTOH,
  contact,
  kost,
  packages,
  rules,
  type Availability,
} from "@/lib/kost-data";

export const metadata: Metadata = {
  title: "Paket Kamar | The Linen House",
  description:
    "Pilihan paket kamar, harga per bulan, dan isi paket di The Linen House, Tembalang, Semarang.",
};

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const availabilityLabel: Record<Availability, string> = {
  tersedia: "Tersedia",
  sedikit: "Tinggal sedikit",
  penuh: "Penuh",
  segera: "Segera dibuka",
};

function waLinkFor(packageName: string) {
  const text = `Halo ${kost.name}, saya tertarik dengan paket ${packageName}. Mohon info ketersediaan dan daftar tunggunya.`;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export default function PaketPage() {
  return (
    <>
<PageHero
  variant="paket"
  eyebrow="Pilih kamar"
  title="Paket kamar"
  text="Pilih paket yang paling pas dengan kebutuhan Anda. Harga dan isi paket dibuat jelas sejak awal."
  note={
    DATA_MASIH_CONTOH
      ? "Catatan: semua harga dan isi paket di halaman ini masih contoh, belum final."
      : undefined
  }
/>

      {/* Kartu paket */}
      <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
        <div className="grid gap-5 md:grid-cols-3">
          {packages.map((p, i) => (
            <Reveal key={p.id} delay={i * 120}>
              <div className="card card-lift flex h-full flex-col p-7">
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <h2 className="text-2xl text-foreground">{p.name}</h2>
                  {p.popular && (
                    <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-foreground">
                      Paling Populer
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">
                  {p.size} &middot; {p.suitableFor}
                </p>
                <p className="mt-3 inline-flex w-fit rounded-full border border-surface px-3 py-1 text-xs font-medium text-foreground">
                  {availabilityLabel[p.availability]}
                </p>
                <p className="mt-5 text-3xl text-foreground">
                  Rp{rupiah(p.pricePerMonth)}
                  <span className="text-base text-muted"> / bulan</span>
                </p>
                <p className="mt-1 text-sm text-muted">
                  Minimal sewa {p.minStayMonths} bulan
                </p>
                <p className="mt-5 text-sm font-semibold text-foreground">
                  Sudah termasuk
                </p>
                <ul className="mt-2 flex flex-1 flex-col gap-2 text-sm text-muted">
                  {p.includes.map((inc) => (
                    <li key={inc}>&bull; {inc}</li>
                  ))}
                </ul>
                <a
                  href={waLinkFor(p.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-shimmer mt-7 w-full"
                >
                  Pesan via WhatsApp
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

<DurationPicker />
<PackageQuiz />

    {/* Tabel perbandingan */}
<section className="linen">
  <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
    <Reveal>
      <p className="eyebrow">Bandingkan</p>
      <h2 className="emboss mt-2 text-3xl text-foreground md:text-5xl">
        Perbandingan paket
      </h2>
      <span className="orn" aria-hidden="true" />
    </Reveal>
    <div className="mt-8">
      <CompareTable />
    </div>
  </div>
</section>

      {/* Rincian biaya */}
      <section className="mx-auto max-w-3xl px-5 py-14 md:py-20">
        <Reveal>
          <h2 className="text-3xl text-foreground md:text-4xl">
            Rincian biaya
          </h2>
          <div className="card mt-8 p-7">
            <ul className="flex flex-col gap-4 text-muted">
              <li>
                <span className="font-semibold text-foreground">Sewa: </span>
                sesuai paket yang dipilih, dibayar per bulan.
              </li>
              <li>
                <span className="font-semibold text-foreground">Deposit: </span>
                Rp{rupiah(rules.depositRupiah)}. {rules.depositNote}.
              </li>
              <li>
                <span className="font-semibold text-foreground">
                  Sudah termasuk:{" "}
                </span>
                lihat bagian &ldquo;Sudah termasuk&rdquo; pada tiap paket di
                atas.
              </li>
            </ul>
            {DATA_MASIH_CONTOH && (
              <p className="mt-5 text-sm text-muted">
                Angka deposit dan syaratnya masih contoh.
              </p>
            )}
          </div>
        </Reveal>
      </section>
    </>
  );
}