import MissionDetailCard, { type Mission } from "./MissionDetailCard";
import SectionHeading from "@/components/sectionHeading/page";

type MissionGridProps = {
  missions: Mission[];
  eyebrow?: string;
  title?: string;
  subtitle?: string;
};

export default function MissionGrid({ missions, eyebrow, title = "Our missions", subtitle }: MissionGridProps) {
  if (!missions || missions.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-primary_light text-primary_dark">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="left" />
        <div className="grid gap-8 md:grid-cols-2">
          {missions.map((mission) => (
            <MissionDetailCard key={mission._id} mission={mission} />
          ))}
        </div>
      </div>
    </section>
  );
}
