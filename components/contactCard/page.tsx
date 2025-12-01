import Link from "next/link";
import type { ReactNode } from "react";

type ContactCardProps = {
  title: string;
  detail: string;
  href?: string;
  icon?: ReactNode;
};

export default function ContactCard({ title, detail, href, icon }: ContactCardProps) {
  const content = (
    <div className="flex items-start gap-3 rounded-2xl border border-primary_light/10 bg-primary_dark/60 p-4 text-primary_light transition hover:border-secondary">
      {icon ? <span className="text-secondary">{icon}</span> : null}
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-primary_light/60">{title}</p>
        <p className="text-base font-semibold">{detail}</p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    );
  }

  return content;
}
