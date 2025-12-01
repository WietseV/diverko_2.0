"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import type { Language } from "@/lib/language";
import { LANG_COOKIE } from "@/lib/locales";

type Props = {
  current: Language;
  className?: string;
  variant?: "inline" | "pill";
};

const LANGUAGES: Language[] = ["en", "nl", "fr"];

export default function LanguageSwitcherClient({ current, className, variant = "pill" }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const persistLocale = (lang: Language) => {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=${maxAge}`;
    document.cookie = `${LANG_COOKIE}=${lang};path=/;max-age=${maxAge}`;
  };

  const handleChange = (lang: Language) => {
    startTransition(() => {
      persistLocale(lang);
      const normalized =
        pathname && /^\/(en|nl|fr)(\/|$)/.test(pathname)
          ? pathname.replace(/^\/(en|nl|fr)/, "") || "/"
          : pathname || "/";
      const target = `/${lang}${normalized === "/" ? "" : normalized}`;
      router.push(target);
    });
  };

  const baseButton =
    "rounded-full px-3 py-1 text-xs font-semibold transition uppercase tracking-[0.2em] focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary";

  const variantStyles =
    variant === "inline"
      ? {
          base: "flex items-center gap-3 text-primary_light/70",
          button: (lang: Language) =>
            `${baseButton} ${
              lang === current ? "text-secondary" : "text-primary_light/70 hover:text-primary_light"
            } border-none`,
        }
      : {
          base: "flex gap-2",
          button: (lang: Language) =>
            `${baseButton} ${
              lang === current ? "bg-secondary text-primary_dark" : "bg-primary_light/10 text-primary_light"
            }`,
        };

  return (
    <div className={`${variantStyles.base} ${className ?? ""}`}>
      {LANGUAGES.map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => handleChange(lang)}
          disabled={isPending}
          className={variantStyles.button(lang)}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
