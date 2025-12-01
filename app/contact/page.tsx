import NavBar from '@/components/navBar/page';
import Footer from '@/components/footer/page';
import PageHero from '@/components/pageHero/page';
import { PortableText } from '@portabletext/react';
import type { Metadata } from 'next';
import { getGeneralPage } from '@/lib/getGeneralPage';
import { getLanguage } from '@/lib/language';
import { portableComponents } from '@/lib/portableTextComponents';
import ContactSection from '@/components/contactSection/page';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Email, WhatsApp, or connect on LinkedIn to kickstart your collaboration with Diverko.',
};

export default async function ContactPage() {
  const lang = await getLanguage();
  const page = await getGeneralPage('contact', lang);

  return (
    <div className='bg-primary_light text-primary_dark'>
      <NavBar/>
      <PageHero
        title={page?.heroTitle ?? 'Nothing beats a conversation'}
        highlight={page?.heroHighlight ?? ''}
        paragraph={page?.heroParagraph ?? ''}
        backgroundImage={page?.heroImage ?? null}
      />
      <section className="max-w-4xl mx-auto px-6 py-16 space-y-6">
        <PortableText value={page?.body ?? []} components={portableComponents} />
      </section>
      <ContactSection lang={lang} />
      <Footer/>
    </div>
  );
}
