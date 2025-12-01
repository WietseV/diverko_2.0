import Image from "next/image";
import type { Image as SanityImageSource } from "sanity";
import { urlFor } from "@/lib/sanity.image";

type PageHeroProps = {
  title?: string;
  highlight?: string;
  paragraph?: string;
  backgroundImage?: SanityImageSource | string | null;
};

export default function PageHero({ title, highlight, paragraph, backgroundImage }: PageHeroProps) {
  const fallbackImage = "/banner.jpg";
  const imageSrc =
    typeof backgroundImage === "string"
      ? backgroundImage
      : backgroundImage
      ? urlFor(backgroundImage).width(1600).url()
      : fallbackImage;

  return (
    <div className="w-svw h-[60vh] md:h-[75vh] text-primary_light">
      <div className="bg-primary_dark bg-opacity-60 h-full relative">
        <Image src={imageSrc} alt="Page hero background" fill className="w-svw h-svw absolute -z-10 object-cover" />
        <div className="px-8 md:w-4/5 lg:w-2/5 lg:ml-[calc(1/9*100%)] pt-40 space-y-6">
          {highlight ? <p className="text-secondary text-lg font-semibold uppercase tracking-widest">{highlight}</p> : null}
          <h1 className="font-bold text-4xl md:text-5xl">{title}</h1>
          {paragraph ? <p className="text-lg font-medium">{paragraph}</p> : null}
        </div>
      </div>
    </div>
  );
}
