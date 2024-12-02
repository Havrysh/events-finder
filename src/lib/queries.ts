import { notFound } from "next/navigation";

import { capitalizeFirstLetter } from "@/lib/utils";
import prisma from "@/lib/db";

export async function getEvents(city: string, page = 1, paginate = true) {
  const events = await prisma.mEvent.findMany({
    where: {
      city: city === "all" ? undefined : capitalizeFirstLetter(city),
    },
    orderBy: {
      date: "asc",
    },
    ...(paginate && {
      take: 6,
      skip: 6 * (page - 1),
    }),
  });

  const totalEvents = await prisma.mEvent.count({
    where: {
      city: city === "all" ? undefined : capitalizeFirstLetter(city),
    },
  });

  return {
    events,
    totalEvents,
  };
}

export async function getEvent(slug: string) {
  const event = await prisma.mEvent.findUnique({
    where: {
      slug: slug,
    },
  });

  if (!event) {
    return notFound();
  }

  return event;
}
