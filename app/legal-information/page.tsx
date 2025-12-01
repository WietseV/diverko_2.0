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
  title: 'Legal information',
  description: 'Company registration data for Diverko, a Belgian sole proprietorship (0778.964.240).',
};

export default async function LegalInformation() {
  const lang = await getLanguage();
  const page = await getGeneralPage('legal-information', lang);

  return (
    <div className='bg-primary_light text-primary_dark'>
      <NavBar/>
      <PageHero
        title={page?.heroTitle ?? 'Legal information'}
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
