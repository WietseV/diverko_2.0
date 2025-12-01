import Image from "next/image";
import type { Image as SanityImageSource } from "sanity";
import { urlFor } from "@/lib/sanity.image";
import TagList from "@/components/tagList/page";

type TeamMember = {
  _id: string;
  name?: string;
  role?: string;
  bio?: string;
  tags?: string[];
  headshot?: SanityImageSource;
};

type TeamBioProps = {
  member: TeamMember;
};

export default function TeamBio({ member }: TeamBioProps) {
  if (!member) {
    return null;
  }
  return (
    <article className="grid gap-6 rounded-3xl border border-primary_dark/10 bg-primary_light p-6 shadow-sm md:grid-cols-[240px_1fr]">
      <div className="relative h-64 w-full overflow-hidden rounded-2xl bg-primary_dark/5">
        {member.headshot ? (
          <Image
            src={urlFor(member.headshot).width(600).url()}
            alt={member.name ?? "Team member"}
            fill
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-secondary">Your co-driver</p>
          <h3 className="text-2xl font-semibold text-primary_dark">{member.name}</h3>
          <p className="text-sm uppercase tracking-[0.3em] text-primary_dark/60">{member.role}</p>
        </div>
        <p className="text-base text-primary_dark/80">{member.bio}</p>
        <TagList tags={member.tags ?? []} />
      </div>
    </article>
  );
}
