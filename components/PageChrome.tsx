"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { kost } from "@/lib/kost-data";

function pageKey(pathname: string) {
  const first = pathname.split("/")[1];
  return first ? first : "beranda";
}

export default function PageChrome() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const blobLeftRef = useRef<HTMLDivElement>(null);
  const blobRightRef = useRef<HTMLDivElement>(null);
  const [showTop, setShowTop] = useState(false);

  // Tandai halaman aktif supaya warna halaman berganti
  useEffect(() => {
    document.documentElement.dataset.page = pageKey(pathname);
  }, [pathname]);

  // Bar kemajuan, titik di tepi kanan, dan cahaya di tepi
  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    let ticking = false;

    function update() {
      ticking = false;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;

      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      if (dotRef.current) dotRef.current.style.top = `${p * 100}%`;
      if (!reduce) {
        if (blobLeftRef.current) {
          blobLeftRef.current.style.transform = `translateY(${y * 0.08}px)`;
        }
        if (blobRightRef.current) {
          blobRightRef.current.style.transform = `translateY(${-y * 0.06}px)`;
        }
      }
      setShowTop(y > 600);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <>
      {/* Bar kemajuan di paling atas */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-1"
      >
        <div
          ref={barRef}
          className="h-full origin-left"
          style={{ background: "var(--pg)", transform: "scaleX(0)" }}
        />
      </div>

      {/* Cahaya berwarna di tepi (layar lebar) */}
      <div
        ref={blobLeftRef}
        aria-hidden="true"
        className="pointer-events-none fixed -left-20 top-[28%] z-30 hidden xl:block"
      >
        <div
          className="float-slow h-56 w-56 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--pg)" }}
        />
      </div>
      <div
        ref={blobRightRef}
        aria-hidden="true"
        className="pointer-events-none fixed -right-20 top-[52%] z-30 hidden xl:block"
      >
        <div
          className="float-slower h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--pg)" }}
        />
      </div>

      {/* Tulisan vertikal di tepi kiri */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-3 top-1/2 z-30 hidden -translate-y-1/2 xl:block"
      >
        <p
          className="text-[11px] font-semibold uppercase tracking-[0.35em] text-muted"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {kost.name} &middot; {kost.area}, {kost.city}
        </p>
      </div>

      {/* Garis dan titik kemajuan di tepi kanan */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed right-4 top-1/2 z-30 hidden h-48 w-px -translate-y-1/2 bg-foreground/15 xl:block"
      >
        <div
          ref={dotRef}
          className="absolute -left-[5px] h-[11px] w-[11px] -translate-y-1/2 rounded-full"
          style={{ background: "var(--pg)", top: "0%" }}
        />
      </div>

      {/* Tombol kembali ke atas */}
      <button
        type="button"
        aria-label="Kembali ke atas"
        tabIndex={showTop ? 0 : -1}
        onClick={() => window.scrollTo({ top: 0 })}
        className={`fixed bottom-5 left-5 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-foreground/20 bg-white/90 text-foreground shadow-lg backdrop-blur transition-opacity ${
          showTop ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 19V5M5 12l7-7 7 7" />
        </svg>
      </button>
    </>
  );
}