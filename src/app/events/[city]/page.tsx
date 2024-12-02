import { Suspense } from "react";
import { Metadata } from "next";
import { z } from "zod";

import H1 from "@/Components/Shared/H1";
import EventsList from "@/Components/Events/EventsList";
import Loading from "@/app/events/[city]/loading";

import { capitalizeFirstLetter } from "@/lib/utils";

type Props = {
  params: {
    city: string;
  };
};

type EventsPageProps = Props & {
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = await params.city;

  return {
    title:
      city === "all"
        ? "All Events"
        : `Events in ${capitalizeFirstLetter(city)}`,
    description: `Find the best events in ${capitalizeFirstLetter(city)}`,
  };
}

const pageNumberSchema = z.coerce.number().int().positive().optional();

export default async function EventsPage({
  params,
  searchParams,
}: EventsPageProps) {
  const city = await params.city;
  const page = pageNumberSchema.safeParse(searchParams.page);

  if (!page.success) {
    throw new Error("Invalid page number");
  }

  return (
    <main className="flex flex-col items-center py-24 px-[20px] min-h-[110vh]">
      <H1 className="mb-28">
        {city === "all" && "All Events"}
        {city !== "all" && `Events in ${capitalizeFirstLetter(city)}`}
      </H1>

      <Suspense key={city + page} fallback={<Loading />}>
        <EventsList city={city} page={page.data} />
      </Suspense>
    </main>
  );
}
