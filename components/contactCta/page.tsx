import ActionButton from "@/components/actionButton/page";

type ContactCtaProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
};

export default function ContactCta({ title, subtitle, ctaLabel, ctaHref }: ContactCtaProps) {
  return (
    <section className="w-full bg-gradient-to-r from-primary_dark to-secondary_dark text-primary_light">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary_light/70">{subtitle}</p>
          <h3 className="text-2xl font-semibold md:text-3xl">{title}</h3>
        </div>
        <ActionButton title={ctaLabel} href={ctaHref} variant="secondary" />
      </div>
    </section>
  );
}
