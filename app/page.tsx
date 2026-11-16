import Link from "next/link";
import Reveal from "@/components/Reveal";
import { contact, kost } from "@/lib/kost-data";

const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  `Halo ${kost.name}, saya ingin tahu kapan kost dibuka dan info paketnya.`
)}`;

export default function Home() {
  return (
    <section
      className="relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #E2E8F0 0%, #F8FAFC 60%, #F8FAFC 100%)",
      }}
    >
      {/* Lingkaran dekoratif lembut */}
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
  );
}