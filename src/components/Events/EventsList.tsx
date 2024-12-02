import EventCard from "@/components/Events/EventCard";

import Pagination from "@/components/Pagination";
import { getEvents } from "@/lib/queries";

type EventsListProps = {
  city: string;
  page?: number;
};

export default async function EventsList({ city, page = 1 }: EventsListProps) {
  const { events, totalEvents } = await getEvents(city, page);

  const eventsPerPage = 6;
  const lastPage = Math.ceil(totalEvents / eventsPerPage);
  const previousPage = page > 1 ? `/events/${city}?page=${page - 1}` : "";
  const nextPage =
    totalEvents > 6 * page ? `/events/${city}?page=${page + 1}` : "";

  return (
    <section className=" max-w-[1100px] flex flex-wrap gap-10 justify-center px-[20px]">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}

      <Pagination
        previousPage={previousPage}
        nextPage={nextPage}
        isLastPage={page === lastPage}
      />
    </section>
  );
}
