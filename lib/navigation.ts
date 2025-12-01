import type { Language } from "./language";

export type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

const MOTORCYCLE_LABELS: Record<Language, string> = {
  en: "Motorcycles",
  nl: "Motorfietsen",
  fr: "Motos",
};

export function ensureMotorcyclesNav(items: NavItem[], lang: Language): NavItem[] {
  const label = MOTORCYCLE_LABELS[lang] ?? MOTORCYCLE_LABELS.en;

  return items.map((item) => {
    if (item.href !== "/missions") {
      return item;
    }
    const children = item.children ?? [];
    const exists = children.some((child) => child.href === "/motorcycles");
    if (exists) {
      return item;
    }
    return {
      ...item,
      children: [...children, { label, href: "/motorcycles" }],
    };
  });
}
