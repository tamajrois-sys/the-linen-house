"use client";

import { useState } from "react";
import {
  DATA_MASIH_CONTOH,
  contact,
  kost,
  packages,
  type Availability,
} from "@/lib/kost-data";

type Pkg = (typeof packages)[number];

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

function Ico({ d }: { d: string }) {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d={d} />
    </svg>
  );
}

function Mark({ on }: { on: boolean }) {
  if (on) {
    return (
      <span className="cmp-yes">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
        <span className="sr-only">Ada</span>
      </span>
    );
  }
  return (
    <span className="cmp-no">
      <span aria-hidden="true">&ndash;</span>
      <span className="sr-only">Tidak ada</span>
    </span>
  );
}

const specs: { label: string; icon: string; get: (p: Pkg) => string }[] = [
  {
    label: "Ukuran kamar",
    icon: "M4 4h16v16H4z M4 9h5 M9 4v5",
    get: (p) => p.size,
  },
  {
    label: "Jumlah kamar",
    icon: "M3 11l9-8 9 8M5 10v10h14V10",
    get: (p) => String(p.rooms),
  },
  {
    label: "Minimal sewa",
    icon: "M7 3v4M17 3v4M4 8h16v12H4z",
    get: (p) => `${p.minStayMonths} bulan`,
  },
  {
    label: "Cocok untuk",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0",
    get: (p) => p.suitableFor,
  },
];

const roomFeatures = Array.from(
  new Set(packages.flatMap((p) => p.roomFeatures))
);

export default function CompareTable() {
  const [focus, setFocus] = useState<string>(
    (packages.find((p) => p.popular) ?? packages[0]).id
  );
  const cols = packages.length + 1;
  const cell = (id: string) => `cmp-cell ${focus === id ? "is-focus" : ""}`;

  return (
    <div>
      <p className="mb-3 text-sm text-muted">
        Klik nama paket untuk menyorot kolomnya.
        <span className="md:hidden"> Geser tabel ke samping untuk melihat semua paket.</span>
      </p>
      {DATA_MASIH_CONTOH && (
        <p className="mb-3 text-sm font-medium text-foreground">
          Harga dan isi paket di tabel ini masih contoh, belum final.
        </p>
      )}

      <div className="cmp-wrap">
        <table className="cmp">
          <caption className="sr-only">
            Perbandingan paket kamar {kost.name}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="cmp-corner">
                <span className="cmp-corner-text">Paket</span>
              </th>
              {packages.map((p) => {
                const active = focus === p.id;
                return (
                  <th
                    key={p.id}
                    scope="col"
                    className={`cmp-head ${active ? "is-focus" : ""}`}
                  >
                    {p.popular && (
                      <span className="cmp-ribbon">Paling Populer</span>
                    )}
                    <button
                      type="button"
                      onClick={() => setFocus(p.id)}
                      aria-pressed={active}
                      className="cmp-pick"
                    >
                      <span className="font-serif text-2xl text-foreground">
                        {p.name}
                      </span>
                      <span className="cmp-pill">
                        {availabilityLabel[p.availability]}
                      </span>
                      <span className="cmp-price">
                        Rp{rupiah(p.pricePerMonth)}
                        <small> / bulan</small>
                      </span>
                    </button>
                    <a
                      href={waLinkFor(p.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary mt-4 w-full"
                    >
                      Pesan paket
                    </a>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {specs.map((s) => (
              <tr key={s.label}>
                <th scope="row" className="cmp-rowhead">
                  <span className="cmp-rowlabel">
                    <Ico d={s.icon} />
                    {s.label}
                  </span>
                </th>
                {packages.map((p) => (
                  <td key={p.id} className={cell(p.id)}>
                    {s.get(p)}
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <th colSpan={cols} className="cmp-group">
                Di dalam kamar
              </th>
            </tr>
            {roomFeatures.map((f) => (
              <tr key={f}>
                <th scope="row" className="cmp-rowhead">
                  <span className="cmp-rowlabel">{f}</span>
                </th>
                {packages.map((p) => (
                  <td key={p.id} className={`${cell(p.id)} text-center`}>
                    <Mark on={p.roomFeatures.includes(f)} />
                  </td>
                ))}
              </tr>
            ))}

            <tr>
              <th colSpan={cols} className="cmp-group">
                Sudah termasuk
              </th>
            </tr>
            <tr>
              <th scope="row" className="cmp-rowhead">
                <span className="cmp-rowlabel">Isi paket</span>
              </th>
              {packages.map((p) => (
                <td key={p.id} className={`${cell(p.id)} align-top`}>
                  <ul className="flex flex-col gap-2">
                    {p.includes.map((inc) => (
                      <li key={inc} className="cmp-inc">
                        <Mark on />
                        <span>{inc}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}