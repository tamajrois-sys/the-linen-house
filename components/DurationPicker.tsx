"use client";

import { useState } from "react";
import {
  DATA_MASIH_CONTOH,
  contact,
  durations,
  kost,
  packages,
} from "@/lib/kost-data";

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

function waLinkFor(packageName: string, label: string) {
  const text = `Halo ${kost.name}, saya tertarik paket ${packageName} dengan durasi ${label}. Mohon info ketersediaan dan daftar tunggunya.`;
  return `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export default function DurationPicker() {
  const [months, setMonths] = useState(3);
  const selected = durations.find((d) => d.months === months) ?? durations[0];

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <h2 className="text-3xl text-foreground md:text-4xl">
        Pilih durasi sewa
      </h2>
      <p className="mt-3 max-w-xl text-muted">
        Sewa lebih lama, harga per bulan lebih hemat.
      </p>
      {DATA_MASIH_CONTOH && (
        <p className="mt-2 text-sm font-medium text-foreground">
          Potongan harga di bagian ini masih contoh, belum final.
        </p>
      )}

      <div
        role="radiogroup"
        aria-label="Durasi sewa"
        className="mt-8 flex flex-wrap gap-3"
      >
        {durations.map((d) => {
          const active = d.months === months;
          return (
            <button
              key={d.months}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setMonths(d.months)}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-semibold ${
                active
                  ? "border-accent bg-accent text-white"
                  : "border-foreground/30 bg-transparent text-foreground"
              }`}
            >
              {d.label}
              {d.discountPercent > 0 && (
                <span className="ml-2 text-xs font-medium">
                  hemat {d.discountPercent}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {packages.map((p) => {
          const tooShort = months < p.minStayMonths;
          const perMonth = Math.round(
            p.pricePerMonth * (1 - selected.discountPercent / 100)
          );
          const total = perMonth * months;
          return (
            <div key={p.id} className="card flex h-full flex-col p-7">
              <h3 className="text-2xl text-foreground">{p.name}</h3>
              {tooShort ? (
                <p className="mt-5 text-muted">
                  Paket ini minimal sewa {p.minStayMonths} bulan. Pilih durasi
                  yang lebih panjang.
                </p>
              ) : (
                <>
                  <p className="mt-5 text-3xl text-foreground">
                    Rp{rupiah(perMonth)}
                    <span className="text-base text-muted"> / bulan</span>
                  </p>
                  {selected.discountPercent > 0 && (
                    <p className="mt-1 text-sm text-muted">
                      Harga normal Rp{rupiah(p.pricePerMonth)} / bulan
                    </p>
                  )}
                  <p className="mt-3 text-sm text-muted">
                    Total {months} bulan: Rp{rupiah(total)}
                  </p>
                  <a
                    href={waLinkFor(p.name, selected.label)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary mt-7 w-full"
                  >
                    Tanya via WhatsApp
                  </a>
                </>
              )}
            </div>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-muted">
        Total belum termasuk deposit.
      </p>
    </section>
  );
}