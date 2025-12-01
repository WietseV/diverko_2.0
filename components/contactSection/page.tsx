import { sanityClient } from "@/lib/sanity.client";
import { siteSettingsQuery } from "@/lib/sanity.queries";
import ContactCard from "@/components/contactCard/page";
import ContactForm from "./ContactForm";
import SectionHeading from "@/components/sectionHeading/page";
import ActionButton from "@/components/actionButton/page";
import { faLinkedinIn, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type SiteSettings = {
  email?: string;
  phone?: string;
  address?: string;
  socialLinks?: { platform?: string; url?: string }[];
};

async function getSettings(lang: string) {
  return sanityClient.fetch<SiteSettings | null>(siteSettingsQuery, { lang });
}

type ContactSectionProps = {
  lang: string;
};

export default async function ContactSection({ lang }: ContactSectionProps) {
  const settings = await getSettings(lang);
  const linkedin = settings?.socialLinks?.find((link) => link.platform?.toLowerCase().includes("linkedin"));
  const whatsapp = settings?.socialLinks?.find((link) => link.platform?.toLowerCase().includes("whatsapp"));

  return (
    <section className="w-full bg-primary_dark text-primary_light">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-16 lg:flex-row">
        <div className="flex-1 space-y-6">
          <SectionHeading
            align="left"
            eyebrow="Let's connect"
            title="Contact Diverko"
            subtitle="Choose the channel that fits you best. We aim to respond within one business day."
          />
          <div className="grid gap-4">
            {settings?.email ? (
              <ContactCard
                title="Email"
                detail={settings.email}
                href={`mailto:${settings.email}`}
                icon={<FontAwesomeIcon icon={faEnvelope} />}
              />
            ) : null}
            {settings?.phone ? (
              <ContactCard
                title="Phone"
                detail={settings.phone}
                href={`tel:${settings.phone}`}
                icon={<FontAwesomeIcon icon={faPhone} />}
              />
            ) : null}
            {settings?.address ? <ContactCard title="Address" detail={settings.address} /> : null}
          </div>
          <div className="flex gap-4 pt-4">
            {linkedin ? (
              <ActionButton
                title="LinkedIn"
                href={linkedin.url ?? "#"}
                variant="ghost"
                icon={<FontAwesomeIcon icon={faLinkedinIn} />}
              />
            ) : null}
            {whatsapp ? (
              <ActionButton
                title="WhatsApp"
                href={whatsapp.url ?? "#"}
                variant="ghost"
                icon={<FontAwesomeIcon icon={faWhatsapp} />}
              />
            ) : null}
          </div>
        </div>
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
