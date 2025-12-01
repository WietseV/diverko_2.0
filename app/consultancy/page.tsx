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
  title: 'Consultancy',
  description: 'Hands-on support, team management, and strategic guidance for your sales division.',
};

export default async function ConsultancyPage() {
  const lang = await getLanguage();
  const page = await getGeneralPage('consultancy', lang);
  const missions = await getMissions(lang);
  const consultancyMissions = missions.filter((mission) => mission.categories?.includes('consultancy'));

  return (
    <div className='bg-primary_light text-primary_dark'>
      <NavBar/>
      <PageHero
        title={page?.heroTitle ?? 'Consultancy'}
        highlight={page?.heroHighlight ?? ''}
        paragraph={page?.heroParagraph ?? ''}
        backgroundImage={page?.heroImage ?? null}
      />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <PortableText value={page?.body ?? []} components={portableComponents} />
      </section>
      <MissionGrid missions={consultancyMissions} eyebrow="Consultancy" title="Support missions" />
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
