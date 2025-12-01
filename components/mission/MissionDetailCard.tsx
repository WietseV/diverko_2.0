import Link from "next/link";
import type { Image as SanityImageSource } from "sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";

export type Mission = {
  _id: string;
  title?: string;
  summary?: string;
  href?: string;
  image?: SanityImageSource;
  categories?: string[];
};

type MissionDetailCardProps = {
  mission: Mission;
};

export default function MissionDetailCard({ mission }: MissionDetailCardProps) {
  return (
    <Link
      href={mission.href ?? "#"}
      className="group flex flex-col rounded-3xl border border-primary_dark/10 bg-primary_light shadow-[0_20px_70px_-40px_rgba(7,21,63,0.9)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_-40px_rgba(7,21,63,0.7)]"
    >
      <div className="relative h-56 w-full overflow-hidden rounded-3xl">
        {mission.image ? (
          <Image src={urlFor(mission.image).width(800).url()} alt={mission.title ?? ""} fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-primary_dark/5" />
        )}
      </div>
      <div className="flex flex-1 flex-col gap-3 px-6 py-6 text-primary_dark">
        <h3 className="text-xl font-semibold">{mission.title}</h3>
        <p className="text-base text-primary_dark/70">{mission.summary}</p>
        <span className="mt-auto text-sm font-semibold text-secondary">Read more →</span>
      </div>
    </Link>
  );
}
