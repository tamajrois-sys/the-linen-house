"use client";

import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import { contact, durations, kost, packages } from "@/lib/kost-data";

const fieldClass =
  "mt-2 block min-h-[44px] w-full rounded-xl border border-foreground/30 bg-white px-4 text-foreground";

export default function BookingForm() {
  const [name, setName] = useState("");
  const [packageId, setPackageId] = useState(packages[0].id);
  const [startDate, setStartDate] = useState("");
  const [months, setMonths] = useState(String(durations[0].months));
  const [error, setError] = useState("");

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();

    if (name.trim().length < 2) {
      setError("Mohon isi nama Anda.");
      return;
    }
    setError("");

    const pkg = packages.find((p) => p.id === packageId) ?? packages[0];
    const dur =
      durations.find((d) => String(d.months) === months) ?? durations[0];

    const lines = [
      `Halo ${kost.name}, saya ingin memesan atau masuk daftar tunggu.`,
      `Nama: ${name.trim()}`,
      `Paket: ${pkg.name}`,
      `Tanggal masuk: ${startDate || "belum ditentukan"}`,
      `Durasi: ${dur.label}`,
    ];
    const url = `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
      lines.join("\n")
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={handleSubmit} className="card p-7" noValidate>
      <label className="block text-sm font-semibold text-foreground">
        Nama
        <input
          type="text"
          name="nama"
          autoComplete="name"
          value={name}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className={fieldClass}
          aria-describedby={error ? "form-error" : undefined}
        />
      </label>

      <label className="mt-5 block text-sm font-semibold text-foreground">
        Paket
        <select
          name="paket"
          value={packageId}
          onChange={(e) => setPackageId(e.target.value)}
          className={fieldClass}
        >
          {packages.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-5 block text-sm font-semibold text-foreground">
        Rencana tanggal masuk
        <input
          type="date"
          name="tanggal"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className={fieldClass}
        />
      </label>

      <label className="mt-5 block text-sm font-semibold text-foreground">
        Durasi sewa
        <select
          name="durasi"
          value={months}
          onChange={(e) => setMonths(e.target.value)}
          className={fieldClass}
        >
          {durations.map((d) => (
            <option key={d.months} value={String(d.months)}>
              {d.label}
            </option>
          ))}
        </select>
      </label>

      {error && (
        <p id="form-error" role="alert" className="mt-4 text-sm text-foreground">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary btn-shimmer mt-7 w-full"
      >
        Kirim lewat WhatsApp
      </button>
      <p className="mt-3 text-xs text-muted">
        Data hanya dipakai untuk menyusun pesan WhatsApp dan tidak disimpan di
        website ini.
      </p>
    </form>
  );
}