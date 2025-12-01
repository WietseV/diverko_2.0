"use client";

import type { Image as SanityImageSource } from "sanity";
import Image from "next/image";
import { urlFor } from "@/lib/sanity.image";
import Swimlane from "@/components/swimlane/page";

type Testimonial = {
  _id: string;
  quote?: string;
  name?: string;
  role?: string;
  avatar?: SanityImageSource;
};

type TestimonialSliderProps = {
  testimonials: Testimonial[];
};

export default function TestimonialSlider({ testimonials }: TestimonialSliderProps) {
  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="w-full bg-primary_dark text-primary_light">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <Swimlane className="max-w-6xl">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial._id}
              className="w-[280px] shrink-0 rounded-3xl border border-primary_light/10 bg-primary_dark/60 p-6"
            >
              <p className="text-base leading-relaxed text-primary_light/90">“{testimonial.quote}”</p>
              <div className="mt-4 flex items-center gap-3">
                {testimonial.avatar ? (
                  <Image
                    src={urlFor(testimonial.avatar).width(80).height(80).url()}
                    alt={testimonial.name ?? "Client"}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-primary_light/10" />
                )}
                <div>
                  <p className="text-sm font-semibold">{testimonial.name}</p>
                  <p className="text-xs uppercase tracking-[0.3em] text-primary_light/60">{testimonial.role}</p>
                </div>
              </div>
            </article>
          ))}
        </Swimlane>
      </div>
    </section>
  );
}
