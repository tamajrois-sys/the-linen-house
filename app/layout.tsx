import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Linen House | Kost Eksklusif di Tembalang, Semarang",
  description:
    "Kost eksklusif yang hangat dan nyaman di kawasan Tembalang, Semarang. (Deskripsi sementara, akan diperbarui.)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}