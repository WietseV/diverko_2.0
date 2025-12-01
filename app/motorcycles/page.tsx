import NavBar from '@/components/navBar/page';
import Footer from '@/components/footer/page';
import PageHero from '@/components/pageHero/page';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { getGeneralPage } from '@/lib/getGeneralPage';
import { getLanguage } from '@/lib/language';
import { portableComponents } from '@/lib/portableTextComponents';
import SectionHeading from '@/components/sectionHeading/page';
import TestimonialSlider from '@/components/testimonialSlider/page';
import ContactCta from '@/components/contactCta/page';

export const metadata: Metadata = {
  title: 'Motorcycles',
  description: 'Technical sessions for riders who want to work on their machines with expert guidance.',
};

export default async function MotorcyclesPage() {
  const lang = await getLanguage();
  const page = await getGeneralPage('motorcycles', lang);

  return (
    <div className='bg-primary_light text-primary_dark'>
      <NavBar/>
      <PageHero
        title={page?.heroTitle ?? 'Motorcycles'}
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
          eyebrow="Program"
          title="What you get"
          subtitle="From diagnostics to riding posture, every session is designed to transfer garage knowledge."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {page?.benefits?.map((benefit, index) => (
            <div key={index} className="rounded-3xl border border-primary_dark/10 bg-primary_light p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-secondary">Benefit</p>
              <h3 className="text-xl font-semibold text-primary_dark">{benefit.title}</h3>
              <p className="text-primary_dark/70">{benefit.description}</p>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {page?.programSections?.map((section, index) => (
            <div key={index} className="rounded-3xl border border-primary_dark/5 bg-white p-6">
              <h4 className="text-lg font-semibold text-primary_dark">{section.title}</h4>
              <PortableText value={section.body ?? []} components={portableComponents} />
            </div>
          ))}
        </div>
      </section>
      <TestimonialSlider testimonials={page?.testimonials ?? []} />
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
