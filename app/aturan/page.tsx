import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { DATA_MASIH_CONTOH, packages, rules } from "@/lib/kost-data";

export const metadata: Metadata = {
  title: "Aturan Kost | The Linen House",
  description:
    "Aturan, deposit, dan minimal sewa di The Linen House, Tembalang, Semarang.",
};

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const ruleList = [
  { title: "Penghuni per kamar", text: rules.occupancy },
  { title: "Tamu", text: rules.guests },
  { title: "Hewan peliharaan", text: rules.pets },
  { title: "Jam malam", text: rules.curfew },
];

export default function AturanPage() {
  return (
    <>
      <section className="linen">
        <div className="mx-auto max-w-6xl px-5 py-14 md:py-20">
          <Reveal>
            <h1 className="text-4xl text-foreground md:text-5xl">
              Aturan kost
            </h1>
            <p className="mt-4 max-w-xl text-muted">
              Aturan dibuat sederhana supaya semua penghuni nyaman dan aman.
            </p>
            {DATA_MASIH_CONTOH && (
              <p className="mt-3 text-sm font-medium text-foreground">
                Catatan: semua aturan dan biaya di halaman ini masih contoh,
                belum final.
              </p>
            )}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-14 md:py-20">
        <Reveal>
          <h2 className="text-3xl text-foreground md:text-4xl">
            Aturan penghuni
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {ruleList.map((r, i) => (
            <Reveal key={r.title} delay={(i % 2) * 100}>
              <div className="card h-full p-6">
                <h3 className="text-xl text-foreground">{r.title}</h3>
                <p className="mt-2 text-muted">{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="linen">
        <div className="mx-auto max-w-4xl px-5 py-14 md:py-20">
          <Reveal>
            <h2 className="text-3xl text-foreground md:text-4xl">
              Biaya dan minimal sewa
            </h2>
            <div className="card mt-8 p-7">
              <ul className="flex flex-col gap-4 text-muted">
                <li>
                  <span className="font-semibold text-foreground">
                    Deposit:{" "}
                  </span>
                  Rp{rupiah(rules.depositRupiah)}. {rules.depositNote}.
                </li>
                {packages.map((p) => (
                  <li key={p.id}>
                    <span className="font-semibold text-foreground">
                      Minimal sewa {p.name}:{" "}
                    </span>
                    {p.minStayMonths} bulan
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}