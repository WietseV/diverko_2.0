import type { SchemaTypeDefinition } from "sanity";

const locales = [
  { id: "en", title: "English" },
  { id: "nl", title: "Nederlands" },
  { id: "fr", title: "Français" },
];

const localeString: SchemaTypeDefinition = {
  name: "localeString",
  title: "Localized string",
  type: "object",
  fields: locales.map((locale) => ({
    name: locale.id,
    title: locale.title,
    type: "string",
  })),
};

const localeText: SchemaTypeDefinition = {
  name: "localeText",
  title: "Localized text",
  type: "object",
  fields: locales.map((locale) => ({
    name: locale.id,
    title: locale.title,
    type: "text",
  })),
};

const localeBlockContent: SchemaTypeDefinition = {
  name: "localeBlockContent",
  title: "Localized block content",
  type: "object",
  fields: locales.map((locale) => ({
    name: locale.id,
    title: locale.title,
    type: "array",
    of: [{ type: "block" }],
  })),
};

const cta: SchemaTypeDefinition = {
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    { name: "label", type: "localeString", title: "Label" },
    { name: "href", type: "string", title: "Link" },
  ],
};

const heroSection: SchemaTypeDefinition = {
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    { name: "title", type: "localeString", title: "Title" },
    { name: "highlight", type: "localeString", title: "Highlight" },
    { name: "tagline", type: "localeText", title: "Tagline" },
    {
      name: "backgroundImage",
      type: "image",
      title: "Background Image",
      options: { hotspot: true },
    },
    { name: "primaryCta", type: "cta", title: "Primary CTA" },
    { name: "secondaryCta", type: "cta", title: "Secondary CTA" },
  ],
};

const mission: SchemaTypeDefinition = {
  name: "mission",
  title: "Mission",
  type: "document",
  fields: [
    { name: "title", type: "localeString", title: "Title", validation: (Rule) => Rule.required() },
    { name: "summary", type: "localeText", title: "Summary", validation: (Rule) => Rule.required() },
    {
      name: "image",
      type: "image",
      title: "Image",
      options: { hotspot: true },
    },
    { name: "href", type: "string", title: "Link", validation: (Rule) => Rule.required() },
    {
      name: "categories",
      type: "array",
      title: "Categories",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Missions", value: "missions" },
          { title: "Consultancy", value: "consultancy" },
          { title: "Training", value: "training" },
        ],
        layout: "tags",
      },
    },
  ],
};

const navigationMenu: SchemaTypeDefinition = {
  name: "navigationMenu",
  title: "Navigation Menu",
  type: "document",
  fields: [
    {
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "localeString", title: "Label" },
            { name: "href", type: "string", title: "Href" },
            {
              name: "children",
              title: "Dropdown items",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "label", type: "localeString", title: "Label" },
                    { name: "href", type: "string", title: "Href" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};

const homePage: SchemaTypeDefinition = {
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "hero",
      type: "reference",
      to: [{ type: "heroSection" }],
      validation: (Rule) => Rule.required(),
    },
    { name: "missionsHeading", type: "localeString", title: "Missions heading" },
    {
      name: "missions",
      type: "array",
      title: "Missions",
      of: [{ type: "reference", to: [{ type: "mission" }] }],
    },
    { name: "contactTitle", type: "localeString", title: "Contact title" },
    { name: "contactBody", type: "localeText", title: "Contact description" },
    {
      name: "partnerLogos",
      type: "array",
      title: "Partner logos",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Name" },
            { name: "logo", type: "image", title: "Logo", options: { hotspot: true } },
          ],
        },
      ],
    },
    {
      name: "testimonials",
      type: "array",
      title: "Featured testimonials",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    },
  ],
};

const generalPage: SchemaTypeDefinition = {
  name: "generalPage",
  title: "Page",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title", validation: (Rule) => Rule.required() },
    {
      name: "slug",
      type: "slug",
      title: "Slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "heroTitle",
      type: "localeString",
      title: "Hero title",
    },
    {
      name: "heroHighlight",
      type: "localeString",
      title: "Hero highlight",
    },
    {
      name: "heroParagraph",
      type: "localeText",
      title: "Hero paragraph",
    },
    {
      name: "heroImage",
      type: "image",
      title: "Hero background",
      options: { hotspot: true },
    },
    {
      name: "pageCategory",
      type: "string",
      title: "Category",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Legal", value: "legal" },
        ],
        layout: "radio",
      },
      initialValue: "general",
    },
    {
      name: "body",
      type: "localeBlockContent",
      title: "Body",
    },
    { name: "tags", type: "array", title: "Tag list", of: [{ type: "string" }], options: { layout: "tags" } },
    {
      name: "stats",
      type: "array",
      title: "Stats",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "localeString", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    },
    {
      name: "benefits",
      type: "array",
      title: "Benefits",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "localeString", title: "Title" },
            { name: "description", type: "localeText", title: "Description" },
          ],
        },
      ],
    },
    {
      name: "programSections",
      type: "array",
      title: "Program sections",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", type: "localeString", title: "Title" },
            { name: "body", type: "localeBlockContent", title: "Body" },
          ],
        },
      ],
    },
    {
      name: "testimonials",
      type: "array",
      title: "Testimonials",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
    },
    {
      name: "teamMembers",
      type: "array",
      title: "Team members",
      of: [{ type: "reference", to: [{ type: "teamMember" }] }],
    },
  ],
};

const testimonial: SchemaTypeDefinition = {
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", validation: (Rule) => Rule.required() },
    { name: "role", type: "string", title: "Role / Company" },
    { name: "quote", type: "localeText", title: "Quote", validation: (Rule) => Rule.required() },
    { name: "avatar", type: "image", title: "Avatar", options: { hotspot: true } },
  ],
};

const teamMember: SchemaTypeDefinition = {
  name: "teamMember",
  title: "Team member",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Name", validation: (Rule) => Rule.required() },
    { name: "role", type: "string", title: "Role" },
    { name: "bio", type: "localeText", title: "Bio" },
    { name: "headshot", type: "image", title: "Headshot", options: { hotspot: true } },
    { name: "tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } },
  ],
};

const siteSettings: SchemaTypeDefinition = {
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    { name: "title", type: "localeString", title: "Site title" },
    { name: "description", type: "localeText", title: "Description" },
    { name: "email", type: "string", title: "Email" },
    { name: "phone", type: "string", title: "Phone" },
    { name: "address", type: "string", title: "Address" },
    {
      name: "socialLinks",
      type: "array",
      title: "Social links",
      of: [
        {
          type: "object",
          fields: [
            { name: "platform", type: "string", title: "Platform" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    },
  ],
};

const schemaTypes: SchemaTypeDefinition[] = [
  siteSettings,
  navigationMenu,
  heroSection,
  mission,
  testimonial,
  teamMember,
  homePage,
  generalPage,
  localeString,
  localeText,
  localeBlockContent,
  cta,
];

export default schemaTypes;
