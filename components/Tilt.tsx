"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";

type TiltProps = {
  children: ReactNode;
  className?: string;
  max?: number; // sudut miring maksimum (derajat)
};

export default function Tilt({ children, className = "", max = 8 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: PointerEvent<HTMLDivElement>) {
    // Hanya untuk mouse, supaya gulir di HP tidak terganggu
    if (e.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(
      2
    )}deg) rotateY(${(px * max).toFixed(2)}deg) translateY(-6px)`;
  }

  function reset() {
    if (ref.current) ref.current.style.transform = "";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={`tilt ${className}`}
    >
      {children}
    </div>
  );
}