import { sanityClient } from "@/lib/sanity.client";
import { navigationQuery } from "@/lib/sanity.queries";
import NavBarClient from "./NavBarClient";
import { getLanguage } from "@/lib/language";
import { ensureMotorcyclesNav, type NavItem } from "@/lib/navigation";

async function getNavItems(lang: string): Promise<NavItem[]> {
  const data = await sanityClient.fetch<{ items?: NavItem[] } | null>(navigationQuery, { lang });
  return data?.items ?? [];
}

export default async function NavBar() {
  const lang = await getLanguage();
  const items = ensureMotorcyclesNav(await getNavItems(lang), lang);
  return <NavBarClient items={items} currentLang={lang} />;
}
