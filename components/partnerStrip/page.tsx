import Image from "next/image";
import type { Image as SanityImageSource } from "sanity";
import { urlFor } from "@/lib/sanity.image";

type Partner = {
  _key: string;
  name?: string;
  logo?: SanityImageSource;
};

type PartnerStripProps = {
  partners: Partner[];
};

export default function PartnerStrip({ partners }: PartnerStripProps) {
  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section className="w-full border-y border-primary_dark/5 bg-primary_light">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-8 px-6 py-10">
        {partners.map((partner) => (
          <div key={partner._key} className="flex h-16 w-36 items-center justify-center opacity-70">
            {partner.logo ? (
              <Image
                src={urlFor(partner.logo).width(200).url()}
                alt={partner.name ?? "Partner"}
                width={160}
                height={64}
                className="h-12 w-full object-contain"
              />
            ) : (
              <span className="text-sm font-semibold uppercase tracking-[0.25em] text-primary_dark/40">
                {partner.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
