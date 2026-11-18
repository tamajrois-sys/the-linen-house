"use client";

import { useEffect, useRef } from "react";

type DodgeTextProps = {
  text: string;
  className?: string;
};

export default function DodgeText({ text, className = "" }: DodgeTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const letters = Array.from(root.querySelectorAll<HTMLElement>("[data-l]"));
    const radius = 120;
    const push = 40;

    function reset() {
      for (const el of letters) el.style.transform = "";
    }

    function onMove(e: PointerEvent) {
      for (const el of letters) {
        const r = el.getBoundingClientRect();
        const dx = r.left + r.width / 2 - e.clientX;
        const dy = r.top + r.height / 2 - e.clientY;
        const d = Math.hypot(dx, dy);
        if (d < radius && d > 0) {
          const f = (radius - d) / radius;
          el.style.transform = `translate(${(dx / d) * f * push}px, ${
            (dy / d) * f * push
          }px)`;
        } else {
          el.style.transform = "";
        }
      }
    }

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", reset);
    window.addEventListener("pointercancel", reset);
    document.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", reset);
      window.removeEventListener("pointercancel", reset);
      document.removeEventListener("pointerleave", reset);
    };
  }, []);

  const words = text.split(" ");

  return (
    <span ref={ref} className={className} aria-label={text}>
      {words.map((word, wi) => (
        <span key={wi} aria-hidden="true" className="inline-block whitespace-nowrap">
          {word.split("").map((ch, ci) => (
            <span key={ci} data-l className="dodge-letter">
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}