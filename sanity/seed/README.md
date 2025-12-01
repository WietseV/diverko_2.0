## Seeding Diverko Sanity content

1. Make sure `.env.local` contains:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_STUDIO_PROJECT_ID=yourProjectId
SANITY_STUDIO_DATASET=production
SANITY_API_VERSION=2024-05-01
```

2. Create (or reset) the dataset:

```bash
npm run sanity dataset create production
```

3. Import the documents. Use `initial-data.ndjson` for a minimal English-only setup, or `full-content.ndjson` for fully localized (EN/NL/FR) content:

```bash
SANITY_STUDIO_DATASET=production npx sanity dataset import sanity/seed/full-content.ndjson production --replace
```

4. Start the Studio to verify the content:

```bash
npm run sanity
```

After importing, all languages (EN/NL/FR) will be available on every page, and the footer language selector toggles the site content.
