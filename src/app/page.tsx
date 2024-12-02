import Link from "next/link";
import SearchForm from "@/components/SearchForm";
import H1 from "@/components/Shared/H1";
import { getEvents } from "@/lib/queries";

export default async function Home() {
  const { events } = await getEvents("all", 1, false);

  return (
    <main className="flex flex-col items-center pt-36 px-3">
      <H1>Find Events Around You</H1>
      <p className="mb-12 mt-7 text-2xl lg:text-3xl opacity-75">
        Browse more than{" "}
        <span className="font-bold text-accent italic underline">10,000</span>{" "}
        events around you
      </p>

      <SearchForm events={events} />

      <section className="mt-4 flex gap-x-4 text-sm text-white/50">
        <p>Popular:</p>
        <div className="space-x-2 font-semibold">
          <Link href="/events/austin">Austin</Link>
          <Link href="/events/seattle">Seattle</Link>
        </div>
      </section>
    </main>
  );
}
