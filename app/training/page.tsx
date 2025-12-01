import NavBar from '@/components/navBar/page';
import Footer from '@/components/footer/page';
import PageHero from '@/components/pageHero/page';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { getGeneralPage } from '@/lib/getGeneralPage';
import { getLanguage } from '@/lib/language';
import { portableComponents } from '@/lib/portableTextComponents';
import MissionGrid from '@/components/mission/MissionGrid';
import { getMissions } from '@/lib/getMissions';
import ContactCta from '@/components/contactCta/page';

export const metadata: Metadata = {
  title: 'Training',
  description: 'Interactive training options ranging from group workshops to one-on-one coaching.',
};

export default async function TrainingPage() {
  const lang = await getLanguage();
  const page = await getGeneralPage('training', lang);
  const missions = await getMissions(lang);
  const trainingMissions = missions.filter((mission) => mission.categories?.includes('training'));

  return (
    <div className='bg-primary_light text-primary_dark'>
      <NavBar/>
      <PageHero
        title={page?.heroTitle ?? 'Training'}
        highlight={page?.heroHighlight ?? ''}
        paragraph={page?.heroParagraph ?? ''}
        backgroundImage={page?.heroImage ?? null}
      />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <PortableText value={page?.body ?? []} components={portableComponents} />
      </section>
      <MissionGrid missions={trainingMissions} eyebrow="training" title="Training journeys" />
      <ContactCta
        title="Ready to plan your next mission?"
        subtitle="Contact"
        ctaLabel="Schedule a call"
        ctaHref="/contact"
      />
      <Footer/>
    </div>
  );
}
