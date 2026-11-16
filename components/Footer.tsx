import Link from "next/link";
import { contact, kost, navLinks } from "@/lib/kost-data";

export default function Footer() {
  return (
    <footer className="linen mt-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-24 pt-14 md:grid-cols-3 md:pb-14">
        <div>
          <p className="font-serif text-2xl text-foreground">{kost.name}</p>
          <p className="mt-3 max-w-xs text-sm text-muted">{kost.tagline}</p>
          <p className="mt-3 text-sm text-muted">
            {kost.area}, {kost.city}
          </p>
        </div>

        <nav aria-label="Menu footer">
          <p className="text-sm font-semibold text-foreground">Menu</p>
          <ul className="mt-3 flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-[44px] items-center text-sm text-muted"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-foreground">Hubungi kami</p>
          <ul className="mt-3 flex flex-col text-sm text-muted">
            <li className="flex min-h-[44px] items-center">
              WhatsApp: {contact.whatsappDisplay}
            </li>
            <li className="flex min-h-[44px] items-center">
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-foreground/10 px-5 py-5 text-center text-xs text-muted">
        &copy; {kost.name}. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}