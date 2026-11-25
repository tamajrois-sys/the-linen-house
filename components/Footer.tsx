import Link from "next/link";
import {
  DATA_MASIH_CONTOH,
  contact,
  kost,
  navLinks,
  rules,
} from "@/lib/kost-data";

const rupiah = (n: number) => new Intl.NumberFormat("id-ID").format(n);

const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  `Halo ${kost.name}, saya ingin bertanya tentang kost.`
)}`;

const steps = [
  {
    no: "1",
    title: "Pilih paket",
    text: "Bandingkan harga dan isi paket.",
    href: "/paket",
    external: false,
  },
  {
    no: "2",
    title: "Isi formulir",
    text: "Nama, paket, tanggal masuk, dan durasi.",
    href: "/kontak",
    external: false,
  },
  {
    no: "3",
    title: "Lanjut di WhatsApp",
    text: "Pesan sudah terisi otomatis, tinggal kirim.",
    href: waLink,
    external: true,
  },
];

const quick = [
  {
    label: "Deposit",
    value: `Rp${rupiah(rules.depositRupiah)}`,
    note: rules.depositNote,
  },
  { label: "Tamu", value: rules.guests, note: "" },
  { label: "Hewan peliharaan", value: rules.pets, note: "" },
  { label: "Jam malam", value: rules.curfew, note: "" },
];

export default function Footer() {
  return (
    <footer className="foot linen relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-16 md:pb-14">
        {/* Kepala */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="foot-chip">
              <span aria-hidden="true" className="foot-diamond" />
              {kost.status} &middot; {kost.area}, {kost.city}
            </p>
            <p className="foot-wordmark mt-4">{kost.name}</p>
            <p className="mt-3 max-w-md text-muted">{kost.tagline}</p>
          </div>
          <div className="foot-sticker" aria-hidden="true">
            Halo, calon tetangga baru!
          </div>
        </div>

        {/* Cara memesan */}
        <div className="mt-14">
          <p className="foot-title">Cara memesan</p>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {steps.map((s) => {
              const inner = (
                <>
                  <span className="foot-no">{s.no}</span>
                  <span>
                    <span className="block font-serif text-xl text-foreground">
                      {s.title}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {s.text}
                    </span>
                  </span>
                </>
              );
              return (
                <li key={s.no}>
                  {s.external ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="foot-card foot-step"
                    >
                      {inner}
                    </a>
                  ) : (
                    <Link href={s.href} className="foot-card foot-step">
                      {inner}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Menu, info singkat, kontak */}
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          <nav aria-label="Menu footer">
            <p className="foot-title">Menu</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="foot-pill">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="foot-title">Info singkat</p>
            <dl className="mt-5 flex flex-col gap-3">
              {quick.map((q) => (
                <div key={q.label} className="foot-card px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                    {q.label}
                  </dt>
                  <dd className="mt-1 text-foreground">
                    {q.value}
                    {q.note ? (
                      <span className="block text-sm text-muted">{q.note}</span>
                    ) : null}
                  </dd>
                </div>
              ))}
            </dl>
            <Link href="/aturan" className="foot-link mt-4">
              Baca aturan lengkap &rarr;
            </Link>
          </div>

          <div>
            <p className="foot-title">Ada pertanyaan?</p>
            <p className="mt-5 text-muted">
              Tanya saja, kami senang ngobrol soal kamar yang cocok untuk Anda.
            </p>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-shimmer btn-raised mt-5 w-full sm:w-auto"
            >
              Chat WhatsApp
            </a>
            <ul className="mt-5 flex flex-col text-foreground">
              <li className="flex min-h-[44px] items-center">
                WhatsApp: {contact.whatsappDisplay}
              </li>
              <li className="flex min-h-[44px] items-center">
                <a href={`mailto:${contact.email}`} className="foot-link">
                  {contact.email}
                </a>
              </li>
              <li className="flex min-h-[44px] items-center">
                {kost.area}, {kost.city}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-foreground/15 px-5 py-5 text-center text-xs text-muted">
        &copy; {kost.name}. Seluruh hak cipta dilindungi.
        {DATA_MASIH_CONTOH
          ? " Harga, aturan, dan kontak di website ini masih contoh."
          : ""}
      </div>
    </footer>
  );
}