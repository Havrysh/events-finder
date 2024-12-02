"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MEvent } from "@prisma/client";

import { useDebounce } from "@/hooks/debounce";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function SearchForm({ events }: { events: MEvent[] }) {
  const router = useRouter();

  const [searchText, setSearchText] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(searchText);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(debounced.toLowerCase()),
  );

  const handleClick = (slug: string) => {
    if (!searchText) return;

    router.push(`/event/${slug}`);
  };

  useEffect(() => {
    setDropdown(debounced.length > 3 && events?.length > 0);
  }, [debounced, events]);

  return (
    <div className="w-full sm:w-[580px]">
      <input
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full h-16 rounded-lg bg-white/[7%] px-6 outline-none ring-accent/50 transition focus:ring-2 focus:bg-white/10"
        placeholder="Search events in any city..."
        spellCheck={false}
      />

      {dropdown && (
        <ul className="mt-2 list-none max-h-[250px] overflow-y-scroll shadow-md bg-white/10 rounded-lg ">
          {filteredEvents.map((event) => (
            <li
              key={event.id}
              className="py-2 px-4 pb-2 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              onClick={() => handleClick(event.slug)}
            >
              {event.name} in{" "}
              <span className="text-accent/50">
                {capitalizeFirstLetter(event.city)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
