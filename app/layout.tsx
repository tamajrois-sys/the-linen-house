import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageChrome from "@/components/PageChrome";
import Fx from "@/components/Fx";
import { DATA_MASIH_CONTOH, kost, siteUrl } from "@/lib/kost-data";

// Font judul: Fraunces (nama variabel dibiarkan --font-dm-serif agar CSS tidak berubah)
const heading = Fraunces({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const title = `${kost.name} | Kost Eksklusif di ${kost.area}, ${kost.city}`;
const description = `Kost eksklusif yang hangat dan nyaman di kawasan ${kost.area}, ${kost.city}. Lihat paket, fasilitas, dan pesan lewat WhatsApp.`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: kost.name,
    locale: "id_ID",
    type: "website",
  },
  robots: DATA_MASIH_CONTOH
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${heading.variable} ${dmSans.variable}`}>
      <body>
        <PageChrome />
        <Fx />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}