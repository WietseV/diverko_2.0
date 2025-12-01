import NavBar from '@/components/navBar/page';
import Footer from '@/components/footer/page';
import PageHero from '@/components/pageHero/page';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { getGeneralPage } from '@/lib/getGeneralPage';
import { getLanguage } from '@/lib/language';
import { portableComponents } from '@/lib/portableTextComponents';
import ContactCta from '@/components/contactCta/page';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'General terms outlining Diverko collaborations, responsibilities, and dispute handling.',
};

export default async function GeneralTerms() {
  const lang = await getLanguage();
  const page = await getGeneralPage('general-terms-and-conditions', lang);

  return (
    <div className='bg-primary_light text-primary_dark'>
      <NavBar/>
      <PageHero
        title={page?.heroTitle ?? 'General Terms & Conditions'}
        highlight={page?.heroHighlight ?? ''}
        paragraph={page?.heroParagraph ?? ''}
        backgroundImage={page?.heroImage ?? null}
      />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <PortableText value={page?.body ?? []} components={portableComponents} />
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
