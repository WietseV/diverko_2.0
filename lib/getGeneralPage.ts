import { sanityClient } from "./sanity.client";
import { generalPageQuery } from "./sanity.queries";
import type { Image as SanityImageSource, PortableTextBlock } from "sanity";
import type { Language } from "./language";

export type GeneralPagePayload = {
  title?: string;
  heroTitle?: string;
  heroHighlight?: string;
  heroParagraph?: string;
  heroImage?: SanityImageSource;
  pageCategory?: string;
  body?: PortableTextBlock[];
  tags?: string[];
  stats?: { label?: string; value?: string }[];
  benefits?: { title?: string; description?: string }[];
  programSections?: { title?: string; body?: PortableTextBlock[] }[];
  testimonials?: {
    _id: string;
    name?: string;
    role?: string;
    quote?: string;
    avatar?: SanityImageSource;
  }[];
  teamMembers?: {
    _id: string;
    name?: string;
    role?: string;
    bio?: string;
    tags?: string[];
    headshot?: SanityImageSource;
  }[];
};

export async function getGeneralPage(slug: string, lang: Language) {
  try {
    return await sanityClient.fetch<GeneralPagePayload | null>(generalPageQuery, { slug, lang });
  } catch (error) {
    console.warn(`Failed to fetch page content for ${slug}`, error);
    return null;
  }
}
