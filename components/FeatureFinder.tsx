"use client";

import { useState } from "react";
import { DATA_MASIH_CONTOH, packages } from "@/lib/kost-data";

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const allFeatures = Array.from(new Set(packages.flatMap((p) => p.roomFeatures)));

export default function FeatureFinder() {
  const [picked, setPicked] = useState<string[]>([]);

  function toggle(f: string) {
    setPicked((cur) =>
      cur.includes(f) ? cur.filter((x) => x !== f) : [...cur, f]
    );
  }

  const matches = packages.filter((p) =>
    picked.every((f) => p.roomFeatures.includes(f))
  );
  const cheapest = matches.length
    ? matches.reduce((a, b) => (b.pricePerMonth < a.pricePerMonth ? b : a))
    : null;

  return (
    <section className="mx-auto max-w-4xl px-5 py-14 md:py-20">
      <p className="eyebrow">Alat bantu</p>
      <h2 className="emboss mt-2 text-3xl text-foreground md:text-4xl">
        Cari kamar sesuai kebutuhan
      </h2>
      <span className="orn" aria-hidden="true" />
      <p className="mt-4 max-w-xl text-muted">
        Centang fasilitas yang menurut Anda wajib ada. Kami tampilkan paket yang
        memenuhi semuanya.
      </p>
      {DATA_MASIH_CONTOH && (
        <p className="mt-2 text-sm text-muted">
          Hasil mengikuti data paket contoh.
        </p>
      )}

      <div className="mt-8 flex flex-wrap gap-3">
        {allFeatures.map((f) => {
          const on = picked.includes(f);
          return (
            <button
              key={f}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => toggle(f)}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-semibold ${
                on
                  ? "border-accent bg-accent text-white"
                  : "border-foreground/30 bg-white/70 text-foreground"
              }`}
            >
              {on ? "\u2713 " : ""}
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-8" aria-live="polite">
        {picked.length === 0 ? (
          <p className="text-muted">Pilih satu atau lebih fasilitas di atas.</p>
        ) : matches.length === 0 ? (
          <p className="text-foreground">
            Belum ada paket yang memiliki semua fasilitas itu sekaligus. Coba
            kurangi satu atau dua pilihan.
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-3">
            {matches.map((p) => (
              <div
                key={p.id}
                className={`card-cozy page-in p-6 ${
                  p === cheapest ? "ring-2 ring-sand" : ""
                }`}
              >
                {p === cheapest && (
                  <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-foreground">
                    Paling hemat
                  </span>
                )}
                <h3 className="mt-3 text-2xl text-foreground">{p.name}</h3>
                <p className="mt-1 text-sm text-muted">{p.size}</p>
                <p className="mt-3 font-serif text-2xl text-foreground">
                  Rp{rupiah(p.pricePerMonth)}
                  <span className="font-sans text-sm text-muted"> / bulan</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}