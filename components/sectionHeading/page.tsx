type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export default function SectionHeading({ eyebrow, title, subtitle, align = "center" }: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center items-center" : "text-left items-start";
  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {eyebrow ? <p className="text-xs uppercase tracking-[0.35em] text-secondary">{eyebrow}</p> : null}
      <h2 className="text-3xl font-serif font-semibold text-primary_dark lg:text-5xl">{title}</h2>
      {subtitle ? <p className="max-w-2xl text-base text-primary_dark/80">{subtitle}</p> : null}
    </div>
  );
}
