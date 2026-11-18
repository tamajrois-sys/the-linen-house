import Image from "next/image";
import Link from "next/link";
import DodgeText from "@/components/DodgeText";
import Reveal from "@/components/Reveal";
import { contact, kost } from "@/lib/kost-data";

// Kalau sudah punya foto suasana, taruh di public/hero.jpg lalu ubah null
// di bawah menjadi "/hero.jpg". Foto stok harus berlisensi komersial.
const HERO_PHOTO = null as string | null;

const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  `Halo ${kost.name}, saya ingin tahu kapan kost dibuka dan info paketnya.`
)}`;

const marqueeWords = ["Tenang", "Hangat", "Rapi", "Nyaman", "Elegan", "Aman"];

const wavePath =
  "M0 60 C 240 0, 480 120, 720 60 C 960 0, 1200 120, 1440 60 C 1680 0, 1920 120, 2160 60 C 2400 0, 2640 120, 2880 60 L2880 120 L0 120 Z";

export default function Hero() {
  return (
    <>
      <section
        className="grain relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, #E2E8F0 0%, #EDEFF2 45%, #F3EBE1 100%)",
        }}
      >
        {/* Foto samar (kalau sudah ada) */}
        {HERO_PHOTO && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={HERO_PHOTO}
              alt=""
              fill
              priority
              sizes="100vw"
              className="kenburns object-cover opacity-25"
            />
          </div>
        )}

        {/* Cahaya melayang */}
        <div
          aria-hidden="true"
          className="float-slow pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-40 blur-2xl md:h-[26rem] md:w-[26rem]"
          style={{ background: "#C9A27E" }}
        />
        <div
          aria-hidden="true"
          className="float-slower pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full opacity-30 blur-2xl md:h-96 md:w-96"
          style={{ background: "#3F6C8C" }}
        />

        <div className="relative mx-auto max-w-6xl px-5 pb-36 pt-16 md:pb-44 md:pt-28">
          <Reveal>
            <p className="inline-flex min-h-[32px] items-center rounded-full border border-sand bg-white/60 px-4 text-sm font-medium text-foreground backdrop-blur">
              {kost.status} &middot; {kost.area}, {kost.city}
            </p>
          </Reveal>

          <Reveal delay={120}>
            <h1 className="emboss mt-6 max-w-3xl text-5xl text-foreground md:text-7xl">
              <DodgeText text="Pulang ke tempat yang terasa seperti rumah sendiri" />
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
              <Link
                href="/paket"
                className="btn btn-primary btn-shimmer btn-raised"
              >
                Lihat Paket
              </Link>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline bg-white/50 backdrop-blur"
              >
                Chat WhatsApp
              </a>
            </div>
          </Reveal>
        </div>

        {/* Gelombang bergerak */}
        <div className="wave-wrap" aria-hidden="true">
          <svg
            className="wave-svg wave-back"
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
          >
            <path d={wavePath} fill="rgba(201,162,126,0.35)" />
          </svg>
          <svg
            className="wave-svg wave-front"
            viewBox="0 0 2880 120"
            preserveAspectRatio="none"
            style={{ transform: "translateY(12px)" }}
          >
            <path d={wavePath} fill="#F8FAFC" />
          </svg>
        </div>
      </section>

      {/* Pita kata yang bergeser */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((g) => (
            <div key={g} className="marquee-group">
              {marqueeWords.map((w) => (
                <span key={`${g}-${w}`}>{w} &middot;</span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}