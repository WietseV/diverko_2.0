# Diverko 2.0 – Build Checklist

## Routing & Layout
- [x] Decide on router strategy (App Router vs Pages Router) and align folder structure
- [x] Port all legacy routes (`/consultancy`, `/training`, `/motorcycles`, `/cookies-policy`, `/legal-information`, `/privacy-policy`, `/general-terms-and-conditions`, error page)
- [x] Implement shared `PageHero` component for gradient/banner intros with localization support
- [x] Recreate `BikeComp`-style CTA stripe as a reusable component for multiple pages
- [x] Add `SmallBanner / SectionHeading` component for “Welcome”, “Our Missions”, “Contact us”, etc.

## Navigation, Footer & Globals
- [x] Rebuild NavBar to include dropdown submenu and responsive mobile navigation
- [x] Replace `<a>` tags with Next `Link` across navigation
- [x] Rebuild Footer with logo, legal links, language selector, and contact info sourced from Sanity
- [x] Implement SEO metadata (`metadata` exports) for every route
- [x] Fix mobile NavBar layout & interactions (spacing, dropdown behavior)

## Home Page Components
- [x] Extract `HeroSection` component (background media, eyebrow, heading, description, CTA list) sourced from CMS
- [x] Port mission overview grid (data-driven version of `MissionsComp`) that links into detail pages
- [x] Add Powered-by/partner strip component matching `poweredBy`
- [x] Insert testimonials slider (ported from `reviewGallery` + `review`)
- [x] Replace placeholder contact block with full `ContactSection`
- [x] Refine Swimlane component (full-width alignment, snap behavior, tile sizing) for consistent UX

## Service & Detail Pages
- [x] Build data-driven `MissionGrid` + `MissionDetailCard` components for `/missions`, `/consultancy`, `/training`
- [x] Implement About page sections (Dirk bio, tag chips, stats) using reusable `TeamBio` and `Tag` components
- [x] Recreate Motorcycles program layout with explanatory sections, benefits lists, and testimonials slider reuse
- [x] Add localized legal/policy pages rendering rich text content (Cookies, Legal, Privacy, GTC)

## Contact & Engagement
- [x] Implement `ContactSection` containing company info, contact links, WhatsApp/LinkedIn buttons, and CTA headline
- [x] Rebuild contact form (EmailJS or API route) with success state and validation
- [x] Ensure `BikeLink` CTA is available wherever relevant (footer, Contact section, etc.)

## Reusable Component Library
- [x] Consolidate CTA styles into a configurable `ActionButton` (primary/secondary/outline variants)
- [x] Create `ContactCard`, `PartnerStrip`, `TestimonialSlider`, `TagList`, and `LanguageSwitcher` components
- [x] Ensure components support localization strings and Sanity-driven content

## Sanity CMS Integration
- [x] Initialize Sanity Studio (v3) inside repo, configure dataset & API tokens, add `.env` vars (`SANITY_PROJECT_ID`, etc.)
- [x] Define schemas for site settings, navigation, hero sections, missions, home page, and general pages (multi-language)
- [x] Store all media assets (hero images, mission photos, testimonials) in Sanity image fields with hotspots
- [x] Install and configure `next-sanity`, `@portabletext/react`, and image helpers; create `sanity.client.ts` and GROQ query helpers
- [x] Convert hero, mission grid, general content pages, contact info, and footer to fetch data from Sanity
- [x] Implement localized routing strategy tied to Sanity content (Next i18n routes or locale-aware queries)
- [x] Add Preview Mode using Sanity drafts and secure token handling
- [x] Document editorial workflow and add schema validation rules for required copy, alt text, and translations
