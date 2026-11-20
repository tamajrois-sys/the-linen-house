"use client";

import { useState } from "react";
import { DATA_MASIH_CONTOH, contact, kost, packages } from "@/lib/kost-data";

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const questions = [
  {
    q: "Apa kegiatan utama Anda sekarang?",
    options: [
      { label: "Kuliah", tier: 0 },
      { label: "Bekerja", tier: 1 },
      { label: "Penugasan atau pindahan dari luar kota atau luar negeri", tier: 2 },
    ],
  },
  {
    q: "Apa yang paling Anda utamakan?",
    options: [
      { label: "Harga terjangkau", tier: 0 },
      { label: "Seimbang antara harga dan kenyamanan", tier: 1 },
      { label: "Serba lengkap dan privasi", tier: 2 },
    ],
  },
  {
    q: "Seberapa sering Anda butuh laundry dan bersih-bersih kamar?",
    options: [
      { label: "Saya urus sendiri", tier: 0 },
      { label: "Kadang-kadang", tier: 1 },
      { label: "Sering, ingin dilayani", tier: 2 },
    ],
  },
];

export default function PackageQuiz() {
  const [step, setStep] = useState(0);
  const [tiers, setTiers] = useState<number[]>([]);

  const done = step >= questions.length;
  const result = done
    ? packages[
        Math.min(
          packages.length - 1,
          Math.round(tiers.reduce((a, b) => a + b, 0) / tiers.length)
        )
      ]
    : null;

  function answer(tier: number) {
    setTiers([...tiers, tier]);
    setStep(step + 1);
  }

  function reset() {
    setTiers([]);
    setStep(0);
  }

  const waLink = result
    ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
        `Halo ${kost.name}, hasil kuis menunjukkan paket ${result.name} cocok untuk saya. Mohon info ketersediaan dan daftar tunggunya.`
      )}`
    : "#";

  return (
    <section id="kuis" className="mx-auto max-w-3xl px-5 py-14 md:py-20">
      <p className="eyebrow">Kuis singkat</p>
      <h2 className="emboss mt-2 text-3xl text-foreground md:text-4xl">
        Paket mana yang cocok untuk Anda?
      </h2>
      <span className="orn" aria-hidden="true" />
      {DATA_MASIH_CONTOH && (
        <p className="mt-4 text-sm text-muted">
          Rekomendasi ini hanya panduan sederhana dari data paket contoh.
        </p>
      )}

      <div className="card-cozy mt-8 p-7 md:p-9">
        {!result ? (
          <div key={step} className="page-in">
            <p className="text-sm text-muted">
              Pertanyaan {step + 1} dari {questions.length}
            </p>
            <div className="mt-2 flex gap-2" aria-hidden="true">
              {questions.map((_, i) => (
                <span
                  key={i}
                  className={`h-2 w-8 rounded-full ${
                    i <= step ? "bg-accent" : "bg-foreground/15"
                  }`}
                />
              ))}
            </div>
            <h3 className="mt-5 text-2xl text-foreground">
              {questions[step].q}
            </h3>
            <div className="mt-6 flex flex-col gap-3">
              {questions[step].options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => answer(o.tier)}
                  className="btn btn-outline w-full justify-start text-left"
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="page-in" aria-live="polite">
            <p className="text-sm text-muted">Rekomendasi untuk Anda</p>
            <h3 className="mt-1 font-serif text-4xl text-foreground">
              {result.name}
            </h3>
            <p className="mt-1 text-sm text-muted">
              {result.size} &middot; {result.suitableFor}
            </p>
            <p className="mt-4 font-serif text-3xl text-foreground">
              Rp{rupiah(result.pricePerMonth)}
              <span className="font-sans text-base text-muted"> / bulan</span>
            </p>
            <ul className="mt-4 flex flex-col gap-1 text-sm text-muted">
              {result.includes.map((inc) => (
                <li key={inc}>&bull; {inc}</li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-shimmer"
              >
                Tanya paket ini via WhatsApp
              </a>
              <button type="button" onClick={reset} className="btn btn-outline">
                Ulangi kuis
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}