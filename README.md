# Diverko 2.0

Modernised Diverko marketing site built with the Next.js App Router, Tailwind CSS, and a fully localised Sanity CMS backend.

## Local development

```bash
npm install
npm run dev
```

The Sanity Studio is colocated under `app/(studio)` – start it with:

```bash
npm run studio
```

This project uses the Next.js i18n router (`en`, `nl`, `fr`). Every route is available at `/[locale]/…` and the locale is synced with the `LanguageSwitcher` component.

## Environment

Create `.env.local` from `.env.local.example` and provide the following keys:

| Key | Description |
| --- | --- |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name |
| `SANITY_API_VERSION` | (optional) API version |
| `SANITY_READ_TOKEN` | Token for preview mode |
| `SANITY_PREVIEW_SECRET` | Secret string used by `/api/preview` |

## Content model & editorial workflow

All copy, media, and navigation is stored in Sanity. Editors can follow these steps:

1. **Site settings** – update email, phone, address, description, and social links in *Site Settings*.
2. **Navigation menu** – manage primary and dropdown links under *Navigation Menu*. Labels are localised (`localeString` fields).
3. **Hero sections** – create hero documents with background images (hotspot-enabled) and CTA references.
4. **Missions** – each mission includes translations, categories (`missions`, `consultancy`, `training`), and an image.
5. **Home page** – reference the hero, pick featured missions, add contact copy, partner logos, and featured testimonials.
6. **General pages** – used for About, Contact, Missions, Training, Consultancy, and Motorcycles; optional extras include tags, stats, team members, benefits, program sections, and testimonial references.
7. **Legal pages** – create a general page and set `pageCategory` to `legal` to have it appear automatically in the footer.
8. **Testimonials & Team** – standalone documents referenced by pages and the home testimonial slider.

Required fields now include validation rules inside the schema, ensuring editorial mistakes are caught before publishing.

### Media management

All hero, mission, and testimonial images live in Sanity image fields with hotspots enabled. Upload assets through Studio and reuse them anywhere; `urlFor` automatically generates optimised URLs via the Sanity CDN. Local fallbacks remain only as a safety net.

## Preview mode

Enable previewing unpublished content by hitting:

```
/api/preview?secret=YOUR_SECRET&redirect=/en/about
```

Exit preview with `/api/preview/exit`. The `SANITY_PREVIEW_SECRET` and `SANITY_READ_TOKEN` env vars must be configured.

## Contact form

`/api/contact` accepts `POST` requests (`name`, `email`, `message`). Replace the placeholder console log with your preferred email/CRM integration before going live.

## Testing & linting

```
npm run lint
```

## Deployment checklist

1. Populate Sanity (use `sanity/seed/*.ndjson` as a starting point).
2. Configure env variables for both Next.js and Studio.
3. Provide the preview secret/token to trusted editors.
4. Upload partner logos and mission imagery via Studio so the homepage tiles render from the CDN.
