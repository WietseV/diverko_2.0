import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { sanityClient } from "@/lib/sanity.client";
import { legalPagesQuery, navigationQuery, siteSettingsQuery } from "@/lib/sanity.queries";
import { getLanguage } from "@/lib/language";
import { ensureMotorcyclesNav, type NavItem } from "@/lib/navigation";
import LanguageSwitcher from "@/components/languageSwitcher/page";

type SiteSettings = {
  title?: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: { platform?: string; url?: string }[];
};

type LegalLink = {
  title: string;
  href: string;
};

async function getFooterData(lang: string) {
  const [settings, navData, legalLinks] = await Promise.all([
    sanityClient.fetch<SiteSettings | null>(siteSettingsQuery, { lang }),
    sanityClient.fetch<{ items?: NavItem[] } | null>(navigationQuery, { lang }),
    sanityClient.fetch<LegalLink[] | null>(legalPagesQuery, { lang }),
  ]);
  return {
    settings,
    navItems: navData?.items ?? [],
    legalLinks: legalLinks ?? [],
  };
}

export default async function Footer() {
  const lang = await getLanguage();
  const { settings, navItems, legalLinks } = await getFooterData(lang);
  const enhancedNav = ensureMotorcyclesNav(navItems, lang);
  const flattenedNav = enhancedNav.flatMap((item) => [item, ...(item.children ?? [])]);
  const uniqueLegalLinks = Array.from(new Map(legalLinks.map((link) => [link.href, link])).values());
  const linkedin = settings?.socialLinks?.find((link) => link.platform?.toLowerCase().includes("linkedin"));

  return (
    <footer className="bg-primary_dark text-primary_light">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 md:flex-row md:justify-between">
        <div className="space-y-4 md:w-1/3">
          <p className="text-2xl font-extrabold tracking-wide">{settings?.title ?? "Diverko"}</p>
          <p className="text-sm text-primary_light/80">
            {settings?.description ?? "Sales consultancy, training, and a motorsport mindset."}
          </p>
          <LanguageSwitcher />
        </div>
        <div className="grid flex-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary_light/70">Navigate</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {flattenedNav.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-secondary" href={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-primary_light/70">Legal</h3>
            <ul className="mt-2 space-y-1 text-sm">
              {uniqueLegalLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-secondary" href={link.href}>
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="space-y-3 text-sm md:w-1/3">
          <h3 className="text-sm font-semibold uppercase tracking-widest text-primary_light/70">Contact</h3>
          {settings?.email && (
            <a href={`mailto:${settings.email}`} className="flex items-center gap-3 hover:text-secondary">
              <FontAwesomeIcon icon={faEnvelope} />
              {settings.email}
            </a>
          )}
          {settings?.phone && (
            <a href={`tel:${settings.phone}`} className="flex items-center gap-3 hover:text-secondary">
              <FontAwesomeIcon icon={faPhone} />
              {settings.phone}
            </a>
          )}
          {linkedin && (
            <a href={linkedin.url ?? "#"} target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-secondary">
              <FontAwesomeIcon icon={faLinkedinIn} />
              {linkedin.platform}
            </a>
          )}
          {settings?.address && <p className="text-primary_light/80">{settings.address}</p>}
        </div>
      </div>
      <div className="border-t border-primary_light/20 py-4 text-center text-xs text-primary_light/60">
        © {new Date().getFullYear()} {settings?.title ?? "Diverko"}. All rights reserved.
      </div>
    </footer>
  );
}
