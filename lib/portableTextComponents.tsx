import type { PortableTextReactComponents } from "@portabletext/react";

export const portableComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p className="mb-4 text-lg text-primary_dark">{children}</p>,
    h2: ({ children }) => <h2 className="mt-8 mb-4 text-3xl font-bold text-primary_dark">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 mb-3 text-2xl font-semibold text-primary_dark">{children}</h3>,
  },
  list: {
    bullet: ({ children }) => <ul className="mb-4 list-disc space-y-1 pl-6 text-primary_dark">{children}</ul>,
    number: ({ children }) => <ol className="mb-4 list-decimal space-y-1 pl-6 text-primary_dark">{children}</ol>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
  },
};
