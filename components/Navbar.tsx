"use client";

import Link from "next/link";
import { useState } from "react";
import { contact, kost, navLinks } from "@/lib/kost-data";

const waLink = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
  `Halo ${kost.name}, saya ingin bertanya tentang kost.`
)}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-surface bg-background/90 backdrop-blur">
        <nav
          aria-label="Menu utama"
          className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3"
        >
          <Link
            href="/"
            className="font-serif text-2xl text-foreground"
            onClick={() => setOpen(false)}
          >
            {kost.name}
          </Link>

          {/* Menu untuk layar lebar */}
          <ul className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-muted hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary btn-shimmer hidden md:inline-flex"
            >
              Chat WhatsApp
            </a>

            {/* Tombol hamburger untuk HP */}
            <button
              type="button"
              aria-label={open ? "Tutup menu" : "Buka menu"}
              aria-expanded={open}
              aria-controls="menu-hp"
              onClick={() => setOpen(!open)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-surface md:hidden"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Menu geser untuk HP */}
        {open && (
          <div id="menu-hp" className="border-t border-surface bg-background md:hidden">
            <ul className="mx-auto flex max-w-6xl flex-col px-5 py-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-[44px] items-center text-base font-medium text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Tombol WhatsApp yang selalu terlihat di HP */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="btn btn-primary fixed bottom-5 right-5 z-50 shadow-lg md:hidden"
      >
        Chat WhatsApp
      </a>
    </>
  );
}