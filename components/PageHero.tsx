import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import Reveal from "@/components/Reveal";
import HeroWaves from "@/components/HeroWaves";
import { gallery } from "@/lib/kost-data";

export type HeroVariant =
  | "paket"
  | "fasilitas"
  | "galeri"
  | "lokasi"
  | "aturan"
  | "kontak";

type PageHeroProps = {
  variant: HeroVariant;
  eyebrow: string;
  title: string;
  text: string;
  note?: string;
};

const themes: Record<
  HeroVariant,
  { pg: string; dark: string; tint: string; isDark: boolean }
> = {
  paket: { pg: "#c9774f", dark: "#8f4426", tint: "#f7e4d8", isDark: false },
  fasilitas: { pg: "#7e8f73", dark: "#4f6046", tint: "#e4ebdf", isDark: true },
  galeri: { pg: "#a9728f", dark: "#744561", tint: "#f0e3eb", isDark: false },
  lokasi: { pg: "#3e8e8a", dark: "#25625f", tint: "#dceeec", isDark: true },
  aturan: { pg: "#c79a2e", dark: "#7a5a10", tint: "#f6ecd0", isDark: false },
  kontak: { pg: "#6b78c2", dark: "#3d4a8a", tint: "#e3e7f6", isDark: true },
};

function Icon({ d }: { d: string }) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  );
}

/* ---------- Paket: kartu kunci kamar ---------- */
function KeyCards() {
  const cards = [
    { name: "Classic", rot: -14, left: "4%", top: "26%", delay: "0s" },
    { name: "Deluxe", rot: 4, left: "30%", top: "6%", delay: "-2.3s" },
    { name: "Premier", rot: 17, left: "54%", top: "30%", delay: "-4.6s" },
  ];
  return (
    <div className="absolute inset-0">
      {cards.map((c) => (
        <div
          key={c.name}
          className="keycard sway"
          style={
            {
              left: c.left,
              top: c.top,
              "--rot": `${c.rot}deg`,
              animationDelay: c.delay,
            } as CSSProperties
          }
        >
          <div className="flex items-start justify-between">
            <span className="keycard-chip" />
            <span className="text-[9px] font-semibold tracking-[0.2em] text-muted">
              THE LINEN HOUSE
            </span>
          </div>
          <p className="mt-3 font-serif text-2xl text-foreground">{c.name}</p>
          <span className="keycard-stripe" />
        </div>
      ))}
    </div>
  );
}

/* ---------- Fasilitas: ikon mengorbit rumah ---------- */
const orbitIcons = [
  "M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01",
  "M3 18V8M3 14h18v4M21 14v-2a3 3 0 0 0-3-3h-7v5M7 11h.01",
  "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z",
  "M5 16l1.5-5h11L19 16M5 16h14v3H5zM7.5 18.5h.01M16.5 18.5h.01",
  "M3 8h10a3 3 0 1 0-3-3M3 12h15a3 3 0 1 1-3 3M3 16h7",
  "M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z",
];

function Orbit() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-[300px] w-[300px]">
        <div className="absolute inset-0 rounded-full border border-dashed border-white/30" />
        <div className="absolute left-1/2 top-1/2 grid h-24 w-24 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M3 11l9-8 9 8M5 10v10h14V10M10 20v-6h4v6" />
          </svg>
        </div>
        <div className="spin-slow absolute inset-0">
          {orbitIcons.map((d, i) => {
            const a = (360 / orbitIcons.length) * i;
            return (
              <div
                key={i}
                className="absolute left-1/2 top-1/2 h-0 w-0"
                style={{ transform: `rotate(${a}deg)` }}
              >
                <div
                  className="absolute"
                  style={{
                    left: -28,
                    top: -28,
                    transform: `translateX(150px) rotate(${-a}deg)`,
                  }}
                >
                  <span className="spin-slow-rev grid h-14 w-14 place-items-center rounded-full bg-white/90 text-[#4f6046] shadow-lg">
                    <Icon d={d} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Galeri: polaroid berserakan ---------- */
function Polaroids() {
  const shots = gallery.filter((g) => g.src).slice(0, 3);
  const slots = [
    { left: "3%", top: "24%", rot: -9 },
    { left: "32%", top: "4%", rot: 5 },
    { left: "58%", top: "28%", rot: 11 },
  ];
  return (
    <div className="absolute inset-0">
      {slots.map((s, i) => {
        const shot = shots[i];
        return (
          <div
            key={i}
            className="pola sway"
            style={
              {
                left: s.left,
                top: s.top,
                "--rot": `${s.rot}deg`,
                animationDelay: `${-i * 2.3}s`,
              } as CSSProperties
            }
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#eadfe6]">
              {shot?.src ? (
                <Image
                  src={shot.src}
                  alt=""
                  fill
                  sizes="220px"
                  className="object-cover"
                />
              ) : (
                <span className="absolute inset-0 grid place-items-center text-xs text-muted">
                  Foto segera hadir
                </span>
              )}
            </div>
            <p className="mt-2 text-center font-serif text-sm text-foreground">
              {shot?.caption ?? "Segera hadir"}
            </p>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Lokasi: kontur peta dan pin ---------- */
function MapArt() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg
        viewBox="-200 -200 400 400"
        className="contour-drift absolute h-[420px] w-[420px] text-white"
        fill="none"
        stroke="currentColor"
        aria-hidden="true"
      >
        {[40, 70, 100, 130, 160, 190].map((r, i) => (
          <ellipse
            key={r}
            rx={r * 1.15}
            ry={r}
            transform={`rotate(${i * 14})`}
            strokeOpacity={0.16 + (i % 2) * 0.12}
            strokeWidth="1.5"
          />
        ))}
      </svg>
      <span className="ring" style={{ "--s": 1.1 } as CSSProperties} />
      <span
        className="ring"
        style={{ "--s": 0.8, animationDelay: "1.2s" } as CSSProperties}
      />
      <span
        className="ring"
        style={{ "--s": 0.5, animationDelay: "2.4s" } as CSSProperties}
      />
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        className="bob relative text-white drop-shadow-lg"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.6" fill="#25625f" />
      </svg>
    </div>
  );
}

/* ---------- Aturan: kertas bergaris, centang, stempel ---------- */
function RulesArt() {
  const items = [
    "Aturan tertulis jelas",
    "Biaya terbuka",
    "Tanpa kejutan",
    "Saling menghormati",
  ];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div
        className="relative w-[320px] rotate-[3deg] rounded-xl bg-white p-6 pl-12 shadow-2xl"
        style={{
          backgroundImage:
            "repeating-linear-gradient(transparent 0 31px, rgba(122,92,16,0.18) 31px 32px)",
        }}
      >
        <span className="absolute bottom-0 left-9 top-0 w-px bg-red-300/60" />
        <p className="flex h-8 items-center font-serif text-lg text-foreground">
          Aturan kost
        </p>
        <ul>
          {items.map((it, i) => (
            <li
              key={it}
              className="flex h-8 items-center gap-2 text-sm text-foreground"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7a5a10"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path
                  className="tick"
                  style={{ animationDelay: `${i * 0.5}s` }}
                  d="M4 12l5 5L20 6"
                />
              </svg>
              {it}
            </li>
          ))}
        </ul>
        <div
          className="stamp absolute -bottom-5 -right-5 rounded-full border-4 border-double bg-white/80 px-4 py-2 font-serif text-sm tracking-widest"
          style={{ color: "#8a2c1f", borderColor: "#8a2c1f" }}
        >
          JELAS
        </div>
      </div>
    </div>
  );
}

/* ---------- Kontak: gelembung chat ---------- */
function ChatArt() {
  return (
    <div className="absolute inset-0 flex flex-col justify-center gap-4 px-6">
      <div className="bubble-float w-fit max-w-[260px] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-foreground shadow-xl">
        Halo, apakah masih ada kamar?
      </div>
      <div
        className="bubble-float ml-auto w-fit max-w-[260px] rounded-2xl rounded-br-sm border border-white/30 bg-white/20 px-4 py-3 text-sm text-white shadow-xl backdrop-blur"
        style={{ animationDelay: "-1.6s" }}
      >
        Halo! Silakan pilih paketnya, kami bantu.
      </div>
      <div
        className="bubble-float w-fit max-w-[260px] rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-foreground shadow-xl"
        style={{ animationDelay: "-3.2s" }}
      >
        Boleh survei dulu?
      </div>
      <div className="ml-auto flex w-fit items-center gap-1 rounded-2xl rounded-br-sm border border-white/30 bg-white/20 px-4 py-3 backdrop-blur">
        {[0, 0.2, 0.4].map((d) => (
          <span
            key={d}
            className="dot-bounce h-2 w-2 rounded-full bg-white"
            style={{ animationDelay: `${d}s` }}
          />
        ))}
      </div>
    </div>
  );
}

const arts: Record<HeroVariant, () => ReactNode> = {
  paket: KeyCards,
  fasilitas: Orbit,
  galeri: Polaroids,
  lokasi: MapArt,
  aturan: RulesArt,
  kontak: ChatArt,
};

export default function PageHero({
  variant,
  eyebrow,
  title,
  text,
  note,
}: PageHeroProps) {
  const t = themes[variant];
  const Art = arts[variant];
  const background = t.isDark
    ? `linear-gradient(135deg, ${t.dark} 0%, #1e293b 150%)`
    : `linear-gradient(135deg, ${t.tint} 0%, #ffffff 140%)`;

  return (
    <section
      className="grain relative isolate overflow-hidden"
      style={{ background }}
    >
      <div
        aria-hidden="true"
        className="float-slow pointer-events-none absolute -right-16 -top-16 h-80 w-80 rounded-full opacity-40 blur-3xl"
        style={{ background: t.pg }}
      />
      <div
        aria-hidden="true"
        className="float-slower pointer-events-none absolute -bottom-20 -left-16 h-72 w-72 rounded-full opacity-30 blur-3xl"
        style={{ background: t.pg }}
      />

<HeroWaves />

      <div className="relative z-[1] mx-auto grid max-w-6xl items-center gap-8 px-5 pb-28 pt-14 md:min-h-[480px] md:grid-cols-2 md:pb-32 md:pt-20">
        <div>
          <Reveal>
            <p
              className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                t.isDark ? "text-white/80" : ""
              }`}
              style={t.isDark ? undefined : { color: t.dark }}
            >
              {eyebrow}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <h1
              className={`mt-3 text-4xl md:text-6xl ${
                t.isDark ? "text-white" : "text-foreground"
              }`}
              style={
                t.isDark
                  ? { textShadow: "0 2px 14px rgba(0,0,0,0.35)" }
                  : undefined
              }
            >
              {title}
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p
              className={`mt-5 max-w-md text-lg ${
                t.isDark ? "text-white/85" : "text-muted"
              }`}
            >
              {text}
            </p>
            {note && (
              <p
                className={`mt-4 inline-block max-w-md rounded-xl px-3 py-2 text-sm font-medium ${
                  t.isDark
                    ? "bg-white/15 text-white"
                    : "bg-white/70 text-foreground"
                }`}
              >
                {note}
              </p>
            )}
          </Reveal>
        </div>

        <div className="relative hidden h-[400px] md:block" aria-hidden="true">
          <Art />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-[1] leading-[0]"
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          className="block h-[40px] w-full md:h-[70px]"
        >
          <path
            d="M0 80 H1440 V30 C1200 0 960 80 720 40 C480 0 240 70 0 30 Z"
            fill="#F8FAFC"
          />
        </svg>
      </div>
    </section>
  );
}