"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { gallery, galleryCategories } from "@/lib/kost-data";

export default function Gallery() {
  const [filter, setFilter] = useState<string>("Semua");
  const [activeId, setActiveId] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const filters = ["Semua", ...galleryCategories];
  const items =
    filter === "Semua" ? gallery : gallery.filter((g) => g.category === filter);
  const active = gallery.find((g) => g.id === activeId) ?? null;

  function openItem(id: string) {
    setActiveId(id);
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-14 md:py-20">
      <div
        role="radiogroup"
        aria-label="Filter galeri"
        className="flex flex-wrap gap-3"
      >
        {filters.map((f) => {
          const isActive = f === filter;
          return (
            <button
              key={f}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setFilter(f)}
              className={`inline-flex min-h-[44px] items-center rounded-full border px-5 text-sm font-semibold ${
                isActive
                  ? "border-accent bg-accent text-white"
                  : "border-foreground/30 bg-transparent text-foreground"
              }`}
            >
              {f}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => openItem(item.id)}
            aria-label={`Lihat ${item.caption}`}
            className="card card-lift relative aspect-[4/3] overflow-hidden text-left"
          >
            {item.src ? (
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover"
              />
            ) : (
              <span className="linen flex h-full w-full flex-col items-center justify-center p-3 text-center">
                <span className="text-sm text-muted">Foto segera hadir</span>
                <span className="mt-1 font-serif text-lg text-foreground">
                  {item.caption}
                </span>
              </span>
            )}
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => setActiveId(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) closeDialog();
        }}
        aria-label="Tampilan foto"
        className="m-auto w-[92vw] max-w-3xl rounded-2xl p-0 backdrop:bg-black/60"
      >
        {active && (
          <div className="p-4">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl">
              {active.src ? (
                <Image
                  src={active.src}
                  alt={active.caption}
                  fill
                  sizes="92vw"
                  className="object-cover"
                />
              ) : (
                <div className="linen flex h-full w-full items-center justify-center text-muted">
                  Foto segera hadir
                </div>
              )}
            </div>
            <div className="mt-4 flex items-center justify-between gap-4">
              <p className="font-serif text-xl text-foreground">
                {active.caption}
              </p>
              <button
                type="button"
                onClick={closeDialog}
                className="btn btn-primary"
              >
                Tutup
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}