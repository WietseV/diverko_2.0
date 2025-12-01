import Link from "next/link";
import type { ReactNode } from "react";

type ActionButtonProps = {
  title: string;
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  icon?: ReactNode;
};

const VARIANT_STYLES: Record<NonNullable<ActionButtonProps["variant"]>, string> = {
  primary: "bg-secondary text-primary_dark hover:bg-secondary/90 border-secondary",
  secondary: "bg-transparent text-primary_light border-primary_light hover:bg-primary_light/10",
  ghost: "bg-transparent text-primary_light border-transparent hover:text-secondary",
};

export default function ActionButton({ title, href, variant = "primary", icon }: ActionButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center gap-2 rounded-full border px-6 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition ${VARIANT_STYLES[variant]}`}
    >
      {title}
      {icon}
    </Link>
  );
}
