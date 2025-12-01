import NavBar from '@/components/navBar/page';
import Footer from '@/components/footer/page';
import PageHero from '@/components/pageHero/page';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { getGeneralPage } from '@/lib/getGeneralPage';
import { getLanguage } from '@/lib/language';
import { portableComponents } from '@/lib/portableTextComponents';
import ContactCta from '@/components/contactCta/page';
import SectionHeading from '@/components/sectionHeading/page';
import TagList from '@/components/tagList/page';
import TeamBio from '@/components/teamBio/page';

export const metadata: Metadata = {
  title: 'About',
  description: 'Discover Diverko’s story and meet the people fueling your next sales mission.',
};

export default async function About() {
  const lang = await getLanguage();
  const page = await getGeneralPage('about', lang);

  return (
    <div className='bg-primary_light text-primary_dark'>
      <NavBar/>
      <PageHero
        title={page?.heroTitle ?? 'About Diverko'}
        highlight={page?.heroHighlight ?? ''}
        paragraph={page?.heroParagraph ?? ''}
        backgroundImage={page?.heroImage ?? null}
      />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <PortableText value={page?.body ?? []} components={portableComponents} />
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-16 space-y-10">
        <SectionHeading
          align="left"
          eyebrow="Team"
          title="Meet your co-driver"
          subtitle="Experience meets motorsport pragmatism. Every engagement is handled personally."
        />
        <TagList tags={page?.tags ?? []} />
        <div className="grid gap-6">
          {page?.teamMembers?.map((member) => (
            <TeamBio key={member._id} member={member} />
          ))}
        </div>
        {page?.stats && page.stats.length > 0 && (
          <div className="grid gap-6 rounded-3xl border border-primary_dark/10 bg-primary_light p-6 md:grid-cols-3">
            {page.stats.map((stat, index) => (
              <div key={index}>
                <p className="text-sm uppercase tracking-[0.3em] text-primary_dark/60">{stat.label}</p>
                <p className="text-3xl font-semibold text-primary_dark">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </section>
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
