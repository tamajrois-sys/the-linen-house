"use client";

import { useEffect } from "react";

export default function Fx() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fine = window.matchMedia("(pointer: fine)").matches;

    let px = -9999;
    let py = -9999;
    let raf = 0;

    function frame() {
      raf = 0;
      const vh = window.innerHeight;

      // Lentera kursor di latar tiap bagian
      document
        .querySelectorAll<HTMLElement>(".paper-cream, .paper-mist")
        .forEach((el) => {
          const r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          el.style.setProperty("--mx", `${px - r.left}px`);
          el.style.setProperty("--my", `${py - r.top}px`);
        });

      // Tombol magnet
      document.querySelectorAll<HTMLElement>(".btn").forEach((btn) => {
        const r = btn.getBoundingClientRect();
        if (r.width === 0) return;
        const dx = px - (r.left + r.width / 2);
        const dy = py - (r.top + r.height / 2);
        const reach = Math.max(r.width, r.height) / 2 + 60;
        const d = Math.hypot(dx, dy);
        if (d < reach) {
          const pull = 1 - d / reach;
          const tx = Math.max(-10, Math.min(10, dx * 0.35 * pull));
          const ty = Math.max(-10, Math.min(10, dy * 0.35 * pull));
          btn.style.transform = `translate(${tx}px, ${ty}px)`;
          btn.dataset.mag = "1";
        } else if (btn.dataset.mag) {
          btn.style.transform = "";
          delete btn.dataset.mag;
        }
      });
    }

    function schedule() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function onMove(e: PointerEvent) {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      schedule();
    }
    function onScroll() {
      if (px > -9000) schedule();
    }
    function onLeave() {
      px = -9999;
      py = -9999;
      schedule();
    }
    function onDown(e: PointerEvent) {
      const ring = document.createElement("span");
      ring.className = "click-ring";
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
      document.body.appendChild(ring);
      window.setTimeout(() => ring.remove(), 800);
    }

    if (fine) {
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("scroll", onScroll, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
    }
    window.addEventListener("pointerdown", onDown);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("pointerdown", onDown);
    };
  }, []);

  return null;
}