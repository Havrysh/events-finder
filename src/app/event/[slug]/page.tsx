import React from "react";
// import { Metadata } from "next";
import Image from "next/image";

import H1 from "@/components/Shared/H1";

// import { capitalizeFirstLetter } from "@/lib/utils";
import { getEvent } from "@/lib/queries";

type Props = {
  params: {
    slug: string;
  };
};

// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   const { slug } = await params;
//
//   const event = await getEvent(slug);
//
//   return {
//     title: capitalizeFirstLetter(event.name),
//     description: `Find the best events in ${slug}`,
//   };
// }

export default async function EventPage({ params }: Props) {
  const { slug } = params;

  const event = await getEvent(slug);

  return (
    <main>
      <section className="relative overflow-hidden flex justify-center items-center py-14 md:py-20">
        <Image
          className="object-cover z-0 blur-3xl"
          src={event.imageUrl}
          alt="Event background image"
          fill
          quality={50}
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />

        <div className="z-1 flex flex-col  gap-6 lg:gap-16 lg:flex-row relative">
          <Image
            src={event.imageUrl}
            alt={event.name}
            width={300}
            height={201}
            className="rounded-xl border-2 border-white/50 object-cover"
          />

          <div className="flex flex-col">
            <p className="text-white/75">
              {new Date(event.date).toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>

            <H1 className="mb-2 mt-1 whitespace-nowrap lg:text-5xl">
              {event.name}
            </H1>

            <p className="whitespace-nowrap text-xl text-white/75">
              Organized by <span className="italic">{event.organizerName}</span>
            </p>

            <button className="bg-white/20 text-lg capitalize bg-blur mt-5 lg:mt-auto w-[95vw] rounded-md border-white/10 border-2 sm:w-full py-2 state-effects">
              Get Tickets
            </button>
          </div>
        </div>
      </section>

      <div className="text-center px-5 py-16">
        <Section>
          <SectionHeading title="About this event" />
          <SectionContent>{event.description}</SectionContent>
        </Section>

        <Section>
          <SectionHeading title="Location" />
          <SectionContent>{event.location}</SectionContent>
        </Section>
      </div>
    </main>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return <section className="mb-12">{children}</section>;
}

function SectionHeading({ title }: { title: string }) {
  return <h2 className="text-2xl">{title}</h2>;
}

function SectionContent({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-4xl mx-auto text-lg leading-8 text-white/75">
      {children}
    </p>
  );
}
