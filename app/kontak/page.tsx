import type { Metadata } from "next";
import Link from "next/link";
import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";
import PageHero from "@/components/PageHero";
import { DATA_MASIH_CONTOH, contact, kost } from "@/lib/kost-data";

export const metadata: Metadata = {
  title: "Kontak dan Pemesanan | The Linen House",
  description:
    "Hubungi The Linen House lewat WhatsApp untuk memesan kamar atau masuk daftar tunggu.",
};

export default function KontakPage() {
  return (
    <>
<PageHero
  variant="kontak"
  eyebrow="Mari mengobrol"
  title="Kontak dan pemesanan"
  text="Isi formulir singkat, lalu lanjutkan percakapan lewat WhatsApp. Kost masih dalam pembangunan, jadi pesanan masuk sebagai daftar tunggu."
  note={
    DATA_MASIH_CONTOH
      ? "Catatan: nomor WhatsApp dan email di halaman ini masih contoh, belum tersambung ke siapa pun."
      : undefined
  }
/>
      <section className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:py-20">
        <Reveal>
          <BookingForm />
        </Reveal>

        <Reveal delay={120}>
          <div className="card p-7">
            <h2 className="text-2xl text-foreground">Hubungi langsung</h2>
            <ul className="mt-5 flex flex-col text-muted">
              <li className="flex min-h-[44px] items-center">
                WhatsApp: {contact.whatsappDisplay}
              </li>
              <li className="flex min-h-[44px] items-center">
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </li>
              <li className="flex min-h-[44px] items-center">
                {kost.area}, {kost.city}
              </li>
            </ul>
            <p className="mt-5 text-sm text-muted">
              Sebelum memesan, baca juga{" "}
              <Link href="/aturan" className="underline">
                aturan kost
              </Link>{" "}
              dan{" "}
              <Link href="/paket" className="underline">
                pilihan paket
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>
    </>
  );
}