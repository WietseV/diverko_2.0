import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  "title": coalesce(title[$lang], title.en),
  "description": coalesce(description[$lang], description.en),
  email,
  phone,
  address,
  socialLinks
}`;

export const navigationQuery = groq`*[_type == "navigationMenu"][0]{
  items[]{
    "label": coalesce(label[$lang], label.en),
    href,
    children[]{
      "label": coalesce(label[$lang], label.en),
      href
    }
  }
}`;

export const homePageQuery = groq`*[_type == "homePage" && slug.current == $slug] | order(_updatedAt desc)[0]{
  hero->{
    "title": coalesce(title[$lang], title.en),
    "highlight": coalesce(highlight[$lang], highlight.en),
    "tagline": coalesce(tagline[$lang], tagline.en),
    backgroundImage,
    primaryCta{
      href,
      "label": coalesce(label[$lang], label.en)
    },
    secondaryCta{
      href,
      "label": coalesce(label[$lang], label.en)
    }
  },
  "missionsHeading": coalesce(missionsHeading[$lang], missionsHeading.en),
  missions[]->{
    _id,
    "title": coalesce(title[$lang], title.en),
    "summary": coalesce(summary[$lang], summary.en),
    href,
    image
  },
  "contactTitle": coalesce(contactTitle[$lang], contactTitle.en),
  "contactBody": coalesce(contactBody[$lang], contactBody.en),
  partnerLogos[]{
    _key,
    name,
    logo
  },
  testimonials[]->{
    _id,
    name,
    role,
    avatar,
    "quote": coalesce(quote[$lang], quote.en, quote)
  }
}`;

export const generalPageQuery = groq`*[_type == "generalPage" && slug.current == $slug] | order(_updatedAt desc)[0]{
  title,
  "heroTitle": coalesce(heroTitle[$lang], heroTitle.en, heroTitle),
  "heroHighlight": coalesce(heroHighlight[$lang], heroHighlight.en, heroHighlight),
  "heroParagraph": coalesce(heroParagraph[$lang], heroParagraph.en, heroParagraph),
  heroImage,
  pageCategory,
  "body": coalesce(body[$lang], body.en, body),
  tags,
  stats[]{
    "label": coalesce(label[$lang], label.en, label),
    value
  },
  benefits[]{
    "title": coalesce(title[$lang], title.en, title),
    "description": coalesce(description[$lang], description.en, description)
  },
  programSections[]{
    "title": coalesce(title[$lang], title.en, title),
    "body": coalesce(body[$lang], body.en, body)
  },
  testimonials[]->{
    _id,
    name,
    role,
    avatar,
    "quote": coalesce(quote[$lang], quote.en, quote)
  },
  teamMembers[]->{
    _id,
    name,
    role,
    tags,
    headshot,
    "bio": coalesce(bio[$lang], bio.en, bio)
  }
}`;

export const legalPagesQuery = groq`*[_type == "generalPage" && pageCategory == "legal"] | order(_updatedAt desc){
  "title": coalesce(heroTitle[$lang], heroTitle.en, heroTitle),
  "href": "/" + slug.current
}`;

export const missionsQuery = groq`*[_type == "mission"]{
  _id,
  "title": coalesce(title[$lang], title.en),
  "summary": coalesce(summary[$lang], summary.en),
  href,
  image,
  categories
}`;
